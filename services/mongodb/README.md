# Mongodb

The `mongodb` container is responsible of creating a mongodb container with initial metadata.

## Configuration options

All files collection created with relative data are in the [seed folder](./config/seed/) and the init script [here](./config/init.js)

To add more collections during the creation of the database:
1. add the corresponding file(s) [here](./config/seed/), keeping the convention: `filename := collectionname.json`.
2. Restart the docker container.

These files are ingested into the database using mongo funcionalities and bypassing the backend, i.e. they are not to be taken as examples to use the backend API.

## Default configuration

In the default configuration [init.js](./config/init.js), the seeding creates data in the mongodb database used by the `backend` service (either [v4](../backend/v4/), by default, or [v3](../backend/v3/) if specified otherwise by setting `BE_VERSION`).

For an explanation of how setting `BE_VERSION` changes the environment creation see [here](../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Dependency on `BE_VERSION`

Since [v3](../backend/services/v3/) and [v4](../backend/services/v4/) connect to two different DBs, the [BE_VERSION](./compose.yaml#L9) environment variable controls [which DB](./config/init.js#L1) should be seeded (`dacat` for [v3](../backend/services/v3/) and `dacat-next` for [v4](../backend/services/v4/)).
