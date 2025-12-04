import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Store, 
  Globe, 
  Zap,
  TrendingUp,
  ShoppingBag,
  Package,
  Smartphone
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
    id: 'countries',
    icon: Globe,
    value: 7,
    suffix: '',
    labelKey: 'stats.countries',
  },
  {
    id: 'orders',
    icon: Package,
    value: 13,
    suffix: 'M+',
    labelKey: 'stats.ordersProcessed',
  },
  {
    id: 'speed',
    icon: Zap,
    value: 35,
    suffix: '%',
    labelKey: 'stats.speedUp',
  },
]

// Примеры реализованных проектов с логотипами
const clientExamples = {
  restaurants: [
    { name: 'Yaponamama', url: 'https://yaponamama.uz/', logo: '/logos/Yaponamama.webp' },
    { name: 'Evos', url: 'https://evosqruz.delever.uz/', logo: '/logos/evos.png' },
    { name: 'Kamolon Osh', url: 'https://kamolonosh.uz/', logo: '/logos/kamolonosh.svg' },
    { name: 'Manana', url: 'https://manana.delever.uz/ru', logo: '/logos/manana.webp' },
    { name: 'Brasserie', url: 'https://brasserie.delever.uz/ru', logo: '/logos/brasserie.webp' },
  ],
  fastfood: [
    { name: 'Maxway', url: 'https://maxway.uz/ru', logo: '/logos/maxway.png' },
    { name: "Hardee's", url: 'https://hardees.delever.uz/ru', logo: '/logos/hardees.jpg' },
    { name: 'Pizza Hut', url: 'https://pizzahutuz.delever.uz/ru', logo: '/logos/pizza-hut-logo-png_seeklogo-257097.png' },
  ],
  stores: [
    { name: 'Fati Flowers', url: 'https://fatiflowers.delever.uz/ru', logo: '/logos/fati flowwers.webp' },
    { name: 'Zoo Planeta', url: 'https://zooplaneta.delever.uz/ru', logo: '/logos/zoo planeta.webp' },
    { name: 'Movex', url: 'https://movex.uz/ru', logo: '/logos/movex.webp' },
    { name: 'Animal Planet', url: 'https://animalplanet.delever.uz/ru', logo: '/logos/animal planet.webp' },
  ],
  apps: [
    { name: 'Yaponamama', url: 'https://apps.apple.com/uz/app/yaponamama-oila/id1457179873', platform: 'iOS', logo: '/logos/Yaponamama.webp' },
    { name: 'Maxway', url: 'https://apps.apple.com/uz/app/maxway/id1565502018', platform: 'iOS', logo: '/logos/maxway.png' },
    { name: 'Kamolon Osh', url: 'https://apps.apple.com/uz/app/kamolon-osh/id6745427808', platform: 'iOS', logo: '/logos/kamolonosh.svg' },
    { name: 'Takumi Sushi', url: 'https://apps.apple.com/uz/app/takumi-sushi/id6499478612', platform: 'iOS', logo: '/logos/Takumi.webp' },
    { name: 'Chicago Pizza', url: 'https://apps.apple.com/uz/app/chicago-pizza/id6670315321', platform: 'iOS', logo: '/logos/chicago pizza.webp' },
    { name: 'Zoo Planeta', url: 'https://apps.apple.com/uz/app/zoo-planeta/id6752120554', platform: 'iOS', logo: '/logos/zoo planeta.webp' },
  ],
}

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
  const [activeCategory, setActiveCategory] = useState<'restaurants' | 'fastfood' | 'stores' | 'apps'>('restaurants')

  const categories = [
    { id: 'restaurants' as const, labelKey: 'stats.category.restaurants', icon: Store },
    { id: 'fastfood' as const, labelKey: 'stats.category.fastfood', icon: ShoppingBag },
    { id: 'stores' as const, labelKey: 'stats.category.stores', icon: Package },
    { id: 'apps' as const, labelKey: 'stats.category.apps', icon: Smartphone },
  ]

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-brand-lightBlue/30 via-white to-brand-lightTeal/20 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-blue/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-brand-green/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-darkBlue mb-2">
            {t('stats.title')}
          </h2>
          <p className="text-base text-brand-darkBlue/60 max-w-xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto mb-8">
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
                <div className="text-center p-4 rounded-xl bg-white border border-brand-lightTeal/30 shadow-md shadow-brand-blue/5 hover:shadow-lg hover:border-brand-blue/30 transition-all">
                  {/* Иконка */}
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-blue" />
                  </div>

                  {/* Число */}
                  <div className="text-2xl lg:text-3xl font-bold text-brand-darkBlue mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Подпись */}
                  <div className="text-brand-darkBlue/60 text-xs">
                    {t(stat.labelKey)}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Примеры реализованных проектов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-bold text-brand-darkBlue text-center mb-4">
            {t('stats.examples.title')}
          </h3>
          
          {/* Категории */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30'
                      : 'bg-white text-brand-darkBlue/70 hover:bg-brand-lightBlue/50 border border-brand-lightTeal/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(cat.labelKey)}
                </button>
              )
            })}
          </div>

          {/* Список примеров */}
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {clientExamples[activeCategory].map((client, idx) => (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-brand-lightBlue/30 border border-brand-lightTeal/30 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all w-[110px] sm:w-[120px] min-h-[100px]"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-lightBlue/30 flex items-center justify-center mb-1.5 group-hover:bg-brand-blue/20 transition-colors overflow-hidden">
                  {'logo' in client && client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="w-8 h-8 object-contain rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `<svg class="h-4 w-4 text-brand-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
                      }}
                    />
                  ) : 'platform' in client ? (
                    <Smartphone className="h-4 w-4 text-brand-blue" />
                  ) : (
                    <Globe className="h-4 w-4 text-brand-blue" />
                  )}
                </div>
                <span className="text-brand-darkBlue text-xs font-medium text-center leading-tight">{client.name}</span>
                {'platform' in client && (
                  <span className="text-brand-darkBlue/40 text-[10px]">{client.platform}</span>
                )}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Дополнительные преимущества */}
        <motion.div 
          className="mt-6 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-brand-darkBlue/70 text-sm">
            <TrendingUp className="h-4 w-4 text-brand-green" />
            <span>{t('stats.benefit1')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
