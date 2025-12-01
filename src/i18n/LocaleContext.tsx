import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, Country, countries, translations, rtlLanguages, languageNames } from './translations'

interface LocaleContextType {
  language: Language
  setLanguage: (lang: Language) => void
  country: Country
  setCountry: (country: Country) => void
  t: (key: string, params?: Record<string, string | number>) => string
  formatPrice: (priceInUZS: number) => string
  isRTL: boolean
  languageName: string
  countryConfig: typeof countries[0] | undefined
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

// Определение языка по locale браузера
function detectLanguage(): Language {
  const browserLang = navigator.language.toLowerCase().split('-')[0]
  
  const langMap: Record<string, Language> = {
    'ru': 'ru',
    'uz': 'uz',
    'en': 'en',
    'kk': 'kz',
    'kz': 'kz',
    'ar': 'ar',
    'tr': 'tr',
    'ka': 'ka',
  }
  
  return langMap[browserLang] || 'ru'
}

// Определение страны по timezone или locale
function detectCountry(): Country {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const locale = navigator.language.toLowerCase()
  
  // По timezone
  if (timezone.includes('Tashkent') || timezone.includes('Samarkand')) return 'uz'
  if (timezone.includes('Almaty') || timezone.includes('Astana')) return 'kz'
  if (timezone.includes('Bishkek')) return 'kg'
  if (timezone.includes('Baku')) return 'az'
  if (timezone.includes('Tbilisi')) return 'ge'
  if (timezone.includes('Istanbul') || timezone.includes('Turkey')) return 'tr'
  if (timezone.includes('Dubai') || timezone.includes('Emirates')) return 'ae'
  
  // По locale
  if (locale.includes('uz')) return 'uz'
  if (locale.includes('kk') || locale.includes('kz')) return 'kz'
  if (locale.includes('ky') || locale.includes('kg')) return 'kg'
  if (locale.includes('az')) return 'az'
  if (locale.includes('ka')) return 'ge'
  if (locale.includes('tr')) return 'tr'
  if (locale.includes('ar')) return 'ae'
  
  return 'uz'
}

// Конвертация цены с округлением вверх до десятых
function convertPrice(priceInUZS: number, multiplier: number): number {
  const converted = priceInUZS * multiplier
  return Math.ceil(converted / 100000) * 100000 // Округление до 100,000
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('delever_language')
    return (saved as Language) || detectLanguage()
  })
  
  const [country, setCountryState] = useState<Country>(() => {
    const saved = localStorage.getItem('delever_country')
    return (saved as Country) || detectCountry()
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('delever_language', lang)
  }

  const setCountry = (c: Country) => {
    setCountryState(c)
    localStorage.setItem('delever_country', c)
  }

  // Применение RTL для арабского
  useEffect(() => {
    document.documentElement.dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['ru'][key] || key
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v))
      })
    }
    
    return text
  }

  const countryConfig = countries.find(c => c.code === country)

  const formatPrice = (priceInUZS: number): string => {
    if (!countryConfig) return `${priceInUZS.toLocaleString()} soʼm`
    
    const converted = convertPrice(priceInUZS, countryConfig.priceMultiplier)
    
    // Форматирование для разных валют
    const formatted = converted.toLocaleString(language === 'ar' ? 'ar-SA' : 'ru-RU')
    
    if (countryConfig.code === 'uz') {
      return `${formatted} ${countryConfig.currencySymbol}`
    }
    
    // Для арабского - символ справа
    if (language === 'ar') {
      return `${formatted} ${countryConfig.currencySymbol}`
    }
    
    return `${formatted} ${countryConfig.currencySymbol}`
  }

  return (
    <LocaleContext.Provider 
      value={{
        language,
        setLanguage,
        country,
        setCountry,
        t,
        formatPrice,
        isRTL: rtlLanguages.includes(language),
        languageName: languageNames[language],
        countryConfig,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

