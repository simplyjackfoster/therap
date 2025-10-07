#!/usr/bin/env bash
set -euo pipefail

PORT=${PORT:-8080}
http-server -c-1 -p "$PORT" . >/tmp/http-server.log 2>&1 &
SERVER_PID=$!
trap "kill $SERVER_PID" EXIT
sleep 2
npx lhci autorun --config=.lighthouserc.json
