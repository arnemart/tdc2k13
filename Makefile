build:
	mkdir -p build
	node_modules/.bin/browserify js/letsDoThis.js -o build/all.js

watch:
	mkdir -p build
	node_modules/.bin/watchify js/letsDoThis.js -o build/all.js -v

test:
	node_modules/.bin/buster test

deps:
	npm install

clean:
	rm -rf build

.PHONY: build watch test deps clean