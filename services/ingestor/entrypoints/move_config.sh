#!/bin/sh

apk update && apk add jq gettext || echo "apk not available"
apt update && apt install -y jq gettext-base || echo "apt not available"

SOURCE_CONFIG="/config/openem-ingestor-config.yaml"
TARGET_DIR="/root/.config/openem-ingestor"
TARGET_CONFIG="$TARGET_DIR/openem-ingestor-config.yaml"

if [ ! -f "$SOURCE_CONFIG" ]; then
	echo "Error: Required config file not found: $SOURCE_CONFIG" >&2
	exit 1
fi

mkdir -p "$TARGET_DIR"

envsubst < "$SOURCE_CONFIG" > "$TARGET_CONFIG"

if [ "$1" = "--entrypoint" ]; then
	shift
	exec /app/ingestor "$@"
fi