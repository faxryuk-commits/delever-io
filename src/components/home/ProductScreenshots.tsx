import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Monitor, Map, BarChart3, Users, Settings } from 'lucide-react'

const screenshots = [
  {
    id: 'orders',
    title: 'Управление заказами',
    description: 'Все заказы в одном окне',
    icon: Monitor,
    image: '/screenshots/orders.png',
  },
  {
    id: 'map',
    title: 'Карта курьеров',
    description: 'GPS-трекинг в реальном времени',
    icon: Map,
    image: '/screenshots/map.png',
  },
  {
    id: 'dashboard',
    title: 'Аналитика',
    description: 'Дашборды и отчёты',
    icon: BarChart3,
    image: '/screenshots/dashboard.png',
  },
  {
    id: 'customers',
    title: 'База клиентов',
    description: 'RFM-анализ и сегментация',
    icon: Users,
    image: '/screenshots/customers.png',
  },
  {
    id: 'integrations',
    title: 'Интеграции',
    description: '40+ подключений',
    icon: Settings,
    image: '/screenshots/integrations.png',
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
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            Интерфейс платформы
          </h2>
          <p className="text-base lg:text-lg text-brand-darkBlue/60 max-w-xl mx-auto">
            Современный и понятный интерфейс для управления доставкой
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Screenshot display */}
          <div className="lg:col-span-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-brand-lightBlue/30 rounded-2xl overflow-hidden border border-brand-lightTeal/30"
              >
                {/* Browser chrome */}
                <div className="bg-white/80 backdrop-blur px-4 py-2.5 flex items-center gap-2 border-b border-brand-lightTeal/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-brand-lightBlue/50 rounded px-3 py-1 text-xs text-brand-darkBlue/50 w-fit">
                      admin.delever.uz
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-lightBlue/20 to-brand-lightTeal/10">
                  {!imageError[activeScreen.id] ? (
                    <img 
                      src={activeScreen.image} 
                      alt={activeScreen.title}
                      className="w-full h-full object-cover object-top"
                      onError={() => handleImageError(activeScreen.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      <div className="w-16 h-16 rounded-xl bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue mb-4">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
                        {activeScreen.title}
                      </h3>
                      <p className="text-brand-darkBlue/60 text-center text-sm">
                        {activeScreen.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-brand-darkBlue hover:bg-brand-lightBlue transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-brand-darkBlue hover:bg-brand-lightBlue transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature list */}
          <div className="space-y-2">
            {screenshots.map((screen, idx) => {
              const ScreenIcon = screen.icon
              const isActive = idx === activeIndex
              
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    isActive 
                      ? 'bg-brand-lightBlue border border-brand-darkBlue/10' 
                      : 'bg-transparent hover:bg-brand-lightBlue/50 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? 'bg-brand-darkBlue text-white' : 'bg-brand-lightTeal/50 text-brand-darkBlue'
                  }`}>
                    <ScreenIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm ${isActive ? 'text-brand-darkBlue' : 'text-brand-darkBlue/70'}`}>
                      {screen.title}
                    </h4>
                    <p className="text-xs text-brand-darkBlue/50 truncate">
                      {screen.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6 lg:hidden">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === activeIndex 
                  ? 'bg-brand-darkBlue w-4' 
                  : 'bg-brand-darkBlue/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
