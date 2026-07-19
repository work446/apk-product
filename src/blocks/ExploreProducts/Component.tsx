import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type CategoryType = {
  image: {
    url?: string
    imagekit?: {
      url?: string
    }
    alt?: string
  }
  badge?: string
  title: string
  description: string
  link: string
  linkText: string
}

export type ExploreProductsType = {
  blockType: 'exploreProducts'
  title: string
  categories: CategoryType[]
}

export const ExploreProductsBlock: React.FC<ExploreProductsType> = ({ title, categories }) => {
  // Helper to highlight the middle word of the title
  const renderHighlightedTitle = (text: string) => {
    if (!text) return null
    const words = text.split(' ')
    if (words.length >= 3) {
      const mid = Math.floor(words.length / 2)
      return (
        <>
          {words.slice(0, mid).join(' ')}{' '}
          <span className="text-primary">{words[mid]}</span>{' '}
          {words.slice(mid + 1).join(' ')}
        </>
      )
    } else if (words.length === 2) {
      return (
        <>
          {words[0]} <span className="text-primary">{words[1]}</span>
        </>
      )
    }
    return text
  }

  return (
    <section className="w-full bg-gray-50/50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">
            {title ? renderHighlightedTitle(title) : (
              <>
                EXPLORE <span className="text-primary">APK</span> PRODUCTS
              </>
            )}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => {
              const imageUrl =
                category.image?.imagekit?.url || category.image?.url || '/fallback-image.jpg'
              return (
                <Link
                  key={index}
                  href={category.link || '#'}
                  className="group flex flex-col bg-white rounded-md border border-gray-100 overflow-hidden hover:border-primary/50 transition-all duration-300 w-full relative"
                >
                  {/* Top Red Accent Line on Hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>

                  {/* Image Container */}
                  <div className="relative w-full aspect-square flex items-center justify-center pt-5 sm:pt-6 group-hover:bg-gray-50/50 transition-colors border-b border-gray-50/50">
                    {/* Optional Badge if still wanted */}
                    {category.badge && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 bg-[#1a202c] text-white text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest rounded-[2px] whitespace-nowrap shadow-sm">
                        {category.badge}
                      </div>
                    )}
                    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={category.image?.alt || category.title}
                          fill
                          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 items-start text-left px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
                    <h3 className="font-bold text-gray-900 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider group-hover:text-primary transition-colors line-clamp-2 mb-1 sm:mb-1.5">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-[8px] sm:text-[9px] lg:text-[10px] leading-relaxed mb-2 sm:mb-3 line-clamp-3 flex-1">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-primary font-bold text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider group-hover:text-red-700 transition-colors mt-auto">
                      {category.linkText || 'VIEW MORE'}
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </section>
  )
}

