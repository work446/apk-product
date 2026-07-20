import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProductSidebar } from './components/ProductSidebar'
import { ProductCard } from './components/ProductCard'
import { CategoryHeader } from './components/CategoryHeader'
import { notFound } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { ProductSearchAndFilter } from './components/ProductSearchAndFilter'
import { ProductGridContainer } from './components/ProductGridAnimation'

export default async function ProductsPage(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const locale = params.locale as 'en' | 'vi'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch categories
  const categoriesRes = await payload.find({
    collection: 'categories',
    locale,
    sort: 'order',
    limit: 100,
  })
  const categories = categoriesRes.docs

  // Filter products based on searchParams
  const categoryFilter = searchParams.category as string
  const companyFilter = searchParams.company as string
  const searchFilter = searchParams.search as string

  const where: any = { and: [] }

  if (companyFilter && companyFilter !== 'all') {
    where.and.push({ company: { equals: companyFilter } })
  }

  let matchingCat: any = null

  if (categoryFilter && categoryFilter !== 'all') {
    matchingCat = categories.find((c) => c.slug === categoryFilter)
    if (matchingCat) {
      where.and.push({ category: { equals: matchingCat.id } })
    }
  }

  if (searchFilter) {
    where.and.push({
      or: [
        { productTitle: { like: searchFilter } },
        { productName: { like: searchFilter } },
      ]
    })
  }

  // Fetch products
  const productsRes = await payload.find({
    collection: 'products',
    locale,
    where: where.and.length > 0 ? where : undefined,
    sort: 'order',
    limit: 100,
  })

  const products = productsRes.docs

  const t = {
    title: locale === 'vi' ? 'Sản Phẩm Của Chúng Tôi' : 'Our Products',
    subtitle:
      locale === 'vi'
        ? 'Khám phá các thiết bị phòng cháy chữa cháy chất lượng cao của chúng tôi.'
        : 'Explore our range of high-quality fire safety equipment.',
    noProducts: locale === 'vi' ? 'Không tìm thấy sản phẩm nào phù hợp.' : 'No products found.',
  }

  let catTitle = t.title
  let catDesc = t.subtitle

  if (matchingCat) {
    catTitle = matchingCat.title || catTitle
    catDesc = matchingCat.description || catDesc
  }

  const hasBlocks = matchingCat?.layout && Array.isArray(matchingCat.layout) && matchingCat.layout.length > 0

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-[#f9fafb]">
        <ProductSidebar categories={categories as any} locale={locale} />
        
        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 ease-in-out">
          
          {hasBlocks ? (
            <RenderBlocks blocks={matchingCat.layout} />
          ) : (
            <CategoryHeader title={catTitle} description={catDesc} locale={locale} />
          )}
          
          <div className="px-4 md:px-6 lg:px-8 w-full pb-12 pt-2">
            <ProductSearchAndFilter locale={locale} />
            
            {products.length > 0 ? (
              <ProductGridContainer 
                animationKey={categoryFilter + companyFilter + searchFilter} 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} locale={locale} index={index} />
                ))}
              </ProductGridContainer>
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-100">
                <p className="text-gray-500 font-medium">{t.noProducts}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
