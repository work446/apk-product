import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  try {
    if (doc?.slug === 'home') {
      revalidatePath('/en')
      revalidatePath('/vi')
    } else if (doc?.slug) {
      revalidatePath(`/en/${doc.slug}`)
      revalidatePath(`/vi/${doc.slug}`)
    }

    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      if (previousDoc.slug === 'home') {
        revalidatePath('/en')
        revalidatePath('/vi')
      } else {
        revalidatePath(`/en/${previousDoc.slug}`)
        revalidatePath(`/vi/${previousDoc.slug}`)
      }
    }
  } catch (err) {
    console.error('Error revalidating page:', err)
  }
  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    if (doc?.slug === 'home') {
      revalidatePath('/en')
      revalidatePath('/vi')
    } else if (doc?.slug) {
      revalidatePath(`/en/${doc.slug}`)
      revalidatePath(`/vi/${doc.slug}`)
    }
  } catch (err) {
    console.error('Error revalidating page delete:', err)
  }
  return doc
}
