import React from 'react'

export const ProductsSkeleton = () => {
  return (
    <>
      {/* Sidebar Skeleton (hidden on small screens, visible on lg) */}
      <div className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-gray-200 bg-white min-h-screen p-6">
        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 w-full bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="flex-1 w-full min-w-0 flex flex-col pt-12 pb-24 px-4 md:px-6 lg:px-8">
        {/* Category Header Skeleton */}
        <div className="w-full max-w-4xl mb-12">
          <div className="h-10 md:h-12 w-2/3 bg-gray-200 animate-pulse rounded-md mb-4" />
          <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded-md" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col h-[380px] bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse"
            >
              {/* Image Placeholder */}
              <div className="w-full h-[200px] sm:h-[220px] bg-gray-100" />
              
              {/* Content Placeholder */}
              <div className="flex flex-col flex-1 p-5">
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
                <div className="h-6 w-full bg-gray-200 rounded mb-2" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-6" />
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="h-5 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
