import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { VideoThumbnailInput } from '../components/VideoThumbnailInput'

export default defineType({
  name: 'work',
  title: '작품',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    { name: 'basic', title: '기본 정보', default: true },
    { name: 'media', title: '이미지와 대표 영상' },
    { name: 'videos', title: '추가 영상' },
    { name: 'meta', title: '분류와 제작 정보' },
  ],
  fields: [
    orderRankField({ type: 'work' }),
    defineField({
      name: 'title',
      title: '작품 제목',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().error('작품 제목은 꼭 입력해야 합니다.'),
      description: '작품 카드와 상세 영역에 가장 크게 보이는 제목입니다.',
    }),
    defineField({
      name: 'workTypeTitle',
      title: '카드 큰 제목',
      type: 'string',
      group: 'basic',
      hidden: true,
      description: '메인페이지 카드에서 크게 보이는 영상 종류입니다. 예: 회사 소개 영상, 제품 홍보 영상, AI 뮤직비디오',
    }),
    defineField({
      name: 'brandName',
      title: '브랜드 / 프로젝트명',
      type: 'string',
      group: 'basic',
      hidden: true,
      description: '카드 큰 제목 아래에 작게 보이는 이름입니다. 예: 더블트러블, 바오밥매트, 골드스킨즈',
    }),
    defineField({
      name: 'shortDesc',
      title: '카드용 짧은 설명',
      type: 'string',
      group: 'basic',
      description: '작품 카드에 보이는 한줄 소개입니다. 25~42자 정도로 짧게 쓰면 가장 깔끔합니다.',
      validation: (Rule) => Rule.max(42).warning('카드에서 깔끔하게 보이려면 42자 이내를 추천합니다.'),
    }),
    defineField({
      name: 'description',
      title: '자세한 작품 설명',
      type: 'text',
      rows: 6,
      group: 'basic',
      description: '작품을 클릭했을 때 펼쳐지는 상세 설명입니다. 줄바꿈은 그대로 반영됩니다.',
    }),

    defineField({
      name: 'thumbnail',
      title: '대표 썸네일 이미지',
      type: 'image',
      group: 'media',
      components: {
        input: VideoThumbnailInput,
      },
      options: { hotspot: true },
      description: '작품 카드와 영상 목록에 보이는 이미지입니다. 없어도 저장할 수 있습니다. 추천 비율은 16:9입니다.',
    }),
    defineField({
      name: 'video',
      title: '대표 영상 파일 업로드',
      type: 'file',
      group: 'media',
      description: 'MP4 파일을 직접 올릴 때 사용합니다. 외부 링크보다 이 파일이 우선 사용됩니다.',
    }),
    defineField({
      name: 'videoUrl',
      title: '대표 영상 외부 링크',
      type: 'url',
      group: 'media',
      description: 'YouTube, Vimeo, 직접 MP4 링크를 넣을 수 있습니다. 파일 업로드를 쓰지 않을 때 입력하세요.',
    }),
    defineField({
      name: 'mainVideoTitle',
      title: '대표 영상 제목',
      type: 'string',
      group: 'media',
      description: '작품을 열었을 때 첫 번째 영상에 붙는 제목입니다. 예: 육각매트 제품 홍보영상. 비워두면 "메인 영상"으로 표시됩니다.',
    }),
    defineField({
      name: 'duration',
      title: '대표 영상 길이',
      type: 'string',
      group: 'media',
      hidden: true,
      description: '예: 2:14, 0:28 x 6',
    }),

    defineField({
      name: 'videos',
      title: '추가 영상 목록',
      type: 'array',
      group: 'videos',
      description: '하나의 작품 안에 여러 영상을 넣고 싶을 때 추가하세요. 메인페이지에서 영상 목록으로 선택할 수 있습니다.',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          title: '추가 영상',
          fields: [
            defineField({
              name: 'title',
              title: '영상 제목',
              type: 'string',
              description: '비워두면 메인페이지에서 VER.2, VER.3처럼 자동 표시됩니다. 필요할 때만 B안, 세로형, 15초 버전처럼 짧게 적어주세요.',
            }),
            defineField({
              name: 'video',
              title: '영상 파일 업로드',
              type: 'file',
              description: 'MP4 파일을 직접 올릴 때 사용합니다.',
            }),
            defineField({
              name: 'videoUrl',
              title: '영상 외부 링크',
              type: 'url',
              description: 'YouTube, Vimeo, 직접 MP4 링크를 넣을 수 있습니다.',
            }),
            defineField({
              name: 'duration',
              title: '영상 길이',
              type: 'string',
              hidden: true,
              description: '예: 2:14',
            }),
            defineField({
              name: 'thumbnail',
              title: '영상 전용 썸네일',
              type: 'image',
              components: {
                input: VideoThumbnailInput,
              },
              options: { hotspot: true },
              description: '없으면 작품 대표 썸네일을 대신 사용합니다.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'duration',
              media: 'thumbnail',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || '제목 없는 추가 영상',
                subtitle: subtitle || '영상 길이 미입력',
                media,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'year',
      title: '제작 연도',
      type: 'string',
      group: 'meta',
      description: '예: 2025',
    }),
    defineField({
      name: 'sortOrder',
      title: '메인 출력 순서',
      type: 'number',
      group: 'meta',
      hidden: true,
      description: '메인페이지 카드 순서입니다. 1이 가장 먼저 보이고, 숫자가 작을수록 앞에 나옵니다. 비워두면 뒤쪽에 표시됩니다.',
      validation: (Rule) => Rule.integer().min(1).warning('1 이상의 정수로 입력하면 정렬이 깔끔합니다.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Works에 표시',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: '켜두면 메인 상단 대표 쇼케이스에 표시됩니다. 드래그 순서가 빠른 작품이 크게 보입니다.',
    }),
    defineField({
      name: 'categories',
      title: '작품 분류',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '브랜드 필름', value: 'Brand Film' },
          { title: '광고 / 커머셜', value: 'Commercial' },
          { title: '제품 영상', value: 'Product' },
          { title: '영상 상품', value: 'Video Product' },
          { title: '뮤직비디오', value: 'Music Video' },
          { title: '숏폼', value: 'Reel' },
        ],
      },
      validation: (Rule) => Rule.required().min(1).error('작품 분류를 하나 이상 선택해주세요.'),
      description: '여러 분류에 해당되면 모두 선택하세요. 메인페이지 필터에도 각각 반영됩니다.',
    }),
    defineField({
      name: 'category',
      title: '작품 분류',
      type: 'string',
      group: 'meta',
      hidden: true,
      options: {
        layout: 'radio',
        list: [
          { title: '브랜드 필름', value: 'Brand Film' },
          { title: '광고 / 커머스', value: 'Commercial' },
          { title: '제품 영상', value: 'Product' },
          { title: '영상 상품', value: 'Video Product' },
          { title: '뮤직비디오', value: 'Music Video' },
          { title: '숏폼', value: 'Reel' },
        ],
      },
      description: '메인페이지 필터와 카드 배지에 사용됩니다.',
    }),
    defineField({
      name: 'tools',
      title: '사용한 툴',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      initialValue: ['Nano Banana2', 'GPT', 'Grok', 'CapCut'],
      description: '예: Runway Gen-3, Kling AI, DaVinci Resolve',
    }),
    defineField({
      name: 'role',
      title: '담당 역할',
      type: 'string',
      group: 'meta',
      description: '예: Director, AI Prompt Engineer, Editor',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      categories: 'categories',
      year: 'year',
      sortOrder: 'sortOrder',
      media: 'thumbnail',
    },
    prepare({ title, category, categories, year, sortOrder, media }) {
      const categoryText = categories?.length ? categories.join(', ') : category
      const orderText = sortOrder ? `순서 ${sortOrder}` : null
      return {
        title: title || '제목 없는 작품',
        subtitle: [orderText, categoryText, year].filter(Boolean).join(' · ') || '분류와 연도 미입력',
        media,
      }
    },
  },
})
