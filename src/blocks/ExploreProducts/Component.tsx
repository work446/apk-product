'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }
  }, [])

  // Throttled scroll/resize listener
  useEffect(() => {
    let ticking = false
    const handleScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll()
          ticking = false
        })
        ticking = true
      }
    }

    checkScroll() // Initial check
    window.addEventListener('resize', handleScrollOrResize, { passive: true })
    
    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScrollOrResize, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', handleScrollOrResize)
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScrollOrResize)
      }
    }
  }, [checkScroll, categories])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Helper to highlight the middle word of the title
  const renderHighlightedTitle = (text: string) => {
    if (!text) return null
    const words = text.split(' ')
    if (words.length >= 3) {
      const mid = Math.floor(words.length / 2)
      return (
        <>
          {words.slice(0, mid).join(' ')} <span className="text-primary">{words[mid]}</span>{' '}
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

  const count = categories?.length || 0
  const isDesktopCarousel = count > 4
  const isMobileCarousel = count > 6

  let containerClasses = 'flex gap-3 sm:gap-4 md:gap-6 justify-center '
  if (isMobileCarousel) {
    // Carousel on all screens (mobile and desktop)
    containerClasses +=
      'flex-nowrap !justify-start overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4'
  } else if (isDesktopCarousel) {
    // Carousel ONLY on desktop, grid wrap on mobile
    containerClasses +=
      'flex-wrap lg:flex-nowrap lg:!justify-start lg:overflow-x-auto lg:snap-x lg:snap-mandatory scrollbar-hide lg:pb-4'
  } else {
    // Grid on all screens
    containerClasses += 'flex-wrap'
  }

  return (
    <>
      <section className="w-full bg-gray-50/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">
              {title ? (
                renderHighlightedTitle(title)
              ) : (
                <>
                  EXPLORE <span className="text-primary">APK</span> PRODUCTS
                </>
              )}
            </h2>
            {/* Yellow Accent Line */}
            <div className="w-12 h-1 bg-[#fbbc04] mx-auto mt-4 rounded-full"></div>
          </m.div>

          {/* Products Container */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              hidden: { opacity: 0 },
            }}
            className="relative max-w-7xl mx-auto group/carousel"
          >
            <div
              ref={scrollRef}
              className={containerClasses}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => {
                  const imageUrl =
                    category.image?.imagekit?.url || category.image?.url || '/fallback-image.jpg'
                  return (
                    <m.div
                      key={index}
                      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                      className={`flex flex-col flex-none relative w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(25%-1.125rem)] ${
                        isMobileCarousel ? 'snap-start' : isDesktopCarousel ? 'lg:snap-start' : ''
                      }`}
                    >
                      <Link
                        href={category.link || '#'}
                        className="group flex flex-col h-full bg-white rounded-md border border-gray-100 overflow-hidden hover:border-primary/50 transition-all duration-300 relative"
                      >
                        {/* Top Red Accent Line on Hover */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>

                        {/* Image Container */}
                        <div className="relative w-full aspect-square flex items-center justify-center pt-5 sm:pt-6 group-hover:bg-gray-50/50 transition-colors border-b border-gray-50/50">
                          {/* Optional Badge */}
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
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                              />
                            )}
                          </div>
                        </div>

                        {/* Content Container */}
                        <div className="flex flex-col flex-1 items-start text-left px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
                          <h3 className="font-bold text-gray-900 text-[10px] sm:text-[12px] lg:text-[15px] uppercase tracking-wider group-hover:text-primary transition-colors line-clamp-2 mb-1 sm:mb-1.5">
                            {category.title}
                          </h3>
                          <p className="text-gray-500 text-[9px] sm:text-[11px] lg:text-[13px] leading-relaxed mb-2 sm:mb-3 line-clamp-3 flex-1">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-1 sm:gap-1.5 text-primary font-bold text-[9px] sm:text-[10px] lg:text-[12px] uppercase tracking-wider group-hover:text-red-700 transition-colors mt-auto">
                            {category.linkText || 'VIEW MORE'}
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </m.div>
                  )
                })}
            </div>

            {/* Carousel Navigation Arrows */}
            {(isMobileCarousel || isDesktopCarousel) && (
              <div
                className={`justify-center items-center gap-8 mt-8 ${
                  isMobileCarousel ? 'flex' : 'hidden lg:flex'
                }`}
              >
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                    canScrollLeft
                      ? 'bg-[#d81e28] hover:bg-red-700 text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                    canScrollRight
                      ? 'bg-[#d81e28] hover:bg-red-700 text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </m.div>
        </div>
      </section>
    </>
  )
}
