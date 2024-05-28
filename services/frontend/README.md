# [Frontend](https://github.com/SciCatProject/frontend)

The SciCat frontend is the SciCat metadata catalogue web UI, built on top of the Angular framework. 

## Configuration options

The frontend configuration is set by the [config files](./config/). Files inside the [config](./config/) folder, with a `.json` extension are merged in alphabetical order, with [config.v3.json](./config/config.v3.json) applied depending on the [BE_VERSION](../../README.md#docker-compose-profiles-and-env-variables-configuration-options). 

:warning: Please note that [merging the config files](./config/init.sh) is a functionality provided by `SciCat Live` and is not supported natively by the `frontend`. 

For an extensive list of available options see [here](https://scicatproject.github.io/documentation/Development/v3.x/Configuration.html#scicat-frontend) in the SciCat frontend section.

## Default configuration

In the default configuration [config](./config/), the frontend is set to call the `backend service` available at `backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Dependency on `BE_VERSION`

Since there was a small breaking change from `v3` to `v4`, when connecting to the `backend`, the `BE_VERSION` value controls if [config.v3.json file](./config/config.v3.json), which is applied when `BE_VERSION=v3`, should be included in the configs merge process.
