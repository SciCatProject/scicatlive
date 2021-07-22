#!/bin/bash

cd /seed

for FILE_NAME in $(ls *.json)
do
    mongoimport --db dacat --collection ${FILE_NAME%.*} --file $FILE_NAME
done
