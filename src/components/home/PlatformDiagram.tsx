import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Settings, 
  Truck, 
  Users, 
  BarChart3,
  ArrowRight
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const steps = [
  { 
    id: 'channels', 
    icon: ShoppingCart, 
    labelKey: 'diagram.channels',
    descKey: 'diagram.channels.desc',
  },
  { 
    id: 'operations', 
    icon: Settings, 
    labelKey: 'diagram.operations',
    descKey: 'diagram.operations.desc',
  },
  { 
    id: 'delivery', 
    icon: Truck, 
    labelKey: 'diagram.delivery',
    descKey: 'diagram.delivery.desc',
  },
  { 
    id: 'customers', 
    icon: Users, 
    labelKey: 'diagram.customers',
    descKey: 'diagram.customers.desc',
  },
  { 
    id: 'analytics', 
    icon: BarChart3, 
    labelKey: 'diagram.analytics',
    descKey: 'diagram.analytics.desc',
  },
]

export function PlatformDiagram() {
  const { t } = useLocale()

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
            {t('diagram.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('diagram.subtitle')}
          </p>
        </motion.div>

        {/* Диаграмма для десктопа */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  {/* Карточка шага */}
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-2xl bg-brand-darkBlue p-[2px] shadow-lg group-hover:shadow-xl transition-shadow">
                      <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-brand-lightTeal/30 flex items-center justify-center mb-3">
                          <Icon className="h-6 w-6 text-brand-darkBlue" />
                        </div>
                        <h3 className="font-semibold text-brand-darkBlue text-sm">
                          {t(step.labelKey)}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Подсказка при наведении */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 bg-brand-darkBlue text-white text-xs p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {t(step.descKey)}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-brand-darkBlue" />
                    </div>
                  </div>

                  {/* Стрелка между шагами */}
                  {idx < steps.length - 1 && (
                    <motion.div 
                      className="mx-2"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.1 }}
                    >
                      <ArrowRight className="h-6 w-6 text-brand-darkBlue/30" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Линия потока данных */}
          <motion.div 
            className="mt-8 max-w-4xl mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="h-1 bg-gradient-to-r from-brand-lightTeal via-brand-darkBlue to-brand-lightTeal rounded-full" />
          </motion.div>
        </div>

        {/* Диаграмма для мобильных */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-lightBlue/30 border border-brand-lightTeal/20">
                    <div className="w-12 h-12 rounded-xl bg-brand-darkBlue flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-darkBlue">
                        {t(step.labelKey)}
                      </h3>
                      <p className="text-sm text-brand-darkBlue/60">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Вертикальная стрелка */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-5 w-5 text-brand-darkBlue/30 rotate-90" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Центральный блок Delever */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-darkBlue text-white px-6 py-3 rounded-full font-medium">
            <span className="text-lg">{t('diagram.result')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

