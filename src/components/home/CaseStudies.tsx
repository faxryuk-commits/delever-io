import { Link } from 'react-router-dom'
import { TrendingUp, Clock, DollarSign, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'

export function CaseStudies() {
  const { t } = useLocale()

  // Данные синхронизированы с case-studies.ts
  const cases = [
    {
      company: 'Yaponamama',
      segmentKey: 'cases.restaurant',
      link: '/case-studies/yaponamama',
      logo: '/logos/Yaponamama.webp',
      results: [
        { icon: <TrendingUp className="h-4 w-4" />, metric: '+60%', labelKey: 'cases.repeatOrders' },
        { icon: <DollarSign className="h-4 w-4" />, metric: '+104%', labelKey: 'cases.ltv' },
        { icon: <Users className="h-4 w-4" />, metric: '+25', labelKey: 'cases.nps' },
      ],
    },
    {
      company: 'Gippo',
      segmentKey: 'cases.hypermarket',
      link: '/case-studies/gippo',
      logo: '/logos/gippo.png',
      results: [
        { icon: <TrendingUp className="h-4 w-4" />, metric: '-92%', labelKey: 'cases.errors' },
        { icon: <Clock className="h-4 w-4" />, metric: '-44%', labelKey: 'cases.assemblyTime' },
        { icon: <Users className="h-4 w-4" />, metric: '-94%', labelKey: 'cases.lostOrders' },
      ],
    },
    {
      company: 'MAXWAY',
      segmentKey: 'cases.fastFood',
      link: '/case-studies/maxway',
      logo: '/logos/maxway.png',
      results: [
        { icon: <Clock className="h-4 w-4" />, metric: '-35%', labelKey: 'cases.deliveryTime' },
        { icon: <TrendingUp className="h-4 w-4" />, metric: '-78%', labelKey: 'cases.lateDeliveries' },
        { icon: <Users className="h-4 w-4" />, metric: '+50%', labelKey: 'cases.ordersPerCourier' },
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
            <Link key={idx} to={caseStudy.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg hover:border-brand-blue/30 transition-all group h-full"
              >
                {/* Company info */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-brand-darkBlue group-hover:text-brand-blue transition-colors">{caseStudy.company}</h3>
                  <span className="text-xs text-brand-darkBlue/50">{t(caseStudy.segmentKey)}</span>
                </div>

                {/* Results */}
                <div className="space-y-3 mb-4">
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
                        <span className={`text-lg font-bold ${result.metric.startsWith('+') || result.metric.startsWith('<') ? 'text-emerald-600' : 'text-blue-600'}`}>
                          {result.metric}
                        </span>
                        <span className="text-xs text-brand-darkBlue/50 ml-2">{t(result.labelKey)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Read more */}
                <div className="flex items-center gap-1 text-sm font-medium text-brand-darkBlue/60 group-hover:text-brand-blue transition-colors">
                  <span>{t('cases.readMore') || 'Подробнее'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
