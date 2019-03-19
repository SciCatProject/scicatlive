# Getting Started

## Requirements

- git
- Docker
- docker-compose
- Make

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

## 3. Add Mock Data

Run

    make data

to create and insert mock data (Datasets, Proposals etc.) This is done over the Catamel API, so the application needs to be running.

# Other tasks

Run without hot reloading, i.e. as static Docker images:

    make run

Other:

    make stop
    make clean

# Todo

- Make catamel support hot reloading
- Support testing in frontend
