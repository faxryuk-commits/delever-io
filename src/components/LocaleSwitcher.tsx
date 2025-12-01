import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import { Language, languageNames } from '@/i18n/translations'
import { motion, AnimatePresence } from 'framer-motion'

export function LocaleSwitcher() {
  const { language, setLanguage } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
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

  const languageFlags: Record<Language, string> = {
    ru: '🇷🇺',
    en: '🇬🇧',
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg border border-brand-lightTeal/30 hover:border-brand-darkBlue/30 transition-colors bg-white"
      >
        <span className="text-base">{languageFlags[language]}</span>
        <span className="hidden sm:inline text-sm font-medium text-brand-darkBlue">
          {languageNames[language].slice(0, 2).toUpperCase()}
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
            className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-brand-lightTeal/30 overflow-hidden z-50"
          >
            <div className="p-2">
              {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    language === code
                      ? 'bg-brand-darkBlue text-white'
                      : 'hover:bg-brand-lightBlue/30 text-brand-darkBlue'
                  }`}
                >
                  <span className="text-lg">{languageFlags[code]}</span>
                  <span className="font-medium">{name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
