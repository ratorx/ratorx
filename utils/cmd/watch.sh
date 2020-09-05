#! /bin/bash
PORT=3000

if command -v gmake >/dev/null 2>&1; then
	MAKE=gmake
else
	MAKE=make
fi

function quit_server() {
	kill "$(lsof -Pn | awk "/TCP/ && /LISTEN/ && /$PORT/ {print \$2}")"
}

# Start webserver
python3 -m http.server -b :: -d build/public/web "$PORT" >/dev/null 2>&1 &
trap quit_server EXIT

# Start directory watcher
entr -cd $MAKE --no-print-directory all <&0
