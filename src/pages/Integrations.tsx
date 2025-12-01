import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { ArrowRight, Code, Shield, HeadphonesIcon } from 'lucide-react'

// Данные интеграций
const integrations = {
  aggregators: [
    'Uzum Tezkor', 'Glovo', 'Яндекс Ритейл', 'Яндекс Еда', 'Wolt', 'Chocofood', 'Foody'
  ],
  pos: [
    'iiko', 'R-Keeper', 'R-Keeper White Server', 'Jowi', 'Poster', 'Paloma',
    'Dodo Pizza', 'Loook', 'Neon Alisa', 'Yaros', 'Clopos', 'AliPos', 'Syrve'
  ],
  payments: [
    'Payme', 'Click', 'Uzum Bank', 'Kaspi', 'Epay', 'TipTop Pay', 'Atmos', 'Anorbank'
  ],
  delivery: [
    'Яндекс Доставка', 'Taxi Millennium', 'Wolt Drive', 'Noor'
  ],
  sms: [
    'Eskiz', 'PlayMobile', 'SMS Центр'
  ],
  analytics: [
    'Google Tag Manager'
  ],
  fiscal: [
    'Fiscal Box'
  ],
  channels: [
    'Telegram Bot', 'Website', 'Мобильное приложение', 'QR Menu', 'Admin Panel'
  ]
}

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const IntegrationCard = ({ name }: { name: string }) => (
    <div className="bg-white px-6 py-4 rounded-xl border border-brand-lightTeal/20 text-sm font-medium shadow-soft hover:shadow-medium hover:border-brand-darkBlue/30 transition-all text-brand-darkBlue text-center min-w-[140px]">
      {name}
    </div>
  )

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-16">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Хаб интеграций Delever
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 leading-relaxed font-light">
                Более 40 интеграций с ведущими сервисами. Агрегаторы, POS-системы, платёжные шлюзы, службы доставки — всё подключается за несколько часов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setContactFormOpen(true)}>
                  Запросить интеграцию
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Каналы продаж */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  Каналы продаж
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Собственные каналы для приёма заказов
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.channels.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Агрегаторы заказов */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  Агрегаторы заказов
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Все заказы с агрегаторов в единой системе
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.aggregators.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* POS-системы */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  POS-системы
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Автоматическая синхронизация заказов с кассой
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.pos.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Платёжные шлюзы */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  Платёжные шлюзы
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Приём онлайн-платежей
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.payments.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Системы доставки */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  Системы доставки
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Интеграция с курьерскими службами
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.delivery.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* SMS провайдеры */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  SMS провайдеры
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Отправка уведомлений клиентам
                </p>
              </div>
            </FadeInOnScroll>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.sms.map((item, idx) => (
                <IntegrationCard key={idx} name={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Аналитика и фискальные операторы */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeInOnScroll>
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkBlue mb-3 tracking-tight text-center">
                    Сервисы аналитики
                  </h2>
                  <p className="text-brand-darkBlue/70 mb-6 text-center">
                    Отслеживание метрик и конверсий
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {integrations.analytics.map((item, idx) => (
                      <IntegrationCard key={idx} name={item} />
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll delay={0.1}>
                <div>
                  <h2 className="text-2xl font-bold text-brand-darkBlue mb-3 tracking-tight text-center">
                    Фискальные операторы
                  </h2>
                  <p className="text-brand-darkBlue/70 mb-6 text-center">
                    Фискализация чеков
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {integrations.fiscal.map((item, idx) => (
                      <IntegrationCard key={idx} name={item} />
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* API & Enterprise */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3 tracking-tight">
                  API & Enterprise
                </h2>
                <p className="text-lg text-brand-darkBlue/70">
                  Для крупных клиентов и кастомных интеграций
                </p>
              </div>
            </FadeInOnScroll>
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
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Нужна интеграция?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами — поможем подключить любую интеграцию или разработаем кастомное решение
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Запросить интеграцию
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
