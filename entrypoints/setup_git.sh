#!/bin/sh

[ -e ".finished" ] && return 0

ls .git && return 0

echo "${GITHUB_REPO}" | grep -q "#" && TAG="${GITHUB_REPO#*#}" || TAG=

git init
chown -R "$(find . -maxdepth 1 -exec ls -ld {} + | awk '{print $3":"$4}' | tail -n1)" .git
git config --global --add safe.directory "${PWD}"
REPO="${GITHUB_REPO%%#*}"
git remote add origin "${REPO}"
git fetch
DEFAULT_BRANCH=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
git reset --hard origin/"${TAG:-$DEFAULT_BRANCH}"
