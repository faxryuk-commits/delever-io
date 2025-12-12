import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import { trackEvents } from '@/components/Analytics'
import {
  ArrowRight,
  Building2,
  MapPin,
  Star,
  Filter,
  TrendingUp
} from 'lucide-react'
import {
  allClients,
  featuredClients,
  clientStats,
  categoryNames,
  type Client
} from '@/data/clients'

type CategoryFilter = Client['category'] | 'all'

export function Clients() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')
  const { language } = useLocale()

  const texts = {
    ru: {
      title: 'Наши клиенты',
      subtitle: '500+ ресторанов доверяют Delever',
      description: 'От локальных кафе до крупнейших сетей — мы помогаем бизнесу расти',
      stats: {
        clients: 'клиентов',
        locations: 'точек',
        countries: 'страны',
        orders: 'заказов в день'
      },
      categories: 'Категории',
      all: 'Все',
      featured: 'Топ клиенты',
      viewAll: 'Все клиенты',
      locations: 'точек',
      cta: 'Присоединиться к ним',
      ctaDesc: 'Запустите доставку за 1 день и присоединитесь к 500+ успешным ресторанам'
    },
    en: {
      title: 'Our Clients',
      subtitle: '500+ restaurants trust Delever',
      description: 'From local cafes to major chains — we help businesses grow',
      stats: {
        clients: 'clients',
        locations: 'locations',
        countries: 'countries',
        orders: 'orders per day'
      },
      categories: 'Categories',
      all: 'All',
      featured: 'Featured Clients',
      viewAll: 'All Clients',
      locations: 'locations',
      cta: 'Join Them',
      ctaDesc: 'Launch delivery in 1 day and join 500+ successful restaurants'
    },
    uz: {
      title: 'Bizning mijozlar',
      subtitle: '500+ restoran Delever ga ishonadi',
      description: 'Mahalliy kafelerdan yirik tarmoqlargacha — biz biznesga o\'sishga yordam beramiz',
      stats: {
        clients: 'mijozlar',
        locations: 'nuqtalar',
        countries: 'mamlakatlar',
        orders: 'kunlik buyurtmalar'
      },
      categories: 'Kategoriyalar',
      all: 'Hammasi',
      featured: 'Top mijozlar',
      viewAll: 'Barcha mijozlar',
      locations: 'nuqtalar',
      cta: 'Ularga qo\'shiling',
      ctaDesc: '1 kunda yetkazib berishni ishga tushiring va 500+ muvaffaqiyatli restoranlarga qo\'shiling'
    }
  }
  const t = texts[language as keyof typeof texts] || texts.ru
  const catNames = categoryNames[language as keyof typeof categoryNames] || categoryNames.ru

  const filters: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'pizza', label: catNames.pizza },
    { key: 'burger', label: catNames.burger },
    { key: 'sushi', label: catNames.sushi },
    { key: 'lavash', label: catNames.lavash },
    { key: 'chicken', label: catNames.chicken },
    { key: 'national', label: catNames.national },
    { key: 'cafe', label: catNames.cafe },
    { key: 'dessert', label: catNames.dessert },
  ]

  const filteredClients = activeFilter === 'all' 
    ? allClients 
    : allClients.filter(c => c.category === activeFilter)

  const handleCTAClick = () => {
    trackEvents.ctaClick('clients_page_cta')
    setContactFormOpen(true)
  }

  return (
    <>
      <SEO
        title={language === 'en' ? 'Clients — 500+ Restaurants Trust Delever' : 'Клиенты — 500+ ресторанов доверяют Delever'}
        description={language === 'en'
          ? 'EVOS, Yaponamama, Maxway, Dodo Pizza, Pizza Hut and 500+ restaurants use Delever for delivery management.'
          : 'EVOS, Yaponamama, Maxway, Dodo Pizza, Pizza Hut и 500+ ресторанов используют Delever для управления доставкой.'
        }
        keywords={language === 'en'
          ? 'Delever clients, restaurant delivery, EVOS, Yaponamama, Maxway, Dodo Pizza'
          : 'клиенты Delever, доставка ресторанов, EVOS, Yaponamama, Maxway, Dodo Pizza'
        }
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
              className="text-xl text-brand-blue font-medium mb-4"
            >
              {t.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brand-darkBlue/60"
            >
              {t.description}
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '500+', label: t.stats.clients, icon: Building2 },
                { value: `${clientStats.totalLocations}+`, label: t.stats.locations, icon: MapPin },
                { value: '3', label: t.stats.countries, icon: Star },
                { value: '50K+', label: t.stats.orders, icon: ArrowRight },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl border border-brand-lightTeal/30 shadow-sm"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-brand-blue" />
                  <div className="text-3xl font-bold text-brand-darkBlue mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-darkBlue/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Clients */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              {t.featured}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredClients.map((client, idx) => (
                <motion.div
                  key={client.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-gradient-to-br from-brand-lightBlue/20 to-white rounded-2xl border border-brand-lightTeal/30 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl font-bold text-brand-darkBlue mb-2">{client.name}</div>
                  {client.locations && (
                    <div className="text-sm text-brand-blue">
                      {client.locations}+ {t.locations}
                    </div>
                  )}
                  {client.caseStudy && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Case Study
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & All Clients */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Filter className="w-5 h-5 text-brand-darkBlue/60" />
              <h2 className="text-xl font-bold text-brand-darkBlue">{t.categories}</h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? 'bg-brand-blue text-white'
                      : 'bg-brand-lightBlue/20 text-brand-darkBlue hover:bg-brand-lightBlue/40'
                  }`}
                >
                  {filter.label}
                  {filter.key !== 'all' && (
                    <span className="ml-1 opacity-60">
                      ({clientStats.categories[filter.key as keyof typeof clientStats.categories] || 0})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Clients grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredClients.map((client, idx) => (
                <motion.div
                  key={client.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                  className="p-4 bg-white rounded-xl border border-brand-lightTeal/20 hover:border-brand-blue/30 hover:shadow-md transition-all text-center"
                >
                  <div className="font-medium text-brand-darkBlue text-sm truncate">{client.name}</div>
                  {client.locations && (
                    <div className="text-xs text-brand-darkBlue/50 mt-1">
                      {client.locations}+ {t.locations}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-brand-darkBlue/50 mt-6">
              {language === 'en' 
                ? `Showing ${filteredClients.length} of ${allClients.length} clients`
                : `Показано ${filteredClients.length} из ${allClients.length} клиентов`
              }
            </p>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              {language === 'en' ? 'Success Stories' : 'Истории успеха'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  company: 'EVOS', 
                  metric: '+45%', 
                  label: language === 'ru' ? 'выручка' : 'revenue',
                  slug: 'evos'
                },
                { 
                  company: 'Yaponamama', 
                  metric: '+60%', 
                  label: language === 'ru' ? 'повторные заказы' : 'repeat orders',
                  slug: 'yaponamama'
                },
                { 
                  company: 'MAXWAY', 
                  metric: '-35%', 
                  label: language === 'ru' ? 'время доставки' : 'delivery time',
                  slug: 'maxway'
                }
              ].map((cs, idx) => (
                <Link 
                  key={cs.slug}
                  to={`/case-studies/${cs.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-gradient-to-br from-brand-lightBlue/20 to-white rounded-2xl border border-brand-lightTeal/30 hover:border-brand-blue/50 hover:shadow-lg transition-all group"
                  >
                    <div className="text-xl font-bold text-brand-darkBlue mb-2">{cs.company}</div>
                    <div className="text-3xl font-bold text-green-500 mb-1">{cs.metric}</div>
                    <div className="text-sm text-brand-darkBlue/60 mb-4">{cs.label}</div>
                    <span className="inline-flex items-center text-brand-blue text-sm group-hover:underline">
                      {language === 'ru' ? 'Читать кейс' : 'Read case'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-darkBlue text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">{t.cta}</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <Button
                size="lg"
                className="bg-white text-brand-darkBlue hover:bg-white/90"
                onClick={handleCTAClick}
              >
                {language === 'en' ? 'Start Free' : 'Начать бесплатно'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        tag="clients-page"
      />
    </>
  )
}
