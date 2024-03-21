# Mongodb

The `mongodb` container is responsible of creating a mongodb container with initial metadata that will later be used by the [backend](../backend/) container.

## Configuration options

All files collection created with relative data are in the [seed folder](./config/seed/) and the init script [here](./config/init.js)

To add more collections during the creation of the database:
1. add the corresponding file(s) [here](./config/seed/), keeping the convention: `filename := collectionname.json`.
2. Restart the docker container.

These files are ingested into the database using mongo funcionalities and bypassing the backend, i.e. they are not to be taken as examples to use the backend API.

## Defaul configuration

In the default configuration [init.js](./config/init.js), the seeding creates data in the [dacat](./config/init.js#L1) mongodb database used by the [backend container](../backend/).
