#!/bin/sh

[ -e ".finished" ] && return 0

if [ -e "src" ]; then
    # in DEV mode, a build is needed before running the migration scripts
    npm run build
fi

echo "MONGODB_URI=$MONGODB_URI" >.env
node ./node_modules/migrate-mongo/bin/migrate-mongo.js up
rm .env
