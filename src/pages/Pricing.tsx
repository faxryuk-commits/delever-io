import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { 
  Check, ArrowRight, Percent, CreditCard, Gift, Smartphone, Sparkles, Palette, Rocket, Shield, Star,
  ShoppingBag, Truck, Monitor, Megaphone, BarChart3, CalendarCheck, Users, ChefHat
} from 'lucide-react'

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

const addOns: Array<{
  name: string
  price: string
  period: string
  icon: React.ReactNode
  color: string
  bgColor: string
  desc: string
}> = [
  { 
    name: 'Агрегатор за одного', 
    price: '260,000 soʼm', 
    period: 'за филиал/месяц',
    icon: <ShoppingBag className="h-6 w-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    desc: 'Интеграция с одним агрегатором'
  },
  { 
    name: 'Агрегатор все', 
    price: '650,000 soʼm', 
    period: 'за филиал/месяц',
    icon: <ShoppingBag className="h-6 w-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    desc: 'Интеграция со всеми агрегаторами'
  },
  { 
    name: 'Курьер сервис', 
    price: '195,000 soʼm', 
    period: 'за сервис/месяц',
    icon: <Truck className="h-6 w-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    desc: 'Яндекс Доставка, Wolt Drive и др.'
  },
  { 
    name: 'Киоск', 
    price: '910,000 soʼm', 
    period: 'за штуку/месяц',
    icon: <Monitor className="h-6 w-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    desc: 'Терминал самообслуживания'
  },
  { 
    name: 'Маркетинг', 
    price: '390,000 soʼm', 
    period: 'за бренд/месяц',
    icon: <Megaphone className="h-6 w-6" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    desc: 'Push, SMS, email рассылки'
  },
  { 
    name: 'Дашборд', 
    price: '130,000 soʼm', 
    period: 'за бренд/месяц',
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    desc: 'Расширенная аналитика'
  },
  { 
    name: 'Бронь', 
    price: '130,000 soʼm', 
    period: 'за бренд/месяц',
    icon: <CalendarCheck className="h-6 w-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    desc: 'Бронирование столиков'
  },
  { 
    name: 'Курьерка', 
    price: '260,000 soʼm', 
    period: 'за бренд/месяц',
    icon: <Users className="h-6 w-6" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    desc: 'Управление своими курьерами'
  },
  { 
    name: 'Кухня', 
    price: '65,000 soʼm', 
    period: 'за филиал/месяц',
    icon: <ChefHat className="h-6 w-6" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    desc: 'Экран для кухни (KDS)'
  },
]

const additional: Array<{
  name: string
  price: string
  period: string
  icon: React.ReactNode
  color: string
  bgColor: string
  desc: string
}> = [
  { 
    name: 'Выделенный менеджер', 
    price: '1,300,000 soʼm', 
    period: 'за бренд/месяц',
    icon: <Users className="h-6 w-6" />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-100',
    desc: 'Персональный аккаунт-менеджер'
  },
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
                className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${addon.bgColor} ${addon.color} flex items-center justify-center flex-shrink-0`}>
                    {addon.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-brand-darkBlue mb-1">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60 mb-3">
                      {addon.desc}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-brand-darkBlue">
                        {addon.price}
                      </span>
                    </div>
                    <div className="text-xs text-brand-darkBlue/50 mt-1">
                      {addon.period}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* White Label - Premium Section */}
        <section className="container mx-auto max-w-7xl mb-16">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-darkBlue via-[#003d66] to-[#00527a] p-1">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
              
              <div className="relative bg-gradient-to-br from-brand-darkBlue/95 via-[#003d66]/95 to-[#00527a]/95 rounded-[22px] p-8 md:p-12">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-brand-darkBlue px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    Премиум решение
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left side - Info */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-xl">
                      <Smartphone className="h-10 w-10 text-brand-darkBlue" />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                      White Label
                      <br />
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Приложение
                      </span>
                    </h2>
                    
                    <p className="text-xl text-white/80 mb-6 leading-relaxed">
                      Собственное мобильное приложение под вашим брендом. Полная кастомизация дизайна, иконки и названия в App Store и Google Play.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                      <div className="text-center sm:text-left">
                        <div className="text-4xl md:text-5xl font-bold text-white">
                          13,000,000
                          <span className="text-2xl ml-2 text-amber-400">soʼm</span>
                        </div>
                        <div className="text-white/60 text-sm mt-1">единоразовая оплата</div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Features */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                      <Check className="h-6 w-6 text-amber-400" />
                      Что входит
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: <Palette className="h-5 w-5" />, text: 'Ваш дизайн и бренд' },
                        { icon: <Smartphone className="h-5 w-5" />, text: 'iOS + Android' },
                        { icon: <Rocket className="h-5 w-5" />, text: 'Публикация в сторах' },
                        { icon: <Shield className="h-5 w-5" />, text: 'Push-уведомления' },
                        { icon: <Sparkles className="h-5 w-5" />, text: 'Программа лояльности' },
                        { icon: <Star className="h-5 w-5" />, text: 'Техподдержка 24/7' },
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/90">
                          <div className="text-amber-400">{feature.icon}</div>
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/white-label" className="block w-full mt-6">
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-brand-darkBlue font-bold shadow-lg"
                      >
                        Подробнее о приложении
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Additional */}
        <section className="container mx-auto max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
              Дополнительные услуги
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            {additional.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-brand-darkBlue mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60 mb-3">
                      {item.desc}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-brand-darkBlue">
                        {item.price}
                      </span>
                    </div>
                    <div className="text-xs text-brand-darkBlue/50 mt-1">
                      {item.period}
                    </div>
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
                onClick={() => window.open('https://admin.delever.uz/#/login', '_blank')}
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

