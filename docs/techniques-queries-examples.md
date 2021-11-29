# Techniques Queries Examples

This document illustrate how the techniques in the PaNOSC datasets are queried with real example.
To run this examples, you need to run a SciCatLive version on your machie, which includes the PaNOSC Search Api.
The results are the ones that you would get when running SciCatLive as is with its example datasets.

## Datasets	

In order to provide meaningful examples, we need to define few datasets and the related set of techniques which are tagged with.  
The datasets are defined in the test dataset provided with the vanilla installation of SciCatLive, and are listed below for coneniency. Each dataset is listed with the technique that is tagged with and the relativer technique pid.


| Dataset id                   | Technique Name                                                               | Technique PID  |
| ---------------------------- | ---------------------------------------------------------------------------- | -------------- |
| PID.SAMPLE.PREFIX/desy_ds1   | resonant inelastic x-ray scattering                                          | http://purl.org/pan-science/PaNET/PaNET01183 |
| PID.SAMPLE.PREFIX/desy_ds2   | resonant inelastic x-ray scattering	                                        | http://purl.org/pan-science/PaNET/PaNET01183 |
| PID.SAMPLE.PREFIX/desy_ds3   | resonant inelastic x-ray scattering	                                        | http://purl.org/pan-science/PaNET/PaNET01183 |
| PID.SAMPLE.PREFIX/dls_ds1    | anomalous solution x-ray scattering	                                        | http://purl.org/pan-science/PaNET/PaNET01275 |
| PID.SAMPLE.PREFIX/dls_ds2    | grazing incidence small angle x-ray scattering	                              | http://purl.org/pan-science/PaNET/PaNET01162 |
| PID.SAMPLE.PREFIX/hzdr_ds1   | inelastic x-ray small angle scattering	                                      | http://purl.org/pan-science/PaNET/PaNET01281 |
| PID.SAMPLE.PREFIX/maxiv_ds1  | resonant inelastic x-ray scattering	                                        | http://purl.org/pan-science/PaNET/PaNET01183 |
| PID.SAMPLE.PREFIX/maxiv_ds2  | soft x-ray small angle scattering	                                          | http://purl.org/pan-science/PaNET/PaNET01282 |
| PID.SAMPLE.PREFIX/psi_ds1    | magnetic x-ray tomography	                                                  | http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/psi_ds2    | magnetic x-ray tomography                                                    | http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/psi_ds3    | magnetic x-ray tomography                                                    | http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy                                                  | http://purl.org/pan-science/PaNET/PaNET01200 |
| PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy                                                  | http://purl.org/pan-science/PaNET/PaNET01200 |
| PID.SAMPLE.PREFIX/ukri_ds1   | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography                | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/ukri_ds2   | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography                | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/ukri_ds3   | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography                | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/ukri_ds4   | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography                | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
| PID.SAMPLE.PREFIX/ukri_ds5   | x-ray emission spectroscopy ,<br /> grazing incidence small angle scattering | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01162 |
| PID.SAMPLE.PREFIX/ukri_ds6   | x-ray emission spectroscopy ,<br /> anomalous solution x-ray scattering      | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01275 |

Here is the information about the techniques and their pid/URL

| Technique name                                  | Technique pid / URL                          |
| ----------------------------------------------- | -------------------------------------------- |
| resonant inelastic x-ray scattering             | http://purl.org/pan-science/PaNET/PaNET01183 |
| anomalous solution x-ray scattering	            | http://purl.org/pan-science/PaNET/PaNET01275 |
| grazing incidence small angle x-ray scattering  | http://purl.org/pan-science/PaNET/PaNET01162 |
| inelastic x-ray small angle scattering	        | http://purl.org/pan-science/PaNET/PaNET01281 |
| soft x-ray small angle scattering	              | http://purl.org/pan-science/PaNET/PaNET01282 |
| magnetic x-ray tomography	                      | http://purl.org/pan-science/PaNET/PaNET01313 |
| x-ray emission spectroscopy                     | http://purl.org/pan-science/PaNET/PaNET01200 |


## Notes

 - In the example section below, only the relevant portion of the query is presented
 - Techniques are referenced by name, but it is preferred to execute the query using their pids

## Examples

### Query 1

#### Use case:
A user is looking for datasets which are tagged with the term *x-ray emission spectroscopy* or any of its descendants

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name": "x-ray emission spectroscopy"
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"name":"x-ray emission spectroscopy"}}}]}
```
Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22x-ray%20emission%20spectroscopy%22%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22x-ray%20emission%20spectroscopy%22%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name" : {"eq" : "x-ray emission spectroscopy"}
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid" : {"eq" : "http://purl.org/pan-science/PaNET/PaNET01200"}
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid": { "inq" : [
            "http://purl.org/pan-science/PaNET/PaNET01200"
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/soleil_ds1 , PID.SAMPLE.PREFIX/soleil_ds2 , PID.SAMPLE.PREFIX/ukri_ds1 , PID.SAMPLE.PREFIX/ukri_ds2 , PID.SAMPLE.PREFIX/ukri_ds3 , PID.SAMPLE.PREFIX/ukri_ds4 , PID.SAMPLE.PREFIX/ukri_ds5 , PID.SAMPLE.PREFIX/ukri_ds6*

\
Query details: 
- techniques highlighted in **bold** are the techniques that match the query submitted
 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/dls_ds1 | anomalous solution x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01275 |
 |   | PID.SAMPLE.PREFIX/dls_ds2 | grazing incidence small angle x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01162 |
 |   | PID.SAMPLE.PREFIX/hzdr_ds1 | inelastic x-ray small angle scattering	| http://purl.org/pan-science/PaNET/PaNET01281 |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering	 | http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/maxiv_ds2 | soft x-ray small angle scattering	 | http://purl.org/pan-science/PaNET/PaNET01282 |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | magnetic x-ray tomography	 | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/soleil_ds1 | **x-ray emission spectroscopy**  | **http://purl.org/pan-science/PaNET/PaNET01200** |
 | Y | PID.SAMPLE.PREFIX/soleil_ds2 | **x-ray emission spectroscopy**  | **http://purl.org/pan-science/PaNET/PaNET01200** |
 | Y | PID.SAMPLE.PREFIX/ukri_ds1 | **x-ray emission spectroscopy** ,<br /> magnetic x-ray tomography | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds2 | **x-ray emission spectroscopy** ,<br /> magnetic x-ray tomography | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds3 | **x-ray emission spectroscopy** ,<br /> magnetic x-ray tomography | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds4 | **x-ray emission spectroscopy** ,<br /> magnetic x-ray tomography | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds5 | **x-ray emission spectroscopy** ,<br /> grazing incidence small angle scattering | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01162 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds6 | **x-ray emission spectroscopy** ,<br /> anomalous solution x-ray scattering | **http://purl.org/pan-science/PaNET/PaNET01200** ,<br /> http://purl.org/pan-science/PaNET/PaNET01275 |

#### Status
*verified* and *validated*


### Query 2

#### Use case:
A user is searching for datasets tagged with technique *small angle scattering* or any of its descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name": "small angle scattering"
        }
      }
    }
  ,
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"name":"small angle scattering"}}}]}
```
Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22small%20angle%20scattering%22%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22small%20angle%20scattering%22%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name" : {"eq" : "small angle scattering"}
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid" : {"eq" : "http://purl.org/pan-science/PaNET/PaNET01124"}
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid": { "inq" : [
            "http://purl.org/pan-science/PaNET/PaNET01124",
            "http://purl.org/pan-science/PaNET/PaNET01127",
            "http://purl.org/pan-science/PaNET/PaNET01189",
            "http://purl.org/pan-science/PaNET/PaNET01277",
            "http://purl.org/pan-science/PaNET/PaNET01099",
            "http://purl.org/pan-science/PaNET/PaNET01276",
            "http://purl.org/pan-science/PaNET/PaNET01133",
            "http://purl.org/pan-science/PaNET/PaNET01278",
            "http://purl.org/pan-science/PaNET/PaNET01274",
            "http://purl.org/pan-science/PaNET/PaNET01275",
            "http://purl.org/pan-science/PaNET/PaNET01188",
            "http://purl.org/pan-science/PaNET/PaNET01282",
            "http://purl.org/pan-science/PaNET/PaNET01281",
            "http://purl.org/pan-science/PaNET/PaNET01273",
            "http://purl.org/pan-science/PaNET/PaNET01279",
            "http://purl.org/pan-science/PaNET/PaNET01280",
            "http://purl.org/pan-science/PaNET/PaNET01107",
            "http://purl.org/pan-science/PaNET/PaNET01162",
            "http://purl.org/pan-science/PaNET/PaNET01286",
            "http://purl.org/pan-science/PaNET/PaNET01287",
            "http://purl.org/pan-science/PaNET/PaNET01241",
            "http://purl.org/pan-science/PaNET/PaNET01240"
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/dls_ds1 , PID.SAMPLE.PREFIX/dls_ds2 , PID.SAMPLE.PREFIX/hzdr_ds1 , PID.SAMPLE.PREFIX/maxiv_ds2 , PID.SAMPLE.PREFIX/ukri_ds5 , PID.SAMPLE.PREFIX/ukri_ds6*

\
Query details: 
- techniques highlighted in **bold** are the techniques that match the query submitted
 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | **anomalous solution x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01275** |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | **grazing incidence small angle x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01162** |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | **inelastic x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01281** |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | **soft x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01282** |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | magnetic x-ray tomography	 | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds5 | x-ray emission spectroscopy ,<br /> **grazing incidence small angle scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01162** |
 | Y | PID.SAMPLE.PREFIX/ukri_ds6 | x-ray emission spectroscopy ,<br /> **anomalous solution x-ray scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01275** |


#### Status
*verified* and *validated*


### Query 3

#### Use case:
A user is looking for datasets that are not tagged with the term *X-ray emission spectroscopy* or any of its descendants.

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name": {
            "neq": "x-ray emission spectroscopy"
          }
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"name":{"neq":"x-ray emission spectroscopy"}}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%7B%22neq%22%3A%22x-ray%20emission%20spectroscopy%22%7D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%7B%22neq%22%3A%22x-ray%20emission%20spectroscopy%22%7D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid" : {"neq" : "http://purl.org/pan-science/PaNET/PaNET01124"}
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid": { "nin" : [
            "http://purl.org/pan-science/PaNET/PaNET01200"
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/desy_ds1 , PID.SAMPLE.PREFIX/desy_ds2 , PID.SAMPLE.PREFIX/desy_ds3 , PID.SAMPLE.PREFIX/dls_ds1 , PID.SAMPLE.PREFIX/dls_ds2 , PID.SAMPLE.PREFIX/hzdr_ds1 , PID.SAMPLE.PREFIX/maxiv_ds1 , PID.SAMPLE.PREFIX/maxiv_ds2 , PID.SAMPLE.PREFIX/psi_ds1 , PID.SAMPLE.PREFIX/psi_ds2 , PID.SAMPLE.PREFIX/psi_ds3*

\
Query details: 
- techniques highlighted with ~~strikethrough~~ are the ones specified in the query which should not be present for the dataset to be selected

 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 | Y | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 | Y | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | anomalous solution x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01275 |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | grazing incidence small angle x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01162 |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | inelastic x-ray small angle scattering	| http://purl.org/pan-science/PaNET/PaNET01281 |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | soft x-ray small angle scattering	| http://purl.org/pan-science/PaNET/PaNET01282 |
 | Y | PID.SAMPLE.PREFIX/psi_ds1 | magnetic x-ray tomography	 | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/psi_ds2 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/psi_ds3 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | ~~x-ray emission spectroscopy~~  | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | ~~x-ray emission spectroscopy~~  | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | ~~x-ray emission spectroscopy~~ ,<br /> magnetic x-ray tomography | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | ~~x-ray emission spectroscopy~~ ,<br /> magnetic x-ray tomography | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | ~~x-ray emission spectroscopy~~ ,<br /> magnetic x-ray tomography | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | ~~x-ray emission spectroscopy~~ ,<br /> magnetic x-ray tomography | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds5 | ~~x-ray emission spectroscopy~~ ,<br /> grazing incidence small angle scattering | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01162 |
 |   | PID.SAMPLE.PREFIX/ukri_ds6 | ~~x-ray emission spectroscopy~~ ,<br /> anomalous solution x-ray scattering | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> http://purl.org/pan-science/PaNET/PaNET01275 |


#### Status
*verified* and *validated*


### Query 4

#### Use case:
A user is looking for datasets that are not tagged with the term *small angle scattering* or any of its descendants.

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "name": {
            "neq": "small angle scattering"
          }
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"name":{"neq":"small angle scattering"}}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%7B%22neq%22%3A%22small%20angle%20scattering%22%7D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%7B%22neq%22%3A%22small%20angle%20scattering%22%7D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid" : {"neq" : "http://purl.org/pan-science/PaNET/PaNET01124"}
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "pid": { "nin" : [
            "http://purl.org/pan-science/PaNET/PaNET01124",
            "http://purl.org/pan-science/PaNET/PaNET01127",
            "http://purl.org/pan-science/PaNET/PaNET01189",
            "http://purl.org/pan-science/PaNET/PaNET01277",
            "http://purl.org/pan-science/PaNET/PaNET01099",
            "http://purl.org/pan-science/PaNET/PaNET01276",
            "http://purl.org/pan-science/PaNET/PaNET01133",
            "http://purl.org/pan-science/PaNET/PaNET01278",
            "http://purl.org/pan-science/PaNET/PaNET01274",
            "http://purl.org/pan-science/PaNET/PaNET01275",
            "http://purl.org/pan-science/PaNET/PaNET01188",
            "http://purl.org/pan-science/PaNET/PaNET01282",
            "http://purl.org/pan-science/PaNET/PaNET01281",
            "http://purl.org/pan-science/PaNET/PaNET01273",
            "http://purl.org/pan-science/PaNET/PaNET01279",
            "http://purl.org/pan-science/PaNET/PaNET01280",
            "http://purl.org/pan-science/PaNET/PaNET01107",
            "http://purl.org/pan-science/PaNET/PaNET01162",
            "http://purl.org/pan-science/PaNET/PaNET01286",
            "http://purl.org/pan-science/PaNET/PaNET01287",
            "http://purl.org/pan-science/PaNET/PaNET01241",
            "http://purl.org/pan-science/PaNET/PaNET01240"
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/desy_ds1 , PID.SAMPLE.PREFIX/desy_ds2 , PID.SAMPLE.PREFIX/desy_ds3 , PID.SAMPLE.PREFIX/maxiv_ds1 , PID.SAMPLE.PREFIX/psi_ds1 , PID.SAMPLE.PREFIX/psi_ds2 , PID.SAMPLE.PREFIX/psi_ds3 , PID.SAMPLE.PREFIX/soleil_ds1 , PID.SAMPLE.PREFIX/soleil_ds2 , PID.SAMPLE.PREFIX/ukri_ds1 , PID.SAMPLE.PREFIX/ukri_ds2 , PID.SAMPLE.PREFIX/ukri_ds3 , PID.SAMPLE.PREFIX/ukri_ds4*

\
Query details: 
- techniques highlighted with ~~strikethrough~~ are the ones specified in the query which should not be present for the dataset to be selected

 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 | Y | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 | Y | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/dls_ds1 | ~~anomalous solution x-ray scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01275~~ |
 |   | PID.SAMPLE.PREFIX/dls_ds2 | ~~grazing incidence small angle x-ray scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01162~~ |
 |   | PID.SAMPLE.PREFIX/hzdr_ds1 | ~~inelastic x-ray small angle scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01281~~ |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/maxiv_ds2 | ~~soft x-ray small angle scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01282~~ |
 | Y | PID.SAMPLE.PREFIX/psi_ds1 | magnetic x-ray tomography	 | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/psi_ds2 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/psi_ds3 | magnetic x-ray tomography  | http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 | Y | PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds1 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds2 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds3 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds4 | x-ray emission spectroscopy ,<br /> magnetic x-ray tomography | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> http://purl.org/pan-science/PaNET/PaNET01313 |
 |   | PID.SAMPLE.PREFIX/ukri_ds5 | x-ray emission spectroscopy ,<br /> ~~grazing incidence small angle scattering~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01162~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds6 | x-ray emission spectroscopy ,<br /> ~~anomalous solution x-ray scattering~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01275~~ |


#### Status
*verified* and *validated*


### Query 5

#### Use case:
A user is searching for datasets tagged with both techniques *small angle scattering* and *magnetism technique* or any of their descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": "small angle scattering"
            },
            {
              "name": "magnetism technique"
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"and":[{"name":"small angle scattering"},{"name": "magnetism technique"}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22magnetism%20technique%22%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22magnetism%20technique%22%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "eq" : "magnetism technique"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET00207"
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET00207"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET00207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01143",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01142",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01252",
                  "http://purl.org/pan-science/PaNET/PaNET01141",
                  "http://purl.org/pan-science/PaNET/PaNET01253"
                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
No dataset is returned.

\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the and in the query, 
- techniques highlighted with *italic* are the ones matching the second operand of the and in the query, 
- there is no datasets where both techniques are higlighted

 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/dls_ds1 | **anomalous solution x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01275** |
 |   | PID.SAMPLE.PREFIX/dls_ds2 | **grazing incidence small angle x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01162** |
 |   | PID.SAMPLE.PREFIX/hzdr_ds1 | **inelastic x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01281** |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/maxiv_ds2 | **soft x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01282** |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | *magnetic x-ray tomography*	| *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds5 | x-ray emission spectroscopy ,<br /> **grazing incidence small angle scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01162** |
 |   | PID.SAMPLE.PREFIX/ukri_ds6 | x-ray emission spectroscopy ,<br /> **anomalous solution x-ray scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01275** |


#### Status
*verified* and *validated*


### Query 6

#### Use case:
A user is searching for datasets tagged with both techniques *small angle scattering* or *magnetism technique* or any of their descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or": [
            {
              "name": "small angle scattering"
            },
            {
              "name": "magnetism technique"
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"or":[{"name":"small angle scattering"},{"name": "magnetism technique"}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22magnetism%20technique%22%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22magnetism%20technique%22%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "eq" : "magnetism technique"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET00207"
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET00207"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET00207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01143",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01142",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01252",
                  "http://purl.org/pan-science/PaNET/PaNET01141",
                  "http://purl.org/pan-science/PaNET/PaNET01253"
                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/dls_ds1 , PID.SAMPLE.PREFIX/dls_ds2 , PID.SAMPLE.PREFIX/hzdr_ds1 , PID.SAMPLE.PREFIX/maxiv_ds2 , PID.SAMPLE.PREFIX/psi_ds1 , PID.SAMPLE.PREFIX/psi_ds2 , PID.SAMPLE.PREFIX/psi_ds3 , PID.SAMPLE.PREFIX/ukri_ds1 , PID.SAMPLE.PREFIX/ukri_ds2 , PID.SAMPLE.PREFIX/ukri_ds3 , PID.SAMPLE.PREFIX/ukri_ds4 , PID.SAMPLE.PREFIX/ukri_ds5 , PID.SAMPLE.PREFIX/ukri_ds6*


\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the and in the query, 
- techniques highlighted with *italic* are the ones matching the second operand of the and in the query, 

 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | **anomalous solution x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01275** |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | **grazing incidence small angle x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01162** |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | **inelastic x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01281** |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | **soft x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01282** |
 | Y | PID.SAMPLE.PREFIX/psi_ds1 | *magnetic x-ray tomography*	| *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/psi_ds2 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/psi_ds3 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 | Y | PID.SAMPLE.PREFIX/ukri_ds1 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds2 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds3 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds4 | x-ray emission spectroscopy ,<br /> *magnetic x-ray tomography* | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds5 | x-ray emission spectroscopy ,<br /> **grazing incidence small angle scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01162** |
 | Y | PID.SAMPLE.PREFIX/ukri_ds6 | x-ray emission spectroscopy ,<br /> **anomalous solution x-ray scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01275** |


#### Status
*verified* and *validated*


### Query 7

#### Use case:
A user is searching for datasets tagged with both techniques *small angle scattering* and *x-ray probe* or any of their descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": "small angle scattering"
            },
            {
              "name": "x-ray probe"
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"and":[{"name":"small angle scattering"},{"name": "x-ray probe"}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22x-ray%20probe%22%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22x-ray%20probe%22%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "eq" : "x-ray probe"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01012"
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01012"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01012",
                  "http://purl.org/pan-science/PaNET/PaNET01161",
                  "http://purl.org/pan-science/PaNET/PaNET01290",
                  "http://purl.org/pan-science/PaNET/PaNET01208",
                  "http://purl.org/pan-science/PaNET/PaNET01219",
                  "http://purl.org/pan-science/PaNET/PaNET01102",
                  "http://purl.org/pan-science/PaNET/PaNET01168",
                  "http://purl.org/pan-science/PaNET/PaNET01309",
                  "http://purl.org/pan-science/PaNET/PaNET01184",
                  "http://purl.org/pan-science/PaNET/PaNET01271",
                  "http://purl.org/pan-science/PaNET/PaNET01306",
                  "http://purl.org/pan-science/PaNET/PaNET01014",
                  "http://purl.org/pan-science/PaNET/PaNET01305",
                  "http://purl.org/pan-science/PaNET/PaNET01216",
                  "http://purl.org/pan-science/PaNET/PaNET01227",
                  "http://purl.org/pan-science/PaNET/PaNET01204",
                  "http://purl.org/pan-science/PaNET/PaNET01218",
                  "http://purl.org/pan-science/PaNET/PaNET01156",
                  "http://purl.org/pan-science/PaNET/PaNET01229",
                  "http://purl.org/pan-science/PaNET/PaNET01272",
                  "http://purl.org/pan-science/PaNET/PaNET01307",
                  "http://purl.org/pan-science/PaNET/PaNET01266",
                  "http://purl.org/pan-science/PaNET/PaNET01303",
                  "http://purl.org/pan-science/PaNET/PaNET01095",
                  "http://purl.org/pan-science/PaNET/PaNET01200",
                  "http://purl.org/pan-science/PaNET/PaNET01207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01186",
                  "http://purl.org/pan-science/PaNET/PaNET01187",
                  "http://purl.org/pan-science/PaNET/PaNET01015",
                  "http://purl.org/pan-science/PaNET/PaNET01302",
                  "http://purl.org/pan-science/PaNET/PaNET01180",
                  "http://purl.org/pan-science/PaNET/PaNET01314",
                  "http://purl.org/pan-science/PaNET/PaNET01224",
                  "http://purl.org/pan-science/PaNET/PaNET01191",
                  "http://purl.org/pan-science/PaNET/PaNET01316",
                  "http://purl.org/pan-science/PaNET/PaNET01315",
                  "http://purl.org/pan-science/PaNET/PaNET01169",
                  "http://purl.org/pan-science/PaNET/PaNET01312",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01311",
                  "http://purl.org/pan-science/PaNET/PaNET01262",
                  "http://purl.org/pan-science/PaNET/PaNET01261",
                  "http://purl.org/pan-science/PaNET/PaNET01284",
                  "http://purl.org/pan-science/PaNET/PaNET01167",
                  "http://purl.org/pan-science/PaNET/PaNET01182",
                  "http://purl.org/pan-science/PaNET/PaNET01183",
                  "http://purl.org/pan-science/PaNET/PaNET01172",
                  "http://purl.org/pan-science/PaNET/PaNET01310",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01283",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01260",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01149",
                  "http://purl.org/pan-science/PaNET/PaNET01013",
                  "http://purl.org/pan-science/PaNET/PaNET01103",
                  "http://purl.org/pan-science/PaNET/PaNET01300",
                  "http://purl.org/pan-science/PaNET/PaNET01327",
                  "http://purl.org/pan-science/PaNET/PaNET01205",
                  "http://purl.org/pan-science/PaNET/PaNET01238",
                  "http://purl.org/pan-science/PaNET/PaNET01196",
                  "http://purl.org/pan-science/PaNET/PaNET01197",
                  "http://purl.org/pan-science/PaNET/PaNET01199",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01173",
                  "http://purl.org/pan-science/PaNET/PaNET01325",
                  "http://purl.org/pan-science/PaNET/PaNET01258",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01297",
                  "http://purl.org/pan-science/PaNET/PaNET01165",
                  "http://purl.org/pan-science/PaNET/PaNET01289",
                  "http://purl.org/pan-science/PaNET/PaNET01285",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01295",
                  "http://purl.org/pan-science/PaNET/PaNET01101",
                  "http://purl.org/pan-science/PaNET/PaNET01140",
                  "http://purl.org/pan-science/PaNET/PaNET01322",
                  "http://purl.org/pan-science/PaNET/PaNET01160",
                  "http://purl.org/pan-science/PaNET/PaNET01294",
                  "http://purl.org/pan-science/PaNET/PaNET01198",
                  "http://purl.org/pan-science/PaNET/PaNET01321",
                  "http://purl.org/pan-science/PaNET/PaNET01193"                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
 | Query 7 datasets  |
 | ---------------------------- |
 | PID.SAMPLE.PREFIX/dls_ds1 | 
 | PID.SAMPLE.PREFIX/dls_ds2 | 
 | PID.SAMPLE.PREFIX/hzdr_ds1 | 
 | PID.SAMPLE.PREFIX/maxiv_ds2 | 
 | PID.SAMPLE.PREFIX/ukri_ds5 | 
 | PID.SAMPLE.PREFIX/ukri_ds6 |


\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the logical and in the query, 
- techniques highlighted with *italic* are the ones matching the second operand of the logical and in the query,
- techniques highlighted with ***bold and italic*** are the ones matching both the first and second operand of the logical and in the query,
- only datasets tagged with techniques that match the 2 and operands are selected 

 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | *resonant inelastic x-ray scattering* | *http://purl.org/pan-science/PaNET/PaNET01183* | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | *resonant inelastic x-ray scattering*	| *http://purl.org/pan-science/PaNET/PaNET01183* |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | *resonant inelastic x-ray scattering*	| *http://purl.org/pan-science/PaNET/PaNET01183* |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | ***anomalous solution x-ray scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01275*** |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | ***grazing incidence small angle x-ray scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01162*** |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | **inelastic x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01281** |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | *resonant inelastic x-ray scattering* | *http://purl.org/pan-science/PaNET/PaNET01183* |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | ***soft x-ray small angle scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01282*** |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | *magnetic x-ray tomography*	| *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | *x-ray emission spectroscopy*  | *http://purl.org/pan-science/PaNET/PaNET01200* |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | *x-ray emission spectroscopy*  | *http://purl.org/pan-science/PaNET/PaNET01200* |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds5 | *x-ray emission spectroscopy* ,<br /> **grazing incidence small angle scattering** | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> ***http://purl.org/pan-science/PaNET/PaNET01162*** |
 | Y | PID.SAMPLE.PREFIX/ukri_ds6 | *x-ray emission spectroscopy* ,<br /> **anomalous solution x-ray scattering** | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> ***http://purl.org/pan-science/PaNET/PaNET01275*** |


#### Status
*verified* and *validated*



### Query 8

#### Use case:
A user is searching for datasets tagged with both techniques *small angle scattering* or *x-ray probe* or any of their descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or": [
            {
              "name": "small angle scattering"
            },
            {
              "name": "x-ray probe"
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"or":[{"name":"small angle scattering"},{"name": "x-ray probe"}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22x-ray%20probe%22%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%22x-ray%20probe%22%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "eq" : "x-ray probe"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01012"
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01012"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "or":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01012",
                  "http://purl.org/pan-science/PaNET/PaNET01161",
                  "http://purl.org/pan-science/PaNET/PaNET01290",
                  "http://purl.org/pan-science/PaNET/PaNET01208",
                  "http://purl.org/pan-science/PaNET/PaNET01219",
                  "http://purl.org/pan-science/PaNET/PaNET01102",
                  "http://purl.org/pan-science/PaNET/PaNET01168",
                  "http://purl.org/pan-science/PaNET/PaNET01309",
                  "http://purl.org/pan-science/PaNET/PaNET01184",
                  "http://purl.org/pan-science/PaNET/PaNET01271",
                  "http://purl.org/pan-science/PaNET/PaNET01306",
                  "http://purl.org/pan-science/PaNET/PaNET01014",
                  "http://purl.org/pan-science/PaNET/PaNET01305",
                  "http://purl.org/pan-science/PaNET/PaNET01216",
                  "http://purl.org/pan-science/PaNET/PaNET01227",
                  "http://purl.org/pan-science/PaNET/PaNET01204",
                  "http://purl.org/pan-science/PaNET/PaNET01218",
                  "http://purl.org/pan-science/PaNET/PaNET01156",
                  "http://purl.org/pan-science/PaNET/PaNET01229",
                  "http://purl.org/pan-science/PaNET/PaNET01272",
                  "http://purl.org/pan-science/PaNET/PaNET01307",
                  "http://purl.org/pan-science/PaNET/PaNET01266",
                  "http://purl.org/pan-science/PaNET/PaNET01303",
                  "http://purl.org/pan-science/PaNET/PaNET01095",
                  "http://purl.org/pan-science/PaNET/PaNET01200",
                  "http://purl.org/pan-science/PaNET/PaNET01207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01186",
                  "http://purl.org/pan-science/PaNET/PaNET01187",
                  "http://purl.org/pan-science/PaNET/PaNET01015",
                  "http://purl.org/pan-science/PaNET/PaNET01302",
                  "http://purl.org/pan-science/PaNET/PaNET01180",
                  "http://purl.org/pan-science/PaNET/PaNET01314",
                  "http://purl.org/pan-science/PaNET/PaNET01224",
                  "http://purl.org/pan-science/PaNET/PaNET01191",
                  "http://purl.org/pan-science/PaNET/PaNET01316",
                  "http://purl.org/pan-science/PaNET/PaNET01315",
                  "http://purl.org/pan-science/PaNET/PaNET01169",
                  "http://purl.org/pan-science/PaNET/PaNET01312",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01311",
                  "http://purl.org/pan-science/PaNET/PaNET01262",
                  "http://purl.org/pan-science/PaNET/PaNET01261",
                  "http://purl.org/pan-science/PaNET/PaNET01284",
                  "http://purl.org/pan-science/PaNET/PaNET01167",
                  "http://purl.org/pan-science/PaNET/PaNET01182",
                  "http://purl.org/pan-science/PaNET/PaNET01183",
                  "http://purl.org/pan-science/PaNET/PaNET01172",
                  "http://purl.org/pan-science/PaNET/PaNET01310",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01283",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01260",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01149",
                  "http://purl.org/pan-science/PaNET/PaNET01013",
                  "http://purl.org/pan-science/PaNET/PaNET01103",
                  "http://purl.org/pan-science/PaNET/PaNET01300",
                  "http://purl.org/pan-science/PaNET/PaNET01327",
                  "http://purl.org/pan-science/PaNET/PaNET01205",
                  "http://purl.org/pan-science/PaNET/PaNET01238",
                  "http://purl.org/pan-science/PaNET/PaNET01196",
                  "http://purl.org/pan-science/PaNET/PaNET01197",
                  "http://purl.org/pan-science/PaNET/PaNET01199",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01173",
                  "http://purl.org/pan-science/PaNET/PaNET01325",
                  "http://purl.org/pan-science/PaNET/PaNET01258",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01297",
                  "http://purl.org/pan-science/PaNET/PaNET01165",
                  "http://purl.org/pan-science/PaNET/PaNET01289",
                  "http://purl.org/pan-science/PaNET/PaNET01285",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01295",
                  "http://purl.org/pan-science/PaNET/PaNET01101",
                  "http://purl.org/pan-science/PaNET/PaNET01140",
                  "http://purl.org/pan-science/PaNET/PaNET01322",
                  "http://purl.org/pan-science/PaNET/PaNET01160",
                  "http://purl.org/pan-science/PaNET/PaNET01294",
                  "http://purl.org/pan-science/PaNET/PaNET01198",
                  "http://purl.org/pan-science/PaNET/PaNET01321",
                  "http://purl.org/pan-science/PaNET/PaNET01193"                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/desy_ds1 , PID.SAMPLE.PREFIX/desy_ds2 , PID.SAMPLE.PREFIX/desy_ds3 , PID.SAMPLE.PREFIX/dls_ds1 , PID.SAMPLE.PREFIX/dls_ds2 , PID.SAMPLE.PREFIX/hzdr_ds1 , PID.SAMPLE.PREFIX/maxiv_ds1 , PID.SAMPLE.PREFIX/maxiv_ds2 , PID.SAMPLE.PREFIX/psi_ds1 , PID.SAMPLE.PREFIX/psi_ds2 , PID.SAMPLE.PREFIX/psi_ds3 , PID.SAMPLE.PREFIX/soleil_ds1 , PID.SAMPLE.PREFIX/soleil_ds2 , PID.SAMPLE.PREFIX/ukri_ds1 , PID.SAMPLE.PREFIX/ukri_ds2 , PID.SAMPLE.PREFIX/ukri_ds3 , PID.SAMPLE.PREFIX/ukri_ds4 , PID.SAMPLE.PREFIX/ukri_ds5 , PID.SAMPLE.PREFIX/ukri_ds6*

\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the logical and in the query, 
- techniques highlighted with *italic* are the ones matching the second operand of the logical and in the query,
- techniques highlighted with ***bold and italic*** are the ones matching both the first and second operand of the logical and in the query,
 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 | Y | PID.SAMPLE.PREFIX/desy_ds1 | *resonant inelastic x-ray scattering* | *http://purl.org/pan-science/PaNET/PaNET01183* | 
 | Y | PID.SAMPLE.PREFIX/desy_ds2 | *resonant inelastic x-ray scattering*	| *http://purl.org/pan-science/PaNET/PaNET01183* |
 | Y | PID.SAMPLE.PREFIX/desy_ds3 | *resonant inelastic x-ray scattering*	| *http://purl.org/pan-science/PaNET/PaNET01183* |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | ***anomalous solution x-ray scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01275*** |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | ***grazing incidence small angle x-ray scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01162*** |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | ***inelastic x-ray small angle scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01281*** |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds1 | *resonant inelastic x-ray scattering* | *http://purl.org/pan-science/PaNET/PaNET01183* |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | ***soft x-ray small angle scattering***	| ***http://purl.org/pan-science/PaNET/PaNET01282*** |
 | Y | PID.SAMPLE.PREFIX/psi_ds1 | *magnetic x-ray tomography*	| *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/psi_ds2 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/psi_ds3 | *magnetic x-ray tomography*  | *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/soleil_ds1 | *x-ray emission spectroscopy*  | *http://purl.org/pan-science/PaNET/PaNET01200* |
 | Y | PID.SAMPLE.PREFIX/soleil_ds2 | *x-ray emission spectroscopy*  | *http://purl.org/pan-science/PaNET/PaNET01200* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds1 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds2 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds3 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds4 | *x-ray emission spectroscopy* ,<br /> *magnetic x-ray tomography* | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> *http://purl.org/pan-science/PaNET/PaNET01313* |
 | Y | PID.SAMPLE.PREFIX/ukri_ds5 | *x-ray emission spectroscopy* ,<br /> ***grazing incidence small angle scattering*** | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> ***http://purl.org/pan-science/PaNET/PaNET01162*** |
 | Y | PID.SAMPLE.PREFIX/ukri_ds6 | *x-ray emission spectroscopy* ,<br /> ***anomalous solution x-ray scattering*** | *http://purl.org/pan-science/PaNET/PaNET01200* ,<br /> ***http://purl.org/pan-science/PaNET/PaNET01275*** |


#### Status
*verified* and *validated*



### Query 9

#### Use case:
A user is looking for datasets tagged with technique *small angle scattering* or any of its descendants but not with *x-ray probe* or any of its descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": "small angle scattering"
            },
            {
              "name": {
                "neq": "x-ray probe"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"and":[{"name":"small angle scattering"},{"name": {"neq" : "x-ray probe"}}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%7B%22neq%22%20%3A%20%22x-ray%20probe%22%7D%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%7B%22neq%22%20%3A%20%22x-ray%20probe%22%7D%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "neq" : "x-ray probe"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : {
                "new" : "http://purl.org/pan-science/PaNET/PaNET01012"
              }
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "neq" : "http://purl.org/pan-science/PaNET/PaNET01012"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "nin" : [
                  "http://purl.org/pan-science/PaNET/PaNET01012",
                  "http://purl.org/pan-science/PaNET/PaNET01161",
                  "http://purl.org/pan-science/PaNET/PaNET01290",
                  "http://purl.org/pan-science/PaNET/PaNET01208",
                  "http://purl.org/pan-science/PaNET/PaNET01219",
                  "http://purl.org/pan-science/PaNET/PaNET01102",
                  "http://purl.org/pan-science/PaNET/PaNET01168",
                  "http://purl.org/pan-science/PaNET/PaNET01309",
                  "http://purl.org/pan-science/PaNET/PaNET01184",
                  "http://purl.org/pan-science/PaNET/PaNET01271",
                  "http://purl.org/pan-science/PaNET/PaNET01306",
                  "http://purl.org/pan-science/PaNET/PaNET01014",
                  "http://purl.org/pan-science/PaNET/PaNET01305",
                  "http://purl.org/pan-science/PaNET/PaNET01216",
                  "http://purl.org/pan-science/PaNET/PaNET01227",
                  "http://purl.org/pan-science/PaNET/PaNET01204",
                  "http://purl.org/pan-science/PaNET/PaNET01218",
                  "http://purl.org/pan-science/PaNET/PaNET01156",
                  "http://purl.org/pan-science/PaNET/PaNET01229",
                  "http://purl.org/pan-science/PaNET/PaNET01272",
                  "http://purl.org/pan-science/PaNET/PaNET01307",
                  "http://purl.org/pan-science/PaNET/PaNET01266",
                  "http://purl.org/pan-science/PaNET/PaNET01303",
                  "http://purl.org/pan-science/PaNET/PaNET01095",
                  "http://purl.org/pan-science/PaNET/PaNET01200",
                  "http://purl.org/pan-science/PaNET/PaNET01207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01186",
                  "http://purl.org/pan-science/PaNET/PaNET01187",
                  "http://purl.org/pan-science/PaNET/PaNET01015",
                  "http://purl.org/pan-science/PaNET/PaNET01302",
                  "http://purl.org/pan-science/PaNET/PaNET01180",
                  "http://purl.org/pan-science/PaNET/PaNET01314",
                  "http://purl.org/pan-science/PaNET/PaNET01224",
                  "http://purl.org/pan-science/PaNET/PaNET01191",
                  "http://purl.org/pan-science/PaNET/PaNET01316",
                  "http://purl.org/pan-science/PaNET/PaNET01315",
                  "http://purl.org/pan-science/PaNET/PaNET01169",
                  "http://purl.org/pan-science/PaNET/PaNET01312",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01311",
                  "http://purl.org/pan-science/PaNET/PaNET01262",
                  "http://purl.org/pan-science/PaNET/PaNET01261",
                  "http://purl.org/pan-science/PaNET/PaNET01284",
                  "http://purl.org/pan-science/PaNET/PaNET01167",
                  "http://purl.org/pan-science/PaNET/PaNET01182",
                  "http://purl.org/pan-science/PaNET/PaNET01183",
                  "http://purl.org/pan-science/PaNET/PaNET01172",
                  "http://purl.org/pan-science/PaNET/PaNET01310",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01283",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01260",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01149",
                  "http://purl.org/pan-science/PaNET/PaNET01013",
                  "http://purl.org/pan-science/PaNET/PaNET01103",
                  "http://purl.org/pan-science/PaNET/PaNET01300",
                  "http://purl.org/pan-science/PaNET/PaNET01327",
                  "http://purl.org/pan-science/PaNET/PaNET01205",
                  "http://purl.org/pan-science/PaNET/PaNET01238",
                  "http://purl.org/pan-science/PaNET/PaNET01196",
                  "http://purl.org/pan-science/PaNET/PaNET01197",
                  "http://purl.org/pan-science/PaNET/PaNET01199",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01173",
                  "http://purl.org/pan-science/PaNET/PaNET01325",
                  "http://purl.org/pan-science/PaNET/PaNET01258",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01297",
                  "http://purl.org/pan-science/PaNET/PaNET01165",
                  "http://purl.org/pan-science/PaNET/PaNET01289",
                  "http://purl.org/pan-science/PaNET/PaNET01285",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01295",
                  "http://purl.org/pan-science/PaNET/PaNET01101",
                  "http://purl.org/pan-science/PaNET/PaNET01140",
                  "http://purl.org/pan-science/PaNET/PaNET01322",
                  "http://purl.org/pan-science/PaNET/PaNET01160",
                  "http://purl.org/pan-science/PaNET/PaNET01294",
                  "http://purl.org/pan-science/PaNET/PaNET01198",
                  "http://purl.org/pan-science/PaNET/PaNET01321",
                  "http://purl.org/pan-science/PaNET/PaNET01193"                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
No dataset is returnec

\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the logical and in the query, 
- techniques highlighted with ~~strikethrough~~ are the ones matching the second operand of the logical and in the query. They need not to be present in order for the dataset to be selected
- techniques highlighted with ~~**bold and strikethrought**~~ are the ones matching both the first and second operand of the logical and in the query,
 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | ~~resonant inelastic x-ray scattering~~ | ~~http://purl.org/pan-science/PaNET/PaNET01183~~ | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | ~~resonant inelastic x-ray scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01183~~ |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | ~~resonant inelastic x-ray scattering~~	| ~~http://purl.org/pan-science/PaNET/PaNET01183~~ |
 |   | PID.SAMPLE.PREFIX/dls_ds1 | ~~**anomalous solution x-ray scattering**~~	| ~~**http://purl.org/pan-science/PaNET/PaNET01275**~~ |
 |   | PID.SAMPLE.PREFIX/dls_ds2 | ~~**grazing incidence small angle x-ray scattering**~~	| ~~**http://purl.org/pan-science/PaNET/PaNET01162**~~ |
 |   | PID.SAMPLE.PREFIX/hzdr_ds1 | ~~**inelastic x-ray small angle scattering**~~	| ~~**http://purl.org/pan-science/PaNET/PaNET01281**~~ |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | ~~resonant inelastic x-ray scattering~~ | ~~http://purl.org/pan-science/PaNET/PaNET01183~~ |
 |   | PID.SAMPLE.PREFIX/maxiv_ds2 | ~~**soft x-ray small angle scattering**~~	| ~~**http://purl.org/pan-science/PaNET/PaNET01282**~~ |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | ~~magnetic x-ray tomography~~	| ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | ~~magnetic x-ray tomography~~  | ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | ~~magnetic x-ray tomography~~  | ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | ~~x-ray emission spectroscopy~~  | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | ~~x-ray emission spectroscopy~~  | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | ~~x-ray emission spectroscopy~~ ,<br /> ~~magnetic x-ray tomography~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | ~~x-ray emission spectroscopy~~ ,<br /> ~~magnetic x-ray tomography~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | ~~x-ray emission spectroscopy~~ ,<br /> ~~magnetic x-ray tomography~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | ~~x-ray emission spectroscopy~~ ,<br /> ~~magnetic x-ray tomography~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds5 | ~~x-ray emission spectroscopy~~ ,<br /> ~~**grazing incidence small angle scattering**~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~**http://purl.org/pan-science/PaNET/PaNET01162**~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds6 | ~~x-ray emission spectroscopy~~ ,<br /> ~~**anomalous solution x-ray scattering**~~ | ~~http://purl.org/pan-science/PaNET/PaNET01200~~ ,<br /> ~~**http://purl.org/pan-science/PaNET/PaNET01275**~~ |


#### Status
*verified* and *validated*


### Query 9

#### Use case:
A user is looking for datasets tagged with technique *small angle scattering* or any of its descendants but not with *magnetism technique* or any of its descendants 

#### User query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": "small angle scattering"
            },
            {
              "name": {
                "neq": "magnetism technique"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Compact format:  
```json
{"include":[{"relation":"techniques","scope":{"where":{"and":[{"name":"small angle scattering"},{"name": {"neq" : "magnetism technique"}}]}}}]}
```

Request URL:  
`http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%7B%22neq%22%20%3A%20%22magnetism%20technique%22%7D%7D%5D%7D%7D%7D%5D%7D`

Curl commnad
```bash
curl -X GET --header 'Accept: application/json' 'http://localhost/panosc-api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22small%20angle%20scattering%22%7D%2C%7B%22name%22%3A%20%7B%22neq%22%20%3A%20%22magnetism%20technique%22%7D%7D%5D%7D%7D%7D%5D%7D'
```

Equivalent user query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and": [
            {
              "name": {
                "eq" : "small angle scattering"
              }
            },
            {
              "name": {
                "neq" : "magnetism technique"
              }
            }
          ]
        }
      }
    }
  ]
}


{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : "http://purl.org/pan-science/PaNET/PaNET01124"
            },
            {
              "pid" : {
                "new" : "http://purl.org/pan-science/PaNET/PaNET00207"
              }
            }
          ]
        }
      }
    }
  ]
}

{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and" : [
            {
              "pid" : {
                "eq" : "http://purl.org/pan-science/PaNET/PaNET01124"
              }
            },
            {
              "pid" : {
                "neq" : "http://purl.org/pan-science/PaNET/PaNET00207"
              }
            }
          ]
        }
      }
    }
  ]
}
```

Interpreted query:
```json
{
  "include": [
    {
      "relation": "techniques",
      "scope": {
        "where": {
          "and":[
            {
              "pid" : {
                "inq" : [
                  "http://purl.org/pan-science/PaNET/PaNET01124",
                  "http://purl.org/pan-science/PaNET/PaNET01127",
                  "http://purl.org/pan-science/PaNET/PaNET01189",
                  "http://purl.org/pan-science/PaNET/PaNET01277",
                  "http://purl.org/pan-science/PaNET/PaNET01099",
                  "http://purl.org/pan-science/PaNET/PaNET01276",
                  "http://purl.org/pan-science/PaNET/PaNET01133",
                  "http://purl.org/pan-science/PaNET/PaNET01278",
                  "http://purl.org/pan-science/PaNET/PaNET01274",
                  "http://purl.org/pan-science/PaNET/PaNET01275",
                  "http://purl.org/pan-science/PaNET/PaNET01188",
                  "http://purl.org/pan-science/PaNET/PaNET01282",
                  "http://purl.org/pan-science/PaNET/PaNET01281",
                  "http://purl.org/pan-science/PaNET/PaNET01273",
                  "http://purl.org/pan-science/PaNET/PaNET01279",
                  "http://purl.org/pan-science/PaNET/PaNET01280",
                  "http://purl.org/pan-science/PaNET/PaNET01107",
                  "http://purl.org/pan-science/PaNET/PaNET01162",
                  "http://purl.org/pan-science/PaNET/PaNET01286",
                  "http://purl.org/pan-science/PaNET/PaNET01287",
                  "http://purl.org/pan-science/PaNET/PaNET01241",
                  "http://purl.org/pan-science/PaNET/PaNET01240"
                ]
              }
            },
            {
              "pid" : {
                "nin": [
                  "http://purl.org/pan-science/PaNET/PaNET00207",
                  "http://purl.org/pan-science/PaNET/PaNET01313",
                  "http://purl.org/pan-science/PaNET/PaNET01143",
                  "http://purl.org/pan-science/PaNET/PaNET01301",
                  "http://purl.org/pan-science/PaNET/PaNET01137",
                  "http://purl.org/pan-science/PaNET/PaNET01221",
                  "http://purl.org/pan-science/PaNET/PaNET01142",
                  "http://purl.org/pan-science/PaNET/PaNET01259",
                  "http://purl.org/pan-science/PaNET/PaNET01252",
                  "http://purl.org/pan-science/PaNET/PaNET01141",
                  "http://purl.org/pan-science/PaNET/PaNET01253"
                ]
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Dataset returned
*PID.SAMPLE.PREFIX/dls_ds1 , PID.SAMPLE.PREFIX/dls_ds2 , PID.SAMPLE.PREFIX/hzdr_ds1 , PID.SAMPLE.PREFIX/maxiv_ds2 , PID.SAMPLE.PREFIX/ukri_ds5 , PID.SAMPLE.PREFIX/ukri_ds6*


\
Query details: 
- techniques highlighted with **bold** are the ones matching the first operand of the logical and in the query, 
- techniques highlighted with ~~strikethrough~~ are the ones matching the second operand of the logical and in the query. They need not to be present in order for the dataset to be selected
- techniques highlighted with ~~**bold and strikethrought**~~ are the ones matching both the first and second operand of the logical and in the query,
 
 | Selected | Dataset id | Technique Name | Technique PID |
 | :-: | - | - | - |
 |   | PID.SAMPLE.PREFIX/desy_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 | 
 |   | PID.SAMPLE.PREFIX/desy_ds2 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 |   | PID.SAMPLE.PREFIX/desy_ds3 | resonant inelastic x-ray scattering	| http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/dls_ds1 | **anomalous solution x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01275** |
 | Y | PID.SAMPLE.PREFIX/dls_ds2 | **grazing incidence small angle x-ray scattering**	| **http://purl.org/pan-science/PaNET/PaNET01162** |
 | Y | PID.SAMPLE.PREFIX/hzdr_ds1 | **inelastic x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01281** |
 |   | PID.SAMPLE.PREFIX/maxiv_ds1 | resonant inelastic x-ray scattering | http://purl.org/pan-science/PaNET/PaNET01183 |
 | Y | PID.SAMPLE.PREFIX/maxiv_ds2 | **soft x-ray small angle scattering**	| **http://purl.org/pan-science/PaNET/PaNET01282** |
 |   | PID.SAMPLE.PREFIX/psi_ds1 | ~~magnetic x-ray tomography~~	| ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/psi_ds2 | ~~magnetic x-ray tomography~~  | ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/psi_ds3 | ~~magnetic x-ray tomography~~  | ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/soleil_ds1 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/soleil_ds2 | x-ray emission spectroscopy  | http://purl.org/pan-science/PaNET/PaNET01200 |
 |   | PID.SAMPLE.PREFIX/ukri_ds1 | x-ray emission spectroscopy ,<br /> ~~magnetic x-ray tomography~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds2 | x-ray emission spectroscopy ,<br /> ~~magnetic x-ray tomography~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds3 | x-ray emission spectroscopy ,<br /> ~~magnetic x-ray tomography~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds4 | x-ray emission spectroscopy ,<br /> ~~magnetic x-ray tomography~~ | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> ~~http://purl.org/pan-science/PaNET/PaNET01313~~ |
 |   | PID.SAMPLE.PREFIX/ukri_ds5 | x-ray emission spectroscopy ,<br /> **grazing incidence small angle scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01162** |
 |   | PID.SAMPLE.PREFIX/ukri_ds6 | x-ray emission spectroscopy ,<br /> **anomalous solution x-ray scattering** | http://purl.org/pan-science/PaNET/PaNET01200 ,<br /> **http://purl.org/pan-science/PaNET/PaNET01275** |


#### Status
*verified* and *validate*


## Credits
This document has been prepared by Massimiliano (Max) Novelli (max.novelli@ess.eu) while testing the techiniques functionalities during the approval process of the github PR.
