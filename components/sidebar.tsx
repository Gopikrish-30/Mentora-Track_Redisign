"use client"

import { BookOpen, FileText, Settings, LogOut } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const topItems = [
    { icon: BookOpen, label: "Modules", id: "modules" },
    { icon: FileText, label: "Resources", id: "resources" },
  ]

  const bottomItems = [
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: LogOut, label: "Exit", id: "exit" },
  ]

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 flex flex-col transition-all duration-300 overflow-hidden flex-1 ${open ? "w-64" : "w-16"}`}
    >
      {/* Top Navigation Items */}
      <div className="flex-1 flex flex-col py-4">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setExpandedItem(expandedItem === item.id ? null : item.id)
              setOpen(!open)
            }}
            className="px-4 py-3 flex items-center gap-4 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 group"
          >
            <item.icon size={20} className="flex-shrink-0" />
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}

        {/* Expandable Content */}
        {open && expandedItem && (
          <div className="mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200">
            {expandedItem === "modules" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 uppercase">Modules</p>
                <div className="space-y-1">
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    Module 1: Basics
                  </div>
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    Module 2: Advanced
                  </div>
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    Module 3: Practice
                  </div>
                </div>
              </div>
            )}
            {expandedItem === "resources" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 uppercase">Resources</p>
                <div className="space-y-1">
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    PDF Guide
                  </div>
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    Video Tutorials
                  </div>
                  <div className="text-sm text-gray-700 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer">
                    Templates
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation Items */}
      <div className="border-t border-gray-200 py-4 flex flex-col gap-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="px-4 py-3 flex items-center gap-4 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
            title={item.label}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
