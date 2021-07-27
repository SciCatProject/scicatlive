# ScicatLive Project
## Introduction
This project is designed to get users started with running Scicat on localhost. It uses docker compose to spin up the 
core Scicat services: catanie and catamel as well as the additional services required by Scicat to run. 

### docker_compose_lite

The docker compose lite folder is a great place to get started with Scicat. To spin up a first version of Scicat you can 
run the following command:

```
docker-compose -f docker_compose_lite/docker-compose.yml up --build -d
```

If you then navigate to localhost in web browser you will see the Scicat start page. You can login with the following 
credentials:
```
username: alpha_beta
password: alphabeta
```

To upload a test metadata payload to your local instance you can run the test_upload.py script using 
```
python test_upload.py
```
For further explanation of the structure of docker-compose-lite , please reference the README.md file in the 
docker-compose-lite folder.

### docker_compose_from_src

To learn how to build Scicat from source please use the docker_compose_from_src folder. The README.md file in this folder
will provide you with instructions on how to start Scicat from source.
