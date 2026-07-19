'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { useAutoRotate } from '@/hooks/useAutoRotate'

export const HeroSlider = ({ sliderImages }: { sliderImages: any }) => {
  const images = (sliderImages || [])
    .map((item: any) => ({
      ...(item.image || {}),
      mobileImage: item.mobileImage,
    }))
    .filter((img: any) => img?.imagekit?.url || img?.url)

  const [currentSlide, setCurrentSlide] = useAutoRotate(images.length, 4500)
  const [isLoaded, setIsLoaded] = useState(false) // Helps with initial polish

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            {' '}
            {/* Changed to 'wait' for cleaner crossfade */}
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                transition: { duration: 0.25, ease: 'easeIn' },
              }}
              transition={{
                duration: 0.45, // Fast but smooth entrance
                ease: [0.23, 1, 0.32, 1], // Very nice "expo-out" feel
              }}
              className="absolute inset-0 z-0 overflow-hidden"
              onAnimationComplete={() => setIsLoaded(true)}
            >
              {/* Desktop Image */}
              <Image
                src={(images[currentSlide].imagekit?.url || images[currentSlide].url) as string}
                alt={images[currentSlide].alt || `Hero Slide ${currentSlide + 1}`}
                fill
                sizes="(min-width: 1536px) 1536px, 100vw"
                priority={currentSlide === 0}
                className={`object-cover object-[80%_center] lg:object-right w-full h-full transition-transform duration-700 ${
                  images[currentSlide].mobileImage ? 'max-[520px]:hidden' : ''
                }`}
              />

              {/* Mobile Image */}
              {images[currentSlide].mobileImage && (
                <Image
                  sizes="(min-width: 1536px) 1536px, 100vw"
                  src={
                    (images[currentSlide].mobileImage.imagekit?.url ||
                      images[currentSlide].mobileImage.url) as string
                  }
                  alt={
                    images[currentSlide].mobileImage.alt || `Hero Mobile Slide ${currentSlide + 1}`
                  }
                  fill
                  priority={currentSlide === 0}
                  className="object-cover object-center w-full h-full hidden max-[520px]:block"
                />
              )}
            </m.div>
          </AnimatePresence>
        ) : (
          /* Fallback */
          <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
            <Image
              src="/desktop-background.png"
              alt="Fallback Background"
              fill
              sizes="100vw"
              priority
              className="object-cover object-[80%_center] lg:object-right w-full h-full"
            />
          </div>
        )}

        {/* Gradients */}
        <div className="block min-[521px]:hidden absolute inset-0 z-[5] bg-gradient-to-b from-white/95 via-white/70 via-[15%] to-white/0 to-[35%] pointer-events-none" />
        <div className="hidden min-[521px]:block absolute inset-0 z-[5] bg-gradient-to-r from-white/95 via-white/70 via-[15%] to-white/0 to-[75%] md:to-[50%] pointer-events-none" />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all hidden lg:block"
              aria-label="Previous Slide"
            >
              <LucideIcons.ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all hidden lg:block"
              aria-label="Next Slide"
            >
              <LucideIcons.ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all shadow-md ${
                    currentSlide === idx ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
