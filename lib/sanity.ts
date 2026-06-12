import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Work, WorkCategory } from '@/data/works'
import type { SiteSettings } from '@/data/site'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'srn2jla0'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,   // CDN 가끔 불안정할 수 있어서 false로 변경 (더 안정적)
  apiVersion: '2024-06-01',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

type SanityWork = Omit<Work, 'id'> & {
  _id: string;
}

function normalizeCategories(input: Array<WorkCategory | string | undefined>): WorkCategory[] {
  const mapped = input
    .filter(Boolean)
    .flatMap((category) => {
      if (category === 'Memorial') return ['Video Product'];
      if (category === 'Experimental') return [];
      return [category];
    }) as WorkCategory[];

  return Array.from(new Set(mapped));
}

export async function getWorks(): Promise<Work[]> {
  try {
    const raw = await client.fetch<SanityWork[]>(
      `*[_type == "work"] | order(coalesce(orderRank, "zzzzzzzz") asc, coalesce(sortOrder, 999999) asc, _createdAt desc) {
        _id,
        title,
        workTypeTitle,
        brandName,
        mainVideoTitle,
        shortDesc,
        description,
        "thumbnail": thumbnail.asset->url,
        "videoUrl": coalesce(video.asset->url, videoUrl),
        duration,
        year,
        featured,
        orderRank,
        sortOrder,
        category,
        categories,
        tools,
        role,
        // 여러 영상 지원
        videos[]{
          title,
          "videoUrl": coalesce(video.asset->url, videoUrl),
          duration,
          "thumbnail": thumbnail.asset->url
        }
      }`,
      {},
      { perspective: 'published' }   // Published 된 것만 확실히 가져오게
    )

    // Normalize to match Work interface (add id for keys + compatibility)
    return (raw || []).map((item) => {
      const categories = normalizeCategories(
        item.categories?.length ? item.categories : [item.category]
      )

      return {
        ...item,
        id: item._id,
        category: categories[0] || 'Brand Film',
        categories,
      }
    })
  } catch (err) {
    console.error('[Sanity] getWorks failed. Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local and that the document is Published in Studio.', err)
    return []
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const data = await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{
        name,
        fullName,
        tagline,
        hero,
        servicesTag,
        servicesTitle,
        servicesIntro,
        worksFeaturedLabel,
        worksFeaturedTitle,
        worksAllLabel,
        worksAllTitle,
        worksIntro,
        about{
          title,
          intro,
          philosophy,
          "aboutPhoto": aboutPhoto.asset->url,
          tools,
          stats
        },
        services,
        servicesNote,
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
