"use client"

import { Share2 } from "lucide-react"

interface HeaderProps {
  collapsed?: boolean
}

export default function Header({ collapsed = false }: HeaderProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 px-8 transition-all duration-300 ${collapsed ? "py-3" : "py-8"}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className={`font-bold text-gray-900 transition-all duration-300 ${collapsed ? "text-xl" : "text-4xl"}`}>
              Design Thinking Fundamentals
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 flex-shrink-0">
              <Share2 size={collapsed ? 20 : 24} />
            </button>
          </div>
          {!collapsed && (
            <div className="flex items-center gap-4 mt-4 text-base text-gray-600">
              <span className="flex items-center gap-2">
                <span>📚</span> 5 Lessons
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span>⏱️</span> 8hr 24min
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span>⭐</span> 4.8 (244 reviews)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
