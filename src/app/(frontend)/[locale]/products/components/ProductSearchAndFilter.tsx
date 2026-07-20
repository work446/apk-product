'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'
import { SlidersHorizontal, Search, X } from 'lucide-react'

export const ProductSearchAndFilter = ({ locale }: { locale: string }) => {
  const { toggleSidebar } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      const currentSearch = params.get('search') || ''
      
      // Prevent redundant navigation if the search term hasn't actually changed
      if (searchTerm === currentSearch) return

      if (searchTerm) {
        params.set('search', searchTerm)
      } else {
        params.delete('search')
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, pathname, router, searchParams])

  const t = {
    searchPlaceholder: locale === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...',
  }

  return (
    <div className="flex items-center justify-start gap-2 w-full mb-6 lg:hidden">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="lg:hidden flex items-center justify-center bg-white p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:text-[#d81e28] hover:bg-gray-50 active:scale-95 transition-all shrink-0"
        aria-label="Filter"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  )
}
