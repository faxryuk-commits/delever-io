/**
 * Hreflang Tags для мультиязычности
 * Указывает поисковым системам версии страницы на разных языках
 */
import { Helmet } from 'react-helmet-async'

interface Props {
  path: string  // Путь страницы без языкового префикса (например, '/products')
}

const BASE_URL = 'https://delever.io'

// Поддерживаемые языки
const LANGUAGES = [
  { code: 'ru', hreflang: 'ru' },
  { code: 'en', hreflang: 'en' },
  { code: 'uz', hreflang: 'uz' },
]

export function HreflangTags({ path }: Props) {
  // Для текущей реализации URL одинаковый для всех языков
  // (язык меняется через localStorage/state, а не через URL)
  // Но добавляем теги для будущей поддержки URL-based локализации
  
  const canonicalUrl = `${BASE_URL}${path}`
  
  return (
    <Helmet>
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags для каждого языка */}
      {LANGUAGES.map(lang => (
        <link 
          key={lang.code}
          rel="alternate" 
          hrefLang={lang.hreflang} 
          href={canonicalUrl}
        />
      ))}
      
      {/* x-default для fallback */}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  )
}

/**
 * Генерирует hreflang теги для URL-based локализации
 * Использовать когда будет реализована URL структура типа /en/products, /ru/products
 */
export function HreflangTagsUrlBased({ basePath }: { basePath: string }) {
  return (
    <Helmet>
      {LANGUAGES.map(lang => (
        <link 
          key={lang.code}
          rel="alternate" 
          hrefLang={lang.hreflang} 
          href={`${BASE_URL}/${lang.code}${basePath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${basePath}`} />
    </Helmet>
  )
}
