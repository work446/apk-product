'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as LucideIcons from 'lucide-react'

export const NavbarLinks = ({ links, locale }: { links: any[]; locale: string }) => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-8">
      {links.map((link: any, i: number) => {
        // Determine active state: 
        // 1. If it's the home page ('/en' or '/vi'), exact match is required.
        // 2. Otherwise, check if the current path starts with the link URL to keep it active on subpages (e.g. /products/123)
        const stripLocale = (p: string) => {
          const stripped = p.replace(/^\/(en|vi)(\/|$)/, '/')
          return stripped.length > 1 ? stripped.replace(/\/$/, '') : stripped
        }

        const cleanPath = stripLocale(pathname || '/')
        const cleanLink = stripLocale(link.url || '/')

        let isActive = false
        if (cleanLink === '/') {
          isActive = cleanPath === '/'
        } else {
          isActive = cleanPath.startsWith(cleanLink)
        }

        return (
          <Link
            key={i}
            href={`/${locale}${cleanLink === '/' ? '' : cleanLink}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`uppercase text-[13px] font-bold tracking-wider transition-colors relative flex items-center
            ${isActive ? 'text-red-600' : 'text-gray-900 hover:text-red-600'}
          `}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
