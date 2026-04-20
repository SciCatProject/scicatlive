#!/bin/sh

[ -e ".finished" ] && exit 0

npm ci
