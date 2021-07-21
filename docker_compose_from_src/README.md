# Getting Started

The following steps will get you up and running in minutes with a basic deployment of SciCat with the components running in containers. 

Firstly [clone this repo](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository). 

## Requirements
You will need the following installed on your machine before you can run SciCat.
- git
- Docker
- docker-compose
- Make
## 0. If you are behind a proxy

You can add 
```
ENV http_proxy "http://192.your.proxy.ip"
ENV https_proxy $http_proxy
```

## 1. Download & Build

Build by entering the directory and executing

    make

This will:

1. Fetch the latest *master* revision of Catamel and Catanie from GitHub, placing them in `catanie/catanie` and `catamel/catamel` respectively.
2. Build Docker images for Catanie, Catamel, MongoDB and a small helper to create a text index in the database.

## 2. Run & Develop

The web client (Catanie) uses port 4200 and the API uses port 3000 so make sure they are free.

Start developing by executing

    make run-hot

This will mount the local source code folder (`src`) of Catanie, enabling hot reloading of code changes. Note that changes to anything outside this folder, e.g. `node_modules`, requires a rebuild.

Access the client in your browser at http://localhost:4200 and login with sample credentials ingestor:aman

Access the API Explorer in your browser at http://localhost:3000/explorer/#/

You can get the access token for the API explorer by logging in with the client and going to settings.

# Other tasks

Run without hot reloading, i.e. as static Docker images:

    make run

Other:

    make stop
    make clean

# Add data to SciCat

Please follow the various options outlined in the [Ingestor Manual](https://scicatproject.github.io/documentation/Ingestor). Ideally we would fill some example data automatically here, but this not yet been done :-( . Any help here is appreciated, feel free to send a pull request.

# Configuring

Please follow the documentation about the various [configuration files](https://scicatproject.github.io/documentation/Operator/Step_by_Step_Setup.html) both for the backend catamel and the frontend catanie





