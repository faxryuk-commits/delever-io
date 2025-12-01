import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { motion, useInView } from 'framer-motion'
import { 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Megaphone, 
  ArrowRight,
} from 'lucide-react'

export function Products() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  const products = [
    {
      icon: ShoppingCart,
      titleKey: 'products.channels',
      descKey: 'products.channelsDesc',
      link: '/products/channels',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Truck,
      titleKey: 'products.operations',
      descKey: 'products.operationsDesc',
      link: '/products/operations',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: BarChart3,
      titleKey: 'products.analyticsTitle',
      descKey: 'products.analyticsDesc',
      link: '/products/analytics',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Megaphone,
      titleKey: 'products.marketing',
      descKey: 'products.marketingDesc',
      link: '/products/marketing',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const stats = [
    { value: '40+', labelKey: 'stats.integrations' },
    { value: '99.9%', labelKey: 'stats.uptime' },
    { value: '24/7', labelKey: 'products.support' },
    { value: t('products.week'), labelKey: 'products.launch' },
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
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.span 
              className="inline-block bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('products.badge')}
            </motion.span>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              {t('products.title')}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {products.map((product, idx) => {
              const Icon = product.icon
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <Link
                    to={product.link}
                    className="group block bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:border-brand-darkBlue/20 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 flex items-center gap-2">
                          {t(product.titleKey)}
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </h3>
                        <p className="text-sm text-brand-darkBlue/60 leading-relaxed">
                          {t(product.descKey)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            className="bg-brand-lightBlue/30 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <div className="text-3xl font-bold text-brand-darkBlue mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-darkBlue/60">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <motion.div 
            className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              {t('products.readyToStart')}
            </h2>
            <p className="text-white/70 mb-6">
              {t('products.launchInWeek')}
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setContactFormOpen(true)}
              >
                {t('common.getDemo')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
