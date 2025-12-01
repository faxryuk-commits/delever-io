import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion, useInView } from 'framer-motion'
import { Megaphone, Users, Heart, Gift, ArrowRight, Sparkles, Target } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'RFM-анализ',
    description: 'Сегментация клиентов по активности',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Megaphone,
    title: 'Push и SMS',
    description: 'Персонализированные рассылки',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Heart,
    title: 'Программа лояльности',
    description: 'Бонусы, кэшбэк, реферальная система',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Gift,
    title: 'Акции и промокоды',
    description: 'Гибкая система скидок',
    color: 'from-emerald-500 to-emerald-600',
  },
]

const results = [
  { value: '+25%', label: 'Средний чек', color: 'text-emerald-600' },
  { value: '+40%', label: 'Повторные заказы', color: 'text-blue-600' },
  { value: '+60%', label: 'LTV клиента', color: 'text-purple-600' },
]

export function Marketing() {
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
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Рост продаж
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Маркетинг и CRM
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Увеличивайте повторные продажи и средний чек
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Увеличить продажи
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{feature.title}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Results */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">Результаты клиентов</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              {results.map((result, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <motion.div 
                    className={`text-4xl font-bold ${result.color} mb-1`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  >
                    {result.value}
                  </motion.div>
                  <div className="text-sm text-brand-darkBlue/60">{result.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CRM Preview */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-brand-darkBlue rounded-2xl p-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <motion.div 
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">CRM с историей клиента</h3>
                <p className="text-white/60 text-sm">Вся информация о клиенте в одном месте</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
              {['Заказы', 'Предпочтения', 'Адреса', 'Бонусы'].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white/10 backdrop-blur rounded-lg p-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-brand-darkBlue tracking-tight">
              Начните расти сегодня
            </h2>
            <p className="text-brand-darkBlue/70 mb-6">
              Подключение за 1 день
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Получить консультацию
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
