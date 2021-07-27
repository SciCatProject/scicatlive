import requests
from datetime import datetime, timedelta
import json
def now_as_scicat_datetime_format():
    return datetime.strftime(datetime.now(), "%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"

def delta_as_scicat_datetime_format( days=0):
    return datetime.strftime(datetime.now() + timedelta(days=days), "%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"

payload = {
  "principalInvestigator": "alpha.beta@mydomain.org",
  "endTime": now_as_scicat_datetime_format(),
  "creationLocation": "Instrument 1",
  "scientificMetadata": {},
  "ownerEmail": "alpha.beta@mydomain.org",
  "ownerGroup": "Users 1",
  "owner": "Alpha Beta",
  "orcidOfOwner": "https://orcid.org/0000-0000-0000-0000",
  "contactEmail": "alpha.beta@mydomain.org",
  "sourceFolder": "my_file_1.txt",
  "sourceFolderHost": "https://mybucket.mycloud.org/",
  "size": 0,
  "packedSize": 0,
  "creationTime": now_as_scicat_datetime_format(),
  "type": "raw",
  "validationStatus": "string",
  "keywords": [],
  "description": "Description of my example dataset.",
  "datasetName": "Example Dataset",
  "classification": "AV=medium,CO=low",
  "license": "string",
  "isPublished": True,
  "createdBy": "Alpha Beta",
  "creationLocation": "Beamline 1",
  "createdAt": now_as_scicat_datetime_format(),
  "datasetlifecycle": {
    "archivable": False,
    "retrievable": False,
    "publishable": False,
    "dateOfDiskPurging": delta_as_scicat_datetime_format(days=736),
    "archiveRetentionTime": delta_as_scicat_datetime_format(days=3652),
    "dateOfPublishing": delta_as_scicat_datetime_format(days=184),
    "isOnCentralDisk": True,
    "archiveStatusMessage": "archive job sent",
    "retrieveStatusMessage": "retrieve job sent",
    "archiveReturnMessage": {},
    "retrieveReturnMessage": {},
    "exportedTo": "string",
    "retrieveIntegrityCheck": True
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

BASE_URL = 'http://localhost/api/v3/'

# get token
r = requests.post(BASE_URL + 'Users/login', json=dict(username='ingestor', password='ingestor1'))
token = r.json()['id']
print(f'token: {token}')

r = requests.post(BASE_URL + 'Datasets', json= payload, params={'access_token': token})
print(f'r: {r}')
print(f'r.text: {r.text}')