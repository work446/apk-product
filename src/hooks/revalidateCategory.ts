import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateCategory: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  try {
    revalidatePath('/en/products')
    revalidatePath('/vi/products')

    if (doc?.slug) {
      revalidatePath(`/en/products?category=${doc.slug}`)
      revalidatePath(`/vi/products?category=${doc.slug}`)
    }

    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePath(`/en/products?category=${previousDoc.slug}`)
      revalidatePath(`/vi/products?category=${previousDoc.slug}`)
    }

    revalidatePath('/en')
    revalidatePath('/vi')
  } catch (err) {
    console.error('Error revalidating category:', err)
  }
  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    revalidatePath('/en/products')
    revalidatePath('/vi/products')

    if (doc?.slug) {
      revalidatePath(`/en/products?category=${doc.slug}`)
      revalidatePath(`/vi/products?category=${doc.slug}`)
    }

    revalidatePath('/en')
    revalidatePath('/vi')
  } catch (err) {
    console.error('Error revalidating category delete:', err)
  }
  return doc
}
