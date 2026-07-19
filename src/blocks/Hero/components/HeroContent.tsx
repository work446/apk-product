'use client'

import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}

export const HeroContent = ({
  tagline,
  headlineBlack,
  headlineRed,
  subtitle,
  features,
  actions,
}: any) => {
  return (
    <div className="relative h-full lg:absolute lg:inset-0 z-10 w-full flex flex-col justify-start min-[521px]:justify-center px-4 pt-6 pb-4 sm:pt-8 sm:pb-8 min-[521px]:py-4 lg:py-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start min-[521px]:items-start lg:items-center gap-6 lg:gap-20">
          {/* Left Content Area */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              hidden: { opacity: 0 },
            }}
            className="w-full max-[520px]:ml-3 max-w-[90%] sm:max-w-[70%] min-[521px]:max-w-[55%] lg:max-w-none lg:w-1/2 flex flex-col items-start text-left"
          >
            <m.span
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-primary font-bold uppercase tracking-wider text-[11px] min-[521px]:text-[8px] md:text-[10px] lg:text-xs xl:text-sm mb-2 sm:mb-2 lg:mb-3 xl:mb-4"
            >
              {tagline}
            </m.span>

            <m.h1
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="[&:lang(en)]:text-2xl [&:lang(en)]:min-[521px]:text-lg [&:lang(en)]:md:text-2xl [&:lang(en)]:lg:text-4xl [&:lang(en)]:xl:text-5xl [&:lang(vi)]:text-xl [&:lang(vi)]:min-[521px]:text-base [&:lang(vi)]:md:text-xl [&:lang(vi)]:lg:text-[2.25rem] [&:lang(vi)]:xl:text-[2.65rem] font-extrabold leading-tight mb-2 sm:mb-3 lg:mb-4 xl:mb-6 text-gray-900"
            >
              {headlineBlack} <br />
              <span className="text-primary">{headlineRed}</span>
            </m.h1>

            <m.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-xs min-[521px]:text-[9px] md:text-xs lg:text-base xl:text-lg text-gray-800 mb-4 sm:mb-4 lg:mb-6 xl:mb-8 max-w-lg font-medium"
            >
              {subtitle}
            </m.p>

            {/* Features List */}
            {features && features.length > 0 && (
              <m.div
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                className="grid max-[520px]:grid-cols-3 min-[521px]:grid-cols-1 max-[520px]:gap-x-1 gap-y-3 sm:gap-y-4 min-[521px]:gap-y-4 lg:gap-y-5 xl:gap-y-6 mb-4 sm:mb-5 lg:mb-8 xl:mb-10 w-full max-w-[95%] min-[521px]:max-w-[320px] lg:max-w-[480px]"
              >
                {features.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className={`flex max-[520px]:flex-col max-[520px]:items-start max-[520px]:justify-start min-[521px]:items-stretch min-[521px]:justify-start gap-2 lg:gap-3 xl:gap-4 relative ${
                      index % 3 !== 2 ? 'max-[520px]:border-r max-[520px]:border-gray-200' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex items-start mt-0.5 max-[520px]:mt-0 max-[520px]:mb-1 sm:mt-1 shrink-0">
                      <div className="text-primary">
                        <DynamicIcon
                          name={feature.icon}
                          className="w-4 h-4 max-[520px]:w-5 max-[520px]:h-5 sm:w-5 sm:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col py-0 lg:py-0 text-left max-[520px]:px-1 w-full">
                      <h3 className="font-bold text-gray-900 text-[11px] max-[520px]:text-[11px] min-[521px]:text-[8px] md:text-[10px] lg:text-[11px] xl:text-sm mb-0 lg:mb-0.5 max-[520px]:leading-[1.2]">
                        {feature.title}
                      </h3>
                      <p className="text-[10px] min-[521px]:text-[7px] md:text-[9px] lg:text-[10px] xl:text-xs text-gray-600 font-medium leading-tight lg:leading-relaxed mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </m.div>
            )}

            {/* Actions / Buttons */}
            {actions && actions.length > 0 && (
              <m.div
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                className="hidden min-[521px]:flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-3 xl:gap-4 mb-2 sm:mb-4 lg:mb-8 xl:mb-12"
              >
                {actions.map((action: any, index: number) => {
                  let variant: any = 'default'
                  let extraClass = ''

                  if (action.style === 'primary') {
                    variant = 'default'
                    extraClass =
                      'bg-primary hover:bg-primary hover:brightness-110 text-primary-foreground'
                  } else if (action.style === 'secondary') {
                    variant = 'outline'
                    extraClass = 'border-primary text-primary hover:bg-primary/5'
                  } else if (action.style === 'ghost') {
                    variant = 'ghost'
                    extraClass = 'text-gray-300 hover:text-white hover:bg-white/10'
                  }

                  return (
                    <Button
                      key={index}
                      variant={variant}
                      className={`h-7 px-3 min-[521px]:h-6 min-[521px]:px-2.5 md:h-8 md:px-4 lg:h-11 lg:px-6 xl:h-14 xl:px-8 text-[9px] min-[521px]:text-[8px] md:text-[10px] lg:text-xs xl:text-base font-bold uppercase tracking-wide transition-all ${extraClass}`}
                      render={<Link href={action.url} />}
                      {...({ nativeButton: false } as any)}
                    >
                      {action.style === 'ghost' && (
                        <LucideIcons.PlayCircle className="w-3.5 h-3.5 min-[521px]:w-3 min-[521px]:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 mr-1 sm:mr-2" />
                      )}
                      {action.label}
                      {action.style !== 'ghost' && (
                        <LucideIcons.ArrowRight className="w-3 h-3 min-[521px]:w-2.5 min-[521px]:h-2.5 md:w-3.5 md:h-3.5 ml-1 sm:ml-2" />
                      )}
                    </Button>
                  )
                })}
              </m.div>
            )}
          </m.div>
        </div>
      </div>
    </div>
  )
}
