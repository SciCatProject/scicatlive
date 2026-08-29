#!/bin/sh
set -eu

npm install --prefix .github/lint

# shellcheck disable=SC2086
.github/lint/node_modules/.bin/markdownlint-cli2 '**/*.md' '!**/node_modules/**' \
  --config .github/markdownlint/.markdownlint-cli2.yaml ${FIX_FLAG:-}
