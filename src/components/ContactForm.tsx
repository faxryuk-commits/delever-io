import { useState } from 'react'
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

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tag?: string
}

export function ContactForm({ open, onOpenChange, tag }: ContactFormProps) {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tag }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error sending')
      }

      alert(t('form.success'))
      setFormData({ name: '', phone: '', email: '', company: '', message: '' })
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
          <div>
            <Input
              name="name"
              placeholder={t('form.name')}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              name="phone"
              type="tel"
              placeholder={t('form.phone')}
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder={t('form.email')}
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
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
            disabled={isSubmitting}
          >
            {isSubmitting ? t('form.sending') : t('form.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
