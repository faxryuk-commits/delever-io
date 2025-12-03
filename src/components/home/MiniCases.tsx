import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  Users,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  BarChart3
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const cases = [
  {
    id: 'gippo',
    company: 'GIPPO',
    location: 'cases.location.kazakhstan',
    metrics: [
      { icon: ShoppingCart, value: '+60%', label: 'cases.gippo.metric1' },
      { icon: TrendingUp, value: '+35%', label: 'cases.gippo.metric2' },
      { icon: AlertCircle, value: '-25%', label: 'cases.gippo.metric3' },
    ],
    summary: 'cases.gippo.summary',
  },
  {
    id: 'yaponamama',
    company: 'Yaponamama',
    location: 'cases.location.tashkent',
    metrics: [
      { icon: TrendingUp, value: '+45%', label: 'cases.yaponamama.metric1' },
      { icon: Clock, value: '-30%', label: 'cases.yaponamama.metric2' },
      { icon: DollarSign, value: '+28%', label: 'cases.yaponamama.metric3' },
    ],
    summary: 'cases.yaponamama.summary',
  },
  {
    id: 'maxway',
    company: 'MAXWAY',
    location: 'cases.location.tashkent',
    metrics: [
      { icon: DollarSign, value: '+40%', label: 'cases.maxway.metric1' },
      { icon: Users, value: '+50%', label: 'cases.maxway.metric2' },
      { icon: BarChart3, value: '+32%', label: 'cases.maxway.metric3' },
    ],
    summary: 'cases.maxway.summary',
  },
]

export function MiniCases() {
  const { t } = useLocale()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-lightBeige/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('cases.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, idx) => (
            <motion.div
              key={caseItem.id}
              className="bg-white rounded-2xl border border-brand-lightTeal/20 p-6 shadow-soft hover:shadow-medium transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Заголовок */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-1">
                  {caseItem.company}
                </h3>
                <p className="text-sm text-brand-darkBlue/50">
                  {t(caseItem.location)}
                </p>
              </div>

              {/* Метрики */}
              <div className="space-y-4 mb-6">
                {caseItem.metrics.map((metric, mIdx) => {
                  const Icon = metric.icon
                  return (
                    <div key={mIdx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-lightTeal/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-brand-darkBlue/60" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-brand-darkBlue">
                          {metric.value}
                        </span>
                        <span className="text-sm text-brand-darkBlue/60 ml-2">
                          {t(metric.label)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Описание */}
              <div className="bg-brand-lightBlue/30 rounded-xl p-4">
                <p className="text-sm text-brand-darkBlue/80">
                  {t(caseItem.summary)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
