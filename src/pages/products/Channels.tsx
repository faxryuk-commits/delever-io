import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { FeaturesShowcase } from '@/components/home/FeaturesShowcase'
import { ChannelDetails } from '@/components/channels/ChannelDetails'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { CheckCircle, ArrowRight, Calendar, Palette, Code, Rocket } from 'lucide-react'

export function Channels() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const steps = [
    { icon: <Calendar className="h-6 w-6" />, title: 'Бриф', description: 'Обсуждаем ваши потребности и цели' },
    { icon: <Palette className="h-6 w-6" />, title: 'Дизайн/Подключение', description: 'Создаём дизайн и подключаем каналы' },
    { icon: <Code className="h-6 w-6" />, title: 'Тест', description: 'Тестируем все функции перед запуском' },
    { icon: <Rocket className="h-6 w-6" />, title: 'Запуск', description: 'Запускаем ваши каналы продаж' },
  ]

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Собственные каналы продаж
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">под вашим брендом</span>
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Запустите сайт, приложение, Telegram-бот, QR-меню и другие каналы без комиссий агрегаторов. Все заказы в единой системе с полным контролем над данными клиентов.
              </p>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Запустить каналы продаж
              </Button>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Features */}
        <FeaturesShowcase />

        {/* Channel Details */}
        <ChannelDetails />

        {/* Work Together */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                  Все каналы в единой системе
                </h2>
                <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                  Единый каталог, общие акции и один профиль клиента во всех каналах. Клиент может заказать через сайт, приложение или Telegram — все данные сохраняются в единой базе.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {['Единый каталог', 'Общие акции', 'Клиентский профиль'].map((feature, idx) => (
                    <FadeInOnScroll key={idx} delay={idx * 0.1}>
                      <div className="bg-white rounded-xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300">
                        <CheckCircle className="h-8 w-8 text-brand-darkBlue mx-auto mb-3" />
                        <h3 className="font-semibold text-brand-darkBlue">{feature}</h3>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Launch Steps */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Запуск за неделю
                </h2>
                <p className="text-xl text-brand-darkBlue/80 font-light">
                  От идеи до запуска — всего 7 дней
                </p>
              </div>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-lightBlue rounded-full mx-auto mb-4 flex items-center justify-center text-brand-darkBlue">
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-brand-darkBlue mb-2">Шаг {idx + 1}</div>
                    <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/80 leading-relaxed">{step.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы запустить свои каналы продаж?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами и получите демо-версию
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Запустить каналы продаж
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

