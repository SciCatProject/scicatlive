#!/bin/sh

cd /seed || exit

[ "${BE_VERSION}" = "v4" ] && DB="dacat-next" || DB="dacat"

for FILE_NAME in *.json
do
    mongoimport --db "${DB}" --collection "${FILE_NAME%.*}" --file "${FILE_NAME}" --jsonArray
done
