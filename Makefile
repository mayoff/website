
.PHONY: all clean serve ship

all: clean
	bin/build

clean:
	rm -rf ship

ship: all
	bin/ship

serve:
	bin/serve > /dev/null < /dev/null 2>&1

