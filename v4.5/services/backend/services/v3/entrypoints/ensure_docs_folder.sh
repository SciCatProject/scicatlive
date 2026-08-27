#!/bin/sh

## The v3 backend repo has no docs/ folder of its own, but the docs service mounts one from this volume regardless -
## create it so that mount doesn't fail.
mkdir -p docs
