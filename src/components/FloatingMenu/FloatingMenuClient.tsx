'use client'

import React from 'react'
import { Phone, MessageCircle, Mail } from 'lucide-react'

// Zalo SVG
const ZaloIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.5 12.15c0-4.71-4.25-8.52-9.5-8.52S2.5 7.44 2.5 12.15c0 4.14 3.28 7.6 7.66 8.35-.16.7-.52 2.21-.57 2.4-.07.29.17.4.4.24.28-.2 1.9-1.4 3.32-2.48 2.5.4 5.69-1.22 5.69-4.8 0-1.27.5-2.51.5-3.71z" />
  </svg>
)

const iconMap: Record<string, React.FC<any>> = {
  phone: Phone,
  zalo: ZaloIcon,
  messenger: MessageCircle,
  mail: Mail,
}

export const FloatingMenuClient = ({ menuItems }: { menuItems: any[] }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      
      {/* Dynamic Menu Items */}
      {menuItems?.map((item, idx) => {
        const Icon = iconMap[item.icon] || Phone
        const color = item.color || '#d81e28' // Default to primary red

        return (
          <a
            key={idx}
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center"
            title={item.label}
          >
            {/* Tooltip */}
            <div className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md opacity-0 pointer-events-none transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-lg">
              {item.label}
              {/* Tooltip arrow */}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>

            {/* Container for Spinning Gradient */}
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full">
              {/* Spinning gradient border behind the button */}
              <div 
                className="absolute inset-[-3px] rounded-full animate-[spin_2s_linear_infinite]"
                style={{ 
                  background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, ${color} 100%)`,
                }}
              ></div>
              
              {/* Actual Button Mask */}
              <div 
                className="absolute inset-0 rounded-full shadow-lg"
                style={{ backgroundColor: color }}
              ></div>

              {/* Icon */}
              <Icon className="relative z-10 w-6 h-6 text-white" />
            </div>
          </a>
        )
      })}
    </div>
  )
}
