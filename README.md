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
3. SciCat will now be available on http://localhost. The  API explorer of scicat is available at http://localhost/explorer/, the one for the search-api at http://localhost/panosc-explorer/.

## Add Your Local Configuration

1. Add your local configuration to [.env](config/backend/.env)
2. Check the frontend config [config.json](config/frontend/config.json)
3. Restart the docker containers


## Add LDAP Authentication

1. Add your LDAP configuration to [.env](config/backend/.env)
3. Restart the docker containers


## Functional and test Accounts

There are a few functional accounts and test accounts available for handling data:

| Username         | Password                         | Usage                        |
| ---------------- | -------------------------------- | ---------------------------- |
| admin            | am2jf70TPNZsSan                  | Admin                        |
| ingestor         | aman                             | Ingest datasets              |
| archiveManager   | aman                             | Manage archiving of datasets |
| proposalIngestor | aman                             | Ingest proposals             |
| user1            | a609316768619f154ef58db4d847b75e | User in  group 1             |
| user2            | f522d1d715970073a6413474ca0e0f63 | User in  group 2             |
| user3            | 70dc489e8ee823ae815e18d664424df2 | User in  group 3             |
| user4            | 0014890e7020f515b92b767227ef2dfa | User in  group 4             |
| user5.1          | 359a5fda99bfe5dbc42ee9b3ede77fb7 | User in  group 5             |
| user5.2          | f3ebd2e4def95db59ef95ee32ef45242 | User in  group 5             |


## Seeding of the database

All files used in the seeding of the database are in the [seed folder](./seed_db/seed).

To add more collections during the creation of the database:
1. add the corresponding file(s) there, keeping the convention: `filename := collectionname.json`.
2. Restart the docker container.

These files are ingested into the database using mongo funcionalities and bypassing the scicat backend, i.e. they are not to be taken as examples to use the scicat API.

## General use of scicat

To use scicat, please refer to the [original documentation](https://scicatproject.github.io/documentation/)
