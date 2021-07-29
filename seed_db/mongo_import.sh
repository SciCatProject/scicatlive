#!/bin/bash

cd /seed

for FILE_NAME in $(ls *.json)
do
    mongoimport --host mongodb --db dacat --collection ${FILE_NAME%.*} --file $FILE_NAME --jsonArray
done
