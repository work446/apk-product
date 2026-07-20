import React from 'react'
import { Settings, ShieldCheck, ShieldAlert } from 'lucide-react'

export const CategoryHeader = ({
  title,
  description,
  locale,
}: {
  title: string
  description?: string
  locale: string
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-2 mt-4 px-4 md:px-6 lg:px-8">
      {/* Left Text */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description ||
            (locale === 'vi'
              ? 'Khám phá các thiết bị phòng cháy chữa cháy chất lượng cao của chúng tôi.'
              : 'Explore our range of high-quality fire safety equipment.')}
        </p>
      </div>

      {/* Right Feature Badges */}
      <div className="flex items-center bg-white border border-gray-100 rounded-xl overflow-hidden shrink-0">
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 px-4 sm:px-6">
          <Settings className="w-6 h-6 text-[#d81e28] mb-1 sm:mb-2" />
          <span className="text-[10px] sm:text-xs font-bold text-gray-700 text-center uppercase tracking-wide leading-tight">
            2 Year
            <br />
            Warranty
          </span>
        </div>
        <div className="w-[1px] h-12 bg-gray-100" />
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 px-4 sm:px-6">
          <ShieldCheck className="w-6 h-6 text-[#d81e28] mb-1 sm:mb-2" />
          <span className="text-[10px] sm:text-xs font-bold text-gray-700 text-center uppercase tracking-wide leading-tight">
            Certified
            <br />
            Products
          </span>
        </div>
        <div className="w-[1px] h-12 bg-gray-100" />
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 px-4 sm:px-6">
          <ShieldAlert className="w-6 h-6 text-[#d81e28] mb-1 sm:mb-2" />
          <span className="text-[10px] sm:text-xs font-bold text-gray-700 text-center uppercase tracking-wide leading-tight">
            Reliable
            <br />
            Performance
          </span>
        </div>
      </div>
    </div>
  )
}
