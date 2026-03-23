const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const COMPOSE_FILE = path.resolve("../../compose.yaml");
const COMPOSE_BASE_DIR = path.dirname(COMPOSE_FILE);
const COMPOSE_RESOLVED_FILE = path.resolve("resolved-compose.yaml");

const version = process.env.VERSION.replace(/^v/, "");
const repo = process.env.GITHUB_REPOSITORY.toLowerCase();
const imagePath = `ghcr.io/${repo}`;

const ociTypes = ["", "-full", "-dev", "-dev-full", "-v3", "-v3-full"];

ociTypes.forEach((ociType) => {
  const dockerEnv = {
    ...process.env,
    JOBS_ENABLED: ociType.includes("-full") ? "true" : "",
    ELASTIC_ENABLED: ociType.includes("-full") ? "true" : "",
    LDAP_ENABLED: ociType.includes("-full") ? "true" : "",
    OIDC_ENABLED: ociType.includes("-full") ? "true" : "",
    COMPOSE_PROFILES: ociType.includes("-full") ? "*" : "",
    DEV: ociType.includes("-dev") ? "true" : "",
    BE_VERSION: ociType.includes("-v3") ? "v3" : "v4",
  };

  try {
    // 1. Resolve Compose
    execSync(
      `docker compose -f ${COMPOSE_FILE} config --no-path-resolution > ${COMPOSE_RESOLVED_FILE}`,
      { env: dockerEnv, cwd: COMPOSE_BASE_DIR },
    );

    // 2. Inline file contents
    const doc = yaml.parseDocument(
      fs.readFileSync(COMPOSE_RESOLVED_FILE, "utf8"),
    );
    const configs = doc.get("configs");

    if (configs) {
      configs.items.forEach((item) => {
        const node = item.value || item;
        const fileNode = node.get("file", true);
        if (!fileNode) return;
        const filePath = path.join(COMPOSE_BASE_DIR, fileNode.value);
        const buffer = fs.readFileSync(filePath);
        // Check for null byte (0) to identify binary data
        const content = buffer.includes(0)
          ? buffer.toString("base64")
          : buffer.toString("utf8").replace(/\$/g, "$$$$");
        node.set("content", content);
        node.delete("file");
      });
    }
    fs.writeFileSync(COMPOSE_RESOLVED_FILE, doc.toString());

    // 3. Publish
    const ociTags = [
      `${imagePath}:${version}${ociType}`,
      `${imagePath}:latest${ociType}`,
    ];
    ociTags.forEach((ociTag) => {
      execSync(
        `yes | docker compose -f ${COMPOSE_RESOLVED_FILE} publish --resolve-image-digests --with-env --yes ${ociTag}`,
        {
          env: dockerEnv,
          cwd: COMPOSE_BASE_DIR,
          stdio: "inherit",
        },
      );
    });
  } catch {
    process.exit(1);
  }
});
