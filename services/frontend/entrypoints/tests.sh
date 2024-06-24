#!/bin/sh

apk update && apk add chromium

npm run test
