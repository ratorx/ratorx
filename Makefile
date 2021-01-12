WORKSPACES := content web utils

# Optional ENV file
ENV :=
ifeq (.env,$(wildcard .env))
	ENV := .env
	include .env
	export $(shell sed 's/=.*//' .env)
endif

# Typescript -> Javascript variables
TS_OUT_DIR := build/gen
TS_MARKER := $(TS_OUT_DIR)/.marker
# Utility functions
find_ts = $(shell find '$(1)' -type f -regex '.+\.tsx?' | grep -v '.d.ts')
ts_to_js = $(addprefix $(TS_OUT_DIR)/,$(patsubst %.tsx,%.js,$(patsubst %.ts,%.js,$(1))))
# Variables
CONTENT_TS_SRC := $(call find_ts,content)
CONTENT_JS := $(call ts_to_js,$(CONTENT_TS_SRC))
WEB_TS_SRC := $(call find_ts,web)
WEB_JS := $(call ts_to_js,$(WEB_TS_SRC))
UTILS_TS_SRC := $(call find_ts,utils)
UTILS_JS := $(call ts_to_js,$(UTILS_TS_SRC))

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

# Workspace links
WORKSPACE_LINKS := $(addprefix node_modules/,$(WORKSPACES))

###### ENTRYPOINTS #######
.PHONY: all web install clean_all clean watch
all: web;
web: $(HTML) $(CSS) $(JS) $(FAVICON)
ifeq ($(NETLIFY),true)
	rm -f $(WORKSPACE_LINKS)
endif

install: $(NPM_MARKER) $(WORKSPACE_LINKS)

clean_all: clean
	rm -rf node_modules/

clean:
	rm -rf build/

watch:
	$(ALL_SRC_CMD) | utils/cmd/watch.sh

###### RULES #######
# README
README.md: $(UTILS_JS) $(CONTENT_JS) | $(TS_MARKER) build/cache $(WORKSPACE_LINKS)
	node $(TS_OUT_DIR)/utils/cmd/readme.js $@
# Web
WEB_COMMON := $(PUBLIC_DIR)/web
## CSS
CSS_EXTRA_DEPS :=
ifeq ($(NODE_ENV),production)
	CSS_EXTRA_DEPS := $(HTML) $(JS)
endif
css: $(CSS);
$(CSS) : $(UTILS_JS) $(wildcard static/web/css/*) $(CSS_EXTRA_DEPS) $(ENV) | $(TS_MARKER) $(WEB_COMMON) $(WORKSPACE_LINKS)
	node $(TS_OUT_DIR)/utils/cmd/css.js static/web/css/main.css $@

## HTML
html: $(HTML);
$(HTML) : $(WEB_JS) $(CONTENT_JS) $(UTILS_JS) $(ENV) | $(TS_MARKER) $(WEB_COMMON) build/cache $(WORKSPACE_LINKS)
	node $(TS_OUT_DIR)/web/index.js $@

## JS
$(JS) : static/web/js/main.js | $(WEB_COMMON)
	cp static/web/js/main.js $@

## Favicon
$(FAVICON) : static/web/ico/favicon.ico
	cp static/web/ico/favicon.ico $@

# Compile and link TS files
TS_OUT = $(CONTENT_JS) $(WEB_JS) $(UTILS_JS)
tsc: $(TS_OUT);
$(TS_OUT): | $(TS_MARKER);

node_modules/%:
	@mkdir -p $(dir $@)
	@ln -sfTv ../$(TS_OUT_DIR)/$* $@

# Find tsc, or use npx
$(TS_MARKER) : $(CONTENT_TS_SRC) $(WEB_TS_SRC) $(UTILS_TS_SRC) tsconfig.json
	npx tsc
	@touch $(TS_MARKER)

# Dependency installation
$(NPM_MARKER): package.json
	npm install
	@touch $@

# Create directories under build
build/%:
	mkdir -p build/$*
