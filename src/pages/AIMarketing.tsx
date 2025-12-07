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
  fallback?: boolean
  note?: string
}

interface FormData {
  brandName: string
  cuisine: string
  promoDescription: string
  goal: string
  productUrl?: string
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
  const [isFallback, setIsFallback] = useState(false)
  const [activeTab, setActiveTab] = useState<'instagram' | 'telegram' | 'stories' | 'hashtags'>('instagram')
  
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    cuisine: '',
    promoDescription: '',
    goal: '',
    productUrl: '',
    channels: ['instagram', 'telegram', 'stories'],
    language: 'ru'
  })
  

  const t = {
    ru: {
      title: 'AI-генератор маркетинговых постов',
      subtitle: 'Создайте продающие тексты для Instagram, Telegram и Stories за секунды',
      brandName: 'Название бизнеса',
      brandNamePlaceholder: 'Например: Oqtepa Lavash, Korzinka, Technomart',
      cuisine: 'Тип бизнеса',
      cuisinePlaceholder: 'ресторан, магазин, салон красоты, фитнес...',
      promo: 'Описание товара или акции',
      promoPlaceholder: 'Новая пицца Маргарита. Скидка 20% на всю электронику. Маникюр + педикюр = -30%',
      goal: 'Цель продвижения',
      goalPlaceholder: 'увеличить заказы в будние дни',
      productUrl: 'Ссылка на товар (опционально)',
      productUrlPlaceholder: 'https://example.com/product',
      productUrlHelp: 'Вставьте ссылку на товар, и мы автоматически извлечем описание, фото и компоненты',
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
      promoText: 'Delever — полноценная система для онлайн-продаж и доставки. Подключим ваш бизнес за 1 день.',
      promoButton: 'Оставить заявку',
      russian: 'Русский',
      uzbek: 'Узбекский',
      english: 'English',
    },
    uz: {
      title: 'AI post yaratuvchi',
      subtitle: "Instagram, Telegram va Stories uchun tayyor postlarni bir zumda oling",
      brandName: 'Biznes nomi',
      brandNamePlaceholder: "Masalan: Oqtepa Lavash, Korzinka, Technomart",
      cuisine: 'Biznes turi',
      cuisinePlaceholder: "restoran, do'kon, salon, fitnes...",
      promo: "Mahsulot yoki aksiya haqida",
      promoPlaceholder: "Yangi pizza. Elektronikaga 20% skidka. Manikur + pedikur = -30%",
      goal: "Maqsad",
      goalPlaceholder: "oddiy kunlarda buyurtmani ko'paytirish",
      productUrl: 'Mahsulot linki (majburiy emas)',
      productUrlPlaceholder: 'https://example.com/product',
      productUrlHelp: "Mahsulot linkini qo'ying — tavsif, rasm va tarkibini avtomatik olamiz",
      channels: 'Kanallar',
      language: 'Post tili',
      generate: 'Post yaratish',
      generating: 'Yaratilmoqda...',
      instagram: 'Instagram postlari',
      telegram: 'Telegram postlari',
      stories: 'Stories uchun g\'oyalar',
      hashtags: 'Heshteglar',
      copy: 'Nusxa olish',
      copied: 'Nusxa olindi!',
      hint: "Formani to'ldiring va \"Post yaratish\" tugmasini bosing",
      promoTitle: "Bu Deleverdan bepul xizmat",
      promoText: "Delever — onlayn savdo va yetkazib berish uchun tayyor tizim. Restoraningizni 1 kunda ulaymiz.",
      promoButton: "Ariza qoldirish",
      russian: 'Ruscha',
      uzbek: "O'zbekcha",
      english: 'Inglizcha',
    },
    en: {
      title: 'AI Marketing Post Generator',
      subtitle: 'Create engaging content for Instagram, Telegram and Stories in seconds',
      brandName: 'Business Name',
      brandNamePlaceholder: 'e.g. Oqtepa Lavash, Korzinka, Technomart',
      cuisine: 'Business Type',
      cuisinePlaceholder: 'restaurant, shop, beauty salon, fitness...',
      promo: 'Product or Promotion Description',
      promoPlaceholder: 'New pizza. 20% off electronics. Manicure + pedicure = -30%',
      goal: 'Promotion Goal',
      goalPlaceholder: 'increase weekday orders',
      productUrl: 'Product URL (optional)',
      productUrlPlaceholder: 'https://example.com/product',
      productUrlHelp: 'Paste product link and we will automatically extract description, images and components',
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
      promoText: 'Delever offers a complete system for online sales and delivery. We can connect your business in 1 day.',
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
    setIsFallback(false)

    try {
      const response = await fetch('/api/ai-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      // Проверяем, есть ли ошибка в ответе
      if (data.error && !data.fallback) {
        // Если details - это строка JSON, пытаемся распарсить
        let errorMessage = data.error
        if (data.details) {
          try {
            // Если details - это строка JSON, парсим её
            const detailsObj = typeof data.details === 'string' ? JSON.parse(data.details) : data.details
            if (detailsObj?.error) {
              // Проверяем, является ли это ошибкой блокировки региона
              if (detailsObj.error.code === 'unsupported_country_region_territory' || 
                  detailsObj.error.message?.includes('unsupported_country') ||
                  detailsObj.error.message?.includes('Country, region, or territory not supported')) {
                // Это ошибка региона - используем fallback
                console.log('Region blocked, using fallback')
                setIsFallback(true)
                // Создаем базовый результат
                setResult({
                  instagram_posts: ['🍽️ Специальное предложение от ' + formData.brandName + '!\n\n' + formData.promoDescription + '\n\n📞 +998 78 113 98 13'],
                  telegram_posts: ['🍽️ ' + formData.brandName + '\n\n' + formData.promoDescription + '\n\n📞 Заказ: +998 78 113 98 13'],
                  stories_ideas: ['🔥 ' + formData.promoDescription],
                  hashtags: ['#ресторан', '#доставка', '#акция'],
                  fallback: true
                })
                return
              }
              errorMessage = detailsObj.error.message || errorMessage
            } else {
              errorMessage = typeof data.details === 'string' ? data.details : JSON.stringify(data.details)
            }
          } catch {
            // Если не удалось распарсить, используем как есть
            errorMessage = data.details || errorMessage
          }
        }
        throw new Error(errorMessage || 'Failed to generate content')
      }

      // Если это fallback ответ, отмечаем это
      if (data.fallback) {
        setIsFallback(true)
      }

      // Устанавливаем результат (даже если это fallback)
      setResult(data)
    } catch (err) {
      // Проверяем, не является ли это ошибкой региона
      const errorMsg = err instanceof Error ? err.message : String(err)
      if (errorMsg.includes('unsupported_country') || 
          errorMsg.includes('Country, region, or territory not supported') ||
          errorMsg.includes('request_forbidden')) {
        // Используем fallback вместо ошибки
        setIsFallback(true)
        setResult({
          instagram_posts: ['🍽️ Специальное предложение от ' + formData.brandName + '!\n\n' + formData.promoDescription + '\n\n📞 +998 78 113 98 13'],
          telegram_posts: ['🍽️ ' + formData.brandName + '\n\n' + formData.promoDescription + '\n\n📞 Заказ: +998 78 113 98 13'],
          stories_ideas: ['🔥 ' + formData.promoDescription],
          hashtags: ['#ресторан', '#доставка', '#акция'],
          fallback: true
        })
        setError(null)
      } else {
        setError(errorMsg)
        setResult(null)
      }
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
                    <select
                      value={formData.goal}
                      onChange={e => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
                    >
                      <option value="">{language === 'ru' ? 'Выберите цель...' : language === 'uz' ? 'Maqsadni tanlang...' : 'Select goal...'}</option>
                      <option value="increase_sales">{language === 'ru' ? '📈 Увеличить продажи' : language === 'uz' ? '📈 Sotuvni oshirish' : '📈 Increase sales'}</option>
                      <option value="increase_average_check">{language === 'ru' ? '💰 Рост среднего чека' : language === 'uz' ? '💰 Chekni kattalashtirish' : '💰 Increase average check'}</option>
                      <option value="return_customers">{language === 'ru' ? '🔄 Вернуть ушедших клиентов' : language === 'uz' ? '🔄 Eski mijozlarni qaytarish' : '🔄 Return lost customers'}</option>
                      <option value="promo_discount">{language === 'ru' ? '🎁 Предложить скидку/промокод' : language === 'uz' ? '🎁 Skidka/promokod berish' : '🎁 Offer discount/promo code'}</option>
                      <option value="holiday_promo">{language === 'ru' ? '🎉 Праздничная акция' : language === 'uz' ? '🎉 Bayram aksiyasi' : '🎉 Holiday promotion'}</option>
                      <option value="new_product">{language === 'ru' ? '🆕 Продвижение нового товара' : language === 'uz' ? '🆕 Yangi mahsulotni reklama qilish' : '🆕 Promote new product'}</option>
                      <option value="weekday_boost">{language === 'ru' ? '📅 Увеличить заказы в будние дни' : language === 'uz' ? '📅 Oddiy kunlarda buyurtmani oshirish' : '📅 Increase weekday orders'}</option>
                      <option value="loyalty_program">{language === 'ru' ? '💎 Программа лояльности' : language === 'uz' ? '💎 Doimiy mijozlar uchun bonus' : '💎 Loyalty program'}</option>
                    </select>
                  </div>

                  {/* Product URL */}
                  <div>
                    <label className="block text-sm font-medium text-brand-darkBlue mb-1.5">
                      <Sparkles className="w-4 h-4 inline mr-1.5" />
                      {txt.productUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.productUrl || ''}
                      onChange={e => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                      placeholder={txt.productUrlPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">{txt.productUrlHelp}</p>
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
                    <div className="flex-1">
                      <p className="text-red-700 text-sm font-medium mb-1">{error}</p>
                      <p className="text-red-600 text-xs">
                        Попробуйте позже или свяжитесь с нами: +998 78 113 98 13
                      </p>
                    </div>
                  </motion.div>
                )}

                {isFallback && result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        Используется базовый шаблон
                      </p>
                      <p className="text-amber-600 text-xs mb-2">
                        <strong>Причина:</strong> OpenAI API временно недоступен в вашем регионе из-за географических ограничений. 
                        Мы автоматически создали готовые тексты на основе ваших данных.
                      </p>
                      <p className="text-amber-600 text-xs">
                        💡 <strong>Решение:</strong> Тексты готовы к использованию! Вы можете скопировать их или попробовать снова позже.
                      </p>
                    </div>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 text-center border border-purple-100 relative overflow-hidden"
                  >
                    {/* Анимация волшебства */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-purple-400 rounded-full"
                          initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0,
                            scale: 0
                          }}
                          animate={{
                            y: [null, '-100%'],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [null, Math.random() * 100 + '%']
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    <div className="relative z-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                      >
                        <Wand2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-brand-darkBlue mb-2"
                      >
                        ✨ Генерируем магию...
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-darkBlue/70"
                      >
                        AI создает уникальные тексты для вашего бизнеса
                      </motion.p>
                    </div>
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
                    {/* Табы для переключения категорий */}
                    <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
                      {[
                        { id: 'instagram' as const, icon: Instagram, label: txt.instagram, color: 'from-pink-500 to-purple-500' },
                        { id: 'telegram' as const, icon: Send, label: txt.telegram, color: 'from-blue-400 to-blue-600' },
                        { id: 'stories' as const, icon: Film, label: txt.stories, color: 'from-orange-400 to-pink-500' },
                        { id: 'hashtags' as const, icon: Hash, label: txt.hashtags, color: 'from-gray-600 to-gray-800' },
                      ].map(tab => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              isActive
                                ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                                : 'text-gray-600 hover:bg-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Контент активной категории */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'instagram' && (
                        <motion.div
                          key="instagram"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                              <Instagram className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-brand-darkBlue">{txt.instagram}</h3>
                            <span className="text-xs text-gray-400 ml-auto">{result.instagram_posts.length} постов</span>
                          </div>
                          <div className="grid gap-6">
                            {result.instagram_posts.map((post, idx) => (
                              <InstagramPostMockup
                                key={idx}
                                content={post}
                                brandName={formData.brandName || 'Brand'}
                                onCopy={copyToClipboard}
                                copiedIndex={copiedIndex}
                                id={`instagram-${idx}`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'telegram' && (
                        <motion.div
                          key="telegram"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                              <Send className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-brand-darkBlue">{txt.telegram}</h3>
                            <span className="text-xs text-gray-400 ml-auto">{result.telegram_posts.length} постов</span>
                          </div>
                          <div className="grid gap-6">
                            {result.telegram_posts.map((post, idx) => (
                              <TelegramMessageMockup
                                key={idx}
                                content={post}
                                brandName={formData.brandName || 'Brand'}
                                onCopy={copyToClipboard}
                                copiedIndex={copiedIndex}
                                id={`telegram-${idx}`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'stories' && (
                        <motion.div
                          key="stories"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
                              <Film className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-brand-darkBlue">{txt.stories}</h3>
                            <span className="text-xs text-gray-400 ml-auto">{result.stories_ideas.length} идей</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {result.stories_ideas.map((idea, idx) => (
                              <StoriesMockup
                                key={idx}
                                content={idea}
                                brandName={formData.brandName || 'Brand'}
                                onCopy={copyToClipboard}
                                copiedIndex={copiedIndex}
                                id={`stories-${idx}`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'hashtags' && (
                        <motion.div
                          key="hashtags"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
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

// Instagram Post Mockup Component
function InstagramPostMockup({ 
  content, 
  brandName,
  onCopy, 
  copiedIndex,
  id
}: {
  content: string
  brandName: string
  onCopy: (text: string, id: string) => void
  copiedIndex: string | null
  id: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-gray-700">{brandName.slice(0, 2).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{brandName.toLowerCase().replace(/\s+/g, '_')}</p>
            <p className="text-xs text-gray-500">Реклама</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 flex items-center justify-center relative">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-gray-500">Место для фото</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-gray-800 hover:text-red-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-900 mt-2">1,234 отметок «Нравится»</p>
      </div>

      {/* Caption */}
      <div className="p-3">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{brandName.toLowerCase().replace(/\s+/g, '_')}</span>{' '}
          <span className="whitespace-pre-wrap">{content}</span>
        </p>
        <p className="text-xs text-gray-400 mt-2">2 МИНУТЫ НАЗАД</p>
      </div>

      {/* Copy Button */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => onCopy(content, id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {copiedIndex === id ? (
            <>
              <Check className="w-4 h-4" />
              Скопировано!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Скопировать текст
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Telegram Message Mockup Component
function TelegramMessageMockup({ 
  content, 
  brandName,
  onCopy, 
  copiedIndex,
  id
}: {
  content: string
  brandName: string
  onCopy: (text: string, id: string) => void
  copiedIndex: string | null
  id: string
}) {
  return (
    <div className="bg-[#0e1621] rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#17212b] p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{brandName.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">{brandName}</p>
          <p className="text-xs text-gray-400">канал • 12.5K подписчиков</p>
        </div>
        <Send className="w-5 h-5 text-gray-400" />
      </div>

      {/* Chat Background */}
      <div className="p-4 min-h-[200px]" style={{ backgroundColor: '#0e1621' }}>
        {/* Message Bubble */}
        <div className="bg-[#182533] rounded-2xl rounded-tl-md p-4 max-w-[90%] shadow-sm">
          <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-xs text-gray-400">12:34</span>
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
            </svg>
          </div>
        </div>

        {/* Reactions */}
        <div className="flex gap-2 mt-3 ml-2">
          <span className="bg-[#182533] px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span>🔥</span>
            <span className="text-gray-400">24</span>
          </span>
          <span className="bg-[#182533] px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span>👍</span>
            <span className="text-gray-400">18</span>
          </span>
          <span className="bg-[#182533] px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <span>❤️</span>
            <span className="text-gray-400">12</span>
          </span>
        </div>
      </div>

      {/* Copy Button */}
      <div className="p-3 bg-[#17212b]">
        <button
          onClick={() => onCopy(content, id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {copiedIndex === id ? (
            <>
              <Check className="w-4 h-4" />
              Скопировано!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Скопировать текст
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Stories Mockup Component
function StoriesMockup({ 
  content, 
  brandName,
  onCopy, 
  copiedIndex,
  id
}: {
  content: string
  brandName: string
  onCopy: (text: string, id: string) => void
  copiedIndex: string | null
  id: string
}) {
  return (
    <div className="bg-black rounded-3xl shadow-2xl overflow-hidden max-w-[280px] mx-auto">
      {/* Phone Frame */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        {/* Progress Bar */}
        <div className="absolute top-3 left-3 right-3 flex gap-1">
          <div className="flex-1 h-0.5 bg-white rounded-full" />
          <div className="flex-1 h-0.5 bg-white/40 rounded-full" />
          <div className="flex-1 h-0.5 bg-white/40 rounded-full" />
        </div>

        {/* Header */}
        <div className="absolute top-6 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-xs font-bold text-white">{brandName.slice(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-white text-xs font-medium">{brandName}</p>
              <p className="text-white/60 text-[10px]">2 ч. назад</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 max-w-[220px]">
              <p className="text-white text-sm font-medium leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/20 backdrop-blur rounded-full px-4 py-2">
              <p className="text-white/80 text-sm">Отправить сообщение</p>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Swipe Up Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="text-white/80 text-xs mt-1">Подробнее</span>
        </div>
      </div>

      {/* Copy Button */}
      <div className="p-3 bg-gray-900">
        <button
          onClick={() => onCopy(content, id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {copiedIndex === id ? (
            <>
              <Check className="w-4 h-4" />
              Скопировано!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Скопировать идею
            </>
          )}
        </button>
      </div>
    </div>
  )
}


