import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from './ui/Button'
import { useLocale } from '@/i18n/LocaleContext'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    // Проверяем, было ли уже дано согласие
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Показываем баннер через 1 секунду
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-brand-lightTeal/20 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-lightBlue flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-brand-darkBlue" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-brand-darkBlue mb-1">
                    {t('cookies.title')}
                  </h3>
                  <p className="text-sm text-brand-darkBlue/60">
                    {t('cookies.description')}{' '}
                    <a 
                      href="/docs/PRIVACY%20POLICY.docx" 
                      target="_blank"
                      className="text-brand-darkBlue underline hover:no-underline"
                    >
                      {t('cookies.privacyLink')}
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={acceptNecessary}
                    className="w-full sm:w-auto"
                  >
                    {t('cookies.necessary')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="w-full sm:w-auto"
                  >
                    {t('cookies.acceptAll')}
                  </Button>
                </div>

                {/* Close button */}
                <button
                  onClick={acceptNecessary}
                  className="absolute top-3 right-3 sm:static w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

