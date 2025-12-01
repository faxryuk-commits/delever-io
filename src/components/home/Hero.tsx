import { useState } from 'react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'
import { ArrowRight } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

export function Hero() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-subtle">
        <div className="container mx-auto max-w-7xl">
          <FadeInOnScroll delay={0.1}>
            <div className="text-center max-w-5xl mx-auto mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-darkBlue mb-5 leading-[1.1] tracking-tight">
                Единая платформа
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">для управления доставкой</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-darkBlue/75 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                Управляйте всеми каналами продаж, операциями доставки и аналитикой из одного места. Запустите собственные каналы продаж, автоматизируйте работу с агрегаторами и увеличьте прибыль уже через неделю.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => window.open('https://app.delever.io/register', '_blank')}
                  className="group text-lg px-8 py-6"
                >
                  Запустить сейчас
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Statistics */}
          <FadeInOnScroll delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-2 tracking-tight">13M+</div>
              <div className="text-sm md:text-base text-brand-darkBlue/65 font-medium">Заказов обработано</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-2 tracking-tight">5</div>
              <div className="text-sm md:text-base text-brand-darkBlue/65 font-medium">Стран</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-2 tracking-tight">1000+</div>
              <div className="text-sm md:text-base text-brand-darkBlue/65 font-medium">Ресторанов и магазинов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-2 tracking-tight">40+</div>
              <div className="text-sm md:text-base text-brand-darkBlue/65 font-medium">Интеграций</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-2 tracking-tight">$100M+</div>
              <div className="text-sm md:text-base text-brand-darkBlue/65 font-medium">Продаж через платформу</div>
            </div>
            </div>
          </FadeInOnScroll>

          {/* Integrations logos */}
          <FadeInOnScroll delay={0.5}>
            <div className="text-center mb-8">
            <p className="text-sm text-brand-darkBlue/55 mb-6 font-medium">Интеграции с ведущими агрегаторами и POS-системами</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {['Wolt', 'Yandex Eats', 'Talabat', 'Deliveroo', 'Noon', 'Uzum Tezkor'].map(
                (brand) => (
                  <div key={brand} className="text-base font-medium text-brand-darkBlue/45 hover:text-brand-darkBlue/70 transition-colors">
                    {brand}
                  </div>
                )
              )}
            </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

