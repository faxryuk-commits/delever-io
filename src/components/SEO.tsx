import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocale } from '@/i18n/LocaleContext'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
}

// JSON-LD Schemas
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Delever",
  "url": "https://delever.io",
  "logo": "https://delever.io/logo/logo-horizontal.svg",
  "description": "Единая платформа для управления доставкой. Операционная система для ресторанов, магазинов и служб доставки.",
  "foundingDate": "2020",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 100
  },
  "areaServed": [
    { "@type": "Country", "name": "Uzbekistan" },
    { "@type": "Country", "name": "Kazakhstan" },
    { "@type": "Country", "name": "Georgia" },
    { "@type": "Country", "name": "Cyprus" },
    { "@type": "Country", "name": "United Arab Emirates" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+998-78-113-98-13",
    "contactType": "sales",
    "email": "support@delever.uz",
    "availableLanguage": ["Russian", "English", "Uzbek"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/98819489",
    "https://www.instagram.com/delever.uz/",
    "https://t.me/deleverme"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Проспект Амира Темура 129Б, 2 этаж, 1 офис",
    "addressLocality": "Ташкент",
    "addressCountry": "UZ"
  }
})

const getSoftwareSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Delever",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "99",
    "highPrice": "1100",
    "offerCount": "4"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000",
    "bestRating": "5"
  },
  "featureList": [
    "POS Integration (iiko, R-Keeper, Poster)",
    "Aggregator Integration (Uzum, Wolt, Glovo)",
    "Courier Management",
    "Analytics & Reports",
    "CRM & Marketing",
    "White Label Apps"
  ]
})

const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Delever",
  "url": "https://delever.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://delever.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
})

const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

const getProductSchema = (product: {
  name: string
  description: string
  price: string
  currency: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "Delever"
  },
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency,
    "availability": "https://schema.org/InStock"
  }
})

// Default FAQs for GEO
const defaultFAQs = [
  {
    question: "Что такое Delever?",
    answer: "Delever — это единая платформа для управления доставкой. Она объединяет все каналы продаж (сайт, приложение, Telegram-бот), POS-системы, агрегаторы и курьеров в одном месте. Более 1000 ресторанов в 7 странах используют Delever."
  },
  {
    question: "Сколько стоит подключение Delever?",
    answer: "Тарифы Delever начинаются от 1,300,000 сум/месяц (или $99/месяц). Стоимость зависит от количества заказов. Есть тарифы Start (до 1000 заказов), Medium (до 3000), Big (до 6000) и Enterprise (до 10000+)."
  },
  {
    question: "Как быстро можно запустить доставку с Delever?",
    answer: "Запуск занимает всего 1 день. Мы помогаем с настройкой меню, интеграцией POS-системы и обучением персонала. Полная поддержка на всех этапах."
  },
  {
    question: "Какие POS-системы поддерживает Delever?",
    answer: "Delever интегрируется с iiko, R-Keeper, Jowi, Poster, Paloma, Syrve, Yaros, Clopos и другими популярными POS-системами."
  },
  {
    question: "Можно ли интегрировать Delever с агрегаторами?",
    answer: "Да, Delever интегрируется с Uzum Tezkor, Wolt, Glovo, Yandex Eda, Bolt Food и другими агрегаторами. Все заказы автоматически попадают в единую систему."
  }
]

export function SEO({ 
  title, 
  description, 
  keywords,
  image = 'https://delever.io/logo/logo-horizontal.svg',
  type = 'website',
  noindex = false
}: SEOProps) {
  const location = useLocation()
  const { language } = useLocale()
  
  const baseUrl = 'https://delever.io'
  const currentUrl = `${baseUrl}${location.pathname}`
  
  const defaultTitle = language === 'en' 
    ? 'Delever - Unified Delivery Management Platform'
    : 'Delever - Единая платформа для управления доставкой'
    
  const defaultDescription = language === 'en'
    ? 'Manage all sales channels, delivery operations and analytics from one place. 1000+ restaurants in 7 countries. Launch your delivery in 1 day.'
    : 'Управляйте всеми каналами продаж, операциями доставки и аналитикой из одного места. 1000+ ресторанов в 7 странах. Запуск за 1 день.'
  
  const defaultKeywords = language === 'en'
    ? 'delivery platform, restaurant software, POS integration, iiko, R-Keeper, food delivery, aggregator integration, Uzbekistan'
    : 'платформа доставки, ПО для ресторанов, интеграция POS, iiko, R-Keeper, доставка еды, агрегаторы, Узбекистан'

  const fullTitle = title ? `${title} | Delever` : defaultTitle
  const fullDescription = description || defaultDescription
  const fullKeywords = keywords || defaultKeywords

  useEffect(() => {
    // Update document title
    document.title = fullTitle
    
    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta
    updateMeta('description', fullDescription)
    updateMeta('keywords', fullKeywords)
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    
    // Open Graph
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', fullDescription, true)
    updateMeta('og:image', image, true)
    updateMeta('og:url', currentUrl, true)
    updateMeta('og:type', type, true)
    updateMeta('og:locale', language === 'en' ? 'en_US' : 'ru_RU', true)
    
    // Twitter
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', fullDescription)
    updateMeta('twitter:image', image)
    updateMeta('twitter:url', currentUrl)
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)
    
    // Hreflang
    const addHreflang = (lang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', lang)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }
    
    addHreflang('ru', `${currentUrl}?lang=ru`)
    addHreflang('en', `${currentUrl}?lang=en`)
    addHreflang('x-default', currentUrl)
    
    // JSON-LD Schemas
    const addJsonLd = (id: string, schema: object) => {
      let script = document.getElementById(id)
      if (!script) {
        script = document.createElement('script')
        script.id = id
        script.setAttribute('type', 'application/ld+json')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schema)
    }
    
    // Add schemas
    addJsonLd('schema-organization', getOrganizationSchema())
    addJsonLd('schema-website', getWebSiteSchema())
    addJsonLd('schema-software', getSoftwareSchema())
    addJsonLd('schema-faq', getFAQSchema(defaultFAQs))
    
    // Breadcrumbs based on path
    const pathParts = location.pathname.split('/').filter(Boolean)
    if (pathParts.length > 0) {
      const breadcrumbs = [
        { name: 'Главная', url: baseUrl }
      ]
      let currentPath = ''
      pathParts.forEach(part => {
        currentPath += `/${part}`
        breadcrumbs.push({
          name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
          url: `${baseUrl}${currentPath}`
        })
      })
      addJsonLd('schema-breadcrumb', getBreadcrumbSchema(breadcrumbs))
    }
    
  }, [fullTitle, fullDescription, fullKeywords, image, currentUrl, type, noindex, language, location.pathname])

  return null
}

// Export schemas for custom use
export { 
  getOrganizationSchema, 
  getSoftwareSchema, 
  getWebSiteSchema, 
  getFAQSchema, 
  getBreadcrumbSchema,
  getProductSchema 
}

