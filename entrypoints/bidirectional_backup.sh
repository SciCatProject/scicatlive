#!/bin/sh

apk add --no-cache unison

[ -z "$(ls -A /bbackup)"] && cp -r "${WORKDIR}"/. /bbackup

unison "${WORKDIR}" /bbackup \
    -repeat watch -batch -auto \
    -prefer /bbackup &
