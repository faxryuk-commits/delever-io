/**
 * Schema.org структурированные данные для SEO
 * Поддерживает: Article, FAQPage, HowTo, Organization, WebSite
 */

import { Helmet } from 'react-helmet-async'

interface FAQItem {
  question: string
  answer: string
}

interface ArticleSchemaProps {
  title: string
  description: string
  datePublished?: string
  dateModified?: string
  author?: string
  image?: string
  url: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

interface HowToStep {
  name: string
  text: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string // ISO 8601 duration, e.g., "PT30M"
}

interface LocalBusinessSchemaProps {
  name: string
  description: string
  city: string
  country: string
  url: string
}

// Article Schema (для статей Knowledge Hub)
export function ArticleSchema({ title, description, datePublished, dateModified, author, image, url }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: author || 'Delever',
      url: 'https://delever.io'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Delever',
      url: 'https://delever.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://delever.io/logo.png'
      }
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://delever.io${url}`
    },
    image: image || 'https://delever.io/og-image.png'
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// FAQ Schema (для FAQ секций)
export function FAQSchema({ items }: FAQSchemaProps) {
  if (!items || items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// HowTo Schema (для пошаговых гайдов)
export function HowToSchema({ name, description, steps, totalTime }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: totalTime || 'PT10M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// LocalBusiness Schema (для GEO страниц)
export function LocalBusinessSchema({ name, description, city, country, url }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    description: description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: country
    },
    url: `https://delever.io${url}`,
    image: 'https://delever.io/og-image.png',
    priceRange: '$$',
    servesCuisine: 'Various',
    hasDeliveryMethod: {
      '@type': 'DeliveryMethod',
      name: 'Delivery'
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// Organization Schema (глобальный для сайта)
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delever',
    url: 'https://delever.io',
    logo: 'https://delever.io/logo.png',
    description: 'Операционная система для доставки. Управляйте всеми каналами продаж из одного окна.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-78-113-98-13',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English', 'Uzbek']
    },
    sameAs: [
      'https://www.linkedin.com/company/98819489',
      'https://www.instagram.com/delever.uz/',
      'https://t.me/deleverme'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Амира Темура 129Б',
      addressLocality: 'Ташкент',
      addressCountry: 'UZ'
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// WebSite Schema с SearchAction
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Delever',
    url: 'https://delever.io',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://delever.io/guides?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// SoftwareApplication Schema (для продуктовых страниц)
export function SoftwareSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Delever',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '99',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '500',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://delever.io${item.url}`
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

