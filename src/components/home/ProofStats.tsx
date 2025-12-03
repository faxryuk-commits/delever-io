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
  Smartphone,
  ExternalLink
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
    { name: 'Yaponamama', url: 'https://yaponamama.uz/', logo: '/logos/yapona.png' },
    { name: 'Evos', url: 'https://evosqruz.delever.uz/', logo: '/logos/evos.png' },
    { name: 'Kamolon Osh', url: 'https://kamolonosh.uz/', logo: '/logos/kamolonosh.svg' },
    { name: 'Manana', url: 'https://manana.delever.uz/ru', logo: '/logos/dodo.png' },
    { name: 'Brasserie', url: 'https://brasserie.delever.uz/ru', logo: '/logos/pinkberry.png' },
  ],
  fastfood: [
    { name: 'Maxway', url: 'https://maxway.uz/ru', logo: '/logos/maxway.png' },
    { name: "Hardee's", url: 'https://hardees.delever.uz/ru', logo: '/logos/hardees.jpg' },
    { name: 'Pizza Hut', url: 'https://pizzahutuz.delever.uz/ru', logo: '/logos/pizza-hut-logo-png_seeklogo-257097.png' },
  ],
  stores: [
    { name: 'Fati Flowers', url: 'https://fatiflowers.delever.uz/ru', logo: '/logos/pinkberry.png' },
    { name: 'Zoo Planeta', url: 'https://zooplaneta.delever.uz/ru', logo: '/logos/evos.png' },
    { name: 'Movex', url: 'https://movex.uz/ru', logo: '/logos/dodo.png' },
    { name: 'Animal Planet', url: 'https://animalplanet.delever.uz/ru', logo: '/logos/maxway.png' },
  ],
  apps: [
    { name: 'Yaponamama', url: 'https://apps.apple.com/uz/app/yaponamama-oila/id1457179873', platform: 'iOS', logo: '/logos/yapona.png' },
    { name: 'Maxway', url: 'https://apps.apple.com/uz/app/maxway/id1565502018', platform: 'iOS', logo: '/logos/maxway.png' },
    { name: 'Kamolon Osh', url: 'https://apps.apple.com/uz/app/kamolon-osh/id6745427808', platform: 'iOS', logo: '/logos/kamolonosh.svg' },
    { name: 'Takumi Sushi', url: 'https://apps.apple.com/uz/app/takumi-sushi/id6499478612', platform: 'iOS', logo: '/logos/pinkberry.png' },
    { name: 'Chicago Pizza', url: 'https://apps.apple.com/uz/app/chicago-pizza/id6670315321', platform: 'iOS', logo: '/logos/hardees.jpg' },
    { name: 'Zoo Planeta', url: 'https://apps.apple.com/uz/app/zoo-planeta/id6752120554', platform: 'iOS', logo: '/logos/evos.png' },
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

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
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
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-brand-blue" />
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

        {/* Примеры реализованных проектов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">
            {t('stats.examples.title')}
          </h3>
          
          {/* Категории */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-blue text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {clientExamples[activeCategory].map((client, idx) => (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-blue/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2 group-hover:bg-brand-blue/20 transition-colors overflow-hidden">
                  {'logo' in client && client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="w-10 h-10 object-contain rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `<svg class="h-5 w-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
                      }}
                    />
                  ) : 'platform' in client ? (
                    <Smartphone className="h-5 w-5 text-brand-blue" />
                  ) : (
                    <Globe className="h-5 w-5 text-brand-blue" />
                  )}
                </div>
                <span className="text-white text-sm font-medium text-center">{client.name}</span>
                {'platform' in client && (
                  <span className="text-white/40 text-xs">{client.platform}</span>
                )}
                <ExternalLink className="h-3 w-3 text-white/30 mt-1 group-hover:text-brand-blue transition-colors" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Дополнительные преимущества */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="h-5 w-5 text-brand-green" />
            <span>{t('stats.benefit1')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
