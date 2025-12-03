import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { 
  ArrowRight, 
  Smartphone,
  ShoppingBag,
  CreditCard,
  Truck,
  MessageSquare,
  Receipt,
  Plug,
  Zap
} from 'lucide-react'

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

  const categories = [
    {
      id: 'pos',
      nameKey: 'integrations.posSystems',
      icon: Receipt,
      color: 'from-emerald-500 to-emerald-600',
      items: ['iiko', 'R-Keeper', 'Jowi', 'Poster', 'Paloma', 'Syrve', 'Yaros', 'Clopos', 'AliPos', 'Loook', 'Neon Alisa', 'Dodo Pizza']
    },
    {
      id: 'aggregators',
      nameKey: 'integrations.aggregators',
      icon: ShoppingBag,
      color: 'from-orange-500 to-orange-600',
      items: ['Uzum Tezkor', 'Glovo', 'Yandex Eats', 'Wolt', 'Chocofood', 'Foody']
    },
    {
      id: 'payments',
      nameKey: 'integrations.payments',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      items: ['Payme', 'Click', 'Uzum Bank', 'Kaspi', 'Epay', 'TipTop Pay', 'Atmos', 'Anorbank'],
      features: ['integrations.payments.fiscalization', 'integrations.payments.1c', 'integrations.payments.cash', 'integrations.payments.reports']
    },
    {
      id: 'delivery',
      nameKey: 'integrations.delivery',
      icon: Truck,
      color: 'from-rose-500 to-rose-600',
      items: ['Yandex Delivery', 'Wolt Drive', 'Taxi Millennium', 'Noor']
    },
    {
      id: 'channels',
      nameKey: 'integrations.salesChannels',
      icon: Smartphone,
      color: 'from-blue-500 to-blue-600',
      items: ['Telegram Bot', 'Website', 'Mobile App', 'QR Menu', 'Admin Panel']
    },
    {
      id: 'sms',
      nameKey: 'integrations.smsPush',
      icon: MessageSquare,
      color: 'from-indigo-500 to-indigo-600',
      items: ['Eskiz', 'PlayMobile', 'SMS.UZ', 'OneSignal']
    },
  ]

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
      <SEO 
        title={language === 'en' ? 'Integrations' : 'Интеграции'}
        description={language === 'en'
          ? 'Delever integrations with iiko, R-Keeper, Poster, Wolt, Glovo, Uzum, Payme, Click. 40+ ready integrations.'
          : 'Интеграции Delever с iiko, R-Keeper, Poster, Wolt, Glovo, Uzum, Payme, Click. 40+ готовых интеграций.'
        }
        keywords={language === 'en'
          ? 'iiko integration, R-Keeper integration, POS integration, aggregator integration, payment integration'
          : 'интеграция iiko, интеграция R-Keeper, интеграция POS, интеграция агрегаторов, платежная интеграция'
        }
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
            <motion.div 
              className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Plug className="w-4 h-4" />
              {t('integrations.badge')}
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('integrations.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              {t('integrations.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {categories.map((category, idx) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  id={category.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow scroll-mt-32"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="font-semibold text-brand-darkBlue">{t(category.nameKey)}</h3>
                  </div>
                  
                  {/* Интеграции */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {category.items.map((item, itemIdx) => (
                      <motion.span 
                        key={itemIdx}
                        className="text-xs bg-brand-lightBlue/50 text-brand-darkBlue/70 px-2.5 py-1 rounded-full hover:bg-brand-lightBlue transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 + idx * 0.05 + itemIdx * 0.02 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Дополнительные функции (если есть) */}
                  {'features' in category && category.features && (
                    <div className="pt-3 border-t border-brand-lightTeal/20">
                      <p className="text-xs text-brand-darkBlue/50 mb-2">{t('integrations.alsoIncluded')}</p>
                      <div className="flex flex-wrap gap-2">
                        {(category.features as string[]).map((feature, fIdx) => (
                          <span 
                            key={fIdx}
                            className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full"
                          >
                            {t(feature)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* API */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8 text-center"
          >
            <motion.div 
              className="w-14 h-14 bg-brand-darkBlue rounded-2xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap className="h-7 w-7 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-brand-darkBlue mb-2">{t('integrations.openApi')}</h3>
            <p className="text-brand-darkBlue/70 mb-4">
              {t('integrations.connectAny')}
            </p>
            <a 
              href="https://delever.gitbook.io/delever/for-developers/soon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-darkBlue hover:underline"
            >
              {t('integrations.apiDocs')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              {t('integrations.readyToIntegrate')}
            </h2>
            <p className="text-white/70 mb-6">
              {t('integrations.connectIn1Day')}
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              {t('integrations.discussIntegration')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
