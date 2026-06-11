import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'srn2jla0'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,   // CDN 가끔 불안정할 수 있어서 false로 변경 (더 안정적)
  apiVersion: '2024-06-01',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getWorks() {
  try {
    const raw = await client.fetch(
      `*[_type == "work"] | order(_createdAt desc) {
        _id,
        title,
        shortDesc,
        description,
        "thumbnail": thumbnail.asset->url,
        "videoUrl": coalesce(video.asset->url, videoUrl),
        duration,
        year,
        category,
        tools,
        role
      }`,
      {},
      { perspective: 'published' }   // Published 된 것만 확실히 가져오게
    )

    // Normalize to match Work interface (add id for keys + compatibility)
    return (raw || []).map((item: any) => ({
      ...item,
      id: item._id,
    }))
  } catch (err) {
    console.error('[Sanity] getWorks failed. Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local and that the document is Published in Studio.', err)
    return []
  }
}

export async function getSiteSettings() {
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{
        name,
        fullName,
        tagline,
        hero,
        about{
          title,
          intro,
          philosophy,
          "aboutPhoto": aboutPhoto.asset->url,
          tools,
          stats
        },
        services,
        contact,
        footer
      }`,
      {},
      { perspective: 'published' }
    )
    return data
  } catch (err) {
    console.error('[Sanity] getSiteSettings failed.', err)
    return null
  }
}
