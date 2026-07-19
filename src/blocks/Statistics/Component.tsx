'use client'
import React, { useEffect, useRef } from 'react'
import { Building2, Users, Handshake, ThumbsUp } from 'lucide-react'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'

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

// A component that animates a string with a number (e.g., "$1,200+", "150M") from 0
const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView && ref.current) {
      // Extract prefix, number, and suffix (e.g. "> ", "1,500", "+")
      const match = value.match(/^([^\d]*)([\d,\.]+)(.*)$/)
      if (!match) return

      const prefix = match[1]
      const numericString = match[2].replace(/,/g, '')
      const suffix = match[3]
      const endValue = parseFloat(numericString)
      const hasDecimals = numericString.includes('.')

      if (isNaN(endValue)) return

      // Dynamically import animate from framer-motion to keep initial bundle small
      import('framer-motion').then(({ animate }) => {
        animate(0, endValue, {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1], // Custom smooth ease-out curve
          onUpdate: (latest) => {
            if (ref.current) {
              const formatted = hasDecimals
                ? latest.toFixed(1)
                : Math.floor(latest).toLocaleString('en-US')
              ref.current.textContent = `${prefix}${formatted}${suffix}`
            }
          },
        })
      })
    }
  }, [inView, value])

  return <span ref={ref}>{value}</span>
}

export const StatisticsBlock: React.FC<StatisticsBlockProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null

  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full bg-[#c61e24] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <m.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
              hidden: { opacity: 0 }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-6 relative max-w-[320px] sm:max-w-none mx-auto"
          >
            {stats.map((stat, idx) => {
              const IconComponent = iconMap[stat.icon] || Building2
              return (
                <m.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
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
                      <AnimatedNumber value={stat.value} />
                    </span>
                    <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/90">
                      {stat.label}
                    </span>
                  </div>

                  {/* Vertical Divider (Desktop Only) */}
                  {idx < stats.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/20"></div>
                  )}
                </m.div>
              )
            })}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
