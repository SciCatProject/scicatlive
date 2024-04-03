# [Backend next](https://github.com/SciCatProject/scicat-backend-next)

The SciCat backend-next is a rewrite of the original backend, built on top of the NestJS framework.

## Configuration options

The backend-next service is mainly configured via environment variables. For an extensive list of available options see [here](https://scicatproject.github.io/documentation/Development/v4.x/backend/configuration.html).

It can also serve the frontend theme and configuration by mounting the files in `/home/node/app/dist/config/frontend.theme.json` and `/home/node/app/dist/config/frontend.config.json`.

### Functional Accounts

There are a few functional accounts available for handling data:

| Username         | Password    | Usage                        |
| ---------------- | ----------- | ---------------------------- |
| admin            | 2jf70TPNZsS | Admin                        |
| ingestor         | aman        | Ingest datasets              |
| archiveManager   | aman        | Manage archiving of datasets |
| proposalIngestor | aman        | Ingest proposals             |

## Defaul configuration

In the default configuration folder [config](./config), the backend is set to use the [mongo container](../mongodb/).
