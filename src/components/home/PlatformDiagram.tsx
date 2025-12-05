import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Settings, 
  Truck, 
  Users, 
  BarChart3,
  Zap
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const steps = [
  { 
    id: 'channels', 
    icon: ShoppingCart, 
    labelKey: 'diagram.channels',
    descKey: 'diagram.channels.desc',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  { 
    id: 'operations', 
    icon: Settings, 
    labelKey: 'diagram.operations',
    descKey: 'diagram.operations.desc',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500',
  },
  { 
    id: 'delivery', 
    icon: Truck, 
    labelKey: 'diagram.delivery',
    descKey: 'diagram.delivery.desc',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
  },
  { 
    id: 'customers', 
    icon: Users, 
    labelKey: 'diagram.customers',
    descKey: 'diagram.customers.desc',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
  },
  { 
    id: 'analytics', 
    icon: BarChart3, 
    labelKey: 'diagram.analytics',
    descKey: 'diagram.analytics.desc',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
  },
]

export function PlatformDiagram() {
  const { t } = useLocale()
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-brand-lightBlue/20 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-brand-darkBlue/5 text-brand-darkBlue px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="h-4 w-4 text-brand-blue" />
            {t('diagram.badge') || 'Единая платформа'}
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('diagram.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('diagram.subtitle')}
          </p>
        </motion.div>

        {/* Диаграмма для десктопа */}
        <div className="hidden lg:block">
          <div className="flex items-stretch justify-center gap-6 max-w-6xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isHovered = hoveredStep === step.id
              
              return (
                <motion.div
                  key={step.id}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  {/* Карточка шага */}
                  <motion.div 
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Свечение под карточкой */}
                    <motion.div 
                      className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${step.color} blur-xl`}
                      animate={{ opacity: isHovered ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className={`relative w-44 rounded-2xl bg-white border-2 transition-all duration-300 overflow-hidden ${
                      isHovered ? 'border-transparent shadow-2xl' : 'border-gray-100 shadow-lg'
                    }`}>
                      {/* Градиентная полоска сверху */}
                      <div className={`h-1 bg-gradient-to-r ${step.color}`} />
                      
                      <div className="p-5">
                        {/* Иконка */}
                        <motion.div 
                          className={`w-14 h-14 rounded-xl ${step.iconBg} flex items-center justify-center mb-4 mx-auto shadow-lg`}
                          animate={{ 
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </motion.div>
                        
                        {/* Название */}
                        <h3 className="font-bold text-brand-darkBlue text-center mb-2">
                          {t(step.labelKey)}
                        </h3>
                        
                        {/* Описание - всегда видно */}
                        <AnimatePresence>
                          {isHovered ? (
                            <motion.p 
                              className="text-xs text-brand-darkBlue/60 text-center leading-relaxed"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {t(step.descKey)}
                            </motion.p>
                          ) : (
                            <motion.div 
                              className="h-1 w-12 mx-auto bg-gray-200 rounded-full"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>

                  {/* Анимированная линия между шагами */}
                  {idx < steps.length - 1 && (
                    <div className="mx-3 flex items-center">
                      <motion.div 
                        className="relative w-8 h-[2px] bg-gray-200 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        {/* Пульсирующая анимация */}
                        <motion.div 
                          className={`absolute inset-y-0 left-0 w-full bg-gradient-to-r ${step.color}`}
                          animate={{ 
                            x: ['-100%', '100%'],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: idx * 0.3
                          }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Результирующий блок */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Свечение */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <div className="relative flex items-center gap-3 bg-brand-darkBlue text-white px-8 py-4 rounded-full font-medium shadow-xl">
                <Zap className="h-5 w-5 text-brand-yellow" />
                <span className="text-lg">{t('diagram.result')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Диаграмма для мобильных - улучшенная */}
        <div className="lg:hidden">
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-md">
                    <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-darkBlue">
                        {t(step.labelKey)}
                      </h3>
                      <p className="text-sm text-brand-darkBlue/60 truncate">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Вертикальная линия */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <motion.div 
                        className={`w-[2px] h-4 bg-gradient-to-b ${step.color} rounded-full`}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Результат мобильный */}
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-brand-darkBlue text-white px-6 py-3 rounded-full font-medium shadow-lg">
              <Zap className="h-4 w-4 text-brand-yellow" />
              <span>{t('diagram.result')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
