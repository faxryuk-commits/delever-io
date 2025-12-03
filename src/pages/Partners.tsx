import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Users2, Percent, Users, Headphones, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { SEO } from '@/components/SEO'

export function Partners() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

  const benefits = [
    {
      icon: Percent,
      titleKey: 'partners.commission',
      descKey: 'partners.commissionDesc',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Users,
      titleKey: 'partners.materials',
      descKey: 'partners.materialsDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Headphones,
      titleKey: 'partners.partnerSupport',
      descKey: 'partners.partnerSupportDesc',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const steps = [
    { step: '1', titleKey: 'partners.step1', descKey: 'partners.step1Desc' },
    { step: '2', titleKey: 'partners.step2', descKey: 'partners.step2Desc' },
    { step: '3', titleKey: 'partners.step3', descKey: 'partners.step3Desc' },
  ]

  const partnerTypeKeys = [
    'partners.posIntegrators',
    'partners.digitalAgencies',
    'partners.itConsultants',
    'partners.bizConsultants',
    'partners.franchisees',
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
      <SEO 
        title={language === 'uz' ? "Hamkorlik dasturi" : language === 'en' ? 'Partner Program' : 'Партнёрская программа'}
        description={language === 'uz' 
          ? "Delever bilan pul ishlang - mijozlarni jalb qiling va 30% gacha komissiya oling"
          : language === 'en'
          ? 'Earn with Delever - bring clients and get up to 30% commission'
          : 'Зарабатывайте с Delever — приводите клиентов и получайте до 30% комиссии'}
        keywords={language === 'uz'
          ? "hamkorlik dasturi, Delever hamkor, komissiya, IT integratorlar, restoran konsultantlar, O'zbekiston"
          : language === 'en'
          ? 'partner program, Delever partner, commission, IT integrators, restaurant consultants, Uzbekistan, Kazakhstan'
          : 'партнёрская программа, партнёр Delever, комиссия, IT интеграторы, консультанты ресторанов, Узбекистан, Казахстан'}
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
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('partners.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('partners.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              {t('partners.subtitle')}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                {t('partners.become')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow text-center"
                >
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-semibold text-brand-darkBlue mb-2">{t(benefit.titleKey)}</h3>
                  <p className="text-sm text-brand-darkBlue/60">{t(benefit.descKey)}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Steps */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-8 text-center">{t('partners.howItWorks')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.15 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-brand-darkBlue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  >
                    {step.step}
                  </motion.div>
                  <h4 className="font-semibold text-brand-darkBlue mb-1">{t(step.titleKey)}</h4>
                  <p className="text-sm text-brand-darkBlue/60">{t(step.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Partner Types */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Users2 className="h-6 w-6 text-brand-darkBlue" />
              <h3 className="text-xl font-bold text-brand-darkBlue">{t('partners.whoWeSeek')}</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {partnerTypeKeys.map((typeKey, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-2 bg-white border border-brand-lightTeal/30 text-brand-darkBlue px-4 py-2 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">{t(typeKey)}</span>
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
            transition={{ delay: 0.8 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
                {t('partners.readyToStart')}
              </h2>
              <p className="text-white/70 mb-6">
                {t('partners.contactInDay')}
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                {t('partners.submitApplication')}
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
