#!/bin/sh

apk update && apk add jq

[[ $BE_VERSION = "backendnext" ]] && CONFIGS=`find /config -name *.json ! -name "config.v3.json" | sort` || CONFIGS=`ls /config/*.json`

jq -s 'reduce .[] as $item ({}; . * $item)' $CONFIGS > /usr/share/nginx/html/assets/config.json
