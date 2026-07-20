'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAutoRotate } from '@/hooks/useAutoRotate'
import { ArrowRight, Check } from 'lucide-react'
import { m } from 'framer-motion'

type FeatureType = {
  featureText: string
  id?: string
}

type LinkGroupType = {
  text: string
  url: string
}

export type TechnicalSupportType = {
  blockType: 'technicalSupport'
  subtitle: string
  title: string
  description?: string
  features: FeatureType[]
  linkGroup?: LinkGroupType
  sliderImages?: {
    image: {
      url?: string
      imagekit?: {
        url?: string
      }
      alt?: string
    }
    mobileImage?: {
      url?: string
      imagekit?: {
        url?: string
      }
      alt?: string
    }
  }[]
}

export const TechnicalSupportBlock: React.FC<TechnicalSupportType> = ({
  subtitle,
  title,
  description,
  features,
  linkGroup,
  sliderImages,
}) => {
  const slides = sliderImages?.filter((slide) => slide.image) || []
  const [currentSlide] = useAutoRotate(slides.length, 6000)

  return (
    <>
      <section className="w-full bg-[#f9fafb] md:bg-white relative overflow-hidden flex flex-col md:flex-row md:items-stretch border-t border-gray-200">
        {/* 
        DESKTOP BACKGROUND IMAGE (Absolute on md+) 
        Hidden entirely on mobile in favor of stacked inline image
      */}
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white from-[45%] via-white/80 via-[75%] to-transparent z-10 w-full md:w-[60%] lg:w-[55%]" />
          {slides.length > 0 ? (
            slides.map((slide, index) => {
              const img = slide.image
              return (
                <div
                  key={index}
                  className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={(img.imagekit?.url || img.url) as string}
                    alt={img.alt || 'Technical Support'}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className={`object-cover w-full h-full transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              )
            })
          ) : (
            <Image
              src="/fallback-image.jpg"
              alt="Technical Support"
              fill
              className="object-cover object-right z-0"
            />
          )}
        </div>

        <div className="container mx-auto relative z-20 flex flex-col md:block">
          {/* TEXT CONTENT (Order 1 on mobile) */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              hidden: { opacity: 0 },
            }}
            className="w-full md:w-[70%] lg:w-[60%] order-1 px-4 sm:px-6 lg:px-8 pt-10 pb-4 md:py-16 md:py-24"
          >
            {/* Subtitle */}
            <m.h4
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              className="text-primary text-[11px] sm:text-[13px] font-bold uppercase tracking-widest mb-3"
            >
              {subtitle}
            </m.h4>

            {/* Title */}
            <m.h2
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              className="text-[26px] sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 leading-[1.1] md:leading-[1.2] mb-5 tracking-wide uppercase"
            >
              {title}
            </m.h2>

            {/* Description (from CMS) */}
            {description && (
              <m.p
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed mb-8 max-w-[90%]"
              >
                {description}
              </m.p>
            )}

            {/* Features Grid */}
            {features && features.length > 0 && (
              <m.div
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="grid grid-cols-2 gap-y-4 gap-x-3 sm:gap-x-4 mb-4 md:mb-10"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-[#d81e28] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={4} />
                    </div>
                    <span className="text-gray-800 text-[11px] sm:text-sm font-bold leading-tight">
                      {feature.featureText}
                    </span>
                  </div>
                ))}
              </m.div>
            )}

            {/* DESKTOP Contact Button */}
            {linkGroup && (
              <m.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <Link
                  href={linkGroup.url || '/contact'}
                  className="hidden md:inline-flex items-center gap-2 bg-[#d81e28] hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors"
                >
                  {linkGroup.text || 'CONTACT OUR ENGINEERS'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </m.div>
            )}
          </m.div>

          {/* MOBILE IMAGE (Order 2 on mobile, hidden on md+) */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="w-full px-4 sm:px-6 md:hidden order-2 mb-2"
          >
            <div className="relative w-full h-[220px] sm:h-[300px] rounded-sm overflow-hidden">
              {slides.length > 0 ? (
                (() => {
                  const currentSlideData = slides[currentSlide]
                  const mobileImg = currentSlideData.mobileImage || currentSlideData.image
                  return (
                    <Image
                      src={(mobileImg.imagekit?.url || mobileImg.url) as string}
                      alt={mobileImg.alt || 'Technical Support'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  )
                })()
              ) : (
                <Image
                  src="/fallback-image.jpg"
                  alt="Technical Support"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              )}
            </div>
          </m.div>

          {/* MOBILE Contact Button (Order 3 on mobile, hidden on md+) */}
          {linkGroup && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="w-full order-3 md:hidden px-4 sm:px-6 pb-8 pt-2 bg-[#f9fafb] flex justify-center"
            >
              <Link
                href={linkGroup.url || '/contact'}
                className="w-full flex items-center justify-center gap-2 bg-[#d81e28] active:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-sm"
              >
                {linkGroup.text || 'CONTACT OUR ENGINEERS'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </m.div>
          )}
        </div>
      </section>
    </>
  )
}
