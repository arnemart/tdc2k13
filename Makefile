build:
	node_modules/.bin/browserify letsDoThis.js -o build.js

watch:
	node_modules/.bin/watchify letsDoThis.js -o build.js -v

deps:
	npm install

clean:
	rm -f build.js

.PHONY: build watch deps clean