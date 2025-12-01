import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Smartphone, Gift, CreditCard, Sparkles } from 'lucide-react'

export function Pricing() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, formatPrice } = useLocale()

  // Базовые цены в UZS
  const plans = [
    {
      name: 'Start',
      orders: '1,000',
      priceUZS: 1300000,
      featureKeys: ['pricing.posIntegration', 'pricing.telegramBot', 'pricing.website', 'pricing.courierModule', 'pricing.basicAnalytics'],
      highlight: false,
    },
    {
      name: 'Medium',
      orders: '3,000',
      priceUZS: 3250000,
      featureKeys: ['pricing.allFromStart', 'pricing.mobileApp', 'pricing.abcAnalysis', 'pricing.marketingModule', 'pricing.prioritySupport'],
      highlight: true,
    },
    {
      name: 'Big',
      orders: '6,000',
      priceUZS: 6500000,
      featureKeys: ['pricing.allFromMedium', 'pricing.multipleLocations', 'pricing.customIntegrations', 'pricing.slaGuarantees'],
      highlight: false,
    },
    {
      name: 'Enterprise',
      orders: '10,000',
      priceUZS: 13000000,
      featureKeys: ['pricing.allFromBig', 'pricing.dedicatedManager', 'pricing.apiAccess', 'pricing.customDevelopment'],
      highlight: false,
    },
  ]

  const depositUZS = 6500000
  const whiteLabelUZS = 13000000

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <>
      <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-5xl mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.span 
              className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('pricing.transparentPrices')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('pricing.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* Info Cards */}
        <section className="container mx-auto max-w-4xl mb-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-brand-lightBlue/30 rounded-xl p-5 flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <CreditCard className="h-6 w-6 text-brand-darkBlue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-darkBlue mb-1">{t('pricing.deposit')}</h3>
                <p className="text-sm text-brand-darkBlue/70">
                  {formatPrice(depositUZS)} — {t('pricing.depositDesc')}
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-brand-lightBeige/50 rounded-xl p-5 flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <Gift className="h-6 w-6 text-brand-darkBlue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-darkBlue mb-1">{t('pricing.discounts')}</h3>
                <p className="text-sm text-brand-darkBlue/70">
                  {t('pricing.discountsDesc')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Plans */}
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl p-5 border-2 relative flex flex-col ${
                  plan.highlight
                    ? 'border-brand-darkBlue shadow-lg'
                    : 'border-brand-lightTeal/30'
                }`}
              >
                {plan.highlight && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <span className="bg-brand-darkBlue text-white text-xs font-medium px-3 py-1 rounded-full">
                      {t('pricing.popular')}
                    </span>
                  </motion.div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-brand-darkBlue mb-1">{plan.name}</h3>
                  <p className="text-xs text-brand-darkBlue/50">{t('pricing.upToOrders', { count: plan.orders })}</p>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-brand-darkBlue">{formatPrice(plan.priceUZS)}</span>
                  <span className="text-sm text-brand-darkBlue/50 ml-1">{t('pricing.perMonth')}</span>
                </div>

                <ul className="space-y-2 mb-5 flex-grow">
                  {plan.featureKeys.map((featureKey, fIdx) => (
                    <motion.li 
                      key={fIdx} 
                      className="flex items-start gap-2 text-sm text-brand-darkBlue/70"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + idx * 0.1 + fIdx * 0.05 }}
                    >
                      <Check className="h-4 w-4 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                      <span>{t(featureKey)}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.highlight ? 'primary' : 'outline'}
                  onClick={() => setContactFormOpen(true)}
                >
                  {t('pricing.choose')}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* White Label */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Smartphone className="h-8 w-8 text-white" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('pricing.whiteLabelApp')}</h3>
                  <p className="text-white/70 mb-4">
                    {t('pricing.whiteLabelAppDesc')}
                  </p>
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-3xl font-bold text-white">{formatPrice(whiteLabelUZS)}</span>
                    <span className="text-white/50 text-sm">{t('pricing.oneTime')}</span>
                  </div>
                </div>
                <Link to="/white-label">
                  <Button variant="secondary" size="lg">
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-3">
              {t('pricing.needConsultation')}
            </h2>
            <p className="text-brand-darkBlue/60 mb-6">
              {t('pricing.helpChoose')}
            </p>
            <Button size="lg" onClick={() => setContactFormOpen(true)}>
              {t('pricing.getConsultation')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
