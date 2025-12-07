import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Info, ImageIcon } from 'lucide-react'
import { MenuForm } from '@/components/menu-doctor/MenuForm'
import { MenuReport } from '@/components/menu-doctor/MenuReport'
import { LeadForm } from '@/components/menu-doctor/LeadForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import type { MenuDoctorReport } from '@/types/menuDoctor'

export function MenuDoctor() {
  const { t } = useLocale()
  const [report, setReport] = useState<MenuDoctorReport | null>(null)

  return (
    <>
      <SEO 
        title={t('menuDoctor.seo.title')}
        description={t('menuDoctor.seo.description')}
        keywords="menu analysis, restaurant menu, menu optimization, average check, upsell"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white mb-6 shadow-lg">
              <Stethoscope className="h-8 w-8" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('menuDoctor.title')}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {t('menuDoctor.subtitle')}
            </p>

            {/* Info badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
                <Info className="h-4 w-4" />
                {t('menuDoctor.hint.textBased')}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm">
                <ImageIcon className="h-4 w-4" />
                {t('menuDoctor.hint.imageSoon')}
              </div>
            </div>
          </motion.div>

          {/* Main Content - Two Columns */}
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  {t('menuDoctor.form.title')}
                </h2>
                <MenuForm onResult={setReport} />
              </div>
            </motion.div>

            {/* Right Column - Report */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <MenuReport data={report} />
            </motion.div>
          </div>

          {/* Lead Generation Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}
