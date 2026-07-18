import type { Payload } from 'payload'

export const seedNavbar = async (payload: Payload) => {
  // 1. 🛡️ THE GUARD CHECK: Look up your global data
  const navbarData = await payload.findGlobal({
    slug: 'navbar' as any,
  })

  // 2. Only run the script if your links array is empty
  if (!navbarData?.links || navbarData.links.length === 0) {
    payload.logger.info('📦 Navbar database entry is empty. Seeding data now...')

    await payload.updateGlobal({
      slug: 'navbar' as any,
      data: {
        links: [
          { label: { en: 'Home', vi: 'Trang chủ' }, url: '/' },
          { label: { en: 'About', vi: 'Giới thiệu' }, url: '/about' },
          { label: { en: 'Contact', vi: 'Liên hệ' }, url: '/contact' },
        ],
      } as any,
      locale: 'all' as any,
    })

    payload.logger.info('✅ Navbar successfully seeded!')
  } else {
    // 3. If data already exists, this block runs instead and skips seeding safely
    payload.logger.info('⏭️ Navbar data already exists. Skipping seed lifecycle.')
  }
}
