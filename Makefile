build:
	mkdir -p build
	node_modules/.bin/browserify js/letsDoThis.js -o build/all.js

build-demo:
	mkdir -p build
	node_modules/.bin/browserify _js/letsDoThis.js -o build/all.js

watch:
	mkdir -p build
	node_modules/.bin/watchify js/letsDoThis.js -o build/all.js -v

watch-demo:
	mkdir -p build
	node_modules/.bin/watchify _js/letsDoThis.js -o build/all.js -v


test:
	node_modules/.bin/buster-test

deps:
	npm install

clean:
	rm -rf build

.PHONY: build build-demo watch watch-demo test deps clean