import { defineType } from 'sanity'
import siteSettings from './siteSettings'

type SiteSettingsField = NonNullable<typeof siteSettings.fields>[number]

const allFields = (siteSettings.fields ?? []) as SiteSettingsField[]

const sectionFields = (visibleFieldNames: string[]) => {
  const visible = new Set(visibleFieldNames)

  return allFields.map((field) => {
    const fieldWithoutGroup = { ...field, group: undefined }

    if (visible.has(field.name)) {
      return fieldWithoutGroup
    }

    return {
      ...fieldWithoutGroup,
      hidden: true,
    }
  })
}

const sectionPreview = siteSettings.preview

const defineSection = (
  name: string,
  title: string,
  visibleFieldNames: string[]
) =>
  defineType({
    name,
    title,
    type: 'document',
    fields: sectionFields(visibleFieldNames),
    preview: sectionPreview,
  })

export const siteSettingsBrand = defineSection('siteSettingsBrand', '기본 정보 수정', [
  'name',
  'fullName',
  'tagline',
])

export const siteSettingsHero = defineSection('siteSettingsHero', '첫 화면 수정', [
  'hero',
])

export const siteSettingsAbout = defineSection('siteSettingsAbout', '소개 영역 수정', [
  'about',
])

export const siteSettingsWorks = defineSection(
  'siteSettingsWorks',
  '작품 섹션 문구 수정',
  [
    'worksFeaturedLabel',
    'worksFeaturedTitle',
    'worksAllLabel',
    'worksAllTitle',
    'worksIntro',
  ]
)

export const siteSettingsServices = defineSection(
  'siteSettingsServices',
  '서비스 영역 수정',
  ['servicesTag', 'servicesTitle', 'servicesIntro', 'services', 'servicesNote']
)

export const siteSettingsContact = defineSection(
  'siteSettingsContact',
  '문의 영역 수정',
  ['contact']
)

export const siteSettingsFooter = defineSection('siteSettingsFooter', '푸터 수정', [
  'footer',
])
