import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  ShoppingCart, 
  Zap,
  Monitor,
  Truck,
  BarChart3,
  Package,
  ArrowRight
} from 'lucide-react'

interface FlowStep {
  id: string
  title: string
  icon: React.ReactNode
  items: string[]
  color: string
  bgColor: string
}

export function ProcessFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const flowSteps: FlowStep[] = [
    {
      id: 'channels',
      title: 'Каналы продаж',
      icon: <ShoppingCart className="h-6 w-6" />,
      items: ['Агрегаторы', 'Telegram-бот', 'Веб-сайт', 'Приложение'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'delever',
      title: 'Delever',
      icon: <Zap className="h-6 w-6" />,
      items: ['Единая платформа', 'Автоматизация', 'Синхронизация'],
      color: 'text-brand-darkBlue',
      bgColor: 'bg-brand-lightBlue',
    },
    {
      id: 'integrations',
      title: 'Интеграции',
      icon: <Monitor className="h-6 w-6" />,
      items: ['POS-системы', 'Платежи', 'Кухня'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'operations',
      title: 'Операции',
      icon: <Package className="h-6 w-6" />,
      items: ['Диспетчеризация', 'Курьеры', 'Статусы'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'delivery',
      title: 'Доставка',
      icon: <Truck className="h-6 w-6" />,
      items: ['Свои курьеры', 'Яндекс', 'Трекинг'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      icon: <BarChart3 className="h-6 w-6" />,
      items: ['Дашборды', 'Отчёты', 'AI-прогнозы'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            Как это работает
          </h2>
          <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
            Полная цепочка от заказа до аналитики в единой платформе
          </p>
        </motion.div>

        {/* Flow Steps */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {flowSteps.map((step, idx) => (
            <motion.div 
              key={step.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Arrow between steps */}
              {idx < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2 z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-brand-darkBlue/30" />
                  </motion.div>
                </div>
              )}

              <div className="bg-white rounded-xl p-4 border border-brand-lightTeal/30 hover:border-brand-darkBlue/20 hover:shadow-md transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center ${step.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-brand-darkBlue mb-2">
                  {step.title}
                </h3>

                {/* Items */}
                <ul className="space-y-1">
                  {step.items.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      className="text-xs text-brand-darkBlue/60"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + idx * 0.1 + itemIdx * 0.05 }}
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div 
          className="mt-12 bg-brand-lightBlue/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-brand-darkBlue font-medium">
            Все этапы автоматизированы и синхронизированы в реальном времени
          </p>
        </motion.div>
      </div>
    </section>
  )
}
