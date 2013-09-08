build:
	node_modules/.bin/browserify letsDoThis.js -o build.js

watch:
	node_modules/.bin/watchify letsDoThis.js -o build.js -v

deps:
	npm install

.PHONY: build watch deps