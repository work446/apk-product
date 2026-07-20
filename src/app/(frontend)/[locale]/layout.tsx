import React from 'react'

import '../global.css'
import { Navbar } from '@/components/Navbar'
import { TopBanner } from '@/components/TopBanner'
import { Footer } from '@/components/Footer'
import { FloatingMenu } from '@/components/FloatingMenu'
import { MotionProvider } from '@/providers/MotionProvider'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
})

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
    <html lang={locale} className={`${inter.variable} ${inter.className}`} suppressHydrationWarning>
      <body className="antialiased">
        <MotionProvider>
          <TopBanner locale={locale} />
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <FloatingMenu locale={locale} />
        </MotionProvider>
      </body>
    </html>
  )
}
