#!/bin/sh

[ -e ".finished" ] && return 0

echo "MONGODB_URI=$MONGODB_URI" >.env
npm run migrate:db:up${DEV:+:dev}
rm .env
