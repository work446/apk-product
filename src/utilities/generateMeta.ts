import type { Metadata } from 'next'

export const generateMeta = async (args: { doc: any }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    doc.meta.image.url
      ? [{ url: doc.meta.image.url }]
      : []

  const title = doc?.meta?.title || 'APK Product'
  const description = doc?.meta?.description || 'APK Product'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
    },
  }
}
