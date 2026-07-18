import React from 'react'

import '../global.css'
import { Navbar } from '@/components/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: 'en' | 'vi' }>
}) {
  const { children, params } = props
  const { locale } = await params

  return (
    <html lang={locale}>
      <body>
        <Navbar locale={locale} />
        <main>{children}</main>
      </body>
    </html>
  )
}
