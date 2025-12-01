import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, countries, translations, languageNames } from './translations'

interface LocaleContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  formatPrice: (priceInUZS: number) => string
  languageName: string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

// Определение языка по locale браузера
function detectLanguage(): Language {
  const browserLang = navigator.language.toLowerCase().split('-')[0]
  
  if (browserLang === 'ru') return 'ru'
  return 'en' // По умолчанию английский для остальных
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('delever_language')
    if (saved === 'ru' || saved === 'en') return saved
    return detectLanguage()
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('delever_language', lang)
  }

  // Обновление lang атрибута
  useEffect(() => {
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

  // Для Узбекистана - цены в сумах, для остальных - доллары
  const countryConfig = countries[0] // UZ по умолчанию

  const formatPrice = (priceInUZS: number): string => {
    if (language === 'ru') {
      return `${priceInUZS.toLocaleString('ru-RU')} ${countryConfig.currencySymbol}`
    }
    // Для английского показываем в долларах (конвертация примерная)
    const priceInUSD = Math.ceil(priceInUZS / 12500)
    return `$${priceInUSD.toLocaleString('en-US')}`
  }

  return (
    <LocaleContext.Provider 
      value={{
        language,
        setLanguage,
        t,
        formatPrice,
        languageName: languageNames[language],
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
