'use client'
import React from 'react'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { m, LazyMotion, domAnimation } from 'framer-motion'

export type CallToActionBlockProps = {
  blockType: 'callToAction'
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export const CallToActionBlock: React.FC<CallToActionBlockProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full bg-[#ffc107] overflow-hidden">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="container mx-auto px-4 max-w-7xl"
        >
          <div className="flex flex-row items-center justify-between py-4 sm:py-6 md:py-8 gap-3 sm:gap-6">
            
            {/* Left side: Icon + Text */}
            <div className="flex items-center gap-2 sm:gap-4">
              <m.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                className="shrink-0 text-[#c61e24]"
              >
                <Phone className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={2} />
              </m.div>
              <div className="flex flex-col">
                <h2 className="text-[#1a1a1a] text-sm sm:text-xl md:text-2xl font-bold leading-tight">
                  {title}
                </h2>
                <p className="text-[#333333] text-[10px] sm:text-sm md:text-base font-medium mt-0.5 sm:mt-0">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right side: Button */}
            <m.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="shrink-0"
            >
              <Link 
                href={buttonLink || '/contact'}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#c61e24] text-white font-bold text-[10px] sm:text-sm px-3 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#a0161d] transition-colors whitespace-nowrap"
              >
                {buttonText}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </m.div>

          </div>
        </m.div>
      </section>
    </LazyMotion>
  )
}
