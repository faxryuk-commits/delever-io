import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { Globe, TrendingUp, Users, Target, ArrowRight } from 'lucide-react'

export function About() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Видение',
      description: 'Стать 100-летней компанией, которая помогает МСБ расти и развиваться',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Миссия',
      description: 'Сделать запуск собственной доставки доступным для каждого ресторана',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Ценности',
      description: 'Прозрачность, надёжность, инновации и забота о клиентах',
    },
  ]


  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                О компании Delever
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Мы создаём технологии, которые помогают ресторанам расти быстрее и работать эффективнее
              </p>
            </div>
          </FadeInOnScroll>
        </section>

        {/* History */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                  Наша история
                </h2>
                <div className="space-y-4 text-brand-darkBlue/80 leading-relaxed">
                  <p>
                    Delever создан командой с опытом работы в крупных агрегаторах доставки, сетях ресторанов и разработке технологических решений. Мы знаем проблемы ресторанов изнутри.
                  </p>
                  <p>
                    Видя, как рестораны теряют прибыль на комиссиях агрегаторов и тратят время на ручную работу, мы решили создать единую платформу, которая решает все задачи доставки — от приёма заказов до аналитики и маркетинга.
                  </p>
                  <p>
                    Сегодня Delever помогает более 1000 заведениям в 5 странах увеличивать прибыль и упрощать операции.
                  </p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Geography */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <Globe className="h-12 w-12 text-brand-darkBlue mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  География и масштабы
                </h2>
              </div>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">5</div>
                <div className="text-brand-darkBlue/80">Стран</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">1000+</div>
                <div className="text-brand-darkBlue/80">Ресторанов и магазинов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">13M+</div>
                <div className="text-brand-darkBlue/80">Заказов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">50+</div>
                <div className="text-brand-darkBlue/80">Партнёров</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Наши ценности
                </h2>
              </div>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-brand-lightBeige rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col h-full">
                  <div className="text-brand-darkBlue mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
                    {value.title}
                  </h3>
                  <p className="text-brand-darkBlue/80 flex-grow leading-relaxed">{value.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы начать работать с нами?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Свяжитесь с нами и узнайте, как Delever поможет увеличить прибыль и упростить операции вашего ресторана
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                Обсудить сотрудничество
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://app.delever.io/register', '_blank')}
              >
                Стать клиентом
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

