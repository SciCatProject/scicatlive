# [Landingpage](https://github.com/SciCatProject/LandingPageServer)

The SciCat provides standardised search on published datasets via this LandingPageServer

## Configuration options

The landingpage configuration is set by the [config files](./config/). Files inside the [config](./config/) folder, with a `.json` extension are merged respecting the alphabetical order of the files in the **container**. 

:warning: Please note that [merging the config files](./entrypoints/merge_json.sh) is a functionality provided by `SciCat Live` and is not supported natively by the `landingpage`. 

## Default configuration

In the default configuration [config.json file](./config/config.json), the landingpage is set to call the `backend service` available at `backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified otherwise by setting `BE_VERSION`) and use the `localhost` frontend to redirect to the datasets details from the published data detail page.

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Enable additional features

Setting the [BACKEND_HTTPS_URL and FRONTEND_HTTPS_URL env variables](../../.env) requires changing the `backend` and the `frontend` URL used by the `landingpage`. This is managed [here](./entrypoints/merge_json.sh).

:warning: When setting `LANDINGPAGE_HTTPS_URL` it is likely you also want to set the `BACKEND_HTTPS_URL` and `FRONTEND_HTTPS_URL`, to allow the communication between the two wherever the browser is accessed.

With `DEV=true`, please use `npm start -- --host 0.0.0.0`. This is to allow traffic from any IP to the `landingpage` component and it is necessary since the component runs in the docker network.
