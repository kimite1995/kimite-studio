// ============================================
// KIMITE STUDIO - 전체 포트폴리오 데이터
// 이 파일만 수정하면 작품이 추가/수정/삭제됩니다.
// (코딩 모르는 사람도 쉽게 편집 가능)
// ============================================

export type WorkCategory =
  | "Brand Film"
  | "Commercial"
  | "Music Video"
  | "Reel"
  | "Product"
  | "Video Product";

export const categoryLabels: Record<WorkCategory | "All", string> = {
  All: "전체",
  "Brand Film": "브랜드 필름",
  Commercial: "광고",
  Product: "제품 영상",
  "Video Product": "영상 상품",
  "Music Video": "뮤직비디오",
  Reel: "숏폼",
};

export interface WorkVideo {
  title?: string;            // 이 영상의 부제 (없으면 메인 title 사용)
  videoUrl: string;
  duration?: string;
  thumbnail?: string;
}

export interface Work {
  id: string | number;         // Sanity _id (string) or legacy number
  title: string;
  workTypeTitle?: string;      // 카드 큰 제목: 예) 회사 소개 영상, 제품 홍보 영상
  brandName?: string;          // 카드 보조 제목: 예) 더블트러블, 바오밥매트
  mainVideoTitle?: string;     // 대표 영상 개별 제목: 예) 육각매트 제품 홍보영상
  shortDesc: string;           // 카드에 보이는 짧은 설명
  description: string;         // 모달에서 보여줄 상세 설명 (여러 줄 가능)
  thumbnail?: string;          // 썸네일 이미지 경로 (public/images/works/ 안에 넣으세요)
  videoUrl?: string;           // 중요! 영상 URL (레거시 단일 영상용)
                               // - .mp4 직접 링크 → hover 미리보기 + 모달에서 네이티브 플레이어
                               // - youtube.com 또는 vimeo.com 포함 → 모달에서 iframe embed
  duration?: string;
  year: string;
  featured?: boolean;
  sortOrder?: number;
  category: WorkCategory;
  categories?: WorkCategory[];
  tools: string[];
  role?: string;

  // 여러 영상 지원 (하나의 work에 여러 영상)
  videos?: WorkVideo[];
}

// ============================================
// ⚠️ 사용 방법 (꼭 읽어주세요)
// 1. 실제 작업물로 교체하세요. (샘플은 데모용)
// 2. thumbnail: public/images/works/ 폴더에 16:9 JPG 넣고 "/images/works/파일명.jpg" 로 작성
// 3. videoUrl: 
//    - 개발 테스트: public/videos/ 안에 MP4 넣고 "/videos/파일명.mp4"
//    - 프로덕션 추천: Cloudflare R2, Bunny.net, Vercel Blob, Vimeo Direct Link 등
//    - YouTube/Vimeo Unlisted도 지원 (모달에서만 재생)
// 4. 새 작품 추가 = 아래 배열에 객체 하나 더 복사해서 수정
// ============================================

const SAMPLE_MP4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
// (위 샘플은 데모용입니다. 실제 MP4로 교체하면 hover 자동재생이 완벽하게 동작합니다)

export const works: Work[] = [
  {
    id: 1,
    title: "LUMEN — 전기차의 새로운 언어",
    shortDesc: "미래 모빌리티 브랜드 캠페인 필름",
    description: "전기차 브랜드 LUMEN의 런칭 캠페인. AI로 생성한 압도적인 도시 야경과 감성적인 드라이빙 장면을 결합해 '움직이는 조각' 같은 영상을 만들었습니다. 클라이언트의 철학을 가장 시네마틱하게 전달하는 데 집중했습니다.",
    thumbnail: "https://picsum.photos/id/1015/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "2:14",
    year: "2025",
    category: "Brand Film",
    tools: ["Runway Gen-3", "Kling 1.6", "DaVinci Resolve"],
    role: "Director, AI Prompt Engineer, Editor",
  },
  {
    id: 2,
    title: "GRAVITY CADDY — 제품의 탄생",
    shortDesc: "혁신적인 골프 용품 제품 시각화 필름",
    description: "중력으로 작동하는 자동 티업 장치 'Gravity Caddy'. 복잡한 기계 구조를 아름답게, 그리고 직관적으로 보여주는 제품 필름을 AI와 전통 편집의 조합으로 완성했습니다. 제품의 핵심 가치를 한눈에 전달합니다.",
    thumbnail: "https://picsum.photos/id/160/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "1:33",
    year: "2025",
    category: "Product",
    tools: ["Kling AI", "Luma Dream Machine", "Premiere Pro", "After Effects"],
    role: "Director & Post Supervisor",
  },
  {
    id: 3,
    title: "네온 디스트릭트",
    shortDesc: "사이버펑크 감성 브랜드 필름",
    description: "네온사인과 미래 도시를 배경으로 한 브랜드 캠페인. 과감한 색감과 빠른 컷 전환, AI가 만들어낸 독특한 텍스처를 적극 활용해 강렬한 몰입감을 선사합니다.",
    thumbnail: "https://picsum.photos/id/201/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "1:48",
    year: "2024",
    category: "Brand Film",
    tools: ["Runway Gen-3", "Midjourney", "DaVinci Resolve"],
    role: "Creative Director, AI Artist",
  },
  {
    id: 4,
    title: "잊혀진 계절 — 추모 영상",
    shortDesc: "가족을 위한 따뜻한 추모 단편",
    description: "고인을 기리는 개인 의뢰 추모영상. AI로 복원한 과거 사진과 새로운 생성 장면을 자연스럽게 연결해, '함께했던 시간'이 살아있는 듯한 감동을 담아냈습니다. 상업 작업이 아닌 마음을 담는 작업의 좋은 예시입니다.",
    thumbnail: "https://picsum.photos/id/251/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "3:02",
    year: "2025",
    category: "Video Product",
    tools: ["Kling AI", "Topaz Video AI", "Premiere Pro"],
    role: "Director, Editor",
  },
  {
    id: 5,
    title: "ECHO — 뮤직비디오",
    shortDesc: "인디 아티스트를 위한 감성 뮤직비디오",
    description: "가사 속 감정을 시각적으로 풀어낸 실험적인 뮤직비디오. AI 생성 영상과 실제 촬영을 혼합해 독특한 질감을 만들었으며, 아티스트의 세계관을 가장 솔직하게 표현했습니다.",
    thumbnail: "https://picsum.photos/id/29/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "2:47",
    year: "2024",
    category: "Music Video",
    tools: ["Runway", "Luma", "DaVinci Resolve", "After Effects"],
    role: "Director, Visual Designer",
  },
  {
    id: 6,
    title: "ZERO — 2025 캠페인 릴",
    shortDesc: "소셜 미디어용 숏폼 시리즈",
    description: "브랜드의 새로운 비전을 담은 6편의 숏폼 콘텐츠. 각각 다른 콘셉트지만 하나의 통일된 톤앤매너를 유지하며 제작했습니다. AI 덕분에 빠른 턴어라운드와 높은 퀄리티를 동시에 달성할 수 있었습니다.",
    thumbnail: "https://picsum.photos/id/133/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "0:28 × 6",
    year: "2025",
    category: "Reel",
    tools: ["Kling AI", "Pika", "CapCut"],
    role: "AI Director & Editor",
  },
  {
    id: 7,
    title: "DIGITAL MONSTER — 콘셉트 필름",
    shortDesc: "디지털 아트 × 캐릭터 IP 확장",
    description: "디지털 몬스터 IP를 위한 실험적인 콘셉트 필름. AI가 만들어내는 환상적인 생명체와 역동적인 액션을 조합해, 기존 2D/3D와는 다른 새로운 시각 언어를 제시했습니다.",
    thumbnail: "https://picsum.photos/id/40/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "1:55",
    year: "2024",
    category: "Music Video",
    tools: ["Runway Gen-3", "Midjourney", "Kling", "Premiere Pro"],
    role: "Creative + Technical Director",
  },
  {
    id: 8,
    title: "AETHER — 향수 브랜드 필름",
    shortDesc: "감각적인 향수 런칭 캠페인",
    description: "향이라는 비가시적인 개념을 가장 아름다운 시각 언어로 번역한 작품. 부드러운 파스텔 톤과 유기적인 움직임, AI가 생성한 꿈같은 장면들로 브랜드의 아이덴티티를 완성했습니다.",
    thumbnail: "https://picsum.photos/id/1005/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "2:09",
    year: "2025",
    category: "Brand Film",
    tools: ["Luma Dream Machine", "Runway", "DaVinci Resolve"],
    role: "Director, Colorist",
  },
  {
    id: 9,
    title: "마지막 인사",
    shortDesc: "개인 의뢰 추모 다큐멘터리 스타일",
    description: "한 분의 삶을 조명한 따뜻하고 솔직한 추모 영상. 가족들이 제공한 소중한 기록과 AI로 새롭게 생성한 장면을 섬세하게 연결했습니다. 상업적 작업과는 다른, 진심을 담는 작업의 좋은 사례입니다.",
    thumbnail: "https://picsum.photos/id/30/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "4:12",
    year: "2025",
    category: "Video Product",
    tools: ["Kling AI", "Topaz", "Premiere Pro"],
    role: "Director & Editor",
  },
  {
    id: 10,
    title: "VOID — 실험 단편",
    shortDesc: "순수 창작 실험작",
    description: "기술의 한계를 테스트하고 새로운 미학을 탐구하기 위한 개인 프로젝트. AI의 예측 불가능성을 적극적으로 활용해 인간이 만들기 어려운 독특한 리듬과 추상적인 이미지를 구현했습니다.",
    thumbnail: "https://picsum.photos/id/315/1280/720",
    videoUrl: SAMPLE_MP4,
    duration: "1:41",
    year: "2024",
    category: "Brand Film",
    tools: ["Runway", "Kling", "Luma", "Custom Workflow"],
    role: "Sole Creator",
  },
];

// 카테고리 목록 (필터용)
export const categories = [
  "All",
  "Brand Film",
  "Commercial",
  "Product",
  "Video Product",
  "Music Video",
  "Reel",
] as const;
