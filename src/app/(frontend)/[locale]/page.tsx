import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await props.params
  const locale = rawLocale as 'en' | 'vi'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    locale,
    limit: 1,
  })

  const page = docs[0]
  return generateMeta({ doc: page })
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await props.params
  const locale = rawLocale as 'en' | 'vi'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { isEnabled: draft } = await draftMode().catch(() => ({ isEnabled: true }))

  // Fetch the homepage
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    locale, // Pass locale to fetch localized data
    draft,
    limit: 1,
    depth: 2,
  })

  const page = docs[0]

  // If the page isn't found (or hasn't been seeded yet), return 404
  if (!page) {
    return notFound()
  }

  return (
    <main className=" mx-auto">
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
