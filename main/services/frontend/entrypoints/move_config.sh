#!/bin/sh

[ -e ".finished" ] && return 0

mkdir -p /config
cp "${CONFIG_DIR}"/config.override*.json /config/.
