# [Mongodb](https://www.mongodb.com/)

The `mongodb` container is responsible of creating a mongodb container with initial metadata.

## Configuration options

All files collection created with relative data are in the [seed folder](./config/seed/) and the init script
[./config/init.sh](./config/init.sh)

To add more collections during the creation of the database:

1. add the corresponding file(s) in the folder [./config/seed/](./config/seed/), keeping the convention:
   `filename := collectionname.json`.
2. Start the docker container.

The seeding of the DB takes place only if the DB does not exist already.
To rerun seeding, please drop the database from mongo,
either removing the docker volume or by running:

```bash
docker compose exec -t mongodb mongosh --eval 'use $DB; db.dropDatabase();'
```

These files are ingested into the database using mongo funcionalities and bypassing the backend, i.e. they are not to be
taken as examples to use the backend API.

## Default configuration

In the default configuration [init.sh](./config/init.sh), the seeding creates data in the mongodb database used by the
`backend` service (either [v4](../v4/), by default, or [v3](../v3/) if specified otherwise by setting `BE_VERSION`).

When `BACKEND_DEV=true` (or `DEV=true`) and `BE_VERSION=v4` the seeding writes to `dev-dacat-next`.

For an explanation of how setting `BE_VERSION` changes the environment creation see the
[configuration options in the root docs](../../../../README.md#docker-compose-profiles-and-env-variables-configuration-options).

## Enable additional features

No additional features.

## Dependency on `BE_VERSION`

Since [v3](../v3/) and [v4](../v4/) connect to two different DBs, the [BE_VERSION](./compose.yaml#L9) environment
variable controls [which DB](./config/init.sh#L5) should be seeded (`dacat` for [v3](../v3/) and `dacat-next` for
[v4](../v4/)).
