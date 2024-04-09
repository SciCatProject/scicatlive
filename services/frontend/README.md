# [Frontend](https://github.com/SciCatProject/frontend)

The SciCat frontend is the SciCat metadata catalogue web UI, built on top of the Angular framework. 

## Configuration options

The frontend configuration is set by the [config files](./config/). Files inside the [config](./config/) folder, with a `.json` extension are merged in alphabetical order, with [config.v3.json](./config/config.v3.json) applied depending on the [BE_VERSION](README.md#dependency-on-be_version). 

:warning: Please note that [merging the config files](./config/init.sh) is a functionality provided by `SciCat Live` and is not supported natively by the `frontend`. 

For an extensive list of available options see [here](https://scicatproject.github.io/documentation/Development/v3.x/Configuration.html#scicat-frontend) in the SciCat frontend section.

## Default configuration

In the default configuration [config](./config/), the frontend is set to call the [backend container](../backend/) which is available on the `backend.localhost`. 

## Dependency on `BE_VERSION`

The `BE_VERSION` value controls if the `frontend` should connect to the [backend container](../backend/) or the [backendnext container](../backendnext/). This is controlled by merging conditionally the [config.v3.json file](./config/config.v3.json) which is applied when `BE_VERSION=backend` and connects the `frontend` to the [backend container](../backend/).
