import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Truck, 
  ChefHat, 
  Megaphone, 
  Users, 
  CreditCard, 
  BarChart3,
  Package,
  Smartphone,
  Globe,
  MessageSquare,
  QrCode,
  MapPin,
  Bell,
  Gift,
  Wallet,
  PieChart,
  Building2,
  Clock,
  UserCheck,
  DollarSign,
  LayoutDashboard,
  Phone,
  Monitor,
  Store,
  Navigation,
  Star,
  Activity,
  Zap
} from 'lucide-react'
import { Logo } from './Logo'

interface Module {
  id: string
  name: string
  nameRu: string
  icon: React.ReactNode
  color: string
  bgColor: string
  angle: number
  subModules: { name: string; icon: React.ReactNode }[]
}

const modules: Module[] = [
  {
    id: 'pos',
    name: 'POS',
    nameRu: 'Касса',
    icon: <Monitor className="w-6 h-6" />,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    angle: 225,
    subModules: [
      { name: 'Склад', icon: <Package className="w-4 h-4" /> },
      { name: 'Цены', icon: <DollarSign className="w-4 h-4" /> },
      { name: 'Товары', icon: <Store className="w-4 h-4" /> },
      { name: 'Заказы', icon: <ShoppingCart className="w-4 h-4" /> },
    ]
  },
  {
    id: 'order',
    name: 'Order',
    nameRu: 'Заказы',
    icon: <ShoppingCart className="w-6 h-6" />,
    color: '#F97316',
    bgColor: '#FFEDD5',
    angle: 270,
    subModules: [
      { name: 'Call Center', icon: <Phone className="w-4 h-4" /> },
      { name: 'Киоск', icon: <Monitor className="w-4 h-4" /> },
      { name: 'QR Меню', icon: <QrCode className="w-4 h-4" /> },
      { name: 'Приложение', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Сайт', icon: <Globe className="w-4 h-4" /> },
      { name: 'Агрегаторы', icon: <Store className="w-4 h-4" /> },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    nameRu: 'Кухня',
    icon: <ChefHat className="w-6 h-6" />,
    color: '#F97316',
    bgColor: '#FFEDD5',
    angle: 315,
    subModules: [
      { name: 'POS', icon: <Monitor className="w-4 h-4" /> },
      { name: 'Прогноз', icon: <Activity className="w-4 h-4" /> },
      { name: 'Продукты', icon: <Package className="w-4 h-4" /> },
      { name: 'Курьеры', icon: <Truck className="w-4 h-4" /> },
      { name: 'KDS', icon: <LayoutDashboard className="w-4 h-4" /> },
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    nameRu: 'Маркетинг',
    icon: <Megaphone className="w-6 h-6" />,
    color: '#1E3A5F',
    bgColor: '#E0E7EE',
    angle: 0,
    subModules: [
      { name: 'Deep links', icon: <Zap className="w-4 h-4" /> },
      { name: 'Рефералы', icon: <Users className="w-4 h-4" /> },
      { name: 'Push', icon: <Bell className="w-4 h-4" /> },
      { name: 'Промокоды', icon: <Gift className="w-4 h-4" /> },
    ]
  },
  {
    id: 'customers',
    name: 'Customers',
    nameRu: 'Клиенты',
    icon: <Users className="w-6 h-6" />,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    angle: 45,
    subModules: [
      { name: 'CRM', icon: <UserCheck className="w-4 h-4" /> },
      { name: 'Коммуникации', icon: <MessageSquare className="w-4 h-4" /> },
      { name: 'Отзывы', icon: <Star className="w-4 h-4" /> },
      { name: 'RFM', icon: <PieChart className="w-4 h-4" /> },
      { name: 'Триггеры', icon: <Zap className="w-4 h-4" /> },
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    nameRu: 'Логистика',
    icon: <Truck className="w-6 h-6" />,
    color: '#10B981',
    bgColor: '#D1FAE5',
    angle: 90,
    subModules: [
      { name: 'Диспетчер', icon: <Navigation className="w-4 h-4" /> },
      { name: 'Мониторинг', icon: <Activity className="w-4 h-4" /> },
      { name: 'Управление', icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: 'Прогнозы', icon: <PieChart className="w-4 h-4" /> },
      { name: 'Курьер APP', icon: <Smartphone className="w-4 h-4" /> },
      { name: '3rd Party', icon: <Building2 className="w-4 h-4" /> },
      { name: 'Карты', icon: <MapPin className="w-4 h-4" /> },
      { name: 'Зоны', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  {
    id: 'payment',
    name: 'Payment',
    nameRu: 'Оплата',
    icon: <CreditCard className="w-6 h-6" />,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    angle: 135,
    subModules: [
      { name: 'Наличные', icon: <Wallet className="w-4 h-4" /> },
      { name: 'Карта', icon: <CreditCard className="w-4 h-4" /> },
      { name: 'Криптo', icon: <DollarSign className="w-4 h-4" /> },
    ]
  },
  {
    id: 'analitic',
    name: 'Analytics',
    nameRu: 'Аналитика',
    icon: <BarChart3 className="w-6 h-6" />,
    color: '#1E3A5F',
    bgColor: '#E0E7EE',
    angle: 180,
    subModules: [
      { name: 'Продукты', icon: <Package className="w-4 h-4" /> },
      { name: 'Локации', icon: <MapPin className="w-4 h-4" /> },
      { name: 'Время', icon: <Clock className="w-4 h-4" /> },
      { name: 'Филиалы', icon: <Building2 className="w-4 h-4" /> },
      { name: 'Клиенты', icon: <Users className="w-4 h-4" /> },
      { name: 'Сотрудники', icon: <UserCheck className="w-4 h-4" /> },
      { name: 'Выручка', icon: <DollarSign className="w-4 h-4" /> },
      { name: 'Дашборды', icon: <LayoutDashboard className="w-4 h-4" /> },
    ]
  },
]

// Анимированная линия между центром и модулем
function ConnectionLine({ angle, color, isActive, delay }: { angle: number; color: string; isActive: boolean; delay: number }) {
  const length = 120
  const startX = 200
  const startY = 200
  const endX = startX + Math.cos((angle * Math.PI) / 180) * length
  const endY = startY + Math.sin((angle * Math.PI) / 180) * length

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <motion.line
        x1={startX}
        y1={startY}
        x2={startX}
        y2={startY}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ x2: startX, y2: startY, opacity: 0 }}
        animate={{ 
          x2: endX, 
          y2: endY, 
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
      {/* Animated dot flowing along the line */}
      {isActive && (
        <motion.circle
          r="4"
          fill={color}
          initial={{ cx: startX, cy: startY }}
          animate={{
            cx: [startX, endX, startX],
            cy: [startY, endY, startY],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </svg>
  )
}

// Модуль
function ModuleNode({ module, index, isActive, onClick }: { module: Module; index: number; isActive: boolean; onClick: () => void }) {
  const radius = 140
  const centerX = 200
  const centerY = 200
  const x = centerX + Math.cos((module.angle * Math.PI) / 180) * radius - 40
  const y = centerY + Math.sin((module.angle * Math.PI) / 180) * radius - 40

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.1 + 0.3 
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div 
        className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg ${isActive ? 'ring-4 ring-offset-2' : ''}`}
        style={{ 
          backgroundColor: module.bgColor,
          color: module.color,
        }}
      >
        {module.icon}
        <span className="text-xs font-bold mt-1">{module.name}</span>
      </div>
    </motion.div>
  )
}

// Подмодули
function SubModules({ module, isVisible }: { module: Module; isVisible: boolean }) {
  const subRadius = 220
  const centerX = 200
  const centerY = 200
  const spreadAngle = 15

  return (
    <AnimatePresence>
      {isVisible && module.subModules.map((sub, idx) => {
        const subAngle = module.angle + (idx - (module.subModules.length - 1) / 2) * spreadAngle
        const x = centerX + Math.cos((subAngle * Math.PI) / 180) * subRadius - 32
        const y = centerY + Math.sin((subAngle * Math.PI) / 180) * subRadius - 16

        return (
          <motion.div
            key={sub.name}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: idx * 0.05 
            }}
          >
            <div 
              className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 shadow-md"
              style={{ 
                backgroundColor: module.color,
                color: 'white',
              }}
            >
              {sub.icon}
              {sub.name}
            </div>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}

export function ArchitectureDiagram() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [, setAnimationStep] = useState(0)

  // Автоматическая демонстрация потока заказа
  const orderFlow = ['order', 'pos', 'kitchen', 'logistics', 'customers', 'analitic']
  
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setAnimationStep(prev => {
          if (prev >= orderFlow.length - 1) {
            setIsAnimating(false)
            setActiveModule(null)
            return 0
          }
          setActiveModule(orderFlow[prev + 1])
          return prev + 1
        })
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isAnimating])

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
    setActiveModule(orderFlow[0])
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-brand-darkBlue mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Архитектура платформы
        </motion.h2>
        <motion.p 
          className="text-brand-darkBlue/70 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Все модули работают как единая система. Нажмите на модуль чтобы увидеть детали, или запустите демонстрацию пути заказа.
        </motion.p>
        <motion.button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-brand-darkBlue text-white rounded-xl font-medium hover:bg-brand-darkBlue/90 transition-colors disabled:opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isAnimating ? '▶ Демонстрация...' : '▶ Показать путь заказа'}
        </motion.button>
      </div>

      {/* Diagram Container */}
      <div className="relative mx-auto" style={{ width: 400, height: 400 }}>
        {/* Connection Lines */}
        {modules.map((module, idx) => (
          <ConnectionLine 
            key={module.id}
            angle={module.angle}
            color={module.color}
            isActive={activeModule === module.id}
            delay={idx * 0.1}
          />
        ))}

        {/* Center Logo */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border-2 border-brand-lightTeal/30">
            <Logo variant="compact" height={48} />
          </div>
        </motion.div>

        {/* Modules */}
        {modules.map((module, idx) => (
          <ModuleNode
            key={module.id}
            module={module}
            index={idx}
            isActive={activeModule === module.id}
            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
          />
        ))}

        {/* SubModules */}
        {modules.map(module => (
          <SubModules
            key={module.id}
            module={module}
            isVisible={activeModule === module.id}
          />
        ))}
      </div>

      {/* Active Module Info */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-brand-lightTeal/20 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {(() => {
              const module = modules.find(m => m.id === activeModule)
              if (!module) return null
              return (
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: module.bgColor, color: module.color }}
                  >
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-darkBlue mb-2">
                    {module.nameRu}
                  </h3>
                  <p className="text-sm text-brand-darkBlue/70">
                    {module.subModules.length} подмодулей: {module.subModules.map(s => s.name).join(', ')}
                  </p>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div 
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {modules.map(module => (
          <button
            key={module.id}
            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeModule === module.id 
                ? 'ring-2 ring-offset-1' 
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{ 
              backgroundColor: module.bgColor,
              color: module.color,
            }}
          >
            {module.icon}
            {module.nameRu}
          </button>
        ))}
      </motion.div>
    </div>
  )
}

