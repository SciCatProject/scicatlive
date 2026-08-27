#!/bin/sh

MARKER=".finished-$(basename "$0")"
[ -e "$MARKER" ] && exit 0

npm ci

touch "$MARKER"
