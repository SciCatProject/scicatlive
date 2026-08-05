# [Ingestor](https://github.com/swissopenem/ingestor)

The OpenEM ingestor service extracts metadata and integrates it with SciCat.
The ingestor service can be enabled by setting `INGESTOR_ENABLED` in [.env](../../.env).

## Configuration options

The ingestor configuration is defined by `openem-ingestor-config.yaml` in
[compose.base.yaml](./compose.base.yaml) and in [config/openem-ingestor-config.yaml](./config/openem-ingestor-config.yaml).

To run the service, set `INGESTOR_ENABLED` and `INGESTOR_DATA_DIR` in [.env](../../.env).

## Default configuration

In the default setup in [compose.base.yaml](./compose.base.yaml), the ingestor:

- depends on a healthy [backend](../backend/),
- uses `${BACKEND_HTTPS_URL:-http://backend.localhost}/api/v3` as SciCat backend host,
- uses `${FRONTEND_HTTPS_URL:-http://localhost}` as SciCat frontend host,
- mounts `${INGESTOR_DATA_DIR}` as `/data` (read-only),
- exposes the service on port `8080`.

## Enable additional features

By default, transfer method is `None`. To enable Globus transfer, set `TRANSFER_METHOD=Globus` and configure:

- `GLOBUS_TRANSFER_PROXY_URL`
- `GLOBUS_SOURCE_FACILITY`
- `GLOBUS_DESTINATION_FACILITY`
- `GLOBUS_COLLECTION_ROOT_PATH`

To enable authentication, set `AUTH_DISABLED=false` and `KEYCLOAK_HTTPS_URL`.

:warning: When setting `AUTH_DISABLED=false`, make sure the Keycloak realm and client match the ingestor
configuration.

## DEV configuration

With `INGESTOR_DEV=true` (or `DEV=true`), the ingestor uses [compose.dev.yaml](./compose.dev.yaml), extending
[services/compose.dev.yaml](../compose.dev.yaml), and builds from source with target `builder`.
