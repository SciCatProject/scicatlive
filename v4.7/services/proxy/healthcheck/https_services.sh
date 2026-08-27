#!/bin/sh

HTTPS_URL_SUFFIX='_HTTPS_URL'

HTTPS_SERVICES=$(env | grep "${HTTPS_URL_SUFFIX}=" | \
    awk -F"${HTTPS_URL_SUFFIX}=" '{ORS="|"} {print tolower($1)}' | sed 's/|$//')

if [ -z "${HTTPS_SERVICES}" ]
then
    exit 0
fi

apk update && apk add jq

TRAEFIK_HTTPS=$(wget -qO- http://proxy:8080/api/http/services | jq '.[]| .name' | grep -E "${HTTPS_SERVICES}")

echo "{{ \$services := list $TRAEFIK_HTTPS }}" > /config/traefik.tmp.yaml
echo "{{ \$https_url_prefix := \"_HTTPS_URL\" }}" >> /config/traefik.tmp.yaml
cat /config/traefik.pre.yaml >> /config/traefik.tmp.yaml
mv /config/traefik.tmp.yaml /config/traefik.yaml

exit 0
