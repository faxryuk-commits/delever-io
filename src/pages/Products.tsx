import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Megaphone, 
  ArrowRight,
} from 'lucide-react'

const products = [
  {
    icon: ShoppingCart,
    title: 'Каналы продаж',
    description: 'Сайт, приложение, Telegram-бот — все заказы в одной системе без комиссий.',
    link: '/products/channels',
  },
  {
    icon: Truck,
    title: 'Операции',
    description: 'Диспетчеризация, курьеры, кухня — автоматизация снижает ошибки на 30%.',
    link: '/products/operations',
  },
  {
    icon: BarChart3,
    title: 'Аналитика',
    description: 'Дашборды, отчёты, AI-прогнозы — решения на основе данных.',
    link: '/products/analytics',
  },
  {
    icon: Megaphone,
    title: 'Маркетинг',
    description: 'RFM-анализ, рассылки, лояльность — рост среднего чека на 25%.',
    link: '/products/marketing',
  },
]

export function Products() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-5xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Продукты платформы
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
              Четыре модуля, которые работают как единая система
            </p>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto max-w-5xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {products.map((product, idx) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link
                    to={product.link}
                    className="group block bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:border-brand-darkBlue/20 transition-all duration-200 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-lightBlue flex items-center justify-center text-brand-darkBlue flex-shrink-0 group-hover:bg-brand-darkBlue group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 flex items-center gap-2">
                          {product.title}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-sm text-brand-darkBlue/60 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Features Overview */}
        <section className="container mx-auto max-w-5xl mb-16">
          <div className="bg-brand-lightBlue/30 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">40+</div>
                <div className="text-sm text-brand-darkBlue/60">Интеграций</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">99.9%</div>
                <div className="text-sm text-brand-darkBlue/60">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">24/7</div>
                <div className="text-sm text-brand-darkBlue/60">Поддержка</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-darkBlue mb-1">1 нед</div>
                <div className="text-sm text-brand-darkBlue/60">Запуск</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-3xl">
          <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">
              Готовы начать?
            </h2>
            <p className="text-white/70 mb-6">
              Запустите собственную доставку за неделю
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setContactFormOpen(true)}
              >
                Получить демо
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
