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
    .map((item: any) => ({
      ...(item.image || {}),
      mobileImage: item.mobileImage,
    }))
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
    <>
      <section className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden bg-gray-900">
        {/* Background Images Slider Wrapper — fills the aspect-video section at every screen size */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Desktop Image */}
                <Image
                  src={(img.imagekit?.url || img.url) as string}
                  alt={img.alt || `Hero Slide ${index + 1}`}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className={`object-cover object-[80%_center] lg:object-right w-full h-full transition-transform duration-10000ms ease-out ${
                    img.mobileImage ? 'hidden md:block' : ''
                  } ${index === currentSlide ? 'scale-100' : 'scale-95'}`}
                />

                {/* Mobile Image (rendered only if available) */}
                {img.mobileImage && (
                  <Image
                    src={(img.mobileImage.imagekit?.url || img.mobileImage.url) as string}
                    alt={img.mobileImage.alt || `Hero Mobile Slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className={`object-cover object-center w-full h-full transition-transform duration-10000ms ease-out md:hidden ${
                      index === currentSlide ? 'scale-100' : 'scale-95'
                    }`}
                  />
                )}
              </div>
            ))
          ) : (
            /* Fallback Background */
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
              <Image
                src="/desktop-background.png"
                alt="Fallback Background"
                fill
                sizes="100vw"
                priority
                className="object-cover object-[80%_center] lg:object-right w-full h-full transition-transform duration-10000ms hover:scale-105"
              />
            </div>
          )}

          {/* Misty gradient overlay for text readability (only needed once content overlays the image, at lg+) */}
          <div className="hidden lg:block absolute inset-0 z-[5] bg-gradient-to-r from-black/80 via-black/40 via-30% to-transparent to-50% pointer-events-none" />

          {/* Slider Navigation Arrows & Dots */}
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

              {/* Dots Navigation */}
              <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
        </div>

        {/* Content Wrapper — stacked below the image on mobile/tablet, overlaid on top at lg+ */}
        <div className="relative h-full lg:absolute lg:inset-0 z-10 w-full flex flex-col justify-start md:justify-center px-4 pt-16 pb-4 sm:pt-20 sm:pb-8 md:py-4 lg:py-0">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center gap-6 lg:gap-20">
              {/* Left Content Area */}
              <div className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-none lg:w-1/2 flex flex-col items-center text-center md:items-start md:text-left">
                <span className="text-primary font-bold uppercase tracking-wider text-[9px] sm:text-[10px] lg:text-xs xl:text-sm mb-2 sm:mb-2 lg:mb-3 xl:mb-4">
                  {tagline}
                </span>

                <h1 className="[&:lang(en)]:text-xl [&:lang(en)]:sm:text-2xl [&:lang(en)]:lg:text-4xl [&:lang(en)]:xl:text-5xl [&:lang(vi)]:text-lg [&:lang(vi)]:sm:text-xl [&:lang(vi)]:lg:text-[2.25rem] [&:lang(vi)]:xl:text-[2.65rem] font-extrabold leading-tight mb-2 sm:mb-3 lg:mb-4 xl:mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
                  {headlineBlack} <br className="hidden lg:block" />
                  <span className="text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                    {headlineRed}
                  </span>
                </h1>

                <p className="text-[10px] sm:text-xs lg:text-base xl:text-lg text-gray-100 mb-4 sm:mb-4 lg:mb-6 xl:mb-8 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                  {subtitle}
                </p>

                {/* Features List */}
                {features && features.length > 0 && (
                  <div className="grid grid-cols-3 min-[426px]:grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-4 xl:gap-6 mb-4 sm:mb-5 lg:mb-8 xl:mb-10 w-full lg:max-w-none">
                    {features.map((feature: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-stretch justify-center md:justify-start gap-2 lg:gap-3 xl:gap-4"
                      >
                        {/* Icon */}
                        <div className="flex items-start mt-0.5 sm:mt-1 shrink-0">
                          <div className="p-1.5 sm:p-2 lg:p-2 xl:p-2.5 bg-white/20 rounded-full text-white backdrop-blur-md shadow-sm">
                            <DynamicIcon
                              name={feature.icon}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                            />
                          </div>
                        </div>

                        {/* Vertical Divider (hidden on small mobile for cleaner look) */}
                        <div className="hidden sm:block w-[1px] bg-white/30 shrink-0 my-0.5 lg:my-1" />

                        {/* Text Content */}
                        <div className="flex flex-col py-0.5 lg:py-1 text-left">
                          <h3 className="font-semibold text-white text-[9px] sm:text-[10px] lg:text-[11px] xl:text-sm drop-shadow-md mb-0 lg:mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs text-gray-200 drop-shadow-md font-medium leading-tight lg:leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions / Buttons */}
                {actions && actions.length > 0 && (
                  <div className="hidden md:flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-3 xl:gap-4 mb-2 sm:mb-4 lg:mb-8 xl:mb-12">
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
                        extraClass = 'text-gray-300 hover:text-white hover:bg-white/10'
                      }

                      return (
                        <Button
                          key={index}
                          variant={variant}
                          className={`h-7 px-3 sm:h-8 sm:px-4 lg:h-11 lg:px-6 xl:h-14 xl:px-8 text-[9px] sm:text-[10px] lg:text-xs xl:text-base font-bold uppercase tracking-wide transition-all ${extraClass}`}
                          render={<Link href={action.url} />}
                          {...({ nativeButton: false } as any)}
                        >
                          {action.style === 'ghost' && (
                            <LucideIcons.PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 mr-1 sm:mr-2" />
                          )}
                          {action.label}
                          {action.style !== 'ghost' && (
                            <LucideIcons.ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 sm:ml-2" />
                          )}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Trust Banner */}
      {trustBanner && trustBanner.length > 0 && (
        <div className="w-full bg-white border-t border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 py-3 sm:py-4 lg:py-3 xl:py-5 flex flex-wrap lg:flex-nowrap justify-between items-center gap-3 sm:gap-4 lg:gap-2 xl:gap-6">
            {trustBanner.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 lg:gap-1.5 xl:gap-3">
                <div className="text-primary shrink-0">
                  <DynamicIcon
                    name={item.icon}
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6"
                  />
                </div>
                <span className="font-bold text-gray-900 text-[9px] sm:text-[10px] lg:text-[10px] xl:text-sm uppercase tracking-wide leading-tight whitespace-nowrap">
                  {item.text}
                </span>
                {/* Separator Line (except for the last item) */}
                {index < trustBanner.length - 1 && (
                  <div className="hidden lg:block w-[1px] h-6 xl:h-8 bg-gray-200 ml-2 xl:ml-6 shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
