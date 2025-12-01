import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Package, Brain, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Дашборды',
    description: 'Все ключевые метрики в реальном времени',
  },
  {
    icon: TrendingUp,
    title: 'Анализ продаж',
    description: 'Детальный анализ по каналам и продуктам',
  },
  {
    icon: Package,
    title: 'ABC-XYZ анализ',
    description: 'Оптимизация меню и ассортимента',
  },
  {
    icon: Brain,
    title: 'AI-прогнозы',
    description: 'Предсказание спроса для оптимизации закупок',
  },
]

export function Analytics() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Аналитика
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Принимайте решения на основе данных, а не интуиции
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Подключить аналитику
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto max-w-4xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{feature.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">Метрики в реальном времени</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">Выручка</div>
                <div className="text-sm text-brand-darkBlue/60">По дням/неделям/месяцам</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">Заказы</div>
                <div className="text-sm text-brand-darkBlue/60">По каналам и продуктам</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">Чек</div>
                <div className="text-sm text-brand-darkBlue/60">Средний и динамика</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Управляйте на основе данных
            </h2>
            <p className="text-white/70 mb-6">
              Подключите аналитику Delever уже сегодня
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Получить демо
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
