'use client'

import React from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'

export const MobileFilterButton = ({ text }: { text: string }) => {
  const { toggleSidebar } = useSidebar()
  
  return (
    <button 
      onClick={toggleSidebar}
      className="lg:hidden w-full flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 text-[#d81e28] font-bold text-sm uppercase tracking-wider hover:bg-gray-50 active:scale-95 transition-all mb-6"
    >
      <Menu className="w-5 h-5" />
      {text}
    </button>
  )
}
