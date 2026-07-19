import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  // Delete all pages
  await payload.delete({
    collection: 'pages',
    where: {
      id: { exists: true }
    }
  })
  
  console.log('✅ Deleted all pages.')
  
  // Run seed
  const { seedDatabase } = await import('./src/scripts/seed')
  await seedDatabase(payload)
  
  console.log('✅ Reseeded database.')
  process.exit(0)
}

run()
