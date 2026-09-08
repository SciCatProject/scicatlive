const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const COMPOSE_FILE = path.resolve("../../compose.yaml");
const COMPOSE_BASE_DIR = path.dirname(COMPOSE_FILE);
const COMPOSE_RESOLVED_FILE = path.resolve("resolved-compose.yaml");

const ociTypes = ["", "-full", "-v3", "-v3-full"];

// ---------------------------------------------------------------------------
// Reverse conversion: bind-mount volumes (single files) -> inline configs.
//
// Rationale: `docker compose publish` needs a fully self-contained artifact.
// A `configs:` entry with `file:` can be inlined (see step 2 below), but a
// `volumes:` bind mount referencing a host file has no equivalent in the
// published artifact at all - it just silently won't exist for whoever
// pulls the OCI package. Anything a dev workflow deliberately mounted as a
// writable volume (see prior discussion) needs to be converted back to a
// read-only config for publishing, since that's the only mechanism Compose
// supports for embedding file content in an OCI artifact.
//
// This only touches bind mounts that point at a single existing file.
// Named volumes (declared under the top-level `volumes:` key, e.g. DB data
// directories) and directory bind mounts are left untouched - configs can't
// represent either of those, so if you need one of those to also ship in
// the OCI artifact, that's a different problem (named volume seeding, or
// baking a directory into the image itself).
// ---------------------------------------------------------------------------
// Host resources that must never be embedded in the published artifact,
// even though they may resolve to a "file" on whatever machine runs this
// script. The Docker socket is the main case: it's a bind mount the proxy
// needs at runtime on the *host* it's deployed to, not build-time content
// to bake into a config.
const NON_CONVERTIBLE_SOURCES = new Set(["/var/run/docker.sock"]);

function namedVolumeNames(doc) {
  const topVolumes = doc.get("volumes", true);
  if (!topVolumes || !topVolumes.items) return new Set();
  return new Set(topVolumes.items.map((pair) => pair.key.value));
}

function parseVolumeEntry(item) {
  // Short syntax: "source:target" or "source:target:mode"
  if (item instanceof yaml.Scalar || typeof item.value === "string") {
    const parts = item.value.split(":");
    if (parts.length < 2) return null;
    return { source: parts[0], target: parts[1] };
  }
  // Long syntax: {type, source, target, ...}
  if (item.get) {
    const type = item.get("type");
    const source = item.get("source");
    const target = item.get("target");
    if (type && type !== "bind") return null; // skip named volume/tmpfs/npipe types
    if (!source || !target) return null;
    return { source, target };
  }
  return null;
}

function sanitizeConfigName(serviceName, targetPath) {
  const stripped = targetPath.replace(/^\/+/, "");
  return `${serviceName}_${stripped}`.replace(/[^a-zA-Z0-9_.-]+/g, "_");
}

function inlineFileContent(absPath) {
  const buffer = fs.readFileSync(absPath);
  // Check for null byte (0) to identify binary data
  return buffer.includes(0)
    ? buffer.toString("base64")
    : buffer.toString("utf8").replace(/\$/g, "$$$$");
}

function ensureTopConfigs(doc) {
  let topConfigs = doc.get("configs", true);
  if (!topConfigs) {
    doc.set("configs", doc.createNode({}));
    topConfigs = doc.get("configs", true);
  }
  return topConfigs;
}

function addServiceConfigRefs(doc, service, newConfigRefs) {
  if (!newConfigRefs.length) return;

  let serviceConfigs = service.get("configs", true);
  if (!serviceConfigs) {
    service.set("configs", doc.createNode([]));
    serviceConfigs = service.get("configs", true);
  }
  newConfigRefs.forEach((ref) => serviceConfigs.add(doc.createNode(ref)));
}

function convertVolumeItem(doc, baseDir, named, topConfigs, serviceName, item) {
  const parsed = parseVolumeEntry(item);

  if (
    !parsed ||
    named.has(parsed.source) ||
    NON_CONVERTIBLE_SOURCES.has(parsed.source)
  ) {
    return null; // named volume, unparseable, or non-convertible host resource - leave as-is
  }

  const absSourcePath = path.resolve(baseDir, parsed.source);
  let isFile;
  try {
    isFile = fs.statSync(absSourcePath).isFile();
  } catch {
    return null; // source doesn't exist on disk - leave as-is
  }
  if (!isFile) {
    return null; // directory bind mount - configs can't represent this
  }

  const configName = sanitizeConfigName(serviceName, parsed.target);
  topConfigs.set(
    configName,
    doc.createNode({ content: inlineFileContent(absSourcePath) }),
  );
  return { source: configName, target: parsed.target };
}

function convertServiceVolumes(doc, baseDir, named, topConfigs, servicePair) {
  const serviceName = servicePair.key.value;
  const service = servicePair.value;
  const volumes = service.get("volumes", true);
  if (!volumes || !volumes.items) return;

  const keepVolumes = [];
  const newConfigRefs = [];

  for (const item of volumes.items) {
    const configRef = convertVolumeItem(
      doc,
      baseDir,
      named,
      topConfigs,
      serviceName,
      item,
    );
    if (configRef) {
      newConfigRefs.push(configRef);
    } else {
      keepVolumes.push(item);
    }
  }

  volumes.items = keepVolumes;

  addServiceConfigRefs(doc, service, newConfigRefs);

  if (volumes.items.length === 0) {
    service.delete("volumes");
  }
}

function convertVolumesToConfigs(doc, baseDir) {
  const services = doc.get("services", true);
  if (!services) return;

  const named = namedVolumeNames(doc);
  const topConfigs = ensureTopConfigs(doc);

  for (const servicePair of services.items) {
    convertServiceVolumes(doc, baseDir, named, topConfigs, servicePair);
  }
}

// ---------------------------------------------------------------------------
// Inline remaining file-based config content: a `configs:` entry declared
// with `file:` has no equivalent in a published OCI artifact either (same
// reasoning as above), so its content is read and embedded directly.
// ---------------------------------------------------------------------------
function inlineConfigFiles(doc, baseDir) {
  const configs = doc.get("configs");
  if (!configs) return;

  configs.items.forEach((item) => {
    const node = item.value || item;
    const fileNode = node.get("file", true);
    if (!fileNode) return;
    const filePath = path.join(baseDir, fileNode.value);
    node.set("content", inlineFileContent(filePath));
    node.delete("file");
  });
}

function main() {
  const version = process.env.VERSION.replace(/^v/, "");
  const repo = process.env.GITHUB_REPOSITORY.toLowerCase();
  const imagePath = `ghcr.io/${repo}`;
  const dryRun = process.env.DRY_RUN === "true" ? "--dry-run " : "";
  const resolveDigests = dryRun ? "" : "--resolve-image-digests ";

  ociTypes.forEach((ociType) => {
    const dockerEnv = {
      ...process.env,
      JOBS_ENABLED: ociType.includes("-full") ? "true" : "",
      OPENSEARCH_ENABLED: ociType.includes("-full") ? "true" : "",
      LDAP_ENABLED: ociType.includes("-full") ? "true" : "",
      OIDC_ENABLED: ociType.includes("-full") ? "true" : "",
      COMPOSE_PROFILES: ociType.includes("-full") ? "*" : "",
      BE_VERSION: ociType.includes("-v3") ? "v3" : "v4",
    };

    try {
      // 1. Resolve Compose
      execSync(
        `docker compose -f ${COMPOSE_FILE} config --no-path-resolution > ${COMPOSE_RESOLVED_FILE}`,
        { env: dockerEnv, cwd: COMPOSE_BASE_DIR },
      );

      const doc = yaml.parseDocument(
        fs.readFileSync(COMPOSE_RESOLVED_FILE, "utf8"),
      );

      // 2. Convert any bind-mount volumes (single files) into configs
      convertVolumesToConfigs(doc, COMPOSE_BASE_DIR);

      // 3. Inline remaining file-based config content
      inlineConfigFiles(doc, COMPOSE_BASE_DIR);

      fs.writeFileSync(COMPOSE_RESOLVED_FILE, doc.toString());

      // 4. Publish
      const ociTags = [
        `${imagePath}:${version}${ociType}`,
        `${imagePath}:latest${ociType}`,
      ];
      ociTags.forEach((ociTag) => {
        execSync(
          `yes | docker compose -f ${COMPOSE_RESOLVED_FILE} publish \\
          ${dryRun}${resolveDigests}--with-env --yes ${ociTag}`,
          {
            env: dockerEnv,
            cwd: COMPOSE_BASE_DIR,
            stdio: "inherit",
          },
        );
      });
    } catch {
      process.exit(1);
    } finally {
      fs.rmSync(COMPOSE_RESOLVED_FILE, { force: true });
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = {
  parseVolumeEntry,
  sanitizeConfigName,
  inlineFileContent,
  namedVolumeNames,
  convertVolumesToConfigs,
  inlineConfigFiles,
};
