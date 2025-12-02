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

// Валидация телефона: минимум 9 цифр
const validatePhone = (phone: string): string | undefined => {
  if (!phone.trim()) return 'required'
  const digitsOnly = phone.replace(/\D/g, '')
  if (digitsOnly.length < 9) return 'tooShort'
  if (digitsOnly.length > 15) return 'tooLong'
  // Проверка на повторяющиеся цифры (111111111)
  if (/^(\d)\1{8,}$/.test(digitsOnly)) return 'invalid'
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
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            {errors.name && touched.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('name', errors.name)}
              </p>
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
              className={`w-full ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('phone', errors.phone)}
              </p>
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
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getErrorText('email', errors.email)}
              </p>
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
