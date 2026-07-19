import type { Payload } from 'payload'

export const seedFooter = async (payload: Payload) => {
  payload.logger.info('Seeding Footer...')

  try {
    const existingFooter = await payload.findGlobal({
      slug: 'footer',
      locale: 'all',
    })
    
    // Check if quickLinks exist to prevent overriding
    if (existingFooter && existingFooter.quickLinks && existingFooter.quickLinks.length > 0) {
      payload.logger.info('Footer already has data, skipping seed.')
      return
    }
  } catch (error) {
    // Expected on fresh init if global is empty
  }

  // English Seed
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: {
      companyDescription: 'APK is a leading provider of high-quality industrial hardware and safety solutions.',
      contact: {
        address: '123 Industrial Way, Tech City, 90210',
        phone: '+1 (555) 123-4567',
        email: 'info@apkproduct.com',
        workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      },
      quickLinks: [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Contact', url: '/contact' },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'zalo', url: 'https://zalo.me/' },
      ],
      copyright: '© 2026 APK. All rights reserved.',
    },
  })

  // Vietnamese Seed
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'vi',
    data: {
      companyDescription: 'APK là nhà cung cấp hàng đầu về phần cứng công nghiệp và giải pháp an toàn chất lượng cao.',
      contact: {
        address: '123 Đường Công Nghiệp, Thành Phố Công Nghệ, 90210',
        phone: '+1 (555) 123-4567',
        email: 'info@apkproduct.com',
        workingHours: 'Thứ 2 - Thứ 6: 9:00 Sáng - 6:00 Chiều',
      },
      quickLinks: [
        { label: 'Trang Chủ', url: '/' },
        { label: 'Sản Phẩm', url: '/products' },
        { label: 'Liên Hệ', url: '/contact' },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'zalo', url: 'https://zalo.me/' },
      ],
      copyright: '© 2026 APK. Bảo lưu mọi quyền.',
    },
  })

  payload.logger.info('✅ Footer seeded successfully.')
}
