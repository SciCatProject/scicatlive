#!/bin/sh

cd /seed || exit

[ "${BE_VERSION}" = "v4" ] && DB="${DEV}dacat-next" || DB="${DEV}dacat"

mongosh --quiet --eval "show dbs" | grep -q "^${DB}\b" && exit

for FILE_NAME in *.json
do
    mongoimport --db "${DB}" --collection "${FILE_NAME%.*}" --file "${FILE_NAME}" --jsonArray
done
