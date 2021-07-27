# Scicat: Docker Compose Lite

## Quick start
See scicatlive/README.md

## Structure of Project

### docker-compose.yml

The docker-compose file spins up a local service of Scicat with a complete set of services that need to run it. The 
services, and an explanation of what they are do follows:

* reverse-proxy - using traefik to create a reverse-proxy for catamel and catanie

* openldap - uses ldap as an authentication service and holds the security model for users of scicat. 

* mongodb - NoSQL database which catamel reads from and writes to.

* catamel  - backend framework written in loopback, requires mongodb and openldap services

* catanie - frontend content written in nodejs connects to catamel.

### Catamel config files

There are five catamel config files:

* config.local.js - this file sets up all the configuration for extensions to catamel such as PID prefixes, job 
messages and rabbitmq. This file does not have to be changed in test, catamel will run with it in its default settings.
  
* datasources.local.json - this file sets up the configuration of the mongodb database, including ports and host name. 
In this case docker compose is handling the networking, so host is just the name of the service, however this can be set 
  to the uri of an external mongodb.
  
* providers.json - this file sets up the configuration to the ldap service. To link to a local ldap service you would 
need to change the items in the `server` block to give details of your ldap service and DN. You also need to change
  the `accessGroups` field in the `ldap` block with your DN structure. 
  
* functionalAccounts.json - this file sets up the functional accounts used in Scicat. You can use this file to add/remove 
any functional accounts you would like and change their passwords. If catamel sees that these users have already been
  ingested in the mongodb database it will not update the functional accounts. If you would like to update these you 
  need to drop the accounts from the `User` collection and rerun `docker-compose`.
  
* component-config.local.json - use if you want to set up with rabbitmq. For more information please go to 
  https://scicatproject.github.io/documentation/Development/StartHere.html


### LDAP config

The LDAP config contains an `ldif` file. This file sets up the structure of the LDAP in the `openldap` docker container
to use with Scicat. 

The DN structure of the ldap provides some of the essential metadata required by Scicat:
* Each user is a member of an Owner group
* Each user has a PI defined

This is designed to provide an example LDAP only, you may have to do some work to map your organisation's ldap to work
with Scicat. 


