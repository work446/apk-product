import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const TopBanner = async ({ locale = 'en' }: { locale?: 'en' | 'vi' }) => {
  const payload = await getPayload({ config })

  // Fetch the active banner
  const banners = await payload.find({
    collection: 'top-banners',
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 1,
    locale,
  })

  // If no active banner is found, don't render anything
  if (banners.docs.length === 0) return null

  const activeBanner = banners.docs[0]

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-primary text-primary-foreground py-2 px-4 text-xs md:text-sm font-medium h-[64px] md:h-auto flex flex-col justify-center">
      <div className="container mx-auto flex flex-row justify-between items-center gap-2 md:gap-0">
        <div className="hidden md:flex items-center gap-2">
          {activeBanner.leftIcon && typeof activeBanner.leftIcon === 'object' && (activeBanner.leftIcon.imagekit?.url || activeBanner.leftIcon.url) && (
            <Image src={(activeBanner.leftIcon.imagekit?.url || activeBanner.leftIcon.url) as string} alt={activeBanner.leftIcon.alt || 'Left Icon'} width={activeBanner.leftIcon.width || 24} height={activeBanner.leftIcon.height || 24} className="w-5 h-5 object-contain" />
          )}
          <span>{activeBanner.leftText}</span>
        </div>

        <div className="flex items-center gap-2 tracking-wide uppercase">
          {activeBanner.centerIcon && typeof activeBanner.centerIcon === 'object' && (activeBanner.centerIcon.imagekit?.url || activeBanner.centerIcon.url) && (
            <Image src={(activeBanner.centerIcon.imagekit?.url || activeBanner.centerIcon.url) as string} alt={activeBanner.centerIcon.alt || 'Center Icon'} width={activeBanner.centerIcon.width || 24} height={activeBanner.centerIcon.height || 24} className="w-5 h-5 object-contain" />
          )}
          <span>{activeBanner.centerText}</span>
        </div>

        <div className="flex items-center gap-2 font-bold">
          {activeBanner.rightIcon && typeof activeBanner.rightIcon === 'object' && (activeBanner.rightIcon.imagekit?.url || activeBanner.rightIcon.url) && (
            <Image src={(activeBanner.rightIcon.imagekit?.url || activeBanner.rightIcon.url) as string} alt={activeBanner.rightIcon.alt || 'Right Icon'} width={activeBanner.rightIcon.width || 24} height={activeBanner.rightIcon.height || 24} className="w-5 h-5 object-contain" />
          )}
          <span>Hotline: {activeBanner.phoneNumber}</span>
        </div>
      </div>
    </div>
  )
}
