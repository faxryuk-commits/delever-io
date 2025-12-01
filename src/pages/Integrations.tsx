import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { AggregatorIntegration } from '@/components/home/AggregatorIntegration'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { ArrowRight, Code, Shield, HeadphonesIcon } from 'lucide-react'

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const posSystems = ['iiko', 'R-Keeper', 'Syrve', 'Poster', 'Paloma', 'TouchBistro']
  const paymentGateways = ['Click', 'Payme', 'Uzum', 'Stripe', 'Yandex Pay', 'PayPal']

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Хаб интеграций Delever
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 leading-relaxed font-light">
                Интеграции с ведущими агрегаторами, POS-системами и платёжными шлюзами. Все необходимые подключения из коробки — настройка занимает несколько часов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setContactFormOpen(true)}>
                  Запросить интеграцию
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Aggregators */}
        <AggregatorIntegration />

        {/* POS Systems */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  POS-системы
                </h2>
                <p className="text-xl text-brand-darkBlue/80 font-light">
                  Автоматическая синхронизация заказов с вашей кассой
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {posSystems.map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-white px-6 py-3 rounded-lg border border-brand-lightTeal/20 text-sm font-medium shadow-soft hover:shadow-medium hover:border-brand-darkBlue/30 transition-all text-brand-darkBlue"
                >
                  {pos}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Gateways */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Платёжные шлюзы
                </h2>
                <p className="text-xl text-brand-darkBlue/80 font-light">
                  Поддержка всех популярных способов оплаты
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {paymentGateways.map((gateway, idx) => (
                <div
                  key={idx}
                  className="bg-white px-6 py-3 rounded-lg border border-brand-lightTeal/20 text-sm font-medium shadow-soft hover:shadow-medium hover:border-brand-darkBlue/30 transition-all text-brand-darkBlue"
                >
                  {gateway}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API & Enterprise */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
                API & Enterprise
              </h2>
              <p className="text-xl text-brand-darkBlue/80">
                Для крупных клиентов и кастомных интеграций
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Code className="h-8 w-8 text-brand-darkBlue mx-auto mb-4" />, title: 'API доступ', desc: 'Полный доступ к API для кастомных интеграций' },
                { icon: <Shield className="h-8 w-8 text-brand-darkBlue mx-auto mb-4" />, title: 'SLA', desc: 'Гарантированное время отклика и стабильность' },
                { icon: <HeadphonesIcon className="h-8 w-8 text-brand-darkBlue mx-auto mb-4" />, title: 'Выделенный менеджер', desc: 'Персональная поддержка для Enterprise клиентов' },
              ].map((item, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft text-center hover:border-brand-darkBlue/30 hover:shadow-medium transition-all duration-300">
                    {item.icon}
                    <h3 className="text-xl font-semibold text-brand-darkBlue mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-brand-darkBlue/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы подключить интеграции?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами и мы поможем настроить все необходимые интеграции
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Подключить интеграции
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

