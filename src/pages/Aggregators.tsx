import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { 
  RefreshCw, 
  LayoutDashboard, 
  Package,
  BarChart3,
  MapPin,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
  XCircle,
  Download
} from 'lucide-react'
import { downloadAggregatorsPresentation } from '@/utils/generateAggregatorsPresentation'

const aggregatorLogos = [
  { name: 'Wolt', color: 'from-cyan-400 to-cyan-500' },
  { name: 'Glovo', color: 'from-yellow-400 to-yellow-500' },
  { name: 'Yandex Eats', color: 'from-yellow-400 to-red-500' },
  { name: 'Uzum Tezkor', color: 'from-purple-400 to-purple-500' },
  { name: 'Chocofood', color: 'from-orange-400 to-orange-500' },
  { name: 'Foody', color: 'from-green-400 to-green-500' },
]

export function Aggregators() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

  const problems = [
    { titleKey: 'aggregators.problem1', descKey: 'aggregators.problem1Desc' },
    { titleKey: 'aggregators.problem2', descKey: 'aggregators.problem2Desc' },
    { titleKey: 'aggregators.problem3', descKey: 'aggregators.problem3Desc' },
    { titleKey: 'aggregators.problem4', descKey: 'aggregators.problem4Desc' },
  ]

  const features = [
    { icon: LayoutDashboard, titleKey: 'aggregators.feature1', descKey: 'aggregators.feature1Desc', color: 'from-blue-500 to-blue-600' },
    { icon: Zap, titleKey: 'aggregators.feature2', descKey: 'aggregators.feature2Desc', color: 'from-green-500 to-green-600' },
    { icon: RefreshCw, titleKey: 'aggregators.feature3', descKey: 'aggregators.feature3Desc', color: 'from-purple-500 to-purple-600' },
    { icon: Package, titleKey: 'aggregators.feature4', descKey: 'aggregators.feature4Desc', color: 'from-orange-500 to-orange-600' },
    { icon: BarChart3, titleKey: 'aggregators.feature5', descKey: 'aggregators.feature5Desc', color: 'from-indigo-500 to-indigo-600' },
    { icon: MapPin, titleKey: 'aggregators.feature6', descKey: 'aggregators.feature6Desc', color: 'from-rose-500 to-rose-600' },
  ]

  const results = [
    { valueKey: 'aggregators.result1', labelKey: 'aggregators.result1Label', color: 'text-emerald-600' },
    { valueKey: 'aggregators.result2', labelKey: 'aggregators.result2Label', color: 'text-blue-600' },
    { valueKey: 'aggregators.result3', labelKey: 'aggregators.result3Label', color: 'text-purple-600' },
    { valueKey: 'aggregators.result4', labelKey: 'aggregators.result4Label', color: 'text-orange-600' },
  ]

  const steps = [
    { icon: Zap, titleKey: 'aggregators.step1', descKey: 'aggregators.step1Desc' },
    { icon: RefreshCw, titleKey: 'aggregators.step2', descKey: 'aggregators.step2Desc' },
    { icon: CheckCircle2, titleKey: 'aggregators.step3', descKey: 'aggregators.step3Desc' },
    { icon: TrendingUp, titleKey: 'aggregators.step4', descKey: 'aggregators.step4Desc' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        title={language === 'en' ? 'Aggregator Integration' : 'Интеграция с агрегаторами'}
        description={language === 'en'
          ? 'Automate orders from Wolt, Glovo, Uzum, Yandex Eats. One dashboard for all aggregators. Save 20+ hours/week.'
          : 'Автоматизируйте заказы из Wolt, Glovo, Uzum, Яндекс Еды. Один кабинет для всех агрегаторов. Экономия 20+ часов/неделю.'
        }
        keywords={language === 'en'
          ? 'aggregator integration, Wolt integration, Glovo integration, Yandex Eats integration, food delivery automation'
          : 'интеграция агрегаторов, интеграция Wolt, интеграция Glovo, интеграция Яндекс Еда, автоматизация доставки'
        }
      />
      <div ref={ref} className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
          <div className="container mx-auto max-w-5xl">
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
                {t('aggregators.badge')}
              </motion.span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                {t('aggregators.title')}
              </h1>
              <p className="text-lg lg:text-xl text-brand-darkBlue/70 max-w-2xl mx-auto mb-8">
                {t('aggregators.subtitle')}
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button size="lg" onClick={() => setContactFormOpen(true)}>
                  {t('aggregators.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => downloadAggregatorsPresentation(language)}
                  className="bg-white text-brand-darkBlue hover:bg-white/90 shadow-lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {language === 'ru' ? 'Скачать презентацию' : language === 'uz' ? 'Taqdimotni yuklab olish' : 'Download Presentation'}
                </Button>
              </motion.div>

              {/* Aggregator logos */}
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {aggregatorLogos.map((agg, idx) => (
                  <motion.div
                    key={idx}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${agg.color} text-white text-sm font-medium shadow-md`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {agg.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-red-50/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 text-red-600 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                {t('aggregators.problemTitle')}
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {problems.map((problem, idx) => {
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-6 border border-red-200/50 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                        <XCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-darkBlue mb-1">{t(problem.titleKey)}</h3>
                        <p className="text-sm text-brand-darkBlue/60">{t(problem.descKey)}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 text-emerald-600 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                {t('aggregators.solutionTitle')}
              </h2>
              <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
                {t('aggregators.solutionSubtitle')}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
                    className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-all"
                  >
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="font-semibold text-brand-darkBlue mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{t(feature.descKey)}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                {t('aggregators.resultsTitle')}
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl p-6 text-center shadow-soft"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className={`text-4xl font-bold mb-2 ${result.color}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {t(result.valueKey)}
                  </motion.div>
                  <div className="text-sm text-brand-darkBlue/60">{t(result.labelKey)}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Supported Aggregators */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                {t('aggregators.supportedTitle')}
              </h2>
              <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
                {t('aggregators.supportedSubtitle')}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {aggregatorLogos.map((agg, idx) => (
                <motion.div
                  key={idx}
                  className={`px-6 py-4 rounded-xl bg-gradient-to-r ${agg.color} text-white font-semibold shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {agg.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                {t('aggregators.howItWorksTitle')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={idx}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-brand-darkBlue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <div className="text-sm font-bold text-brand-darkBlue/40 mb-1">{idx + 1}</div>
                    <h3 className="font-semibold text-brand-darkBlue mb-2">{t(step.titleKey)}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{t(step.descKey)}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-darkBlue">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-white">
                {t('aggregators.ctaTitle')}
              </h2>
              <p className="text-lg text-white/70 mb-8">
                {t('aggregators.ctaSubtitle')}
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
                  {t('aggregators.ctaButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

