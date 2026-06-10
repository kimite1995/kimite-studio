@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ============================================
echo   KIMITE STUDIO 포트폴리오 개발 서버 시작
echo ============================================
echo.
echo [1] 이전에 떠있던 서버를 정리합니다...
taskkill /F /IM node.exe >nul 2>&1
echo.
echo [2] 서버를 시작합니다 (포트 3000)
echo.
echo 브라우저에서 http://localhost:3000 을 열어주세요.
echo.
echo 서버를 끄고 싶으면 이 검은 창을 그냥 닫으세요.
echo.
npm run dev
echo.
echo 서버가 종료되었습니다.
pause
