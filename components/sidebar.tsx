"use client"

import { useState } from "react"
import { Home, BookOpen, FileText, Sparkles, ChevronDown, ChevronRight, PlayCircle } from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const tracksData = [
  {
    id: "track-1",
    title: "Introduction to Design",
    lessons: [
      { id: "1.1", title: "Understanding the Grid System", completed: true },
      { id: "1.2", title: "Typography Basics", completed: true },
      { id: "1.3", title: "Color Theory", completed: false },
    ]
  },
  {
    id: "track-2",
    title: "Advanced Techniques",
    lessons: [
      { id: "2.1", title: "Responsive Design", completed: false },
      { id: "2.2", title: "Animations", completed: false },
      { id: "2.3", title: "Accessibility", completed: false },
    ]
  },
  {
    id: "track-3",
    title: "Real World Projects",
    lessons: [
      { id: "3.1", title: "E-commerce Website", completed: false },
      { id: "3.2", title: "Mobile App Design", completed: false },
    ]
  }
]

const resourcesData = [
  { id: "r1", name: "Track Syllabus.pdf", type: "PDF", size: "2.4 MB" },
  { id: "r2", name: "Design Assets.zip", type: "ZIP", size: "15.8 MB" },
  { id: "r3", name: "Cheat Sheet.pdf", type: "PDF", size: "1.2 MB" },
  { id: "r4", name: "Video Recordings", type: "Folder", size: "245 MB" },
]

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"home" | "tracks" | "resources" | "tools">("tracks")
  const [expandedTracks, setExpandedTracks] = useState<string[]>(["track-1"])
  const [selectedLesson, setSelectedLesson] = useState<string>("1.1")

  const toggleTrack = (trackId: string) => {
    setExpandedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }

  const handleTabClick = (tab: "home" | "tracks" | "resources" | "tools") => {
    setActiveTab(tab)
    if (!open) setOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Close Button - Show when open */}
      {open && (
        <div className="flex items-center justify-end px-4 pt-2 pb-2">
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Close sidebar"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation with inline content - Full Width */}
      {open && (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex flex-col p-4 pt-2">
          {/* Home Button */}
          <button
            onClick={() => handleTabClick("home")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
              activeTab === "home" 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          
          {/* Home Content */}
          {activeTab === "home" && (
            <div className="mt-3 mb-4 px-2 space-y-2">
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Track Overview</div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Design Thinking Fundamentals</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">40%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gray-600 dark:bg-gray-500 h-1.5 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Study Time This Week</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">2h 34m</div>
              </div>
            </div>
          )}

          {/* Tracks Button */}
          <button
            onClick={() => handleTabClick("tracks")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
              activeTab === "tracks" 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen size={18} />
            <span>Tracks</span>
          </button>

          {/* Tracks Content */}
          {activeTab === "tracks" && (
            <div className="mt-3 mb-4 px-2">
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
                {tracksData.map((track, index) => {
                  const completedCount = track.lessons.filter(l => l.completed).length
                  const totalCount = track.lessons.length
                  
                  return (
                    <div key={track.id} className={index < tracksData.length - 1 ? 'border-b border-gray-300 dark:border-gray-700' : ''}>
                      <button
                        onClick={() => toggleTrack(track.id)}
                        className="w-full px-3 py-3 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-gray-400 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">{index + 1}</span>
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 pr-2">{track.title}</h4>
                              {expandedTracks.includes(track.id) ? (
                                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <ChevronRight size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {totalCount} lessons • {completedCount} completed
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      {expandedTracks.includes(track.id) && (
                        <div className="bg-gray-50 dark:bg-gray-900/30 px-3 pb-3 pt-1">
                          {track.lessons.map((lesson, lessonIndex) => (
                            <button
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lesson.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors rounded-lg mb-1 ${
                                selectedLesson === lesson.id 
                                  ? 'bg-gray-200 dark:bg-gray-700 shadow-sm' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                                  lesson.completed 
                                    ? 'bg-gray-500 dark:bg-gray-600 border-gray-500 dark:border-gray-600' 
                                    : selectedLesson === lesson.id
                                    ? 'bg-gray-300 dark:bg-gray-700 border-gray-500 dark:border-gray-500'
                                    : 'bg-transparent border-gray-400 dark:border-gray-600'
                                }`}>
                                  {lesson.completed ? (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : selectedLesson === lesson.id ? (
                                    <PlayCircle size={14} className="text-gray-600 dark:text-gray-400" />
                                  ) : (
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{lessonIndex + 1}</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium truncate ${
                                    lesson.completed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
                                  }`}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {lesson.completed ? 'Completed' : selectedLesson === lesson.id ? 'In Progress' : '15 min'}
                                    </p>
                                    {selectedLesson === lesson.id && !lesson.completed && (
                                      <span className="px-1.5 py-0.5 bg-gray-400 dark:bg-gray-600 text-white text-[10px] font-medium rounded">
                                        CURRENT
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {selectedLesson === lesson.id && (
                                <div className="w-1 h-8 bg-gray-600 dark:bg-gray-500 rounded-full flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Resources Button */}
          <button
            onClick={() => handleTabClick("resources")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
              activeTab === "resources" 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FileText size={18} />
            <span>Resources</span>
          </button>

          {/* Resources Content */}
          {activeTab === "resources" && (
            <div className="mt-3 mb-4 px-2 space-y-2">
              {resourcesData.map((resource) => (
                <button
                  key={resource.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  <FileText size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{resource.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {resource.type} • {resource.size}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Tools Button */}
          <button
            onClick={() => handleTabClick("tools")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
              activeTab === "tools" 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sparkles size={18} />
            <span>Tools</span>
          </button>

          {/* Tools Content */}
          {activeTab === "tools" && (
            <div className="mt-3 mb-4 px-2 space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm text-gray-900 dark:text-gray-100">Notes</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Take notes while learning</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm text-gray-900 dark:text-gray-100">Flashcards</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Review key concepts</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm text-gray-900 dark:text-gray-100">Bookmarks</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Save important lessons</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Collapsed Icons - Show when closed */}
      {!open && (
        <div className="flex flex-col items-center pt-12 pb-4 gap-2">
          <button
            onClick={() => handleTabClick("home")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              activeTab === "home" 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
            }`}
            title="Home"
          >
            <Home size={20} />
          </button>
          <button
            onClick={() => handleTabClick("tracks")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              activeTab === "tracks" 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
            }`}
            title="Tracks"
          >
            <BookOpen size={20} />
          </button>
          <button
            onClick={() => handleTabClick("resources")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              activeTab === "resources" 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
            }`}
            title="Resources"
          >
            <FileText size={20} />
          </button>
          <button
            onClick={() => handleTabClick("tools")}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              activeTab === "tools" 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
            }`}
            title="Tools"
          >
            <Sparkles size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
