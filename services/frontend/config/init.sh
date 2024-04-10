#!/bin/sh
# shellcheck disable=SC2086
# shellcheck disable=SC2010

apk update && apk add jq

[ $BE_VERSION = "v4" ] && CONFIGS=$(ls /config/*.json | grep -v 'config.v3.json') || CONFIGS=$(ls /config/*.json)

jq -s 'reduce .[] as $item ({}; . * $item)' $CONFIGS > /usr/share/nginx/html/assets/config.json
