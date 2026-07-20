import Link from 'next/link'
import { FileQuestion, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#f9fafb]">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-50 p-6 rounded-full inline-block">
            <FileQuestion className="w-16 h-16 text-[#d81e28]" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Page Not Found / Không Tìm Thấy Trang
        </h2>
        
        <p className="text-gray-500 mb-8 text-lg">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist. / 
          Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có thể nó đã bị xóa hoặc không tồn tại.
        </p>
        
        <Link 
          href="/en" 
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-[#d81e28] hover:bg-[#b01820] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Back to Home
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
