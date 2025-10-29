"use client"

import {
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Layers,
  Play,
  Share2,
  Sparkles,
  Users,
} from "lucide-react"

const modules = [
  {
    id: "module-1",
    title: "Module 01 · Discover",
    description: "Understand the problem space and empathize with your audience.",
    progress: 64,
    status: "In progress",
    lessons: [
      { id: "lesson-1", title: "Kickoff & Success Metrics", duration: "08 min", state: "done" },
      { id: "lesson-2", title: "Interview Frameworks", duration: "14 min", state: "current" },
      { id: "lesson-3", title: "Synthesizing Research", duration: "11 min", state: "locked" },
    ],
  },
  {
    id: "module-2",
    title: "Module 02 · Define",
    description: "Translate insights into razor-sharp problem statements.",
    progress: 38,
    status: "Queued",
    lessons: [
      { id: "lesson-4", title: "Mapping Pain Points", duration: "09 min", state: "locked" },
      { id: "lesson-5", title: "Prioritisation Scorecard", duration: "12 min", state: "locked" },
      { id: "lesson-6", title: "Creating POV Statements", duration: "16 min", state: "locked" },
    ],
  },
  {
    id: "module-3",
    title: "Module 03 · Ideate",
    description: "Generate bold ideas and frame hypotheses clearly.",
    progress: 12,
    status: "Locked",
    lessons: [
      { id: "lesson-7", title: "Ideation Warmups", duration: "06 min", state: "locked" },
      { id: "lesson-8", title: "Divergent Brainstorming", duration: "15 min", state: "locked" },
      { id: "lesson-9", title: "Idea Prioritisation", duration: "10 min", state: "locked" },
    ],
  },
]

const keyTakeaways = [
  "Anchor every design decision in a clear problem narrative.",
  "Pair qualitative interviews with lightweight quant insights for context.",
  "Use empathy maps to align the team on user emotions and behaviours.",
]

const actionSteps = [
  {
    id: "action-1",
    title: "Upload your raw interview notes",
    description: "Convert your conversations into structured insight cards for the team wall.",
  },
  {
    id: "action-2",
    title: "Draft a mission canvas",
    description: "Summarise the current challenge, target persona, and measurable outcomes.",
  },
  {
    id: "action-3",
    title: "Schedule a synthesis huddle",
    description: "Bring research partners together to cluster observations and spot opportunity areas.",
  },
]

const downloads = [
  { id: "download-1", label: "Interview Script Template", size: "1.2 MB" },
  { id: "download-2", label: "Journey Mapping Worksheet", size: "980 KB" },
  { id: "download-3", label: "Executive Snapshot Deck", size: "2.4 MB" },
]

const upcomingSessions = [
  {
    id: "session-1",
    title: "Live Coaching · Empathy Interviews",
    date: "Thursday, 11:00 AM",
    facilitator: "Carla Mendes",
  },
  {
    id: "session-2",
    title: "Peer Review Circle",
    date: "Friday, 4:30 PM",
    facilitator: "Mentora Community",
  },
]

const checklist = [
  { id: "check-1", label: "Watch the lesson video", done: true },
  { id: "check-2", label: "Complete empathy map exercise", done: false },
  { id: "check-3", label: "Log two new user interviews", done: false },
]

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-12 lg:px-8">
        <header className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                Product Design Track
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-gray-900 lg:text-4xl">Design Thinking Fundamentals</h1>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
                  Build a resilient, human-centred mindset by mastering discovery rituals, mapping needs with clarity, and
                  prototyping with intention. This module keeps momentum without overwhelming your flow.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> 4h 30m total runtime
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Updated 2 days ago
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> 1.9k learners
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>Overall progress</span>
                  <span className="text-gray-900">65%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-gray-900" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50">
                <Bookmark className="h-4 w-4" /> Save to dashboard
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50">
                <Share2 className="h-4 w-4" /> Share with cohort
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-3">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Course modules</h2>
                  <p className="text-xs text-gray-500">Track your momentum by chapter.</p>
                </div>
                <Layers className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-5 space-y-4">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 transition hover:border-gray-300"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{module.status}</p>
                        <h3 className="mt-1 text-sm font-semibold text-gray-900">{module.title}</h3>
                      </div>
                      <span className="text-xs font-medium text-gray-500">{module.progress}%</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">{module.description}</p>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-white">
                      <div
                        className="h-1.5 rounded-full bg-gray-900"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                lesson.state === "done"
                                  ? "bg-gray-400"
                                  : lesson.state === "current"
                                  ? "bg-gray-900"
                                  : "bg-gray-200"
                              }`}
                            />
                            <p className="text-xs font-medium text-gray-700">{lesson.title}</p>
                          </div>
                          <span className="text-[11px] text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900">Downloads</h2>
              <p className="text-xs text-gray-500">Polished assets to keep you unblocked.</p>
              <div className="mt-5 space-y-3">
                {downloads.map((file) => (
                  <button
                    key={file.id}
                    className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>{file.label}</span>
                    </div>
                    <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      {file.size}
                      <Download className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <main className="space-y-6 lg:col-span-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
                <div className="flex h-full items-center justify-center">
                  <button className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:border-gray-300">
                    <Play className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Current lesson</p>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900">1.2 · Interview Frameworks</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Learn how to guide open-ended conversations, capture pivotal quotes, and uncover fresh tensions with
                    confidence.
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50">
                  Continue lesson <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Lesson overview</h2>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Interview frameworks help you stay present with the person you are learning from while still
                    extracting high-signal insights. Focus on sequencing your prompts from broad to specific, then mirror
                    language back to confirm understanding.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Use the micro framework below as scaffolding: open with context, dive into stories, and finish by
                    exploring desired outcomes. Keep your pace calm—silence is often where the breakthroughs land.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <p className="mt-3 font-medium text-gray-700">Pro tip</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Ask participants to narrate a recent moment. Grounding them in specifics unlocks nuance you can act
                    on.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Key takeaways</h2>
              <div className="mt-4 space-y-4">
                {keyTakeaways.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-gray-700" />
                    <p className="text-sm leading-relaxed text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Action steps</h2>
              <div className="mt-4 space-y-4">
                {actionSteps.map((action) => (
                  <div key={action.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{action.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{action.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-6 lg:col-span-3">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Today&apos;s focus</h2>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                  03
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Momentum check: complete your interview outline and post two insights to the cohort board by 7 PM.
              </p>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900">Upcoming sessions</h2>
              <div className="mt-4 space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{session.date}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{session.title}</p>
                    <p className="mt-2 text-xs text-gray-500">Hosted by {session.facilitator}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900">Checklist</h2>
              <p className="text-xs text-gray-500">Stay aligned without losing flow.</p>
              <div className="mt-4 space-y-3">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 ${
                      item.done ? "opacity-80" : ""
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-semibold ${
                        item.done ? "border-gray-400 bg-white text-gray-600" : "border-gray-300 bg-white text-gray-500"
                      }`}
                    >
                      {item.done ? "✓" : ""}
                    </span>
                    {item.label}
                  </label>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
