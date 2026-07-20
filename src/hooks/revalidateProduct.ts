import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  try {
    revalidatePath('/en/products')
    revalidatePath('/vi/products')

    if (doc?.id) {
      revalidatePath(`/en/products/${doc.id}`)
      revalidatePath(`/vi/products/${doc.id}`)
    }

    if (previousDoc?.id && previousDoc.id !== doc?.id) {
      revalidatePath(`/en/products/${previousDoc.id}`)
      revalidatePath(`/vi/products/${previousDoc.id}`)
    }

    revalidatePath('/en')
    revalidatePath('/vi')
  } catch (err) {
    console.error('Error revalidating product:', err)
  }
  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    revalidatePath('/en/products')
    revalidatePath('/vi/products')

    if (doc?.id) {
      revalidatePath(`/en/products/${doc.id}`)
      revalidatePath(`/vi/products/${doc.id}`)
    }

    revalidatePath('/en')
    revalidatePath('/vi')
  } catch (err) {
    console.error('Error revalidating product delete:', err)
  }
  return doc
}
