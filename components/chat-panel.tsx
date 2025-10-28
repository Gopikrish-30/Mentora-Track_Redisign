"use client"

import { useState } from "react"
import { Send, MessageCircle, FileText, Pen, Zap, Eye, Accessibility, X } from "lucide-react"

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

export default function ChatPanel({ scrolled = false, onClose, width = 320 }: ChatPanelProps) {
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
      className={`bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden flex-shrink-0 transition-all duration-300`}
      style={{ width: `${width}px` }}
    >
      {/* Tool Icons */}
      <div
        className={`px-6 border-b border-gray-200 flex items-center gap-2 justify-between transition-all duration-300 ${scrolled ? "py-5" : "py-4"}`}
      >
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Pen size={scrolled ? 20 : 18} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Zap size={scrolled ? 20 : 18} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Eye size={scrolled ? 20 : 18} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <FileText size={scrolled ? 20 : 18} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Accessibility size={scrolled ? 20 : 18} />
          </button>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
          <X size={scrolled ? 20 : 18} />
        </button>
      </div>

      {/* Header Tabs */}
      <div
        className={`px-6 border-b border-gray-200 flex gap-4 transition-all duration-300 ${scrolled ? "py-5" : "py-4"}`}
      >
        <button
          className={`flex items-center gap-2 font-medium text-gray-900 pb-3 border-b-2 border-gray-300 transition-all duration-300 ${scrolled ? "text-base" : "text-sm"}`}
        >
          <MessageCircle size={scrolled ? 18 : 16} />
          Chat
        </button>
        <button
          className={`flex items-center gap-2 font-medium text-gray-400 hover:text-gray-600 transition-all duration-300 ${scrolled ? "text-base" : "text-sm"}`}
        >
          <FileText size={scrolled ? 18 : 16} />
          Notes
        </button>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto px-6 space-y-4 transition-all duration-300 ${scrolled ? "py-5" : "py-4"}`}
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-xs ${message.type === "user" ? "flex-row-reverse" : ""}`}>
              {message.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-lg transition-all duration-300 ${scrolled ? "text-base" : "text-sm"} ${
                  message.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-2 transition-all duration-300 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`px-6 border-t border-gray-200 transition-all duration-300 ${scrolled ? "py-5" : "py-4"}`}>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className={`flex-1 px-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 transition-all duration-300 ${scrolled ? "py-3 text-base" : "py-2 text-sm"}`}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Send size={scrolled ? 18 : 16} />
          </button>
        </div>
        <p className={`text-gray-400 transition-all duration-300 ${scrolled ? "text-xs" : "text-xs"}`}>
          AI can make mistakes.
        </p>
      </div>
    </div>
  )
}
