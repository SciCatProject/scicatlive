#!/bin/sh

apk update && apk add jq

jq -s 'reduce .[] as $item ({}; . * $item)' /config/*.json > "${CONFIG_DIR:-/usr/share/nginx/html/assets}"/config.json
