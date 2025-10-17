#!/bin/sh

[ -e ".finished" ] && return 0

echo "MONGODB_URI=$MONGODB_URI" >.env
node ./node_modules/migrate-mongo/bin/migrate-mongo.js up
rm .env
