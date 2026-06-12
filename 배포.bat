@echo off
setlocal EnableExtensions
chcp 65001 > nul
cd /d "%~dp0"

echo.
echo ============================================
echo   KIMITE STUDIO DEPLOY
echo ============================================
echo.
echo This file will:
echo   1. Check the site build
echo   2. Save changed files to Git
echo   3. Push to GitHub
echo   4. Let Vercel deploy automatically
echo.

set "CONFIRM="
set /p "CONFIRM=Start deploy? Type Y and press Enter: "
if /i not "%CONFIRM%"=="Y" (
  echo.
  echo Deploy canceled.
  echo.
  pause
  exit /b 0
)

echo.
echo [1/4] Checking build...
echo.
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo [FAILED] Build check failed.
  echo Public site was NOT deployed.
  echo Send the error screen to Codex.
  echo.
  pause
  exit /b 1
)

echo.
echo [2/4] Current changed files:
echo.
git status --short

echo.
set "COMMIT_MSG="
set /p "COMMIT_MSG=Deploy memo. Press Enter for default: "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=site update deploy"

echo.
echo [3/4] Saving changes to Git...
echo.
git add .

for /f "delims=" %%A in ('git status --porcelain') do (
  set "HAS_CHANGES=1"
)

if not defined HAS_CHANGES (
  echo.
  echo No local file changes found.
  echo Trying to push existing commits, if any...
  echo.
) else (
  git commit -m "%COMMIT_MSG%"
  if errorlevel 1 (
    echo.
    echo [FAILED] Git commit failed.
    echo Public site was NOT deployed.
    echo.
    pause
    exit /b 1
  )
)

echo.
echo [4/4] Pushing to GitHub...
echo.
git push
if errorlevel 1 (
  echo.
  echo [FAILED] GitHub push failed.
  echo Check login, network, or GitHub connection.
  echo Public site may not be updated.
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   DEPLOY REQUEST SENT
echo ============================================
echo.
echo Vercel will update the public site automatically.
echo Usually it takes about 1 to 3 minutes.
echo.
echo Public site:
echo   https://kimite-studio.vercel.app/
echo.
echo If it still looks old, press Ctrl + Shift + R.
echo.
pause
