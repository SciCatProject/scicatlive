#!/bin/sh

# shellcheck disable=SC1091
. download_sdk.sh

SDK_CLIENT_DIR="${SDK_DIR}/${SDK_LANG}-client"
TARGET_PACKAGE=$(jq -r '.npmName' "$OPENAPI_CONFIG_FILE")
TARGET_NODE_MODULES=${WORKDIR}/node_modules/${TARGET_PACKAGE}
echo ">>> Installing SDK for ${SDK_LANG} at ${TARGET_NODE_MODULES}"
cd "$SDK_CLIENT_DIR" || exit
npm install && npm run build

# Clean up old package and replace with new one
rm -rf "$TARGET_NODE_MODULES"
mkdir -p "$(dirname "$TARGET_NODE_MODULES")"
cp -r "$SDK_CLIENT_DIR/dist" "$TARGET_NODE_MODULES"
chmod -R 755 "$TARGET_NODE_MODULES"
echo ">>> SDK generated and installed at $TARGET_NODE_MODULES"
rm -rf "$SDK_CLIENT_DIR"
