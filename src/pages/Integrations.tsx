import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { 
  ArrowRight, 
  Code, 
  Shield, 
  HeadphonesIcon,
  Smartphone,
  ShoppingBag,
  CreditCard,
  Truck,
  MessageSquare,
  BarChart3,
  Receipt,
  Zap,
  ArrowRightLeft,
  CheckCircle2
} from 'lucide-react'

// Категории интеграций с иконками и цветами
const categories = [
  {
    id: 'channels',
    name: 'Каналы продаж',
    description: 'Собственные каналы для приёма заказов',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    items: ['Telegram Bot', 'Website', 'Мобильное приложение', 'QR Menu', 'Admin Panel']
  },
  {
    id: 'aggregators',
    name: 'Агрегаторы заказов',
    description: 'Все заказы с агрегаторов в единой системе',
    icon: ShoppingBag,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    items: ['Uzum Tezkor', 'Glovo', 'Яндекс Ритейл', 'Яндекс Еда', 'Wolt', 'Chocofood', 'Foody']
  },
  {
    id: 'pos',
    name: 'POS-системы',
    description: 'Автоматическая синхронизация с кассой',
    icon: Receipt,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    items: ['iiko', 'R-Keeper', 'R-Keeper White Server', 'Jowi', 'Poster', 'Paloma', 'Dodo Pizza', 'Loook', 'Neon Alisa', 'Yaros', 'Clopos', 'AliPos', 'Syrve']
  },
  {
    id: 'payments',
    name: 'Платёжные шлюзы',
    description: 'Приём онлайн-платежей',
    icon: CreditCard,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    items: ['Payme', 'Click', 'Uzum Bank', 'Kaspi', 'Epay', 'TipTop Pay', 'Atmos', 'Anorbank']
  },
  {
    id: 'delivery',
    name: 'Системы доставки',
    description: 'Интеграция с курьерскими службами',
    icon: Truck,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    items: ['Яндекс Доставка', 'Taxi Millennium', 'Wolt Drive', 'Noor']
  },
  {
    id: 'sms',
    name: 'SMS провайдеры',
    description: 'Отправка уведомлений клиентам',
    icon: MessageSquare,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    items: ['Eskiz', 'PlayMobile', 'SMS Центр']
  },
  {
    id: 'analytics',
    name: 'Аналитика',
    description: 'Отслеживание метрик и конверсий',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    items: ['Google Tag Manager']
  },
  {
    id: 'fiscal',
    name: 'Фискальные операторы',
    description: 'Фискализация чеков',
    icon: Receipt,
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50',
    items: ['Fiscal Box']
  },
]

// Анимированный хаб в центре
function IntegrationHub() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      const categoryIds = categories.map(c => c.id)
      setActiveCategory(prev => {
        const currentIndex = prev ? categoryIds.indexOf(prev) : -1
        const nextIndex = (currentIndex + 1) % categoryIds.length
        return categoryIds[nextIndex]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto h-[500px] md:h-[600px]">
      {/* Center Hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-brand-darkBlue to-[#003d66] rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white">
          <Zap className="w-10 h-10 md:w-12 md:h-12 mb-2" />
          <span className="text-lg md:text-xl font-bold">Delever</span>
          <span className="text-xs opacity-70">40+ интеграций</span>
        </div>
      </motion.div>

      {/* Orbiting Categories */}
      {categories.slice(0, 6).map((category, index) => {
        const angle = (index * 60 - 90) * (Math.PI / 180)
        const radius = 180
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const isActive = activeCategory === category.id
        const Icon = category.icon

        return (
          <motion.div
            key={category.id}
            className="absolute left-1/2 top-1/2 z-10"
            style={{ x: x - 40, y: y - 40 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: isActive ? 1.15 : 1,
            } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          >
            {/* Connection Line */}
            <svg 
              className="absolute pointer-events-none"
              style={{
                width: Math.abs(x) + 100,
                height: Math.abs(y) + 100,
                left: x > 0 ? -40 : x - 20,
                top: y > 0 ? -40 : y - 20,
              }}
            >
              <motion.line
                x1={x > 0 ? 40 : Math.abs(x) + 60}
                y1={y > 0 ? 40 : Math.abs(y) + 60}
                x2={x > 0 ? Math.abs(x) + 20 : 40}
                y2={y > 0 ? Math.abs(y) + 20 : 40}
                stroke={isActive ? '#002A47' : '#CBE1DA'}
                strokeWidth={isActive ? 3 : 2}
                strokeDasharray={isActive ? "0" : "6 4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
              />
              {/* Animated dot */}
              {isActive && (
                <motion.circle
                  r="5"
                  fill="#002A47"
                  initial={{ 
                    cx: x > 0 ? 40 : Math.abs(x) + 60,
                    cy: y > 0 ? 40 : Math.abs(y) + 60,
                  }}
                  animate={{
                    cx: [x > 0 ? 40 : Math.abs(x) + 60, x > 0 ? Math.abs(x) + 20 : 40],
                    cy: [y > 0 ? 40 : Math.abs(y) + 60, y > 0 ? Math.abs(y) + 20 : 40],
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </svg>

            {/* Category Node */}
            <motion.div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg ${
                isActive ? 'ring-4 ring-offset-2 ring-brand-darkBlue/30' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
              onMouseEnter={() => {
                setActiveCategory(category.id)
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color}`} />
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
              <span className="text-[10px] md:text-xs text-white font-medium mt-1 relative z-10 text-center px-1">
                {category.name.split(' ')[0]}
              </span>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Active Category Info */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-brand-lightTeal/20 text-center">
              <h3 className="font-bold text-brand-darkBlue mb-1">
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <p className="text-sm text-brand-darkBlue/70 mb-2">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {categories.find(c => c.id === activeCategory)?.items.slice(0, 5).map((item, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-brand-lightBlue/50 text-brand-darkBlue px-2 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
                {(categories.find(c => c.id === activeCategory)?.items.length || 0) > 5 && (
                  <span className="text-xs text-brand-darkBlue/50 px-2 py-1">
                    +{(categories.find(c => c.id === activeCategory)?.items.length || 0) - 5} ещё
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Анимация потока данных
function DataFlowAnimation() {
  const steps = [
    { icon: Smartphone, label: 'Заказ', color: 'bg-blue-500' },
    { icon: ArrowRightLeft, label: 'Delever', color: 'bg-brand-darkBlue' },
    { icon: Receipt, label: 'POS', color: 'bg-emerald-500' },
    { icon: Truck, label: 'Доставка', color: 'bg-rose-500' },
    { icon: CheckCircle2, label: 'Готово', color: 'bg-green-500' },
  ]

  const [activeStep, setActiveStep] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="flex items-center justify-center gap-2 md:gap-4 py-8 overflow-x-auto">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isActive = activeStep >= index
        const isCurrent = activeStep === index

        return (
          <div key={index} className="flex items-center">
            <motion.div
              className={`flex flex-col items-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: isCurrent ? 1.1 : 1,
              } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ${
                  isActive ? step.color : 'bg-gray-300'
                } ${isCurrent ? 'ring-4 ring-offset-2 ring-brand-darkBlue/20 shadow-lg' : ''}`}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className={`text-xs mt-2 font-medium ${isActive ? 'text-brand-darkBlue' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </motion.div>

            {index < steps.length - 1 && (
              <div className="relative w-8 md:w-16 h-1 mx-1 md:mx-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-brand-darkBlue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeStep > index ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Карточка категории интеграций
function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div 
        className={`${category.bgColor} rounded-2xl p-6 border border-transparent hover:border-brand-darkBlue/20 transition-all duration-300 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-darkBlue">{category.name}</h3>
              <span className="text-sm font-medium text-brand-darkBlue/50 bg-white/50 px-2 py-1 rounded-full">
                {category.items.length}
              </span>
            </div>
            <p className="text-brand-darkBlue/70 text-sm mt-1">{category.description}</p>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-brand-darkBlue/10">
                {category.items.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="bg-white text-brand-darkBlue text-sm px-3 py-1.5 rounded-lg shadow-sm font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 text-sm text-brand-darkBlue/50 flex items-center gap-1">
          {isExpanded ? 'Свернуть' : 'Показать все'}
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>▼</motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const totalIntegrations = categories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <>
      <div className="min-h-screen pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Zap className="w-4 h-4" />
              {totalIntegrations}+ интеграций
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
              Хаб интеграций{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Delever
              </span>
            </h1>
            <p className="text-xl text-brand-darkBlue/70 mb-8 leading-relaxed font-light">
              Подключайте агрегаторы, POS-системы, платёжные шлюзы, службы доставки — всё работает как единая система за несколько часов.
            </p>
          </motion.div>
        </section>

        {/* Animated Hub */}
        <section className="mb-16 px-4">
          <IntegrationHub />
        </section>

        {/* How it works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">
                Как работает интеграция
              </h2>
              <p className="text-brand-darkBlue/70">
                Заказ проходит через все системы автоматически
              </p>
            </motion.div>
            <DataFlowAnimation />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">
                Все интеграции
              </h2>
              <p className="text-brand-darkBlue/70">
                Нажмите на категорию, чтобы увидеть полный список
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, idx) => (
                <CategoryCard key={category.id} category={category} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* API & Enterprise */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">
                API & Enterprise
              </h2>
              <p className="text-brand-darkBlue/70">
                Для крупных клиентов и кастомных интеграций
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Code, title: 'API доступ', desc: 'Полный доступ к API для кастомных интеграций', color: 'from-blue-500 to-blue-600' },
                { icon: Shield, title: 'SLA 99.9%', desc: 'Гарантированное время отклика и стабильность', color: 'from-emerald-500 to-emerald-600' },
                { icon: HeadphonesIcon, title: 'Выделенный менеджер', desc: 'Персональная поддержка для Enterprise', color: 'from-purple-500 to-purple-600' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-darkBlue mb-2">{item.title}</h3>
                  <p className="text-brand-darkBlue/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-darkBlue to-[#001a2d] text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Нужна интеграция?</h2>
              <p className="text-xl text-white/80 mb-8 font-light">
                Свяжитесь с нами — поможем подключить любую интеграцию или разработаем кастомное решение
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)} className="group">
                Запросить интеграцию
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
