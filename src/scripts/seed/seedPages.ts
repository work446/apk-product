import type { Payload } from 'payload'
import fs from 'fs'
import path from 'path'
import os from 'os'

async function downloadImage(url: string): Promise<string> {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const fileName = path.basename(url)
  const filePath = path.join(os.tmpdir(), fileName)
  fs.writeFileSync(filePath, buffer)
  return filePath
}

export const seedPages = async (payload: Payload) => {
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
  })

  if (pages.docs.length === 0) {
    payload.logger.info('📦 Pages database is empty. Seeding Homepage now...')

    // 1. Download images and create Media docs
    const enDataPath = path.resolve(process.cwd(), 'apk_en.json')
    const viDataPath = path.resolve(process.cwd(), 'apk_vi.json')

    let enData: any = {}
    let viData: any = {}

    try {
      enData = JSON.parse(fs.readFileSync(enDataPath, 'utf-8'))
      viData = JSON.parse(fs.readFileSync(viDataPath, 'utf-8'))
    } catch (err) {
      payload.logger.error('Error reading JSON files, fallback to empty array')
    }

    const companiesEn = enData?.partners?.companies || []
    const companiesVi = viData?.partners?.companies || []

    const categoriesData = await Promise.all(
      companiesEn.map(async (company: any, index: number) => {
        const viCompany = companiesVi[index] || company
        const filePath = await downloadImage(company.imageUrl)
        const media = await payload.create({
          collection: 'media',
          data: { alt: company.name },
          filePath,
        })
        return {
          title: company.name,
          description: company.description,
          viDescription: viCompany.description,
          link: '/' + company.websiteLink,
          mediaId: media.id,
        }
      }),
    )

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
            subtitle:
              'High quality emergency lighting and exit signs for every building, every situation.',
            features: [
              {
                icon: 'Shield',
                title: 'Reliable Quality',
                description: 'Tested for safety, built to last.',
              },
              {
                icon: 'Tag',
                title: 'Affordable Price',
                description: 'Best value without compromise.',
              },
              {
                icon: 'Wrench',
                title: 'Easy Installation',
                description: 'User-friendly design saves time & cost.',
              },
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
          {
            blockType: 'exploreProducts',
            title: enData?.partners?.title || 'EXPLORE APK PRODUCTS',
            categories: categoriesData.map((cat) => ({
              image: cat.mediaId,
              title: cat.title,
              description: cat.description,
              link: cat.link,
              linkText: 'VIEW MORE',
            })),
          },
          {
            blockType: 'technicalSupport',
            subtitle: 'STRONG TECHNICAL SUPPORT',
            title: "WE DON'T JUST SELL. WE STAY UNTIL IT WORKS.",
            description:
              'Our engineers are always ready to support you with professional service and technical expertise.',
            features: [
              { featureText: 'Installation support' },
              { featureText: 'Maintenance guidance' },
              { featureText: 'Wiring consultation' },
              { featureText: 'Warranty service' },
              { featureText: 'Product training' },
              { featureText: 'Quick response' },
            ],
            linkGroup: {
              text: 'CONTACT OUR ENGINEERS',
              url: '/contact',
            },
            sliderImages: [
              { image: categoriesData[0]?.mediaId },
              { image: categoriesData[1]?.mediaId },
            ],
          },
          {
            blockType: 'statistics',
            stats: [
              { icon: 'building', value: '15+', label: 'YEARS EXPERIENCE' },
              { icon: 'users', value: '500+', label: 'PROJECTS COMPLETED' },
              { icon: 'handshake', value: '1000+', label: 'SATISFIED CUSTOMERS' },
              { icon: 'thumbs-up', value: '98%', label: 'CUSTOMER SATISFACTION' },
            ],
          },
          {
            blockType: 'widelyUsed',
            title: 'WIDELY USED IN',
            items: [
              { icon: 'Factory', label: 'Factories' },
              { icon: 'Building2', label: 'Offices' },
              { icon: 'School', label: 'Schools' },
              { icon: 'HeartPulse', label: 'Hospitals' },
              { icon: 'ShoppingBag', label: 'Shopping Malls' },
              { icon: 'Home', label: 'Apartments' },
            ],
          },
          {
            blockType: 'callToAction',
            title: 'Need reliable emergency lighting solutions?',
            subtitle: 'Our team is ready to help you.',
            buttonText: 'REQUEST A QUOTE',
            buttonLink: '/contact',
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
            subtitle:
              'Đèn chiếu sáng sự cố và biển báo lối thoát hiểm chất lượng cao cho mọi tòa nhà, mọi tình huống.',
            features: [
              {
                icon: 'Shield',
                title: 'Chất lượng Đáng tin cậy',
                description: 'Được kiểm tra an toàn, bền bỉ.',
              },
              {
                icon: 'Tag',
                title: 'Giá cả Hợp lý',
                description: 'Giá trị tốt nhất mà không thỏa hiệp.',
              },
              {
                icon: 'Wrench',
                title: 'Dễ dàng Lắp đặt',
                description:
                  'Thiết kế thân thiện với người dùng giúp tiết kiệm thời gian & chi phí.',
              },
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
          {
            id: newPage.layout?.[1]?.id, // Ensure we update the same block ID
            blockType: 'exploreProducts',
            title: viData?.partners?.title || 'KHÁM PHÁ SẢN PHẨM APK',
            categories: categoriesData.map((cat, i) => ({
              id: (newPage.layout?.[1] as any)?.categories?.[i]?.id,
              image: cat.mediaId,
              title: cat.title, // Title is not localized in seed data
              description: cat.viDescription,
              link: cat.link,
              linkText: 'XEM THÊM',
            })),
          },
          {
            id: newPage.layout?.[2]?.id,
            blockType: 'technicalSupport',
            subtitle: 'HỖ TRỢ KỸ THUẬT MẠNH MẼ',
            title: 'CHÚNG TÔI KHÔNG CHỈ BÁN HÀNG. CHÚNG TÔI ĐỒNG HÀNH ĐẾN KHI HOẠT ĐỘNG TỐT.',
            description:
              'Các kỹ sư của chúng tôi luôn sẵn sàng hỗ trợ bạn với dịch vụ chuyên nghiệp và chuyên môn kỹ thuật cao.',
            features: [
              {
                featureText: 'Hỗ trợ lắp đặt',
                id: (newPage.layout?.[2] as any)?.features?.[0]?.id,
              },
              {
                featureText: 'Hướng dẫn bảo trì',
                id: (newPage.layout?.[2] as any)?.features?.[1]?.id,
              },
              { featureText: 'Tư vấn đi dây', id: (newPage.layout?.[2] as any)?.features?.[2]?.id },
              {
                featureText: 'Dịch vụ bảo hành',
                id: (newPage.layout?.[2] as any)?.features?.[3]?.id,
              },
              {
                featureText: 'Đào tạo sản phẩm',
                id: (newPage.layout?.[2] as any)?.features?.[4]?.id,
              },
              {
                featureText: 'Phản hồi nhanh',
                id: (newPage.layout?.[2] as any)?.features?.[5]?.id,
              },
            ],
            linkGroup: {
              text: 'LIÊN HỆ KỸ SƯ CỦA CHÚNG TÔI',
              url: '/contact',
            },
          },
          {
            blockType: 'statistics',
            stats: [
              { icon: 'building', value: '15+', label: 'NĂM KINH NGHIỆM' },
              { icon: 'users', value: '500+', label: 'DỰ ÁN HOÀN THÀNH' },
              { icon: 'handshake', value: '1000+', label: 'KHÁCH HÀNG HÀI LÒNG' },
              { icon: 'thumbs-up', value: '98%', label: 'SỰ HÀI LÒNG CỦA KHÁCH HÀNG' },
            ],
          },
          {
            id: newPage.layout?.[3]?.id,
            blockType: 'widelyUsed',
            title: 'SỬ DỤNG RỘNG RÃI TẠI',
            items: [
              {
                icon: 'Factory',
                label: 'Nhà máy',
                id: (newPage.layout?.[3] as any)?.items?.[0]?.id,
              },
              {
                icon: 'Building2',
                label: 'Văn phòng',
                id: (newPage.layout?.[3] as any)?.items?.[1]?.id,
              },
              {
                icon: 'School',
                label: 'Trường học',
                id: (newPage.layout?.[3] as any)?.items?.[2]?.id,
              },
              {
                icon: 'HeartPulse',
                label: 'Bệnh viện',
                id: (newPage.layout?.[3] as any)?.items?.[3]?.id,
              },
              {
                icon: 'ShoppingBag',
                label: 'Trung tâm mua sắm',
                id: (newPage.layout?.[3] as any)?.items?.[4]?.id,
              },
              { icon: 'Home', label: 'Căn hộ', id: (newPage.layout?.[3] as any)?.items?.[5]?.id },
            ],
          },
          {
            blockType: 'callToAction',
            title: 'Cần giải pháp chiếu sáng khẩn cấp đáng tin cậy?',
            subtitle: 'Đội ngũ của chúng tôi đã sẵn sàng hỗ trợ bạn.',
            buttonText: 'YÊU CẦU BÁO GIÁ',
            buttonLink: '/contact',
          },
        ],
      },
    })

    payload.logger.info('✅ Homepage successfully seeded with image and content!')
  } else {
    payload.logger.info('⏭️ Pages already exist. Skipping seed lifecycle.')
  }
}
