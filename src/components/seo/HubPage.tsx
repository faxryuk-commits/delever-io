import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { KnowledgeArticle, getArticlesByHub } from '@/data/knowledge-hub'

interface HubData {
  slug: string
  icon: string
  title: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  color: string
}

interface HubPageProps {
  hub: HubData
}

export function HubPage({ hub }: HubPageProps) {
  const { language } = useLocale()
  const lang = language as 'ru' | 'en' | 'uz'
  
  const articles = getArticlesByHub(hub.slug)
  
  const texts = {
    ru: {
      articles: 'статей',
      readTime: 'мин чтения',
      backToGuides: 'Все гайды',
      noArticles: 'Статьи скоро появятся',
      relatedHubs: 'Другие категории'
    },
    en: {
      articles: 'articles',
      readTime: 'min read',
      backToGuides: 'All guides',
      noArticles: 'Articles coming soon',
      relatedHubs: 'Other categories'
    },
    uz: {
      articles: 'maqolalar',
      readTime: 'daqiqa o\'qish',
      backToGuides: 'Barcha qo\'llanmalar',
      noArticles: 'Maqolalar tez orada',
      relatedHubs: 'Boshqa kategoriyalar'
    }
  }
  const t = texts[lang] || texts.ru

  return (
    <>
      <SEO
        title={`${hub.title[lang] || hub.title.ru} — гайды для ресторанов`}
        description={hub.description[lang] || hub.description.ru}
        keywords={`${hub.title.ru}, ${hub.title.en}, гайды для ресторанов, delever`}
      />

      <div className="min-h-screen pt-28 pb-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/guides"
              className="inline-flex items-center text-brand-blue hover:text-brand-darkBlue transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToGuides}
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${hub.color} flex items-center justify-center text-4xl mb-6`}
            >
              {hub.icon}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-brand-darkBlue mb-4"
            >
              {hub.title[lang] || hub.title.ru}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-brand-darkBlue/60 mb-6"
            >
              {hub.description[lang] || hub.description.ru}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-brand-darkBlue/50"
            >
              <BookOpen className="h-5 w-5" />
              <span>{articles.length} {t.articles}</span>
            </motion.div>
          </div>
        </section>

        {/* Articles List */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {articles.length > 0 ? (
              <div className="space-y-6">
                {articles.map((article, idx) => (
                  <ArticleCard 
                    key={article.slug} 
                    article={article} 
                    lang={lang}
                    index={idx}
                    readTimeText={t.readTime}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-brand-lightBeige/30 rounded-2xl">
                <BookOpen className="h-12 w-12 text-brand-darkBlue/30 mx-auto mb-4" />
                <p className="text-brand-darkBlue/50">{t.noArticles}</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-darkBlue text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-4">
                {language === 'ru' ? 'Готовы начать?' : language === 'en' ? 'Ready to start?' : 'Boshlashga tayyormisiz?'}
              </h2>
              <p className="text-white/70 mb-6">
                {language === 'ru' 
                  ? 'Запустите доставку за 1 день с Delever' 
                  : language === 'en'
                  ? 'Launch delivery in 1 day with Delever'
                  : 'Delever bilan 1 kunda yetkazib berishni ishga tushiring'
                }
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-darkBlue rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                {language === 'ru' ? 'Начать бесплатно' : language === 'en' ? 'Start Free' : 'Bepul boshlash'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

// Article Card Component
function ArticleCard({ 
  article, 
  lang, 
  index,
  readTimeText
}: { 
  article: KnowledgeArticle
  lang: 'ru' | 'en' | 'uz'
  index: number
  readTimeText: string
}) {
  const readTime = Math.ceil(article.sections.length * 1.5 + 2)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/guides/${article.slug}`}
        className="block p-6 bg-white rounded-2xl border border-brand-lightTeal/30 hover:shadow-lg hover:border-brand-blue/30 transition-all group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-brand-darkBlue mb-2 group-hover:text-brand-blue transition-colors">
              {article.h1[lang] || article.h1.ru}
            </h3>
            
            <p className="text-brand-darkBlue/60 mb-4 line-clamp-2">
              {article.description[lang] || article.description.ru}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-brand-darkBlue/50">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} {readTimeText}
              </span>
              <span>
                {article.sections.length} {lang === 'ru' ? 'разделов' : 'sections'}
              </span>
            </div>
          </div>
          
          <ArrowRight className="h-6 w-6 text-brand-blue opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
        </div>
      </Link>
    </motion.div>
  )
}
