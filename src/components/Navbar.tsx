import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { LocaleSwitcher } from './LocaleSwitcher'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

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

  const links = navbar?.links || []

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Brand/Logo Section */}
        <div className="mr-4 flex">
          <Link
            href={`/${locale}`}
            className="mr-6 flex items-center space-x-2 font-bold tracking-tight text-lg"
          >
            <span>{navbar?.logo ? 'Logo' : 'MySite'}</span>
          </Link>
        </div>

        {/* Action Blocks & Dynamic Navigation Menu */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {links.map((link: any, i: number) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink 
                    render={<Link href={link.url} />} 
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Interactive Language Selector Interface */}
          <nav className="flex items-center">
            <LocaleSwitcher currentLocale={locale} />
          </nav>
        </div>
      </div>
    </header>
  )
}
