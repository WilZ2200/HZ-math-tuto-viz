#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║   Advanced Linear Algebra                ║"
echo "  ║   Interactive Course                     ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""
echo "  Starting server at http://localhost:8000"
echo "  Press Ctrl+C to stop."
echo ""
python3 -m http.server 8000 &
SERVER_PID=$!
sleep 1
if command -v open &>/dev/null; then
    open http://localhost:8000
elif command -v xdg-open &>/dev/null; then
    xdg-open http://localhost:8000
fi
wait $SERVER_PID
