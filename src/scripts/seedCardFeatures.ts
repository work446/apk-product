import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const getIconForText = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('led') || lower.includes('light') || lower.includes('lumen') || lower.includes('watt') || lower.includes('w')) return 'Lightbulb';
  if (lower.includes('hour') || lower.includes('time') || lower.includes('duration') || lower.includes('min')) return 'Clock';
  if (lower.includes('body') || lower.includes('material') || lower.includes('abs') || lower.includes('protect')) return 'Shield';
  if (lower.includes('battery') || lower.includes('mah') || lower.includes('power')) return 'Battery';
  if (lower.includes('volt') || lower.includes('ac') || lower.includes('dc') || lower.includes('v')) return 'Zap';
  if (lower.includes('water') || lower.includes('ip') || lower.includes('liquid')) return 'Droplet';
  if (lower.includes('temp') || lower.includes('celsius') || lower.includes('°')) return 'Thermometer';
  return 'Check';
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('Fetching products...')
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
  })

  for (const product of products.docs) {
    if (product.cardFeatures && product.cardFeatures.length > 0) {
      console.log(`Skipping ${product.productName}, already has cardFeatures`)
      continue
    }

    if (product.specifications && product.specifications.length > 0) {
      const features = product.specifications.slice(0, 3).map((s: any) => ({
        icon: getIconForText((s.key || '') + ' ' + (s.value || '')),
        text: s.value,
      }))

      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          cardFeatures: features as any,
        },
      })
      
      // Now update the 'vi' locale as well using the 'vi' specifications
      const viProduct = await payload.findByID({
        collection: 'products',
        id: product.id,
        locale: 'vi',
      })
      
      if (viProduct && viProduct.specifications && viProduct.specifications.length > 0) {
        const viFeatures = viProduct.specifications.slice(0, 3).map((s: any) => ({
          icon: getIconForText((s.key || '') + ' ' + (s.value || '')),
          text: s.value,
        }))
        
        await payload.update({
          collection: 'products',
          id: product.id,
          locale: 'vi',
          data: {
            cardFeatures: viFeatures as any,
          },
        })
      }

      console.log(`Updated ${product.productName}`)
    } else {
      console.log(`Skipping ${product.productName}, no specifications found`)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

run().catch(console.error)
