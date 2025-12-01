import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Megaphone, Heart, Gift, ArrowRight, Sparkles, Target, Package, MapPin, Star } from 'lucide-react'

export function Marketing() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  const features = [
    {
      icon: Target,
      titleKey: 'marketing.rfmAnalysis',
      descKey: 'marketing.rfmAnalysisDesc',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Megaphone,
      titleKey: 'marketing.pushSms',
      descKey: 'marketing.pushSmsDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Heart,
      titleKey: 'marketing.loyaltyProgram',
      descKey: 'marketing.loyaltyProgramDesc',
      color: 'from-rose-500 to-rose-600',
    },
    {
      icon: Gift,
      titleKey: 'marketing.promoCodes',
      descKey: 'marketing.promoCodesDesc',
      color: 'from-emerald-500 to-emerald-600',
    },
  ]

  const results = [
    { value: '+25%', labelKey: 'marketing.avgCheckGrowth', color: 'text-emerald-600' },
    { value: '+40%', labelKey: 'marketing.repeatOrdersGrowth', color: 'text-blue-600' },
    { value: '+60%', labelKey: 'marketing.ltvGrowth', color: 'text-purple-600' },
  ]

  const crmFeatureKeys = [
    { icon: Package, key: 'marketing.orders' },
    { icon: Heart, key: 'marketing.preferences' },
    { icon: MapPin, key: 'marketing.addresses' },
    { icon: Star, key: 'marketing.bonuses' },
  ]

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
              {t('marketing.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('marketing.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              {t('marketing.subtitle')}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                {t('marketing.increaseSales')}
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
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">{t('marketing.clientResults')}</h3>
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

        {/* CRM */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-brand-lightTeal/30"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-2 text-center">{t('marketing.crmWithHistory')}</h3>
            <p className="text-brand-darkBlue/60 text-center mb-6">{t('marketing.allInfoInOnePlace')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {crmFeatureKeys.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-lg p-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className="h-4 w-4 text-brand-darkBlue" />
                    <span className="text-sm text-brand-darkBlue">{t(item.key)}</span>
                  </motion.div>
                )
              })}
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
                {t('marketing.startGrowingToday')}
              </h2>
              <p className="text-white/70 mb-6">
                {t('marketing.connectIn1Day')}
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
