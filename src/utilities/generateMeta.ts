import type { Metadata } from 'next'

export const generateMeta = async (args: { doc: any }): Promise<Metadata> => {
  const { doc } = args || {}

  let ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    doc.meta.image.url
      ? [{ url: doc.meta.image.url }]
      : []

  // Fallback to product image if meta image is empty
  if (ogImage.length === 0 && doc?.images?.[0]?.image?.url) {
    ogImage = [{ url: doc.images[0].image.url }]
  }

  let rawTitle = doc?.meta?.title || doc?.title || doc?.productTitle || doc?.productName || doc?.name
  let title = 'APK Product'
  if (rawTitle) {
    title = rawTitle.includes('APK Product') ? rawTitle : `APK Product - ${rawTitle}`
  }
  const description = doc?.meta?.description || 'APK Product'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage.length > 0 ? { images: ogImage } : {}),
    },
  }
}
