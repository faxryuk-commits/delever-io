import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { getAllHubs, getArticlesByHub, allKnowledgeArticles } from '@/data/knowledge-hub'

export function GuidesHub() {
  const { language } = useLocale()
  const lang = language as 'ru' | 'en' | 'uz'
  const hubs = getAllHubs()

  const texts = {
    ru: {
      title: 'База знаний для владельцев ресторанов',
      subtitle: 'Гайды по открытию ресторана, запуску доставки, росту продаж',
      description: 'Экспертные статьи от Delever: как открыть ресторан, запустить доставку, увеличить продажи. Проверенные стратегии от 500+ клиентов.',
      articles: 'статей',
      viewAll: 'Все статьи'
    },
    en: {
      title: 'Knowledge Base for Restaurant Owners',
      subtitle: 'Guides on opening a restaurant, launching delivery, growing sales',
      description: 'Expert articles from Delever: how to open a restaurant, launch delivery, increase sales. Proven strategies from 500+ clients.',
      articles: 'articles',
      viewAll: 'All articles'
    },
    uz: {
      title: 'Restoran egalari uchun bilimlar bazasi',
      subtitle: 'Restoran ochish, yetkazib berishni ishga tushirish, sotuvni oshirish bo\'yicha qo\'llanmalar',
      description: 'Delever dan ekspert maqolalar: restoran qanday ochish, yetkazib berishni boshlash, sotuvni oshirish. 500+ mijozlardan tasdiqlangan strategiyalar.',
      articles: 'maqolalar',
      viewAll: 'Barcha maqolalar'
    }
  }
  const t = texts[lang] || texts.ru

  return (
    <>
      <SEO
        title={t.title}
        description={t.description}
        keywords={lang === 'ru' 
          ? 'как открыть ресторан, запустить доставку, увеличить продажи ресторана, гайды для ресторанов'
          : 'how to open restaurant, launch delivery, increase restaurant sales, restaurant guides'
        }
      />

      <div className="min-h-screen pt-28 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-darkBlue flex items-center justify-center"
            >
              <BookOpen className="h-10 w-10 text-white" />
            </motion.div>
            
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
              className="text-xl text-brand-darkBlue/60"
            >
              {t.subtitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-8 mt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue">{allKnowledgeArticles.length}</div>
                <div className="text-sm text-brand-darkBlue/60">{t.articles}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue">{hubs.length}</div>
                <div className="text-sm text-brand-darkBlue/60">{lang === 'ru' ? 'категорий' : 'categories'}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hubs Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hubs.map((hub, idx) => {
                const articles = getArticlesByHub(hub.slug)
                return (
                  <motion.div
                    key={hub.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={`/guides/${hub.slug}`}
                      className="block p-6 bg-white rounded-2xl border border-brand-lightTeal/30 hover:shadow-lg hover:border-brand-blue/30 transition-all group"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${hub.color} flex items-center justify-center text-2xl mb-4`}>
                        {hub.icon}
                      </div>
                      
                      <h2 className="text-xl font-bold text-brand-darkBlue mb-2 group-hover:text-brand-blue transition-colors">
                        {hub.title[lang] || hub.title.ru}
                      </h2>
                      
                      <p className="text-brand-darkBlue/60 text-sm mb-4">
                        {hub.description[lang] || hub.description.ru}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-darkBlue/50">
                          {articles.length} {t.articles}
                        </span>
                        <ArrowRight className="h-5 w-5 text-brand-blue opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
