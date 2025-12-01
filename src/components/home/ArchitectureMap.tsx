import { useState } from 'react'
import { motion } from 'framer-motion'
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
  MapPin
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface BentoItem {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  icon: typeof Monitor
  color: string
  bgGradient: string
  size: 'large' | 'medium' | 'small'
  features?: { icon: typeof Monitor; label: string; labelEn: string }[]
}

const bentoItems: BentoItem[] = [
  {
    id: 'orders',
    title: 'Все заказы',
    titleEn: 'All Orders',
    description: 'Единое окно для всех каналов продаж',
    descriptionEn: 'Single window for all sales channels',
    icon: ShoppingCart,
    color: '#F97316',
    bgGradient: 'from-orange-500/10 to-orange-600/5',
    size: 'large',
    features: [
      { icon: Phone, label: 'Колл-центр', labelEn: 'Call Center' },
      { icon: Globe, label: 'Веб-сайт', labelEn: 'Website' },
      { icon: Smartphone, label: 'Приложение', labelEn: 'Mobile App' },
      { icon: QrCode, label: 'QR-меню', labelEn: 'QR Menu' },
      { icon: Bike, label: 'Своя доставка', labelEn: 'Own Delivery' },
    ]
  },
  {
    id: 'pos',
    title: 'POS',
    titleEn: 'POS',
    description: 'Касса и управление точками',
    descriptionEn: 'Register & outlet management',
    icon: Monitor,
    color: '#3B82F6',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    size: 'medium',
  },
  {
    id: 'kitchen',
    title: 'Кухня',
    titleEn: 'Kitchen',
    description: 'KDS и контроль приготовления',
    descriptionEn: 'KDS & cooking control',
    icon: ChefHat,
    color: '#EF4444',
    bgGradient: 'from-red-500/10 to-red-600/5',
    size: 'medium',
  },
  {
    id: 'logistics',
    title: 'Логистика',
    titleEn: 'Logistics',
    description: 'Курьеры, маршруты и зоны доставки',
    descriptionEn: 'Couriers, routes & delivery zones',
    icon: Truck,
    color: '#10B981',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    size: 'medium',
    features: [
      { icon: MapPin, label: 'Зоны', labelEn: 'Zones' },
      { icon: Bike, label: 'Курьеры', labelEn: 'Couriers' },
    ]
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    titleEn: 'Analytics',
    description: 'Дашборды и отчёты в реальном времени',
    descriptionEn: 'Real-time dashboards & reports',
    icon: BarChart3,
    color: '#8B5CF6',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    size: 'large',
    features: [
      { icon: TrendingUp, label: 'Выручка', labelEn: 'Revenue' },
      { icon: Users, label: 'Клиенты', labelEn: 'Customers' },
      { icon: ShoppingCart, label: 'Заказы', labelEn: 'Orders' },
    ]
  },
  {
    id: 'crm',
    title: 'CRM',
    titleEn: 'CRM',
    description: 'База клиентов и лояльность',
    descriptionEn: 'Customer base & loyalty',
    icon: Users,
    color: '#EC4899',
    bgGradient: 'from-pink-500/10 to-pink-600/5',
    size: 'small',
  },
  {
    id: 'marketing',
    title: 'Маркетинг',
    titleEn: 'Marketing',
    description: 'Push, SMS и акции',
    descriptionEn: 'Push, SMS & promotions',
    icon: Megaphone,
    color: '#F59E0B',
    bgGradient: 'from-amber-500/10 to-amber-600/5',
    size: 'medium',
    features: [
      { icon: Bell, label: 'Push', labelEn: 'Push' },
      { icon: Gift, label: 'Акции', labelEn: 'Promos' },
      { icon: Star, label: 'Отзывы', labelEn: 'Reviews' },
    ]
  },
  {
    id: 'payments',
    title: 'Платежи',
    titleEn: 'Payments',
    description: 'Все способы оплаты',
    descriptionEn: 'All payment methods',
    icon: CreditCard,
    color: '#0EA5E9',
    bgGradient: 'from-sky-500/10 to-sky-600/5',
    size: 'small',
  },
]

function BentoCard({ item, index, language }: { item: BentoItem; index: number; language: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    small: 'col-span-1 row-span-1',
  }

  return (
    <motion.div
      className={`${sizeClasses[item.size]} relative group`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`h-full bg-gradient-to-br ${item.bgGradient} rounded-3xl p-6 border border-white/50 backdrop-blur-sm cursor-pointer overflow-hidden relative`}
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
          className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
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
          <p className="text-sm text-brand-darkBlue/60 mb-4">
            {language === 'ru' ? item.description : item.descriptionEn}
          </p>

          {/* Features for large/medium cards */}
          {item.features && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {item.features.map((feature, idx) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-darkBlue/70"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <FeatureIcon className="w-3.5 h-3.5" style={{ color: item.color }} />
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
        
        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          animate={isHovered ? { x: 0 } : { x: -10 }}
        >
          <ArrowRight className="w-4 h-4" style={{ color: item.color }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ArchitectureMap() {
  const { language } = useLocale()

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
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px] lg:auto-rows-[200px]">
          {bentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} language={language} />
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
