import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { useLocale } from '@/i18n/LocaleContext'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { trackEvents } from './Analytics'

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tag?: string
}

interface ValidationErrors {
  name?: string
  phone?: string
  email?: string
}

// Валидация имени: минимум 2 символа, только буквы, пробелы, дефисы
const validateName = (name: string): string | undefined => {
  if (!name.trim()) return 'required'
  if (name.trim().length < 2) return 'tooShort'
  if (!/^[a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ\s\-']+$/u.test(name.trim())) return 'invalidChars'
  return undefined
}

// Коды стран и операторов для валидации
const phonePatterns = {
  // Узбекистан +998
  UZ: {
    code: '998',
    operators: ['90', '91', '93', '94', '95', '97', '98', '99', '33', '55', '77', '88'],
    length: 12, // 998 + 9 цифр
    name: { ru: 'Узбекистан', en: 'Uzbekistan', uz: "O'zbekiston" }
  },
  // Казахстан +7 (начинается с 7xx)
  KZ: {
    code: '7',
    prefixes: ['70', '71', '72', '74', '75', '76', '77', '78'],
    length: 11, // 7 + 10 цифр
    name: { ru: 'Казахстан', en: 'Kazakhstan', uz: 'Qozog\'iston' }
  },
  // Россия +7 (начинается с 9xx)
  RU: {
    code: '7',
    prefixes: ['9'],
    length: 11,
    name: { ru: 'Россия', en: 'Russia', uz: 'Rossiya' }
  },
  // Кыргызстан +996
  KG: {
    code: '996',
    operators: ['50', '55', '70', '77', '22'],
    length: 12,
    name: { ru: 'Кыргызстан', en: 'Kyrgyzstan', uz: "Qirg'iziston" }
  },
  // Азербайджан +994
  AZ: {
    code: '994',
    operators: ['50', '51', '55', '70', '77', '99'],
    length: 12,
    name: { ru: 'Азербайджан', en: 'Azerbaijan', uz: 'Ozarbayjon' }
  },
  // Грузия +995
  GE: {
    code: '995',
    operators: ['55', '57', '58', '59', '68', '71', '77', '79', '91', '93', '95', '96', '97', '98', '99'],
    length: 12,
    name: { ru: 'Грузия', en: 'Georgia', uz: 'Gruziya' }
  },
  // ОАЭ +971
  AE: {
    code: '971',
    operators: ['50', '52', '54', '55', '56', '58'],
    length: 12,
    name: { ru: 'ОАЭ', en: 'UAE', uz: 'BAA' }
  },
  // Таджикистан +992
  TJ: {
    code: '992',
    operators: ['90', '91', '92', '93', '98', '99'],
    length: 12,
    name: { ru: 'Таджикистан', en: 'Tajikistan', uz: 'Tojikiston' }
  },
  // Туркменистан +993
  TM: {
    code: '993',
    operators: ['61', '62', '63', '64', '65', '66'],
    length: 11,
    name: { ru: 'Туркменистан', en: 'Turkmenistan', uz: 'Turkmaniston' }
  },
}

// Определение страны по номеру телефона
interface PhoneValidationResult {
  isValid: boolean
  country?: string
  countryCode?: string
  error?: string
}

const detectPhoneCountry = (phone: string): PhoneValidationResult => {
  const digitsOnly = phone.replace(/\D/g, '')
  
  // Убираем лидирующий 8 (для РФ/КЗ)
  let normalized = digitsOnly
  if (normalized.startsWith('8') && normalized.length === 11) {
    normalized = '7' + normalized.slice(1)
  }
  
  // Узбекистан
  if (normalized.startsWith('998')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.UZ.operators.includes(operatorCode)) {
      if (normalized.length === phonePatterns.UZ.length) {
        return { isValid: true, country: 'UZ', countryCode: '998' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Казахстан (7 + 7xx...)
  if (normalized.startsWith('7')) {
    const prefix = normalized.slice(1, 3)
    // Казахстан: 70-78
    if (phonePatterns.KZ.prefixes!.some(p => prefix.startsWith(p.charAt(0)) && parseInt(prefix) >= 70 && parseInt(prefix) <= 78)) {
      if (normalized.length === phonePatterns.KZ.length) {
        return { isValid: true, country: 'KZ', countryCode: '7' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    // Россия: 79xxxxxxxxx
    if (prefix.startsWith('9')) {
      if (normalized.length === phonePatterns.RU.length) {
        return { isValid: true, country: 'RU', countryCode: '7' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
  }
  
  // Кыргызстан
  if (normalized.startsWith('996')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.KG.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.KG.length) {
        return { isValid: true, country: 'KG', countryCode: '996' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Азербайджан
  if (normalized.startsWith('994')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.AZ.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.AZ.length) {
        return { isValid: true, country: 'AZ', countryCode: '994' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Грузия
  if (normalized.startsWith('995')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.GE.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.GE.length) {
        return { isValid: true, country: 'GE', countryCode: '995' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // ОАЭ
  if (normalized.startsWith('971')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.AE.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.AE.length) {
        return { isValid: true, country: 'AE', countryCode: '971' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Таджикистан
  if (normalized.startsWith('992')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.TJ.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.TJ.length) {
        return { isValid: true, country: 'TJ', countryCode: '992' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Туркменистан
  if (normalized.startsWith('993')) {
    const operatorCode = normalized.slice(3, 5)
    if (phonePatterns.TM.operators!.includes(operatorCode)) {
      if (normalized.length === phonePatterns.TM.length) {
        return { isValid: true, country: 'TM', countryCode: '993' }
      }
      return { isValid: false, error: 'invalidLength' }
    }
    return { isValid: false, error: 'invalidOperator' }
  }
  
  // Неподдерживаемая страна
  return { isValid: false, error: 'unsupportedCountry' }
}

// Валидация телефона с определением региона
const validatePhone = (phone: string): string | undefined => {
  if (!phone.trim()) return 'required'
  
  const digitsOnly = phone.replace(/\D/g, '')
  
  // Базовые проверки
  if (digitsOnly.length < 9) return 'tooShort'
  if (digitsOnly.length > 15) return 'tooLong'
  
  // Проверка на повторяющиеся цифры (111111111)
  if (/^(\d)\1{8,}$/.test(digitsOnly)) return 'invalid'
  
  // Проверка на последовательные цифры (123456789, 987654321)
  if (/^(0123456789|1234567890|9876543210|0987654321)/.test(digitsOnly)) return 'invalid'
  
  // Определение страны и валидация
  const result = detectPhoneCountry(phone)
  if (!result.isValid) {
    return result.error || 'invalid'
  }
  
  return undefined
}

// Получение информации о стране по номеру (для отображения)
const getPhoneCountryInfo = (phone: string, language: 'ru' | 'en' | 'uz'): string | null => {
  const result = detectPhoneCountry(phone)
  if (result.isValid && result.country) {
    const pattern = phonePatterns[result.country as keyof typeof phonePatterns]
    if (pattern) {
      return pattern.name[language] || pattern.name.en
    }
  }
  return null
}

// Валидация email
const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return undefined // Email необязателен
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email.trim())) return 'invalid'
  // Проверка на подозрительные домены
  const suspiciousDomains = ['test.com', 'example.com', 'fake.com', 'temp.com', 'mailinator.com', 'guerrillamail.com']
  const domain = email.split('@')[1]?.toLowerCase()
  if (suspiciousDomains.includes(domain)) return 'suspicious'
  return undefined
}

export function ContactForm({ open, onOpenChange, tag }: ContactFormProps) {
  const { t, language } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('') // Скрытое поле для ботов
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const formStartTime = useRef<number>(0)

  // Засекаем время открытия формы
  useEffect(() => {
    if (open) {
      formStartTime.current = Date.now()
      setSubmitSuccess(false)
      setErrors({})
      setTouched({})
    }
  }, [open])

  // Валидация при изменении полей
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name': return validateName(value)
      case 'phone': return validatePhone(value)
      case 'email': return validateEmail(value)
      default: return undefined
    }
  }

  // Полная валидация формы
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
    }
    setErrors(newErrors)
    return !newErrors.name && !newErrors.phone && !newErrors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Проверка honeypot (если заполнено - это бот)
    if (honeypot) {
      console.log('Bot detected via honeypot')
      // Притворяемся что всё ок, но не отправляем
      setSubmitSuccess(true)
      setTimeout(() => onOpenChange(false), 2000)
      return
    }

    // Проверка времени заполнения (менее 3 секунд - подозрительно)
    const fillTime = Date.now() - formStartTime.current
    if (fillTime < 3000) {
      console.log('Bot detected: form filled too fast')
      setSubmitSuccess(true)
      setTimeout(() => onOpenChange(false), 2000)
      return
    }

    // Валидация
    if (!validateForm()) {
      setTouched({ name: true, phone: true, email: true })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          tag,
          // Дополнительные данные для аналитики
          formFillTime: Math.round(fillTime / 1000),
          language,
          userAgent: navigator.userAgent.substring(0, 100),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error sending')
      }

      setSubmitSuccess(true)
      setFormData({ name: '', phone: '', email: '', company: '', message: '' })
      
      // Отслеживание конверсии в Google Analytics
      trackEvents.contactFormSubmit(tag || 'general')
      
      setTimeout(() => onOpenChange(false), 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Валидация при изменении если поле уже было затронуто
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Форматирование телефона при вводе
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    // Разрешаем только цифры, +, пробелы, скобки, тире
    value = value.replace(/[^\d\s\+\-\(\)]/g, '')
    setFormData(prev => ({ ...prev, phone: value }))
    
    // Определяем страну
    const digitsOnly = value.replace(/\D/g, '')
    if (digitsOnly.length >= 10) {
      const country = getPhoneCountryInfo(value, language as 'ru' | 'en' | 'uz')
      setDetectedCountry(country)
    } else {
      setDetectedCountry(null)
    }
    
    if (touched.phone) {
      const error = validatePhone(value)
      setErrors(prev => ({ ...prev, phone: error }))
    }
  }

  // Получение текста ошибки
  const getErrorText = (field: string, errorType?: string): string => {
    if (!errorType) return ''
    const key = `form.validation.${field}.${errorType}`
    return t(key) || t(`form.validation.${errorType}`) || errorType
  }

  if (submitSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
              {t('form.successTitle')}
            </h3>
            <p className="text-brand-darkBlue/60">
              {t('form.successMessage')}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('form.title')}</DialogTitle>
          <DialogDescription>
            {t('form.subtitle')}
          </DialogDescription>
        </DialogHeader>
        
        {/* Пояснение почему запрашиваем данные */}
        <div className="bg-brand-lightBlue/30 rounded-lg p-3 text-xs text-brand-darkBlue/70 flex items-start gap-2">
          <span className="text-brand-blue text-lg leading-none">🔒</span>
          <span>{t('form.whyWeAsk')}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot поле - скрыто от пользователей, но боты его заполняют */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div>
            <Input
              name="name"
              placeholder={t('form.name')}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full ${errors.name && touched.name ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.name && touched.name ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('name', errors.name)}
              </p>
            ) : (
              <p className="mt-1 text-xs text-brand-darkBlue/40">{t('form.nameHint')}</p>
            )}
          </div>

          <div>
            <Input
              name="phone"
              type="tel"
              placeholder={t('form.phone')}
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              required
              className={`w-full ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500' : detectedCountry ? 'border-emerald-500 focus:border-emerald-500' : ''}`}
            />
            {errors.phone && touched.phone ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('phone', errors.phone)}
              </p>
            ) : detectedCountry ? (
              <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {detectedCountry}
              </p>
            ) : (
              <p className="mt-1 text-xs text-brand-darkBlue/40">{t('form.phoneHint')}</p>
            )}
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder={t('form.email')}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.email && touched.email ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('email', errors.email)}
              </p>
            ) : (
              <p className="mt-1 text-xs text-brand-darkBlue/40">{t('form.emailHint')}</p>
            )}
          </div>

          <div>
            <Input
              name="company"
              placeholder={t('form.company')}
              value={formData.company}
              onChange={handleChange}
              className="w-full"
            />
            <p className="mt-1 text-xs text-brand-darkBlue/40">{t('form.companyHint')}</p>
          </div>

          <div>
            <Textarea
              name="message"
              placeholder={t('form.message')}
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none"
            />
            <p className="mt-1 text-xs text-brand-darkBlue/40">{t('form.messageHint')}</p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || (Object.keys(errors).some(k => errors[k as keyof ValidationErrors]))}
          >
            {isSubmitting ? t('form.sending') : t('form.submit')}
          </Button>

          <p className="text-xs text-center text-brand-darkBlue/40">
            {t('form.privacyNote')}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
