import { useRef } from 'react'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { PricingCalculator } from '@/components/PricingCalculator'

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  return (
    <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-lightBlue/20 to-white">
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

      {/* Calculator */}
      <section className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <PricingCalculator />
        </motion.div>
      </section>
    </div>
  )
}
