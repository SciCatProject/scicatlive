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

## Authentication

The ingestor can authenticate users based on OIDC claims. If `OIDC_ENABLED` is true,
this will be enabled by default. It can also specifically be enabled or disabled by
setting `AUTH_ENABLED=true` in `.env`.

When ingestor authentication is disabled any scicat user can access the ingestor and
browse data. Otherwise, only users with the keycloak roles
`scicat-ingestor/ingestor-read` and `scicat-ingestor/ingestor-write` will be able to use
the ingestor. These roles are granted to the default `oidc-user`, but should be added to
other users in keycloak with 'User > Role mapping > Assign role > Client roles'.

## Jobs

Setting `JOBS_ENABLED=true` is recommended to use the ingestor. An `archive` jobType should be configured to enable the 'autoArchive' feature of the ingestor. (This is provided in the default `jobConfig.yaml` configuration of scicatlive.)

## DEV configuration

With `INGESTOR_DEV=true` (or `DEV=true`), the ingestor uses [compose.dev.yaml](./compose.dev.yaml), extending
[services/compose.dev.yaml](../compose.dev.yaml), and builds from source with target `builder`.
