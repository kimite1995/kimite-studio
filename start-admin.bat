@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo.
echo ============================================
echo   KIMITE STUDIO - Admin / Sanity Studio
echo   (관리자 페이지 / localhost:3333)
echo ============================================
echo.
echo Starting Sanity Studio...
echo.
echo 브라우저에서 아래 주소로 접속하세요:
echo   http://localhost:3333
echo.
echo 로그인 후 Content → work 에서 작품 관리
echo 작품 수정/추가 후 반드시 오른쪽 위 "Publish" 버튼 누르기!
echo.
echo (메인 사이트는 별도의 start-main.bat 을 실행하세요)
echo.
echo Press Ctrl+C to stop this server.
echo.

npx sanity dev

echo.
echo Studio stopped.
pause
