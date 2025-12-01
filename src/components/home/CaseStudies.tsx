import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'

export function CaseStudies() {
  const { t } = useLocale()

  const cases = [
    {
      company: 'Yaponamama',
      segmentKey: 'cases.restaurant',
      results: [
        { icon: <TrendingUp className="h-4 w-4" />, metric: '+45%', labelKey: 'cases.ordersGrowth' },
        { icon: <Clock className="h-4 w-4" />, metric: '-30%', labelKey: 'cases.deliveryTime' },
        { icon: <DollarSign className="h-4 w-4" />, metric: '+28%', labelKey: 'cases.avgCheck' },
      ],
    },
    {
      company: 'GIPPO',
      segmentKey: 'cases.storeChain',
      results: [
        { icon: <Users className="h-4 w-4" />, metric: '+60%', labelKey: 'cases.onlineOrders' },
        { icon: <TrendingUp className="h-4 w-4" />, metric: '+35%', labelKey: 'cases.revenue' },
        { icon: <Clock className="h-4 w-4" />, metric: '-25%', labelKey: 'cases.errors' },
      ],
    },
    {
      company: 'MAXWAY',
      segmentKey: 'cases.fastFood',
      results: [
        { icon: <DollarSign className="h-4 w-4" />, metric: '+40%', labelKey: 'cases.gmv' },
        { icon: <Users className="h-4 w-4" />, metric: '+50%', labelKey: 'cases.customers' },
        { icon: <TrendingUp className="h-4 w-4" />, metric: '+32%', labelKey: 'cases.conversion' },
      ],
    },
  ]

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            {t('cases.title')}
          </h2>
          <p className="text-base lg:text-lg text-brand-darkBlue/60 max-w-xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {cases.map((caseStudy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-all"
            >
              {/* Company info */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-brand-darkBlue">{caseStudy.company}</h3>
                <span className="text-xs text-brand-darkBlue/50">{t(caseStudy.segmentKey)}</span>
              </div>

              {/* Results */}
              <div className="space-y-3">
                {caseStudy.results.map((result, rIdx) => (
                  <motion.div
                    key={rIdx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + rIdx * 0.05 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-lightBlue/50 flex items-center justify-center text-brand-darkBlue">
                      {result.icon}
                    </div>
                    <div>
                      <span className={`text-lg font-bold ${result.metric.startsWith('+') ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {result.metric}
                      </span>
                      <span className="text-xs text-brand-darkBlue/50 ml-2">{t(result.labelKey)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
