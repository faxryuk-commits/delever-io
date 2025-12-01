import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'

export function ROICalculator() {
  const { t, formatPrice } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [orders, setOrders] = useState(1000)
  const [avgCheck, setAvgCheck] = useState(100000) // В сумах
  const [aggregatorFee, setAggregatorFee] = useState(20)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Расчёты
  const monthlyRevenue = orders * avgCheck
  const aggregatorCost = monthlyRevenue * (aggregatorFee / 100)
  const deleverCost = 0 // 0% комиссии
  const monthlySavings = aggregatorCost - deleverCost
  const yearlySavings = monthlySavings * 12


  return (
    <>
      <section ref={ref} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-lightBlue/20">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Calculator className="w-4 h-4" />
              <Sparkles className="w-3 h-3" />
            </motion.span>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
              {t('roi.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              {t('roi.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft border border-brand-lightTeal/30"
            >
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-6">
                {t('roi.title')}
              </h3>

              {/* Orders slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-brand-darkBlue/70">{t('roi.ordersMonth')}</label>
                  <span className="text-sm font-semibold text-brand-darkBlue">{orders.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={orders}
                  onChange={(e) => setOrders(Number(e.target.value))}
                  className="w-full h-2 bg-brand-lightBlue rounded-lg appearance-none cursor-pointer accent-brand-darkBlue"
                />
                <div className="flex justify-between text-xs text-brand-darkBlue/40 mt-1">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Avg Check slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-brand-darkBlue/70">{t('roi.avgCheck')}</label>
                  <span className="text-sm font-semibold text-brand-darkBlue">{formatPrice(avgCheck)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={avgCheck}
                  onChange={(e) => setAvgCheck(Number(e.target.value))}
                  className="w-full h-2 bg-brand-lightBlue rounded-lg appearance-none cursor-pointer accent-brand-darkBlue"
                />
                <div className="flex justify-between text-xs text-brand-darkBlue/40 mt-1">
                  <span>{formatPrice(50000)}</span>
                  <span>{formatPrice(500000)}</span>
                </div>
              </div>

              {/* Aggregator Fee slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-brand-darkBlue/70">{t('roi.aggregatorFee')}</label>
                  <span className="text-sm font-semibold text-brand-darkBlue">{aggregatorFee}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="1"
                  value={aggregatorFee}
                  onChange={(e) => setAggregatorFee(Number(e.target.value))}
                  className="w-full h-2 bg-brand-lightBlue rounded-lg appearance-none cursor-pointer accent-brand-darkBlue"
                />
                <div className="flex justify-between text-xs text-brand-darkBlue/40 mt-1">
                  <span>10%</span>
                  <span>35%</span>
                </div>
              </div>

            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4"
            >
              {/* Current Expenses */}
              <div className="bg-red-50 rounded-xl p-5 border border-red-200/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-700/70">{t('roi.currentExpenses')}</span>
                  <span className="text-xs text-red-500">{t('roi.perMonth')}</span>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-red-600"
                  key={aggregatorCost}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  -{formatPrice(aggregatorCost)}
                </motion.div>
              </div>

              {/* With Delever */}
              <div className="bg-brand-lightBlue/30 rounded-xl p-5 border border-brand-lightTeal/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-brand-darkBlue/70">{t('roi.withDelever')}</span>
                  <span className="text-xs text-brand-darkBlue/50">{t('roi.perMonth')}</span>
                </div>
                <div className="text-3xl font-bold text-brand-darkBlue">
                  {formatPrice(0)}
                </div>
              </div>

              {/* Savings */}
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t('roi.savings')}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <motion.div 
                      className="text-2xl font-bold text-emerald-600"
                      key={monthlySavings}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      +{formatPrice(monthlySavings)}
                    </motion.div>
                    <div className="text-xs text-emerald-600/70">{t('roi.perMonth')}</div>
                  </div>
                  <div>
                    <motion.div 
                      className="text-2xl font-bold text-emerald-600"
                      key={yearlySavings}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      +{formatPrice(yearlySavings)}
                    </motion.div>
                    <div className="text-xs text-emerald-600/70">{t('roi.perYear')}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setContactFormOpen(true)}
                >
                  {t('roi.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

