# KIMITE STUDIO — AI Cinematic Portfolio

Next.js 15 + TypeScript + Tailwind + Framer Motion으로 만든 **모던 시네마틱 AI 영상 포트폴리오 웹사이트**입니다.

영상이 가장 잘 보이도록 설계되었으며, 코딩을 전혀 모르셔도 **작품 추가/수정, 텍스트 변경, 영상 교체**가 매우 쉽습니다.

---

## ✨ 주요 특징

- 완전 반응형 (모바일 최적화)
- Cinematic Futuristic Dark 테마 (Cyan + Violet 액센트)
- Hover 시 자동 재생 미리보기 (그리드 카드)
- 클릭하면 아름다운 모달에서 대형 영상 플레이 (MP4 + YouTube/Vimeo 모두 지원)
- Framer Motion으로 부드러운 스크롤 애니메이션
- 데이터 파일 한 곳에서 모든 콘텐츠 관리

---

## 📁 프로젝트 구조 (수정할 곳)

```
kimite-studio/
├── data/
│   ├── site.ts          ← 사이트 전체 텍스트, 소개, 서비스, 연락처 (여기만 고치세요)
│   └── works.ts         ← 작품 목록 (제목, 설명, 썸네일, 영상 URL) ★ 가장 많이 수정
├── components/          ← 디자인 컴포넌트 (거의 건드릴 일 없음)
├── app/
│   ├── page.tsx         ← 전체 페이지 조립
│   ├── layout.tsx
│   └── globals.css      ← 전역 스타일 (테마 컬러)
├── public/
│   ├── images/
│   │   └── works/       ← 작품 썸네일 JPG/PNG 넣는 곳 (16:9 추천)
│   └── videos/          ← 개발용 MP4 파일 (용량 주의)
└── README.md
```

**코딩 없이 수정할 파일은 오직 `data/site.ts` + `data/works.ts` 입니다.**

---

## 🚀 로컬에서 실행하기

```bash
cd C:\Users\박상우\kimite-studio
npm run dev
```

브라우저에서 http://localhost:3000 열기

---

## ✏️ 콘텐츠 수정 방법 (매우 쉬움)

### 1. 기본 정보 수정 (이름, 소개, 연락처 등)
`data/site.ts` 파일을 열어서 원하는 부분만 수정하세요.

### 2. 작품 추가 / 수정 / 삭제 (가장 중요)
`data/works.ts` 파일을 엽니다.

```ts
{
  id: 11,                                    // 고유 숫자 (중복 X)
  title: "새로운 작품 제목",
  shortDesc: "카드에 보일 짧은 설명",
  description: "모달에서 보일 긴 설명\n여러 줄 가능",
  thumbnail: "/images/works/my-new-work.jpg", // public/images/works/ 안에 실제 파일 넣기
  videoUrl: "/videos/my-new-work.mp4",       // 또는 외부 URL
  duration: "1:55",
  year: "2025",
  category: "Brand Film",                    // Brand Film | Commercial | Product | Music Video | Memorial | Experimental | Reel
  tools: ["Runway Gen-3", "Kling 1.6"],
  role: "Director",
}
```

**배열에 추가 → 저장 → 자동 반영**

### 3. 썸네일 이미지 넣기
1. CapCut / Premiere에서 16:9 프레임 추출
2. 1280×720 또는 1920×1080 JPG로 저장 (용량 150~200KB 이하 추천)
3. `public/images/works/` 폴더에 넣기
4. works.ts의 `thumbnail` 경로를 `/images/works/파일명.jpg` 로 맞추기

### 4. 영상 파일 넣는 방법 (3가지 추천)

**방법 A — 가장 추천 (Hover 미리보기 완벽)**
- MP4 파일을 직접 호스팅
- 개발: `public/videos/작품.mp4` 넣고 `"/videos/작품.mp4"` 사용
- 실제 서비스: Cloudflare R2, Bunny.net Stream, Vercel Blob, S3 퍼블릭 URL 추천

**방법 B — 가장 쉬움**
- YouTube 또는 Vimeo에 **Unlisted**로 업로드
- videoUrl에 전체 주소 넣으면 모달에서 자동으로 iframe 재생

**방법 C — 하이브리드 (이미 구현됨)**
- 코드가 자동으로 판단:
  - `.mp4` 또는 commondatastorage → HTML5 video (hover 미리보기 O)
  - youtube / vimeo → iframe (모달에서만)

---

## 📦 배포하기 (Vercel + 커스텀 도메인)

### 1. GitHub에 올리기 (가장 중요)

터미널에서:

```bash
cd "C:\Users\박상우\kimite-studio"

# git 초기화 (처음 한 번만)
git init
git add .
git commit -m "Initial commit - KIMITE STUDIO portfolio"

# GitHub에 새 레포지토리 만든 후 아래 명령어 (YOUR_USERNAME, YOUR_REPO 수정)
git remote add origin https://github.com/kimite1995/kimite-studio.git
git branch -M main
git push -u origin main
```

### 2. Vercel에 배포

1. https://vercel.com 접속 → 로그인 (GitHub 계정 추천)
2. **Add New Project** 클릭
3. GitHub 레포지토리 목록에서 방금 만든 레포 선택 → **Import**
4. 기본 설정 그대로 **Deploy** 클릭
5. 1~2분 후 라이브 URL이 생성됩니다 (예: `kimite-studio.vercel.app`)

### 3. 구매한 도메인 연결하기

1. Vercel 대시보드에서 프로젝트 클릭 → **Settings** → **Domains**
2. 원하는 도메인 입력 (예: `kimite.studio` 또는 `www.kimite.studio`)
3. Vercel이 보여주는 DNS 레코드 1~2개 복사
4. 도메인을 구매한 곳(레지스트라)의 DNS 설정 페이지에서 해당 레코드 추가
   - 보통 **A 레코드** 또는 **CNAME** 사용
5. 저장 후 Vercel에서 "Valid Configuration"이 뜰 때까지 기다리기 (보통 5분 ~ 1시간)
6. SSL 인증서는 Vercel이 자동으로 발급해줍니다 (https:// 완성)

**자주 쓰는 DNS 설정 예시**
- `kimite.studio` → A 레코드 (Vercel이 알려주는 IP)
- `www.kimite.studio` → CNAME `cname.vercel-dns.com`

---

## 🔧 추가 팁

- **비디오 용량 문제**: `public/videos/`에 큰 파일을 많이 넣으면 git push가 느려집니다. 중요한 영상은 외부 CDN에 올리고 URL만 data에 넣는 걸 강력 추천.
- **Formspree 연결** (문의 폼 실제 동작하게 하기):
  1. https://formspree.io 에 무료 가입
  2. 새 폼 생성 → endpoint 복사
  3. `components/contact-form.tsx` 파일에서 `YOUR_FORMSPREE_ID` 부분 교체
- **OG 이미지**: `public/images/works/og.jpg` 에 예쁜 대표 이미지를 넣으면 공유할 때 예쁘게 나옵니다.

---

## ❓ 자주 묻는 질문

**Q. 영상을 교체했는데 안 바뀌어요?**  
A. 브라우저 캐시를 지우거나 `npm run dev`를 재시작해보세요. (배포 후에는 즉시 반영)

**Q. 모바일에서 영상이 잘 안 보여요?**  
A. 모바일에서는 hover 미리보기가 동작하지 않고, 클릭 시 모달로 크게 재생됩니다. 의도된 동작입니다.

**Q. 더 고급스럽게 만들고 싶어요 (실제 폼, CMS 등)**  
A. 말씀만 주세요. Formspree 연결, Sanity CMS, 더 예쁜 플레이어 등 언제든 업그레이드 가능합니다.

---

**제작**: 이 포트폴리오는 Grok으로 생성되었습니다.  
필요한 수정이나 추가 기능이 있으면 언제든 말씀해주세요!

Enjoy creating beautiful AI films ✨
