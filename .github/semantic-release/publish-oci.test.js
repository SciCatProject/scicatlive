const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const yaml = require("yaml");

const {
  parseVolumeEntry,
  sanitizeConfigName,
  inlineFileContent,
  namedVolumeNames,
  convertVolumesToConfigs,
  inlineConfigFiles,
} = require("./publish-oci.js");

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "publish-oci-test-"));
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function writeFile(dir, relPath, content) {
  const abs = path.join(dir, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  return abs;
}

test("sanitizeConfigName strips the leading slash and replaces disallowed characters", () => {
  assert.equal(
    sanitizeConfigName("proxy", "/config/traefik.yaml"),
    "proxy_config_traefik.yaml",
  );
  assert.equal(sanitizeConfigName("svc", "/a/b c!d"), "svc_a_b_c_d");
});

test("inlineFileContent doubles '$' in text content and base64-encodes binary content", () => {
  withTempDir((dir) => {
    const textFile = writeFile(dir, "text.env", "KEY=$VALUE\n");
    assert.equal(inlineFileContent(textFile), "KEY=$$VALUE\n");

    const binaryFile = path.join(dir, "binary.bin");
    const buffer = Buffer.from([0, 1, 2, 3]);
    fs.writeFileSync(binaryFile, buffer);
    assert.equal(inlineFileContent(binaryFile), buffer.toString("base64"));
  });
});

test("convertVolumesToConfigs converts a short-syntax bind mount to an existing file into a config", () => {
  withTempDir((dir) => {
    writeFile(dir, "config/traefik.yaml", "key: $value\n");
    const doc = yaml.parseDocument(`
services:
  proxy:
    volumes:
      - ./config/traefik.yaml:/config/traefik.yaml
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.equal(result.services.proxy.volumes, undefined);
    assert.deepEqual(result.services.proxy.configs, [
      { source: "proxy_config_traefik.yaml", target: "/config/traefik.yaml" },
    ]);
    assert.equal(
      result.configs["proxy_config_traefik.yaml"].content,
      "key: $$value\n",
    );
  });
});

test("convertVolumesToConfigs converts a long-syntax bind mount to an existing file into a config", () => {
  withTempDir((dir) => {
    writeFile(dir, "functional_accounts.json", "{\"key\": \"value\"}");
    const doc = yaml.parseDocument(`
services:
  backend:
    volumes:
      - type: bind
        source: ./functional_accounts.json
        target: /config/functional_accounts.json
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.equal(result.services.backend.volumes, undefined);
    assert.deepEqual(result.services.backend.configs, [
      {
        source: "backend_config_functional_accounts.json",
        target: "/config/functional_accounts.json",
      },
    ]);
  });
});

test("convertVolumesToConfigs leaves a long-syntax non-bind mount untouched", () => {
  withTempDir((dir) => {
    const doc = yaml.parseDocument(`
services:
  backend:
    volumes:
      - type: volume
        source: somevol
        target: /data
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.backend.volumes, [
      { type: "volume", source: "somevol", target: "/data" },
    ]);
    assert.equal(result.services.backend.configs, undefined);
  });
});

test("convertVolumesToConfigs leaves a named-volume mount untouched", () => {
  withTempDir((dir) => {
    const doc = yaml.parseDocument(`
services:
  mongodb:
    volumes:
      - dbdata:/data/db
volumes:
  dbdata: {}
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.mongodb.volumes, ["dbdata:/data/db"]);
    assert.equal(result.services.mongodb.configs, undefined);
  });
});

test("convertVolumesToConfigs leaves a directory bind mount untouched", () => {
  withTempDir((dir) => {
    fs.mkdirSync(path.join(dir, "config"));
    const doc = yaml.parseDocument(`
services:
  frontend:
    volumes:
      - ./config:/app/config
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.frontend.volumes, [
      "./config:/app/config",
    ]);
    assert.equal(result.services.frontend.configs, undefined);
  });
});

test("convertVolumesToConfigs leaves a mount to a non-existent source untouched", () => {
  withTempDir((dir) => {
    const doc = yaml.parseDocument(`
services:
  frontend:
    volumes:
      - ./does-not-exist.txt:/app/does-not-exist.txt
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.frontend.volumes, [
      "./does-not-exist.txt:/app/does-not-exist.txt",
    ]);
  });
});

test("convertVolumesToConfigs never converts a non-convertible host resource, even if it exists on disk", () => {
  withTempDir((dir) => {
    // Simulate the docker socket existing as a real file on the test machine.
    writeFile(dir, "docker.sock", "");
    const doc = yaml.parseDocument(`
services:
  proxy:
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.proxy.volumes, [
      "/var/run/docker.sock:/var/run/docker.sock",
    ]);
  });
});

test("convertVolumesToConfigs keeps unconverted volumes and only drops the volumes key once empty", () => {
  withTempDir((dir) => {
    writeFile(dir, "config/traefik.yaml", "content");
    const doc = yaml.parseDocument(`
services:
  proxy:
    volumes:
      - ./config/traefik.yaml:/config/traefik.yaml
      - ./missing-dir:/data
volumes: {}
`);

    convertVolumesToConfigs(doc, dir);
    const result = doc.toJS();

    assert.deepEqual(result.services.proxy.volumes, [
      "./missing-dir:/data",
    ]);
    assert.deepEqual(result.services.proxy.configs, [
      { source: "proxy_config_traefik.yaml", target: "/config/traefik.yaml" },
    ]);
  });
});

test("parseVolumeEntry rejects short-syntax entries without a target", () => {
  const doc = yaml.parseDocument(`
services:
  svc:
    volumes:
      - onlysource
`);
  const item = doc.get("services", true).get("svc", true).get("volumes", true)
    .items[0];
  assert.equal(parseVolumeEntry(item), null);
});

test("namedVolumeNames collects the top-level volume names", () => {
  const doc = yaml.parseDocument(`
volumes:
  dbdata: {}
  otherdata: {}
`);
  assert.deepEqual(namedVolumeNames(doc), new Set(["dbdata", "otherdata"]));
});

test("namedVolumeNames returns an empty set when there are no top-level volumes", () => {
  const doc = yaml.parseDocument(`
services:
  svc: {}
`);
  assert.deepEqual(namedVolumeNames(doc), new Set());
});

test("inlineConfigFiles inlines file-based configs and leaves already-inline configs untouched", () => {
  withTempDir((dir) => {
    writeFile(dir, "functional_accounts.json", "{\"key\": \"$value\"}");
    const doc = yaml.parseDocument(`
configs:
  backend_v4_functional_accounts_json:
    file: ./functional_accounts.json
  other_config:
    content: already inline
`);

    inlineConfigFiles(doc, dir);
    const result = doc.toJS();

    assert.equal(
      result.configs.backend_v4_functional_accounts_json.content,
      "{\"key\": \"$$value\"}",
    );
    assert.equal(
      result.configs.backend_v4_functional_accounts_json.file,
      undefined,
    );
    assert.equal(result.configs.other_config.content, "already inline");
  });
});
