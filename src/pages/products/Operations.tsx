import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Truck, Users, Monitor, Clock, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Диспетчеризация',
    description: 'Автоматическое распределение заказов между курьерами',
  },
  {
    icon: Users,
    title: 'Курьерский модуль',
    description: 'Приложение для курьеров с навигацией',
  },
  {
    icon: Monitor,
    title: 'Рабочие места',
    description: 'Интерфейсы для операторов и кухни',
  },
  {
    icon: Clock,
    title: '99.9% Uptime',
    description: 'Гарантированная стабильность работы',
  },
]

const results = [
  { value: '-30%', label: 'Время доставки' },
  { value: '-25%', label: 'Ошибки' },
  { value: '-20%', label: 'Затраты' },
]

export function Operations() {
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
              Операции доставки
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Управляйте диспетчеризацией, курьерами и кухней из одного окна
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Оптимизировать операции
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

        {/* Results */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">Результаты клиентов</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              {results.map((result, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-brand-darkBlue mb-1">{result.value}</div>
                  <div className="text-sm text-brand-darkBlue/60">{result.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Integrations */}
        <section className="container mx-auto max-w-3xl mb-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">Интеграции с POS</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['iiko', 'R-Keeper', 'Jowi', 'Poster', 'Paloma', 'Syrve'].map((pos, idx) => (
                <span 
                  key={idx}
                  className="text-sm bg-white border border-brand-lightTeal/30 text-brand-darkBlue/70 px-4 py-2 rounded-lg"
                >
                  {pos}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Готовы оптимизировать?
            </h2>
            <p className="text-white/70 mb-6">
              Внедрение занимает 1-2 недели
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
