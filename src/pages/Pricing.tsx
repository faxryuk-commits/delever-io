import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Smartphone, Gift, CreditCard } from 'lucide-react'

const plans = [
  {
    name: 'Start',
    orders: '1,000',
    price: '1,300,000',
    features: ['POS интеграция', 'Telegram-бот', 'Веб-сайт', 'Курьерский модуль', 'Базовая аналитика'],
    highlight: false,
  },
  {
    name: 'Medium',
    orders: '3,000',
    price: '3,250,000',
    features: ['Всё из Start', 'Мобильное приложение', 'ABC-XYZ анализ', 'Маркетинг модуль', 'Приоритетная поддержка'],
    highlight: true,
  },
  {
    name: 'Big',
    orders: '6,000',
    price: '6,500,000',
    features: ['Всё из Medium', 'Множество точек', 'Кастомные интеграции', 'SLA гарантии'],
    highlight: false,
  },
  {
    name: 'Enterprise',
    orders: '10,000',
    price: '13,000,000',
    features: ['Всё из Big', 'Выделенный менеджер', 'API доступ', 'Кастомная разработка'],
    highlight: false,
  },
]

export function Pricing() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-5xl mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Тарифы
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              Выберите план с учётом количества заказов в месяц
            </p>
          </motion.div>
        </section>

        {/* Info Cards */}
        <section className="container mx-auto max-w-4xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-lightBlue/30 rounded-xl p-5 flex items-start gap-4">
              <CreditCard className="h-6 w-6 text-brand-darkBlue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-darkBlue mb-1">Депозит</h3>
                <p className="text-sm text-brand-darkBlue/70">
                  6,500,000 soʼm — используется на оплату подписки
                </p>
              </div>
            </div>
            <div className="bg-brand-lightBeige/50 rounded-xl p-5 flex items-start gap-4">
              <Gift className="h-6 w-6 text-brand-darkBlue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-darkBlue mb-1">Скидки</h3>
                <p className="text-sm text-brand-darkBlue/70">
                  10% за 6 мес · 15% за 12 мес
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="container mx-auto max-w-5xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-white rounded-xl p-5 border-2 relative flex flex-col ${
                  plan.highlight
                    ? 'border-brand-darkBlue'
                    : 'border-brand-lightTeal/30'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-darkBlue text-white text-xs font-medium px-3 py-1 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-brand-darkBlue mb-1">{plan.name}</h3>
                  <p className="text-xs text-brand-darkBlue/50">до {plan.orders} заказов</p>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-brand-darkBlue">{plan.price}</span>
                  <span className="text-sm text-brand-darkBlue/50 ml-1">soʼm/мес</span>
                </div>

                <ul className="space-y-2 mb-5 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-brand-darkBlue/70">
                      <Check className="h-4 w-4 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.highlight ? 'primary' : 'outline'}
                  onClick={() => setContactFormOpen(true)}
                >
                  Выбрать
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* White Label */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">White Label приложение</h3>
                  <p className="text-white/70 mb-4">
                    Собственное приложение под вашим брендом в App Store и Google Play
                  </p>
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-3xl font-bold text-white">13,000,000 soʼm</span>
                    <span className="text-white/50 text-sm">единоразово</span>
                  </div>
                </div>
                <Link to="/white-label">
                  <Button variant="secondary" size="lg">
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-3">
              Нужна консультация?
            </h2>
            <p className="text-brand-darkBlue/60 mb-6">
              Поможем выбрать оптимальный тариф для вашего бизнеса
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Получить консультацию
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
