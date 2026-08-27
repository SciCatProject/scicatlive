#!/bin/sh

pip install --no-cache-dir -r "${CONFIG_DIR}/requirements.txt"
mkdocs serve --config-file "${CONFIG_DIR}/mkdocs.yaml" --dev-addr=0.0.0.0:8000
