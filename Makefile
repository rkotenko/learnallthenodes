FILES = $(shell find test -name "*Test.js")

test:
		@echo $(FILES)
			@NODE_ENV=test mocha $(FILES)

.PHONY: test