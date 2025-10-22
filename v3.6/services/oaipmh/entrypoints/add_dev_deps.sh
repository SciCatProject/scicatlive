#!/bin/sh

apt update && apt install -y git procps

if [ -n "${DEV_BBACKUP}" ]
then
# installing unison with opam is required by this:
# https://github.com/bcpierce00/unison/issues/208
    apt install -y opam
    opam init -y
    eval "$(opam env)"
    opam install unison
fi
