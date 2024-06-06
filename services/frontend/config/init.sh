#!/bin/sh
# shellcheck disable=SC2010

apk update && apk add jq

FILES=$(ls /config/*.json)

function exclude_config () {
    FILES=$(echo "$FILES" | xargs -n1 | grep -v "$1")
}

[ "$BE_VERSION" = "v4" ] && exclude_config "v3.json"

# shellcheck disable=SC2086
jq -s 'reduce .[] as $item ({}; . * $item)' $FILES > /usr/share/nginx/html/assets/config.json
