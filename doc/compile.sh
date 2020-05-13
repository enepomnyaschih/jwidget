set -e

node compile.js
cp tutorials/* dist/tutorials

pushd ../examples > /dev/null
# TODO: Compile examples
popd > /dev/null
