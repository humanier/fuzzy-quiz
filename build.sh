#!/usr/bin/env sh
set -e

echo 
echo "--- Linting ... "

npm run lint

echo
echo "--- Compiling TypeScript ... "
npm run build

# copy static content to dist
echo
echo "--- Copying web files to dist/static ..."

rm -rf dist/www
cp -r src/www dist/

echo