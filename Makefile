WORKSPACES := content web utils

# Optional ENV file
ENV :=
ifeq (.env,$(wildcard .env))
	ENV := .env
	include .env
	export $(shell sed 's/=.*//' .env)
endif

# Typescript -> Javascript variables
CMD_DIR := build/gen

# Output variables
PUBLIC_DIR := build/public
HTML := $(PUBLIC_DIR)/web/index.html
CSS := $(PUBLIC_DIR)/web/all.css
JS := $(PUBLIC_DIR)/web/all.js
FAVICON := $(PUBLIC_DIR)/web/favicon.ico

# NPM Marker
NPM_MARKER := node_modules/.marker

# Find all source files
ALL_SRC_CMD := find . -type f ! -wholename './node_modules/*' ! -wholename './.git/*' ! -wholename './build/*'
TS_SRC := $(shell find . -path './node_modules' -prune -false -o -type f -regex '.+\.tsx?'  | grep -v '.d.ts')

###### ENTRYPOINTS #######
.PHONY: all web install clean_all clean watch serve
all: web;
web: $(HTML) $(CSS) $(JS) $(FAVICON)
ifeq ($(NETLIFY),true)
	rm -f $(WORKSPACE_LINKS)
endif

install: $(NPM_MARKER)

clean_all: clean
	rm -rf node_modules/

clean:
	rm -rf build/

watch:
	$(ALL_SRC_CMD) | utils/cmd/watch.sh

serve:
	npx live-server build/public/web

###### RULES #######
# README
README.md: $(UTILS_JS) $(CONTENT_JS) $(CMD_DIR)/utils/cmd/readme.js | build/cache
	node $(CMD_DIR)/utils/cmd/readme.js $@

# Web
WEB_COMMON := $(PUBLIC_DIR)/web
## CSS
css: $(CSS);
$(CSS) : $(UTILS_JS) $(wildcard static/web/css/*) $(HTML) $(JS) $(ENV) | $(WEB_COMMON)
	node utils/cmd/css.js static/web/css/main.css $@

## HTML
html: $(HTML);
$(HTML) : $(WEB_JS) $(CONTENT_JS) $(UTILS_JS) $(ENV) $(CMD_DIR)/web/index.js | $(WEB_COMMON) build/cache
	node $(CMD_DIR)/web/index.js $@

## JS
$(JS) : static/web/js/main.js | $(WEB_COMMON)
	cp static/web/js/main.js $@

## Favicon
$(FAVICON) : static/web/ico/favicon.ico
	cp static/web/ico/favicon.ico $@

$(CMD_DIR)/utils/cmd/readme.js $(CMD_DIR)/web/index.js &: $(TS_SRC) | $(NPM_MARKER)
	node utils/cmd/build.js

# Dependency installation
$(NPM_MARKER): package.json
	npm install
	@touch $@

# Create directories under build
build/%:
	mkdir -p build/$*
