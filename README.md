# SciCat

Files for running SciCat with docker-compose.


## Steps

1. Clone the repository
   ```sh
   git clone https://github.com/SciCatProject/scicatlive.git
   ```
2. Install Loki logging driver
   ```sh
   docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
   ```
3. Run with the following command inside the directory
   ```sh
   docker-compose up -d
   ```
4. SciCat will now be available on http://localhost. The Loopback API explorer of catamel is available at http://localhost/explorer/, the one for the search-api at http://localhost/panosc-explorer/. Grafana is available at http://localhost/grafana/ (username: `admin`, password: `admin`).

## Add Your Local Configuration

1. Add your local configuration to [config.local.js](./config/catamel/config.local.js)
2. Uncomment the `volumes:` line and the line containing `config.local.js` in the catamel service section in [docker-compose.yaml](./docker-compose.yaml) (if commented)
3. Restart the docker containers


## Add LDAP Authentication

1. Add your LDAP configuration to [providers.json](./config/catamel/providers.json)
2. Uncomment the `volumes:` line and the line containing `providers.json` in the catamel service section in [docker-compose.yaml](./docker-compose.yaml)
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

All files used in the seeding of the database are in the [seed folder](./seed_db/seed). 

To add more collections during the creation of the database:
1. add the corresponding file(s) there, keeping the convention: `filename := collectionname.json`.
2. Restart the docker container.

These files are ingested into the database using mongo funcionalities and bypassing the catamel backend, i.e. they are not to be taken as examples to use the catamel API.

## General use of scicat

To use scicat, please refer to the [original documentation](https://scicatproject.github.io/documentation/)
