import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Rocket, Award, Globe, Target, Leaf, TrendingUp, ArrowRight } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLocale()

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

  const countries = [
    { nameKey: 'uz', flag: '🇺🇿', status: 'main' },
    { nameKey: 'kz', flag: '🇰🇿', status: 'active' },
    { nameKey: 'kg', flag: '🇰🇬', status: 'active' },
    { nameKey: 'az', flag: '🇦🇿', status: 'active' },
    { nameKey: 'ge', flag: '🇬🇪', status: 'active' },
    { nameKey: 'cy', flag: '🇨🇾', status: 'active' },
    { nameKey: 'ae', flag: '🇦🇪', status: 'active' },
  ]

  const countryNames: Record<string, Record<string, string>> = {
    uz: { ru: 'Узбекистан', en: 'Uzbekistan' },
    kz: { ru: 'Казахстан', en: 'Kazakhstan' },
    kg: { ru: 'Кыргызстан', en: 'Kyrgyzstan' },
    az: { ru: 'Азербайджан', en: 'Azerbaijan' },
    ge: { ru: 'Грузия', en: 'Georgia' },
    cy: { ru: 'Кипр', en: 'Cyprus' },
    ae: { ru: 'ОАЭ', en: 'UAE' },
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
            {countries.map((country, idx) => (
              <motion.div 
                key={idx}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm ${
                  country.status === 'main' 
                    ? 'bg-gradient-to-r from-brand-darkBlue to-brand-blue text-white shadow-brand-blue/20' 
                    : 'bg-white border border-brand-lightTeal/40 text-brand-darkBlue hover:border-brand-blue/40'
                } transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="text-sm font-medium">
                  {countryNames[country.nameKey]?.[language] || countryNames[country.nameKey]?.['en']}
                </span>
              </motion.div>
            ))}
          </div>
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
            <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100" style={{ paddingBottom: '50%', minHeight: '380px' }}>
              <iframe 
                src="https://datalens.yandex/eurdibfb0zyqz"
                className="absolute inset-0 w-full h-full border-0"
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
                <h3 className="text-xl font-bold mb-2">ESG & Sustainability</h3>
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
                <h3 className="text-xl font-bold mb-2">
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
