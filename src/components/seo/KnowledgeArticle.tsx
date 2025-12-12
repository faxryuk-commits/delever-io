import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  Clock,
  Share2,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { trackEvents } from '@/components/Analytics'
import { knowledgeHubs, type KnowledgeArticle as KnowledgeArticleType } from '@/data/knowledge-hub'

interface Props {
  article: KnowledgeArticleType
}

// Клиенты для social proof
const clientLogos = [
  { name: 'EVOS', logo: '/logos/evos.png' },
  { name: 'Yaponamama', logo: '/logos/Yaponamama.webp' },
  { name: 'MAXWAY', logo: '/logos/maxway.png' },
  { name: 'Pizza Hut', logo: '/logos/pizza-hut-logo-png_seeklogo-257097.png' },
  { name: 'Dodo Pizza', logo: '/logos/dodo.png' },
]

export function KnowledgeArticlePage({ article }: Props) {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { language } = useLocale()

  // Получаем локализованный контент
  const lang = language as 'ru' | 'en' | 'uz'
  const title = article.title[lang] || article.title.ru
  const h1 = article.h1[lang] || article.h1.ru
  const description = article.description[lang] || article.description.ru
  const keywords = article.keywords[lang] || article.keywords.ru
  const intro = article.intro[lang] || article.intro.ru
  
  const hub = knowledgeHubs[article.hub as keyof typeof knowledgeHubs]
  const hubTitle = hub?.title[lang] || hub?.title.ru || article.hub

  const texts = {
    ru: {
      readTime: 'мин чтения',
      tableOfContents: 'Содержание',
      faq: 'Частые вопросы',
      relatedArticles: 'Связанные статьи',
      relatedProducts: 'Продукты Delever',
      trustedBy: 'Нам доверяют 500+ ресторанов',
      share: 'Поделиться',
      backToHub: 'Все статьи'
    },
    en: {
      readTime: 'min read',
      tableOfContents: 'Table of Contents',
      faq: 'FAQ',
      relatedArticles: 'Related Articles',
      relatedProducts: 'Delever Products',
      trustedBy: '500+ restaurants trust us',
      share: 'Share',
      backToHub: 'All articles'
    },
    uz: {
      readTime: 'daqiqa o\'qish',
      tableOfContents: 'Mundarija',
      faq: 'Ko\'p beriladigan savollar',
      relatedArticles: 'Bog\'liq maqolalar',
      relatedProducts: 'Delever mahsulotlari',
      trustedBy: '500+ restoran bizga ishonadi',
      share: 'Ulashish',
      backToHub: 'Barcha maqolalar'
    }
  }
  const t = texts[lang] || texts.ru

  const handleCTAClick = () => {
    trackEvents.ctaClick(`knowledge_${article.slug.replace(/\//g, '_')}`)
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
            <nav className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-6">
              <Link to="/" className="hover:text-brand-blue">Delever</Link>
              <span>/</span>
              <Link to="/guides" className="hover:text-brand-blue">Guides</Link>
              <span>/</span>
              <Link to={`/guides/${article.hub}`} className="hover:text-brand-blue">{hubTitle}</Link>
              <span>/</span>
              <span className="text-brand-darkBlue truncate max-w-[200px]">{h1}</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              {/* Hub badge */}
              {hub && (
                <Link 
                  to={`/guides/${hub.slug}`}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${hub.color} mb-4`}
                >
                  <span>{hub.icon}</span>
                  {hubTitle}
                </Link>
              )}

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4 leading-tight"
              >
                {h1}
              </motion.h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-brand-darkBlue/60 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime} {t.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {article.sections.length} {language === 'ru' ? 'разделов' : 'sections'}
                </div>
                <button className="flex items-center gap-1 hover:text-brand-blue">
                  <Share2 className="h-4 w-4" />
                  {t.share}
                </button>
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

            {/* Table of Contents */}
            {article.sections.length > 2 && (
              <div className="mb-12 p-6 bg-brand-lightBlue/10 rounded-2xl border border-brand-lightTeal/20">
                <h2 className="font-semibold text-brand-darkBlue mb-4">{t.tableOfContents}</h2>
                <ul className="space-y-2">
                  {article.sections.map((section, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#section-${idx}`}
                        className="flex items-center gap-2 text-brand-darkBlue/70 hover:text-brand-blue transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                        {section.title[lang] || section.title.ru}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-12 mb-16">
              {article.sections.map((section, idx) => (
                <motion.section 
                  key={idx}
                  id={`section-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24"
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
                      ? 'Запустите доставку за 1 день с Delever' 
                      : language === 'en'
                      ? 'Launch delivery in 1 day with Delever'
                      : 'Delever bilan 1 kunda yetkazib berishni ishga tushiring'
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

            {/* Trusted By */}
            <section className="mb-16 text-center">
              <p className="text-sm text-brand-darkBlue/50 uppercase tracking-widest font-medium mb-6">
                {t.trustedBy}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                {clientLogos.map((client, idx) => (
                  <img
                    key={idx}
                    src={client.logo}
                    alt={client.name}
                    className="h-8 w-auto object-contain opacity-40 grayscale"
                  />
                ))}
              </div>
            </section>

            {/* Related Articles */}
            {article.relatedArticles.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold text-brand-darkBlue mb-6">{t.relatedArticles}</h2>
                <div className="flex flex-wrap gap-3">
                  {article.relatedArticles.map((slug, idx) => (
                    <Link
                      key={idx}
                      to={`/${slug}`}
                      className="px-4 py-2 bg-brand-lightBlue/20 text-brand-darkBlue rounded-full hover:bg-brand-lightBlue/40 transition-colors text-sm"
                    >
                      {slug.split('/').pop()?.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Products */}
            {article.relatedProducts.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-brand-darkBlue mb-6">{t.relatedProducts}</h2>
                <div className="flex flex-wrap gap-3">
                  {article.relatedProducts.map((slug, idx) => (
                    <Link
                      key={idx}
                      to={`/${slug}`}
                      className="px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full hover:bg-brand-blue/20 transition-colors text-sm font-medium"
                    >
                      {slug.split('/').pop()?.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </article>
      </div>

      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        tag={`knowledge-${article.slug.replace(/\//g, '-')}`}
      />
    </>
  )
}
