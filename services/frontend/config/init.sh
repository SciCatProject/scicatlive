#!/bin/sh
# shellcheck disable=SC2010

apk update && apk add jq

[ "$BE_VERSION" = "v4" ] && EXCLUDE="[!v3]"

# shellcheck disable=SC2086
jq -s 'reduce .[] as $item ({}; . * $item)' /config/*$EXCLUDE.json > /usr/share/nginx/html/assets/config.json
