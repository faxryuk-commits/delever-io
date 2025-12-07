import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Copy, 
  Check, 
  Instagram, 
  Send, 
  Film, 
  Hash,
  Loader2,
  AlertCircle,
  ArrowRight,
  Utensils,
  Target,
  Languages,
  Wand2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'

interface MarketingResult {
  instagram_posts: string[]
  telegram_posts: string[]
  stories_ideas: string[]
  hashtags: string[]
}

interface FormData {
  brandName: string
  cuisine: string
  promoDescription: string
  goal: string
  channels: string[]
  language: 'ru' | 'uz' | 'en'
}

export function AIMarketing() {
  const { language } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<MarketingResult | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    cuisine: '',
    promoDescription: '',
    goal: '',
    channels: ['instagram', 'telegram', 'stories'],
    language: 'ru'
  })

  const t = {
    ru: {
      title: 'AI-генератор маркетинговых постов',
      subtitle: 'Создайте продающие тексты для Instagram, Telegram и Stories за секунды',
      brandName: 'Название заведения',
      brandNamePlaceholder: 'Например: Yaponamama',
      cuisine: 'Тип кухни',
      cuisinePlaceholder: 'фастфуд, паназиатская, узбекская...',
      promo: 'Описание блюда или акции',
      promoPlaceholder: 'Новая пицца Маргарита с двойным сыром. Скидка 20% до конца недели.',
      goal: 'Цель продвижения',
      goalPlaceholder: 'увеличить заказы в будние дни',
      channels: 'Каналы',
      language: 'Язык текстов',
      generate: 'Сгенерировать посты',
      generating: 'Генерируем...',
      instagram: 'Instagram посты',
      telegram: 'Telegram посты',
      stories: 'Идеи для Stories',
      hashtags: 'Хэштеги',
      copy: 'Скопировать',
      copied: 'Скопировано!',
      hint: 'Заполните форму и нажмите "Сгенерировать" чтобы получить готовые тексты',
      promoTitle: 'Это бесплатный инструмент от Delever',
      promoText: 'Внутри Delever — полноценная система для онлайн-продаж и доставки. Подключим ваш ресторан за 1 день.',
      promoButton: 'Оставить заявку',
      russian: 'Русский',
      uzbek: 'Узбекский',
      english: 'English',
    },
    uz: {
      title: 'AI marketing postlar generatori',
      subtitle: "Instagram, Telegram va Stories uchun sotuvchi matnlarni soniyalar ichida yarating",
      brandName: 'Korxona nomi',
      brandNamePlaceholder: "Masalan: Yaponamama",
      cuisine: 'Oshxona turi',
      cuisinePlaceholder: "fastfud, panosiyo, o'zbek...",
      promo: "Taom yoki aksiya tavsifi",
      promoPlaceholder: "Ikki barobar pishloqli yangi Margarita pitsa. Hafta oxirigacha 20% chegirma.",
      goal: "Reklama maqsadi",
      goalPlaceholder: "ish kunlarida buyurtmalarni ko'paytirish",
      channels: 'Kanallar',
      language: 'Matn tili',
      generate: 'Postlarni yaratish',
      generating: 'Yaratilmoqda...',
      instagram: 'Instagram postlar',
      telegram: 'Telegram postlar',
      stories: 'Stories g\'oyalari',
      hashtags: 'Xeshteglar',
      copy: 'Nusxalash',
      copied: 'Nusxalandi!',
      hint: "Formani to'ldiring va tayyor matnlarni olish uchun \"Yaratish\" tugmasini bosing",
      promoTitle: "Bu Delever'dan bepul vosita",
      promoText: "Delever ichida onlayn savdo va yetkazib berish uchun to'liq tizim mavjud. Restoraningizni 1 kunda ulaymiz.",
      promoButton: "Ariza qoldirish",
      russian: 'Ruscha',
      uzbek: "O'zbekcha",
      english: 'Inglizcha',
    },
    en: {
      title: 'AI Marketing Post Generator',
      subtitle: 'Create engaging content for Instagram, Telegram and Stories in seconds',
      brandName: 'Restaurant Name',
      brandNamePlaceholder: 'e.g. Yaponamama',
      cuisine: 'Cuisine Type',
      cuisinePlaceholder: 'fast food, pan-asian, uzbek...',
      promo: 'Dish or Promotion Description',
      promoPlaceholder: 'New Margherita pizza with double cheese. 20% off until weekend.',
      goal: 'Promotion Goal',
      goalPlaceholder: 'increase weekday orders',
      channels: 'Channels',
      language: 'Content Language',
      generate: 'Generate Posts',
      generating: 'Generating...',
      instagram: 'Instagram Posts',
      telegram: 'Telegram Posts',
      stories: 'Stories Ideas',
      hashtags: 'Hashtags',
      copy: 'Copy',
      copied: 'Copied!',
      hint: 'Fill the form and click "Generate" to get ready-to-use content',
      promoTitle: 'This is a free tool by Delever',
      promoText: 'Delever offers a complete system for online sales and delivery. We can connect your restaurant in 1 day.',
      promoButton: 'Get Started',
      russian: 'Russian',
      uzbek: 'Uzbek',
      english: 'English',
    }
  }

  const txt = t[language] || t.ru

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  return (
    <>
      <SEO 
        title={language === 'en' ? 'AI Marketing Post Generator' : language === 'uz' ? 'AI Marketing Postlar Generatori' : 'AI-генератор маркетинговых постов'}
        description={language === 'en' 
          ? 'Free AI tool to generate marketing posts for restaurants. Create Instagram, Telegram and Stories content in seconds.'
          : language === 'uz'
          ? "Restoranlar uchun marketing postlarini yaratuvchi bepul AI vosita. Instagram, Telegram va Stories kontentini soniyalar ichida yarating."
          : 'Бесплатный AI-инструмент для создания маркетинговых постов для ресторанов. Создайте контент для Instagram, Telegram и Stories за секунды.'
        }
        keywords="AI marketing, restaurant marketing, social media posts, Instagram posts generator, Telegram posts, food marketing, Delever"
      />

      <div className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Wand2 className="w-4 h-4" />
              AI-powered • Бесплатно
            </motion.div>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3">
              {txt.title}
            </h1>
            <p className="text-lg text-brand-darkBlue/70 max-w-2xl mx-auto">
              {txt.subtitle}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="space-y-5">
                  {/* Brand Name */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      <Utensils className="w-4 h-4 inline mr-1.5" />
                      {txt.brandName}
                    </label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={e => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                      placeholder={txt.brandNamePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Cuisine */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      {txt.cuisine}
                    </label>
                    <input
                      type="text"
                      value={formData.cuisine}
                      onChange={e => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                      placeholder={txt.cuisinePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>

                  {/* Promo Description */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      <Sparkles className="w-4 h-4 inline mr-1.5" />
                      {txt.promo}
                    </label>
                    <textarea
                      value={formData.promoDescription}
                      onChange={e => setFormData(prev => ({ ...prev, promoDescription: e.target.value }))}
                      placeholder={txt.promoPlaceholder}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      <Target className="w-4 h-4 inline mr-1.5" />
                      {txt.goal}
                    </label>
                    <input
                      type="text"
                      value={formData.goal}
                      onChange={e => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                      placeholder={txt.goalPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>

                  {/* Channels */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-2">
                      {txt.channels}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-purple-500' },
                        { id: 'telegram', icon: Send, label: 'Telegram', color: 'from-blue-400 to-blue-500' },
                        { id: 'stories', icon: Film, label: 'Stories', color: 'from-orange-400 to-pink-500' },
                      ].map(channel => (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => toggleChannel(channel.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.channels.includes(channel.id)
                              ? `bg-gradient-to-r ${channel.color} text-white shadow-md`
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <channel.icon className="w-4 h-4" />
                          {channel.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      <Languages className="w-4 h-4 inline mr-1.5" />
                      {txt.language}
                    </label>
                    <select
                      value={formData.language}
                      onChange={e => setFormData(prev => ({ ...prev, language: e.target.value as 'ru' | 'uz' | 'en' }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
                    >
                      <option value="ru">🇷🇺 {txt.russian}</option>
                      <option value="uz">🇺🇿 {txt.uzbek}</option>
                      <option value="en">🇬🇧 {txt.english}</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {txt.generating}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {txt.generate}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}

                {!result && !isLoading && !error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-100"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-brand-darkBlue/70">{txt.hint}</p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Instagram Posts */}
                    <ResultBlock
                      title={txt.instagram}
                      icon={Instagram}
                      items={result.instagram_posts}
                      gradient="from-pink-500 to-purple-500"
                      onCopy={copyToClipboard}
                      copiedIndex={copiedIndex}
                    />

                    {/* Telegram Posts */}
                    <ResultBlock
                      title={txt.telegram}
                      icon={Send}
                      items={result.telegram_posts}
                      gradient="from-blue-400 to-blue-600"
                      onCopy={copyToClipboard}
                      copiedIndex={copiedIndex}
                    />

                    {/* Stories Ideas */}
                    <ResultBlock
                      title={txt.stories}
                      icon={Film}
                      items={result.stories_ideas}
                      gradient="from-orange-400 to-pink-500"
                      onCopy={copyToClipboard}
                      copiedIndex={copiedIndex}
                    />

                    {/* Hashtags */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
                            <Hash className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="font-semibold text-brand-darkBlue">{txt.hashtags}</h3>
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.hashtags.join(' '), 'hashtags')}
                          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                        >
                          {copiedIndex === 'hashtags' ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              {txt.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              {txt.copy}
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {result.hashtags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Promo Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-brand-darkBlue to-blue-900 rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              {txt.promoTitle}
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              {txt.promoText}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                onClick={() => setContactFormOpen(true)}
                className="bg-white text-brand-darkBlue hover:bg-white/90"
              >
                {txt.promoButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

// Result Block Component
function ResultBlock({ 
  title, 
  icon: Icon, 
  items, 
  gradient, 
  onCopy, 
  copiedIndex
}: {
  title: string
  icon: React.ElementType
  items: string[]
  gradient: string
  onCopy: (text: string, id: string) => void
  copiedIndex: string | null
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-brand-darkBlue">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => {
          const id = `${title}-${idx}`
          return (
            <div key={idx} className="group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <p className="text-sm text-brand-darkBlue pr-8">{item}</p>
              <button
                onClick={() => onCopy(item, id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-50"
              >
                {copiedIndex === id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

