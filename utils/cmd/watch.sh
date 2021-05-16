#! /bin/bash
if command -v gmake >/dev/null 2>&1; then
	MAKE=gmake
else
	MAKE=make
fi

# Start directory watcher
entr -cd $MAKE --no-print-directory all <&0
