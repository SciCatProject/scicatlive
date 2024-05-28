#!/bin/sh
# shellcheck disable=SC2010

apk update && apk add jq

INCLUDE="base"
[ "$BE_VERSION" = "v3" ] && INCLUDE="${INCLUDE} v3"
[ -n "$LDAP_ENABLED" ] && INCLUDE="${INCLUDE} ldap"

# shellcheck disable=SC2046
jq -s 'reduce .[] as $item ({}; . * $item)' $(for c in $INCLUDE; do echo "/config/config.${c}.json"; done) > /usr/share/nginx/html/assets/config.json
