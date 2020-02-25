#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

PREACT_DIR="${DIR}/../"
echo "Building new verson for production in ${PREACT_DIR}..."
cd "${PREACT_DIR}"
npm run build

PREACT_BUILD_FROM="${DIR}/../build/bundle.js"
PREACT_BUILD_TO="${DIR}/../../node-ffe-web/template/bundle-js/ffe-product-info-bundle.js"
echo "Copying preact build: ${PREACT_BUILD_FROM} --> ${PREACT_BUILD_TO}"
cp -Rf "${PREACT_BUILD_FROM}" "${PREACT_BUILD_TO}"
