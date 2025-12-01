import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Users, Globe, TrendingUp, Percent, ArrowRight } from 'lucide-react'

const partnerTypes = [
  {
    icon: Users,
    title: 'Консультанты HoReCa',
    description: 'Помогайте клиентам внедрять решения для доставки',
  },
  {
    icon: Globe,
    title: 'Интеграторы POS',
    description: 'Расширяйте возможности POS-систем интеграцией с Delever',
  },
  {
    icon: TrendingUp,
    title: 'Маркетинговые агентства',
    description: 'Предлагайте комплексные решения для роста онлайн-продаж',
  },
  {
    icon: Users,
    title: 'Франчайзеры',
    description: 'Единая платформа для всех ваших франчайзи',
  },
]

export function Partners() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Партнерская программа
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Зарабатывайте до 20% с каждого привлеченного клиента
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Стать партнером
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>

        {/* Partner Types */}
        <section className="container mx-auto max-w-4xl mb-16">
          <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 text-center">Для кого программа</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerTypes.map((type, idx) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{type.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{type.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Commission */}
        <section className="container mx-auto max-w-md mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8 text-center"
          >
            <Percent className="h-10 w-10 text-brand-darkBlue mx-auto mb-4" />
            <div className="text-4xl font-bold text-brand-darkBlue mb-2">До 20%</div>
            <p className="text-brand-darkBlue/70">
              с первого платежа каждого клиента
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-3xl mb-16">
          <div className="bg-brand-lightBeige/50 rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-darkBlue mb-1">1000+</div>
                <div className="text-sm text-brand-darkBlue/60">Клиентов</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-darkBlue mb-1">5</div>
                <div className="text-sm text-brand-darkBlue/60">Стран</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-darkBlue mb-1">99.9%</div>
                <div className="text-sm text-brand-darkBlue/60">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Готовы стать партнером?
            </h2>
            <p className="text-white/70 mb-6">
              Свяжитесь с нами для обсуждения условий
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Связаться
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} tag="partner" />
    </>
  )
}
