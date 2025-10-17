#!/bin/sh

[ -e ".finished" ] && return 0

apk update && apk add jq gettext

jq -s 'reduce .[] as $item ({}; . * $item)' /config/config.override.json /config/config.override.*.json | envsubst \
    > "${CONFIG_DIR:-/usr/share/nginx/html/assets}"/config.json
