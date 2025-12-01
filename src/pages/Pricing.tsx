import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { Check, ArrowRight, Percent, CreditCard, Gift } from 'lucide-react'

const plans = [
  {
    name: 'Start',
    orders: 1000,
    price: '1,300,000 soʼm',
    period: '/месяц',
    description: 'Для растущего бизнеса',
    features: [
      'POS интеграция',
      'Telegram-бот',
      'Веб-сайт',
      'RFM анализ',
      'Курьерский модуль',
      'Расширенная аналитика',
    ],
    highlight: false,
  },
  {
    name: 'Medium',
    orders: 3000,
    price: '3,250,000 soʼm',
    period: '/месяц',
    description: 'Для сетей ресторанов',
    features: [
      'Всё из Start',
      'Мобильное приложение',
      'ABC-XYZ анализ',
      'Маркетинг модуль',
      'Приоритетная поддержка',
      'Базовый CRM',
      'Отчёты',
    ],
    highlight: true,
  },
  {
    name: 'Big',
    orders: 6000,
    price: '6,500,000 soʼm',
    period: '/месяц',
    description: 'Для крупных сетей',
    features: [
      'Всё из Medium',
      'Множество точек',
      'Расширенная аналитика',
      'Кастомные интеграции',
      'SLA гарантии',
    ],
    highlight: false,
  },
  {
    name: 'Enterprise',
    orders: 10000,
    price: '13,000,000 soʼm',
    period: '/месяц',
    description: 'Индивидуальные решения',
    features: [
      'Всё из Big',
      'Выделенный менеджер',
      'API доступ',
      'Кастомная разработка',
      'Персональный SLA',
    ],
    highlight: false,
  },
]

const addOns = [
  { name: 'Агрегатор за одного', price: '260,000 soʼm', period: 'за филиал/месяц' },
  { name: 'Агрегатор все', price: '650,000 soʼm', period: 'за филиал/месяц' },
  { name: 'Курьер сервис', price: '195,000 soʼm', period: 'за сервис/месяц' },
  { name: 'Киоск', price: '910,000 soʼm', period: 'за штуку/месяц' },
  { name: 'Маркетинг', price: '390,000 soʼm', period: 'за бренд/месяц' },
  { name: 'Дашборд', price: '130,000 soʼm', period: 'за бренд/месяц' },
  { name: 'Бронь', price: '130,000 soʼm', period: 'за бренд/месяц' },
  { name: 'Курьерка', price: '260,000 soʼm', period: 'за бренд/месяц' },
  { name: 'Кухня', price: '65,000 soʼm', period: 'за филиал/месяц' },
]

const oneTime = [
  { name: 'White Label приложение', price: '13,000,000 soʼm', period: 'единоразово' },
]

const additional = [
  { name: 'Выделенный менеджер', price: '1,300,000 soʼm', period: 'за бренд/месяц' },
]

const perOrder = {
  name: 'Per order',
  price: '1,950 soʼm',
  description: 'За каждый заказ сверх лимита тарифа',
}

export function Pricing() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Тарифы Delever
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Выберите план, который подходит вашему бизнесу. Гибкая система тарификации с возможностью дополнения модулями.
              </p>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Deposit & Discounts */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-brand-lightBlue to-brand-lightBeige rounded-xl p-6 border border-brand-darkBlue/10 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="h-6 w-6 text-brand-darkBlue" />
                <h3 className="text-xl font-semibold text-brand-darkBlue">Депозит</h3>
              </div>
              <p className="text-brand-darkBlue/80">
                Клиент вносит депозит в размере <span className="font-bold">6,500,000 soʼm</span> перед началом работы. Депозит используется на погашение ежемесячной абонентской платы.
              </p>
            </div>
            <div className="bg-gradient-to-br from-brand-lightBeige to-brand-lightBlue rounded-xl p-6 border border-brand-darkBlue/10 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="h-6 w-6 text-brand-darkBlue" />
                <h3 className="text-xl font-semibold text-brand-darkBlue">Скидки</h3>
              </div>
              <ul className="space-y-2 text-brand-darkBlue/80">
                <li className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-brand-darkBlue" />
                  <span>При оплате на <span className="font-semibold">6 месяцев</span> — скидка <span className="font-bold">10%</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-brand-darkBlue" />
                  <span>При оплате на <span className="font-semibold">12 месяцев</span> — скидка <span className="font-bold">15%</span></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Plans */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
              Основные тарифы
            </h2>
            <p className="text-xl text-brand-darkBlue/80">
              Выберите план с учётом количества заказов в месяц
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 relative flex flex-col h-full ${
                  plan.highlight
                    ? 'border-brand-darkBlue scale-105'
                    : 'border-brand-lightTeal/30'
                } transition-transform hover:shadow-xl`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-darkBlue text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Популярный
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-brand-darkBlue mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <div className="text-sm text-brand-darkBlue/70 mb-1">
                      До {plan.orders.toLocaleString()} заказов
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-brand-darkBlue">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-brand-darkBlue/60 text-lg ml-1">{plan.period}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-brand-darkBlue/70">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow min-h-[200px]">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-brand-darkBlue/80 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-auto"
                  variant={plan.highlight ? 'primary' : 'outline'}
                  onClick={() => setContactFormOpen(true)}
                >
                  Выбрать план
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Per Order */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="bg-brand-lightBlue rounded-xl p-6 border-2 border-brand-lightTeal/30">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-brand-darkBlue mb-2">
                  {perOrder.name}
                </h3>
                <p className="text-brand-darkBlue/70">{perOrder.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand-darkBlue">
                  {perOrder.price}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
              Дополнительные модули
            </h2>
            <p className="text-xl text-brand-darkBlue/80">
              Расширьте функциональность платформы дополнительными модулями
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-brand-darkBlue mb-3">
                  {addon.name}
                </h3>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-brand-darkBlue">
                    {addon.price}
                  </div>
                  <div className="text-sm text-brand-darkBlue/70">
                    {addon.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* One-time */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
              Единоразовые услуги
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {oneTime.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-brand-darkBlue mb-3">
                  {item.name}
                </h3>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-brand-darkBlue">
                    {item.price}
                  </div>
                  <div className="text-sm text-brand-darkBlue/70">
                    {item.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
              Дополнительные услуги
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additional.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-brand-darkBlue mb-3">
                  {item.name}
                </h3>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-brand-darkBlue">
                    {item.price}
                  </div>
                  <div className="text-sm text-brand-darkBlue/70">
                    {item.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-4xl">
          <div className="bg-gradient-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы начать?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами для расчёта стоимости и выбора оптимального тарифа
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setContactFormOpen(true)}
                className="group"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://app.delever.io/register', '_blank')}
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

