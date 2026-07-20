import React from 'react'
import Link from 'next/link'
import { CheckCircle2, Download, MessageSquare } from 'lucide-react'

export const ProductInfo = ({
  product,
  locale,
}: {
  product: any
  locale: string
}) => {
  const t = {
    requestQuote: locale === 'vi' ? 'Yêu cầu báo giá' : 'Request a Quote',
    downloadCatalog: locale === 'vi' ? 'Tải Catalogue' : 'Download Catalog',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">
          {product.productName}
        </h1>
        <h2 className="text-lg md:text-xl font-bold text-[#d81e28] mb-4">
          {product.productTitle}
        </h2>
        
        {product.description && (
          <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed font-medium">
            {product.description}
          </p>
        )}
      </div>

      {/* Characteristics List */}
      {product.characteristics && product.characteristics.length > 0 && (
        <div className="mb-8 flex-1">
          <ul className="space-y-4">
            {product.characteristics.map((char: any, i: number) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#d81e28] shrink-0 mr-3 mt-0.5" strokeWidth={2.5} />
                <span className="text-[14px] text-gray-800 font-bold leading-snug">
                  {char.characteristic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Section (Badges and Buttons) */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        
        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
            {product.badges.map((badge: any, i: number) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 flex-1 min-w-[80px]"
              >
                {/* Simulated icon logic based on text */}
                <div className="text-[10px] md:text-[11px] font-black text-gray-800 uppercase tracking-widest leading-tight">
                  {badge.badgeText.split(' ').map((word: string, j: number) => (
                    <React.Fragment key={j}>
                      {word}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/${locale}/contact?product=${product.productName}`}
            className="w-full bg-[#a51920] hover:bg-[#d81e28] text-white transition-colors duration-300 font-bold uppercase tracking-wider text-[13px] h-14 flex items-center justify-center rounded-md shadow-sm"
          >
            {t.requestQuote}
          </Link>
          
          {(product.downloads?.catalogue || product.downloads?.manual || product.downloads?.certificate) && (
            <Link
              href={product.downloads.catalogue || product.downloads.manual || product.downloads.certificate || '#'}
              target="_blank"
              className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 text-[#d81e28] transition-colors duration-300 font-bold uppercase tracking-wider text-[13px] h-14 flex items-center justify-center rounded-md"
            >
              {t.downloadCatalog} <Download className="w-4 h-4 ml-2" strokeWidth={2.5} />
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
