"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import Sidebar from "@/components/sidebar"
import LessonBar from "@/components/lesson-bar"
import LessonContent from "@/components/lesson-content"
import ChatPanel from "@/components/chat-panel"

export default function CoursePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [chatWidth, setChatWidth] = useState(320)
  const [isDragging, setIsDragging] = useState(false)
  const lastScrollTop = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const isScrollingDown = scrollTop > lastScrollTop.current

    if (isScrollingDown && scrollTop > 100) {
      setHeaderVisible(false)
    } else if (!isScrollingDown) {
      setHeaderVisible(true)
    }

    lastScrollTop.current = scrollTop
    setScrolled(scrollTop > 50)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newWidth = window.innerWidth - e.clientX - 12
      if (newWidth > 280 && newWidth < 600) {
        setChatWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="flex h-screen bg-gray-50 gap-3 p-3">
      {/* Left Sidebar Column */}
      <div className="flex flex-col gap-3">
        {/* Logo - Separate from sidebar */}
        <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0">
          <div className="w-10 h-10 bg-red-500 rounded-full" />
        </div>

        {/* Left Sidebar - Now same height as right sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Title Bar */}
        {headerVisible && (
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Design Thinking Fundamentals</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 ml-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 flex gap-3 overflow-hidden">
          {/* Left Content Column */}
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto" ref={contentRef} onScroll={handleScroll}>
            {/* Lesson Bar */}
            <LessonBar scrolled={scrolled} />

            {/* Lesson Content - minimal gap */}
            <LessonContent scrolled={scrolled} />
          </div>

          {/* Right Chat Panel - Collapsible with draggable resize */}
          {chatOpen ? (
            <>
              <div
                onMouseDown={handleMouseDown}
                className={`w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors flex-shrink-0 user-select-none ${
                  isDragging ? "bg-blue-400" : ""
                }`}
              />
              <ChatPanel scrolled={scrolled} onClose={() => setChatOpen(false)} width={chatWidth} />
            </>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 flex flex-col items-center py-4 gap-3 flex-shrink-0 w-16">
              <button
                onClick={() => setChatOpen(true)}
                className="p-3 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                title="Open chat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <div className="w-12 h-px bg-gray-200" />
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Pen">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Zap">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Eye">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Notes">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              <button
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                title="Accessibility"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
