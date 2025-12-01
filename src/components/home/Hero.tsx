import { useState } from 'react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'

export function Hero() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const { t } = useLocale()

  const stats = [
    { value: '13M+', labelKey: 'stats.orders' },
    { value: '1000+', labelKey: 'stats.businesses' },
    { value: '7', labelKey: 'stats.countries' },
    { value: '40+', labelKey: 'stats.integrations' },
  ]

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-lightBlue/40 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-lightTeal/20 to-transparent -z-10" />
        
        <div className="container mx-auto max-w-6xl">
          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-12 lg:mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-darkBlue mb-6 leading-[1.15] tracking-tight">
              {t('hero.title')}
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-brand-darkBlue/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setContactFormOpen(true)}
                className="w-full sm:w-auto px-8"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://admin.delever.uz/#/login', '_blank')}
                className="w-full sm:w-auto px-8"
              >
                {t('nav.login')}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-4"
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

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
