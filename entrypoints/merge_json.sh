#!/bin/sh

[ -e ".finished" ] && return 0

apk update && apk add jq gettext

jq -s 'reduce .[] as $item ({}; . * $item)' /config/*.json | envsubst \
    > "${CONFIG_DIR:-/usr/share/nginx/html/assets}"/"${CONFIG_FILE:-config.json}"
