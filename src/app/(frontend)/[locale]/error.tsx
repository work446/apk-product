'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#f9fafb]">
      <div className="text-center max-w-lg mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-50 p-5 rounded-full inline-block">
            <AlertCircle className="w-12 h-12 text-[#d81e28]" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Something went wrong!
        </h1>
        
        <p className="text-gray-500 mb-8">
          Đã có lỗi xảy ra. We apologize for the inconvenience. Our team has been notified of the issue.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Try again
          </button>
          
          <Link 
            href="/en"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#d81e28] hover:bg-[#b01820] transition-colors"
          >
            <Home className="mr-2 w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
