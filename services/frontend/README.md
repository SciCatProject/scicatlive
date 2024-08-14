# [Frontend](https://github.com/SciCatProject/frontend)

The SciCat frontend is the SciCat metadata catalogue web UI, built on top of the Angular framework. 

## Configuration options

The frontend configuration is set by the [config files](./config/). Files inside the [config](./config/) folder, with a `.json` extension are merged respecting the alphabetical order of the files in the **container**, with [config.v3.json](./config/config.v3.json) applied depending on the [BE_VERSION](../../README.md#docker-compose-profiles-and-env-variables-configuration-options). 

:warning: Please note that [merging the config files](./entrypoints/merge_json.sh) is a functionality provided by `SciCat Live` and is not supported natively by the `frontend`. 

For an extensive list of available options see [here](https://scicatproject.github.io/documentation/Development/v3.x/Configuration.html#scicat-frontend) in the SciCat frontend section.

## Default configuration

In the default configuration [config](./config/), the frontend is set to call the `backend service` available at `backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Enable additional features

Since there was a small breaking change from `v3` to `v4`, when connecting to the `backend`, the `BE_VERSION` value controls if [config.v3.json file](./config/config.v3.json), which is applied when `BE_VERSION=v3`, should be included in the configs merge process.

With `DEV=true`, please use `npm start -- --host 0.0.0.0`. This is to allow traffic from any IP to the `frontend` component and it is necessary since the component runs in the docker network.

Setting the [BACKEND_HTTPS_URL env variable](../../.env) requires changing the `backend` URL used by the `frontend`. This is managed [here](./entrypoints/merge_json.sh).

:warning: When setting `FRONTENT_HTTPS_URL` it is likely you also want to set the `BACKEND_HTTPS_URL`, to allow the communication between the two wherever the browser is accessed.
