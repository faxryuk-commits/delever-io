import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg'
import { useLocale } from '@/i18n/LocaleContext'
import { getAllCaseStudies } from '@/data/case-studies'

export function CaseStudies() {
  const { language } = useLocale()
  const lang = language as 'ru' | 'en' | 'uz'
  
  const caseStudies = getAllCaseStudies()
  
  const texts = {
    ru: {
      title: 'Истории успеха',
      subtitle: 'Как рестораны растут с Delever',
      description: 'Реальные кейсы внедрения от ведущих ресторанных сетей. Цифры, результаты, сроки.',
      readMore: 'Читать кейс'
    },
    en: {
      title: 'Success Stories',
      subtitle: 'How Restaurants Grow with Delever',
      description: 'Real implementation cases from leading restaurant chains. Numbers, results, timelines.',
      readMore: 'Read Case Study'
    },
    uz: {
      title: 'Muvaffaqiyat tarixi',
      subtitle: 'Restoranlar Delever bilan qanday o\'sadi',
      description: 'Yetakchi restoran tarmoqlaridan haqiqiy joriy etish keyslari.',
      readMore: 'Keysni o\'qing'
    }
  }
  const t = texts[lang] || texts.ru

  return (
    <>
      <SEO 
        title={t.title}
        description={t.description}
        keywords="case study, success story, delever, restaurant, delivery"
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Delever', url: '/' },
          { name: 'Case Studies', url: '/case-studies' }
        ]}
      />

      <div className="min-h-screen pt-28 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-brand-darkBlue/70"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {caseStudies.map((cs, idx) => (
                <motion.div
                  key={cs.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={`/case-studies/${cs.slug}`}
                    className="block p-6 lg:p-8 bg-white rounded-3xl border border-brand-lightTeal/30 hover:border-brand-blue/30 transition-all hover:shadow-lg group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <img 
                          src={cs.logo}
                          alt={cs.company}
                          className="h-16 w-auto object-contain"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="text-sm text-brand-darkBlue/50 uppercase tracking-wider mb-2">
                          {cs.industry} • {cs.city}
                        </div>
                        <h2 className="text-xl font-bold text-brand-darkBlue mb-2 group-hover:text-brand-blue transition-colors">
                          {cs.title[lang] || cs.title.ru}
                        </h2>
                        <p className="text-brand-darkBlue/60 line-clamp-2">
                          {cs.description[lang] || cs.description.ru}
                        </p>
                      </div>
                      
                      {/* Key Metrics */}
                      <div className="flex gap-4 lg:gap-6">
                        {cs.results.slice(0, 2).map((result, i) => (
                          <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-green-500 flex items-center justify-center gap-1">
                              <TrendingUp className="h-5 w-5" />
                              {result.improvement}
                            </div>
                            <div className="text-xs text-brand-darkBlue/50">
                              {result.label[lang] || result.label.ru}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Arrow */}
                      <div className="lg:flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-brand-lightBlue/20 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                          <ArrowRight className="h-5 w-5 text-brand-blue group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
