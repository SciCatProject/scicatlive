# SciCat

Files for running SciCat with docker-compose.


## Steps

1. Clone the repository
   ```sh
   git clone https://github.com/SciCatProject/scicatlive.git
   ```
2. Run with the following command inside the directory
   ```sh
   docker-compose up -d
   ```
3. SciCat will now be available on http://localhost. 

The Loopback API explorer of the backend is available at http://backend.localhost/explorer/ and the APIs at http://backend.localhost/api/. 

The Loopback API explorer of the search-api at http://searchapi.localhost/explorer/ and the APIs at http://searchapi.localhost/api/.

## Add Your Local Configuration

1. Add your local configuration to [config.local.js](./config/backend/config/config.local.js)
2. Uncomment the `volumes:` line and the line containing `config.local.js` in the backend service section in [docker-compose.yaml](./docker-compose.yaml) (if commented)
3. Restart the docker containers


## Add LDAP Authentication

1. Add your LDAP configuration to [providers.json](./config/backend/config/providers.json)
2. Uncomment the `volumes:` line and the line containing `providers.json` in the backend service section in [docker-compose.yaml](./docker-compose.yaml)
3. Restart the docker containers 


## Functional Accounts

There are a few functional accounts available for handling data:

| Username         | Password    | Usage                        |
| ---------------- | ----------- | ---------------------------- |
| admin            | 2jf70TPNZsS | Admin                        |
| ingestor         | aman        | Ingest datasets              |
| archiveManager   | aman        | Manage archiving of datasets |
| proposalIngestor | aman        | Ingest proposals             |


## Seeding of the database

For instructions on the seeding of the database see [here](./config/mongodb/README.md)

## General use of scicat

To use scicat, please refer to the [original documentation](https://scicatproject.github.io/documentation/)
