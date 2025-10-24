#!/bin/sh
set -e

## This script first loops over the /docker-entrypoints/*.sh folder and executes them iteratively.
## The "exec $@" enables the loop_entrypoints to take any SH command as argument and execute them.

for script in /docker-entrypoints/*.sh
do
    # shellcheck disable=SC1090
    . "${script}"
done

exec "$@"
