import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  TrendingUp,
  Quote,
  CheckCircle2,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/components/SEO'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg'
import { useLocale } from '@/i18n/LocaleContext'
import type { CaseStudy } from '@/data/case-studies'

interface Props {
  caseStudy: CaseStudy
}

export function CaseStudyPage({ caseStudy }: Props) {
  const { language } = useLocale()
  const lang = language as 'ru' | 'en' | 'uz'
  
  const title = caseStudy.title[lang] || caseStudy.title.ru
  const description = caseStudy.description[lang] || caseStudy.description.ru
  
  const texts = {
    ru: {
      challenge: 'Проблема',
      solution: 'Решение',
      results: 'Результаты',
      timeline: 'Хронология',
      products: 'Используемые продукты',
      back: 'Все кейсы',
      cta: 'Получить такие же результаты',
      before: 'До',
      after: 'После'
    },
    en: {
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      timeline: 'Timeline',
      products: 'Products Used',
      back: 'All Case Studies',
      cta: 'Get Similar Results',
      before: 'Before',
      after: 'After'
    },
    uz: {
      challenge: 'Muammo',
      solution: 'Yechim',
      results: 'Natijalar',
      timeline: 'Xronologiya',
      products: 'Foydalanilgan mahsulotlar',
      back: 'Barcha keyslar',
      cta: 'Shunga o\'xshash natijalarni oling',
      before: 'Oldin',
      after: 'Keyin'
    }
  }
  const t = texts[lang] || texts.ru

  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={`${caseStudy.company}, case study, delever, ${caseStudy.industry}`}
      />
      
      <ArticleSchema
        title={title}
        description={description}
        url={`/case-studies/${caseStudy.slug}`}
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Delever', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: caseStudy.company, url: `/case-studies/${caseStudy.slug}` }
        ]}
      />

      <div className="min-h-screen pt-28 pb-16">
        {/* Back Link */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link 
            to="/clients"
            className="inline-flex items-center text-brand-blue hover:text-brand-darkBlue transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Link>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <img 
                src={caseStudy.logo} 
                alt={caseStudy.company}
                className="h-16 w-auto object-contain"
              />
              <div>
                <div className="text-sm text-brand-darkBlue/50 uppercase tracking-wider">
                  {caseStudy.industry} • {caseStudy.city}, {caseStudy.country}
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-darkBlue/70 mb-8"
            >
              {caseStudy.tagline[lang] || caseStudy.tagline.ru}
            </motion.p>
          </div>
        </section>

        {/* Results Summary */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {caseStudy.results.map((result, idx) => (
                <div 
                  key={idx}
                  className="p-6 bg-gradient-to-br from-brand-blue to-brand-darkBlue rounded-2xl text-white text-center"
                >
                  <div className="text-4xl font-bold mb-2">{result.improvement}</div>
                  <div className="text-white/70 text-sm">{result.label[lang] || result.label.ru}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Challenge */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <span className="text-red-500">⚠️</span>
                </span>
                {t.challenge}
              </h2>
              <p className="text-lg text-brand-darkBlue/70 leading-relaxed">
                {caseStudy.challenge[lang] || caseStudy.challenge.ru}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </span>
                {t.solution}
              </h2>
              <p className="text-lg text-brand-darkBlue/70 leading-relaxed">
                {caseStudy.solution[lang] || caseStudy.solution.ru}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Detailed Results */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-lightBlue/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-brand-blue" />
                </span>
                {t.results}
              </h2>
              
              <div className="space-y-4">
                {caseStudy.results.map((result, idx) => (
                  <div 
                    key={idx}
                    className="p-6 bg-white rounded-2xl border border-brand-lightTeal/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-brand-darkBlue">
                        {result.label[lang] || result.label.ru}
                      </span>
                      <span className="text-2xl font-bold text-green-500">{result.improvement}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-center p-3 bg-brand-lightBeige/50 rounded-xl">
                        <div className="text-sm text-brand-darkBlue/50 mb-1">{t.before}</div>
                        <div className="text-xl font-bold text-brand-darkBlue">{result.before}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-brand-blue" />
                      <div className="flex-1 text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-sm text-green-600 mb-1">{t.after}</div>
                        <div className="text-xl font-bold text-green-600">{result.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote */}
        {caseStudy.quote && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-brand-lightBlue/20 to-brand-lightTeal/20 rounded-3xl"
              >
                <Quote className="h-10 w-10 text-brand-blue/30 mb-4" />
                <blockquote className="text-xl text-brand-darkBlue italic mb-6">
                  "{caseStudy.quote.text[lang] || caseStudy.quote.text.ru}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold">
                    {caseStudy.quote.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-brand-darkBlue">{caseStudy.quote.author}</div>
                    <div className="text-sm text-brand-darkBlue/60">
                      {caseStudy.quote.role[lang] || caseStudy.quote.role.ru}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Timeline */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-lightBlue/30 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-brand-blue" />
                </span>
                {t.timeline}
              </h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-lightTeal/50" />
                <div className="space-y-6">
                  {caseStudy.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 z-10">
                        <span className="text-white text-sm font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="text-sm text-brand-blue font-medium mb-1">{item.date}</div>
                        <div className="text-brand-darkBlue">
                          {item.event[lang] || item.event.ru}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-darkBlue text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-4">{t.cta}</h2>
              <p className="text-white/70 mb-6">
                {language === 'ru' 
                  ? 'Запустите доставку за 1 день с Delever' 
                  : 'Launch delivery in 1 day with Delever'
                }
              </p>
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-brand-darkBlue hover:bg-white/90">
                  {language === 'ru' ? 'Начать бесплатно' : 'Start Free'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
