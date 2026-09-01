#!/bin/sh
set -eu

npm install --prefix .github/lint

# shellcheck disable=SC2086
.github/lint/node_modules/.bin/eslint \
  --config .github/lint/eslint.config.mjs ${FIX_FLAG:-}
