import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const TopBanner = async ({ locale = 'en' }: { locale?: 'en' | 'vi' }) => {
  const payload = await getPayload({ config })

  const banners = await payload.find({
    collection: 'top-banners',
    where: { isActive: { equals: true } },
    limit: 1,
    locale,
  })

  if (banners.docs.length === 0) return null

  const activeBanner = banners.docs[0]

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-primary text-primary-foreground py-2 px-2 sm:px-4 text-[11px] sm:text-xs md:text-sm font-medium min-h-10 md:min-h-9 flex flex-col justify-center">
      <div className="container mx-auto flex flex-row flex-nowrap justify-between items-center gap-1 md:gap-2 w-full">
        {/* Left Info (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {activeBanner.leftIcon &&
            typeof activeBanner.leftIcon === 'object' &&
            (activeBanner.leftIcon.imagekit?.url || activeBanner.leftIcon.url) && (
              <Image
                src={(activeBanner.leftIcon.imagekit?.url || activeBanner.leftIcon.url) as string}
                alt={activeBanner.leftIcon.alt || 'Left Icon'}
                width={activeBanner.leftIcon.width || 24}
                height={activeBanner.leftIcon.height || 24}
                className="w-5 h-5 object-contain"
              />
            )}
          {activeBanner.leftText && <span>{activeBanner.leftText}</span>}
        </div>
        
        {/* Center Text */}
        <div className="flex-1 text-left sm:text-center whitespace-nowrap overflow-hidden text-ellipsis px-1 md:px-0 tracking-wide uppercase font-bold text-[11px] sm:text-xs md:text-sm">
          {activeBanner.centerText}
        </div>

        {/* Right Info (Hotline) */}
        <div className="flex items-center gap-1 sm:gap-2 font-bold shrink-0 text-[11px] sm:text-xs md:text-sm">
          {activeBanner.rightIcon &&
            typeof activeBanner.rightIcon === 'object' &&
            (activeBanner.rightIcon.imagekit?.url || activeBanner.rightIcon.url) && (
              <Image
                src={(activeBanner.rightIcon.imagekit?.url || activeBanner.rightIcon.url) as string}
                alt={activeBanner.rightIcon.alt || 'Right Icon'}
                width={activeBanner.rightIcon.width || 24}
                height={activeBanner.rightIcon.height || 24}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            )}
          <span>Hotline: {activeBanner.phoneNumber}</span>
        </div>
      </div>
    </div>
  )
}
