import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await props.params
  const searchParams = await props.searchParams
  const locale = rawLocale as 'en' | 'vi'
  const categoryFilter = searchParams.category as string

  if (categoryFilter && categoryFilter !== 'all') {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { docs } = await payload.find({
      collection: 'categories',
      where: {
        slug: { equals: categoryFilter },
      },
      locale,
      limit: 1,
    })
    if (docs[0]) {
      return generateMeta({ doc: docs[0] })
    }
  }

  return {
    title: locale === 'vi' ? 'Sản Phẩm - APK Product' : 'Products - APK Product',
    description:
      locale === 'vi'
        ? 'Khám phá các thiết bị phòng cháy chữa cháy chất lượng cao của chúng tôi.'
        : 'Explore our range of high-quality fire safety equipment.',
  }
}

import { Suspense } from 'react'
import { ProductsSkeleton } from './components/ProductsSkeleton'
import { ProductsContent } from './components/ProductsContent'

export default async function ProductsPage(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const locale = params.locale as 'en' | 'vi'

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-[#f9fafb]">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsContent searchParams={searchParams} locale={locale} />
        </Suspense>
      </div>
    </SidebarProvider>
  )
}
