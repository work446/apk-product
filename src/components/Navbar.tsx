import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileMenu } from './MobileMenu'
import { NavbarLinks } from './NavbarLinks'
import * as LucideIcons from 'lucide-react'

export async function Navbar({ locale = 'en' }: { locale?: 'en' | 'vi' }) {
  const payload = await getPayload({ config: configPromise })
  let navbar: any

  try {
    navbar = await payload.findGlobal({
      slug: 'navbar',
      locale: locale as any,
    })
  } catch (e) {
    console.error('Failed to fetch Navbar global:', e)
    return null
  }

  const rawCtaUrl = navbar?.ctaUrl && navbar.ctaUrl !== '#products' ? navbar.ctaUrl : '/products'
  const cleanCtaUrl = rawCtaUrl.replace(/^\/(en|vi)(?=[/?#]|$)/, '')
  const normalizedCtaUrl = cleanCtaUrl.startsWith('/') ? cleanCtaUrl : `/${cleanCtaUrl}`
  const ctaHref = `/${locale}${normalizedCtaUrl === '/' ? '' : normalizedCtaUrl}`
  const links = navbar?.links || []

  return (
    <>
      {/* Spacer to prevent Navbar from hiding under fixed TopBanner */}
      <div className="h-10 md:h-9 w-full shrink-0" aria-hidden="true" />
      <header className="sticky top-10 md:top-9 z-30 w-full border-b bg-white backdrop-blur">
        <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-10">
          {/* Brand/Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="relative w-40 md:w-48 h-16 mix-blend-multiply">
                <Image
                  src="/apk-logo-transparent.png"
                  alt="APK Logo"
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Dynamic Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-8">
            <NavbarLinks links={links} locale={locale} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href={ctaHref}
              prefetch={true}
              className="hidden md:flex bg-[#FFC20E] hover:bg-[#FFC20E] hover:brightness-110 text-black uppercase tracking-wide rounded px-6 h-9 text-[13px] transition-all items-center justify-center font-medium"
            >
              {navbar?.ctaText || 'See Products'}
              <LucideIcons.ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
            </Link>

            {/* Interactive Language Selector Interface */}
            <div className="pl-2 border-l border-gray-200 relative z-[60] pointer-events-auto flex items-center space-x-2">
              <LocaleSwitcher currentLocale={locale} />
              <MobileMenu
                links={links}
                ctaText={navbar?.ctaText}
                ctaUrl={ctaHref}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
