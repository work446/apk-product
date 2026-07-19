'use client'

import React from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { HeroSlider } from './components/HeroSlider'
import { HeroContent } from './components/HeroContent'
import { TrustBanner } from './components/TrustBanner'

export const HeroBlock: React.FC<any> = ({
  tagline,
  headlineBlack,
  headlineRed,
  subtitle,
  features,
  actions,
  trustBanner,
  sliderImages,
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full aspect-video max-[520px]:aspect-[2/3] overflow-hidden bg-gray-50">
        <HeroSlider sliderImages={sliderImages} />
        <HeroContent
          tagline={tagline}
          headlineBlack={headlineBlack}
          headlineRed={headlineRed}
          subtitle={subtitle}
          features={features}
          actions={actions}
        />
      </section>

      <TrustBanner trustBanner={trustBanner} actions={actions} />
    </LazyMotion>
  )
}
