import { useState } from 'react'
import { Loader2, Search, Globe, DollarSign, MapPin, Languages } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useLocale } from '@/i18n/LocaleContext'
import type { MenuDoctorReport } from '@/types/menuDoctor'

interface MenuFormProps {
  onResult: (data: MenuDoctorReport) => void
}

const venueTypes = [
  { value: 'fastfood', labelKey: 'menuDoctor.venueType.fastfood' },
  { value: 'coffee', labelKey: 'menuDoctor.venueType.coffee' },
  { value: 'restaurant', labelKey: 'menuDoctor.venueType.restaurant' },
  { value: 'sushi', labelKey: 'menuDoctor.venueType.sushi' },
  { value: 'pizza', labelKey: 'menuDoctor.venueType.pizza' },
  { value: 'canteen', labelKey: 'menuDoctor.venueType.canteen' },
  { value: 'other', labelKey: 'menuDoctor.venueType.other' },
]

export function MenuForm({ onResult }: MenuFormProps) {
  const { t, language } = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    menuUrl: '',
    venueType: 'restaurant',
    averageBill: '',
    location: '',
    language: language as 'ru' | 'uz' | 'en',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.menuUrl.trim()) {
      setError(t('menuDoctor.error.urlRequired'))
      return
    }

    // Validate URL format
    try {
      new URL(formData.menuUrl)
    } catch {
      setError(t('menuDoctor.error.invalidUrl'))
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/menu-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menuUrl: formData.menuUrl,
          venueType: formData.venueType,
          averageBill: formData.averageBill || undefined,
          location: formData.location || undefined,
          language: formData.language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze menu')
      }

      onResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Menu URL */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Globe className="h-4 w-4 text-teal-600" />
          {t('menuDoctor.form.menuUrl')}
          <span className="text-red-500">*</span>
        </label>
        <Input
          type="url"
          value={formData.menuUrl}
          onChange={(e) => setFormData({ ...formData, menuUrl: e.target.value })}
          placeholder="https://restaurant.uz/menu"
          className="w-full"
        />
      </div>

      {/* Venue Type */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Search className="h-4 w-4 text-teal-600" />
          {t('menuDoctor.form.venueType')}
        </label>
        <select
          value={formData.venueType}
          onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
        >
          {venueTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {t(type.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Average Bill */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="h-4 w-4 text-teal-600" />
          {t('menuDoctor.form.averageBill')}
        </label>
        <Input
          type="text"
          value={formData.averageBill}
          onChange={(e) => setFormData({ ...formData, averageBill: e.target.value })}
          placeholder="50 000 сум"
          className="w-full"
        />
      </div>

      {/* Location */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MapPin className="h-4 w-4 text-teal-600" />
          {t('menuDoctor.form.location')}
        </label>
        <Input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Ташкент, Узбекистан"
          className="w-full"
        />
      </div>

      {/* Report Language */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Languages className="h-4 w-4 text-teal-600" />
          {t('menuDoctor.form.language')}
        </label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value as 'ru' | 'uz' | 'en' })}
          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
        >
          <option value="ru">🇷🇺 Русский</option>
          <option value="uz">🇺🇿 O'zbekcha</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 text-base font-medium"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            {t('menuDoctor.form.analyzing')}
          </>
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            {t('menuDoctor.form.analyze')}
          </>
        )}
      </Button>
    </form>
  )
}
