@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo.
echo ============================================
echo   KIMITE STUDIO - Dev Server Starting
echo ============================================
echo.
echo Starting Next.js development server...
echo.
echo When ready, open your browser and go to:
echo   http://localhost:3000
echo.
echo Press Ctrl+C in this window to stop the server.
echo.
npm run dev
echo.
echo Server stopped.
pause