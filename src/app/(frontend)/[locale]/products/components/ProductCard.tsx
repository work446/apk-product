import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  PlayCircle,
  Lightbulb,
  Clock,
  Shield,
  Battery,
  Zap,
  Droplet,
  Thermometer,
  Check,
  Star,
} from 'lucide-react'
import { ProductGridItem } from './ProductGridAnimation'

const IconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Clock,
  Shield,
  Battery,
  Zap,
  Droplet,
  Thermometer,
  Check,
  Star,
}

const getIconForText = (text: string) => {
  const lower = text.toLowerCase()
  if (
    lower.includes('led') ||
    lower.includes('light') ||
    lower.includes('lumen') ||
    lower.includes('watt') ||
    lower.includes('w')
  )
    return 'Lightbulb'
  if (
    lower.includes('hour') ||
    lower.includes('time') ||
    lower.includes('duration') ||
    lower.includes('min')
  )
    return 'Clock'
  if (
    lower.includes('body') ||
    lower.includes('material') ||
    lower.includes('abs') ||
    lower.includes('protect')
  )
    return 'Shield'
  if (lower.includes('battery') || lower.includes('mah') || lower.includes('power'))
    return 'Battery'
  if (lower.includes('volt') || lower.includes('ac') || lower.includes('dc') || lower.includes('v'))
    return 'Zap'
  if (lower.includes('water') || lower.includes('ip') || lower.includes('liquid')) return 'Droplet'
  if (lower.includes('temp') || lower.includes('celsius') || lower.includes('°'))
    return 'Thermometer'
  return 'Check'
}

export const ProductCard = ({ product, locale, index }: { product: any; locale: string; index?: number }) => {
  const img = product.images?.[0]?.image
  let imageUrl = img?.imagekit?.url || img?.url || '/fallback-product.jpg'
  
  if (imageUrl.includes('ik.imagekit.io') && !imageUrl.includes('tr=')) {
    const separator = imageUrl.includes('?') ? '&' : '?'
    imageUrl = `${imageUrl}${separator}tr=w-600,h-600,cm-pad_resize,bg-FFFFFF`
  }

  const imageAlt = img?.alt || product.productTitle

  return (
    <ProductGridItem>
      <div className="group flex flex-col h-full bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 relative ">
      {/* Top Red Accent Line on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>

      <Link
        href={`/${locale}/products/${product.id}`}
        className="relative w-full h-[200px] sm:h-[220px] bg-white overflow-hidden group-hover:bg-gray-50/50 transition-colors flex items-center justify-center p-4"
      >
        {/* Optional Badge */}
        {product.badge && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 bg-[#1a202c] text-white text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest rounded-[2px] whitespace-nowrap shadow-sm">
            {product.badge}
          </div>
        )}
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority={index !== undefined && index < 4}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out mix-blend-multiply"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5 border-t border-gray-100/50 bg-white z-10">
        <span className="text-xs font-bold text-[#d81e28] uppercase tracking-wider mb-2">
          {product.category?.title || product.category?.slug || product.productName}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 h-14 group-hover:text-primary transition-colors">
          <Link href={`/${locale}/products/${product.id}`}>{product.productTitle}</Link>
        </h3>
        {/* <p className="text-sm text-gray-500 mb-4">{product.company}</p> */}

        {/* Features Grid */}
        {((product.cardFeatures && product.cardFeatures.length > 0) ||
          (product.specifications && product.specifications.length > 0)) && (
          <div className="flex flex-col gap-y-2 mb-5 w-full">
            {(product.cardFeatures?.length > 0
              ? product.cardFeatures
              : product.specifications?.slice(0, 3).map((s: any) => ({
                  icon: getIconForText((s.key || '') + ' ' + (s.value || '')),
                  text: s.value,
                })) || []
            ).map((feat: any, i: number, arr: any[]) => {
              const Icon = IconMap[feat.icon] || Check
              return (
                <div
                  key={i}
                  className="flex items-center text-[11px] sm:text-xs font-medium text-gray-600 w-full"
                >
                  <div className="bg-gray-50 p-1 rounded-full mr-1.5 border border-gray-100 shrink-0 flex items-center justify-center w-[22px] h-[22px]">
                    {feat.customIcon &&
                    typeof feat.customIcon === 'object' &&
                    feat.customIcon.url ? (
                      <Image
                        src={feat.customIcon.url}
                        alt={feat.customIcon.alt || 'Custom Icon'}
                        sizes="14px"
                        fill
                        className="object-contain opacity-60"
                      />
                    ) : (
                      <Icon className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
                    )}
                  </div>
                  <span className="truncate flex-1">{feat.text}</span>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <Link
            href={`/${locale}/products/${product.id}`}
            className="inline-flex items-center text-sm font-bold text-primary uppercase tracking-wider group-hover:text-red-700 transition-colors"
          >
            {locale === 'vi' ? 'Xem Chi Tiết' : 'View Details'}
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          {product.youtubeUrl && (
            <a
              href={product.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff0000] transition-colors"
              title="Watch Video"
            >
              <PlayCircle className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      </div>
    </ProductGridItem>
  )
}
