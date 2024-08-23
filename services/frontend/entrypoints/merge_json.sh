#!/bin/sh

apk update && apk add jq gettext

jq -s 'reduce .[] as $item ({}; . * $item)' /config/*.json | envsubst \
    > "${CONFIG_DIR:-/usr/share/nginx/html/assets}"/config.json
