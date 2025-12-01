import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, MapPin } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { Language, Country, languageNames, countries } from '@/i18n/translations'
import { motion, AnimatePresence } from 'framer-motion'

export function LocaleSwitcher() {
  const { language, setLanguage, country, setCountry, t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'language' | 'country'>('language')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentCountry = countries.find(c => c.code === country)

  const languageFlags: Record<Language, string> = {
    ru: '🇷🇺',
    uz: '🇺🇿',
    en: '🇬🇧',
    kz: '🇰🇿',
    ar: '🇸🇦',
    tr: '🇹🇷',
    ka: '🇬🇪',
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-lightTeal/30 hover:border-brand-darkBlue/30 transition-colors bg-white"
      >
        <Globe className="h-4 w-4 text-brand-darkBlue/60" />
        <span className="text-sm font-medium text-brand-darkBlue">
          {languageFlags[language]} {languageNames[language].slice(0, 2).toUpperCase()}
        </span>
        <ChevronDown className={`h-3 w-3 text-brand-darkBlue/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-brand-lightTeal/30 overflow-hidden z-50"
          >
            {/* Tabs */}
            <div className="flex border-b border-brand-lightTeal/20">
              <button
                onClick={() => setActiveTab('language')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'language' 
                    ? 'text-brand-darkBlue bg-brand-lightBlue/30' 
                    : 'text-brand-darkBlue/60 hover:bg-brand-lightBlue/10'
                }`}
              >
                <Globe className="h-4 w-4" />
                {t('common.language')}
              </button>
              <button
                onClick={() => setActiveTab('country')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'country' 
                    ? 'text-brand-darkBlue bg-brand-lightBlue/30' 
                    : 'text-brand-darkBlue/60 hover:bg-brand-lightBlue/10'
                }`}
              >
                <MapPin className="h-4 w-4" />
                {t('common.country')}
              </button>
            </div>

            {/* Content */}
            <div className="p-2 max-h-64 overflow-y-auto">
              {activeTab === 'language' ? (
                <div className="grid grid-cols-2 gap-1">
                  {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === code
                          ? 'bg-brand-darkBlue text-white'
                          : 'hover:bg-brand-lightBlue/30 text-brand-darkBlue'
                      }`}
                    >
                      <span>{languageFlags[code]}</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountry(c.code as Country)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        country === c.code
                          ? 'bg-brand-darkBlue text-white'
                          : 'hover:bg-brand-lightBlue/30 text-brand-darkBlue'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name[language]}</span>
                      </div>
                      <span className={country === c.code ? 'text-white/70' : 'text-brand-darkBlue/50'}>
                        {c.currencySymbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current Selection */}
            <div className="px-3 py-2 bg-brand-lightBlue/20 border-t border-brand-lightTeal/20 text-xs text-brand-darkBlue/60">
              {currentCountry?.flag} {currentCountry?.name[language]} · {currentCountry?.currencySymbol}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

