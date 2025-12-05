import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Globe,
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  Calendar,
  Users,
  Mail,
  Linkedin,
  Download,
  Lock,
  MessageCircle,
  BarChart3,
  Layers,
  Store,
  Truck,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Leaf,
  Briefcase,
  FileText
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { SEO } from '@/components/SEO'
import { ContactForm } from '@/components/ContactForm'
import { downloadInvestorDeck } from '@/utils/generateInvestorDeck'
import { downloadOnePager } from '@/utils/generateOnePager'

// Animated counter component
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0
        const end = value
        const duration = 2000
        const increment = end / (duration / 16)
        
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setDisplayValue(end)
            clearInterval(timer)
          } else {
            setDisplayValue(Math.floor(start))
          }
        }, 16)
      }}
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.span>
  )
}

// Traction metrics
const tractionMetrics = [
  { value: 1000, suffix: '+', labelKey: 'investors.traction.restaurants', icon: Store },
  { value: 25000, suffix: '+', labelKey: 'investors.traction.dailyOrders', icon: BarChart3 },
  { value: 100, suffix: 'M+', labelKey: 'investors.traction.gmv', icon: DollarSign },
  { value: 7, suffix: '', labelKey: 'investors.traction.countries', icon: Globe },
]

// Market regions
const currentMarkets = [
  { name: 'Uzbekistan', flag: '🇺🇿', status: 'live' },
  { name: 'Kazakhstan', flag: '🇰🇿', status: 'live' },
  { name: 'Azerbaijan', flag: '🇦🇿', status: 'live' },
  { name: 'Kyrgyzstan', flag: '🇰🇬', status: 'live' },
  { name: 'UAE', flag: '🇦🇪', status: 'live' },
  { name: 'Georgia', flag: '🇬🇪', status: 'live' },
  { name: 'Cyprus', flag: '🇨🇾', status: 'live' },
]

const expansionMarkets = [
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Egypt', flag: '🇪🇬' },
]

// Roadmap items
const roadmapItems = [
  {
    phase: '2026',
    items: [
      'investors.roadmap.2026.ai',
      'investors.roadmap.2026.uae500',
      'investors.roadmap.2026.integrations',
    ]
  },
  {
    phase: '2027',
    items: [
      'investors.roadmap.2027.uae1500',
      'investors.roadmap.2027.partnerships',
      'investors.roadmap.2027.ksa',
    ]
  },
  {
    phase: '2028',
    items: [
      'investors.roadmap.2028.jeddah',
      'investors.roadmap.2028.5000',
      'investors.roadmap.2028.leadership',
    ]
  },
]

// Team members
const teamMembers = [
  {
    name: 'Fakhriddin Yusupov',
    role: 'CEO & Co-founder',
    avatar: '/team/fakhriddin.jpg',
    linkedin: 'https://www.linkedin.com/in/fakhriddin-yusupov-821086b3/',
    highlights: ['Ex-CEO MaxWay', 'MBA / DBA', '10+ years Food-Tech']
  },
  {
    name: 'Azizbek Bakhodirov',
    role: 'COO & Co-founder',
    avatar: '/team/azizbek.jpg',
    linkedin: '',
    highlights: ['Ex-Express24', 'Operations Expert']
  },
  {
    name: 'Abdullo Khidoyatov',
    role: 'CTO & Co-founder',
    avatar: '/team/abdullo.jpg',
    linkedin: 'https://www.linkedin.com/in/abdullokh-khidoyatov-9b456b7b/',
    highlights: ['Tech Architecture', 'Scale-up Specialist']
  },
  {
    name: 'Madiyar Bakbergenov',
    role: 'Adviser',
    avatar: '/team/madiyar.jpg',
    linkedin: '',
    highlights: ['Strategic Advisor', 'Industry Expert']
  },
]

// Team background companies
const teamBackground = [
  { name: 'Express24', url: 'https://www.linkedin.com/company/express24careers/' },
  { name: 'Chocofood', url: 'https://www.linkedin.com/company/chocoholding/' },
  { name: 'MaxWay', url: 'https://www.linkedin.com/company/maxwayuz/' },
  { name: 'Oson', url: 'https://www.linkedin.com/company/osoncom/' },
  { name: 'UDEVS', url: 'https://www.linkedin.com/company/udevs-io/' },
]

// Investors/Partners
const investors = [
  {
    name: 'AloqaVentures',
    type: 'Pre-seed Investor',
    logo: '/logos/aloqa-ventures.png',
    url: 'https://www.linkedin.com/company/aloqaventures/',
    description: 'Leading VC fund in Central Asia with 6x exits'
  },
]

export function Investors() {
  const { t, language } = useLocale()
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactType, setContactType] = useState<'general' | 'dataroom'>('general')

  const handleDownloadDeck = () => {
    downloadInvestorDeck(language)
  }

  const handleDownloadOnePager = () => {
    downloadOnePager(language)
  }

  const handleDataRoomRequest = () => {
    setContactType('dataroom')
    setShowContactForm(true)
  }

  const handleContactFounders = () => {
    setContactType('general')
    setShowContactForm(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={language === 'en' ? 'For Investors' : language === 'uz' ? 'Investorlar uchun' : 'Инвесторам'}
        description={language === 'en' 
          ? 'Delever is building the operating system for restaurants and urban commerce in emerging markets. $100M+ GMV, 1000+ restaurants, 7 countries. TAM $250B+'
          : language === 'uz'
          ? "Delever rivojlanayotgan bozorlarda restoranlar va shahar tijorati uchun operatsion tizimni yaratmoqda. $100M+ GMV, 1000+ restoranlar, 7 mamlakat."
          : 'Delever создаёт операционную систему для ресторанов и городской коммерции на развивающихся рынках. $100M+ GMV, 1000+ ресторанов, 7 стран.'
        }
        keywords={language === 'en'
          ? 'investment, food tech, startup, emerging markets, restaurant technology, SaaS, Central Asia, MENA, UAE, seed funding'
          : language === 'uz'
          ? "investitsiya, food tech, startup, rivojlanayotgan bozorlar, restoran texnologiyasi, SaaS, Markaziy Osiyo, MENA, BAA"
          : 'инвестиции, food tech, стартап, развивающиеся рынки, ресторанные технологии, SaaS, Центральная Азия, MENA, ОАЭ'
        }
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue via-blue-900 to-brand-darkBlue" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Rocket className="h-4 w-4 text-emerald-400" />
              {t('investors.badge')}
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('investors.hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed max-w-3xl mx-auto">
              {t('investors.hero.subtitle')}
            </p>
            
            <p className="text-base text-white/60 mb-10 max-w-2xl mx-auto">
              {t('investors.hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <motion.button 
                onClick={handleDownloadOnePager}
                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="h-5 w-5" />
                {t('investors.cta.onePager')}
              </motion.button>
              
              <motion.button 
                onClick={handleDownloadDeck}
                className="flex items-center gap-2 bg-white text-brand-darkBlue px-6 py-3.5 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                {t('investors.cta.downloadDeck')}
              </motion.button>
              
              <motion.button 
                onClick={handleDataRoomRequest}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3.5 rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lock className="h-5 w-5" />
                {t('investors.cta.dataRoom')}
              </motion.button>
              
              <motion.button 
                onClick={handleContactFounders}
                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5" />
                {t('investors.cta.contactFounders')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-brand-blue" />
              </div>
              <span className="text-brand-blue font-semibold text-lg">01 — Vision</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-6">
              "{t('investors.vision.quote')}"
            </h2>
            
            <p className="text-lg text-brand-darkBlue/70 mb-8 leading-relaxed">
              {t('investors.vision.description')}
            </p>

            {/* Vision cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {['unify', 'reduce', 'standard', 'infrastructure'].map((key, idx) => (
                <motion.div
                  key={key}
                  className="flex items-start gap-3 p-4 rounded-xl bg-brand-lightBlue/30 border border-brand-lightTeal/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-darkBlue">{t(`investors.vision.${key}`)}</span>
                </motion.div>
              ))}
            </div>

            {/* Long-term vision */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-brand-darkBlue to-blue-900">
              <h3 className="font-bold text-lg mb-4 text-white">{t('investors.vision.longTerm')}</h3>
              <div className="space-y-3">
                {['mena', 'marketplace', 'api'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                    <span className="text-white">{t(`investors.vision.lt.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-red-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <span className="text-red-500 font-semibold text-lg">02 — Problem</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-6">
              {t('investors.problem.title')}
            </h2>

            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.div
                  key={num}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-red-100 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.1 }}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 font-bold text-sm">{num}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-darkBlue mb-1">
                      {t(`investors.problem.p${num}.title`)}
                    </h4>
                    <p className="text-brand-darkBlue/60 text-sm">
                      {t(`investors.problem.p${num}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-emerald-700 font-medium">
                {t('investors.problem.solution')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-red-50/30 to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-500" />
              </div>
              <span className="text-emerald-500 font-semibold text-lg">03 — Solution</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('investors.solution.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60 mb-10">
              {t('investors.solution.subtitle')}
            </p>

            {/* Solution grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Layers, key: 'channels' },
                { icon: Store, key: 'orders' },
                { icon: Truck, key: 'couriers' },
                { icon: Users, key: 'crm' },
                { icon: BarChart3, key: 'analytics' },
                { icon: CreditCard, key: 'integrations' },
              ].map(({ icon: Icon, key }, idx) => (
                <motion.div
                  key={key}
                  className="p-5 rounded-xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-brand-darkBlue mb-1">
                    {t(`investors.solution.${key}.title`)}
                  </h4>
                  <p className="text-sm text-brand-darkBlue/60">
                    {t(`investors.solution.${key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Value propositions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '+35%', label: 'investors.solution.vp1' },
                { value: '-30%', label: 'investors.solution.vp2' },
                { value: '+40%', label: 'investors.solution.vp3' },
                { value: '100%', label: 'investors.solution.vp4' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-4 rounded-xl bg-emerald-500 text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-white/80">{t(item.label)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-blue-500 font-semibold text-lg">04 — Market</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('investors.market.title')}
            </h2>
            
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-lg mb-10">
              TAM: $250B+ Food-Tech Infrastructure
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current markets */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg">
                <h3 className="font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  {t('investors.market.current')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentMarkets.map((market) => (
                    <div 
                      key={market.name}
                      className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-lg">{market.flag}</span>
                      <span className="text-sm font-medium text-brand-darkBlue">{market.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expansion markets */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg">
                <h3 className="font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  {t('investors.market.expansion')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expansionMarkets.map((market) => (
                    <div 
                      key={market.name}
                      className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-lg">{market.flag}</span>
                      <span className="text-sm font-medium text-brand-darkBlue">{market.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="py-20 lg:py-28 bg-brand-darkBlue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-emerald-400 font-semibold text-lg">05 — Traction</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
              {t('investors.traction.title')}
            </h2>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {tractionMetrics.map((metric, idx) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={idx}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                    </div>
                    <div className="text-white/60 text-sm">{t(metric.labelKey)}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Additional metrics */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { value: '<1%', label: 'investors.traction.churn' },
                { value: '35%', label: 'investors.traction.direct' },
                { value: '3x', label: 'investors.traction.growth' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{item.value}</div>
                  <div className="text-white/70 text-sm">{t(item.label)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-amber-600 font-semibold text-lg">06 — Business Model</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('investors.model.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60 mb-10">
              SaaS + Transaction Layer + Infrastructure Layer
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'investors.model.saas.title',
                  items: ['investors.model.saas.1', 'investors.model.saas.2', 'investors.model.saas.3'],
                  color: 'blue'
                },
                { 
                  title: 'investors.model.revenue.title',
                  items: ['investors.model.revenue.1', 'investors.model.revenue.2', 'investors.model.revenue.3'],
                  color: 'emerald'
                },
                { 
                  title: 'investors.model.platform.title',
                  items: ['investors.model.platform.1', 'investors.model.platform.2'],
                  color: 'violet'
                },
              ].map((block, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 rounded-2xl border-2 ${
                    block.color === 'blue' ? 'border-blue-200 bg-blue-50/50' :
                    block.color === 'emerald' ? 'border-emerald-200 bg-emerald-50/50' :
                    'border-violet-200 bg-violet-50/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="font-bold text-brand-darkBlue mb-4">{t(block.title)}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-darkBlue/70">
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          block.color === 'blue' ? 'text-blue-500' :
                          block.color === 'emerald' ? 'text-emerald-500' :
                          'text-violet-500'
                        }`} />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-brand-lightBlue/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-violet-600" />
              </div>
              <span className="text-violet-600 font-semibold text-lg">07 — Competitive Moat</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-6">
              {t('investors.competitive.title')}
            </h2>
            
            <div className="p-6 rounded-2xl bg-brand-darkBlue mb-8">
              <p className="text-lg font-medium text-white">
                "{t('investors.competitive.quote')}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <motion.div
                  key={num}
                  className="p-4 rounded-xl bg-white border border-violet-100 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-brand-darkBlue text-sm">{t(`investors.competitive.a${num}`)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESG Brief */}
      <section className="py-16 lg:py-20 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-bold text-brand-darkBlue text-xl mb-2">ESG & Sustainability</h3>
              <p className="text-brand-darkBlue/60 mb-4">{t('investors.esg.brief')}</p>
            </div>
            <a href="/esg" className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
              {t('investors.esg.learnMore')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-semibold text-lg">08 — Roadmap</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-10">
              {t('investors.roadmap.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {roadmapItems.map((phase, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 rounded-2xl border-2 ${
                    idx === 0 ? 'border-emerald-300 bg-emerald-50/50' :
                    idx === 1 ? 'border-blue-300 bg-blue-50/50' :
                    'border-violet-300 bg-violet-50/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${
                    idx === 0 ? 'bg-emerald-200 text-emerald-700' :
                    idx === 1 ? 'bg-blue-200 text-blue-700' :
                    'bg-violet-200 text-violet-700'
                  }`}>
                    {phase.phase}
                  </div>
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-darkBlue">
                        <ArrowRight className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          idx === 0 ? 'text-emerald-500' :
                          idx === 1 ? 'text-blue-500' :
                          'text-violet-500'
                        }`} />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-brand-lightBlue/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-rose-600" />
              </div>
              <span className="text-rose-600 font-semibold text-lg">09 — Team</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('investors.team.title')}
            </h2>
            
            <p className="text-lg text-brand-darkBlue/60 mb-10">
              {t('investors.team.subtitle')}
            </p>

            <div className="grid lg:grid-cols-3 gap-8 mb-10">
              {/* Team Members */}
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {teamMembers.map((member, idx) => (
                    <motion.div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-gray-100 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-brand-darkBlue">{member.name}</h3>
                          <p className="text-brand-blue font-medium text-sm">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {member.highlights.map((h, i) => (
                          <span key={i} className="text-xs bg-brand-lightBlue/50 text-brand-darkBlue px-2 py-1 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-brand-blue hover:text-brand-darkBlue transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* We come from */}
              <div className="lg:col-span-1">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg h-full">
                  <h3 className="font-bold text-brand-darkBlue mb-4">{t('investors.team.wecome')}</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {teamBackground.map((company, idx) => (
                      <div 
                        key={idx}
                        className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-medium text-brand-darkBlue border border-gray-100"
                      >
                        {company.name}
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-bold text-brand-darkBlue mb-3">{t('investors.team.backedBy')}</h4>
                  {investors.map((investor, idx) => (
                    <a 
                      key={idx}
                      href={investor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-brand-blue/5 px-4 py-3 rounded-xl border border-brand-blue/20 hover:bg-brand-blue/10 transition-all"
                    >
                      <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-darkBlue">{investor.name}</div>
                        <div className="text-xs text-brand-darkBlue/60">{investor.type}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-brand-darkBlue/30 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Team experience line */}
            <div className="text-center p-6 rounded-2xl bg-brand-darkBlue">
              <p className="text-lg font-medium text-white">
                {t('investors.team.experience')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-brand-darkBlue relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('investors.final.title')}
            </h2>
            <p className="text-lg text-white/70 mb-10">
              {t('investors.final.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                onClick={handleDownloadOnePager}
                className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="h-5 w-5" />
                {t('investors.cta.onePager')}
              </motion.button>
              
              <motion.button 
                onClick={handleDownloadDeck}
                className="flex items-center gap-2 bg-white text-brand-darkBlue px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                {t('investors.cta.downloadDeck')}
              </motion.button>
              
              <motion.button 
                onClick={handleDataRoomRequest}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lock className="h-5 w-5" />
                {t('investors.cta.requestFinancials')}
              </motion.button>
              
              <motion.button 
                onClick={handleContactFounders}
                className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5" />
                {t('investors.cta.meetFounders')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
        tag={contactType === 'dataroom' ? 'investor-dataroom' : 'investor-contact'}
      />
    </div>
  )
}

