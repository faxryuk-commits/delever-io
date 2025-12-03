import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Truck, Users, Monitor, Clock, ArrowRight, Zap } from 'lucide-react'
import { SEO } from '@/components/SEO'

export function Operations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

  const features = [
    {
      icon: Truck,
      titleKey: 'operations.dispatching',
      descKey: 'operations.dispatchingDesc',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      titleKey: 'operations.courierModule',
      descKey: 'operations.courierModuleDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Monitor,
      titleKey: 'operations.workstations',
      descKey: 'operations.workstationsDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Clock,
      titleKey: 'operations.uptime',
      descKey: 'operations.uptimeDesc',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const results = [
    { value: '-30%', labelKey: 'operations.deliveryTime', color: 'text-emerald-600' },
    { value: '-25%', labelKey: 'operations.errors', color: 'text-blue-600' },
    { value: '-20%', labelKey: 'operations.costs', color: 'text-purple-600' },
  ]

  const integrations = ['iiko', 'R-Keeper', 'Jowi', 'Poster', 'Paloma', 'Syrve']

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
      <SEO 
        title={language === 'uz' ? "Operatsiyalar va logistika" : language === 'en' ? 'Operations & Logistics' : 'Операции и логистика'}
        description={language === 'uz' 
          ? "Dispetcherlash, kuryerlar, oshxona - xatolarni 30% ga kamaytiruvchi avtomatlashtirish"
          : language === 'en'
          ? 'Dispatching, couriers, kitchen - automation that reduces errors by 30%'
          : 'Диспетчеризация, курьеры, кухня — автоматизация, снижающая ошибки на 30%'}
        keywords={language === 'uz'
          ? "operatsiyalar boshqaruvi, kuryerlar boshqarish, dispetcherlash, iiko integratsiya, R-Keeper, GPS kuzatuv, O'zbekiston"
          : language === 'en'
          ? 'operations management, courier management, dispatching, iiko integration, R-Keeper, GPS tracking, delivery automation, Uzbekistan'
          : 'управление операциями, управление курьерами, диспетчеризация, интеграция iiko, R-Keeper, GPS трекинг, автоматизация доставки, Узбекистан'}
      />
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
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              {t('operations.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('operations.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              {t('operations.subtitle')}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                {t('operations.optimize')}
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
                      <h3 className="font-semibold text-brand-darkBlue mb-1">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-brand-darkBlue/60">{t(feature.descKey)}</p>
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
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">{t('operations.clientResults')}</h3>
            <div className="grid grid-cols-3 gap-4">
              {results.map((result, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold mb-1 ${result.color}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  >
                    {result.value}
                  </motion.div>
                  <div className="text-sm text-brand-darkBlue/60">{t(result.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Integrations */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">{t('operations.posIntegrations')}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {integrations.map((item, idx) => (
                <motion.span 
                  key={idx}
                  className="bg-white border border-brand-lightTeal/30 text-brand-darkBlue px-4 py-2 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
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
            transition={{ delay: 0.8 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
                {t('operations.readyToOptimize')}
              </h2>
              <p className="text-white/70 mb-6">
                {t('operations.implementIn2Weeks')}
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                {t('common.getDemo')}
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
