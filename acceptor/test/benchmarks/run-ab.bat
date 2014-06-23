@echo off
start node ../test
ping 127.0.0.1 -n 3 >nul 
ab -c 400 -t 3 "http://localhost:3000/badjs?level=1&msg=hello%20world"
pause