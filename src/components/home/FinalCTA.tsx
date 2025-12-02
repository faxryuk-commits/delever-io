import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  MessageCircle,
  CheckCircle,
  Zap,
  Shield,
  Clock
} from 'lucide-react'
import { Button } from '../ui/Button'
import { useLocale } from '@/i18n/LocaleContext'
import { ContactForm } from '../ContactForm'

export function FinalCTA() {
  const { t } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactTag, setContactTag] = useState('')

  const handleCTA = (tag: string) => {
    setContactTag(tag)
    setContactFormOpen(true)
  }

  const benefits = [
    { icon: Zap, text: 'finalCta.benefit1' },
    { icon: Shield, text: 'finalCta.benefit2' },
    { icon: Clock, text: 'finalCta.benefit3' },
  ]

  return (
    <>
      <section className="py-16 lg:py-24 bg-brand-darkBlue relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-lightTeal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-lightBlue/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Заголовок */}
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                {t('finalCta.title')}
              </h2>
              
              <p className="text-lg lg:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                {t('finalCta.subtitle')}
              </p>

              {/* Преимущества */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-2 text-white/80"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Icon className="h-5 w-5 text-brand-green" />
                      <span>{t(benefit.text)}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA кнопки */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={() => handleCTA('final-cta-start')}
                    size="lg"
                    className="bg-white text-brand-darkBlue hover:bg-white/90 px-8 py-6 text-lg"
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    {t('finalCta.startButton')}
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    onClick={() => handleCTA('final-cta-consult')}
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t('finalCta.consultButton')}
                  </Button>
                </motion.div>
              </div>

              {/* Мини-гарантии */}
              <motion.div 
                className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                  {t('finalCta.guarantee1')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                  {t('finalCta.guarantee2')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                  {t('finalCta.guarantee3')}
                </div>
              </motion.div>
            </motion.div>
          </div>
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

