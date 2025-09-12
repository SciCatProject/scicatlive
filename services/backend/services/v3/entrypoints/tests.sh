#!/bin/sh

cp /home/node/app/server/datasources.json /home/node/app/server/datasources.json.bak

echo '{"mongo": {"database": "dacat_dev"}}' > /home/node/app/server/datasources.json

npm run test

mv /home/node/app/server/datasources.json.bak /home/node/app/server/datasources.json
