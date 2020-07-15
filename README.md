# Getting Started

The following steps will get you up and running with a basic deployment of SciCat with the components running in containers. 

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

Start developing by executing

    make run-hot

This will mount the local source code folder (`src`) of Catanie, enabling hot reloading of code changes. Note that changes to anything outside this folder, e.g. `node_modules`, requires a rebuild.


# Other tasks

Run without hot reloading, i.e. as static Docker images:

    make run

Other:

    make stop
    make clean

# Add data to SciCat

Using the API you can now add data. A good place to start would be adding some datasets.
