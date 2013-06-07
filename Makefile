all: node_modules components build

node_modules:
	@npm install

components:
	@component install --dev

build: lib/index.js lib/style.css
	@component build --dev

clean:
	@rm -rf build

.PHONY: clean