#!/bin/sh
# shellcheck disable=SC2010

for config in $(ls /config | xargs -n1 basename | cut -d "." -f 1 | sort -u)
do
    npx --yes node-jq -s 'reduce .[] as $item ({}; . * $item)' /config/"${config}"*.json > /home/node/app/server/"${config}".json
done
