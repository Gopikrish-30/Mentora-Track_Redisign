"use client"

interface LessonContentProps {
  scrolled?: boolean
}

export default function LessonContent({ scrolled = false }: LessonContentProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200">
      <div
        className={`transition-all duration-300 ${scrolled ? "max-w-6xl" : "max-w-5xl"} mx-auto ${scrolled ? "px-20 py-12" : "px-16 py-10"}`}
      >
        {/* Lesson Content */}
        <div className="space-y-10">
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h3
                className={`font-bold text-gray-900 mb-3 transition-all duration-300 ${scrolled ? "text-4xl" : "text-3xl"}`}
              >
                Style Directions Samples
              </h3>
              <p className={`text-gray-600 mb-6 transition-all duration-300 ${scrolled ? "text-lg" : "text-base"}`}>
                Recap style direction according to standard execution
              </p>
            </div>

            <p
              className={`text-gray-700 leading-relaxed transition-all duration-300 ${scrolled ? "text-xl" : "text-lg"}`}
            >
              Crafting a style direction is an essential aspect of design and branding that demands careful
              consideration and meticulous planning. At its core, this directive should be a mirror reflecting the
              aspirations and objectives of your brand or application. It encapsulates the very essence of your entity,
              conveying its purpose, identity, and values to your audience. Whether you seek to project professionalism,
              creativity, or approachability, the style direction acts as the visual language through which your brand
              communicates, creating a cohesive and memorable digital identity.
            </p>

            <p
              className={`text-gray-700 leading-relaxed transition-all duration-300 ${scrolled ? "text-xl" : "text-lg"}`}
            >
              However, a successful style direction goes beyond mere self-expression. It requires a deep understanding
              of your target audience, their preferences, and the context in which your brand operates. By carefully
              considering these factors, you can create a style direction that not only reflects your brand's values but
              also resonates with your audience on an emotional level.
            </p>

            <p
              className={`text-gray-700 leading-relaxed transition-all duration-300 ${scrolled ? "text-xl" : "text-lg"}`}
            >
              The process involves extensive research, iterative refinement, and collaboration across teams to ensure
              consistency and alignment with your brand's strategic goals. From typography and color palettes to imagery
              and layout principles, every element should work harmoniously to tell your story.
            </p>

            {/* Example Section */}
            <div className="mt-12 pt-10 border-t border-gray-200">
              <h4
                className={`font-bold text-gray-900 mb-6 transition-all duration-300 ${scrolled ? "text-2xl" : "text-xl"}`}
              >
                Example of a 12-Column Grid
              </h4>
              <div className="bg-amber-50 rounded-xl p-10 border border-gray-200 flex items-center justify-center min-h-56">
                <div className="flex gap-6">
                  <div className="w-24 h-40 bg-blue-200 rounded-lg" />
                  <div className="w-24 h-40 bg-gray-300 rounded-lg" />
                  <div className="w-24 h-40 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
