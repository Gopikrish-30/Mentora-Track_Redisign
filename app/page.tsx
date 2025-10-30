
"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Sidebar from "@/components/sidebar"
import LessonContent from "@/components/lesson-content"
import RightPanel from "@/components/right-panel"

export default function TrackPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [activeFeature, setActiveFeature] = useState<"chat" | "notepad" | "resources" | "ai-tools">("chat")
  const [panelWidth, setPanelWidth] = useState(480)
  const [isDragging, setIsDragging] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [readMode, setReadMode] = useState(false)
  const [fullscreenZoom, setFullscreenZoom] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const fullscreenContentRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = () => {
    if (contentRef.current) {
      const scrolled = contentRef.current.scrollTop > 50
      setIsScrolled(scrolled)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    
    // Disable text selection globally
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
    document.body.style.cursor = 'col-resize'
    
    // Add no-select class to html
    document.documentElement.classList.add('select-none')
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      e.stopPropagation()

      // Calculate new width in real-time
      const newWidth = window.innerWidth - e.clientX - 12
      // Set minimum width based on active feature - notepad needs more space
      const minWidth = activeFeature === "notepad" ? 600 : 280
      if (newWidth >= minWidth && newWidth <= 900) {
        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
          setPanelWidth(newWidth)
        })
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault()
      setIsDragging(false)
      
      // Re-enable text selection
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.cursor = ''
      document.documentElement.classList.remove('select-none')
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, { passive: false })
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("mouseleave", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [isDragging])

  // Enter browser fullscreen mode
  const enterFullscreen = async () => {
    try {
      setReadMode(true)
      // Request fullscreen on the document element
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        await (document.documentElement as any).webkitRequestFullscreen()
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        await (document.documentElement as any).mozRequestFullScreen()
      } else if ((document.documentElement as any).msRequestFullscreen) {
        await (document.documentElement as any).msRequestFullscreen()
      }
    } catch (err) {
      console.error('Error entering fullscreen:', err)
    }
  }

  // Exit fullscreen mode
  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      }
      setReadMode(false)
    } catch (err) {
      console.error('Error exiting fullscreen:', err)
      setReadMode(false)
    }
  }

  // Listen for fullscreen changes (user pressing ESC or F11)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && readMode) {
        setReadMode(false)
        setFullscreenZoom(1) // Reset zoom when exiting
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [readMode])

  // Handle zoom in fullscreen with Ctrl/Cmd + Mouse Wheel
  useEffect(() => {
    if (!readMode) return

    let zoomTimeout: NodeJS.Timeout | null = null

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        
        // Clear any pending zoom update
        if (zoomTimeout) {
          clearTimeout(zoomTimeout)
        }

        // Smaller increments for smoother zoom: 3% per scroll
        const delta = e.deltaY > 0 ? -0.03 : 0.03
        
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
          setFullscreenZoom(prev => {
            const newZoom = prev + delta
            // Zoom range: 100% (1.0) to 200% (2.0) - no zoom out below default
            return Math.max(1.0, Math.min(2.0, Math.round(newZoom * 100) / 100))
          })
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (zoomTimeout) clearTimeout(zoomTimeout)
    }
  }, [readMode])

  // Handle trackpad pinch zoom in fullscreen
  useEffect(() => {
    if (!readMode) return

    let initialDistance = 0
    let initialZoom = fullscreenZoom

    const getTouchDistance = (touches: TouchList) => {
      if (touches.length < 2) return 0
      const touch1 = touches[0]
      const touch2 = touches[1]
      return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        initialDistance = getTouchDistance(e.touches)
        initialZoom = fullscreenZoom
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const currentDistance = getTouchDistance(e.touches)
        if (initialDistance > 0) {
          const scale = currentDistance / initialDistance
          // Apply zoom range: 100% (1.0) to 200% (2.0) - no zoom out below default
          setFullscreenZoom(Math.max(1.0, Math.min(2.0, initialZoom * scale)))
        }
      }
    }

    const handleTouchEnd = () => {
      initialDistance = 0
    }

    const container = fullscreenContentRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [readMode, fullscreenZoom])

  return (
    <>
      {/* Read Mode Fullscreen View - Takes entire browser window */}
      {readMode && (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-[#343541] overflow-auto" style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          touchAction: 'pan-x pan-y'
        }}>
          {/* Floating Toolbar - Top Center */}
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center gap-1">
              {/* Pen Tool */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Pen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>

              {/* Highlighter */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Highlighter"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </button>

              {/* Eraser */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Eraser"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

              {/* Bookmark */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Bookmark"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              {/* Notes */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Notes"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                  title="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}

              {/* Exit Fullscreen */}
              <button
                onClick={exitFullscreen}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                title="Exit Fullscreen (ESC)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Read Mode Content - Wider and Optimized for Reading */}
          <div 
            ref={fullscreenContentRef}
            className="w-full min-h-full"
            style={{
              zoom: fullscreenZoom,
              WebkitTransform: `scale(${fullscreenZoom})`,
              WebkitTransformOrigin: '0 0',
              MozTransform: `scale(${fullscreenZoom})`,
              MozTransformOrigin: '0 0',
              touchAction: 'pan-x pan-y',
              willChange: 'zoom, transform',
              transition: 'zoom 0.1s ease-out',
              WebkitTransition: '-webkit-transform 0.1s ease-out',
              MozTransition: '-moz-transform 0.1s ease-out'
            }}
          >
            <div className="max-w-6xl mx-auto px-16 py-16 pt-24">
              <LessonContent />
            </div>
          </div>
        </div>
      )}

    <div className="flex h-screen bg-white dark:bg-[#1a1a1a] transition-colors">{readMode ? ' hidden' : ''}

      <div 
        className={
          "flex flex-col bg-gray-200 dark:bg-[#2a2a2a] transition-all duration-300 ease-in-out " + 
          (sidebarOpen ? "w-72" : "w-16")
        }
      >
        {/* Logo Header */}
        <div className={`flex items-center px-4 gap-3 flex-shrink-0 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          <div className="w-9 h-9 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">LearnHub</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Learn Smarter</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        {!sidebarOpen && (
          <div className="py-4 flex flex-col items-center gap-3 bg-gray-200 dark:bg-[#2a2a2a] border-t border-gray-300 dark:border-gray-800">
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 rounded-lg" 
                  title="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 rounded-lg group relative" title="Settings">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 rounded-lg" title="Help">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="w-8 h-px bg-gray-300 dark:bg-gray-700 my-1"></div>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 rounded-lg" title="Logout">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar - expands when at top, shrinks when scrolled */}
        <div className={`bg-gray-200 dark:bg-[#2a2a2a] flex items-center px-8 flex-shrink-0 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Design Thinking Fundamentals
                </h1>
                <span className="px-2.5 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-full">
                  In Progress
                </span>
              </div>
              {!isScrolled && (
                <div className="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400 border-l border-gray-400 dark:border-gray-600 pl-6">
                  <div className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium">5 Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">8hr 24min</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 fill-gray-400 stroke-gray-500" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="font-medium">4.8 <span className="text-gray-500">(244)</span></span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={enterFullscreen}
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-400 dark:border-gray-600"
                title="Read Mode - Browser Fullscreen"
              >
                <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Fullscreen
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              <button className="p-2.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-400 dark:border-gray-600" title="Bookmark">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors" title="More options">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
              <div className="w-px h-8 bg-gray-400 mx-1"></div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow" title="Profile">
                AB
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 flex gap-2 overflow-hidden bg-gray-200 dark:bg-[#2a2a2a] pt-1 px-1 pb-3">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-[#343541] rounded-3xl custom-scrollbar relative" style={{
              boxShadow: rightPanelOpen 
                ? '0 0 0 1px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.15), 0 12px 32px rgba(0,0,0,0.12)'
                : '0 0 0 1px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)'
            }} ref={contentRef} onScroll={handleScroll}>
              {/* Lesson Content with integrated title */}
              <div className="w-full max-w-5xl mx-auto px-8">
                <LessonContent onFullscreen={enterFullscreen} />
              </div>
            </div>

            {/* Right Panel - Collapsible with draggable resize */}
            {rightPanelOpen && (
              <div className="flex flex-shrink-0 gap-3">
                <div
                  onMouseDown={handleMouseDown}
                  className={`w-1 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700 cursor-col-resize flex-shrink-0 select-none relative ${
                    isDragging ? "bg-gray-400 dark:bg-gray-600" : ""
                  }`}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                >
                  <div className="absolute inset-y-0 -left-2 -right-2" />
                </div>
                <div 
                  className={`${isDragging ? 'pointer-events-none select-none' : ''}`} 
                  style={{ 
                    width: `${panelWidth}px`, 
                    userSelect: isDragging ? 'none' : 'auto', 
                    WebkitUserSelect: isDragging ? 'none' : 'auto',
                    transition: isDragging ? 'none' : 'width 0.3s ease',
                  }}
                >
                                  {rightPanelOpen && (
                  <RightPanel 
                    width={panelWidth}
                    onClose={() => setRightPanelOpen(false)}
                    trackId="design-thinking-fundamentals"
                    activeFeature={activeFeature}
                  />
                )}
                </div>
              </div>
            )}
            
            {!rightPanelOpen && (
              <div className="flex flex-col items-center w-16 h-full bg-white dark:bg-[#343541] rounded-3xl shadow-sm pt-4">
                <div className="pt-0 pb-4 flex flex-col items-center gap-3 w-full">
                <button
                  onClick={() => {
                    setActiveFeature("chat");
                    setRightPanelOpen(true);
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-blue-600"
                  title="AI Assistant"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    setActiveFeature("notepad");
                    setRightPanelOpen(true);
                    setPanelWidth(700); // Set default width for notepad
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-gray-600" 
                  title="Notepad"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    setActiveFeature("resources");
                    setRightPanelOpen(true);
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-gray-600" 
                  title="Resources"
                >
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
                  onClick={() => {
                    setActiveFeature("ai-tools");
                    setRightPanelOpen(true);
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-purple-600" 
                  title="AI Tools"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
    </>
  )
}
