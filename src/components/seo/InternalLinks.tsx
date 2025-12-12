/**
 * Компонент внутренней перелинковки для SEO
 * Показывает релевантные ссылки в конце статей
 */
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Map, Package, Users } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

interface LinkItem {
  title: string
  url: string
  type: 'guide' | 'product' | 'geo' | 'case'
}

interface Props {
  currentUrl?: string
}

export function InternalLinks({ currentUrl }: Props) {
  const { language } = useLocale()
  
  const texts = {
    ru: {
      title: 'Читайте также',
      guides: 'Гайды',
      products: 'Продукты',
      cases: 'Кейсы',
      geo: 'Решения по городам'
    },
    en: {
      title: 'Related Articles',
      guides: 'Guides',
      products: 'Products',
      cases: 'Case Studies',
      geo: 'City Solutions'
    },
    uz: {
      title: 'Shuningdek o\'qing',
      guides: 'Qo\'llanmalar',
      products: 'Mahsulotlar',
      cases: 'Keyslar',
      geo: 'Shahar yechimlari'
    }
  }
  const t = texts[language as 'ru' | 'en' | 'uz'] || texts.ru

  const guides: LinkItem[] = [
    { title: language === 'ru' ? 'Как открыть ресторан' : 'How to Open a Restaurant', url: '/guides/how-to-open-restaurant', type: 'guide' },
    { title: language === 'ru' ? 'Запуск доставки' : 'Launch Delivery', url: '/guides/how-to-launch-delivery', type: 'guide' },
    { title: language === 'ru' ? 'Рост продаж' : 'Grow Sales', url: '/guides/how-to-increase-restaurant-sales', type: 'guide' },
    { title: language === 'ru' ? 'Программа лояльности' : 'Loyalty Program', url: '/guides/loyalty-program-restaurant', type: 'guide' },
    { title: language === 'ru' ? 'Telegram-бот' : 'Telegram Bot', url: '/guides/telegram-bot-restaurant', type: 'guide' },
  ]

  const products: LinkItem[] = [
    { title: language === 'ru' ? 'Каналы продаж' : 'Sales Channels', url: '/products/channels', type: 'product' },
    { title: language === 'ru' ? 'Операции' : 'Operations', url: '/products/operations', type: 'product' },
    { title: language === 'ru' ? 'Аналитика' : 'Analytics', url: '/products/analytics', type: 'product' },
    { title: language === 'ru' ? 'Маркетинг' : 'Marketing', url: '/products/marketing', type: 'product' },
  ]

  const cases: LinkItem[] = [
    { title: 'EVOS', url: '/case-studies/evos', type: 'case' },
    { title: 'Yaponamama', url: '/case-studies/yaponamama', type: 'case' },
    { title: 'MAXWAY', url: '/case-studies/maxway', type: 'case' },
  ]

  const geoLinks: LinkItem[] = [
    { title: language === 'ru' ? 'Доставка в Ташкенте' : 'Delivery in Tashkent', url: '/geo/launch-delivery-in-tashkent', type: 'geo' },
    { title: language === 'ru' ? 'Доставка в Алматы' : 'Delivery in Almaty', url: '/geo/launch-delivery-in-almaty', type: 'geo' },
    { title: language === 'ru' ? 'Доставка в Дубае' : 'Delivery in Dubai', url: '/geo/launch-delivery-in-dubai', type: 'geo' },
  ]

  // Фильтруем текущую страницу
  const filterLinks = (links: LinkItem[]) => 
    currentUrl ? links.filter(l => l.url !== currentUrl) : links

  const getIcon = (type: LinkItem['type']) => {
    switch (type) {
      case 'guide': return <FileText className="h-4 w-4" />
      case 'product': return <Package className="h-4 w-4" />
      case 'case': return <Users className="h-4 w-4" />
      case 'geo': return <Map className="h-4 w-4" />
    }
  }

  return (
    <section className="py-12 border-t border-brand-lightTeal/30">
      <h3 className="text-xl font-bold text-brand-darkBlue mb-6">{t.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Гайды */}
        <div>
          <h4 className="text-sm font-semibold text-brand-darkBlue/60 uppercase tracking-wider mb-3">
            {t.guides}
          </h4>
          <ul className="space-y-2">
            {filterLinks(guides).slice(0, 4).map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.url}
                  className="flex items-center gap-2 text-sm text-brand-darkBlue hover:text-brand-blue transition-colors"
                >
                  {getIcon(link.type)}
                  <span className="line-clamp-1">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Продукты */}
        <div>
          <h4 className="text-sm font-semibold text-brand-darkBlue/60 uppercase tracking-wider mb-3">
            {t.products}
          </h4>
          <ul className="space-y-2">
            {filterLinks(products).map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.url}
                  className="flex items-center gap-2 text-sm text-brand-darkBlue hover:text-brand-blue transition-colors"
                >
                  {getIcon(link.type)}
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Кейсы */}
        <div>
          <h4 className="text-sm font-semibold text-brand-darkBlue/60 uppercase tracking-wider mb-3">
            {t.cases}
          </h4>
          <ul className="space-y-2">
            {filterLinks(cases).map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.url}
                  className="flex items-center gap-2 text-sm text-brand-darkBlue hover:text-brand-blue transition-colors"
                >
                  {getIcon(link.type)}
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* GEO */}
        <div>
          <h4 className="text-sm font-semibold text-brand-darkBlue/60 uppercase tracking-wider mb-3">
            {t.geo}
          </h4>
          <ul className="space-y-2">
            {filterLinks(geoLinks).map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.url}
                  className="flex items-center gap-2 text-sm text-brand-darkBlue hover:text-brand-blue transition-colors"
                >
                  {getIcon(link.type)}
                  <span className="line-clamp-1">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Кнопка ко всем гайдам */}
      <div className="mt-8 text-center">
        <Link 
          to="/guides"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lightBlue/20 text-brand-blue rounded-full hover:bg-brand-lightBlue/30 transition-colors"
        >
          {language === 'ru' ? 'Все гайды' : 'All Guides'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
