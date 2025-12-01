import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { BarChart3, LineChart, PieChart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

export function Analytics() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  const features = [
    {
      icon: BarChart3,
      titleKey: 'analytics.dashboards',
      descKey: 'analytics.dashboardsDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: LineChart,
      titleKey: 'analytics.reports',
      descKey: 'analytics.reportsDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: PieChart,
      titleKey: 'analytics.abcXyz',
      descKey: 'analytics.abcXyzDesc',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: TrendingUp,
      titleKey: 'analytics.aiForecasts',
      descKey: 'analytics.aiForecastsDesc',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const metrics = [
    { nameKey: 'analytics.revenue', change: '+24%', trend: 'up' },
    { nameKey: 'analytics.avgCheck', change: '+18%', trend: 'up' },
    { nameKey: 'operations.deliveryTime', change: '-32%', trend: 'down' },
    { nameKey: 'analytics.repeatOrders', change: '+45%', trend: 'up' },
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
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              {t('analytics.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('analytics.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto mb-8">
              {t('analytics.subtitle')}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                {t('analytics.seeAnalytics')}
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

        {/* Metrics */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-6 text-center">{t('analytics.clientGrowth')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className={`text-2xl font-bold mb-1 ${metric.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {metric.change}
                  </motion.div>
                  <div className="text-xs text-brand-darkBlue/60">{t(metric.nameKey)}</div>
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
            transition={{ delay: 0.7 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
                {t('analytics.readyToSeeData')}
              </h2>
              <p className="text-white/70 mb-6">
                {t('analytics.demoWithRealData')}
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                {t('analytics.requestDemo')}
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
