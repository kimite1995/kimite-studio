@echo off
setlocal EnableExtensions
chcp 65001 > nul
cd /d "%~dp0"

echo.
echo ============================================
echo   KIMITE STUDIO PUBLIC DEPLOY
echo ============================================
echo.
echo This deploy button will:
echo   1. Check whether the site builds correctly
echo   2. Save changed files to Git
echo   3. Push the saved files to GitHub
echo   4. Deploy the current local project to Vercel Production
echo.

set "CONFIRM="
set /p "CONFIRM=Start public deploy? Type Y and press Enter: "
if /i not "%CONFIRM%"=="Y" (
  echo.
  echo Deploy canceled.
  echo.
  pause
  exit /b 0
)

echo.
echo [1/4] Checking local build...
echo.
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo [FAILED] Local build failed.
  echo The public site was NOT deployed.
  echo.
  pause
  exit /b 1
)

echo.
echo [2/4] Saving changed files to Git...
echo.
git status --short
git add .

set "HAS_CHANGES="
for /f "delims=" %%A in ('git status --porcelain') do (
  set "HAS_CHANGES=1"
)

if defined HAS_CHANGES (
  set "COMMIT_MSG="
  set /p "COMMIT_MSG=Deploy memo. Press Enter for default: "
  if "%COMMIT_MSG%"=="" set "COMMIT_MSG=site update deploy"

  git commit -m "%COMMIT_MSG%"
  if errorlevel 1 (
    echo.
    echo [FAILED] Git commit failed.
    echo The public site was NOT deployed.
    echo.
    pause
    exit /b 1
  )
) else (
  echo No local file changes found.
)

echo.
echo [3/4] Pushing to GitHub...
echo.
git push
if errorlevel 1 (
  echo.
  echo [FAILED] GitHub push failed.
  echo The script will stop before Vercel deploy.
  echo.
  pause
  exit /b 1
)

echo.
echo [4/4] Deploying to Vercel Production...
echo.
call npx.cmd vercel deploy --prod --yes
if errorlevel 1 (
  echo.
  echo [FAILED] Vercel production deploy failed.
  echo Please send this window to Codex.
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   PUBLIC DEPLOY COMPLETE
echo ============================================
echo.
echo Public site:
echo   https://kimite-studio.vercel.app/
echo.
echo If the page still looks old, press Ctrl + Shift + R.
echo.
pause
