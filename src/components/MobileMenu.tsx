'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, ChevronRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'

export const MobileMenu = ({
  links,
  ctaText,
  ctaUrl,
}: {
  links: any[]
  ctaText: string
  ctaUrl: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button className="p-2 text-gray-900 focus:outline-none" aria-label="Toggle menu">
              <Menu className="w-6 h-6" />
            </button>
          }
        ></SheetTrigger>
        <SheetContent side="top" className="w-full p-0 flex flex-col bg-white max-h-[80vh]">
          <SheetHeader className="p-6 text-left border-b">
            <SheetTitle>
              <div className="relative w-32 h-10 mix-blend-multiply">
                <Image
                  src="/apk-logo.png"
                  alt="APK Logo"
                  fill
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link: any, i: number) => {
              return (
                <Link
                  key={i}
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between w-full uppercase text-[14px] font-bold tracking-wider py-3 border-b border-gray-100 last:border-0"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              )
            })}
          </div>

          <div className="p-6 mt-auto border-t">
            <Link
              href={ctaUrl || '#products'}
              onClick={() => setOpen(false)}
              className="bg-[#c61e24] hover:bg-[#a51920] transition-colors text-white uppercase tracking-wide rounded w-full h-12 text-[14px] font-bold flex items-center justify-center"
            >
              {ctaText || 'See Products'}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
