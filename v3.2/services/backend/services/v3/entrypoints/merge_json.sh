#!/bin/sh

for config in $(find /config -maxdepth 1 -type f -exec basename {} \; | cut -d '.' -f 1 | sort -u)
do
    # shellcheck disable=SC2016
    npx --yes node-jq@6.0.0 -s 'reduce .[] as $item ({}; . * $item)' /config/"${config}"*.json > /home/node/app/server/"${config}".json
    npx --yes envsub /home/node/app/server/"${config}".json
done
