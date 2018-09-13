#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./doc.sh <version>"
    exit 1
fi

rm -r docoutput

pushd examples || exit 1
npm install || exit 1
npm run build || exit 1
popd || exit 1

pushd docgen || exit 1
npm install || exit 1
tsc || exit 1
node dist/index.js .. || exit 1
popd || exit 1

pushd .. || exit 1
rm -r doc/$1
mv git/docoutput doc/$1 || exit 1

pushd mt || exit 1
git checkout mt-$1-1 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial1 || exit 1
git checkout mt-$1-2 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial2 || exit 1
git checkout mt-$1-3 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial3 || exit 1
git checkout mt-$1-4 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial4 || exit 1
git checkout mt-$1-5 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial5 || exit 1
git checkout mt-$1-6 || exit 1
npm install || exit 1
npm run build || exit 1
mv public ../doc/$1/samples/tutorial6 || exit 1
popd

popd
