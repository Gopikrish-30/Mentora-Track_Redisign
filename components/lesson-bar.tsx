"use client"

import { ChevronLeft, ChevronRight, Bookmark, Share2, Printer, BookOpen } from "lucide-react"

interface LessonBarProps {
  scrolled?: boolean
}

export default function LessonBar({ scrolled = false }: LessonBarProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 px-8 flex items-center justify-between flex-shrink-0 transition-all duration-300 ${scrolled ? "py-4" : "py-5"}`}
    >
      {/* Left Section - Lesson Title & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <BookOpen size={scrolled ? 22 : 24} className="text-gray-600" />
          <h2 className={`font-bold text-gray-900 transition-all duration-300 ${scrolled ? "text-lg" : "text-xl"}`}>
            1.1: Understanding the Grid System
          </h2>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Bookmark size={scrolled ? 20 : 22} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Share2 size={scrolled ? 20 : 22} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Printer size={scrolled ? 20 : 22} />
          </button>
        </div>
      </div>

      {/* Right Section - Navigation */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
          <ChevronLeft size={scrolled ? 22 : 24} />
        </button>
        <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={scrolled ? 20 : 22} />
        </button>
      </div>
    </div>
  )
}
