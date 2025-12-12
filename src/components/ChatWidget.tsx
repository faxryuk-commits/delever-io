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

// Сцена с иконкой чата
function ChatIconScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <motion.g
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Пузырь сообщения */}
        <path
          d="M8 12 Q8 8 12 8 L28 8 Q32 8 32 12 L32 22 Q32 26 28 26 L18 26 L12 32 L12 26 L12 26 Q8 26 8 22 Z"
          fill="#fff"
        />
        {/* Точки печати */}
        <motion.circle cx="15" cy="17" r="2" fill="#10B981"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.circle cx="20" cy="17" r="2" fill="#10B981"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle cx="25" cy="17" r="2" fill="#10B981"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </motion.g>
    </svg>
  )
}

// Повар готовит
function ChefScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Шапка повара */}
      <ellipse cx="20" cy="10" rx="8" ry="4" fill="#fff" />
      <rect x="12" y="10" width="16" height="6" fill="#fff" />
      {/* Лицо */}
      <circle cx="20" cy="20" r="7" fill="#FBBF24" />
      <circle cx="17" cy="19" r="1" fill="#1E3A5F" />
      <circle cx="23" cy="19" r="1" fill="#1E3A5F" />
      <path d="M17 23 Q20 25 23 23" stroke="#1E3A5F" strokeWidth="1" fill="none" />
      {/* Рука с лопаткой */}
      <motion.g
        animate={{ rotate: [-20, 20, -20] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ transformOrigin: "28px 24px" }}
      >
        <rect x="26" y="24" width="8" height="2" rx="1" fill="#9CA3AF" />
        <rect x="32" y="22" width="4" height="6" rx="1" fill="#9CA3AF" />
      </motion.g>
      {/* Пар от еды */}
      <motion.path
        d="M8 30 Q10 28 8 26"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -4], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M12 32 Q14 30 12 28"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -4], opacity: [0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
    </svg>
  )
}

// Гость/клиент машет
function GuestScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Голова */}
      <circle cx="20" cy="14" r="7" fill="#FBBF24" />
      <circle cx="17" cy="13" r="1" fill="#1E3A5F" />
      <circle cx="23" cy="13" r="1" fill="#1E3A5F" />
      <path d="M17 17 Q20 19 23 17" stroke="#1E3A5F" strokeWidth="1" fill="none" />
      {/* Тело */}
      <path d="M14 21 L14 32 M26 21 L26 32 M14 21 Q20 24 26 21" fill="#10B981" stroke="#10B981" strokeWidth="3" />
      {/* Машущая рука */}
      <motion.g
        animate={{ rotate: [-30, 30, -30] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: "28px 24px" }}
      >
        <line x1="26" y1="24" x2="34" y2="16" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
        {/* Ладошка */}
        <circle cx="34" cy="14" r="3" fill="#FBBF24" />
      </motion.g>
      {/* Левая рука */}
      <line x1="14" y1="24" x2="8" y2="30" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// Телефон звонит
function PhoneScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <motion.g
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 0.15, repeat: Infinity }}
        style={{ transformOrigin: "20px 20px" }}
      >
        {/* Телефон */}
        <rect x="12" y="6" width="16" height="28" rx="3" fill="#fff" />
        <rect x="14" y="10" width="12" height="18" rx="1" fill="#60A5FA" />
        <circle cx="20" cy="31" r="2" fill="#E5E7EB" />
        {/* Экран - иконка звонка */}
        <circle cx="20" cy="19" r="4" fill="#10B981" />
        <path d="M17 17 Q17 21 20 21 Q23 21 23 17" stroke="#fff" strokeWidth="1.5" fill="none" />
      </motion.g>
      {/* Звуковые волны */}
      <motion.path
        d="M6 16 Q3 20 6 24"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.path
        d="M34 16 Q37 20 34 24"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
      />
    </svg>
  )
}

// Таймер/часы
function TimerScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Корпус часов */}
      <circle cx="20" cy="22" r="14" fill="#fff" />
      <circle cx="20" cy="22" r="12" fill="#1E3A5F" />
      <circle cx="20" cy="22" r="10" fill="#fff" />
      {/* Метки */}
      <circle cx="20" cy="14" r="1" fill="#1E3A5F" />
      <circle cx="28" cy="22" r="1" fill="#1E3A5F" />
      <circle cx="20" cy="30" r="1" fill="#1E3A5F" />
      <circle cx="12" cy="22" r="1" fill="#1E3A5F" />
      {/* Минутная стрелка */}
      <motion.line
        x1="20" y1="22" x2="20" y2="15"
        stroke="#1E3A5F"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "20px 22px" }}
      />
      {/* Секундная стрелка */}
      <motion.line
        x1="20" y1="22" x2="20" y2="13"
        stroke="#DC2626"
        strokeWidth="1"
        strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "20px 22px" }}
      />
      {/* Центр */}
      <circle cx="20" cy="22" r="2" fill="#10B981" />
      {/* Кнопка сверху */}
      <rect x="18" y="4" width="4" height="4" rx="1" fill="#FBBF24" />
    </svg>
  )
}

// Быстрая доставка - секундомер
function FastDeliveryScene() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      {/* Коробка летит */}
      <motion.g
        animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <rect x="14" y="12" width="16" height="14" rx="2" fill="#10B981" />
        <text x="18" y="22" fontSize="8" fill="#fff" fontWeight="bold">D</text>
        <path d="M14 16 L22 12 L30 16" stroke="#0D9488" strokeWidth="1" fill="none" />
      </motion.g>
      {/* Линии скорости */}
      <motion.line x1="4" y1="16" x2="12" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0, 1, 0], x: [-4, 0, -4] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <motion.line x1="6" y1="20" x2="12" y2="20" stroke="#fff" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0, 1, 0], x: [-4, 0, -4] }}
        transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
      />
      <motion.line x1="4" y1="24" x2="12" y2="24" stroke="#fff" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0, 1, 0], x: [-4, 0, -4] }}
        transition={{ duration: 0.3, repeat: Infinity, delay: 0.2 }}
      />
      {/* Текст 30 мин */}
      <text x="12" y="36" fontSize="6" fill="#fff" fontWeight="bold">30'</text>
    </svg>
  )
}

// Текстовая сцена с переводами
function TextScene({ language }: { language: string }) {
  const texts = language === 'uz' 
    ? ['Salom!', 'Yordam?', 'Tayyor!', '🍕🍔🍜']
    : language === 'en'
    ? ['Hello!', 'Help?', 'Ready!', '🍕🍔🍜']
    : ['Привет!', 'Помочь?', 'Готово!', '🍕🍔🍜']
  
  const [textIndex, setTextIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(i => (i + 1) % texts.length)
    }, 800)
    return () => clearInterval(interval)
  }, [language])
  
  return (
    <div className="w-8 h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={textIndex}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="text-white text-xs font-bold text-center"
        >
          {texts[textIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Компонент анимированной кнопки
function AnimatedChatButton({ onClick, language }: { onClick: () => void; language: string }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [showTooltip, setShowTooltip] = useState(true)
  
  const scenes = [
    <ChatIconScene key="chat" />,
    <TextScene key="text" language={language} />,
    <DeliveryCarScene key="car" />,
    <ChefScene key="chef" />,
    <BurgerScene key="burger" />,
    <PhoneScene key="phone" />,
    <BikeScene key="bike" />,
    <GuestScene key="guest" />,
    <PizzaScene key="pizza" />,
    <TimerScene key="timer" />,
    <FastDeliveryScene key="fast" />,
    <BellScene key="bell" />,
  ]
  
  const tooltipText = language === 'uz' 
    ? "Yozing!" 
    : language === 'en' 
    ? "Chat with us!" 
    : "Напишите нам!"
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex(i => (i + 1) % scenes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  // Показываем тултип периодически
  useEffect(() => {
    const showInterval = setInterval(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 3000)
    }, 10000)
    
    // Скрыть первый тултип через 5 секунд
    const hideTimeout = setTimeout(() => setShowTooltip(false), 5000)
    
    return () => {
      clearInterval(showInterval)
      clearTimeout(hideTimeout)
    }
  }, [])
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Тултип */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-white text-brand-darkBlue px-4 py-2 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
              <span>💬</span>
              {tooltipText}
              {/* Стрелка */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="border-8 border-transparent border-l-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={onClick}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue via-brand-green to-brand-blue shadow-xl flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
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
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-[8px] text-white font-bold">1</span>
        </motion.span>
      </motion.button>
    </div>
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
      {!isOpen && <AnimatedChatButton onClick={() => setIsOpen(true)} language={language} />}

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
