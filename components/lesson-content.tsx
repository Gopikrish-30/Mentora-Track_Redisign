"use client"

import { BookOpen, PlayCircle, FileText, Maximize2 } from "lucide-react"

interface LessonContentProps {
  onFullscreen?: () => void
}

export default function LessonContent({ onFullscreen }: LessonContentProps) {
  return (
    <div className="flex-1 bg-white dark:bg-[#343541]">
      <div className="py-10 space-y-8">
        {/* Lesson Indicator */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">LESSON 1.1</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Understanding the Grid System</h2>
            </div>
          </div>
          {onFullscreen && (
            <button
              onClick={onFullscreen}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Enter Fullscreen Mode"
            >
              <Maximize2 size={18} />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
              Style Directions Samples
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Recap style direction according to standard execution
            </p>
          </div>

          <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base leading-loose">
            <p>
              Crafting a style direction is an essential aspect of design and branding that demands careful
              consideration and meticulous planning. At its core, this directive should be a mirror reflecting the
              aspirations and objectives of your brand or application. It encapsulates the very essence of your entity,
              conveying its purpose, identity, and values to your audience.
            </p>

            <p>
              Whether you seek to project professionalism, creativity, or approachability, the style direction acts 
              as the visual language through which your brand communicates, creating a cohesive and memorable digital identity.
            </p>
          </div>
        </div>

        {/* Key Concepts Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Key Concepts
          </h2>
          <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base leading-loose">
            <p>
              However, a successful style direction goes beyond mere self-expression. It requires a deep understanding
              of your target audience, their preferences, and the context in which your brand operates. By carefully
              considering these factors, you can create a style direction that not only reflects your brand&apos;s values but
              also resonates with your audience on an emotional level.
            </p>
            <p>
              The process involves extensive research, iterative refinement, and collaboration across teams to ensure
              consistency and alignment with your brand&apos;s strategic goals. From typography and color palettes to imagery
              and layout principles, every element should work harmoniously to tell your story.
            </p>
          </div>
        </div>

        {/* Example Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Example of a 12-Column Grid
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-16 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-8 justify-center">
              <div className="w-24 h-36 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600" />
              <div className="w-24 h-36 bg-gray-600 dark:bg-gray-500 rounded-xl shadow-md" />
              <div className="w-24 h-36 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600" />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5">
            <PlayCircle size={26} className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Video Tutorial</h2>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-20 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-600 dark:bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors cursor-pointer">
                <PlayCircle size={36} className="text-white" />
              </div>
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg">Grid System Fundamentals</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Duration: 12:34 minutes</p>
            </div>
          </div>
        </div>

        {/* Additional Example */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Advanced Grid Layout
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-loose mb-8">
            The process involves extensive research, iterative refinement, and collaboration across teams to ensure
            consistency and alignment with your brand&apos;s strategic goals. From typography and color palettes to imagery
            and layout principles, every element should work harmoniously to tell your story.
          </p>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-16 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-8 justify-center">
              <div className="w-28 h-44 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600" />
              <div className="w-28 h-44 bg-gray-600 dark:bg-gray-500 rounded-2xl shadow-md" />
              <div className="w-28 h-44 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600" />
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="pt-10 mt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 dark:border-gray-600">
                <FileText size={26} className="text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Ready for the next step?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  You&apos;ve completed this lesson. Test your knowledge with a quick quiz or continue to the next lesson.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors shadow-sm">
                    Take Quiz
                  </button>
                  <button className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-2 border-gray-200 dark:border-gray-600">
                    Next Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
