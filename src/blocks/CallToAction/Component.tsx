import React from 'react'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

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
    <section className="w-full bg-[#ffc107]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 md:py-8 gap-6">
          
          {/* Left side: Icon + Text */}
          <div className="flex items-center gap-4">
            <div className="shrink-0 text-[#c61e24]">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[#1a1a1a] text-lg sm:text-xl md:text-2xl font-bold">
                {title}
              </h2>
              <p className="text-[#333333] text-sm sm:text-base font-medium">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right side: Button */}
          <div className="shrink-0">
            <Link 
              href={buttonLink || '/contact'}
              className="inline-flex items-center gap-2 bg-[#c61e24] text-white font-bold text-sm px-6 py-3 rounded hover:bg-[#a0161d] transition-colors"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
