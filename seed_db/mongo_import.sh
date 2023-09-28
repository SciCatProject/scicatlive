#!/bin/sh

cd /seed

for FILE_NAME in $(ls *.json)
do
    echo "Importing from $FILE_NAME"
    mongoimport --uri $MONGODB_URI  --collection ${FILE_NAME%.*} --file $FILE_NAME --jsonArray
done
