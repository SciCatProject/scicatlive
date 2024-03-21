# [Archive Mock](https://github.com/SwissOpenEM/ScicatArchiveMock)

The Archive Mock simulates the interactions of an archival mock with SciCat. 

## Requirements
 - RabbitMQ
 - SciCat Backend (configured to use the RabbitMQ instance above for jobs)

## Behavior

It listens to jobs posted to rabbitmq by the Backend. This will instruct the Archive Mock to run the script that simulates the archive system, for both archival and retrieval. After retrieving a job from `RabbitMQ`, the job is executed. An archival job is executed as such:

1. Mark job as being handled (jobStatusMessage: `"inProgress"`)
2. Mark dataset(s) as being archived (archivable: `false`, archiveStatusMessage: `"started"`)
3. Add `DataBlocks`
4. Mark dataset(s) as archived (retrievable: `true`, archiveStatusMessage: `"datasetOnArchiveDisk"`)
5. Mark job as done (jobStatusMessage: `"finishedSuccessful"`)

Note: the way the DataBlocks (*not* OrigDatablocks) are generated in the mock does not necessarily correspond to any specific implementation of the archival system, it's just an example.

A similar script handles retrieval:

1. Mark job as being handled. (jobStatusMessage: `"inProgress"`)
2. Mark dataset(s) as being retrieved (retrieve status message: `"started"`)
3. Mark dataset(s) as retrieved (retrieve status message: `"datasetReceived"`)
4. Mark job as done (jobStatusMessage: `"finishedSuccessful"`)

## [Config](./config/.env) - Environment Variables

| Variable | Description                                                     |
| -------- | --------------------------------------------------------------- |
| SCI_URL  | the base url of the backend (usually ends in `/api/v_`)         |
| SCI_USER |  the scicat user's username used for accessing the backend      |
| SCI_PW   | the above user's password                                       |
| TOKEN    | scicat access token, can be used instead of user and pw         |
| RMQ_URL  | RabbitMQ API url                                                |
| RMQ_USER | the username used for accessing RabbitMQ                        |
| RMQ_PW   | the password used for accessing RabbitMQ                        |
