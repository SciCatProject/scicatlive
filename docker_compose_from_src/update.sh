#!/usr/bin/env bash
pushd catamel/catamel
git checkout -- package-lock.json
git pull
popd
pushd catanie/catanie
git checkout -- package-lock.json
git pull
popd
pushd kafkanode/v20nodekafka
git checkout -- package-lock.json
git pull
popd
