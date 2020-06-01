set -e

rm -rf dist

node compile.js

cp tutorials/* dist/tutorials
cat custom-styles.css >> dist/styles.css
cp -r samples-dist dist/samples
