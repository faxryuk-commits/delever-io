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
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import type { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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

// Валидация телефона с использованием libphonenumber
const validatePhone = (phone: string | undefined): string | undefined => {
  if (!phone) return 'required'
  
  // Проверка на повторяющиеся цифры (111111111)
  const digitsOnly = phone.replace(/\D/g, '')
  if (/^(\d)\1{8,}$/.test(digitsOnly)) return 'invalid'
  
  // Проверка на последовательные цифры
  if (/^(0123456789|1234567890|9876543210|0987654321)/.test(digitsOnly)) return 'invalid'
  
  // Строгая проверка для узбекских номеров
  if (digitsOnly.startsWith('998')) {
    // Валидные коды операторов Узбекистана
    // Beeline: 90, 91, 50, 51
    // Ucell: 93, 94
    // UMS/Mobi: 95, 97, 98, 99
    // Perfectum: 77
    // Mobiuz: 88, 89
    // Uztelecom: 33, 55, 71, 78, 62, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 79
    const validUzOperators = [
      '90', '91', '50', '51',           // Beeline
      '93', '94',                        // Ucell  
      '95', '97', '98', '99',           // UMS/Mobi
      '77',                              // Perfectum
      '88', '89',                        // Mobiuz
      '33', '55', '71', '78',           // Uztelecom
      '62', '65', '66', '67', '69',     // Городские
      '70', '72', '73', '74', '75', '76', '79'
    ]
    const operatorCode = digitsOnly.substring(3, 5)
    
    if (!validUzOperators.includes(operatorCode)) {
      return 'invalidOperator'
    }
    
    // Проверка длины (998 + 9 цифр = 12)
    if (digitsOnly.length !== 12) {
      return 'invalidLength'
    }
  }
  
  // Валидация с помощью libphonenumber
  if (!isValidPhoneNumber(phone)) return 'invalid'
  
  return undefined
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

// Определение страны по IP (через бесплатный API)
const detectCountryByIP = async (): Promise<Country> => {
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) // 3 секунды таймаут
    })
    if (response.ok) {
      const data = await response.json()
      if (data.country_code) {
        return data.country_code as Country
      }
    }
  } catch (e) {
    console.log('Could not detect country by IP, using default')
  }
  return 'UZ' // По умолчанию Узбекистан
}

export function ContactForm({ open, onOpenChange, tag }: ContactFormProps) {
  const { t, language } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    phone: '' as string | undefined,
    email: '',
    company: '',
    message: '',
  })
  const [defaultCountry, setDefaultCountry] = useState<Country>('UZ')
  const [honeypot, setHoneypot] = useState('') // Скрытое поле для ботов
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [phoneValid, setPhoneValid] = useState(false)
  const formStartTime = useRef<number>(0)

  // Определяем страну по IP при открытии формы
  useEffect(() => {
    if (open) {
      formStartTime.current = Date.now()
      setSubmitSuccess(false)
      setErrors({})
      setTouched({})
      setPhoneValid(false)
      
      // Отслеживаем открытие формы
      trackEvents.formOpen(tag || 'general')
      
      // Определяем страну
      detectCountryByIP().then(country => {
        setDefaultCountry(country)
      })
    }
  }, [open])

  // Валидация при изменении полей
  const validateField = (name: string, value: string | undefined): string | undefined => {
    switch (name) {
      case 'name': return validateName(value || '')
      case 'phone': return validatePhone(value)
      case 'email': return validateEmail(value || '')
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
          detectedCountry: defaultCountry,
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

  // Обработчик изменения телефона
  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, phone: value }))
    
    // Проверяем валидность
    if (value && isValidPhoneNumber(value)) {
      setPhoneValid(true)
      setErrors(prev => ({ ...prev, phone: undefined }))
    } else {
      setPhoneValid(false)
    }
    
    if (touched.phone) {
      const error = validatePhone(value)
      setErrors(prev => ({ ...prev, phone: error }))
    }
  }

  const handlePhoneBlur = () => {
    setTouched(prev => ({ ...prev, phone: true }))
    const error = validatePhone(formData.phone)
    setErrors(prev => ({ ...prev, phone: error }))
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
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={defaultCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              className={`phone-input-container ${errors.phone && touched.phone ? 'phone-input-error' : phoneValid ? 'phone-input-valid' : ''}`}
              placeholder={t('form.phone')}
            />
            {errors.phone && touched.phone ? (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('phone', errors.phone)}
              </p>
            ) : phoneValid ? (
              <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {t('form.phoneAccepted')}
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
