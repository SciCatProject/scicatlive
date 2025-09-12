#!/bin/sh

sed -i.bak 's/"database": "dev-dacat"/"database": "dacat_dev"/' /home/node/app/server/datasources.json

npm run test

mv /home/node/app/server/datasources.json.bak /home/node/app/server/datasources.json
