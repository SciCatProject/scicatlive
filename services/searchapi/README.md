# [Searchapi](https://github.com/SciCatProject/panosc-search-api)

The SciCat seachAPI is the SciCat metadata catalogue standardised API for communication between SciCat and the PaN portal, built on top of the Loobpack framework. 

## Configuration options

The searchapi configuration is set by the [.env file](./config/.env). For an extensive list of available options see [here](https://github.com/SciCatProject/panosc-search-api).

## Default configuration

In the default configuration [.env file](./config/.env), the searchapi is set to call the `backend service` available at `backend.localhost` (either [v4](../backend/v4/), by default, or [v3](../backend/v3/) if specified otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).
