#!/bin/sh

cd /seed

for FILE_NAME in $(ls *.json)
do
    mongoimport --host mongodb --db scicat --collection ${FILE_NAME%.*} --file $FILE_NAME --jsonArray
done
