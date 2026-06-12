import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '사이트 전체 설정',
  type: 'document',
  groups: [
    { name: 'brand', title: '기본 정보', default: true },
    { name: 'hero', title: '첫 화면' },
    { name: 'about', title: '소개' },
    { name: 'works', title: '작품 섹션' },
    { name: 'services', title: '서비스' },
    { name: 'contact', title: '문의' },
    { name: 'footer', title: '푸터' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: '짧은 브랜드명',
      type: 'string',
      group: 'brand',
      initialValue: 'KIMITE',
      description: '상단 로고에 크게 표시되는 이름입니다.',
    }),
    defineField({
      name: 'fullName',
      title: '전체 브랜드명',
      type: 'string',
      group: 'brand',
      initialValue: 'KIMITE STUDIO',
      description: '검색, 공유, 관리자 미리보기 등에 쓰는 전체 이름입니다.',
    }),
    defineField({
      name: 'tagline',
      title: '사이트 한 줄 소개',
      type: 'string',
      group: 'brand',
      initialValue: 'AI로 만드는 영화 같은 순간들',
      description: '브랜드를 짧게 설명하는 문장입니다.',
    }),

    defineField({
      name: 'hero',
      title: '첫 화면 문구와 버튼',
      type: 'object',
      group: 'hero',
      description: '메인페이지에 처음 보이는 가장 큰 영역입니다.',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'badge',
          title: '상단 작은 문구',
          type: 'string',
          initialValue: 'AI CINEMATIC DIRECTOR',
          description: '큰 제목 위에 작은 캡슐 형태로 보이는 문구입니다.',
        }),
        defineField({
          name: 'headline',
          title: '가장 큰 제목',
          type: 'text',
          rows: 2,
          initialValue: 'AI로 빚어내는\n영화 같은 순간',
          description: '줄을 바꾸고 싶으면 Enter로 줄바꿈하세요.',
        }),
        defineField({
          name: 'subheadline',
          title: '큰 제목 아래 설명',
          type: 'text',
          rows: 3,
          initialValue: '광고, 브랜드 필름, 뮤직비디오, 추모영상까지.\n최신 AI 툴로 압도적인 비주얼 스토리텔링을 만듭니다.',
        }),
        defineField({
          name: 'ctaPrimary',
          title: '첫 번째 버튼 문구',
          type: 'string',
          initialValue: '대표 작품 보기',
        }),
        defineField({
          name: 'ctaSecondary',
          title: '두 번째 버튼 문구',
          type: 'string',
          initialValue: '서비스 알아보기',
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: '소개 영역',
      type: 'object',
      group: 'about',
      description: '프로필 사진, 자기소개, 사용 툴, 숫자 스탯을 수정합니다.',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'title',
          title: '소개 영역 제목',
          type: 'string',
          initialValue: 'About KIMITE',
        }),
        defineField({
          name: 'intro',
          title: '소개 글',
          type: 'text',
          rows: 6,
          description: '메인 소개 문단입니다. 줄바꿈은 그대로 반영됩니다.',
        }),
        defineField({
          name: 'philosophy',
          title: '강조 문장',
          type: 'text',
          rows: 3,
          description: '소개 글 아래 금색으로 강조되는 문장입니다.',
        }),
        defineField({
          name: 'aboutPhoto',
          title: '프로필 사진',
          type: 'image',
          options: { hotspot: true },
          description: '소개 영역 왼쪽에 표시됩니다. 추천 비율은 4:3입니다.',
        }),
        defineField({
          name: 'tools',
          title: '주요 사용 툴',
          type: 'array',
          of: [{ type: 'string' }],
          description: '각 항목이 작은 배지로 표시됩니다.',
          initialValue: [
            'Runway Gen-3',
            'Kling AI 1.6',
            'Luma Dream Machine',
            'Pika 1.5',
            'Midjourney',
            'DaVinci Resolve',
            'Adobe Premiere Pro',
            'After Effects',
            'Topaz Video AI',
          ],
        }),
        defineField({
          name: 'stats',
          title: '숫자로 보여주는 성과',
          type: 'array',
          description: '소개 영역 하단에 2개 또는 4개 정도로 보이는 숫자 정보입니다.',
          of: [
            {
              type: 'object',
              title: '숫자 항목',
              fields: [
                defineField({ name: 'number', title: '숫자', type: 'number' }),
                defineField({ name: 'suffix', title: '뒤에 붙일 기호', type: 'string', description: '예: +, %, 빈칸' }),
                defineField({ name: 'label', title: '설명', type: 'string' }),
              ],
              preview: {
                select: { number: 'number', suffix: 'suffix', label: 'label' },
                prepare({ number, suffix, label }) {
                  return { title: `${number ?? ''}${suffix ?? ''}`, subtitle: label || '설명 없음' }
                },
              },
            },
          ],
          initialValue: [
            { number: 10, label: 'AI 영상 제작', suffix: '+' },
            { number: 30, label: '협업 브랜드', suffix: '+' },
            { number: 2024, label: '활동 시작', suffix: '' },
            { number: 100, label: '클라이언트 만족', suffix: '%' },
          ],
        }),
      ],
    }),

    defineField({
      name: 'worksFeaturedLabel',
      title: '대표 작품 작은 문구',
      type: 'string',
      group: 'works',
      initialValue: 'SELECTED WORK',
      description: '대표 작품 영역 제목 위에 작게 표시됩니다.',
    }),
    defineField({
      name: 'worksFeaturedTitle',
      title: '대표 작품 제목',
      type: 'string',
      group: 'works',
      initialValue: 'Featured Works',
    }),
    defineField({
      name: 'worksAllLabel',
      title: '전체 작품 작은 문구',
      type: 'string',
      group: 'works',
      initialValue: 'PORTFOLIO',
    }),
    defineField({
      name: 'worksAllTitle',
      title: '전체 작품 제목',
      type: 'string',
      group: 'works',
      initialValue: 'All Works',
    }),
    defineField({
      name: 'worksIntro',
      title: '작품 개수 옆 안내 문구',
      type: 'string',
      group: 'works',
      initialValue: '클릭하면 작품 설명과 영상을 펼쳐서 볼 수 있습니다.',
      description: '전체 작품 제목 오른쪽에 표시되는 짧은 안내입니다.',
    }),

    defineField({
      name: 'servicesTag',
      title: '서비스 작은 문구',
      type: 'string',
      group: 'services',
      initialValue: 'WHAT I OFFER',
    }),
    defineField({
      name: 'servicesTitle',
      title: '서비스 제목',
      type: 'string',
      group: 'services',
      initialValue: 'Services',
    }),
    defineField({
      name: 'servicesIntro',
      title: '서비스 소개 문구',
      type: 'text',
      group: 'services',
      rows: 3,
      initialValue: 'AI 영상 제작부터 레슨까지. 프로젝트에 가장 적합한 형태로 함께합니다.',
    }),
    defineField({
      name: 'services',
      title: '서비스 카드 목록',
      type: 'array',
      group: 'services',
      description: '메인페이지 서비스 영역에 카드 형태로 표시됩니다.',
      of: [
        {
          type: 'object',
          title: '서비스 카드',
          fields: [
            defineField({
              name: 'icon',
              title: '아이콘 이름',
              type: 'string',
              description: '예: Film, Tv, Music, Heart, GraduationCap, Sparkles',
            }),
            defineField({ name: 'title', title: '카드 제목', type: 'string' }),
            defineField({ name: 'desc', title: '카드 설명', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'desc' },
          },
        },
      ],
    }),
    defineField({
      name: 'servicesNote',
      title: '서비스 하단 안내 문구',
      type: 'string',
      group: 'services',
      initialValue: '모든 프로젝트는 맞춤 견적으로 진행됩니다. 구체적인 브리프를 보내주세요.',
    }),

    defineField({
      name: 'contact',
      title: '문의 영역',
      type: 'object',
      group: 'contact',
      description: '문의 폼 위 제목, 안내 문구, 연락처 정보를 수정합니다.',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'tag',
          title: '문의 영역 작은 문구',
          type: 'string',
          initialValue: "LET'S CREATE TOGETHER",
        }),
        defineField({
          name: 'title',
          title: '문의 영역 제목',
          type: 'string',
          initialValue: '프로젝트를 시작해볼까요?',
        }),
        defineField({
          name: 'intro',
          title: '문의 영역 안내 문구',
          type: 'text',
          rows: 3,
          initialValue: '브랜드 필름, 광고, 뮤직비디오, 추모영상, AI 레슨까지.\n원하는 프로젝트를 자세히 알려주세요.',
        }),
        defineField({ name: 'email', title: '문의 이메일', type: 'string' }),
        defineField({ name: 'responseTime', title: '답변 시간 안내', type: 'string' }),
        defineField({ name: 'youtube', title: '유튜브 링크', type: 'url' }),
      ],
    }),

    defineField({
      name: 'footer',
      title: '푸터',
      type: 'object',
      group: 'footer',
      description: '페이지 가장 아래쪽 정보를 수정합니다.',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'copyright', title: '저작권 문구', type: 'string' }),
        defineField({ name: 'location', title: '지역 표시', type: 'string', initialValue: 'Seoul, Korea' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'tagline',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'KIMITE STUDIO',
        subtitle: subtitle || '메인페이지 전체 설정',
      }
    },
  },
})
