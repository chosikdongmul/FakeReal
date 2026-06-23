@echo off
chcp 65001 > nul
cd /d "C:\Users\assur\Claude\Projects\real but fake"
echo 변경사항 업로드 중...
git add .
git commit -m "update"
git push
echo.
echo 완료! 1-2분 후 사이트에 반영됩니다.
pause
