import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Store, 
  ShoppingCart, 
  Globe, 
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const stats = [
  {
    id: 'restaurants',
    icon: Store,
    value: 1000,
    suffix: '+',
    labelKey: 'stats.restaurants',
  },
  {
    id: 'orders',
    icon: ShoppingCart,
    value: 25000,
    suffix: '+',
    labelKey: 'stats.ordersDaily',
  },
  {
    id: 'countries',
    icon: Globe,
    value: 7,
    suffix: '',
    labelKey: 'stats.countries',
  },
  {
    id: 'speed',
    icon: Zap,
    value: 35,
    suffix: '%',
    labelKey: 'stats.speedUp',
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      })

      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))

      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, value, count, rounded])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export function ProofStats() {
  const { t } = useLocale()

  return (
    <section className="py-16 lg:py-24 bg-brand-darkBlue relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  {/* Иконка */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-lightTeal/20 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-brand-lightTeal" />
                  </div>

                  {/* Число */}
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Подпись */}
                  <div className="text-white/60 text-sm">
                    {t(stat.labelKey)}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Дополнительные преимущества */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="h-5 w-5 text-brand-lightTeal" />
            <span>{t('stats.benefit1')}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="h-5 w-5 text-brand-lightTeal" />
            <span>{t('stats.benefit2')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

