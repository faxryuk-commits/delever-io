import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Users, Rocket, Award, Globe, Target, Leaf, TrendingUp, ArrowRight, X } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const stats = [
    { value: '1000+', labelKey: 'stats.businesses' },
    { value: '7', labelKey: 'stats.countries' },
    { value: '13M+', labelKey: 'stats.orders' },
    { value: '40+', labelKey: 'stats.integrations' },
  ]

  const values = [
    {
      icon: Rocket,
      titleKey: 'about.speed',
      descKey: 'about.speedDesc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Award,
      titleKey: 'about.quality',
      descKey: 'about.qualityDesc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      titleKey: 'about.support',
      descKey: 'about.supportDesc',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Target,
      titleKey: 'about.result',
      descKey: 'about.resultDesc',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  // Market data for each country
  const countryData: Record<string, {
    population: string
    foodDeliveryMarket: string
    growth: string
    potential: { ru: string; en: string; uz: string }
    highlight: { ru: string; en: string; uz: string }
  }> = {
    uz: {
      population: '36M',
      foodDeliveryMarket: '$800M',
      growth: '+45%',
      potential: {
        ru: 'Главный рынок Delever. Быстрорастущий средний класс, 65% населения моложе 30 лет. Низкая конкуренция среди tech-платформ.',
        en: 'Delever\'s main market. Fast-growing middle class, 65% population under 30. Low competition among tech platforms.',
        uz: 'Delever\'ning asosiy bozori. Tez o\'sib borayotgan o\'rta sinf, aholining 65% 30 yoshdan yosh. Tech platformalar orasida past raqobat.'
      },
      highlight: {
        ru: '🏆 #1 рынок по клиентам',
        en: '🏆 #1 market by clients',
        uz: '🏆 Mijozlar bo\'yicha #1 bozor'
      }
    },
    kz: {
      population: '20M',
      foodDeliveryMarket: '$1.2B',
      growth: '+35%',
      potential: {
        ru: 'Крупнейшая экономика ЦА. Высокий уровень цифровизации, развитая инфраструктура онлайн-платежей.',
        en: 'Largest economy in Central Asia. High digitalization level, developed online payment infrastructure.',
        uz: 'Markaziy Osiyodagi eng katta iqtisodiyot. Yuqori raqamlashtirish darajasi, rivojlangan onlayn to\'lov infratuzilmasi.'
      },
      highlight: {
        ru: '💰 Наибольший средний чек',
        en: '💰 Highest average check',
        uz: '💰 Eng yuqori o\'rtacha chek'
      }
    },
    kg: {
      population: '7M',
      foodDeliveryMarket: '$150M',
      growth: '+40%',
      potential: {
        ru: 'Быстро растущий рынок доставки в Бишкеке. Молодое население, высокий уровень проникновения смартфонов.',
        en: 'Fast-growing delivery market in Bishkek. Young population, high smartphone penetration.',
        uz: 'Bishkekda tez o\'sib borayotgan yetkazib berish bozori. Yosh aholi, smartfonlarning yuqori tarqalishi.'
      },
      highlight: {
        ru: '📱 80% онлайн-заказов',
        en: '📱 80% online orders',
        uz: '📱 80% onlayn buyurtmalar'
      }
    },
    az: {
      population: '10M',
      foodDeliveryMarket: '$400M',
      growth: '+30%',
      potential: {
        ru: 'Нефтяная экономика с высоким уровнем дохода. Баку — премиум-рынок для HoReCa. Растущий туризм.',
        en: 'Oil economy with high income levels. Baku is a premium HoReCa market. Growing tourism.',
        uz: 'Yuqori daromadli neft iqtisodiyoti. Boku — HoReCa uchun premium bozor. O\'sib borayotgan turizm.'
      },
      highlight: {
        ru: '🛢️ Премиум сегмент',
        en: '🛢️ Premium segment',
        uz: '🛢️ Premium segment'
      }
    },
    ge: {
      population: '3.7M',
      foodDeliveryMarket: '$200M',
      growth: '+25%',
      potential: {
        ru: 'Туристический хаб региона. Тбилиси — гастрономическая столица Кавказа. Развитая IT-экосистема.',
        en: 'Regional tourism hub. Tbilisi is the gastronomic capital of Caucasus. Developed IT ecosystem.',
        uz: 'Mintaqaviy turizm markazi. Tbilisi — Kavkazning gastronomik poytaxti. Rivojlangan IT ekotizimi.'
      },
      highlight: {
        ru: '🍷 Гастрономия + туризм',
        en: '🍷 Gastronomy + tourism',
        uz: '🍷 Gastronomiya + turizm'
      }
    },
    cy: {
      population: '1.2M',
      foodDeliveryMarket: '$100M',
      growth: '+20%',
      potential: {
        ru: 'Европейский плацдарм. Высокий уровень дохода, развитый туризм. Вход на рынок ЕС.',
        en: 'European foothold. High income level, developed tourism. Gateway to EU market.',
        uz: 'Yevropa o\'rni. Yuqori daromad darajasi, rivojlangan turizm. Yevropa Ittifoqi bozoriga kirish.'
      },
      highlight: {
        ru: '🇪🇺 Выход в Европу',
        en: '🇪🇺 EU gateway',
        uz: '🇪🇺 Yevropa Ittifoqiga kirish'
      }
    },
    ae: {
      population: '10M',
      foodDeliveryMarket: '$5B',
      growth: '+15%',
      potential: {
        ru: 'Крупнейший рынок доставки в MENA. Дубай — мировой хаб ресторанного бизнеса. Высокая маржинальность.',
        en: 'Largest delivery market in MENA. Dubai is a global restaurant hub. High margins.',
        uz: 'MENA\'dagi eng katta yetkazib berish bozori. Dubay — restoran biznesining jahon markazi. Yuqori marja.'
      },
      highlight: {
        ru: '🚀 Стратегический приоритет',
        en: '🚀 Strategic priority',
        uz: '🚀 Strategik ustuvorlik'
      }
    }
  }

  const countries = [
    { nameKey: 'uz', flag: '🇺🇿' },
    { nameKey: 'kz', flag: '🇰🇿' },
    { nameKey: 'kg', flag: '🇰🇬' },
    { nameKey: 'az', flag: '🇦🇿' },
    { nameKey: 'ge', flag: '🇬🇪' },
    { nameKey: 'cy', flag: '🇨🇾' },
    { nameKey: 'ae', flag: '🇦🇪' },
  ]

  const countryNames: Record<string, Record<string, string>> = {
    uz: { ru: 'Узбекистан', en: 'Uzbekistan', uz: 'O\'zbekiston' },
    kz: { ru: 'Казахстан', en: 'Kazakhstan', uz: 'Qozog\'iston' },
    kg: { ru: 'Кыргызстан', en: 'Kyrgyzstan', uz: 'Qirg\'iziston' },
    az: { ru: 'Азербайджан', en: 'Azerbaijan', uz: 'Ozarbayjon' },
    ge: { ru: 'Грузия', en: 'Georgia', uz: 'Gruziya' },
    cy: { ru: 'Кипр', en: 'Cyprus', uz: 'Kipr' },
    ae: { ru: 'ОАЭ', en: 'UAE', uz: 'BAA' },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <>
      <SEO 
        title={language === 'uz' ? 'Kompaniya haqida' : language === 'en' ? 'About Us' : 'О компании'}
        description={language === 'uz'
          ? "Delever - 2020-yilda tashkil etilgan yetkazib berishni boshqarish platformasi. 1000+ bizneslar, 7 ta mamlakat, 13M+ qayta ishlangan buyurtmalar."
          : language === 'en'
          ? 'Delever is a delivery management platform founded in 2020. 1000+ businesses, 7 countries, 13M+ orders processed.'
          : 'Delever — платформа управления доставкой, основанная в 2020 году. 1000+ бизнесов, 7 стран, 13M+ обработанных заказов.'
        }
        keywords={language === 'uz'
          ? "Delever haqida, Delever kompaniya, yetkazib berish dasturi, restoran texnologiyalari, Toshkent, O'zbekiston"
          : language === 'en'
          ? 'about delever, delever company, delivery software company, restaurant technology, Tashkent, Uzbekistan, Kazakhstan'
          : 'о делевер, компания delever, разработчик ПО для доставки, ресторанные технологии, Ташкент, Узбекистан, Казахстан'
        }
      />
      <div ref={ref} className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.span 
            className="inline-flex items-center gap-2 bg-brand-lightBlue text-brand-darkBlue text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Globe className="w-4 h-4" />
            {t('about.badge')}
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div 
          className="bg-brand-darkBlue rounded-2xl p-8 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-white mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/60">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.h2 
          className="text-2xl font-bold text-brand-darkBlue mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {t('about.values')}
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-brand-lightTeal/30 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-brand-darkBlue mb-1">{t(value.titleKey)}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{t(value.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Geography - Countries */}
      <section className="container mx-auto max-w-4xl mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-darkBlue">{t('about.geography')}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, idx) => {
              const data = countryData[country.nameKey]
              const lang = language as 'ru' | 'en' | 'uz'
              const isActive = activeTooltip === country.nameKey
              return (
                <motion.div 
                  key={idx}
                  className={`relative group/country flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm cursor-pointer
                    bg-white border text-brand-darkBlue transition-all duration-300 ${
                    isActive 
                      ? 'border-brand-blue bg-brand-lightBlue/30' 
                      : 'border-brand-lightTeal/40 hover:border-brand-blue/40 hover:bg-brand-lightBlue/10'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => setActiveTooltip(isActive ? null : country.nameKey)}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="text-sm font-medium">
                    {countryNames[country.nameKey]?.[language] || countryNames[country.nameKey]?.['en']}
                  </span>
                  
                  {/* Desktop Tooltip (hover) */}
                  <div className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 opacity-0 invisible group-hover/country:opacity-100 group-hover/country:visible transition-all duration-300 z-50 pointer-events-none">
                    <div className="bg-brand-darkBlue text-white rounded-xl p-4 shadow-2xl">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/20">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-bold">
                            {countryNames[country.nameKey]?.[language] || countryNames[country.nameKey]?.['en']}
                          </span>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {data?.highlight?.[lang]}
                        </span>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-brand-green">{data?.population}</div>
                          <div className="text-[10px] text-white/60">
                            {language === 'ru' ? 'население' : language === 'uz' ? 'aholi' : 'population'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-brand-lightTeal">{data?.foodDeliveryMarket}</div>
                          <div className="text-[10px] text-white/60">
                            {language === 'ru' ? 'рынок' : language === 'uz' ? 'bozor' : 'market'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-400">{data?.growth}</div>
                          <div className="text-[10px] text-white/60">
                            {language === 'ru' ? 'рост/год' : language === 'uz' ? "o'sish/yil" : 'YoY growth'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs text-white/80 leading-relaxed">
                        {data?.potential?.[lang]}
                      </p>
                      
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-darkBlue" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Mobile Tooltip Modal */}
          <AnimatePresence>
            {activeTooltip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4"
                onClick={() => setActiveTooltip(null)}
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="bg-brand-darkBlue text-white rounded-2xl p-5 w-full max-w-md shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const data = countryData[activeTooltip]
                    const lang = language as 'ru' | 'en' | 'uz'
                    const country = countries.find(c => c.nameKey === activeTooltip)
                    return (
                      <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{country?.flag}</span>
                            <div>
                              <span className="font-bold text-lg block">
                                {countryNames[activeTooltip]?.[language] || countryNames[activeTooltip]?.['en']}
                              </span>
                              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                {data?.highlight?.[lang]}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setActiveTooltip(null)}
                            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center bg-white/10 rounded-xl p-3">
                            <div className="text-xl font-bold text-brand-green">{data?.population}</div>
                            <div className="text-xs text-white/60">
                              {language === 'ru' ? 'население' : language === 'uz' ? 'aholi' : 'population'}
                            </div>
                          </div>
                          <div className="text-center bg-white/10 rounded-xl p-3">
                            <div className="text-xl font-bold text-brand-lightTeal">{data?.foodDeliveryMarket}</div>
                            <div className="text-xs text-white/60">
                              {language === 'ru' ? 'рынок' : language === 'uz' ? 'bozor' : 'market'}
                            </div>
                          </div>
                          <div className="text-center bg-white/10 rounded-xl p-3">
                            <div className="text-xl font-bold text-emerald-400">{data?.growth}</div>
                            <div className="text-xs text-white/60">
                              {language === 'ru' ? 'рост/год' : language === 'uz' ? "o'sish/yil" : 'YoY growth'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-white/80 leading-relaxed">
                          {data?.potential?.[lang]}
                        </p>
                      </>
                    )
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Coverage Map */}
      <section className="container mx-auto max-w-5xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="relative group"
        >
          {/* Animated gradient border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-opacity duration-500" />
          
          {/* Main container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
            {/* Elegant header bar */}
            <div className="bg-gradient-to-r from-brand-darkBlue via-brand-blue to-brand-darkBlue px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">{t('about.coverageMap')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm">Live</span>
              </div>
            </div>
            
            {/* Map Container */}
            <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center" style={{ minHeight: '450px' }}>
              <iframe 
                src="https://datalens.yandex/eurdibfb0zyqz"
                className="w-full h-full absolute inset-0 border-0"
                style={{ minHeight: '450px' }}
                title="Delever Coverage Map"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ESG & Investors Section */}
      <section className="container mx-auto max-w-4xl mb-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          {/* ESG Card */}
          <Link to="/esg">
            <motion.div 
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white cursor-pointer"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">ESG & Sustainability</h3>
                <p className="text-white/80 text-sm mb-4">
                  {language === 'ru' 
                    ? 'Устойчивое развитие и социальная ответственность' 
                    : language === 'uz'
                    ? 'Barqaror rivojlanish va ijtimoiy mas\'uliyat'
                    : 'Sustainable development and social responsibility'}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  <span>{language === 'ru' ? 'Подробнее' : language === 'uz' ? 'Batafsil' : 'Learn more'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Investors Card */}
          <Link to="/investors">
            <motion.div 
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-brand-darkBlue to-blue-700 text-white cursor-pointer"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {language === 'ru' ? 'Инвесторам' : language === 'uz' ? 'Investorlar uchun' : 'For Investors'}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {language === 'ru' 
                    ? 'Возможности роста и инвестиционные материалы' 
                    : language === 'uz'
                    ? "O'sish imkoniyatlari va investitsiya materiallari"
                    : 'Growth opportunities and investment materials'}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  <span>{language === 'ru' ? 'Подробнее' : language === 'uz' ? 'Batafsil' : 'Learn more'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="container mx-auto max-w-3xl">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-brand-darkBlue mb-3">
            {t('about.office')}
          </h2>
          <p className="text-brand-darkBlue/70 mb-4">
            {t('footer.address')}
          </p>
          <motion.a 
            href="https://maps.app.goo.gl/1iobehkkfP83hAMj6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-darkBlue font-medium hover:underline"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin className="h-4 w-4" />
            {t('about.openMap')}
          </motion.a>
        </motion.div>
      </section>
    </div>
    </>
  )
}
