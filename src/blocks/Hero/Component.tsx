'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'

// Helper to dynamically render Lucide icons
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}

export const HeroBlock: React.FC<any> = ({
  tagline,
  headlineBlack,
  headlineRed,
  subtitle,
  features,
  actions,
  trustBanner,
  sliderImages,
}) => {
  const images = (sliderImages || [])
    .map((item: any) => item.image)
    .filter((img: any) => img?.imagekit?.url || img?.url)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative sm:mt-0 w-full max-w-full h-[80vh] min-h-[480px] sm:h-[85vh] sm:min-h-[580px] md:h-[80vh] md:min-h-[600px] lg:h-screen lg:min-h-[750px] overflow-hidden bg-gray-50 flex flex-col justify-center">
      {/* Background Images Slider */}
      {images.length > 0 ? (
        images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={(img.imagekit?.url || img.url) as string}
              alt={img.alt || `Hero Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={index === 0}
              className={`object-cover object-center w-full h-full transition-transform duration-10000ms ease-out ${
                index === currentSlide ? 'scale-100' : 'scale-95'
              }`}
            />
          </div>
        ))
      ) : (
        /* Fallback Background */
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <Image
            src="/desktop-background.png"
            alt="Fallback Background"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
            className="object-cover object-center w-full h-full transition-transform duration-10000ms hover:scale-105"
          />
        </div>
      )}

      {/* Misty gradient overlay for text readability (dark on left, transparent on right) */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/70 via-black/30 via-30% to-transparent to-50% pointer-events-none" />

      {/* Slider Navigation Arrows & Dots */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all hidden md:block"
            aria-label="Previous Slide"
          >
            <LucideIcons.ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all hidden md:block"
            aria-label="Next Slide"
          >
            <LucideIcons.ChevronRight className="w-8 h-8" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {images.map((_, idx) => (
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

      <div className="container relative z-10 mx-auto px-4 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content Area */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4">
              {tagline}
            </span>

            <h1 className="[&:lang(en)]:text-5xl [&:lang(en)]:md:text-6xl [&:lang(en)]:xl:text-[3rem] [&:lang(vi)]:text-[2.65rem] [&:lang(vi)]:md:text-[3rem] [&:lang(vi)]:xl:text-[3rem] font-extrabold leading-tight mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
              {headlineBlack} <br className="hidden md:block" />
              <span className="text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                {headlineRed}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
              {subtitle}
            </p>

            {/* Features List */}
            {features && features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {features.map((feature: any, index: number) => (
                  <div key={index} className="flex items-stretch gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="flex items-start mt-1 shrink-0">
                      <div className="p-2.5 bg-white/20 rounded-full text-white backdrop-blur-md shadow-sm">
                        <DynamicIcon name={feature.icon} className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-[1px] bg-white/30 shrink-0 my-1" />

                    {/* Text Content */}
                    <div className="flex flex-col py-1">
                      <h3 className="font-semibold text-white text-sm drop-shadow-md mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-200 drop-shadow-md font-medium leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions / Buttons */}
            {actions && actions.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-12">
                {actions.map((action: any, index: number) => {
                  let variant: any = 'default'
                  let extraClass = ''

                  if (action.style === 'primary') {
                    variant = 'default'
                    extraClass =
                      'bg-primary hover:bg-primary hover:brightness-110 text-primary-foreground'
                  } else if (action.style === 'secondary') {
                    variant = 'outline'
                    extraClass = 'border-primary text-primary hover:bg-primary/5'
                  } else if (action.style === 'ghost') {
                    variant = 'ghost'
                    extraClass = 'text-gray-700 hover:bg-gray-100'
                  }

                  return (
                    <Button
                      key={index}
                      variant={variant}
                      className={`h-12 px-6 sm:h-14 sm:px-8 text-sm sm:text-base font-bold uppercase tracking-wide transition-all ${extraClass}`}
                      render={<Link href={action.url} />}
                      {...({ nativeButton: false } as any)}
                    >
                      {action.style === 'ghost' && (
                        <LucideIcons.PlayCircle className="w-5 h-5 mr-2" />
                      )}
                      {action.label}
                      {action.style !== 'ghost' && (
                        <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Trust Banner (Docked to the edge) */}
      {trustBanner && trustBanner.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full z-20 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 md:py-5 flex flex-wrap justify-between items-center gap-4 lg:gap-6">
            {trustBanner.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-primary shrink-0">
                  <DynamicIcon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="font-bold text-gray-900 text-xs md:text-sm uppercase tracking-wide leading-tight">
                  {item.text}
                </span>
                {/* Separator Line (except for the last item) */}
                {index < trustBanner.length - 1 && (
                  <div className="hidden lg:block w-[1px] h-8 bg-gray-200 ml-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
