import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9fafb] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6 md:mb-8"></div>

        {/* Main Content Grid Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Gallery & Highlights Skeleton */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
              {/* Thumbnails */}
              <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 shrink-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg animate-pulse shrink-0"></div>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1 aspect-square sm:aspect-[4/3] md:aspect-square bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
            
            {/* Highlights Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-12 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full mb-3 animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="w-16 h-2 bg-gray-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info Skeleton */}
          <div className="w-full lg:w-[40%]">
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="w-2/3 h-8 md:h-10 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-red-100 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2 mt-4">
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="mb-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full animate-pulse shrink-0"></div>
                  <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex-1 h-16 bg-gray-50 rounded-lg animate-pulse"></div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="w-full h-14 bg-red-100 rounded-md animate-pulse"></div>
                <div className="w-full h-14 bg-gray-100 border-2 border-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Specifications Skeleton */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 lg:p-10">
          <div className="w-1/3 md:w-1/4 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 border-t border-gray-100 pt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-gray-100">
                <div className="w-1/3 h-5 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
