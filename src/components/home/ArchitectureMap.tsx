import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Monitor, 
  ShoppingCart, 
  ChefHat, 
  BarChart3, 
  Megaphone, 
  CreditCard, 
  Truck, 
  Users,
  ArrowRight,
  Sparkles,
  Phone,
  Globe,
  Smartphone,
  QrCode,
  Bike,
  TrendingUp,
  Bell,
  Gift,
  Star,
  MapPin,
  X,
  Utensils,
  Package,
  Wallet,
  MessageSquare,
  Target,
  Percent,
  LayoutDashboard,
  PieChart,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface BentoItem {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  fullDescription: string
  fullDescriptionEn: string
  icon: typeof Monitor
  color: string
  bgGradient: string
  size: 'large' | 'medium' | 'small'
  features: { icon: typeof Monitor; label: string; labelEn: string; desc: string; descEn: string }[]
}

const bentoItems: BentoItem[] = [
  {
    id: 'orders',
    title: 'Все заказы',
    titleEn: 'All Orders',
    description: 'Единое окно для всех каналов продаж',
    descriptionEn: 'Single window for all sales channels',
    fullDescription: 'Принимайте заказы из всех каналов в одном интерфейсе. Автоматическая маршрутизация, приоритизация и отслеживание.',
    fullDescriptionEn: 'Accept orders from all channels in one interface. Automatic routing, prioritization and tracking.',
    icon: ShoppingCart,
    color: '#F97316',
    bgGradient: 'from-orange-500/10 to-orange-600/5',
    size: 'large',
    features: [
      { icon: Phone, label: 'Колл-центр', labelEn: 'Call Center', desc: 'Приём заказов по телефону', descEn: 'Phone order processing' },
      { icon: Globe, label: 'Веб-сайт', labelEn: 'Website', desc: 'Онлайн-заказы 24/7', descEn: 'Online orders 24/7' },
      { icon: Smartphone, label: 'Приложение', labelEn: 'Mobile App', desc: 'iOS и Android', descEn: 'iOS and Android' },
      { icon: MessageSquare, label: 'TG/WA MiniApp', labelEn: 'TG/WA MiniApp', desc: 'Telegram и WhatsApp боты', descEn: 'Telegram & WhatsApp bots' },
      { icon: QrCode, label: 'QR-меню', labelEn: 'QR Menu', desc: 'Заказ со стола', descEn: 'Table ordering' },
      { icon: Monitor, label: 'Киоск', labelEn: 'Kiosk', desc: 'Самообслуживание', descEn: 'Self-service' },
      { icon: Bike, label: 'Своя доставка', labelEn: 'Own Delivery', desc: 'Курьерская служба', descEn: 'Courier service' },
    ]
  },
  {
    id: 'pos',
    title: 'POS',
    titleEn: 'POS',
    description: 'Касса и управление точками',
    descriptionEn: 'Register & outlet management',
    fullDescription: 'Полноценная кассовая система с управлением складом, персоналом и финансами.',
    fullDescriptionEn: 'Full-featured POS system with inventory, staff and finance management.',
    icon: Monitor,
    color: '#3B82F6',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    size: 'medium',
    features: [
      { icon: Package, label: 'Склад', labelEn: 'Inventory', desc: 'Учёт остатков', descEn: 'Stock tracking' },
      { icon: Users, label: 'Персонал', labelEn: 'Staff', desc: 'Смены и доступ', descEn: 'Shifts & access' },
      { icon: Wallet, label: 'Финансы', labelEn: 'Finance', desc: 'Кассовые отчёты', descEn: 'Cash reports' },
    ]
  },
  {
    id: 'kitchen',
    title: 'Кухня',
    titleEn: 'Kitchen',
    description: 'KDS и контроль приготовления',
    descriptionEn: 'KDS & cooking control',
    fullDescription: 'Кухонный дисплей с таймерами, очередями и аналитикой времени приготовления.',
    fullDescriptionEn: 'Kitchen display with timers, queues and cooking time analytics.',
    icon: ChefHat,
    color: '#EF4444',
    bgGradient: 'from-red-500/10 to-red-600/5',
    size: 'medium',
    features: [
      { icon: Utensils, label: 'KDS', labelEn: 'KDS', desc: 'Кухонный дисплей', descEn: 'Kitchen display' },
      { icon: Clock, label: 'Таймеры', labelEn: 'Timers', desc: 'Контроль времени', descEn: 'Time control' },
      { icon: TrendingUp, label: 'Прогноз', labelEn: 'Forecast', desc: 'Загрузка кухни', descEn: 'Kitchen load' },
    ]
  },
  {
    id: 'logistics',
    title: 'Логистика',
    titleEn: 'Logistics',
    description: 'Курьеры, маршруты и зоны доставки',
    descriptionEn: 'Couriers, routes & delivery zones',
    fullDescription: 'Управляйте курьерами, стройте оптимальные маршруты и контролируйте доставку в реальном времени.',
    fullDescriptionEn: 'Manage couriers, build optimal routes and track deliveries in real-time.',
    icon: Truck,
    color: '#10B981',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    size: 'medium',
    features: [
      { icon: MapPin, label: 'Зоны', labelEn: 'Zones', desc: 'Геозоны доставки', descEn: 'Delivery geozones' },
      { icon: Bike, label: 'Курьеры', labelEn: 'Couriers', desc: 'Трекинг и ЗП', descEn: 'Tracking & salary' },
      { icon: ArrowRight, label: 'Маршруты', labelEn: 'Routes', desc: 'Оптимизация', descEn: 'Optimization' },
    ]
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    titleEn: 'Analytics',
    description: 'Дашборды и отчёты в реальном времени',
    descriptionEn: 'Real-time dashboards & reports',
    fullDescription: 'Все метрики бизнеса на одном экране. ABC-анализ, когортный анализ, воронки и прогнозы.',
    fullDescriptionEn: 'All business metrics on one screen. ABC analysis, cohort analysis, funnels and forecasts.',
    icon: BarChart3,
    color: '#8B5CF6',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    size: 'large',
    features: [
      { icon: TrendingUp, label: 'Выручка', labelEn: 'Revenue', desc: 'Динамика продаж', descEn: 'Sales dynamics' },
      { icon: Users, label: 'Клиенты', labelEn: 'Customers', desc: 'RFM-анализ', descEn: 'RFM analysis' },
      { icon: PieChart, label: 'ABC-XYZ', labelEn: 'ABC-XYZ', desc: 'Анализ товаров', descEn: 'Product analysis' },
      { icon: LayoutDashboard, label: 'Дашборды', labelEn: 'Dashboards', desc: 'Кастомные отчёты', descEn: 'Custom reports' },
    ]
  },
  {
    id: 'crm',
    title: 'CRM',
    titleEn: 'CRM',
    description: 'База клиентов и лояльность',
    descriptionEn: 'Customer base & loyalty',
    fullDescription: 'Сегментация базы, история заказов, бонусная программа и автоматические рассылки.',
    fullDescriptionEn: 'Database segmentation, order history, loyalty program and automated mailings.',
    icon: Users,
    color: '#EC4899',
    bgGradient: 'from-pink-500/10 to-pink-600/5',
    size: 'small',
    features: [
      { icon: Target, label: 'Сегменты', labelEn: 'Segments', desc: 'Группы клиентов', descEn: 'Customer groups' },
      { icon: Gift, label: 'Бонусы', labelEn: 'Bonuses', desc: 'Программа лояльности', descEn: 'Loyalty program' },
      { icon: Star, label: 'Отзывы', labelEn: 'Reviews', desc: 'Обратная связь', descEn: 'Feedback' },
    ]
  },
  {
    id: 'marketing',
    title: 'Маркетинг',
    titleEn: 'Marketing',
    description: 'Push, SMS и акции',
    descriptionEn: 'Push, SMS & promotions',
    fullDescription: 'Автоматизированные рассылки, триггерные кампании, промокоды и акции.',
    fullDescriptionEn: 'Automated mailings, trigger campaigns, promo codes and promotions.',
    icon: Megaphone,
    color: '#F59E0B',
    bgGradient: 'from-amber-500/10 to-amber-600/5',
    size: 'medium',
    features: [
      { icon: Bell, label: 'Push', labelEn: 'Push', desc: 'Уведомления', descEn: 'Notifications' },
      { icon: MessageSquare, label: 'SMS', labelEn: 'SMS', desc: 'Массовые рассылки', descEn: 'Mass mailings' },
      { icon: Percent, label: 'Акции', labelEn: 'Promos', desc: 'Скидки и офферы', descEn: 'Discounts & offers' },
    ]
  },
  {
    id: 'payments',
    title: 'Платежи',
    titleEn: 'Payments',
    description: 'Все способы оплаты',
    descriptionEn: 'All payment methods',
    fullDescription: 'Интеграция с платёжными системами, эквайринг, онлайн-оплата и фискализация.',
    fullDescriptionEn: 'Payment system integration, acquiring, online payment and fiscalization.',
    icon: CreditCard,
    color: '#0EA5E9',
    bgGradient: 'from-sky-500/10 to-sky-600/5',
    size: 'small',
    features: [
      { icon: CreditCard, label: 'Карты', labelEn: 'Cards', desc: 'Visa, Mastercard', descEn: 'Visa, Mastercard' },
      { icon: Wallet, label: 'Наличные', labelEn: 'Cash', desc: 'Оплата курьеру', descEn: 'Cash on delivery' },
      { icon: Smartphone, label: 'Онлайн', labelEn: 'Online', desc: 'Click, Payme', descEn: 'Click, Payme' },
    ]
  },
]

function BentoCard({ 
  item, 
  index, 
  language, 
  isExpanded, 
  onExpand, 
  onClose 
}: { 
  item: BentoItem
  index: number
  language: string
  isExpanded: boolean
  onExpand: () => void
  onClose: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    small: 'col-span-1 row-span-1',
  }

  return (
    <>
      <motion.div
        className={`${sizeClasses[item.size]} relative group cursor-pointer`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onExpand}
        layoutId={`card-${item.id}`}
      >
        <motion.div
          className={`h-full bg-gradient-to-br ${item.bgGradient} rounded-3xl p-5 lg:p-6 pb-6 lg:pb-8 border border-white/50 backdrop-blur-sm overflow-hidden relative`}
          style={{
            boxShadow: isHovered 
              ? `0 20px 40px ${item.color}20, 0 0 0 1px ${item.color}30` 
              : '0 4px 20px rgba(0,0,0,0.03)',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* 3D gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${item.color}15, transparent 70%)`
            }}
          />

          {/* Icon */}
          <motion.div
            className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
            style={{ backgroundColor: `${item.color}15` }}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6" style={{ color: item.color }} />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg lg:text-xl font-bold text-brand-darkBlue mb-1">
              {language === 'ru' ? item.title : item.titleEn}
            </h3>
            <p className="text-sm text-brand-darkBlue/60 mb-3">
              {language === 'ru' ? item.description : item.descriptionEn}
            </p>

            {/* Quick features preview */}
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.features.slice(0, item.size === 'large' ? 6 : 3).map((feature, idx) => {
                  const FeatureIcon = feature.icon
                  return (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-brand-darkBlue/70"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <FeatureIcon className="w-3 h-3" style={{ color: item.color }} />
                      {language === 'ru' ? feature.label : feature.labelEn}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div 
            className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
            style={{ backgroundColor: item.color }}
          />
          
          {/* Click indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            animate={isHovered ? { x: 0, scale: 1 } : { x: -10, scale: 0.8 }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: item.color }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            {/* Modal */}
            <motion.div
              className="fixed inset-4 lg:inset-20 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-6 lg:p-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                layoutId={`card-${item.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon className="w-8 h-8" style={{ color: item.color }} />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-brand-darkBlue mb-2">
                      {language === 'ru' ? item.title : item.titleEn}
                    </h2>
                    <p className="text-brand-darkBlue/60">
                      {language === 'ru' ? item.fullDescription : item.fullDescriptionEn}
                    </p>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.features.map((feature, idx) => {
                    const FeatureIcon = feature.icon
                    return (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <FeatureIcon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-darkBlue mb-0.5">
                            {language === 'ru' ? feature.label : feature.labelEn}
                          </h4>
                          <p className="text-sm text-brand-darkBlue/60">
                            {language === 'ru' ? feature.desc : feature.descEn}
                          </p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-auto" />
                      </motion.div>
                    )
                  })}
                </div>

                {/* Bottom CTA */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-brand-darkBlue/50">
                    {language === 'ru' 
                      ? 'Все функции доступны во всех тарифах' 
                      : 'All features available in all plans'}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl font-medium text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: item.color }}
                  >
                    {language === 'ru' ? 'Понятно' : 'Got it'}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function ArchitectureMap() {
  const { language } = useLocale()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-lightBeige/30 to-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-brand-darkBlue/5 text-brand-darkBlue text-sm font-medium px-4 py-2 rounded-full mb-5"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            {language === 'ru' ? 'Единая платформа' : 'Unified Platform'}
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
            {language === 'ru' ? 'Всё для бизнеса' : 'Everything for Business'}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-xl mx-auto">
            {language === 'ru' 
              ? 'Модули, которые работают вместе как единый организм' 
              : 'Modules that work together as one organism'}
          </p>
          <p className="text-sm text-brand-darkBlue/40 mt-2">
            {language === 'ru' 
              ? 'Нажмите на карточку для подробностей' 
              : 'Click on card for details'}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px] lg:auto-rows-[220px]">
          {bentoItems.map((item, index) => (
            <BentoCard 
              key={item.id} 
              item={item} 
              index={index} 
              language={language}
              isExpanded={expandedId === item.id}
              onExpand={() => setExpandedId(item.id)}
              onClose={() => setExpandedId(null)}
            />
          ))}
        </div>

        {/* Bottom stat */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-brand-darkBlue/40 text-sm">
            {language === 'ru' 
              ? '8 модулей • Единая база данных • Бесшовная интеграция' 
              : '8 modules • Single database • Seamless integration'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
