#!/bin/sh

[ -e ".finished" ] && return 0

apk update && apk add chromium
