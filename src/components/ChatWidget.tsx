import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, User, Bot, Phone, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = [
  'Что такое Delever?',
  'Сколько стоит?',
  'Как работает доставка?',
  'Какие интеграции есть?',
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! 👋 Я AI-помощник Delever. Расскажу о платформе, помогу выбрать тариф или запишу на демо. Чем могу помочь?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API error:', data)
        throw new Error(data.details || data.error || 'Failed to get response')
      }

      if (!data.message) {
        throw new Error('No message in response')
      }

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.message 
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Извините, произошла ошибка${errorMsg ? `: ${errorMsg}` : ''}. Свяжитесь с менеджером в Telegram: @deleverme` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-brand-darkBlue to-[#003d66] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Открыть чат"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-lightTeal/20 flex flex-col" style={{ height: '560px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-darkBlue to-[#003d66] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">AI-помощник</div>
                <div className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Онлайн
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Закрыть чат"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-brand-darkBlue text-white' 
                    : 'bg-brand-lightBlue text-brand-darkBlue'
                }`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-brand-darkBlue text-white rounded-br-md'
                    : 'bg-white text-brand-darkBlue shadow-sm rounded-bl-md'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-lightBlue text-brand-darkBlue flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <Loader2 className="h-5 w-5 text-brand-darkBlue animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-brand-lightBlue text-brand-darkBlue px-3 py-1.5 rounded-full hover:bg-brand-lightTeal transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-darkBlue/20"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-brand-darkBlue text-white rounded-full flex items-center justify-center hover:bg-brand-darkBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {/* Contact Manager */}
            <div className="mt-3 flex justify-center">
              <a
                href="https://t.me/deleverme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-darkBlue/60 hover:text-brand-darkBlue flex items-center gap-1 transition-colors"
              >
                <Phone className="h-3 w-3" />
                Связаться с менеджером
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

