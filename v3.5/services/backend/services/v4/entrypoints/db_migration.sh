#!/bin/sh

[ -e ".finished" ] && return 0

echo "MONGODB_URI=$MONGODB_URI" >.env
npm run migrate:db:up
rm .env
