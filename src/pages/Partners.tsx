import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { Users, Percent, Globe, TrendingUp, ArrowRight } from 'lucide-react'

export function Partners() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const partnerTypes = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Консультанты HoReCa',
      description: 'Помогайте вашим клиентам внедрять современные решения для доставки',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Интеграторы POS',
      description: 'Расширяйте возможности ваших POS-систем интеграцией с Delever',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Маркетинговые агентства',
      description: 'Предлагайте клиентам комплексные решения для роста онлайн-продаж',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Франчайзеры',
      description: 'Единая платформа для всех ваших франчайзи с индивидуальными настройками',
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
                Партнёрская программа
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">Delever</span>
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Зарабатывайте, рекомендуя Delever своим клиентам. Получайте до 20% с первого платежа и регулярные выплаты за каждого привлечённого клиента.
              </p>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Стать партнёром
              </Button>
            </div>
          </FadeInOnScroll>
        </section>

        {/* For Whom */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Для кого программа
            </h2>
          </div>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTypes.map((type, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col h-full">
              <div className="text-brand-darkBlue mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
                {type.title}
              </h3>
              <p className="text-brand-darkBlue/70 text-sm flex-grow leading-relaxed">{type.description}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>

        {/* Model */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Условия сотрудничества
                </h2>
                <p className="text-xl text-brand-darkBlue/80 font-light">
                  Прозрачная модель вознаграждения с регулярными выплатами
                </p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <div className="max-w-2xl mx-auto bg-brand-lightBeige rounded-2xl p-8 border border-brand-darkBlue/10 shadow-soft">
              <div className="flex items-center justify-center mb-6">
                <Percent className="h-12 w-12 text-brand-darkBlue" />
              </div>
              <div className="space-y-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-darkBlue mb-2">
                    До 20%
                  </div>
                  <div className="text-brand-darkBlue/80">
                    с первого платежа каждого привлечённого клиента
                  </div>
                </div>
                <div className="pt-4 border-t border-brand-darkBlue/20">
                  <div className="text-lg text-brand-darkBlue/80">
                    Регулярные выплаты каждый месяц. Прозрачная отчётность по каждому клиенту
                  </div>
                </div>
              </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Why */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Почему партнёры выбирают нас
                </h2>
              </div>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">1000+</div>
                <div className="text-brand-darkBlue/80">Активных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">5</div>
                <div className="text-brand-darkBlue/80">Стран присутствия</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-darkBlue mb-2">99.9%</div>
                <div className="text-brand-darkBlue/80">Uptime платформы</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы стать партнёром?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Заполните форму и мы свяжемся с вами в ближайшее время для обсуждения условий
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Стать партнёром
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} tag="partner" />
    </>
  )
}

