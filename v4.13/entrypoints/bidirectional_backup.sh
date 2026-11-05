#!/bin/sh

[ -z "$(ls -A /bbackup)" ] && cp -r "${WORKDIR}"/. /bbackup

flock -n /tmp/unison.lock \
    unison "${WORKDIR}" /bbackup \
    -repeat watch -batch -auto \
    -prefer /bbackup &
