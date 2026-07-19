import type { Payload } from 'payload'

export const seedFloatingMenu = async (payload: Payload) => {
  payload.logger.info('Seeding Floating Menu...')

  try {
    const existingMenu = await payload.findGlobal({
      slug: 'floating-menu',
      locale: 'all',
    })
    
    if (existingMenu && existingMenu.menuItems && existingMenu.menuItems.length > 0) {
      payload.logger.info('Floating Menu already has data, skipping seed.')
      return
    }
  } catch (error) {
    // Expected on fresh init
  }

  // English Seed
  await payload.updateGlobal({
    slug: 'floating-menu',
    locale: 'en',
    data: {
      menuItems: [
        {
          icon: 'zalo',
          label: 'Chat with Zalo',
          url: 'https://zalo.me/',
          color: '#0068ff', // Zalo Blue
        },
        {
          icon: 'phone',
          label: 'Call Us Now',
          url: 'tel:+15551234567',
          color: '#d81e28', // Primary Red
        },
      ],
    },
  })

  // Vietnamese Seed
  await payload.updateGlobal({
    slug: 'floating-menu',
    locale: 'vi',
    data: {
      menuItems: [
        {
          icon: 'zalo',
          label: 'Chat qua Zalo',
          url: 'https://zalo.me/',
          color: '#0068ff', // Zalo Blue
        },
        {
          icon: 'phone',
          label: 'Gọi Ngay',
          url: 'tel:+15551234567',
          color: '#d81e28', // Primary Red
        },
      ],
    },
  })

  payload.logger.info('✅ Floating Menu seeded successfully.')
}
