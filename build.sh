#!/usr/bin/env sh
set -e

npm run lint
npm run build

# copy static content to dist
rm -rf dist/static
cp -r src/static dist/