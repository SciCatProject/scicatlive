#!/bin/sh

echo "MONGODB_URI=$MONGODB_URI" >.env

if npm run migrate:db:status 2>/dev/null | grep -q PENDING; then
    echo "Running migration scripts..."
    npm run migrate:db:up${DEV:+:dev}
else
    echo "Migration scripts were already ran"
fi

rm .env
