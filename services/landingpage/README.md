# [Landingpage](https://github.com/SciCatProject/LandingPageServer)

The SciCat provides standardised search on published datasets via this LandingPageServer

## Configuration options

The landingpage configuration is set by the [config.json file](./config/config.json). For an extensive list of available options see [here](https://github.com/SciCatProject/LandingPageServer).

## Default configuration

In the default configuration [config.json file](./config/config.json), the landingpage is set to call the `backend service` available at `backend.localhost` (either [v4](../backend/services/v4/), by default, or [v3](../backend/services/v3/) if specified otherwise by setting `BE_VERSION`) and use the `localhost` frontend to redirect to the datasets details from the published data detail page.

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).
