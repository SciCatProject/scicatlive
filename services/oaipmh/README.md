# [OAIPMH](https://github.com/SciCatProject/oai-provider-service)

SciCat supports querying published metadata via the [OAI-PMH protocol](https://www.openarchives.org/pmh/)

## Configuration options

The oaipmh configuration is set by the [config files](./config/).

## Default configuration

In the default configuration [.env file](./config/.env), the oaipmh is set to call the `backend service` available at
`backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified
otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see the
[configuration options in the root docs](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Enable additional features

Setting the [BACKEND_HTTPS_URL env variables](./config/.env) requires changing the `backend` URL used by the `oaimph`.
This is managed in the env file [./config/.env](./config/.env).

:warning: When setting `OAIPMH_HTTPS_URL` it is likely you also want to set the `BACKEND_HTTPS_URL`, to allow the
communication between the two wherever the browser is accessed.

## DEV configuration

Running the service in DEV mode is supported, but be aware that the upstream tests fail, so `npm run test` will fail in
the scicatlive oaipmh container as well.
