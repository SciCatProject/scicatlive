#!/bin/sh
# shellcheck disable=SC2010

FILES=$(ls /config/providers*.json)

# shellcheck disable=SC2086
npx --yes node-jq -s 'reduce .[] as $item ({}; . * $item)' $FILES > /home/node/app/server/providers.json
