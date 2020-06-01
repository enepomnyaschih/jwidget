#!/bin/bash

# The folder of this local copy of the jWidget repository must be called "git".
# An "mt" folder with a local copy of https://github.com/enepomnyaschih/mt repository to be present next to "git",
# and it must be clean, i.e. the following commands should be run prior to this script run:
#
# git reset --hard
# git checkout -- .
# git clean -df
# git clean -dfX
#
# The output of this script in "samples-dist" folder.

if [ -z "$1" ]; then
    echo "Usage: ./install.sh <version>"
    exit 1
fi

set -e

rm -rf samples-dist
mkdir samples-dist

pushd .. > /dev/null
	npm install

	pushd main > /dev/null
		./build.sh
	popd > /dev/null

	pushd examples > /dev/null
		./build.sh
	popd > /dev/null
	mv examples/public doc/samples-dist

	pushd ../mt > /dev/null
		for i in {1..6}
		do
			git checkout mt-$1-$i
			npm install
			npm run build
			mv public ../git/doc/samples-dist/tutorial$i
		done
	popd > /dev/null
popd > /dev/null
