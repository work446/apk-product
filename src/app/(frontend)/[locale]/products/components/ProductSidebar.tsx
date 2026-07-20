'use client'

import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { 
  Siren, 
  DoorOpen, 
  Droplets,
  Wrench,
  Lightbulb,
  FileText,
  PlayCircle,
  Headset,
  ShieldCheck,
  Flame,
  Menu
} from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"

type Category = {
  id: string
  title: string
  slug: string
}

const getIconForCategory = (slug: string) => {
  const s = slug.toLowerCase()
  if (s.includes('emergency-light') || s.includes('den-chieu-sang')) return <Siren className="w-5 h-5" />
  if (s.includes('exit') || s.includes('thoat-hiem')) return <DoorOpen className="w-5 h-5" />
  if (s.includes('sprinkler') || s.includes('phun')) return <Droplets className="w-5 h-5" />
  if (s.includes('valve') || s.includes('van') || s.includes('hose')) return <Wrench className="w-5 h-5" />
  if (s.includes('lighting')) return <Lightbulb className="w-5 h-5" />
  return <ShieldCheck className="w-5 h-5" />
}

export const ProductSidebar = ({ categories, locale }: { categories: Category[], locale: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setOpenMobile, isMobile } = useSidebar()

  const currentCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/${locale}/products?${params.toString()}`, { scroll: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const t = {
    products: locale === 'vi' ? 'SẢN PHẨM' : 'PRODUCTS',
    quickLinks: locale === 'vi' ? 'LIÊN KẾT NHANH' : 'QUICK LINKS',
    catalogDownload: locale === 'vi' ? 'Tải Catalog' : 'Catalog Download',
    productVideos: locale === 'vi' ? 'Video Sản Phẩm' : 'Product Videos',
    needHelp: locale === 'vi' ? 'Cần giúp chọn sản phẩm đúng?' : 'Need help choosing the right product?',
    engineersReady: locale === 'vi' ? 'Các kỹ sư của chúng tôi luôn sẵn sàng giúp bạn.' : 'Our engineers are ready to help you.',
    contactEngineer: locale === 'vi' ? 'LIÊN HỆ KỸ SƯ' : 'CONTACT OUR ENGINEER',
    allProducts: locale === 'vi' ? 'Tất cả sản phẩm' : 'All Products',
  }

  return (
    <>
    <Sidebar className="sticky top-[100px] h-[calc(100vh_-_100px)] z-20 overflow-y-auto bg-white border-r border-gray-100" variant="sidebar">
      <SidebarContent className="bg-white">
        
        {/* PRODUCTS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[13px] font-bold text-gray-600 uppercase tracking-wider mb-2">
            {t.products}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentCategory === 'all'}
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full py-5 rounded-md transition-all duration-200 cursor-pointer ${
                    currentCategory === 'all' 
                      ? 'bg-red-50 text-[#d81e28] font-bold hover:bg-red-50 hover:text-[#d81e28]' 
                      : 'text-gray-600 font-medium'
                  }`}
                >
                  <Flame className="w-5 h-5 mr-2 opacity-80" />
                  <span>{t.allProducts}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {categories.map((cat) => {
                const isActive = currentCategory === cat.slug
                return (
                  <SidebarMenuItem key={cat.id}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full py-5 rounded-md transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-red-50 text-[#d81e28] font-bold hover:bg-red-50 hover:text-[#d81e28]' 
                          : 'text-gray-600 font-medium'
                      }`}
                    >
                      <span className={`${isActive ? 'text-[#d81e28]' : 'text-gray-500'} mr-2`}>
                        {getIconForCategory(cat.slug)}
                      </span>
                      <span>{cat.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* QUICK LINKS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[13px] font-bold text-gray-600 uppercase tracking-wider mb-2 mt-4">
            {t.quickLinks}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href={`/${locale}/catalog`} />} className="w-full py-5 rounded-md text-gray-600 font-medium cursor-pointer">
                  <FileText className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{t.catalogDownload}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href={`/${locale}/videos`} />} className="w-full py-5 rounded-md text-gray-600 font-medium cursor-pointer">
                  <PlayCircle className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{t.productVideos}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white p-4">
        {/* CONTACT BOX */}
        <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Headset className="w-8 h-8 text-[#d81e28]" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2 leading-tight">
            {t.needHelp}
          </h4>
          <p className="text-sm text-gray-500 mb-6">
            {t.engineersReady}
          </p>
          <Link 
            href={`/${locale}/contact`} 
            className="w-full bg-[#d81e28] hover:bg-red-700 text-white text-xs font-bold py-3 px-4 rounded-lg uppercase tracking-wide transition-colors"
          >
            {t.contactEngineer}
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
    </>
  )
}
