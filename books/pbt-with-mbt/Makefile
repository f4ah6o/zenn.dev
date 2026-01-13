.DEFAULT_GOAL := links

MBT_MD := $(wildcard *.mbt.md)
MD_LINKS := $(MBT_MD:.mbt.md=.md)

.PHONY: links
links: $(MD_LINKS)

%.md: %.mbt.md
	@if [ -e "$@" ] || [ -L "$@" ]; then \
		echo "skip $@ (exists)"; \
	else \
		ln -s "$(notdir $<)" "$@"; \
		echo "link $@ -> $(notdir $<)"; \
	fi
