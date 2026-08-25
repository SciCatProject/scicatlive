#!/bin/sh

# Download tutorial data if needed\
COLLECTION_ROOT="/data"
COLLECTION_NAME="single_particle_test"

if ! [ -d $COLLECTION_ROOT/$COLLECTION_NAME ]; then
    if command -v apk >/dev/null 2>&1; then 
	    apk update && apk add ca-certificates git 
    fi
    if command -v apt >/dev/null 2>&1; then 
        apt update && apt install -y ca-certificates git
    fi
    
    update-ca-certificates

    echo "Downloading tutorial data"

    git clone --depth 1 --filter=blob:none --sparse https://github.com/osc-em/oscem-extractor-life.git
    
    cd oscem-extractor-life
    git sparse-checkout set tutorial
    mkdir -p $COLLECTION_ROOT
    mv tutorial $COLLECTION_ROOT/$COLLECTION_NAME
    cd ..
    rm -rf oscem-extractor-life
fi