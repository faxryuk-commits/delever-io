import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  Globe,
  Layers,
  Building2,
  CreditCard,
  Truck,
  Briefcase,
  MapPin,
  Home,
  Package,
  FileText
} from 'lucide-react'
import { SEO } from '@/components/SEO'
import { allSEOPages } from '@/data/seo-pages'

// Группируем страницы по категориям
const pageGroups = [
  {
    title: 'Основные страницы',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    pages: [
      { path: '/', title: 'Главная', priority: 'high' },
      { path: '/products', title: 'Продукты', priority: 'high' },
      { path: '/pricing', title: 'Тарифы и калькулятор', priority: 'high' },
      { path: '/clients', title: 'Клиенты', priority: 'high' },
      { path: '/integrations', title: 'Все интеграции', priority: 'high' },
      { path: '/aggregators', title: 'Агрегаторы', priority: 'high' },
      { path: '/about', title: 'О компании', priority: 'medium' },
      { path: '/partners', title: 'Партнёрам', priority: 'medium' },
      { path: '/investors', title: 'Инвесторам', priority: 'medium' },
      { path: '/esg', title: 'ESG', priority: 'low' },
      { path: '/white-label', title: 'White Label', priority: 'medium' },
    ]
  },
  {
    title: 'Продукты',
    icon: Package,
    color: 'from-purple-500 to-purple-600',
    pages: [
      { path: '/products/channels', title: 'Каналы продаж', priority: 'high' },
      { path: '/products/operations', title: 'Операции доставки', priority: 'high' },
      { path: '/products/analytics', title: 'Аналитика', priority: 'high' },
      { path: '/products/marketing', title: 'Маркетинг и CRM', priority: 'high' },
    ]
  },
  {
    title: 'Инструменты',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    pages: [
      { path: '/ai-marketing', title: 'AI Маркетинг', priority: 'medium' },
      { path: '/menu-doctor', title: 'Menu Doctor', priority: 'medium' },
    ]
  },
  {
    title: 'Case Studies',
    icon: Building2,
    color: 'from-emerald-500 to-emerald-600',
    pages: [
      { path: '/case-studies', title: '📊 Все кейсы', priority: 'high' },
      { path: '/case-studies/grand-lavash', title: '🌯 Grand Lavash: +45% выручка', priority: 'high' },
      { path: '/case-studies/yaponamama', title: '🍣 Yaponamama: +60% LTV', priority: 'high' },
      { path: '/case-studies/maxway', title: '🚀 MAXWAY: -35% время доставки', priority: 'high' },
      { path: '/case-studies/gippo', title: '🛒 Gippo: -92% ошибок', priority: 'high' },
      { path: '/case-studies/okadzaki', title: '🍣 Okadzaki: 0% ошибок скидок', priority: 'high' },
    ]
  },
  {
    title: 'Knowledge Hub (Гайды)',
    icon: Package,
    color: 'from-amber-500 to-amber-600',
    pages: [
      { path: '/guides', title: '📚 Все гайды', priority: 'high' },
      { path: '/guides/how-to-open-restaurant', title: '🏪 Как открыть ресторан', priority: 'high' },
      { path: '/guides/how-to-choose-location', title: '📍 Как выбрать локацию', priority: 'high' },
      { path: '/guides/how-to-launch-delivery', title: '🚀 Как запустить доставку', priority: 'high' },
      { path: '/guides/how-to-hire-couriers', title: '🚗 Как нанять курьеров', priority: 'medium' },
      { path: '/guides/how-to-increase-restaurant-sales', title: '📈 Как увеличить продажи', priority: 'high' },
      { path: '/guides/reduce-aggregator-commissions', title: '💰 Как снизить комиссию агрегаторов', priority: 'high' },
    ]
  },
  {
    title: 'GEO: Узбекистан',
    icon: MapPin,
    color: 'from-cyan-500 to-cyan-600',
    pages: [
      { path: '/geo/open-restaurant-in-tashkent', title: '🏪 Ташкент: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-tashkent', title: '🚀 Ташкент: Запустить доставку', priority: 'high' },
      { path: '/geo/dark-kitchen-in-tashkent', title: '🏭 Ташкент: Dark Kitchen', priority: 'high' },
      { path: '/geo/pizza-delivery-in-tashkent', title: '🍕 Ташкент: Доставка пиццы', priority: 'high' },
      { path: '/geo/sushi-delivery-in-tashkent', title: '🍣 Ташкент: Доставка суши', priority: 'high' },
      { path: '/geo/open-restaurant-in-samarkand', title: '🏪 Самарканд: Открыть ресторан', priority: 'medium' },
      { path: '/geo/open-restaurant-in-bukhara', title: '🏪 Бухара: Открыть ресторан', priority: 'medium' },
      { path: '/geo/open-restaurant-in-fergana', title: '🏪 Фергана: Открыть ресторан', priority: 'medium' },
      { path: '/geo/open-restaurant-in-namangan', title: '🏪 Наманган: Открыть ресторан', priority: 'medium' },
      { path: '/geo/open-restaurant-in-andijan', title: '🏪 Андижан: Открыть ресторан', priority: 'medium' },
    ]
  },
  {
    title: 'GEO: Казахстан',
    icon: MapPin,
    color: 'from-sky-500 to-sky-600',
    pages: [
      { path: '/geo/open-restaurant-in-almaty', title: '🏪 Алматы: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-almaty', title: '🚀 Алматы: Запустить доставку', priority: 'high' },
      { path: '/geo/dark-kitchen-in-almaty', title: '🏭 Алматы: Dark Kitchen', priority: 'high' },
      { path: '/geo/open-restaurant-in-astana', title: '🏪 Астана: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-astana', title: '🚀 Астана: Запустить доставку', priority: 'high' },
      { path: '/geo/open-restaurant-in-shymkent', title: '🏪 Шымкент: Открыть ресторан', priority: 'medium' },
      { path: '/geo/open-restaurant-in-karaganda', title: '🏪 Караганда: Открыть ресторан', priority: 'medium' },
    ]
  },
  {
    title: 'GEO: ОАЭ & GCC',
    icon: MapPin,
    color: 'from-yellow-500 to-orange-500',
    pages: [
      { path: '/geo/open-restaurant-in-dubai', title: '🏪 Дубай: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-dubai', title: '🚀 Дубай: Запустить доставку', priority: 'high' },
      { path: '/geo/dark-kitchen-in-dubai', title: '🏭 Дубай: Dark Kitchen', priority: 'high' },
      { path: '/geo/open-restaurant-in-abu-dhabi', title: '🏪 Абу-Даби: Открыть ресторан', priority: 'high' },
      { path: '/geo/open-restaurant-in-doha', title: '🏪 Доха: Открыть ресторан', priority: 'high' },
      { path: '/geo/dark-kitchen-in-doha', title: '🏭 Доха: Dark Kitchen', priority: 'high' },
    ]
  },
  {
    title: 'GEO: Кавказ & Центральная Азия',
    icon: MapPin,
    color: 'from-rose-500 to-rose-600',
    pages: [
      { path: '/geo/open-restaurant-in-baku', title: '🏪 Баку: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-baku', title: '🚀 Баку: Запустить доставку', priority: 'high' },
      { path: '/geo/open-restaurant-in-tbilisi', title: '🏪 Тбилиси: Открыть ресторан', priority: 'high' },
      { path: '/geo/launch-delivery-in-tbilisi', title: '🚀 Тбилиси: Запустить доставку', priority: 'high' },
      { path: '/geo/open-restaurant-in-bishkek', title: '🏪 Бишкек: Открыть ресторан', priority: 'high' },
      { path: '/geo/open-restaurant-in-dushanbe', title: '🏪 Душанбе: Открыть ресторан', priority: 'medium' },
    ]
  },
  {
    title: 'POS Интеграции',
    icon: Layers,
    color: 'from-orange-500 to-orange-600',
    pages: [
      { path: '/integrations/iiko', title: 'iiko', priority: 'high' },
      { path: '/integrations/rkeeper', title: 'R-Keeper', priority: 'high' },
      { path: '/integrations/poster', title: 'Poster', priority: 'high' },
      { path: '/integrations/jowi', title: 'Jowi', priority: 'medium' },
      { path: '/integrations/syrve', title: 'Syrve (iiko Cloud)', priority: 'medium' },
      { path: '/integrations/paloma', title: 'Paloma', priority: 'medium' },
      { path: '/integrations/clopos', title: 'Clopos', priority: 'medium' },
      { path: '/integrations/loook', title: 'LOOOK', priority: 'medium' },
      { path: '/integrations/alipos', title: 'AliPos', priority: 'medium' },
      { path: '/integrations/neon-alisa', title: 'Neon Alisa POS', priority: 'medium' },
      { path: '/integrations/yaros', title: 'Yaros', priority: 'medium' },
      { path: '/integrations/dodo-pizza', title: 'Dodo IS (Dodo Pizza)', priority: 'medium' },
    ]
  },
  {
    title: 'Агрегаторы',
    icon: Building2,
    color: 'from-yellow-500 to-yellow-600',
    pages: [
      { path: '/aggregators/glovo', title: 'Glovo', priority: 'high' },
      { path: '/aggregators/wolt', title: 'Wolt', priority: 'high' },
      { path: '/aggregators/yandex-eats', title: 'Яндекс Еда', priority: 'high' },
      { path: '/aggregators/uzum-tezkor', title: 'Uzum Tezkor', priority: 'high' },
      { path: '/aggregators/bolt-food', title: 'Bolt Food', priority: 'medium' },
      { path: '/aggregators/chocofood', title: 'Chocofood (Казахстан)', priority: 'medium' },
      { path: '/aggregators/foody', title: 'Foody', priority: 'medium' },
    ]
  },
  {
    title: 'Платежные системы',
    icon: CreditCard,
    color: 'from-cyan-500 to-cyan-600',
    pages: [
      { path: '/integrations/payme', title: 'Payme', priority: 'high' },
      { path: '/integrations/click', title: 'Click', priority: 'high' },
      { path: '/integrations/uzum-bank', title: 'Uzum Bank', priority: 'high' },
      { path: '/integrations/kaspi', title: 'Kaspi (Казахстан)', priority: 'high' },
      { path: '/integrations/epay', title: 'Epay', priority: 'medium' },
      { path: '/integrations/tiptop-pay', title: 'TipTop Pay', priority: 'medium' },
      { path: '/integrations/atmos', title: 'Atmos', priority: 'medium' },
      { path: '/integrations/anorbank', title: 'Anorbank', priority: 'medium' },
    ]
  },
  {
    title: 'Службы доставки',
    icon: Truck,
    color: 'from-rose-500 to-rose-600',
    pages: [
      { path: '/delivery/yandex-delivery', title: 'Яндекс Доставка', priority: 'high' },
      { path: '/delivery/wolt-drive', title: 'Wolt Drive', priority: 'medium' },
      { path: '/delivery/millennium', title: 'Taxi Millennium', priority: 'medium' },
      { path: '/delivery/noor', title: 'Noor', priority: 'medium' },
    ]
  },
  {
    title: 'Решения по типу бизнеса',
    icon: Briefcase,
    color: 'from-indigo-500 to-indigo-600',
    pages: [
      { path: '/solutions/pizzeria', title: 'Пиццерия', priority: 'high' },
      { path: '/solutions/sushi', title: 'Суши-бар', priority: 'high' },
      { path: '/solutions/burger', title: 'Бургерная', priority: 'high' },
      { path: '/solutions/cafe', title: 'Кафе', priority: 'medium' },
      { path: '/solutions/dark-kitchen', title: 'Dark Kitchen', priority: 'high' },
      { path: '/solutions/food-chain', title: 'Сеть ресторанов', priority: 'high' },
      { path: '/solutions/confectionery', title: 'Кондитерская', priority: 'medium' },
      { path: '/solutions/coffee-shop', title: 'Кофейня', priority: 'medium' },
      { path: '/solutions/grocery', title: 'Продуктовый магазин', priority: 'medium' },
    ]
  },
  {
    title: 'Страницы сравнения',
    icon: FileText,
    color: 'from-violet-500 to-violet-600',
    pages: [
      { path: '/compare/delever-vs-pos', title: 'Delever vs POS-системы', priority: 'high' },
      { path: '/compare/own-delivery-vs-aggregators', title: 'Своя доставка vs агрегаторы', priority: 'high' },
    ]
  },
  {
    title: 'Гео-страницы (Страны)',
    icon: Globe,
    color: 'from-emerald-500 to-emerald-600',
    pages: [
      { path: '/geo/uzbekistan', title: 'Узбекистан', priority: 'high' },
      { path: '/geo/kazakhstan', title: 'Казахстан', priority: 'high' },
    ]
  },
  {
    title: 'Гео-страницы (Города)',
    icon: MapPin,
    color: 'from-teal-500 to-teal-600',
    pages: [
      { path: '/geo/tashkent', title: 'Ташкент', priority: 'high' },
      { path: '/geo/samarkand', title: 'Самарканд', priority: 'medium' },
      { path: '/geo/bukhara', title: 'Бухара', priority: 'medium' },
      { path: '/geo/almaty', title: 'Алматы', priority: 'high' },
      { path: '/geo/astana', title: 'Астана', priority: 'high' },
    ]
  },
]

const baseUrl = 'https://delever.io'

export function SiteMap() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(pageGroups.map(g => g.title))

  const copyUrl = (path: string) => {
    const fullUrl = `${baseUrl}${path}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(path)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const totalPages = pageGroups.reduce((sum, g) => sum + g.pages.length, 0)
  const seoPages = allSEOPages.length

  return (
    <>
      <SEO 
        title="Карта сайта — все страницы Delever"
        description="Полная карта сайта Delever для SEO аудита"
      />

      <div className="min-h-screen pt-28 pb-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-brand-darkBlue mb-2">
                🗺️ Карта сайта для SEO
              </h1>
              <p className="text-brand-darkBlue/60">
                Все страницы для быстрого просмотра и аудита
              </p>
              
              {/* Stats */}
              <div className="flex gap-4 mt-4">
                <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl font-bold text-brand-blue">{totalPages}</span>
                  <span className="text-sm text-gray-500 ml-2">страниц</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl font-bold text-green-600">{seoPages}</span>
                  <span className="text-sm text-gray-500 ml-2">SEO страниц</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl font-bold text-purple-600">{pageGroups.length}</span>
                  <span className="text-sm text-gray-500 ml-2">категорий</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-medium text-brand-darkBlue mb-3">Быстрые действия</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setExpandedGroups(pageGroups.map(g => g.title))}
                  className="px-3 py-1.5 text-sm bg-brand-lightBlue/20 text-brand-darkBlue rounded-lg hover:bg-brand-lightBlue/40"
                >
                  Развернуть всё
                </button>
                <button
                  onClick={() => setExpandedGroups([])}
                  className="px-3 py-1.5 text-sm bg-brand-lightBlue/20 text-brand-darkBlue rounded-lg hover:bg-brand-lightBlue/40"
                >
                  Свернуть всё
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  sitemap.xml
                </a>
                <a
                  href="/robots.txt"
                  target="_blank"
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                >
                  robots.txt
                </a>
              </div>
            </div>

            {/* Page Groups */}
            <div className="space-y-4">
              {pageGroups.map((group, idx) => {
                const isExpanded = expandedGroups.includes(group.title)
                const Icon = group.icon

                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h2 className="font-semibold text-brand-darkBlue">{group.title}</h2>
                          <p className="text-sm text-gray-500">{group.pages.length} страниц</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {/* Pages List */}
                    {isExpanded && (
                      <div className="border-t border-gray-100">
                        {group.pages.map((page, pageIdx) => (
                          <div
                            key={page.path}
                            className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 ${
                              pageIdx !== group.pages.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-2 h-2 rounded-full ${
                                page.priority === 'high' ? 'bg-green-500' :
                                page.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                              }`} />
                              <div>
                                <Link 
                                  to={page.path}
                                  className="font-medium text-brand-darkBlue hover:text-brand-blue transition-colors"
                                >
                                  {page.title}
                                </Link>
                                <Link 
                                  to={page.path}
                                  className="block text-xs text-gray-400 font-mono hover:text-brand-blue transition-colors"
                                >
                                  {page.path}
                                </Link>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyUrl(page.path)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Копировать URL"
                              >
                                {copiedUrl === page.path ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                              <a
                                href={`${baseUrl}${page.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Открыть в новой вкладке"
                              >
                                <ExternalLink className="h-4 w-4 text-gray-400" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-medium text-brand-darkBlue mb-3">Приоритеты</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">Высокий</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-600">Средний</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-600">Низкий</span>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-medium text-green-800 mb-3">✅ Реализовано</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 312 SEO страниц в sitemap</li>
                <li>• 52 статьи в Knowledge Hub</li>
                <li>• 198 GEO страниц (33 города × 6 шаблонов)</li>
                <li>• Case Studies (EVOS, Yaponamama, Maxway)</li>
                <li>• Schema.org разметка (Article, FAQ, HowTo, LocalBusiness)</li>
                <li>• Многоуровневая sitemap структура</li>
              </ul>
            </div>
            
            {/* TODO Section */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-3">📋 В планах</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Добавить больше логотипов интеграций</li>
                <li>• Image sitemap для скриншотов продуктов</li>
                <li>• Hreflang для мультиязычности (RU/EN/UZ)</li>
                <li>• Ещё больше Case Studies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
