@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo.
echo ============================================
echo   KIMITE STUDIO - Main Website Server
echo   (포트폴리오 사이트 / localhost:3000)
echo ============================================
echo.
echo Starting Next.js development server...
echo.
echo 브라우저에서 아래 주소로 접속하세요:
echo   http://localhost:3000
echo.
echo (관리자 스튜디오는 별도의 start-admin.bat 을 실행하세요)
echo.
echo Press Ctrl+C to stop this server.
echo.

npm run dev

echo.
echo Server stopped.
pause
