import type { Payload } from 'payload'
import { seedNavbar } from './seedNavbar'

export const seedDatabase = async (payload: Payload) => {
  payload.logger.info('🚀 Starting modular database seed...')

  await seedNavbar(payload)
  // await seedUsers(payload)
  // await seedPages(payload)

  payload.logger.info('✅ Full modular database seed complete!')
}

// Keep the CLI script export so `npm run seed` still works if needed
export const script = async ({ payload }: { payload: Payload }) => {
  await seedDatabase(payload)
  process.exit(0)
}
export default script
