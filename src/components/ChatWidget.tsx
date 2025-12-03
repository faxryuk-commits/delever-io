import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Phone } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  leadScore: number
  requestContact: boolean
  waitingForContact: boolean
  userName?: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    leadScore: 0,
    requestContact: false,
    waitingForContact: false
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLocale()

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatState.messages])

  // Приветственное сообщение при открытии
  useEffect(() => {
    if (isOpen && chatState.messages.length === 0) {
      const greeting = language === 'uz' 
        ? "Salom! 👋 Men Delever virtual yordamchisiman. Mahsulotlar, tariflar va imkoniyatlar haqida savollaringizga javob bera olaman. Qanday yordam bera olaman?"
        : language === 'en'
        ? "Hi! 👋 I'm Delever's virtual assistant. I can answer questions about our products, pricing, and features. How can I help you?"
        : "Привет! 👋 Я виртуальный ассистент Delever. Могу ответить на вопросы о продуктах, тарифах и возможностях. Чем могу помочь?"

      setChatState(prev => ({
        ...prev,
        messages: [{
          id: '1',
          role: 'assistant',
          content: greeting,
          timestamp: new Date()
        }]
      }))
    }
  }, [isOpen, language])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }))
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: chatState.messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          source: 'website'
        })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Извините, произошла ошибка.',
        timestamp: new Date()
      }

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        leadScore: Math.max(prev.leadScore, data.leadScore || 0),
        requestContact: data.requestContact || prev.leadScore > 60
      }))

    } catch (error) {
      console.error('Chat error:', error)
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Извините, произошла ошибка. Попробуйте позже или позвоните: +998 78 113 98 13',
          timestamp: new Date()
        }]
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    { label: language === 'uz' ? 'Tariflar' : language === 'en' ? 'Pricing' : 'Тарифы', message: 'Расскажи о тарифах' },
    { label: language === 'uz' ? 'Imkoniyatlar' : language === 'en' ? 'Features' : 'Возможности', message: 'Какие возможности у Delever?' },
    { label: language === 'uz' ? "Bog'lanish" : language === 'en' ? 'Contact' : 'Связаться', message: 'Хочу связаться с менеджером' },
  ]

  return (
    <>
      {/* Кнопка открытия чата */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-lg flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Пульсирующий индикатор */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-darkBlue to-brand-blue p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Delever Assistant</h3>
                  <p className="text-xs text-white/70">
                    {language === 'uz' ? 'Onlayn' : language === 'en' ? 'Online' : 'Онлайн'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatState.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-brand-blue text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {chatState.messages.length <= 2 && (
              <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(action.message)
                      setTimeout(sendMessage, 100)
                    }}
                    className="flex-shrink-0 px-3 py-1.5 text-xs bg-brand-lightBlue text-brand-darkBlue rounded-full hover:bg-brand-blue hover:text-white transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Contact Request Banner */}
            {chatState.requestContact && (
              <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100">
                <button
                  onClick={() => setInput('Хочу связаться с менеджером')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {language === 'uz' ? "Menejer bilan bog'lanish" : language === 'en' ? 'Contact Manager' : 'Связаться с менеджером'}
                </button>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'uz' ? "Xabar yozing..." : language === 'en' ? "Type a message..." : "Напишите сообщение..."}
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center hover:bg-brand-darkBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
