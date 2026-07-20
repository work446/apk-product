import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  try {
    revalidatePath('/en')
    revalidatePath('/vi')
    revalidatePath('/en/products')
    revalidatePath('/vi/products')
  } catch (err) {
    console.error('Error revalidating global:', err)
  }
  return doc
}
