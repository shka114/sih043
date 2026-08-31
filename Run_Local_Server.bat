@echo off
title Samadhan Setu Server (SIH26043)
echo ========================================================
echo   Starting Samadhan Setu Local Server on Port 8000...
echo   Open your browser at: http://localhost:8000
echo ========================================================
python server.py || py -3 server.py || python3 server.py || start "" "index.html"
pause
