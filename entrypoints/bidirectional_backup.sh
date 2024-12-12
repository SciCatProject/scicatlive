#!/bin/sh

apk add --no-cache unison

[ -z "$(ls -A /bbackup)"] && cp -r "${WORKDIR}"/. /bbackup

flock -n /bbackup/.unison \
    unison "${WORKDIR}" /bbackup \
    -repeat watch -batch -auto \
    -prefer /bbackup &
