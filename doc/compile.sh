set -e

rm -r dist

node compile.js

cp tutorials/* dist/tutorials
cat custom-styles.css >> dist/styles.css

echo "Compiling examples..."

pushd ../examples > /dev/null
./build.sh
popd > /dev/null

mkdir dist/samples
cp -r ../examples/public dist/samples
