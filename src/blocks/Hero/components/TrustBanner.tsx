'use client'

import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { m } from 'framer-motion'

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}

export const TrustBanner = ({ trustBanner, actions }: { trustBanner: any; actions?: any }) => {
  if (!trustBanner || trustBanner.length === 0) return null

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        hidden: { opacity: 0, y: 20 },
      }}
      className="w-full bg-white border-t border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4 lg:py-3 xl:py-5">
        <div className="grid grid-cols-3 max-[520px]:gap-x-0 max-[520px]:gap-y-6 min-[521px]:flex min-[521px]:flex-nowrap min-[521px]:justify-center min-[521px]:items-center min-[521px]:gap-6 lg:gap-8 xl:gap-12 w-full">
          {trustBanner.map((item: any, index: number) => (
            <m.div
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              key={index}
              className={`flex max-[520px]:flex-col max-[520px]:items-center max-[520px]:justify-start min-[521px]:flex-row min-[521px]:items-center min-[521px]:justify-start min-[521px]:gap-2 sm:gap-3 lg:gap-1.5 xl:gap-3 shrink-0 ${index % 3 !== 2 ? 'max-[520px]:border-r max-[520px]:border-gray-200' : ''}`}
            >
              <div className="text-primary shrink-0 max-[520px]:mb-1">
                <DynamicIcon
                  name={item.icon}
                  className="max-[520px]:w-6 max-[520px]:h-6 w-5 h-5 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6"
                />
              </div>
              <span className="font-bold text-gray-900 max-[520px]:text-[10px] max-[520px]:text-center text-[11px] sm:text-[10px] lg:text-[10px] xl:text-sm uppercase tracking-wide leading-tight min-[521px]:whitespace-nowrap max-[520px]:px-1">
                {item.text}
              </span>
              {/* Separator Line (except for the last item) */}
              {index < trustBanner.length - 1 && (
                <div className="hidden lg:block w-[1px] h-6 xl:h-8 bg-gray-200 ml-2 xl:ml-6 shrink-0"></div>
              )}
            </m.div>
          ))}
        </div>

        {/* Mobile Action Buttons (rendered below the trust banner on mobile) */}
        {actions && actions.length > 0 && (
          <m.div className="flex flex-col min-[521px]:hidden gap-3 mt-6 w-full">
            {actions.map((action: any, index: number) => {
              let variant: any = 'default'
              let extraClass = ''

              if (action.style === 'primary') {
                variant = 'default'
                extraClass =
                  'bg-primary hover:bg-primary hover:brightness-110 text-primary-foreground'
              } else if (action.style === 'secondary') {
                variant = 'outline'
                extraClass = 'border-primary text-gray-900 hover:bg-primary/5'
              } else if (action.style === 'ghost') {
                variant = 'ghost'
                extraClass = 'text-gray-900 hover:bg-gray-100'
              }

              return (
                <Button
                  key={index}
                  variant={variant}
                  className={`h-11 w-full px-4 text-[11px] font-bold uppercase tracking-wide transition-all ${extraClass}`}
                  render={<Link href={action.url} />}
                  {...({ nativeButton: false } as any)}
                >
                  {action.style === 'ghost' && <LucideIcons.PlayCircle className="w-4 h-4 mr-2" />}
                  {action.label}
                  {action.style !== 'ghost' && (
                    <LucideIcons.ArrowRight
                      className={`w-4 h-4 ml-2 ${action.style === 'secondary' ? 'text-primary' : ''}`}
                    />
                  )}
                </Button>
              )
            })}
          </m.div>
        )}
      </div>
    </m.div>
  )
}
