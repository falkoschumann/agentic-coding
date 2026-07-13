JS?=bun
PM?=bun
PM_OPTIONS?=--ignore-scripts
RUN?=bunx
RUN_OPTIONS?=--bun
SHELL:=/bin/bash

all: dist check

clean:
	rm -rf coverage
	rm -rf node_modules/.tmp

distclean: clean
	rm -rf dist
	rm -rf node_modules

dist: build

start: prepare
	$(PM) run $(RUN_OPTIONS) vite preview

domain:
	esdm view

domain-with-details:
	esdm view --with-details

check: test
	esdm lint
	$(RUN) $(RUN_OPTIONS) eslint .
	$(RUN) $(RUN_OPTIONS) stylelint "**/*.css" --ignore-path .gitignore
	$(RUN) $(RUN_OPTIONS) prettier --check .
	$(RUN) $(RUN_OPTIONS) sheriff verify

fix:
	$(RUN) $(RUN_OPTIONS) eslint --fix .
	$(RUN) $(RUN_OPTIONS) stylelint "**/*.css" --fix --ignore-path .gitignore
	$(RUN) $(RUN_OPTIONS) prettier --write .

dev: prepare
	$(PM) run $(RUN_OPTIONS) vite

test: prepare
	$(PM) run $(RUN_OPTIONS) vitest run

watch: prepare
	$(PM) run $(RUN_OPTIONS) vitest watch

unit-tests: prepare
	$(RUN) $(RUN_OPTIONS) vitest run unit

integration-tests: prepare
	$(RUN) $(RUN_OPTIONS) vitest run integration

e2e-tests: prepare
	$(RUN) $(RUN_OPTIONS) vitest run e2e

build: prepare
	$(PM) run $(RUN_OPTIONS) tsc -b
	$(PM) run $(RUN_OPTIONS) vite build

prepare: version
ifdef CI
	@echo "CI detected, run $(PM) ci"
	$(PM) ci $(PM_OPTIONS)
else
	$(PM) install $(PM_OPTIONS)
endif

version:
	@echo "Using runtime $(JS) version $(shell $(JS) --version)"
	@echo "Using package manager $(PM) version $(shell $(PM) --version)"
	@echo "Using package runner $(RUN) version $(shell $(RUN) --version)"

.PHONY: \
	all clean distclean dist \
	start \
	domain domain-with-details \
	check fix \
	dev test watch unit-tests integration-tests e2e-tests \
	build prepare version
