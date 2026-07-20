import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip proxy for internal Next.js paths, Payload admin, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if the current pathname starts with one of our supported locales
  const hasLocale = pathname.startsWith('/en/') || pathname === '/en' || pathname.startsWith('/vi/') || pathname === '/vi'

  // If there's no locale (e.g. visiting /products directly), redirect to the /en/ version
  if (!hasLocale && pathname !== '/') {
    request.nextUrl.pathname = `/en${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
