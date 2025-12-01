import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { Truck, Users, Monitor, Clock, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react'

export function Operations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Диспетчеризация',
      description: 'Автоматическое распределение заказов между курьерами. Отслеживание статусов в реальном времени и автоматические уведомления клиентов.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Курьерский модуль',
      description: 'Мобильное приложение для курьеров с навигацией и маршрутизацией. Автоматический расчёт зарплаты и контроль посещаемости.',
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'Рабочие места',
      description: 'Специализированные интерфейсы для операторов, кухни и колл-центра. Все заказы в единой системе без дублирования.',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Стабильность 99.9%',
      description: 'Гарантированная стабильность работы с мониторингом 24/7. Автоматическое восстановление при сбоях.',
    },
  ]

  const stats = [
    { icon: <TrendingDown className="h-6 w-6" />, value: '-30%', label: 'Время доставки' },
    { icon: <CheckCircle className="h-6 w-6" />, value: '-25%', label: 'Ошибки' },
    { icon: <TrendingDown className="h-6 w-6" />, value: '-20%', label: 'Операционные затраты' },
  ]

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Операции доставки
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">под полным контролем</span>
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Управляйте диспетчеризацией, курьерами и кухней из одного окна. Автоматизация процессов снижает ошибки и ускоряет доставку на 30%.
              </p>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Оптимизировать операции
              </Button>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft border border-brand-lightTeal/20 hover:shadow-medium transition-all duration-300 flex flex-col h-full">
                  <div className="text-brand-darkBlue mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-brand-darkBlue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-brand-darkBlue/80 flex-grow leading-relaxed">{feature.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
                Интеграции с POS и кухней
              </h2>
              <p className="text-xl text-brand-darkBlue/80">
                Автоматическая передача заказов в кассу и на кухню
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['iiko', 'R-Keeper', 'Syrve', 'Poster', 'Paloma'].map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-white px-6 py-3 rounded-lg border border-brand-lightTeal/20 text-sm font-medium text-brand-darkBlue hover:border-brand-darkBlue/30 hover:shadow-soft transition-all"
                >
                  {pos}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                Результаты наших клиентов
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 text-center border border-brand-lightTeal/20 shadow-soft flex flex-col justify-center"
                >
                  <div className="text-brand-darkBlue mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-4xl font-bold text-brand-darkBlue mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-lg text-brand-darkBlue/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы оптимизировать операции?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами и узнайте, как Delever может помочь вашему бизнесу
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Оптимизировать операции
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

