#!/bin/sh

# 1. Define Paths
# Using the SDK_LANG variable provided by the environment
SDK_DIR="/tmp/sdk"
ZIP_PATH="${SDK_DIR}.zip"
OPENAPI_CONFIG_FILE="/openapigenerator/${SDK_LANG}-config.json"
API_URL="http://openapigenerator:8080/api/gen/clients/${SDK_LANG}"
OPENAPI_URL="http://backend:3000/explorer-json"

echo ">>> Starting generation for: ${SDK_LANG}"

# 2. Validation
if [ ! -f "$OPENAPI_CONFIG_FILE" ]; then
    echo ">>> ERROR: Configuration file not found at $OPENAPI_CONFIG_FILE"
    exit 1
fi

# 3. Request Link from Generator
# We use jq to build the payload with your specific TS constraints
echo ">>> Requesting build from $API_URL"
PAYLOAD=$(jq -n \
    --arg url "$OPENAPI_URL" \
    --argjson opts "$(cat "$OPENAPI_CONFIG_FILE")" \
    '{openAPIUrl: $url, options: $opts}')

echo ">>> Payload: $PAYLOAD"

RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")

DOWNLOAD_URL=$(echo "$RESPONSE" | jq -r '.link')

# 4. Error Check for API Response
if [ "$DOWNLOAD_URL" = "null" ] || [ -z "$DOWNLOAD_URL" ]; then
    echo ">>> ERROR: Failed to get download link. Response: $RESPONSE"
    echo ">>> Is the backend running?"
    exit 1
fi

# 5. Download and Extract
echo ">>> Downloading SDK..."
curl -s -L "$DOWNLOAD_URL" -o "$ZIP_PATH"

mkdir -p "$SDK_DIR"
unzip -qo "$ZIP_PATH" -d "$SDK_DIR"

# 6. Cleanup
rm -f "$ZIP_PATH"
echo ">>> SDK for ${SDK_LANG} is ready in ${SDK_DIR}"
