import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, Building2 } from 'lucide-react'
import { Button } from './ui/Button'
import { useLocale } from '@/i18n/LocaleContext'
import { downloadPresentation } from '@/utils/generatePresentation'

interface PresentationDownloadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customData?: {
    planName: string
    branches: number
    monthlyOrders: number
    avgCheck: string
    totalCost: string
    deposit: string
    roiSavings?: string
    roiYearlySavings?: string
  }
}

export function PresentationDownload({ open, onOpenChange, customData }: PresentationDownloadProps) {
  const { t, language } = useLocale()
  const [brandName, setBrandName] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    
    downloadPresentation({
      language: language as 'ru' | 'en',
      brandName: brandName.trim() || undefined,
      customData,
    }, brandName.trim() ? `${brandName}_x_Delever` : 'Delever_Presentation')
    
    setTimeout(() => {
      setIsDownloading(false)
      onOpenChange(false)
      setBrandName('')
    }, 500)
  }

  const handleSkip = () => {
    downloadPresentation({
      language: language as 'ru' | 'en',
      customData,
    }, 'Delever_Presentation')
    
    onOpenChange(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-darkBlue to-brand-blue p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{t('presentation.title')}</h3>
                      <p className="text-white/70 text-sm">{t('presentation.subtitle')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <label className="block mb-4">
                  <span className="text-sm font-medium text-brand-darkBlue mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {t('presentation.brandLabel')}
                  </span>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={t('presentation.brandPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    {t('presentation.brandHint')}
                  </span>
                </label>
                
                {/* Preview */}
                {brandName.trim() && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-gradient-to-r from-brand-lightBlue/30 to-brand-lightTeal/30 rounded-xl"
                  >
                    <p className="text-sm text-gray-600">{t('presentation.preview')}</p>
                    <p className="text-xl font-bold text-brand-darkBlue mt-1">
                      {brandName.trim()} × Delever
                    </p>
                  </motion.div>
                )}
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    className="flex-1"
                  >
                    {t('presentation.skip')}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1"
                  >
                    {isDownloading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        {t('presentation.download')}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

