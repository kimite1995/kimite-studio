import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '사이트 설정 (메인페이지 전체)',
  type: 'document',
  // 싱글톤으로 만들기 (문서 하나만 존재)
  __experimental_singleton: true,
  fields: [
    // 브랜드 기본
    defineField({
      name: 'name',
      title: '브랜드명 (로고/타이틀)',
      type: 'string',
      initialValue: 'KIMITE',
    }),
    defineField({
      name: 'fullName',
      title: '전체 브랜드명',
      type: 'string',
      initialValue: 'KIMITE STUDIO',
    }),
    defineField({
      name: 'tagline',
      title: '태그라인',
      type: 'string',
      initialValue: 'AI로 만드는 영화 같은 순간들',
    }),

    // ===== 히어로 섹션 =====
    defineField({
      name: 'hero',
      title: '히어로 섹션 (맨 위 메인 배너)',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: '메인 헤드라인 (줄바꿈은 \\n 사용)',
          type: 'text',
          rows: 2,
          initialValue: 'AI로 빚어내는\n영화 같은 순간',
        }),
        defineField({
          name: 'subheadline',
          title: '서브 헤드라인',
          type: 'text',
          rows: 2,
          initialValue: '광고, 브랜드 필름, 뮤직비디오, 추모영상까지.\n최신 AI 툴로 압도적인 비주얼 스토리텔링을 만듭니다.',
        }),
        defineField({
          name: 'ctaPrimary',
          title: '첫 번째 버튼 텍스트',
          type: 'string',
          initialValue: '대표 작품 보기',
        }),
        defineField({
          name: 'ctaSecondary',
          title: '두 번째 버튼 텍스트',
          type: 'string',
          initialValue: '서비스 알아보기',
        }),
      ],
    }),

    // ===== 어바웃 섹션 =====
    defineField({
      name: 'about',
      title: '어바웃 KIMITE 섹션',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: '섹션 제목',
          type: 'string',
          initialValue: 'About KIMITE',
        }),
        defineField({
          name: 'intro',
          title: '소개 텍스트 (줄바꿈은 \\n)',
          type: 'text',
          rows: 5,
        }),
        defineField({
          name: 'philosophy',
          title: '철학 / 한 줄 메시지',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'aboutPhoto',
          title: '프로필 사진 (어바웃 왼쪽)',
          type: 'image',
          options: { hotspot: true },
          description: '추천 비율 4:3. 여기 사진 넣으면 메인페이지에 바로 반영됩니다.',
        }),
        defineField({
          name: 'tools',
          title: '사용 툴 (배지로 표시)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            "Runway Gen-3", "Kling AI 1.6", "Luma Dream Machine", 
            "Pika 1.5", "Midjourney", "DaVinci Resolve", 
            "Adobe Premiere Pro", "After Effects", "Topaz Video AI"
          ],
        }),
        defineField({
          name: 'stats',
          title: '숫자 스탯 (4개)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'number', title: '숫자', type: 'number' }),
              defineField({ name: 'label', title: '라벨', type: 'string' }),
              defineField({ name: 'suffix', title: '접미사 (+, %, 빈칸 가능)', type: 'string' }),
            ],
          }],
          initialValue: [
            { number: 10, label: "AI 영상 제작", suffix: "+" },
            { number: 30, label: "협업 브랜드", suffix: "+" },
            { number: 2024, label: "활동 시작", suffix: "" },
            { number: 100, label: "클라이언트 만족", suffix: "%" },
          ],
        }),
      ],
    }),

    // ===== 서비스 섹션 =====
    defineField({
      name: 'services',
      title: '서비스 섹션 (6개 카드)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: '아이콘 이름 (lucide-react)',
            type: 'string',
            description: 'Film, Tv, Music, Heart, GraduationCap, Sparkles 등 (https://lucide.dev/icons 참고)',
          }),
          defineField({ name: 'title', title: '서비스 제목', type: 'string' }),
          defineField({ name: 'desc', title: '설명', type: 'text', rows: 3 }),
        ],
      }],
    }),

    // ===== 연락처 =====
    defineField({
      name: 'contact',
      title: '연락처 섹션',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: '이메일 주소', type: 'string' }),
        defineField({ name: 'responseTime', title: '답변 시간 안내 문구', type: 'string' }),
        defineField({ name: 'youtube', title: '유튜브 링크 (선택)', type: 'url' }),
      ],
    }),

    // ===== 푸터 =====
    defineField({
      name: 'footer',
      title: '푸터',
      type: 'object',
      fields: [
        defineField({ name: 'copyright', title: '저작권 문구', type: 'string' }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title: '사이트 설정',
        subtitle: title || 'KIMITE STUDIO',
      }
    },
  },
})
