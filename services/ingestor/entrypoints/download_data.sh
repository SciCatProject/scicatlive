#!/bin/sh

# Download tutorial data if needed\
COLLECTION_ROOT="/data"
COLLECTION_NAME="single_particle_test"

if ! [ -d $COLLECTION_ROOT/$COLLECTION_NAME ]; then
    if command -v apk >/dev/null 2>&1; then 
	    apk update && apk add ca-certificates git 
    elif command -v apt >/dev/null 2>&1; then 
        apt update && apt install -y ca-certificates git
    else 
         echo "No supported package manager found (apk/apt)" >&2
        exit 1
    fi
    
    update-ca-certificates

    echo "Downloading tutorial data"

    git clone --depth 1 --filter=blob:none --sparse https://github.com/osc-em/oscem-extractor-life.git

    (
        cd oscem-extractor-life ||  exit 1
        git sparse-checkout set tutorial
        mkdir -p $COLLECTION_ROOT
        mv tutorial $COLLECTION_ROOT/$COLLECTION_NAME
    )
    
    rm -rf oscem-extractor-life
fi