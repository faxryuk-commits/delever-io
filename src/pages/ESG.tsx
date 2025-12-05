import { motion } from 'framer-motion'
import { 
  Leaf, 
  Users, 
  Shield, 
  Route, 
  Bike,
  FileText,
  TrendingDown,
  Cloud,
  Briefcase,
  Heart,
  Store,
  Utensils,
  GraduationCap,
  Eye,
  Lock,
  CheckCircle,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { SEO } from '@/components/SEO'
import { Link } from 'react-router-dom'

// Environmental items
const environmentalItems = [
  {
    icon: Route,
    titleKey: 'esg.e.route.title',
    descKey: 'esg.e.route.desc',
    stats: ['-25%', '-18%'],
    statsLabels: ['esg.e.route.stat1', 'esg.e.route.stat2']
  },
  {
    icon: Bike,
    titleKey: 'esg.e.ebike.title',
    descKey: 'esg.e.ebike.desc',
  },
  {
    icon: FileText,
    titleKey: 'esg.e.digital.title',
    descKey: 'esg.e.digital.desc',
  },
  {
    icon: TrendingDown,
    titleKey: 'esg.e.forecast.title',
    descKey: 'esg.e.forecast.desc',
    stats: ['-20%'],
    statsLabels: ['esg.e.forecast.stat1']
  },
  {
    icon: Cloud,
    titleKey: 'esg.e.cloud.title',
    descKey: 'esg.e.cloud.desc',
  },
]

// Social items
const socialItems = [
  {
    icon: Briefcase,
    titleKey: 'esg.s.jobs.title',
    descKey: 'esg.s.jobs.desc',
  },
  {
    icon: Heart,
    titleKey: 'esg.s.couriers.title',
    descKey: 'esg.s.couriers.desc',
  },
  {
    icon: Store,
    titleKey: 'esg.s.smallbiz.title',
    descKey: 'esg.s.smallbiz.desc',
  },
  {
    icon: Utensils,
    titleKey: 'esg.s.quality.title',
    descKey: 'esg.s.quality.desc',
  },
  {
    icon: GraduationCap,
    titleKey: 'esg.s.education.title',
    descKey: 'esg.s.education.desc',
  },
]

// Governance items
const governanceItems = [
  {
    icon: Eye,
    titleKey: 'esg.g.transparency.title',
    descKey: 'esg.g.transparency.desc',
  },
  {
    icon: Shield,
    titleKey: 'esg.g.corruption.title',
    descKey: 'esg.g.corruption.desc',
  },
  {
    icon: Lock,
    titleKey: 'esg.g.privacy.title',
    descKey: 'esg.g.privacy.desc',
  },
  {
    icon: CheckCircle,
    titleKey: 'esg.g.standards.title',
    descKey: 'esg.g.standards.desc',
  },
  {
    icon: Globe,
    titleKey: 'esg.g.government.title',
    descKey: 'esg.g.government.desc',
    badges: ['UAE Digital Economy', 'KSA Vision 2030', 'Uzbekistan Digital', 'Kazakhstan Digital Silk Road']
  },
]

const commitments = [
  'esg.commitment.1',
  'esg.commitment.2',
  'esg.commitment.3',
  'esg.commitment.4',
  'esg.commitment.5',
]

export function ESG() {
  const { t, language } = useLocale()

  return (
    <div className="min-h-screen">
      <SEO 
        title={language === 'en' ? 'ESG & Sustainability' : 'ESG и Устойчивое развитие'}
        description={language === 'en' 
          ? 'Delever reduces environmental impact of last-mile logistics, improves working conditions, and creates transparent ecosystems'
          : 'Delever снижает экологическое воздействие доставки, улучшает условия труда и создаёт прозрачные экосистемы'
        }
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/40 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Leaf className="h-4 w-4" />
              ESG & Sustainability
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-darkBlue mb-6 leading-tight">
              {t('esg.hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-brand-darkBlue/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              {t('esg.hero.subtitle')}
            </p>

            {/* ESG Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div 
                className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-emerald-500/30"
                whileHover={{ scale: 1.05 }}
              >
                <Leaf className="h-4 w-4" />
                Environmental
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/30"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="h-4 w-4" />
                Social
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-amber-600/30"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-4 w-4" />
                Governance
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-6 shadow-lg shadow-emerald-500/30">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div className="text-emerald-600 font-bold text-lg mb-2">E — Environmental Impact</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('esg.e.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60">
              {t('esg.e.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {environmentalItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="h-full bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all hover:border-emerald-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-brand-darkBlue mb-2">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60 mb-4">
                      {t(item.descKey)}
                    </p>
                    {item.stats && (
                      <div className="flex gap-3">
                        {item.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="bg-emerald-50 px-3 py-1.5 rounded-lg">
                            <div className="text-lg font-bold text-emerald-600">{stat}</div>
                            <div className="text-xs text-emerald-600/70">{t(item.statsLabels![sIdx])}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-blue-600 font-bold text-lg mb-2">S — Social Value</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('esg.s.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60">
              {t('esg.s.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {socialItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="h-full bg-white rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all hover:border-blue-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-brand-darkBlue mb-2">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60">
                      {t(item.descKey)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-amber-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-2xl mb-6 shadow-lg shadow-amber-600/30">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="text-amber-700 font-bold text-lg mb-2">G — Governance & Transparency</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
              {t('esg.g.title')}
            </h2>
            <p className="text-lg text-brand-darkBlue/60">
              {t('esg.g.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {governanceItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="h-full bg-white rounded-2xl p-6 border border-amber-100 shadow-lg hover:shadow-xl transition-all hover:border-amber-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-brand-darkBlue mb-2">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-brand-darkBlue/60 mb-3">
                      {t(item.descKey)}
                    </p>
                    {item.badges && (
                      <div className="flex flex-wrap gap-2">
                        {item.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* UN SDG Goals Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                🌍 United Nations
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-bold text-brand-darkBlue mb-4">
                {language === 'ru' ? 'Цели устойчивого развития ООН' : 
                 language === 'uz' ? "BMT Barqaror rivojlanish maqsadlari" : 
                 'UN Sustainable Development Goals'}
              </h2>
              <p className="text-brand-darkBlue/60 max-w-2xl mx-auto">
                {language === 'ru' ? 'Delever вносит вклад в достижение следующих глобальных целей' : 
                 language === 'uz' ? "Delever quyidagi global maqsadlarga erishishga hissa qo'shadi" : 
                 'Delever contributes to achieving the following global goals'}
              </p>
            </div>

            {/* Official UN SDG Style Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                { 
                  number: 8, 
                  title: 'DECENT WORK AND', 
                  subtitle: 'ECONOMIC GROWTH', 
                  color: '#A21942',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <path fill="white" d="M10 45 L20 25 L30 35 L40 15 L50 25 M45 15 L50 15 L50 20"/>
                    </svg>
                  )
                },
                { 
                  number: 9, 
                  title: 'INDUSTRY, INNOVATION', 
                  subtitle: 'AND INFRASTRUCTURE', 
                  color: '#FD6925',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <path fill="white" d="M15 45 L15 30 L25 30 L25 35 L35 35 L35 25 L45 25 L45 45 M20 20 L30 10 L40 20 L30 15 Z"/>
                    </svg>
                  )
                },
                { 
                  number: 11, 
                  title: 'SUSTAINABLE CITIES', 
                  subtitle: 'AND COMMUNITIES', 
                  color: '#FD9D24',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <path fill="white" d="M10 50 L10 30 L20 30 L20 50 M22 50 L22 20 L32 20 L32 50 M34 50 L34 35 L44 35 L44 50 M46 50 L46 25 L50 22 L50 50"/>
                    </svg>
                  )
                },
                { 
                  number: 12, 
                  title: 'RESPONSIBLE', 
                  subtitle: 'CONSUMPTION AND PRODUCTION', 
                  color: '#BF8B2E',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <path fill="none" stroke="white" strokeWidth="3" d="M30 10 A20 20 0 1 1 10 30 M10 30 L5 25 M10 30 L15 25"/>
                    </svg>
                  )
                },
                { 
                  number: 13, 
                  title: 'CLIMATE', 
                  subtitle: 'ACTION', 
                  color: '#3F7E44',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <circle cx="30" cy="30" r="18" fill="none" stroke="white" strokeWidth="3"/>
                      <circle cx="30" cy="30" r="6" fill="white"/>
                      <path fill="white" d="M30 8 L32 16 L28 16 Z M30 52 L28 44 L32 44 Z"/>
                    </svg>
                  )
                },
                { 
                  number: 16, 
                  title: 'PEACE, JUSTICE', 
                  subtitle: 'AND STRONG INSTITUTIONS', 
                  color: '#00689D',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <circle cx="30" cy="22" r="8" fill="white"/>
                      <path fill="white" d="M20 35 L30 30 L40 35 L40 50 L20 50 Z"/>
                      <path fill="white" d="M26 40 L34 40 L30 48 Z"/>
                    </svg>
                  )
                },
                { 
                  number: 17, 
                  title: 'PARTNERSHIPS', 
                  subtitle: 'FOR THE GOALS', 
                  color: '#19486A',
                  icon: (
                    <svg viewBox="0 0 60 60" className="w-10 h-10 lg:w-14 lg:h-14">
                      <circle cx="30" cy="30" r="12" fill="none" stroke="white" strokeWidth="2"/>
                      <circle cx="30" cy="18" r="4" fill="white"/>
                      <circle cx="42" cy="30" r="4" fill="white"/>
                      <circle cx="30" cy="42" r="4" fill="white"/>
                      <circle cx="18" cy="30" r="4" fill="white"/>
                      <circle cx="38" cy="22" r="3" fill="white"/>
                      <circle cx="38" cy="38" r="3" fill="white"/>
                      <circle cx="22" cy="38" r="3" fill="white"/>
                      <circle cx="22" cy="22" r="3" fill="white"/>
                    </svg>
                  )
                },
              ].map((sdg, idx) => (
                <motion.a
                  key={sdg.number}
                  href={`https://sdgs.un.org/goals/goal${sdg.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundColor: sdg.color }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  {/* Number and Title */}
                  <div className="absolute top-2 left-2 right-2 lg:top-3 lg:left-3 lg:right-3">
                    <div className="flex items-start gap-1.5 lg:gap-2">
                      <span className="text-2xl lg:text-4xl font-bold text-white leading-none">{sdg.number}</span>
                      <div className="flex-1">
                        <div className="text-[8px] lg:text-[10px] font-bold text-white leading-tight uppercase tracking-wide">
                          {sdg.title}
                        </div>
                        <div className="text-[7px] lg:text-[9px] font-bold text-white leading-tight uppercase tracking-wide">
                          {sdg.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 lg:bottom-3 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {sdg.icon}
                  </div>
                </motion.a>
              ))}

              {/* UN SDG Logo Card */}
              <motion.a
                href="https://sdgs.un.org/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-square bg-white border-2 border-gray-200 flex flex-col items-center justify-center p-4 hover:border-blue-400 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="mb-2">
                    <svg viewBox="0 0 100 100" className="w-12 h-12 lg:w-16 lg:h-16 mx-auto">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#00689D" strokeWidth="2"/>
                      <circle cx="50" cy="30" r="5" fill="#E5243B"/>
                      <circle cx="65" cy="38" r="5" fill="#DDA63A"/>
                      <circle cx="70" cy="55" r="5" fill="#4C9F38"/>
                      <circle cx="60" cy="70" r="5" fill="#C5192D"/>
                      <circle cx="40" cy="70" r="5" fill="#FF3A21"/>
                      <circle cx="30" cy="55" r="5" fill="#26BDE2"/>
                      <circle cx="35" cy="38" r="5" fill="#FCC30B"/>
                      <circle cx="50" cy="50" r="8" fill="#19486A"/>
                    </svg>
                  </div>
                  <div className="text-[10px] lg:text-xs font-bold text-gray-800 uppercase tracking-wide leading-tight">
                    Sustainable<br/>Development<br/>Goals
                  </div>
                  <div className="text-[9px] lg:text-[10px] text-blue-600 mt-2 group-hover:underline">
                    {language === 'ru' ? 'Все цели →' : language === 'uz' ? "Barcha maqsadlar →" : 'See all →'}
                  </div>
                </div>
              </motion.a>
            </div>

            <motion.p 
              className="text-center text-sm text-brand-darkBlue/50 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {language === 'ru' ? 'Официальные цели ООН • ' : 
               language === 'uz' ? "BMT rasmiy maqsadlari • " : 
               'Official UN Goals • '}
              <a 
                href="https://sdgs.un.org/goals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                sdgs.un.org
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 lg:py-28 bg-brand-darkBlue relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              Our Commitment
            </motion.div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('esg.commitment.title')}
            </h2>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {t('esg.commitment.subtitle')}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              {commitments.map((commitment, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 text-left border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/90 text-sm">{t(commitment)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-brand-darkBlue to-brand-darkBlue/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
              {t('esg.cta.title')}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact">
                <motion.button 
                  className="flex items-center gap-2 bg-white text-brand-darkBlue px-6 py-3 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('esg.cta.contact')}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              
              <a href="https://delever.gitbook.io/delever" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('esg.cta.docs')}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </a>
              
              <Link to="/partners">
                <motion.button 
                  className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('esg.cta.partners')}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

