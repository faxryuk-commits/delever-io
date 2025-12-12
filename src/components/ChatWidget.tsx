import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Bot, Phone } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

// Анимированные сцены для кнопки
function DeliveryCarScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Машинка */}
      <motion.g
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Кузов */}
        <rect x="6" y="16" width="20" height="10" rx="2" fill="#fff" />
        <rect x="22" y="12" width="10" height="14" rx="2" fill="#fff" />
        {/* Окно */}
        <rect x="24" y="14" width="6" height="5" rx="1" fill="#60A5FA" />
        {/* Колёса */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "12px 28px" }}
        >
          <circle cx="12" cy="28" r="4" fill="#1E3A5F" />
          <circle cx="12" cy="28" r="1.5" fill="#fff" />
        </motion.g>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "28px 28px" }}
        >
          <circle cx="28" cy="28" r="4" fill="#1E3A5F" />
          <circle cx="28" cy="28" r="1.5" fill="#fff" />
        </motion.g>
        {/* Delever лого */}
        <text x="10" y="23" fontSize="5" fill="#10B981" fontWeight="bold">D</text>
      </motion.g>
      {/* Дорога */}
      <rect x="0" y="32" width="40" height="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  )
}

function BurgerScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Нижняя булка */}
      <ellipse cx="20" cy="30" rx="12" ry="4" fill="#F59E0B" />
      {/* Котлета */}
      <motion.ellipse
        cx="20" cy="26"
        rx="10" ry="3"
        fill="#7C3AED"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Сыр */}
      <motion.path
        d="M10 24 Q15 26 20 23 Q25 26 30 24 L28 22 Q20 25 12 22 Z"
        fill="#FBBF24"
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Салат */}
      <motion.path
        d="M8 22 Q14 24 20 21 Q26 24 32 22 Q28 20 20 22 Q12 20 8 22"
        fill="#10B981"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Верхняя булка */}
      <motion.ellipse
        cx="20" cy="16"
        rx="12" ry="6"
        fill="#F59E0B"
        initial={{ y: -35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Кунжут */}
      <motion.g
        initial={{ y: -35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9, repeat: Infinity, repeatDelay: 2 }}
      >
        <ellipse cx="16" cy="13" rx="1" ry="0.5" fill="#fff" />
        <ellipse cx="20" cy="11" rx="1" ry="0.5" fill="#fff" />
        <ellipse cx="24" cy="13" rx="1" ry="0.5" fill="#fff" />
      </motion.g>
    </svg>
  )
}

function BikeScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Рама */}
      <path d="M12 28 L20 20 L28 28 M20 20 L20 28 M12 28 L20 28" stroke="#fff" strokeWidth="2" fill="none" />
      {/* Руль */}
      <path d="M18 18 L22 18" stroke="#fff" strokeWidth="2" />
      {/* Сиденье */}
      <rect x="18" y="18" width="4" height="2" rx="1" fill="#fff" />
      {/* Заднее колесо */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "12px 28px" }}
      >
        <circle cx="12" cy="28" r="6" stroke="#fff" strokeWidth="2" fill="none" />
        <line x1="12" y1="22" x2="12" y2="34" stroke="#fff" strokeWidth="1" />
        <line x1="6" y1="28" x2="18" y2="28" stroke="#fff" strokeWidth="1" />
      </motion.g>
      {/* Переднее колесо */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "28px 28px" }}
      >
        <circle cx="28" cy="28" r="6" stroke="#fff" strokeWidth="2" fill="none" />
        <line x1="28" y1="22" x2="28" y2="34" stroke="#fff" strokeWidth="1" />
        <line x1="22" y1="28" x2="34" y2="28" stroke="#fff" strokeWidth="1" />
      </motion.g>
      {/* Коробка доставки */}
      <motion.g
        animate={{ y: [-1, 1, -1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <rect x="6" y="10" width="8" height="8" rx="1" fill="#10B981" />
        <text x="8" y="16" fontSize="5" fill="#fff" fontWeight="bold">D</text>
      </motion.g>
      {/* Звоночек */}
      <motion.circle
        cx="22" cy="16"
        r="2"
        fill="#FBBF24"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
      />
    </svg>
  )
}

function TypingScene() {
  const texts = ['Привет!', 'Заказ?', 'Готово!', '🍕🍔🍜']
  const [textIndex, setTextIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(i => (i + 1) % texts.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="w-8 h-8 flex items-center justify-center">
      <motion.div
        key={textIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="text-white text-xs font-bold text-center"
      >
        {texts[textIndex]}
      </motion.div>
    </div>
  )
}

function BellScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <motion.g
        animate={{ rotate: [-15, 15, -15] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "20px 8px" }}
      >
        {/* Колокольчик */}
        <path
          d="M20 8 L20 12 M14 18 Q14 12 20 12 Q26 12 26 18 L28 26 L12 26 L14 18"
          stroke="#fff"
          strokeWidth="2"
          fill="#FBBF24"
        />
        <circle cx="20" cy="28" r="2" fill="#fff" />
      </motion.g>
      {/* Звуковые волны */}
      <motion.path
        d="M8 18 Q6 20 8 22"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.path
        d="M32 18 Q34 20 32 22"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
      />
      <motion.path
        d="M5 16 Q2 20 5 24"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.path
        d="M35 16 Q38 20 35 24"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.35 }}
      />
    </svg>
  )
}

function PizzaScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Пицца крутится */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "20px 20px" }}
      >
        <circle cx="20" cy="20" r="14" fill="#F59E0B" />
        <circle cx="20" cy="20" r="12" fill="#FBBF24" />
        {/* Пепперони */}
        <circle cx="15" cy="16" r="2.5" fill="#DC2626" />
        <circle cx="24" cy="14" r="2" fill="#DC2626" />
        <circle cx="26" cy="22" r="2.5" fill="#DC2626" />
        <circle cx="18" cy="25" r="2" fill="#DC2626" />
        <circle cx="14" cy="22" r="1.5" fill="#DC2626" />
        {/* Зелень */}
        <circle cx="20" cy="18" r="1" fill="#10B981" />
        <circle cx="22" cy="24" r="1" fill="#10B981" />
      </motion.g>
      {/* Пар */}
      <motion.path
        d="M16 6 Q18 4 16 2"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -3], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M24 6 Q26 4 24 2"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -3], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}

// Компонент анимированной кнопки
function AnimatedChatButton({ onClick }: { onClick: () => void }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const scenes = [
    <DeliveryCarScene key="car" />,
    <BurgerScene key="burger" />,
    <BikeScene key="bike" />,
    <BellScene key="bell" />,
    <PizzaScene key="pizza" />,
    <TypingScene key="typing" />,
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex(i => (i + 1) % scenes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue via-brand-green to-brand-blue shadow-xl flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Фоновое свечение */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-yellow/30 to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Сцена */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIndex}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {scenes[sceneIndex]}
        </motion.div>
      </AnimatePresence>
      
      {/* Пульсирующий индикатор */}
      <motion.span 
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.button>
  )
}

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
      {/* Анимированная кнопка чата */}
      {!isOpen && <AnimatedChatButton onClick={() => setIsOpen(true)} />}

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
