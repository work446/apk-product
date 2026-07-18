import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { notFound } from 'next/navigation'

export default async function HomePage(props: { params: Promise<{ locale: 'en' | 'vi' }> }) {
  const { locale } = await props.params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the homepage
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    locale, // Pass locale to fetch localized data
    limit: 1,
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
