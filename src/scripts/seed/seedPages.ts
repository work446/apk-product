import type { Payload } from 'payload'

export const seedPages = async (payload: Payload) => {
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
  })

  if (pages.docs.length === 0) {
    payload.logger.info('📦 Pages database is empty. Seeding Homepage now...')



    // 2. Create the Page in English first
    const newPage = await payload.create({
      collection: 'pages',
      locale: 'en',
      data: {
        title: 'Home',
        slug: 'home',
        layout: [
          {
            blockType: 'hero',
            tagline: 'EMERGENCY LIGHTING SOLUTIONS',
            headlineBlack: 'SAFE DIRECTION.',
            headlineRed: 'BRIGHTER FUTURE.',
            subtitle: 'High quality emergency lighting and exit signs for every building, every situation.',
            features: [
              { icon: 'Shield', title: 'Reliable Quality', description: 'Tested for safety, built to last.' },
              { icon: 'Tag', title: 'Affordable Price', description: 'Best value without compromise.' },
              { icon: 'Wrench', title: 'Easy Installation', description: 'User-friendly design saves time & cost.' },
            ],
            actions: [
              { label: 'EXPLORE PRODUCTS', url: '/products', style: 'primary' },
              { label: 'GET A QUOTE', url: '/contact', style: 'secondary' },
              { label: 'WATCH VIDEO', url: '#', style: 'ghost' },
            ],
            sliderImages: [],
            trustBanner: [
              { icon: 'ShieldCheck', text: '2-YEAR WARRANTY' },
              { icon: 'Truck', text: 'FAST DELIVERY' },
              { icon: 'Package', text: 'READY STOCK' },
              { icon: 'Award', text: 'CERTIFIED PRODUCTS' },
              { icon: 'Headset', text: 'STRONG TECHNICAL SUPPORT' },
            ],
          },
        ],
      },
    })

    // 3. Update the Page with Vietnamese localizations
    await payload.update({
      collection: 'pages',
      id: newPage.id,
      locale: 'vi',
      data: {
        title: 'Trang chủ',
        layout: [
          {
            id: newPage.layout?.[0]?.id, // Ensure we update the same block ID
            blockType: 'hero',
            tagline: 'GIẢI PHÁP CHIẾU SÁNG KHẨN CẤP',
            headlineBlack: 'HƯỚNG ĐI AN TOÀN.',
            headlineRed: 'TƯƠNG LAI TƯƠI SÁNG.',
            subtitle: 'Đèn chiếu sáng sự cố và biển báo lối thoát hiểm chất lượng cao cho mọi tòa nhà, mọi tình huống.',
            features: [
              { icon: 'Shield', title: 'Chất lượng Đáng tin cậy', description: 'Được kiểm tra an toàn, bền bỉ.' },
              { icon: 'Tag', title: 'Giá cả Hợp lý', description: 'Giá trị tốt nhất mà không thỏa hiệp.' },
              { icon: 'Wrench', title: 'Dễ dàng Lắp đặt', description: 'Thiết kế thân thiện với người dùng giúp tiết kiệm thời gian & chi phí.' },
            ],
            actions: [
              { label: 'KHÁM PHÁ SẢN PHẨM', url: '/products', style: 'primary' },
              { label: 'NHẬN BÁO GIÁ', url: '/contact', style: 'secondary' },
              { label: 'XEM VIDEO', url: '#', style: 'ghost' },
            ],
            sliderImages: [],
            trustBanner: [
              { icon: 'ShieldCheck', text: 'BẢO HÀNH 2 NĂM' },
              { icon: 'Truck', text: 'GIAO HÀNG NHANH' },
              { icon: 'Package', text: 'HÀNG CÓ SẴN' },
              { icon: 'Award', text: 'SẢN PHẨM CHỨNG NHẬN' },
              { icon: 'Headset', text: 'HỖ TRỢ KỸ THUẬT MẠNH MẼ' },
            ],
          },
        ],
      },
    })

    payload.logger.info('✅ Homepage successfully seeded with image and content!')
  } else {
    payload.logger.info('⏭️ Pages already exist. Skipping seed lifecycle.')
  }
}
