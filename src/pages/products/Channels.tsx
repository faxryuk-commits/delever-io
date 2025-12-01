import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { Smartphone, Globe, MessageSquare, QrCode, ArrowRight, Check } from 'lucide-react'

const channels = [
  {
    icon: Smartphone,
    title: 'Мобильное приложение',
    description: 'iOS и Android под вашим брендом',
  },
  {
    icon: Globe,
    title: 'Веб-сайт',
    description: 'Адаптивный сайт с онлайн-заказом',
  },
  {
    icon: MessageSquare,
    title: 'Telegram-бот',
    description: 'Заказы прямо в мессенджере',
  },
  {
    icon: QrCode,
    title: 'QR-меню',
    description: 'Бесконтактное меню для столиков',
  },
]

const benefits = [
  '0% комиссии агрегаторов',
  'Полный контроль данных клиентов',
  'Push-уведомления и рассылки',
  'Ваш бренд везде',
]

export function Channels() {
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
              Каналы продаж
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Запустите собственные каналы продаж без комиссий агрегаторов
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Запустить каналы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>

        {/* Channels Grid */}
        <section className="container mx-auto max-w-4xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel, idx) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{channel.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{channel.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-4 text-center">Преимущества</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-brand-darkBlue flex-shrink-0" />
                  <span className="text-brand-darkBlue/70">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Запуск за неделю
            </h2>
            <p className="text-white/70 mb-6">
              От брифа до запуска — 5-7 рабочих дней
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Обсудить запуск
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
