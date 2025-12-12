import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { 
  ShoppingCart, 
  Zap,
  Monitor,
  Truck,
  BarChart3,
  Package,
  ArrowRight
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

export function ProcessFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLocale()

  const flowSteps = [
    {
      id: 'channels',
      titleKey: 'flow.channels',
      icon: <ShoppingCart className="h-6 w-6" />,
      itemKeys: ['flow.channelsItem1', 'flow.channelsItem2', 'flow.channelsItem3', 'flow.channelsItem4'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/products/channels',
    },
    {
      id: 'delever',
      titleKey: 'flow.delever',
      icon: <Zap className="h-6 w-6" />,
      itemKeys: ['flow.deleverItem1', 'flow.deleverItem2', 'flow.deleverItem3'],
      color: 'text-brand-darkBlue',
      bgColor: 'bg-brand-lightBlue',
      link: '/products',
    },
    {
      id: 'integrations',
      titleKey: 'flow.integrations',
      icon: <Monitor className="h-6 w-6" />,
      itemKeys: ['flow.integrationsItem1', 'flow.integrationsItem2', 'flow.integrationsItem3'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/integrations',
    },
    {
      id: 'operations',
      titleKey: 'flow.operations',
      icon: <Package className="h-6 w-6" />,
      itemKeys: ['flow.operationsItem1', 'flow.operationsItem2', 'flow.operationsItem3'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/products/operations',
    },
    {
      id: 'delivery',
      titleKey: 'flow.delivery',
      icon: <Truck className="h-6 w-6" />,
      itemKeys: ['flow.deliveryItem1', 'flow.deliveryItem2', 'flow.deliveryItem3'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/aggregators',
    },
    {
      id: 'analytics',
      titleKey: 'flow.analytics',
      icon: <BarChart3 className="h-6 w-6" />,
      itemKeys: ['flow.analyticsItem1', 'flow.analyticsItem2', 'flow.analyticsItem3'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/products/analytics',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            {t('flow.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
            {t('flow.subtitle')}
          </p>
        </motion.div>

        {/* Flow Steps */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {flowSteps.map((step, idx) => (
            <motion.div 
              key={step.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Arrow between steps */}
              {idx < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2 z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-brand-darkBlue/30" />
                  </motion.div>
                </div>
              )}

              <Link to={step.link} className="block bg-white rounded-xl p-4 border border-brand-lightTeal/30 hover:border-brand-darkBlue/20 hover:shadow-md transition-all duration-300 h-full group/card">
                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center ${step.color} mb-3 group-hover/card:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-brand-darkBlue mb-2 group-hover/card:text-brand-blue transition-colors">
                  {t(step.titleKey)}
                </h3>

                {/* Items */}
                <ul className="space-y-1">
                  {step.itemKeys.map((itemKey, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      className="text-xs text-brand-darkBlue/60"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + idx * 0.1 + itemIdx * 0.05 }}
                    >
                      • {t(itemKey)}
                    </motion.li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div 
          className="mt-12 bg-brand-lightBlue/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-brand-darkBlue font-medium">
            {t('flow.summary')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
