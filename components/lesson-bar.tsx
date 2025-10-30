"use client"

import { ChevronLeft, ChevronRight, Bookmark, Share2, Printer, BookOpen } from "lucide-react"

interface LessonBarProps {
  scrolled?: boolean
  integrated?: boolean
}

export default function LessonBar({ integrated = false }: LessonBarProps) {
  return (
    <div
      className={`px-6 flex items-center justify-between flex-shrink-0 transition-all duration-300 ${
        integrated 
          ? `py-3.5` 
          : `bg-white border border-[#E5E7EB] shadow-[0_1px_4px_rgba(0,0,0,0.1)] py-4 rounded-xl`
      }`}
    >
      {/* Left Section - Lesson Title & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-[#6B7280]" />
          <h2 className="text-base font-semibold text-[#111827]">
            1.1: Understanding the Grid System
          </h2>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 ml-2">
          <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#6B7280]">
            <Bookmark size={18} />
          </button>
          <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#6B7280]">
            <Share2 size={18} />
          </button>
          <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#6B7280]">
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Right Section - Navigation */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#6B7280]">
          <ChevronLeft size={20} />
        </button>
        <button className="w-9 h-9 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
