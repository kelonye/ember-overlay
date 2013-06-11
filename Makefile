all: node_modules components public

node_modules:
	@npm install

components:
	@component install --dev

public: lib/index.js lib/style.css
	@component build --dev -n $@ -o $@

clean:
	@rm -rf public

.PHONY: clean