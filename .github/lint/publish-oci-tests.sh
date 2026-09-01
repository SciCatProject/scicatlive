#!/bin/sh
set -eu

npm install --prefix .github/semantic-release

node --test .github/semantic-release/publish-oci.test.js
