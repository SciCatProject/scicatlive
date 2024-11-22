#!/bin/sh

apk add --no-cache unison

unison "${WORKDIR}" /bbackup \
    -repeat watch -batch -auto \
    -ignore "Path node_modules" \
    -ignore "Path dist" &
