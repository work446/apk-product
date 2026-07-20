import React from 'react'

import '../global.css'
import { Navbar } from '@/components/Navbar'
import { TopBanner } from '@/components/TopBanner'
import { Footer } from '@/components/Footer'
import { FloatingMenu } from '@/components/FloatingMenu'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'APK Product high quality lighting.',
  title: 'APK Product',
}

export const revalidate = 60 // Revalidate all pages every 60 seconds

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }]
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { children, params } = props
  const { locale: rawLocale } = await params
  const locale = rawLocale as 'en' | 'vi'

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TopBanner locale={locale} />
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <FloatingMenu locale={locale} />
      </body>
    </html>
  )
}
