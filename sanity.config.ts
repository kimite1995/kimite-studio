import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { koreanReleasesBundle, koreanStudioBundle } from './sanity/i18n/korean'

export default defineConfig({
  name: 'default',
  title: 'KIMITE STUDIO',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'srn2jla0',
  dataset: 'production',
  scheduledDrafts: {
    enabled: false,
  },
  releases: {
    enabled: false,
  },
  i18n: {
    bundles: [koreanStudioBundle, koreanReleasesBundle],
  },

  plugins: [
    deskTool({
      title: '관리자',
      structure,
    }),
    visionTool({
      title: '데이터 검사',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
