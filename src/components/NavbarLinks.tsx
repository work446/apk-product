'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as LucideIcons from 'lucide-react'

export const NavbarLinks = ({ links }: { links: any[] }) => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-8">
      {links.map((link: any, i: number) => {
        // Determine active state: 
        // 1. If it's the home page ('/en' or '/vi'), exact match is required.
        // 2. Otherwise, check if the current path starts with the link URL to keep it active on subpages (e.g. /products/123)
        let isActive = false
        const normalizedPath = pathname.replace(/\/$/, '') || '/'
        const isHomeLink = link.url === '/' || link.url === '/en' || link.url === '/vi'
        
        if (isHomeLink) {
          isActive = normalizedPath === '/' || normalizedPath === '/en' || normalizedPath === '/vi'
        } else {
          isActive = normalizedPath.startsWith(link.url)
        }

        // Automatically add chevron to items that look like dropdowns
        const hasDropdown =
          link.label.toLowerCase() === 'products' ||
          link.label.toLowerCase() === 'solutions'

        return (
          <Link
            key={i}
            href={link.url}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`uppercase text-[13px] font-bold tracking-wider transition-colors relative flex items-center
            ${isActive ? 'text-red-600' : 'text-gray-900 hover:text-red-600'}
          `}
          >
            {link.label}
            {hasDropdown && (
              <LucideIcons.ChevronDown
                className="w-4 h-4 ml-1 opacity-70"
                strokeWidth={3}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
