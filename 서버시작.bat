@echo off
chcp 65001 > nul
echo ODOD 로컬 서버 시작 중...
echo 브라우저에서 http://localhost:8000/odod/ 로 열립니다.
echo 종료하려면 이 창을 닫으세요.
echo.
start "" "http://localhost:8000/odod/"
python -m http.server 8000
pause
