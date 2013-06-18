
.PHONY: build clean serve ship

build: clean
	rm -f src/content/drafts
	bin/build

drafts: clean
	[[ -L src/content/drafts ]] || ( rm -f src/content/drafts && ln -s ../../../drafts src/content/drafts )
	bin/build
	@echo ...built

clean:
	rm -rf ship

ship: build
	bin/ship

serve:
	-echo System-wide apache is configured to serve the ship directory at http://localhost:4000/

auto-drafts:
	auto bin src ../drafts -- make drafts

