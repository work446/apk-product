'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Languages, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LocaleSwitcher({ currentLocale }: { currentLocale: 'en' | 'vi' }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'vi') {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="h-9 w-9 border border-input bg-background">
            <Languages className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => handleLocaleChange('en')} className="justify-between">
          English
          {currentLocale === 'en' && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange('vi')} className="justify-between">
          Tiếng Việt
          {currentLocale === 'vi' && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
