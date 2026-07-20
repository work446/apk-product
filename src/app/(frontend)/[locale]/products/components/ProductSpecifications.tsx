import React from 'react'
import {
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
  if (lower.includes('led') || lower.includes('light') || lower.includes('lumen') || lower.includes('watt') || lower.includes('w')) return 'Lightbulb'
  if (lower.includes('hour') || lower.includes('time') || lower.includes('duration') || lower.includes('min')) return 'Clock'
  if (lower.includes('body') || lower.includes('material') || lower.includes('abs') || lower.includes('protect')) return 'Shield'
  if (lower.includes('battery') || lower.includes('mah') || lower.includes('power') || lower.includes('capacity')) return 'Battery'
  if (lower.includes('volt') || lower.includes('ac') || lower.includes('dc') || lower.includes('v') || lower.includes('hz')) return 'Zap'
  if (lower.includes('water') || lower.includes('ip') || lower.includes('liquid') || lower.includes('class')) return 'Droplet'
  if (lower.includes('temp') || lower.includes('celsius') || lower.includes('°')) return 'Thermometer'
  return 'Check'
}

export const ProductSpecifications = ({ specifications, locale }: { specifications: any[]; locale: string }) => {
  if (!specifications || specifications.length === 0) return null

  const title = locale === 'vi' ? 'Thông Số Kỹ Thuật' : 'Technical Specifications'

  return (
    <div className="mt-12 md:mt-16 bg-white rounded-xl border border-gray-100 p-6 md:p-10">
      <h3 className="text-[20px] font-black text-[#1a1f2e] mb-6 uppercase tracking-wide">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">
        {specifications.map((spec: any, i: number) => {
          const Icon = IconMap[getIconForText((spec.key || '') + ' ' + (spec.value || ''))] || Check
          return (
            <div 
              key={i} 
              className="flex items-center justify-between py-4 border-b border-gray-100 md:odd:pr-12 md:even:pl-12"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-[18px] h-[18px] text-gray-400" strokeWidth={1.5} />
                <span className="text-[14px] font-bold text-[#1a1f2e]">
                  {spec.key}
                </span>
              </div>
              <span className="text-[14px] font-medium text-gray-600 text-right">
                {spec.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
