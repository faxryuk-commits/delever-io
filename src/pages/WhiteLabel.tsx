import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion, useInView } from 'framer-motion'
import { 
  Smartphone, 
  Palette, 
  Shield, 
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Полное брендирование',
    description: 'Ваш логотип, цвета и стиль во всём приложении',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Smartphone,
    title: 'Публикация в сторах',
    description: 'Мы публикуем в App Store и Google Play под вашим именем',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Без упоминания Delever',
    description: 'Клиенты видят только ваш бренд',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Zap,
    title: 'Быстрый запуск',
    description: 'Готовое приложение за 1-2 недели',
    color: 'from-orange-500 to-orange-600',
  },
]

const included = [
  'iOS приложение',
  'Android приложение',
  'Push-уведомления',
  'Программа лояльности',
  'Онлайн-оплата',
  'Трекинг заказов',
  'История заказов',
  'Избранное',
]

export function WhiteLabel() {
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
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Ваш бренд
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              White Label приложение
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              Собственное мобильное приложение под вашим брендом в App Store и Google Play
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Заказать приложение
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Price */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-brand-darkBlue rounded-2xl p-8 text-center overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <motion.div 
                className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Smartphone className="h-10 w-10 text-white" />
              </motion.div>
              <motion.div 
                className="text-5xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                13,000,000 soʼm
              </motion.div>
              <p className="text-white/60">единоразовая оплата</p>
            </div>
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
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-6 w-6" />
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

        {/* What's Included */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">Что входит</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {included.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-2 bg-white rounded-lg p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-brand-darkBlue">{item}</span>
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
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-brand-darkBlue tracking-tight">
              Готовы к запуску?
            </h2>
            <p className="text-brand-darkBlue/70 mb-6">
              Обсудим ваш проект и покажем примеры
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              Обсудить проект
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
