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

## Backend configuration

To configure the backend follow [here](./config/backend/README.md)

## Seeding of the database

For instructions on the seeding of the database see [here](./config/mongodb/README.md)

## General use of scicat

To use scicat, please refer to the [original documentation](https://scicatproject.github.io/documentation/)
