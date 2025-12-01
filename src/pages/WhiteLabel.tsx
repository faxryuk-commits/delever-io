import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Smartphone, 
  Palette, 
  Rocket, 
  Shield, 
  Bell,
  Gift
} from 'lucide-react'

const features = [
  { icon: Palette, title: 'Ваш дизайн', description: 'Логотип, цвета, шрифты' },
  { icon: Smartphone, title: 'iOS + Android', description: 'Оба приложения' },
  { icon: Rocket, title: 'Публикация', description: 'В App Store и Google Play' },
  { icon: Bell, title: 'Push-уведомления', description: 'Рассылки клиентам' },
  { icon: Gift, title: 'Лояльность', description: 'Бонусные программы' },
  { icon: Shield, title: 'Поддержка 24/7', description: 'Техническая помощь' },
]

const stats = [
  { value: '+60%', label: 'Рост выручки' },
  { value: '×2.3', label: 'Больше заказов' },
  { value: '4.8', label: 'Рейтинг в сторах' },
]

export function WhiteLabel() {
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
            <div className="w-16 h-16 rounded-2xl bg-brand-darkBlue flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              White Label приложение
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Собственное мобильное приложение под вашим брендом в App Store и Google Play
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Заказать приложение
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center">
                <span className="text-2xl font-bold text-brand-darkBlue">13,000,000 soʼm</span>
                <span className="text-brand-darkBlue/50 text-sm ml-2">единоразово</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-brand-darkBlue mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-darkBlue/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto max-w-4xl mb-16">
          <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 text-center">Что входит</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-0.5">{feature.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 text-center">Как это работает</h2>
          <div className="space-y-3">
            {[
              'Обсуждаем дизайн и функционал',
              'Создаём приложение под ваш бренд',
              'Публикуем в App Store и Google Play',
              'Обучаем вашу команду',
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-4 bg-brand-lightBeige/50 rounded-xl p-4"
              >
                <div className="w-8 h-8 rounded-full bg-brand-darkBlue text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-brand-darkBlue">{step}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Запуск за 2 недели
            </h2>
            <p className="text-white/70 mb-6">
              Своё приложение без месяцев разработки
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Обсудить проект
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
