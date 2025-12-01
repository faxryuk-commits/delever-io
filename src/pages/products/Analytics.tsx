import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion, useInView } from 'framer-motion'
import { BarChart3, LineChart, PieChart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Дашборды',
    description: 'Все метрики бизнеса в реальном времени',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: LineChart,
    title: 'Отчёты',
    description: 'Продажи, курьеры, меню — детальная аналитика',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: PieChart,
    title: 'ABC-XYZ',
    description: 'Анализ товаров для оптимизации меню',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: TrendingUp,
    title: 'AI-прогнозы',
    description: 'Предсказание спроса и трендов',
    color: 'from-orange-500 to-orange-600',
  },
]

const metrics = [
  { name: 'Выручка', change: '+24%', trend: 'up' },
  { name: 'Средний чек', change: '+18%', trend: 'up' },
  { name: 'Время доставки', change: '-32%', trend: 'down' },
  { name: 'Повторные заказы', change: '+45%', trend: 'up' },
]

export function Analytics() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <>
      <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.span 
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Данные в реальном времени
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Аналитика
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Принимайте решения на основе данных, а не интуиции
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Увидеть аналитику
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{feature.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Metrics Preview */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-darkBlue rounded-2xl p-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-xl font-bold text-white mb-6 text-center relative z-10">Рост показателей клиентов</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {metrics.map((metric, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`text-2xl font-bold mb-1 ${
                      metric.trend === 'up' ? 'text-emerald-400' : 'text-blue-400'
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {metric.change}
                  </motion.div>
                  <div className="text-xs text-white/70">{metric.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-brand-lightBlue/30 rounded-2xl p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-brand-darkBlue tracking-tight">
              Готовы увидеть свои данные?
            </h2>
            <p className="text-brand-darkBlue/70 mb-6">
              Демо с вашими реальными показателями
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Запросить демо
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
