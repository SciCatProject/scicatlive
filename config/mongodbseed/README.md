# Mongodbseed

The `mongodbseed` container is responsible of seeding the [mongodb](../mongodb/) container with initial metadata that will later be used by the [backend](../backend/) container.

## Configuration options

All files used in the seeding of the database and the [seeding script](./config/mongo_import.sh) are in the [config folder](./config),.

To add more collections during the creation of the database:
1. add the corresponding file(s) there, keeping the convention: `filename := collectionname.json`.
2. Restart the docker container.

These files are ingested into the database using mongo funcionalities and bypassing the backend, i.e. they are not to be taken as examples to use the backend API.

## Defaul configuration

In the default configuration [.mongo_import.sh](./config/mongo_import.sh), the seeding creates data in the [dacat](./config/mongo_import.sh#L7) mongodb database.
