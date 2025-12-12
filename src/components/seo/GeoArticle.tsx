import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  MapPin,
  Clock,
  Building2,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { trackEvents } from '@/components/Analytics'
import { knowledgeHubs } from '@/data/knowledge-hub'
import type { GeneratedGeoArticle } from '@/data/geo-articles'

interface Props {
  article: GeneratedGeoArticle
}

// Клиенты для social proof — полный список как на главной
const clientLogos = [
  { name: 'Yaponamama', logo: '/logos/Yaponamama.webp' },
  { name: 'Pizza Hut', logo: '/logos/pizza-hut-logo-png_seeklogo-257097.png' },
  { name: 'Hardees', logo: '/logos/hardees.jpg' },
  { name: 'Pinkberry', logo: '/logos/pinkberry.png' },
  { name: 'Dodo Pizza', logo: '/logos/dodo.png' },
  { name: 'ABR', logo: '/logos/abr.png' },
  { name: 'EVOS', logo: '/logos/evos.png' },
  { name: 'MAXWAY', logo: '/logos/maxway.png' },
]

export function GeoArticlePage({ article }: Props) {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { language } = useLocale()

  const lang = language as 'ru' | 'en' | 'uz'
  const title = article.title[lang] || article.title.ru
  const h1 = article.h1[lang] || article.h1.ru
  const description = article.description[lang] || article.description.ru
  const keywords = article.keywords[lang] || article.keywords.ru
  const intro = article.intro[lang] || article.intro.ru
  
  const cityName = article.city.name[lang] || article.city.name.ru
  const countryName = article.country.name[lang] || article.country.name.ru
  
  const hub = knowledgeHubs[article.template.hub as keyof typeof knowledgeHubs]
  const hubTitle = hub?.title[lang] || hub?.title.ru || article.template.hub

  const texts = {
    ru: {
      faq: 'Частые вопросы',
      trustedBy: 'Нам доверяют 500+ ресторанов',
      cityInfo: 'О городе',
      population: 'Население',
      restaurants: 'Ресторанов',
      relatedCities: 'Другие города',
      readTime: 'мин чтения'
    },
    en: {
      faq: 'FAQ',
      trustedBy: '500+ restaurants trust us',
      cityInfo: 'About the city',
      population: 'Population',
      restaurants: 'Restaurants',
      relatedCities: 'Other cities',
      readTime: 'min read'
    },
    uz: {
      faq: 'Ko\'p beriladigan savollar',
      trustedBy: '500+ restoran bizga ishonadi',
      cityInfo: 'Shahar haqida',
      population: 'Aholisi',
      restaurants: 'Restoranlar',
      relatedCities: 'Boshqa shaharlar',
      readTime: 'daqiqa o\'qish'
    }
  }
  const t = texts[lang] || texts.ru

  const handleCTAClick = () => {
    trackEvents.ctaClick(`geo_${article.slug.replace(/\//g, '_')}`)
    setContactFormOpen(true)
  }

  // Расчёт времени чтения
  const readTime = Math.max(3, Math.ceil(
    (intro.length + article.sections.reduce((sum, s) => sum + (s.content[lang] || s.content.ru).length, 0)) / 1000
  ))

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
      />

      <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-white to-gray-50">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-6 flex-wrap">
              <Link to="/" className="hover:text-brand-blue">Delever</Link>
              <span>/</span>
              <Link to="/guides" className="hover:text-brand-blue">Guides</Link>
              <span>/</span>
              <Link to={`/geo/${article.country.slug}`} className="hover:text-brand-blue">{countryName}</Link>
              <span>/</span>
              <span className="text-brand-darkBlue">{cityName}</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              {/* Location badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{article.country.flag}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${hub?.color || 'from-blue-500 to-blue-600'}`}>
                    {hub?.icon} {hubTitle}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-lightTeal/30 text-brand-darkBlue flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {cityName}
                  </span>
                </div>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 leading-tight"
              >
                {h1}
              </motion.h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-brand-darkBlue/60 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime} {t.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {article.city.population}
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {article.city.restaurantCount} {t.restaurants.toLowerCase()}
                </div>
              </div>

              {/* Intro */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-brand-darkBlue/80 leading-relaxed"
              >
                {intro}
              </motion.p>
            </header>

            {/* City Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 p-6 bg-gradient-to-br from-brand-lightBlue/20 to-brand-lightTeal/20 rounded-2xl border border-brand-lightTeal/30"
            >
              <h2 className="font-semibold text-brand-darkBlue mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-blue" />
                {t.cityInfo}: {cityName}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-brand-blue">{article.city.population}</div>
                  <div className="text-sm text-brand-darkBlue/60">{t.population}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-blue">{article.city.restaurantCount}</div>
                  <div className="text-sm text-brand-darkBlue/60">{t.restaurants}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-blue">{article.country.flag}</div>
                  <div className="text-sm text-brand-darkBlue/60">{countryName}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-blue">{article.country.currency.symbol}</div>
                  <div className="text-sm text-brand-darkBlue/60">{article.country.currency.code}</div>
                </div>
              </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-12 mb-16">
              {article.sections.map((section, idx) => (
                <motion.section 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-brand-darkBlue mb-4">
                    {section.title[lang] || section.title.ru}
                  </h2>
                  <div className="prose prose-lg max-w-none text-brand-darkBlue/80">
                    <p>{section.content[lang] || section.content.ru}</p>
                  </div>
                </motion.section>
              ))}
            </div>

            {/* CTA Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-darkBlue text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {article.cta.text[lang] || article.cta.text.ru}
                  </h3>
                  <p className="text-white/70">
                    {language === 'ru' 
                      ? `Запустите доставку в ${cityName} за 1 день с Delever` 
                      : language === 'en'
                      ? `Launch delivery in ${cityName} in 1 day with Delever`
                      : `Delever bilan ${cityName}da 1 kunda yetkazib berishni ishga tushiring`
                    }
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="bg-white text-brand-darkBlue hover:bg-white/90 flex-shrink-0"
                  onClick={handleCTAClick}
                >
                  {language === 'ru' ? 'Начать бесплатно' : language === 'en' ? 'Start Free' : 'Bepul boshlash'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-brand-darkBlue mb-8">{t.faq}</h2>
                <div className="space-y-4">
                  {article.faq.map((item, idx) => {
                    const question = item.q[lang] || item.q.ru
                    const answer = item.a[lang] || item.a.ru
                    const isExpanded = expandedFaq === idx

                    return (
                      <div
                        key={idx}
                        className="border border-brand-lightTeal/30 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-brand-lightBlue/10 transition-colors"
                        >
                          <span className="font-medium text-brand-darkBlue pr-4">{question}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-brand-darkBlue/60 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-brand-darkBlue/60 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="p-4 pt-0 bg-white">
                            <p className="text-brand-darkBlue/70">{answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Trusted By — как на главной */}
            <section className="mb-16 py-8 px-4 bg-gradient-to-b from-white to-brand-lightBeige/20 rounded-2xl">
              <motion.p 
                className="text-center text-sm text-brand-darkBlue/50 uppercase tracking-widest font-medium mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {language === 'ru' ? 'Миллионы доверяют им, а они доверяют нам' : 
                 language === 'en' ? 'Millions trust them, and they trust us' :
                 'Millionlar ularga ishonadi, ular esa bizga ishonadi'}
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 lg:gap-x-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {clientLogos.map((client, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-8 lg:h-10 w-auto max-w-[100px] lg:max-w-[120px] object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                      style={{ filter: 'grayscale(100%)' }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.filter = 'grayscale(0%)'
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.filter = 'grayscale(100%)'
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>

          </div>
        </article>
      </div>

      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        tag={`geo-${article.citySlug}`}
      />
    </>
  )
}
