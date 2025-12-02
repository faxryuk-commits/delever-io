import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Store, 
  Building2, 
  Smartphone, 
  Truck, 
  PiggyBank, 
  Briefcase,
  ArrowRight,
  Check,
  X,
  Zap,
  Clock,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  ChefHat,
  Coffee,
  Flower2,
  ShoppingBag,
  Pill,
  Droplets
} from 'lucide-react'
import { Button } from '../ui/Button'
import { useLocale } from '@/i18n/LocaleContext'
import { ContactForm } from '../ContactForm'

// Типы сегментов
type SegmentId = 'small' | 'chain' | 'digital' | 'delivery' | 'aggregators' | 'custom'

interface Segment {
  id: SegmentId
  icon: React.ElementType
  labelKey: string
  descKey: string
  color: string
}

const segments: Segment[] = [
  { id: 'small', icon: Store, labelKey: 'segment.small.label', descKey: 'segment.small.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
  { id: 'chain', icon: Building2, labelKey: 'segment.chain.label', descKey: 'segment.chain.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
  { id: 'digital', icon: Smartphone, labelKey: 'segment.digital.label', descKey: 'segment.digital.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
  { id: 'delivery', icon: Truck, labelKey: 'segment.delivery.label', descKey: 'segment.delivery.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
  { id: 'aggregators', icon: PiggyBank, labelKey: 'segment.aggregators.label', descKey: 'segment.aggregators.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
  { id: 'custom', icon: Briefcase, labelKey: 'segment.custom.label', descKey: 'segment.custom.desc', color: 'from-brand-darkBlue to-brand-darkBlue/80' },
]

// Данные для каждого сегмента
const segmentData: Record<SegmentId, {
  heroTitle: string
  heroSubtitle: string
  pains: { icon: React.ElementType; title: string; solution: string }[]
  solutions: { title: string; desc: string; features: string[]; cta: string }[]
  businessTypes?: { icon: React.ElementType; label: string }[]
}> = {
  small: {
    heroTitle: 'segment.small.hero.title',
    heroSubtitle: 'segment.small.hero.subtitle',
    pains: [
      { icon: PiggyBank, title: 'segment.small.pain1.title', solution: 'segment.small.pain1.solution' },
      { icon: Clock, title: 'segment.small.pain2.title', solution: 'segment.small.pain2.solution' },
      { icon: Users, title: 'segment.small.pain3.title', solution: 'segment.small.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.small.solution1.title', 
        desc: 'segment.small.solution1.desc',
        features: ['segment.small.solution1.f1', 'segment.small.solution1.f2', 'segment.small.solution1.f3', 'segment.small.solution1.f4'],
        cta: 'segment.small.solution1.cta'
      },
      { 
        title: 'segment.small.solution2.title', 
        desc: 'segment.small.solution2.desc',
        features: ['segment.small.solution2.f1', 'segment.small.solution2.f2', 'segment.small.solution2.f3', 'segment.small.solution2.f4'],
        cta: 'segment.small.solution2.cta'
      },
      { 
        title: 'segment.small.solution3.title', 
        desc: 'segment.small.solution3.desc',
        features: ['segment.small.solution3.f1', 'segment.small.solution3.f2', 'segment.small.solution3.f3', 'segment.small.solution3.f4'],
        cta: 'segment.small.solution3.cta'
      },
    ],
    businessTypes: [
      { icon: ChefHat, label: 'segment.type.restaurant' },
      { icon: Coffee, label: 'segment.type.cafe' },
      { icon: Flower2, label: 'segment.type.flowers' },
      { icon: ShoppingBag, label: 'segment.type.shop' },
      { icon: Pill, label: 'segment.type.pharmacy' },
      { icon: Droplets, label: 'segment.type.water' },
    ]
  },
  chain: {
    heroTitle: 'segment.chain.hero.title',
    heroSubtitle: 'segment.chain.hero.subtitle',
    pains: [
      { icon: BarChart3, title: 'segment.chain.pain1.title', solution: 'segment.chain.pain1.solution' },
      { icon: Clock, title: 'segment.chain.pain2.title', solution: 'segment.chain.pain2.solution' },
      { icon: Shield, title: 'segment.chain.pain3.title', solution: 'segment.chain.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.chain.solution1.title', 
        desc: 'segment.chain.solution1.desc',
        features: ['segment.chain.solution1.f1', 'segment.chain.solution1.f2', 'segment.chain.solution1.f3', 'segment.chain.solution1.f4'],
        cta: 'segment.chain.solution1.cta'
      },
      { 
        title: 'segment.chain.solution2.title', 
        desc: 'segment.chain.solution2.desc',
        features: ['segment.chain.solution2.f1', 'segment.chain.solution2.f2', 'segment.chain.solution2.f3', 'segment.chain.solution2.f4'],
        cta: 'segment.chain.solution2.cta'
      },
      { 
        title: 'segment.chain.solution3.title', 
        desc: 'segment.chain.solution3.desc',
        features: ['segment.chain.solution3.f1', 'segment.chain.solution3.f2', 'segment.chain.solution3.f3', 'segment.chain.solution3.f4'],
        cta: 'segment.chain.solution3.cta'
      },
    ],
  },
  digital: {
    heroTitle: 'segment.digital.hero.title',
    heroSubtitle: 'segment.digital.hero.subtitle',
    pains: [
      { icon: Smartphone, title: 'segment.digital.pain1.title', solution: 'segment.digital.pain1.solution' },
      { icon: Clock, title: 'segment.digital.pain2.title', solution: 'segment.digital.pain2.solution' },
      { icon: TrendingUp, title: 'segment.digital.pain3.title', solution: 'segment.digital.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.digital.solution1.title', 
        desc: 'segment.digital.solution1.desc',
        features: ['segment.digital.solution1.f1', 'segment.digital.solution1.f2', 'segment.digital.solution1.f3', 'segment.digital.solution1.f4'],
        cta: 'segment.digital.solution1.cta'
      },
      { 
        title: 'segment.digital.solution2.title', 
        desc: 'segment.digital.solution2.desc',
        features: ['segment.digital.solution2.f1', 'segment.digital.solution2.f2', 'segment.digital.solution2.f3', 'segment.digital.solution2.f4'],
        cta: 'segment.digital.solution2.cta'
      },
      { 
        title: 'segment.digital.solution3.title', 
        desc: 'segment.digital.solution3.desc',
        features: ['segment.digital.solution3.f1', 'segment.digital.solution3.f2', 'segment.digital.solution3.f3', 'segment.digital.solution3.f4'],
        cta: 'segment.digital.solution3.cta'
      },
    ],
  },
  delivery: {
    heroTitle: 'segment.delivery.hero.title',
    heroSubtitle: 'segment.delivery.hero.subtitle',
    pains: [
      { icon: Truck, title: 'segment.delivery.pain1.title', solution: 'segment.delivery.pain1.solution' },
      { icon: Clock, title: 'segment.delivery.pain2.title', solution: 'segment.delivery.pain2.solution' },
      { icon: PiggyBank, title: 'segment.delivery.pain3.title', solution: 'segment.delivery.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.delivery.solution1.title', 
        desc: 'segment.delivery.solution1.desc',
        features: ['segment.delivery.solution1.f1', 'segment.delivery.solution1.f2', 'segment.delivery.solution1.f3', 'segment.delivery.solution1.f4'],
        cta: 'segment.delivery.solution1.cta'
      },
      { 
        title: 'segment.delivery.solution2.title', 
        desc: 'segment.delivery.solution2.desc',
        features: ['segment.delivery.solution2.f1', 'segment.delivery.solution2.f2', 'segment.delivery.solution2.f3', 'segment.delivery.solution2.f4'],
        cta: 'segment.delivery.solution2.cta'
      },
      { 
        title: 'segment.delivery.solution3.title', 
        desc: 'segment.delivery.solution3.desc',
        features: ['segment.delivery.solution3.f1', 'segment.delivery.solution3.f2', 'segment.delivery.solution3.f3', 'segment.delivery.solution3.f4'],
        cta: 'segment.delivery.solution3.cta'
      },
    ],
  },
  aggregators: {
    heroTitle: 'segment.aggregators.hero.title',
    heroSubtitle: 'segment.aggregators.hero.subtitle',
    pains: [
      { icon: PiggyBank, title: 'segment.aggregators.pain1.title', solution: 'segment.aggregators.pain1.solution' },
      { icon: Users, title: 'segment.aggregators.pain2.title', solution: 'segment.aggregators.pain2.solution' },
      { icon: BarChart3, title: 'segment.aggregators.pain3.title', solution: 'segment.aggregators.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.aggregators.solution1.title', 
        desc: 'segment.aggregators.solution1.desc',
        features: ['segment.aggregators.solution1.f1', 'segment.aggregators.solution1.f2', 'segment.aggregators.solution1.f3', 'segment.aggregators.solution1.f4'],
        cta: 'segment.aggregators.solution1.cta'
      },
      { 
        title: 'segment.aggregators.solution2.title', 
        desc: 'segment.aggregators.solution2.desc',
        features: ['segment.aggregators.solution2.f1', 'segment.aggregators.solution2.f2', 'segment.aggregators.solution2.f3', 'segment.aggregators.solution2.f4'],
        cta: 'segment.aggregators.solution2.cta'
      },
      { 
        title: 'segment.aggregators.solution3.title', 
        desc: 'segment.aggregators.solution3.desc',
        features: ['segment.aggregators.solution3.f1', 'segment.aggregators.solution3.f2', 'segment.aggregators.solution3.f3', 'segment.aggregators.solution3.f4'],
        cta: 'segment.aggregators.solution3.cta'
      },
    ],
  },
  custom: {
    heroTitle: 'segment.custom.hero.title',
    heroSubtitle: 'segment.custom.hero.subtitle',
    pains: [
      { icon: Briefcase, title: 'segment.custom.pain1.title', solution: 'segment.custom.pain1.solution' },
      { icon: Clock, title: 'segment.custom.pain2.title', solution: 'segment.custom.pain2.solution' },
      { icon: TrendingUp, title: 'segment.custom.pain3.title', solution: 'segment.custom.pain3.solution' },
    ],
    solutions: [
      { 
        title: 'segment.custom.solution1.title', 
        desc: 'segment.custom.solution1.desc',
        features: ['segment.custom.solution1.f1', 'segment.custom.solution1.f2', 'segment.custom.solution1.f3', 'segment.custom.solution1.f4'],
        cta: 'segment.custom.solution1.cta'
      },
      { 
        title: 'segment.custom.solution2.title', 
        desc: 'segment.custom.solution2.desc',
        features: ['segment.custom.solution2.f1', 'segment.custom.solution2.f2', 'segment.custom.solution2.f3', 'segment.custom.solution2.f4'],
        cta: 'segment.custom.solution2.cta'
      },
      { 
        title: 'segment.custom.solution3.title', 
        desc: 'segment.custom.solution3.desc',
        features: ['segment.custom.solution3.f1', 'segment.custom.solution3.f2', 'segment.custom.solution3.f3', 'segment.custom.solution3.f4'],
        cta: 'segment.custom.solution3.cta'
      },
    ],
    businessTypes: [
      { icon: ChefHat, label: 'segment.type.restaurant' },
      { icon: Coffee, label: 'segment.type.cafe' },
      { icon: Flower2, label: 'segment.type.flowers' },
      { icon: ShoppingBag, label: 'segment.type.shop' },
      { icon: Pill, label: 'segment.type.pharmacy' },
      { icon: Droplets, label: 'segment.type.water' },
    ]
  },
}

export function SegmentNavigator() {
  const { t } = useLocale()
  const [selectedSegment, setSelectedSegment] = useState<SegmentId | null>(null)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactTag, setContactTag] = useState('')

  const handleSegmentClick = (segmentId: SegmentId) => {
    setSelectedSegment(segmentId)
    // Скролл к детальному блоку
    setTimeout(() => {
      document.getElementById('segment-details')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleCTA = (tag: string) => {
    setContactTag(tag)
    setContactFormOpen(true)
  }

  const closeSegment = () => {
    setSelectedSegment(null)
  }

  const currentSegment = selectedSegment ? segments.find(s => s.id === selectedSegment) : null
  const currentData = selectedSegment ? segmentData[selectedSegment] : null

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-lightBeige/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('segment.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
              {t('segment.subtitle')}
            </p>
          </motion.div>

          {/* Сетка сегментов */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {segments.map((segment, idx) => {
              const Icon = segment.icon
              const isSelected = selectedSegment === segment.id
              
              return (
                <motion.button
                  key={segment.id}
                  onClick={() => handleSegmentClick(segment.id)}
                  className={`relative p-6 rounded-2xl text-left transition-all group overflow-hidden ${
                    isSelected 
                      ? 'bg-brand-darkBlue text-white shadow-xl scale-[1.02]' 
                      : 'bg-white hover:bg-brand-lightBlue/10 border border-brand-lightTeal/20 hover:border-brand-darkBlue/20 hover:shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Градиент фон при выборе */}
                  {isSelected && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-20`} />
                  )}
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isSelected ? 'bg-white/20' : 'bg-brand-blue/10'
                    }`}>
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-brand-blue'}`} />
                    </div>
                    
                    <h3 className={`font-semibold text-lg mb-2 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                      {t(segment.labelKey)}
                    </h3>
                    
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-brand-darkBlue/60'}`}>
                      {t(segment.descKey)}
                    </p>
                    
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                      isSelected ? 'text-white' : 'text-brand-darkBlue group-hover:text-brand-darkBlue'
                    }`}>
                      <span>{t('segment.showSolutions')}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? '' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Детальный блок выбранного сегмента */}
      <AnimatePresence>
        {selectedSegment && currentSegment && currentData && (
          <motion.section
            id="segment-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-brand-lightBlue via-brand-lightTeal/50 to-brand-lightBeige py-16 lg:py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Кнопка закрытия */}
                <button 
                  onClick={closeSegment}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-darkBlue/10 hover:bg-brand-darkBlue/20 flex items-center justify-center text-brand-darkBlue transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Персонализированный Hero */}
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-brand-darkBlue">
                    {t(currentData.heroTitle)}
                  </h2>
                  <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto mb-8">
                    {t(currentData.heroSubtitle)}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      onClick={() => handleCTA(`segment-${selectedSegment}-start`)}
                      className="bg-brand-darkBlue text-white hover:bg-brand-darkBlue/90"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {t('segment.cta.start')}
                    </Button>
                    <Button 
                      onClick={() => handleCTA(`segment-${selectedSegment}-demo`)}
                      variant="outline"
                      className="border-brand-darkBlue/30 text-brand-darkBlue hover:bg-brand-darkBlue/5"
                    >
                      {t('segment.cta.demo')}
                    </Button>
                  </div>
                </motion.div>

                {/* Боли → Решения */}
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-brand-darkBlue text-center mb-8">
                    {t('segment.pains.title')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentData.pains.map((pain, idx) => {
                      const PainIcon = pain.icon
                      return (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                              <PainIcon className="h-5 w-5 text-brand-orange" />
                            </div>
                            <h4 className="font-semibold text-brand-darkBlue">{t(pain.title)}</h4>
                          </div>
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                            <p className="text-brand-darkBlue/70 text-sm">{t(pain.solution)}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* 3 Готовых решения */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-brand-darkBlue text-center mb-8">
                    {t('segment.solutions.title')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {currentData.solutions.map((solution, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft border border-brand-lightTeal/20 hover:shadow-medium transition-shadow">
                        <div className="text-xs font-medium text-brand-darkBlue/50 uppercase tracking-wider mb-2">
                          {t('segment.solution')} #{idx + 1}
                        </div>
                        <h4 className="text-xl font-bold text-brand-darkBlue mb-2">
                          {t(solution.title)}
                        </h4>
                        <p className="text-brand-darkBlue/60 text-sm mb-4">
                          {t(solution.desc)}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {solution.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-sm text-brand-darkBlue/70">
                              <Check className="h-4 w-4 text-brand-green flex-shrink-0" />
                              {t(feature)}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          onClick={() => handleCTA(`segment-${selectedSegment}-solution${idx + 1}`)}
                          className="w-full"
                        >
                          {t(solution.cta)}
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Типы бизнеса (если есть) */}
                {currentData.businessTypes && (
                  <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-brand-darkBlue mb-6">
                      {t('segment.businessTypes')}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {currentData.businessTypes.map((type, idx) => {
                        const TypeIcon = type.icon
                        return (
                          <div key={idx} className="flex items-center gap-2 bg-brand-darkBlue/10 px-4 py-2 rounded-full text-brand-darkBlue text-sm">
                            <TypeIcon className="h-4 w-4" />
                            {t(type.label)}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        tag={contactTag}
      />
    </>
  )
}

