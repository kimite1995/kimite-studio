import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const SITE_SETTINGS_ID = 'adeb2c43-5ed4-489f-b82b-e6abd812b01a'

const settingsEditor = (
  S: Parameters<StructureResolver>[0],
  id: string,
  title: string,
  schemaType: string
) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(
      S.document()
        .id(id)
        .title(title)
        .schemaType(schemaType)
        .documentId(SITE_SETTINGS_ID)
    )

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('KIMITE 관리자')
    .items([
      settingsEditor(S, 'editBrand', '기본 정보 수정', 'siteSettingsBrand'),
      settingsEditor(S, 'editHero', '첫 화면 수정', 'siteSettingsHero'),
      settingsEditor(S, 'editAbout', '소개 영역 수정', 'siteSettingsAbout'),
      settingsEditor(S, 'editWorksText', '작품 섹션 문구 수정', 'siteSettingsWorks'),
      settingsEditor(S, 'editServices', '서비스 영역 수정', 'siteSettingsServices'),
      settingsEditor(S, 'editContact', '문의 영역 수정', 'siteSettingsContact'),
      settingsEditor(S, 'editFooter', '푸터 수정', 'siteSettingsFooter'),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'work',
        id: 'workOrder',
        title: '작품 관리 / 순서 변경',
        S,
        context,
      }),
    ])
