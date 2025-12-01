import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Monitor, Map, BarChart3, Users, Settings, Package, Truck, Utensils } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const screenshots = [
  {
    id: 'orders',
    title: 'Управление заказами',
    description: 'Все заказы из всех каналов в одном окне. Фильтры, статусы, таймеры.',
    icon: Monitor,
    color: 'from-blue-500 to-blue-600',
    image: '/screenshots/orders.png',
    features: ['Заказы из агрегаторов', 'Собственные каналы', 'Статусы в реальном времени', 'Фильтрация и поиск'],
  },
  {
    id: 'create-order',
    title: 'Создание заказа',
    description: 'Быстрое создание заказа с картой и выбором филиала.',
    icon: Utensils,
    color: 'from-teal-500 to-teal-600',
    image: '/screenshots/create-order.png',
    features: ['Поиск клиента', 'Выбор адреса на карте', 'Привязка к филиалу', 'Выбор курьерской службы'],
  },
  {
    id: 'map',
    title: 'Карта курьеров',
    description: 'Отслеживание курьеров в реальном времени. Оптимизация маршрутов.',
    icon: Map,
    color: 'from-emerald-500 to-emerald-600',
    image: '/screenshots/map.png',
    features: ['GPS-трекинг курьеров', 'Зоны доставки', 'Пробки и маршруты', 'Назначение заказов'],
  },
  {
    id: 'dashboard',
    title: 'Аналитика и дашборды',
    description: 'Все метрики бизнеса в одном месте. Графики, отчёты, KPI.',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-600',
    image: '/screenshots/dashboard.png',
    features: ['Выручка и заказы', 'Средний чек', 'Время доставки', 'Воронка продаж'],
  },
  {
    id: 'products',
    title: 'ABC/XYZ анализ',
    description: 'Анализ продуктов по прибыльности и стабильности продаж.',
    icon: Package,
    color: 'from-rose-500 to-rose-600',
    image: '/screenshots/products.png',
    features: ['Топ продукты', 'Маржинальность', 'Оборачиваемость', 'Рекомендации AI'],
  },
  {
    id: 'customers',
    title: 'База клиентов',
    description: 'RFM-анализ, сегментация, история заказов каждого клиента.',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    image: '/screenshots/customers.png',
    features: ['RFM-сегментация', 'История заказов', 'LTV клиентов', 'Персональные рассылки'],
  },
  {
    id: 'integrations',
    title: 'Настройки интеграций',
    description: 'Подключение POS, агрегаторов, платёжных систем в пару кликов.',
    icon: Settings,
    color: 'from-cyan-500 to-cyan-600',
    image: '/screenshots/integrations.png',
    features: ['40+ интеграций', 'POS-системы', 'Платёжные шлюзы', 'SMS провайдеры'],
  },
  {
    id: 'catalog',
    title: 'Управление каталогом',
    description: 'Редактирование меню, цен, модификаторов. Мультиязычность.',
    icon: Package,
    color: 'from-indigo-500 to-indigo-600',
    image: '/screenshots/catalog.png',
    features: ['3 языка', 'AI-описания', 'Модификаторы', 'Импорт из POS'],
  },
  {
    id: 'menu-import',
    title: 'Импорт меню',
    description: 'Автоматический импорт меню из POS-системы.',
    icon: Truck,
    color: 'from-amber-500 to-amber-600',
    image: '/screenshots/menu-import.png',
    features: ['Синхронизация с POS', 'Мультиязычность', 'Автоматические цены', 'Категории'],
  },
]

export function ProductScreenshots() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})
  const activeScreen = screenshots[activeIndex]
  const Icon = activeScreen.icon

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-lightBlue/20 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Monitor className="w-4 h-4" />
              Интерфейс платформы
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Всё под контролем
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Современный интерфейс для управления всеми аспектами доставки
            </p>
          </div>
        </FadeInOnScroll>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          {/* Screenshot display */}
          <FadeInOnScroll className="lg:col-span-3">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-brand-lightTeal/20 overflow-hidden"
                >
                  {/* Browser chrome */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 max-w-xs">
                        admin.delever.uz
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="relative min-h-[300px] md:min-h-[450px] bg-gradient-to-br from-gray-50 to-gray-100">
                    {!imageError[activeScreen.id] ? (
                      <img 
                        src={activeScreen.image} 
                        alt={activeScreen.title}
                        className="w-full h-full object-cover object-top"
                        onError={() => handleImageError(activeScreen.id)}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-8">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeScreen.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                          <Icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-darkBlue mb-2 text-center">
                          {activeScreen.title}
                        </h3>
                        <p className="text-brand-darkBlue/60 text-center max-w-sm mb-6">
                          {activeScreen.description}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {activeScreen.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-white text-brand-darkBlue px-3 py-1.5 rounded-full shadow-sm border border-brand-lightTeal/20"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-darkBlue hover:bg-brand-lightBlue transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-darkBlue hover:bg-brand-lightBlue transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeInOnScroll>

          {/* Feature list */}
          <FadeInOnScroll delay={0.2} className="lg:col-span-2">
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {screenshots.map((screen, idx) => {
                const ScreenIcon = screen.icon
                const isActive = idx === activeIndex
                
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      isActive 
                        ? 'bg-white shadow-lg border-2 border-brand-darkBlue/20' 
                        : 'bg-white/50 hover:bg-white border border-transparent hover:border-brand-lightTeal/30'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${screen.color} flex items-center justify-center text-white flex-shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                      <ScreenIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/70'}`}>
                        {screen.title}
                      </h4>
                      <p className="text-xs text-brand-darkBlue/50 truncate">
                        {screen.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-brand-darkBlue flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </FadeInOnScroll>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeIndex 
                  ? 'bg-brand-darkBlue w-6' 
                  : 'bg-brand-darkBlue/20 hover:bg-brand-darkBlue/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
