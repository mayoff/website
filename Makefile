
.PHONY: build clean serve ship

build: clean
	rm -f src/content/drafts
	bin/build

drafts: clean
	[[ -L src/content/drafts ]] || ( rm -f src/content/drafts && ln -s ../../../drafts src/content/drafts )
	bin/build

clean:
	rm -rf ship

ship: build
	bin/ship

serve:
	bin/serve > /dev/null < /dev/null 2>&1

