import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus, Zap } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface ComparisonRow {
  feature: string
  delever: 'yes' | 'no' | 'limited' | string
  aggregator: 'yes' | 'no' | 'limited' | string
  highlight?: boolean
}

export function ComparisonTable() {
  const { t } = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const comparisonData: ComparisonRow[] = [
    { 
      feature: t('comparison.commission'), 
      delever: t('comparison.commissionDelever'), 
      aggregator: t('comparison.commissionAggregator'),
      highlight: true
    },
    { 
      feature: t('comparison.customerData'), 
      delever: t('comparison.customerDataDelever'), 
      aggregator: t('comparison.customerDataAggregator'),
      highlight: true
    },
    { 
      feature: t('comparison.branding'), 
      delever: t('comparison.brandingDelever'), 
      aggregator: t('comparison.brandingAggregator')
    },
    { 
      feature: t('comparison.pushNotifications'), 
      delever: 'yes', 
      aggregator: 'limited'
    },
    { 
      feature: t('comparison.loyalty'), 
      delever: 'yes', 
      aggregator: 'no'
    },
    { 
      feature: t('comparison.analytics'), 
      delever: 'yes', 
      aggregator: 'limited'
    },
  ]

  const renderValue = (value: string, isDelever: boolean) => {
    if (value === 'yes') {
      return (
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isDelever ? 'bg-emerald-100' : 'bg-gray-100'}`}>
          <Check className={`h-5 w-5 ${isDelever ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>
      )
    }
    if (value === 'no') {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
          <X className="h-5 w-5 text-red-400" />
        </div>
      )
    }
    if (value === 'limited') {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
          <Minus className="h-5 w-5 text-yellow-500" />
        </div>
      )
    }
    return (
      <span className={`text-sm font-semibold ${isDelever ? 'text-emerald-600' : 'text-red-500'}`}>
        {value}
      </span>
    )
  }

  return (
    <section ref={ref} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            {t('comparison.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
            {t('comparison.subtitle')}
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-brand-lightTeal/30 overflow-hidden"
        >
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-brand-lightBlue/30">
            <div className="p-4 lg:p-5 font-semibold text-brand-darkBlue text-sm">
              {t('comparison.feature')}
            </div>
            <div className="p-4 lg:p-5 text-center">
              <div className="inline-flex items-center gap-2 bg-brand-darkBlue text-white px-3 py-1 rounded-full text-sm font-semibold">
                <Zap className="h-3 w-3" />
                {t('comparison.delever')}
              </div>
            </div>
            <div className="p-4 lg:p-5 text-center">
              <span className="text-sm font-medium text-brand-darkBlue/60">
                {t('comparison.aggregators')}
              </span>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonData.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className={`grid grid-cols-3 border-t border-brand-lightTeal/20 ${
                row.highlight ? 'bg-emerald-50/50' : ''
              }`}
            >
              <div className="p-4 lg:p-5 flex items-center">
                <span className={`text-sm ${row.highlight ? 'font-semibold text-brand-darkBlue' : 'text-brand-darkBlue/80'}`}>
                  {row.feature}
                </span>
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center">
                {renderValue(row.delever, true)}
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center">
                {renderValue(row.aggregator, false)}
              </div>
            </motion.div>
          ))}

          {/* Footer */}
          <div className="grid grid-cols-3 border-t-2 border-brand-darkBlue/10 bg-brand-lightBlue/20">
            <div className="p-4 lg:p-5"></div>
            <div className="p-4 lg:p-5 text-center">
              <motion.div 
                className="text-emerald-600 font-bold text-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ {t('comparison.yes')}
              </motion.div>
            </div>
            <div className="p-4 lg:p-5 text-center">
              <span className="text-red-400 font-medium">
                ✗ {t('comparison.limited')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Legend for mobile */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-brand-darkBlue/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="h-3 w-3 text-emerald-600" />
            </div>
            <span>{t('comparison.yes')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-yellow-50 flex items-center justify-center">
              <Minus className="h-3 w-3 text-yellow-500" />
            </div>
            <span>{t('comparison.limited')}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
              <X className="h-3 w-3 text-red-400" />
            </div>
            <span>{t('comparison.no')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

