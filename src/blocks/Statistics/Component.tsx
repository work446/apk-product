import React from 'react'
import { Building2, Users, Handshake, ThumbsUp } from 'lucide-react'

type StatItem = {
  icon: 'building' | 'users' | 'handshake' | 'thumbs-up'
  value: string
  label: string
}

export type StatisticsBlockProps = {
  blockType: 'statistics'
  stats: StatItem[]
}

const iconMap: Record<string, React.FC<any>> = {
  building: Building2,
  users: Users,
  handshake: Handshake,
  'thumbs-up': ThumbsUp,
}

export const StatisticsBlock: React.FC<StatisticsBlockProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null

  return (
    <section className="w-full bg-[#c61e24] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-6 relative max-w-[320px] sm:max-w-none mx-auto">
          {stats.map((stat, idx) => {
            const IconComponent = iconMap[stat.icon] || Building2
            return (
              <div 
                key={idx} 
                className="flex items-center justify-start lg:justify-center space-x-3 sm:space-x-4 lg:relative"
              >
                {/* Icon */}
                <div className="shrink-0">
                  <IconComponent className="w-10 h-10 sm:w-14 sm:h-14 stroke-1" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/90">
                    {stat.label}
                  </span>
                </div>

                {/* Vertical Divider (Desktop Only) */}
                {idx < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/20"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
