'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export const ProductGallery = ({
  images,
  productTitle,
}: {
  images: any[]
  productTitle: string
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Ensure we have at least one valid image
  const validImages = images?.filter((img) => img?.image?.url) || []
  
  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-xl border border-gray-100">
        <p className="text-gray-400">No Image</p>
      </div>
    )
  }

  // Get optimized ImageKit URL with trimming and padding
  const getOptimizedUrl = (url: string, size: number) => {
    if (url.includes('ik.imagekit.io') && !url.includes('tr=')) {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}tr=w-${size},h-${size},cm-pad_resize,bg-FFFFFF`
    }
    return url
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
      {/* Thumbnails (Horizontal on Mobile, Vertical on Desktop) */}
      {validImages.length > 1 && (
        <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 shrink-0 hide-scrollbar pb-2 md:pb-0">
          {validImages.map((img, i) => {
            const thumbUrl = getOptimizedUrl(img.image?.imagekit?.url || img.image?.url, 150)
            const isActive = i === activeIndex
            
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white
                  ${isActive ? 'border-primary scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}
                `}
              >
                <Image
                  src={thumbUrl}
                  alt={img.image?.alt || `${productTitle} - thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1 mix-blend-multiply"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 relative aspect-square sm:aspect-[4/3] md:aspect-square bg-white rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={getOptimizedUrl(
                validImages[activeIndex].image?.imagekit?.url || validImages[activeIndex].image?.url,
                800
              )}
              alt={validImages[activeIndex].image?.alt || productTitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
