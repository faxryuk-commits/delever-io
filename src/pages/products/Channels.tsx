import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Globe, MessageSquare, QrCode, ArrowRight, Check, Sparkles } from 'lucide-react'

const channels = [
  {
    icon: Smartphone,
    title: 'Мобильное приложение',
    description: 'iOS и Android под вашим брендом',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Globe,
    title: 'Веб-сайт',
    description: 'Адаптивный сайт с онлайн-заказом',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: MessageSquare,
    title: 'Telegram-бот',
    description: 'Заказы прямо в мессенджере',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: QrCode,
    title: 'QR-меню',
    description: 'Бесконтактное меню для столиков',
    color: 'from-orange-500 to-orange-600',
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <>
      <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.span 
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Без комиссий
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Каналы продаж
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Запустите собственные каналы продаж без комиссий агрегаторов
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Запустить каналы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Channels Grid */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {channels.map((channel, idx) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{channel.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{channel.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">Преимущества</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-3 bg-white rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Check className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-brand-darkBlue font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
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
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
