import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { 
  ArrowRight, 
  Smartphone,
  ShoppingBag,
  CreditCard,
  Truck,
  MessageSquare,
  Receipt
} from 'lucide-react'

const categories = [
  {
    id: 'pos',
    name: 'POS-системы',
    icon: Receipt,
    items: ['iiko', 'R-Keeper', 'Jowi', 'Poster', 'Paloma', 'Syrve', 'Yaros', 'Clopos', 'AliPos', 'Loook', 'Neon Alisa', 'Dodo Pizza']
  },
  {
    id: 'aggregators',
    name: 'Агрегаторы',
    icon: ShoppingBag,
    items: ['Uzum Tezkor', 'Glovo', 'Yandex Eats', 'Wolt', 'Chocofood', 'Foody']
  },
  {
    id: 'payments',
    name: 'Платежи',
    icon: CreditCard,
    items: ['Payme', 'Click', 'Uzum Bank', 'Kaspi', 'Epay', 'TipTop Pay', 'Atmos', 'Anorbank']
  },
  {
    id: 'delivery',
    name: 'Доставка',
    icon: Truck,
    items: ['Yandex Delivery', 'Wolt Drive', 'Taxi Millennium', 'Noor']
  },
  {
    id: 'channels',
    name: 'Каналы продаж',
    icon: Smartphone,
    items: ['Telegram Bot', 'Website', 'Mobile App', 'QR Menu', 'Admin Panel']
  },
  {
    id: 'sms',
    name: 'SMS/Push',
    icon: MessageSquare,
    items: ['Eskiz', 'PlayMobile', 'SMS.UZ', 'OneSignal']
  },
]

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              40+ интеграций
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-xl mx-auto">
              Подключите все системы, которые используете, к единой платформе
            </p>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="container mx-auto max-w-5xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, idx) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-brand-darkBlue">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIdx) => (
                      <span 
                        key={itemIdx}
                        className="text-xs bg-brand-lightBlue/50 text-brand-darkBlue/70 px-2.5 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* API */}
        <section className="container mx-auto max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-brand-lightBlue/30 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-bold text-brand-darkBlue mb-2">Нужна интеграция?</h3>
            <p className="text-brand-darkBlue/70 mb-4">
              Открытый API для подключения любых систем
            </p>
            <a 
              href="https://delever.gitbook.io/delever/for-developers/soon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-darkBlue hover:underline"
            >
              Документация API →
            </a>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Готовы к интеграции?
            </h2>
            <p className="text-white/70 mb-6">
              Подключим вашу систему за 1-2 дня
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Обсудить интеграцию
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
