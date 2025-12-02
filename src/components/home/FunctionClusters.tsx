import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Settings, 
  Truck, 
  Users, 
  BarChart3,
  CreditCard,
  Check,
  ChevronRight
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { Link } from 'react-router-dom'

const clusters = [
  {
    id: 'channels',
    icon: ShoppingCart,
    labelKey: 'clusters.channels.label',
    descKey: 'clusters.channels.desc',
    link: '/products/channels',
    features: [
      'clusters.channels.f1',
      'clusters.channels.f2',
      'clusters.channels.f3',
      'clusters.channels.f4',
      'clusters.channels.f5',
      'clusters.channels.f6',
    ]
  },
  {
    id: 'operations',
    icon: Settings,
    labelKey: 'clusters.operations.label',
    descKey: 'clusters.operations.desc',
    link: '/products/operations',
    features: [
      'clusters.operations.f1',
      'clusters.operations.f2',
      'clusters.operations.f3',
      'clusters.operations.f4',
      'clusters.operations.f5',
      'clusters.operations.f6',
    ]
  },
  {
    id: 'delivery',
    icon: Truck,
    labelKey: 'clusters.delivery.label',
    descKey: 'clusters.delivery.desc',
    link: '/products/operations',
    features: [
      'clusters.delivery.f1',
      'clusters.delivery.f2',
      'clusters.delivery.f3',
      'clusters.delivery.f4',
      'clusters.delivery.f5',
      'clusters.delivery.f6',
    ]
  },
  {
    id: 'crm',
    icon: Users,
    labelKey: 'clusters.crm.label',
    descKey: 'clusters.crm.desc',
    link: '/products/marketing',
    features: [
      'clusters.crm.f1',
      'clusters.crm.f2',
      'clusters.crm.f3',
      'clusters.crm.f4',
      'clusters.crm.f5',
      'clusters.crm.f6',
    ]
  },
  {
    id: 'analytics',
    icon: BarChart3,
    labelKey: 'clusters.analytics.label',
    descKey: 'clusters.analytics.desc',
    link: '/products/analytics',
    features: [
      'clusters.analytics.f1',
      'clusters.analytics.f2',
      'clusters.analytics.f3',
      'clusters.analytics.f4',
      'clusters.analytics.f5',
      'clusters.analytics.f6',
    ]
  },
  {
    id: 'payments',
    icon: CreditCard,
    labelKey: 'clusters.payments.label',
    descKey: 'clusters.payments.desc',
    link: '/integrations#payments',
    features: [
      'clusters.payments.f1',
      'clusters.payments.f2',
      'clusters.payments.f3',
      'clusters.payments.f4',
      'clusters.payments.f5',
      'clusters.payments.f6',
    ]
  },
]

export function FunctionClusters() {
  const { t } = useLocale()
  const [activeCluster, setActiveCluster] = useState<string | null>(null)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('clusters.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('clusters.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clusters.map((cluster, idx) => {
            const Icon = cluster.icon
            const isActive = activeCluster === cluster.id
            
            return (
              <motion.div
                key={cluster.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveCluster(cluster.id)}
                onMouseLeave={() => setActiveCluster(null)}
              >
                <div className={`h-full rounded-2xl border-2 transition-all overflow-hidden ${
                  isActive 
                    ? 'border-brand-darkBlue shadow-xl' 
                    : 'border-brand-lightTeal/20 hover:border-brand-darkBlue/30'
                }`}>
                  {/* Градиент фон при активации */}
                  <div className={`absolute inset-0 bg-brand-darkBlue transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className={`relative z-10 p-6 h-full flex flex-col ${isActive ? 'text-white' : ''}`}>
                    {/* Иконка и заголовок */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-white/20' 
                          : 'bg-brand-blue/10'
                      }`}>
                        <Icon className={`h-7 w-7 ${isActive ? 'text-white' : 'text-brand-blue'}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-brand-darkBlue'}`}>
                          {t(cluster.labelKey)}
                        </h3>
                        <p className={`text-sm ${isActive ? 'text-white/80' : 'text-brand-darkBlue/60'}`}>
                          {t(cluster.descKey)}
                        </p>
                      </div>
                    </div>

                    {/* Список функций */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex-1"
                        >
                          <ul className="space-y-2 mb-4">
                            {cluster.features.map((feature, fIdx) => (
                              <motion.li 
                                key={fIdx}
                                className="flex items-center gap-2 text-sm text-white/90"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: fIdx * 0.05 }}
                              >
                                <Check className="h-4 w-4 text-white/70 flex-shrink-0" />
                                {t(feature)}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ссылка на детали */}
                    <Link 
                      to={cluster.link}
                      className={`inline-flex items-center gap-2 text-sm font-medium mt-auto transition-colors ${
                        isActive 
                          ? 'text-white hover:text-white/80' 
                          : 'text-brand-darkBlue hover:text-brand-darkBlue/70'
                      }`}
                    >
                      {t('clusters.learnMore')}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

