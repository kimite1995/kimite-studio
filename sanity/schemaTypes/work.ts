import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: '작품',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDesc',
      title: '짧은 설명 (목록 카드에 표시)',
      type: 'string',
      description: '작품 목록에서 카드에 표시될 짧은 설명입니다.',
    }),
    defineField({
      name: 'description',
      title: '상세 설명 (모달 팝업)',
      type: 'text',
      description: '작품 클릭 시 모달에서 표시될 자세한 설명입니다. 여러 줄 입력 가능.',
    }),
    defineField({
      name: 'thumbnail',
      title: '썸네일 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: '목록과 모달에 표시될 대표 이미지입니다. 16:9 비율 추천.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: '영상 파일 (직접 업로드)',
      type: 'file',
      description: 'MP4 영상 파일을 직접 업로드합니다. Sanity가 호스팅하며, 사이트에서 hover 미리보기와 재생에 사용됩니다.',
    }),
    defineField({
      name: 'videoUrl',
      title: '영상 URL (외부 링크)',
      type: 'url',
      description: 'Vimeo, YouTube 또는 직접 MP4 링크를 입력하세요. (위 "영상 파일"이 없을 경우 이 URL이 사용됩니다)',
    }),
    defineField({
      name: 'duration',
      title: '영상 길이',
      type: 'string',
      description: '예: 2:14, 0:28 × 6',
    }),
    defineField({
      name: 'year',
      title: '제작 연도',
      type: 'string',
      description: '예: 2025',
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Film', value: 'Brand Film' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Product', value: 'Product' },
          { title: 'Music Video', value: 'Music Video' },
          { title: 'Memorial', value: 'Memorial' },
          { title: 'Experimental', value: 'Experimental' },
          { title: 'Reel', value: 'Reel' },
        ],
      },
      description: '작품의 분류를 선택하세요.',
    }),
    defineField({
      name: 'tools',
      title: '사용한 툴',
      type: 'array',
      of: [{ type: 'string' }],
      description: '예: Runway Gen-3, Kling 1.6, DaVinci Resolve',
    }),
    defineField({
      name: 'role',
      title: '담당 역할',
      type: 'string',
      description: '예: Director, AI Prompt Engineer, Editor',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDesc',
      media: 'thumbnail',
    },
  },
})
