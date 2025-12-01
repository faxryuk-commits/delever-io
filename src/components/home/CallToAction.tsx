import { useState } from 'react'
import { Button } from '../ui/Button'
import { ContactForm } from '../ContactForm'
import { ArrowRight, Phone } from 'lucide-react'

export function CallToAction() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-brand-darkBlue">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-white">
            Запустите доставку за неделю
          </h2>
          <p className="text-base lg:text-lg mb-8 text-white/70">
            Получите демо платформы и узнайте, как Delever поможет вашему бизнесу
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setContactFormOpen(true)}
              className="w-full sm:w-auto"
            >
              Получить демо
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.open('tel:+998781139813', '_self')}
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              Позвонить
            </Button>
          </div>
        </div>
      </section>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
