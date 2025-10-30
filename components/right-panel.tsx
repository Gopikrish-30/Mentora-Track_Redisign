"use client";

import { Sparkles, FileText, Zap } from "lucide-react";
import ChatPanel from "./chat-panel";
import dynamic from 'next/dynamic';

const UnifiedNotepad = dynamic(() => import('./unified-notepad'), {
  ssr: false,
});

interface RightPanelProps {
  width: number;
  onClose: () => void;
  trackId: string;
  activeFeature: "chat" | "notepad" | "resources" | "ai-tools";
}

export default function RightPanel({ width, onClose, trackId, activeFeature }: RightPanelProps) {
  return (
    <div
      className="flex flex-col h-full bg-gray-200 dark:bg-[#2a2a2a] rounded-3xl overflow-hidden"
      style={{
        width: `${width}px`,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.15), 0 12px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Content Area */}
      <div className="flex-1 overflow-hidden h-full">
        {activeFeature === "chat" && (
          <div className="h-full">
            <ChatPanel scrolled={false} onClose={onClose} width={width} />
          </div>
        )}

        {activeFeature === "notepad" && (
          <div className="h-full bg-white dark:bg-[#1f1f1f] relative">
            <UnifiedNotepad trackId={trackId} embedded={true} onClose={onClose} />
          </div>
        )}

        {activeFeature === "resources" && (
          <div className="h-full overflow-auto bg-white dark:bg-[#343541]">
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between z-10">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Course Resources</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              
              {/* Downloads */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Track Syllabus</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PDF • 2.4 MB</p>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Lesson 1 Slides</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PPTX • 5.1 MB</p>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Exercise Workbook</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PDF • 1.8 MB</p>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">External Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="block px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    📖 Recommended Reading List
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    🎥 Supplementary Video Tutorials
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    🔗 Community Discussion Forum
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === "ai-tools" && (
          <div className="h-full overflow-auto bg-white dark:bg-[#343541]">
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between z-10">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">AI-Powered Tools</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              
              <div className="space-y-3">
                <button className="w-full bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Generate Summary</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get AI-powered lesson summary</p>
                    </div>
                  </div>
                </button>

                <button className="w-full bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quick Quiz</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Test your understanding</p>
                    </div>
                  </div>
                </button>

                <button className="w-full bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Create Flashcards</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Auto-generate study cards</p>
                    </div>
                  </div>
                </button>

                <button className="w-full bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Explain Concept</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get detailed explanations</p>
                    </div>
                  </div>
                </button>

                <button className="w-full bg-white dark:bg-[#1f1f1f] rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Practice Problems</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generate practice exercises</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
