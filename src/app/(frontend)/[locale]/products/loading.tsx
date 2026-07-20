import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Loading() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-[#f9fafb]">
        {/* Skeleton Sidebar (Visible on LG) */}
        <div className="hidden lg:flex w-[260px] shrink-0 border-r border-gray-100 bg-white p-4 flex-col gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-4 mt-2"></div>
          
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 w-full py-4 px-2 rounded-md bg-gray-50/30">
              <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse shrink-0"></div>
              <div className={`h-3 bg-gray-200 rounded animate-pulse ${i % 3 === 0 ? 'w-24' : i % 2 === 0 ? 'w-32' : 'w-28'}`}></div>
            </div>
          ))}
          
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-4 mt-6"></div>
          
          {[...Array(3)].map((_, i) => (
            <div key={`link-${i}`} className="flex items-center gap-3 w-full py-4 px-2 rounded-md bg-gray-50/30">
              <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse shrink-0"></div>
              <div className={`h-3 bg-gray-200 rounded animate-pulse ${i % 2 === 0 ? 'w-20' : 'w-28'}`}></div>
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 ease-in-out">
          
          {/* Skeleton Category Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-2 mt-8 px-4 md:px-6 lg:px-8">
            <div className="flex-1 w-full max-w-2xl">
              <div className="h-8 md:h-10 w-64 md:w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="h-[90px] w-24 sm:w-28 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-[90px] w-24 sm:w-28 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-[90px] w-24 sm:w-28 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
          
          <div className="px-4 md:px-6 lg:px-8 w-full pb-12 pt-2">
            {/* Skeleton Search and Filter (Mobile only) */}
            <div className="flex items-center justify-start gap-2 w-full mb-6 lg:hidden mt-4">
              <div className="h-11 w-full sm:w-72 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-11 w-11 shrink-0 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Skeleton Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6 lg:mt-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col h-full bg-white border border-gray-100 rounded-lg overflow-hidden p-5">
                  <div className="w-full h-[200px] sm:h-[220px] bg-gray-50 rounded-md animate-pulse mb-5"></div>
                  
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                  
                  <div className="flex flex-col gap-2.5 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
                      <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
                      <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
                      <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
