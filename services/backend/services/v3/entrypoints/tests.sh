#!/bin/sh

echo '{{"mongo": {"database": "dacat_dev"}}}' > /home/node/app/server/datasources.json

npm run test
