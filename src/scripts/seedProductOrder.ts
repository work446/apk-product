import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('Fetching categories and products...')
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const products = await payload.find({
    collection: 'products',
    limit: 1000,
  })

  // Group products by category
  const categoryMap = new Map()
  for (const cat of categories.docs) {
    categoryMap.set(cat.id, cat.order || 100)
  }

  // To keep products within the same category grouped but ordered, 
  // we can use: (category order * 100) + index
  const categoryCounters: Record<string, number> = {}

  for (const prod of products.docs) {
    const catId = typeof prod.category === 'object' ? prod.category?.id : prod.category
    
    let baseOrder = 10000 // default for no category
    if (catId && categoryMap.has(catId)) {
      baseOrder = categoryMap.get(catId) * 100
    }

    if (!categoryCounters[catId || 'none']) {
      categoryCounters[catId || 'none'] = 1
    } else {
      categoryCounters[catId || 'none']++
    }

    const finalOrder = baseOrder + categoryCounters[catId || 'none']

    await payload.update({
      collection: 'products',
      id: prod.id,
      data: {
        order: finalOrder,
      },
    })
    
    console.log(`Updated product ${prod.productName} with order: ${finalOrder}`)
  }

  console.log('Product ordering complete!')
  process.exit(0)
}

run().catch(console.error)
