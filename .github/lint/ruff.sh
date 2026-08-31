#!/bin/sh
set -eu

# shellcheck disable=SC2086
pipx run --spec "$(cat .github/lint/requirements.txt)" ruff check --select ALL ${FIX_FLAG:-}
