import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('Fetching categories...')
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  // Define the order requested by user
  const orderMap = [
    'emergency light',
    'emergency exit',
    'sprinkle', // they wrote sprinkle instead of sprinkler, we'll match substring
    'fire nozzle',
    'angle valve',
    'fire hose'
  ]

  for (const cat of categories.docs) {
    let order = 100 // default high order if not found
    const titleLower = cat.title ? cat.title.toLowerCase() : ''
    const slugLower = cat.slug ? cat.slug.toLowerCase() : ''

    for (let i = 0; i < orderMap.length; i++) {
      const keyword = orderMap[i]
      if (titleLower.includes(keyword) || slugLower.includes(keyword) || (keyword === 'emergency exit' && (titleLower.includes('exist') || slugLower.includes('exist'))) || (keyword === 'sprinkle' && (titleLower.includes('sprinkler') || slugLower.includes('sprinkler')))) {
        order = (i + 1) * 10
        break
      }
    }

    await payload.update({
      collection: 'categories',
      id: cat.id,
      data: {
        order,
      },
    })
    
    console.log(`Updated category ${cat.title || cat.slug} with order: ${order}`)
  }

  console.log('Category ordering complete!')
  process.exit(0)
}

run().catch(console.error)
