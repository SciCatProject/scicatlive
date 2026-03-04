#!/bin/sh

[ -e ".finished" ] && return 0

npm ci
