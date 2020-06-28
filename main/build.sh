./clean.sh
../node_modules/.bin/tsc
../node_modules/.bin/babel --out-dir dist dist-tsc

pushd dist-tsc > /dev/null
	find . -name '*.d.ts'  | while read FILE; do
		mv $FILE ../dist/$FILE
	done
popd > /dev/null
