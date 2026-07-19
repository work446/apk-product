import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <span className="font-bold text-lg leading-none">f</span>,
  twitter: <span className="font-bold text-sm leading-none">X</span>,
  linkedin: <span className="font-bold text-sm leading-none">in</span>,
  youtube: <span className="font-bold text-[10px] leading-none">YT</span>,
  instagram: <span className="font-bold text-[10px] leading-none">IG</span>,
  zalo: <span className="font-bold text-[11px] uppercase tracking-wider">Zalo</span>,
}

export const Footer = async ({ locale = 'en' }: { locale?: 'en' | 'vi' }) => {
  const payload = await getPayload({ config: configPromise })

  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  // Destructure with fallbacks
  const {
    companyDescription = 'APK is a leading provider of high-quality industrial hardware and safety solutions.',
    contact = {
      address: '123 Industrial Way, Tech City, 90210',
      phone: '+1 (555) 123-4567',
      email: 'info@apkproduct.com',
      workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
    quickLinks = [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Contact', url: '/contact' },
    ],
    socialLinks = [],
    copyright = '© 2026 APK. All rights reserved.',
  } = footer || {}

  return (
    <footer className="bg-gray-900 text-gray-300 w-full pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-white">
                <span className="text-[#d81e28]">APK</span> PRODUCT
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              {companyDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">
              {locale === 'vi' ? 'Liên Kết Nhanh' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="text-gray-400 hover:text-[#d81e28] transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-6 lg:col-span-2">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">
              {locale === 'vi' ? 'Thông Tin Liên Hệ' : 'Contact Us'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-[#d81e28] shrink-0 mt-0.5" />
                <span className="text-gray-400">{contact?.address}</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-[#d81e28] shrink-0 mt-0.5" />
                <span className="text-gray-400">{contact?.phone}</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-[#d81e28] shrink-0 mt-0.5" />
                <span className="text-gray-400">{contact?.email}</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Clock className="w-5 h-5 text-[#d81e28] shrink-0 mt-0.5" />
                <span className="text-gray-400">{contact?.workingHours}</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar: Socials & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {copyright}
          </p>
          
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#d81e28] hover:text-white transition-all shadow-sm"
                  aria-label={social.platform}
                >
                  {socialIcons[social.platform as string] || <Facebook className="w-5 h-5" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
