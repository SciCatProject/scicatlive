#!/bin/sh

git clone "${GITHUB_REPO}" "${WORKDIR}" || true

echo ".finished-*" >> .git/info/exclude
