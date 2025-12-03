import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'
import { ArrowRight, Play, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'

// Слова для анимации
const rotatingWords = [
  'delivery',      // доставкой
  'company',       // компанией
  'couriers',      // курьерами
  'products',      // товарами
  'prices',        // ценами
  'growth',        // ростом
  'profit',        // прибылью
  'staff',         // сотрудниками
  'marketing',     // маркетингом
  'loyalty',       // лояльностью
  'communications',// коммуникациями
  'ratings',       // рейтингом
  'integrations',  // интеграциями
  'sales',         // продажами
  'content',       // контентом
]

export function Hero() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactTag, setContactTag] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const { t } = useLocale()
  
  // Смена слова каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCTA = (tag: string) => {
    setContactTag(tag)
    setContactFormOpen(true)
  }

  const stats = [
    { value: '13M+', labelKey: 'stats.orders' },
    { value: '1000+', labelKey: 'stats.businesses' },
    { value: '7', labelKey: 'stats.countries' },
    { value: '40+', labelKey: 'stats.integrations' },
  ]

  return (
    <>
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-lightBlue/40 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-lightTeal/20 to-transparent -z-10" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-lightTeal/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-lightBlue/30 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              {t('hero.badge')}
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-darkBlue mb-6 leading-[1.15] tracking-tight">
              {t('hero.title')}
              <br />
              <span className="text-brand-darkBlue/80">
                {t('hero.titlePrefix')}
              </span>{' '}
              <span className="relative inline-block min-w-[280px] md:min-w-[320px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue bg-clip-text text-transparent"
                  >
                    {t(`hero.word.${rotatingWords[wordIndex]}`)}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-brand-darkBlue/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                onClick={() => handleCTA('hero-start')}
                className="w-full sm:w-auto px-8"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleCTA('hero-demo')}
                className="w-full sm:w-auto px-8"
              >
                <Play className="mr-2 h-4 w-4" />
                {t('hero.ctaDemo')}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-16"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-darkBlue tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-brand-darkBlue/60 mt-1">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        tag={contactTag}
      />
    </>
  )
}
