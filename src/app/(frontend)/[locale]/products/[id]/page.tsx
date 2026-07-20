import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProductGallery } from '../components/ProductGallery'
import { ProductInfo } from '../components/ProductInfo'
import { ProductHighlights } from '../components/ProductHighlights'
import { ProductSpecifications } from '../components/ProductSpecifications'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata(props: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await props.params
  const payload = await getPayload({ config: configPromise })
  
  try {
    const product = await payload.findByID({
      collection: 'products',
      id: id,
      locale: locale as any,
    })
    return generateMeta({ doc: product })
  } catch (error) {
    return generateMeta({ doc: null })
  }
}
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 100,
  })

  return products.docs.map((doc) => ({
    id: String(doc.id),
  }))
}

export default async function ProductPage(props: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await props.params

  const payload = await getPayload({ config: configPromise })
  
  const { isEnabled: draft } = await draftMode().catch(() => ({ isEnabled: true }))
  
  let product: any
  try {
    product = await payload.findByID({
      collection: 'products',
      id: id,
      locale: locale as any,
      draft,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    notFound()
  }

  if (!product) {
    notFound()
  }

  const t = {
    back: locale === 'vi' ? 'Quay lại sản phẩm' : 'Back to Products',
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb / Back Button */}
        <Link 
          href={`/${locale}/products`}
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#d81e28] transition-colors mb-6 md:mb-8 uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4 mr-1" strokeWidth={3} />
          {t.back}
        </Link>

        {/* Main Content Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Gallery & Highlights */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <ProductGallery images={product.images || []} productTitle={product.productTitle} />
            <ProductHighlights features={product.cardFeatures || []} />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="w-full lg:w-[40%]">
            <ProductInfo product={product} locale={locale} />
          </div>

        </div>

        {/* Technical Specifications Card */}
        <ProductSpecifications specifications={product.specifications || []} locale={locale} />

      </div>
    </div>
  )
}
