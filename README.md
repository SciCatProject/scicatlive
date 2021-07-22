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
3. SciCat will now be available on http://localhost. The Loopback API explorer of catamel is available at http://localhost/explorer/, the one for the search-api at http://localhost/panosc-explorer/.

## Add Your Local Configuration

1. Add your local configuration to [config.local.js](./config/catamel/config.local.js)
2. Uncomment the `volumes:` line and the line containing `config.local.js` in the catamel service section in [docker-compose.yaml](./docker-compose.yaml)
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


## Get Access Token for the API Explorer


### Through the Front End

1. Sign in to SciCat using one of the functional accounts or your LDAP account
2. Click on the avatar in the top right corner and go to *Settings*
3. Copy the *Catamel Token* value
4. Go to the the API explorer, paste the token in the text box at the top, and click *Set Access Token*


### Through the API Explorer (Functional Accounts Only)

1. Go to http://localhost/explorer/#!/User/User_login
2. Type in the functional account credentials in JSON format in the *credentials* text box, e.g.:
   ```json
   {"username": "ingestor", "password": "aman"}
   ```
3. Click *Try it out!*
4. Copy the `"id"` value from the response, paste the token in the text box at the top, and click *Set Access Token*


### Using curl
1. Send a post request through curl, e.g.:
   ```sh
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"ingestor","password":"aman"}' 'http://localhost/api/v3/Users/login'
   ```
2. Copy the `"id"` value from the response
3. Go to the the API explorer, paste the token in the text box at the top, and click *Set Access Token*


## Ingesting Data


### Adding a Dataset


#### Through the API Explorer

1. Go to http://localhost/explorer/#!/Dataset/Dataset_create
2. Add your dataset in JSON format in the *data* text box, e.g.:
   ```json
   {
     "principalInvestigator": "firstnamelastname@example.com",
     "endTime": "2020-04-08T08:10:07.553Z",
     "creationLocation": "/Site-name/facility-name/instrumentOrBeamline-name",
     "dataFormat": "Nexus Version x.y",
     "scientificMetadata": {},
     "owner": "firsnamelastname",
     "ownerEmail": "firstnamelastname@example.com",
     "orcidOfOwner": "https://orcid.org/0000-0000-0000-0000",
     "contactEmail": "firstnamelastname@example.com",
     "sourceFolder": "/some/path/to/sourcefolder",
     "sourceFolderHost": "[protocol://]fileserver1.example.com",
     "size": 0,
     "packedSize": 0,
     "creationTime": "2020-04-08T08:10:06.713Z",
     "type": "raw",
     "validationStatus": "string",
     "keywords": [],
     "description": "Description of my example dataset.",
     "datasetName": "Example Dataset",
     "classification": "AV=medium,CO=low",
     "license": "string",
     "version": "string",
     "isPublished": false,
     "ownerGroup": "string",
     "accessGroups": [],
     "createdBy": "firstnamelastname",
     "createdAt": "2020-04-08T08:10:06.713Z",
     "datasetlifecycle": {
       "archivable": true,
       "retrievable": false,
       "publishable": true,
       "dateOfDiskPurging": "2020-04-08T08:10:06.713Z",
       "archiveRetentionTime": "2020-04-08T08:10:06.713Z",
       "dateOfPublishing": "2020-04-08T08:10:06.713Z",
       "isOnCentralDisk": true,
       "archiveStatusMessage": "string",
       "retrieveStatusMessage": "string",
       "archiveReturnMessage": {},
       "retrieveReturnMessage": {},
       "exportedTo": "string",
       "retrieveIntegrityCheck": true
     },
     "history": [],
     "instrumentId": "string",
     "techniques": [
       {
         "pid": "string",
         "name": "Example technique"
       }
     ]
   }
   ```
3. Click *Try it out!*


#### Using curl

1. Send a post request through curl, e.g.:
   ```sh
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
      "principalInvestigator": "firstnamelastname%40example.com", \ 
      "endTime": "2020-04-08T08:10:07.553Z", \ 
      "creationLocation": "/Site-name/facility-name/instrumentOrBeamline-name", \ 
      "dataFormat": "Nexus Version x.y", \ 
      "scientificMetadata": {}, \ 
      "owner": "firsnamelastname", \ 
      "ownerEmail": "firstnamelastname%40example.com", \ 
      "orcidOfOwner": "https://orcid.org/0000-0000-0000-0000", \ 
      "contactEmail": "firstnamelastname%40example.com", \ 
      "sourceFolder": "/some/path/to/sourcefolder", \ 
      "sourceFolderHost": "[protocol://]fileserver1.example.com", \ 
      "size": 0, \ 
      "packedSize": 0, \ 
      "creationTime": "2020-04-08T08:10:06.713Z", \ 
      "type": "raw", \ 
      "validationStatus": "string", \ 
      "keywords": [], \ 
      "description": "Description of my example dataset.", \ 
      "datasetName": "Example Dataset", \ 
      "classification": "AV=medium,CO=low", \ 
      "license": "string", \ 
      "version": "string", \ 
      "isPublished": false, \ 
      "ownerGroup": "string", \ 
      "accessGroups": [], \ 
      "createdBy": "firstnamelastname", \ 
      "createdAt": "2020-04-08T08:10:06.713Z", \ 
      "datasetlifecycle": { \ 
        "archivable": true, \ 
        "retrievable": false, \ 
        "publishable": true, \ 
        "dateOfDiskPurging": "2020-04-08T08:10:06.713Z", \ 
        "archiveRetentionTime": "2020-04-08T08:10:06.713Z", \ 
        "dateOfPublishing": "2020-04-08T08:10:06.713Z", \ 
        "isOnCentralDisk": true, \ 
        "archiveStatusMessage": "string", \ 
        "retrieveStatusMessage": "string", \ 
        "archiveReturnMessage": {}, \ 
        "retrieveReturnMessage": {}, \ 
        "exportedTo": "string", \ 
        "retrieveIntegrityCheck": true \ 
      }, \ 
      "history": [], \ 
      "instrumentId": "string", \ 
      "techniques": [ \ 
        { \ 
          "pid": "string", \ 
          "name": "Example technique" \ 
        } \ 
      ] \ 
    }' 'http://localhost/api/v3/Datasets?access_token=[YOUR_ACCESS_TOKEN]'
   ```


### Adding Datablocks


#### Through the API Explorer
1. Go to http://localhost/explorer/#!/Dataset/Dataset_prototype_create_origdatablocks
2. Add the dataset `pid` in the the *id* text box
3. Add your datablock in JSON format to the *data* text box, e.g.:
   ```json
   {
     "size": 0,
     "dataFileList": [
       {
         "path": "/relative/path/to/file/within/dataset/folder",
         "size": 0,
         "time": "2020-04-08T08:10:06.822Z",
         "chk": "string",
         "uid": "string",
         "gid": "string",
         "perm": "string"
       }
     ],
     "ownerGroup": "string",
     "accessGroups": [],
     "createdBy": "firstnamelastname",
     "createdAt": "2020-04-08T08:10:06.822Z"
   }
   ```
4. Click *Try it out!*

#### Using curl

1. Send a post request through curl, e.g.:
   ```sh
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
      "size": 0, \ 
      "dataFileList": [ \ 
        { \ 
          "path": "string", \ 
          "size": 0, \ 
          "time": "2020-04-08T08:10:06.822Z", \ 
          "chk": "string", \ 
          "uid": "string", \ 
          "gid": "string", \ 
          "perm": "string" \ 
        } \ 
      ], \ 
      "ownerGroup": "ess", \ 
      "accessGroups": [], \ 
      "createdBy": "string", \ 
      "createdAt": "2020-04-08T08:10:06.822Z" \ 
    }' 'http://localhost/api/v3/Datasets/[YOUR_DATASET_PID]/origdatablocks?access_token=[YOUR_ACCESS_TOKEN]'
   ```
