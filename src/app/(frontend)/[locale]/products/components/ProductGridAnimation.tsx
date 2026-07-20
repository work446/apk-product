'use client'

import { motion } from 'framer-motion'
import React from 'react'

export const ProductGridContainer = ({ 
  children, 
  className,
  animationKey
}: { 
  children: React.ReactNode
  className?: string
  animationKey?: string
}) => {
  return (
    <motion.div
      key={animationKey}
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const ProductGridItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="h-full"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
