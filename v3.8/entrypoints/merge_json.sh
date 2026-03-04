#!/bin/sh

[ -e ".finished" ] && return 0

apk update && apk add jq gettext || echo "apk not available"
apt update && apt install -y jq gettext-base || echo "apt not available"

jq -s 'reduce .[] as $item ({}; . * $item)' /config/*.json | envsubst \
    > "${CONFIG_DIR:-/usr/share/nginx/html/assets}"/"${CONFIG_FILE:-config.json}"
