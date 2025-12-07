import { useState } from 'react'
import { Mail, Building2, Globe, Send, CheckCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useLocale } from '@/i18n/LocaleContext'

export function LeadForm() {
  const { t } = useLocale()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    venueName: '',
    country: '',
    wantImport: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Отправка данных на бэкенд
    console.log('Lead form submitted:', formData)
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          {t('menuDoctor.lead.success.title')}
        </h3>
        <p className="text-green-700">
          {t('menuDoctor.lead.success.message')}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {t('menuDoctor.lead.title')}
      </h3>
      <p className="text-gray-600 mb-6">
        {t('menuDoctor.lead.subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="h-4 w-4 text-teal-600" />
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Building2 className="h-4 w-4 text-teal-600" />
            {t('menuDoctor.lead.venueName')}
          </label>
          <Input
            type="text"
            value={formData.venueName}
            onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
            placeholder="Название заведения"
            className="w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Globe className="h-4 w-4 text-teal-600" />
            {t('menuDoctor.lead.country')}
          </label>
          <Input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="Узбекистан"
            className="w-full"
          />
        </div>

        <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
          <input
            type="checkbox"
            id="wantImport"
            checked={formData.wantImport}
            onChange={(e) => setFormData({ ...formData, wantImport: e.target.checked })}
            className="mt-1 h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
          />
          <label htmlFor="wantImport" className="text-sm text-teal-800 cursor-pointer">
            {t('menuDoctor.lead.wantImport')}
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              {t('menuDoctor.lead.sending')}
            </span>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {t('menuDoctor.lead.submit')}
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
        {t('menuDoctor.lead.footer')}
      </p>
    </div>
  )
}
