import React from 'react'
import { Factory, Building2, School, HeartPulse, ShoppingBag, Home, Store, Warehouse, LucideIcon } from 'lucide-react'

export type WidelyUsedItemType = {
  icon: string
  label: string
  id?: string
}

export type WidelyUsedType = {
  blockType: 'widelyUsed'
  title: string
  items: WidelyUsedItemType[]
}

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Building2,
  School,
  HeartPulse,
  ShoppingBag,
  Home,
  Store,
  Warehouse,
}

export const WidelyUsedBlock: React.FC<WidelyUsedType> = ({ title, items }) => {
  const renderHighlightedTitle = (text: string) => {
    if (!text) return null
    const words = text.split(' ')
    if (words.length >= 3) {
      const mid = Math.floor(words.length / 2)
      return (
        <>
          {words.slice(0, mid).join(' ')}{' '}
          <span className="text-[#d81e28]">{words[mid]}</span>{' '}
          {words.slice(mid + 1).join(' ')}
        </>
      )
    } else if (words.length === 2) {
      return (
        <>
          {words[0]} <span className="text-[#d81e28]">{words[1]}</span>
        </>
      )
    }
    return text
  }

  return (
    <section className="w-full bg-[#f9fafb] py-10 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-[28px] font-bold uppercase text-gray-900 tracking-wide">
            {title ? renderHighlightedTitle(title) : renderHighlightedTitle('WIDELY USED IN')}
          </h2>
          {/* Yellow Accent Line */}
          <div className="w-12 h-1 bg-[#fbbc04] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 md:p-12 lg:p-16 border border-gray-100">
          <div className="grid grid-cols-3 gap-y-6 md:gap-y-10">
            {items && items.length > 0 ? (
              items.map((item, index) => {
                const Icon = iconMap[item.icon] || Factory

                // Always 3 columns, so remove right border on every 3rd item (index 2, 5)
                const isRightEdge = (index + 1) % 3 === 0

                return (
                  <div
                    key={index}
                    className={`group relative flex flex-col items-center justify-center text-center px-2 sm:px-4 py-4 sm:py-6 md:py-8 border-gray-100 cursor-pointer hover:bg-gray-50/50 transition-colors
                      ${isRightEdge ? 'border-r-0' : 'border-r'}
                    `}
                  >
                    {/* Top Red Accent Line on Hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#d81e28] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20"></div>

                    <div className="mb-3 sm:mb-4 md:mb-6 text-[#d81e28] transform group-hover:scale-110 transition-transform duration-300">
                      <Icon strokeWidth={1.5} className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                    </div>
                    <span className="text-gray-900 font-bold text-[11px] sm:text-sm md:text-lg lg:text-xl group-hover:text-[#d81e28] transition-colors leading-tight">
                      {item.label}
                    </span>
                  </div>
                )
              })
            ) : (
              // Fallback
              <div className="col-span-full text-center text-gray-500 py-10">
                No items added yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
