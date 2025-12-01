import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { 
  ArrowRight, 
  Code, 
  Shield, 
  HeadphonesIcon,
  Smartphone,
  ShoppingBag,
  CreditCard,
  Truck,
  MessageSquare,
  BarChart3,
  Receipt,
  Zap,
  CheckCircle2,
  ArrowDown
} from 'lucide-react'

// Категории интеграций
const categories = [
  {
    id: 'channels',
    name: 'Каналы продаж',
    description: 'Собственные каналы для приёма заказов',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    items: ['Telegram Bot', 'Website', 'Мобильное приложение', 'QR Menu', 'Admin Panel']
  },
  {
    id: 'aggregators',
    name: 'Агрегаторы заказов',
    description: 'Все заказы с агрегаторов в единой системе',
    icon: ShoppingBag,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    items: ['Uzum Tezkor', 'Glovo', 'Яндекс Ритейл', 'Яндекс Еда', 'Wolt', 'Chocofood', 'Foody']
  },
  {
    id: 'pos',
    name: 'POS-системы',
    description: 'Автоматическая синхронизация с кассой',
    icon: Receipt,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    items: ['iiko', 'R-Keeper', 'R-Keeper White Server', 'Jowi', 'Poster', 'Paloma', 'Dodo Pizza', 'Loook', 'Neon Alisa', 'Yaros', 'Clopos', 'AliPos', 'Syrve']
  },
  {
    id: 'payments',
    name: 'Платёжные шлюзы',
    description: 'Приём онлайн-платежей',
    icon: CreditCard,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    items: ['Payme', 'Click', 'Uzum Bank', 'Kaspi', 'Epay', 'TipTop Pay', 'Atmos', 'Anorbank']
  },
  {
    id: 'delivery',
    name: 'Службы доставки',
    description: 'Интеграция с курьерскими службами',
    icon: Truck,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    items: ['Яндекс Доставка', 'Taxi Millennium', 'Wolt Drive', 'Noor']
  },
  {
    id: 'sms',
    name: 'SMS провайдеры',
    description: 'Отправка уведомлений клиентам',
    icon: MessageSquare,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    items: ['Eskiz', 'PlayMobile', 'SMS Центр']
  },
  {
    id: 'analytics',
    name: 'Аналитика',
    description: 'Отслеживание метрик и конверсий',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    items: ['Google Tag Manager']
  },
  {
    id: 'fiscal',
    name: 'Фискальные операторы',
    description: 'Фискализация чеков',
    icon: Receipt,
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    items: ['Fiscal Box']
  },
]

// Простая визуализация потока
function IntegrationFlow() {
  const steps = [
    { label: 'Заказ поступает', icon: Smartphone, color: 'bg-blue-500' },
    { label: 'Delever обрабатывает', icon: Zap, color: 'bg-brand-darkBlue' },
    { label: 'Передаётся в POS', icon: Receipt, color: 'bg-emerald-500' },
    { label: 'Оплата проходит', icon: CreditCard, color: 'bg-purple-500' },
    { label: 'Курьер доставляет', icon: Truck, color: 'bg-rose-500' },
    { label: 'Клиент получает', icon: CheckCircle2, color: 'bg-green-500' },
  ]

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <step.icon className="w-7 h-7" />
              </div>
              <span className="text-xs text-brand-darkBlue/70 mt-2 text-center max-w-[80px] font-medium">
                {step.label}
              </span>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.05 }}
                className="hidden md:block w-8 h-0.5 bg-brand-darkBlue/20 mx-2"
              />
            )}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.05 }}
                className="md:hidden"
              >
                <ArrowDown className="w-4 h-4 text-brand-darkBlue/30 my-2" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Карточка категории
function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div 
        className={`${category.bgColor} rounded-2xl p-6 border ${category.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-brand-darkBlue">{category.name}</h3>
              <span className="text-xs font-semibold text-brand-darkBlue/50 bg-white/70 px-2 py-1 rounded-full whitespace-nowrap">
                {category.items.length} шт.
              </span>
            </div>
            <p className="text-brand-darkBlue/60 text-sm mt-1">{category.description}</p>
          </div>
        </div>

        {/* Expanded items */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-brand-darkBlue/10">
            {category.items.map((item, idx) => (
              <span
                key={idx}
                className="bg-white text-brand-darkBlue text-sm px-3 py-1.5 rounded-lg shadow-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <button className="mt-4 text-sm text-brand-darkBlue/50 hover:text-brand-darkBlue flex items-center gap-1 transition-colors">
          {isExpanded ? 'Свернуть' : 'Показать все'}
          <motion.span 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
      </div>
    </motion.div>
  )
}

export function Integrations() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const totalIntegrations = categories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <>
      <div className="min-h-screen pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-8 px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                {totalIntegrations}+ интеграций
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Все интеграции в{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  одном месте
                </span>
              </h1>
              <p className="text-lg md:text-xl text-brand-darkBlue/70 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                Подключайте агрегаторы, POS-системы, платежи и доставку за несколько часов. Всё работает как единая система.
              </p>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Запросить интеграцию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Flow visualization */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-lightBlue/30 to-white">
          <div className="container mx-auto max-w-5xl">
            <FadeInOnScroll>
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-darkBlue mb-2">
                  Как это работает
                </h2>
                <p className="text-brand-darkBlue/60">
                  Заказ проходит через все системы автоматически
                </p>
              </div>
            </FadeInOnScroll>
            <IntegrationFlow />
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '40+', label: 'Интеграций' },
                { value: '13', label: 'POS-систем' },
                { value: '7', label: 'Агрегаторов' },
                { value: '8', label: 'Платёжных систем' },
              ].map((stat, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="text-center p-6 bg-white rounded-2xl border border-brand-lightTeal/20 shadow-soft">
                    <div className="text-3xl md:text-4xl font-bold text-brand-darkBlue mb-1">{stat.value}</div>
                    <div className="text-sm text-brand-darkBlue/60">{stat.label}</div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkBlue mb-3">
                  Категории интеграций
                </h2>
                <p className="text-brand-darkBlue/60">
                  Нажмите на категорию, чтобы увидеть полный список
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, idx) => (
                <CategoryCard key={category.id} category={category} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* API & Enterprise */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/50">
          <div className="container mx-auto max-w-5xl">
            <FadeInOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">
                  API & Enterprise
                </h2>
                <p className="text-brand-darkBlue/60">
                  Для крупных клиентов и кастомных интеграций
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Code, title: 'API доступ', desc: 'Полный доступ к API для кастомных интеграций', color: 'from-blue-500 to-blue-600' },
                { icon: Shield, title: 'SLA 99.9%', desc: 'Гарантированное время отклика и стабильность', color: 'from-emerald-500 to-emerald-600' },
                { icon: HeadphonesIcon, title: 'Выделенный менеджер', desc: 'Персональная поддержка для Enterprise', color: 'from-purple-500 to-purple-600' },
              ].map((item, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all group text-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-darkBlue mb-2">{item.title}</h3>
                    <p className="text-brand-darkBlue/60 text-sm">{item.desc}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-darkBlue to-[#001a2d] text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeInOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Нужна интеграция?</h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
                Свяжитесь с нами — подключим любую интеграцию или разработаем кастомное решение
              </p>
              <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)} className="group">
                Запросить интеграцию
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </FadeInOnScroll>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
