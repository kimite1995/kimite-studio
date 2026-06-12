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
echo 로그인 후 왼쪽 메뉴에서 원하는 영역을 선택하세요:
echo   첫 화면 수정 / 소개 영역 수정 / 작품 섹션 문구 수정
echo   서비스 영역 수정 / 문의 영역 수정 / 푸터 수정 / 작품 관리
echo.
echo 수정 후 반드시 오른쪽 위 "Publish" 버튼 누르기!
echo.
echo (메인 사이트는 별도의 start-main.bat 을 실행하세요)
echo.
echo Press Ctrl+C to stop this server.
echo.

npx sanity dev

echo.
echo Studio stopped.
pause
