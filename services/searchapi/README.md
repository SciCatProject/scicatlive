# [Searchapi](https://github.com/SciCatProject/panosc-search-api)

The SciCat seachAPI is the SciCat metadata catalogue standardised API for communication between SciCat and the PaN
portal, built on top of the Loobpack framework.

## Configuration options

The searchapi configuration is set by the [.env file](./config/.env). For an extensive list of available options see the
[upstream documentation](https://github.com/SciCatProject/panosc-search-api).

## Default configuration

In the default configuration [.env file](./config/.env), the searchapi is set to call the `backend service` available at
`backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified
otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see the
[configuration options in the root docs](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Enable additional features

`SEARCHAPI_DEV=true` (or `DEV=true`) enables running the archivemock in DEV mode.

`--profile 'search'` instructs docker compose to create this additional service.
