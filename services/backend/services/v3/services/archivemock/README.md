# [Archive Mock](https://github.com/SwissOpenEM/ScicatArchiveMock)

The Archive Mock simulates the interactions of an archival mock with SciCat. 

## Service Requirements
 - [RabbitMQ](../rabbitmq/)
 - [backend v3](../../) (configured to use the RabbitMQ instance above for jobs)

## [Config](./config/.env) - Environment Variables

The container uses [environment variables](https://github.com/SwissOpenEM/ScicatArchiveMock?tab=readme-ov-file#utility-scripts) for configuration.

## Default configuraiton

By default, it is configured to connect to the [backend v3](../../) container with the `admin` account, and to the [RabbitMQ](../rabbitmq/) container with the `guest` account. It will then handle all archival and retrieval jobs posted to RabbitMQ, and update the corresponding Datasets accordingly in Scicat.
