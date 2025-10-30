"use client"

import { useState } from "react"
import { Send, MessageCircle, FileText, X } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  text: string
  timestamp: string
}

interface ChatPanelProps {
  scrolled?: boolean
  onClose?: () => void
  width?: number
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "user",
      text: "Can you explain the main concept of this lesson?",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      type: "bot",
      text: "Of course! The main concept revolves around understanding user needs through empathy and research. This forms the foundation of effective design thinking.",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      type: "user",
      text: "How do I apply this in real projects?",
      timestamp: "2:32 PM",
    },
    {
      id: 4,
      type: "bot",
      text: "Start by conducting user interviews, creating empathy maps, and documenting your findings. Then use these insights to define problem statements.",
      timestamp: "2:32 PM",
    },
  ])

  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        text: input,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages([...messages, newMessage])
      setInput("")
    }
  }

  return (
    <div
      className="flex flex-col overflow-hidden flex-shrink-0 h-full w-full"
    >
      {/* Compact Header */}
      <div className="px-5 py-2.5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500 dark:text-gray-400" title="Attach">
            <FileText size={16} />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500 dark:text-gray-400">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages - More space */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-white dark:bg-[#343541] custom-scrollbar">
        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}>
            <div className={`${message.type === "user" ? "max-w-[85%]" : "w-full"}`}>
              <div
                className={`${
                  message.type === "user"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl rounded-br-md px-5 py-3.5"
                    : "text-gray-800 dark:text-gray-200 px-0"
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
              {message.type === "bot" && (
                <button className="mt-2.5 px-0 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Input */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1f1f1f]">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-[#343541] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
