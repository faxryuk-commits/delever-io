import { useState } from 'react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'
import { useLocale } from '@/i18n/LocaleContext'
import { ArrowRight, Phone } from 'lucide-react'

export function CallToAction() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const { t } = useLocale()

  return (
    <>
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-brand-darkBlue">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-white">
            {t('cta.title')}
          </h2>
          <p className="text-base lg:text-lg mb-8 text-white/70">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setContactFormOpen(true)}
              className="w-full sm:w-auto"
            >
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.open('tel:+998781139813', '_self')}
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              +998 78 113 98 13
            </Button>
          </div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
