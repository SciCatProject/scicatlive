#!/bin/sh

echo "MONGODB_URI=$MONGODB_URI" >.env
npm run migrate:db:up
rm .env
