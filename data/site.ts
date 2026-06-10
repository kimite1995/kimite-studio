// ============================================
// KIMITE STUDIO - 사이트 기본 정보
// 이 파일만 수정하면 대부분의 텍스트가 바뀝니다.
// (코딩 없이도 쉽게 편집 가능)
// ============================================

export const site = {
  // 브랜드명 (로고, 타이틀에 사용)
  name: "KIMITE",
  fullName: "KIMITE STUDIO",
  tagline: "AI로 만드는 영화 같은 순간들",

  // Hero 섹션
  hero: {
    headline: "AI로 빚어내는\n영화 같은 순간",
    subheadline: "광고, 브랜드 필름, 뮤직비디오, 추모영상까지.\n최신 AI 툴로 압도적인 비주얼 스토리텔링을 만듭니다.",
    ctaPrimary: "대표 작품 보기",
    ctaSecondary: "서비스 알아보기",
  },

  // About Me
  about: {
    title: "About KIMITE",
    intro: "안녕하세요, KIMITE STUDIO의 박상우입니다.\n\nAI 기술이 단순한 도구가 아니라 감정을 전달하는 강력한 매체가 될 수 있다고 믿습니다. Runway, Kling, Luma 등 최신 생성형 AI와 전통적인 포스트 프로덕션을 결합해, 브랜드와 아티스트가 원하는 '영화 같은' 영상을 제작하고 있습니다.",
    philosophy: "기술보다는 이야기. 속도보다는 감정.\nAI는 제 손을 더 빠르게 움직이게 하지만, 결국 중요한 것은 한 장면 한 장면에 담긴 감정입니다.",
    
    // 사용 툴 (배지로 표시)
    tools: [
      "Runway Gen-3", "Kling AI 1.6", "Luma Dream Machine", 
      "Pika 1.5", "Midjourney", "DaVinci Resolve", 
      "Adobe Premiere Pro", "After Effects", "Topaz Video AI"
    ],

    // 숫자 스탯 (애니메이션)
    stats: [
      { number: 10, label: "AI 영상 제작", suffix: "+" },
      { number: 30, label: "협업 브랜드", suffix: "+" },
      { number: 2024, label: "활동 시작", suffix: "" },
      { number: 100, label: "클라이언트 만족", suffix: "%" },
    ],
  },

  // Services (사용자 피드백 반영: 광고, MV, 추모 + AI 레슨)
  services: [
    {
      icon: "Film",
      title: "시네마틱 브랜드 필름",
      desc: "브랜드의 세계관을 가장 영화적으로 풀어내는 AI 영상. 제품 런칭, 캠페인, 콘셉트 필름에 최적화되어 있습니다.",
    },
    {
      icon: "Tv",
      title: "광고 · 커머스 영상",
      desc: "숏폼부터 풀 버전까지. AI로 빠르고 퀄리티 높게 제작하는 제품 광고 및 커머스 콘텐츠.",
    },
    {
      icon: "Music",
      title: "뮤직비디오 · 나래티브",
      desc: "아티스트의 감성을 시각화하는 뮤직비디오와 스토리텔링이 살아있는 나래티브 숏필름.",
    },
    {
      icon: "Heart",
      title: "추모영상 · 개인 프로젝트",
      desc: "소중한 순간을 가장 아름답고 따뜻하게 담아내는 추모 영상. 개인 의뢰도 환영합니다.",
    },
    {
      icon: "GraduationCap",
      title: "AI 영상 제작 레슨",
      desc: "실제 작업 노하우를 공유합니다. 프롬프트 작성법, 워크플로우, 툴 활용까지 1:1 또는 그룹 레슨.",
    },
    {
      icon: "Sparkles",
      title: "AI 워크플로우 컨설팅",
      desc: "회사/팀 대상 AI 영상 제작 프로세스 구축 컨설팅. 툴 선정부터 파이프라인까지 함께 만듭니다.",
    },
  ],

  // Contact
  contact: {
    email: "hello@kimite.studio", // 실제 이메일로 변경하세요
    responseTime: "보통 24시간 이내에 답변드립니다.",
    youtube: "https://youtube.com/channel/UC4_81qSZYpojuQVZPKuu80Q",
    // 추가 소셜이 있으면 여기에
    // instagram: "https://instagram.com/...",
  },

  // Footer
  footer: {
    copyright: "© KIMITE STUDIO. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof site;
