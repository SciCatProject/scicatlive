#!/bin/sh

if command -v apk >/dev/null 2>&1; then 
	apk update && apk add jq gettext 
fi
if command -v apt >/dev/null 2>&1; then 
	apt update && apt install -y jq gettext-base
fi

SOURCE_CONFIG="/config/openem-ingestor-config.yaml"
TARGET_DIR="/root/.config/openem-ingestor"
TARGET_CONFIG="$TARGET_DIR/openem-ingestor-config.yaml"

if [ ! -f "$SOURCE_CONFIG" ]; then
	echo "Error: Required config file not found: $SOURCE_CONFIG" >&2
	exit 1
fi

mkdir -p "$TARGET_DIR"

envsubst < "$SOURCE_CONFIG" > "$TARGET_CONFIG"

echo "Start app?"
if [ -e "/app/ingestor" ]; then
	echo "Start app!"
    exec /app/ingestor "$@"
fi
