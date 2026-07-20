import React from 'react'
import Image from 'next/image'
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
  if (lower.includes('bright') || lower.includes('led') || lower.includes('lumen')) return 'Lightbulb'
  if (lower.includes('hour') || lower.includes('time') || lower.includes('duration') || lower.includes('backup')) return 'Clock'
  if (lower.includes('protect') || lower.includes('safe') || lower.includes('fire')) return 'Shield'
  if (lower.includes('battery') || lower.includes('mah') || lower.includes('power')) return 'Battery'
  if (lower.includes('volt') || lower.includes('ac') || lower.includes('dc') || lower.includes('v') || lower.includes('energy')) return 'Zap'
  if (lower.includes('water') || lower.includes('ip') || lower.includes('liquid')) return 'Droplet'
  if (lower.includes('temp') || lower.includes('celsius') || lower.includes('°')) return 'Thermometer'
  return 'Check'
}

export const ProductHighlights = ({ features }: { features: any[] }) => {
  if (!features || features.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-12 mb-6">
      {features.map((feat, i) => {
        const Icon = IconMap[feat.icon || getIconForText(feat.title || feat.text)] || Check
        const title = feat.title || (feat.text ? feat.text.split(/ - |: |\|/g)[0] : '')
        const subtitle = feat.subtitle || (feat.text ? feat.text.split(/ - |: |\|/g).slice(1).join(' ') : '')

        return (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="bg-red-50 text-[#d81e28] p-4 rounded-full mb-3 flex items-center justify-center w-14 h-14 border border-red-100">
              {feat.customIcon && typeof feat.customIcon === 'object' && feat.customIcon.url ? (
                <div className="relative w-7 h-7">
                  <Image
                    src={feat.customIcon.url}
                    alt={feat.customIcon.alt || 'Feature Icon'}
                    sizes="28px"
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              ) : (
                <Icon className="w-6 h-6" strokeWidth={2} />
              )}
            </div>
            
            <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-[11px] text-gray-500 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
