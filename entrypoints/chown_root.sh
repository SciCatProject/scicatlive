#!/bin/sh

[ -e ".finished" ] && return 0

chown -R root:root .
