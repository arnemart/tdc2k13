build:
	mkdir -p build
	node_modules/.bin/browserify js/letsDoThis.js -o build/all.js

watch:
	mkdir -p build
	node_modules/.bin/watchify js/letsDoThis.js -o build/all.js -v

deps:
	npm install

clean:
	rm -rf build

.PHONY: build watch deps clean