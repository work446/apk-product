import type { Payload } from 'payload'

export const seedTopBanners = async (payload: Payload) => {
  const topBanners = await payload.find({
    collection: 'top-banners',
    limit: 1,
  })

  if (topBanners.docs.length === 0) {
    payload.logger.info('🚩 TopBanners database is empty. Seeding default active banner now...')

    const newBanner = await payload.create({
      collection: 'top-banners',
      data: {
        internalName: 'Default Brand Banner',
        isActive: true,
        leftText: 'Proudly Manufactured in Vietnam',
        centerText: 'Quality is Our Brand',
        phoneNumber: '+84 123 456 789',
      },
    })

    // Inject Vietnamese localizations
    await payload.update({
      collection: 'top-banners',
      id: newBanner.id,
      locale: 'vi',
      data: {
        leftText: 'Tự hào sản xuất tại Việt Nam',
        centerText: 'Chất lượng là Thương hiệu',
      },
    })

    payload.logger.info('✅ Default TopBanner successfully seeded!')
  } else {
    payload.logger.info('⏭️ TopBanners data already exists. Skipping seed lifecycle.')
  }
}
