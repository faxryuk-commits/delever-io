import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Target, Users, TrendingUp, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Видение',
    description: 'Стать 100-летней компанией, помогающей бизнесу расти',
  },
  {
    icon: Users,
    title: 'Миссия',
    description: 'Сделать запуск доставки доступным для любого бизнеса',
  },
  {
    icon: TrendingUp,
    title: 'Ценности',
    description: 'Прозрачность, надёжность, инновации и забота о клиентах',
  },
]

const stats = [
  { value: '5', label: 'Стран' },
  { value: '1000+', label: 'Бизнесов' },
  { value: '13M+', label: 'Заказов' },
  { value: '50+', label: 'Партнёров' },
]

export function About() {
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
              О компании Delever
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
              Мы создаём технологии, которые помогают бизнесу расти быстрее
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-brand-darkBlue mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-darkBlue/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* History */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Наша история
            </h2>
            <div className="space-y-4 text-brand-darkBlue/70 leading-relaxed">
              <p>
                Delever создан командой с опытом работы в крупных агрегаторах доставки. Мы знаем проблемы бизнеса изнутри.
              </p>
              <p>
                Видя, как бизнесы теряют прибыль на комиссиях агрегаторов, мы создали единую платформу для решения всех задач доставки.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 text-center tracking-tight">
              Наши ценности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <div 
                    key={idx}
                    className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue mb-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-brand-darkBlue mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </section>

        {/* Contact Info */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-lightBeige/50 rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-brand-darkBlue mb-6">Контакты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="tel:+998781139813"
                className="flex items-center gap-3 text-brand-darkBlue/70 hover:text-brand-darkBlue transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm">+998 78 113 98 13</span>
              </a>
              <a 
                href="mailto:support@delever.uz"
                className="flex items-center gap-3 text-brand-darkBlue/70 hover:text-brand-darkBlue transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">support@delever.uz</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/1iobehkkfP83hAMj6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brand-darkBlue/70 hover:text-brand-darkBlue transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span className="text-sm">Ташкент, Амира Темура 129Б</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Готовы к сотрудничеству?
            </h2>
            <p className="text-white/70 mb-6">
              Свяжитесь с нами для обсуждения вашего проекта
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setContactFormOpen(true)}
            >
              Связаться с нами
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
