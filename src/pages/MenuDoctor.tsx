import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, 
  Globe, 
  MapPin, 
  Languages,
  Loader2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  List,
  ChefHat,
  DollarSign,
  Search,
  Sparkles,
  Wand2,
  Mail,
  Building2,
  Send,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import type { MenuDoctorReport } from '@/types/menuDoctor'

const venueTypes = [
  { value: 'fastfood', label: { ru: 'Фастфуд', en: 'Fast food', uz: 'Fastfud' } },
  { value: 'coffee', label: { ru: 'Кофейня', en: 'Coffee shop', uz: 'Qahvaxona' } },
  { value: 'restaurant', label: { ru: 'Ресторан', en: 'Restaurant', uz: 'Restoran' } },
  { value: 'sushi', label: { ru: 'Доставка суши', en: 'Sushi delivery', uz: 'Sushi yetkazish' } },
  { value: 'pizza', label: { ru: 'Пиццерия', en: 'Pizzeria', uz: 'Pitseriya' } },
  { value: 'canteen', label: { ru: 'Столовая', en: 'Canteen', uz: 'Oshxona' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other', uz: 'Boshqa' } },
]

// Magic Animation Component
function MagicAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500 opacity-20 blur-xl absolute inset-0" />
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Stethoscope className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="mt-8 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-teal-500"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
      
      <motion.p
        className="mt-6 text-lg font-medium text-gray-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Анализируем меню...
      </motion.p>
      
      <div className="mt-4 text-sm text-gray-400 text-center max-w-sm">
        Сканируем страницу, находим блюда, цены и категории
      </div>
    </div>
  )
}

// Score Display Component
function ScoreDisplay({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return { text: 'text-green-500', bg: 'from-green-400 to-emerald-500', ring: 'ring-green-200' }
    if (s >= 60) return { text: 'text-yellow-500', bg: 'from-yellow-400 to-orange-500', ring: 'ring-yellow-200' }
    if (s >= 40) return { text: 'text-orange-500', bg: 'from-orange-400 to-red-500', ring: 'ring-orange-200' }
    return { text: 'text-red-500', bg: 'from-red-400 to-rose-500', ring: 'ring-red-200' }
  }
  const colors = getColor(score)

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
      className={`w-32 h-32 rounded-full bg-gradient-to-br ${colors.bg} p-1 shadow-xl ring-4 ${colors.ring}`}
    >
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.span 
            className={`text-4xl font-bold ${colors.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {score}
          </motion.span>
          <div className="text-gray-400 text-sm">/100</div>
        </div>
      </div>
    </motion.div>
  )
}

export function MenuDoctor() {
  const { language } = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<MenuDoctorReport | null>(null)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    menuUrl: '',
    venueType: 'restaurant',
    averageBill: '',
    location: '',
    language: language as 'ru' | 'uz' | 'en',
  })

  const [leadForm, setLeadForm] = useState({
    email: '',
    venueName: '',
    country: '',
    wantImport: false,
  })

  // Rate limiting - 3 минуты между анализами
  const COOLDOWN_SECONDS = 180
  const STORAGE_KEY = 'menu_doctor_last_gen'
  
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  
  useEffect(() => {
    const lastGen = localStorage.getItem(STORAGE_KEY)
    if (lastGen) {
      const elapsed = Math.floor((Date.now() - parseInt(lastGen)) / 1000)
      const remaining = COOLDOWN_SECONDS - elapsed
      if (remaining > 0) {
        setCooldownRemaining(remaining)
      }
    }
  }, [])
  
  useEffect(() => {
    if (cooldownRemaining <= 0) return
    
    const timer = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [cooldownRemaining])
  
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const t = {
    ru: {
      title: 'Menu Doctor — анализ меню по ссылке',
      subtitle: 'Вставьте ссылку на страницу с меню и получите рекомендации по улучшению',
      hint1: 'Работает с сайтами ресторанов, агрегаторами и Delever-страницами',
      hint2: 'Анализ PDF и фото — скоро',
      menuUrl: 'Ссылка на меню',
      menuUrlPlaceholder: 'https://restaurant.uz/menu',
      menuUrlHelp: 'Вставьте ссылку на страницу, где есть меню с блюдами и ценами',
      venueType: 'Тип заведения',
      averageBill: 'Средний чек (опционально)',
      location: 'Город / страна (опционально)',
      reportLanguage: 'Язык отчёта',
      analyze: 'Анализировать меню',
      analyzing: 'Анализируем...',
      errorUrlRequired: 'Введите ссылку на меню',
      errorInvalidUrl: 'Неверный формат ссылки',
      placeholder: 'Вставьте ссылку и нажмите «Анализировать»',
      placeholderDesc: 'AI проанализирует структуру меню и даст рекомендации',
      score: 'Оценка меню',
      scoreExcellent: 'Отличная структура!',
      scoreGood: 'Хорошее меню с потенциалом',
      scoreAverage: 'Есть что улучшить',
      scorePoor: 'Требует доработки',
      summary: 'Общий вывод',
      issues: 'Проблемы',
      recommendations: 'Рекомендации',
      upsellIdeas: 'Идеи для увеличения чека',
      menuStructure: 'Структура меню',
      leadTitle: 'Получите полный отчёт на почту',
      leadSubtitle: 'Детальный анализ + план импорта меню в Delever',
      venueName: 'Название заведения',
      country: 'Страна',
      wantImport: 'Хочу импортировать меню в Delever',
      submit: 'Отправить',
      leadSuccess: 'Заявка отправлена! Мы свяжемся с вами.',
      footer: 'Анализ на базе экспертизы Delever — подключим ваш ресторан за 1 час',
    },
    en: {
      title: 'Menu Doctor — analyze menu by link',
      subtitle: 'Paste a menu page link and get improvement recommendations',
      hint1: 'Works with restaurant sites, aggregators and Delever pages',
      hint2: 'PDF and image analysis — coming soon',
      menuUrl: 'Menu link',
      menuUrlPlaceholder: 'https://restaurant.com/menu',
      menuUrlHelp: 'Paste a link to a page with menu items and prices',
      venueType: 'Venue type',
      averageBill: 'Average check (optional)',
      location: 'City / country (optional)',
      reportLanguage: 'Report language',
      analyze: 'Analyze menu',
      analyzing: 'Analyzing...',
      errorUrlRequired: 'Enter menu link',
      errorInvalidUrl: 'Invalid URL format',
      placeholder: 'Paste a link and click "Analyze"',
      placeholderDesc: 'AI will analyze menu structure and give recommendations',
      score: 'Menu score',
      scoreExcellent: 'Excellent structure!',
      scoreGood: 'Good menu with potential',
      scoreAverage: 'Room for improvement',
      scorePoor: 'Needs work',
      summary: 'Summary',
      issues: 'Issues',
      recommendations: 'Recommendations',
      upsellIdeas: 'Upsell ideas',
      menuStructure: 'Menu structure',
      leadTitle: 'Get full report via email',
      leadSubtitle: 'Detailed analysis + Delever menu import plan',
      venueName: 'Venue name',
      country: 'Country',
      wantImport: 'I want to import menu to Delever',
      submit: 'Submit',
      leadSuccess: 'Request sent! We will contact you.',
      footer: 'Powered by Delever expertise — onboard your restaurant in 1 hour',
    },
    uz: {
      title: 'Menu Doctor — menyuni tahlil qilish',
      subtitle: 'Menyu sahifasiga havola qo\'ying va tavsiyalar oling',
      hint1: 'Restoran saytlari, agregatorlar va Delever sahifalari bilan ishlaydi',
      hint2: 'PDF va rasm tahlili — tez kunda',
      menuUrl: 'Menyu havolasi',
      menuUrlPlaceholder: 'https://restoran.uz/menyu',
      menuUrlHelp: 'Menyu va narxlar bor sahifaga havola qo\'ying',
      venueType: 'Muassasa turi',
      averageBill: 'O\'rtacha chek (ixtiyoriy)',
      location: 'Shahar / mamlakat (ixtiyoriy)',
      reportLanguage: 'Hisobot tili',
      analyze: 'Menyuni tahlil qilish',
      analyzing: 'Tahlil qilinmoqda...',
      errorUrlRequired: 'Menyu havolasini kiriting',
      errorInvalidUrl: 'Noto\'g\'ri havola formati',
      placeholder: 'Havola qo\'ying va "Tahlil qilish" bosing',
      placeholderDesc: 'AI menyu strukturasini tahlil qiladi',
      score: 'Menyu bahosi',
      scoreExcellent: 'Ajoyib struktura!',
      scoreGood: 'Yaxshi menyu',
      scoreAverage: 'Yaxshilash kerak',
      scorePoor: 'Ishlov kerak',
      summary: 'Xulosa',
      issues: 'Muammolar',
      recommendations: 'Tavsiyalar',
      upsellIdeas: 'Chekni oshirish g\'oyalari',
      menuStructure: 'Menyu strukturasi',
      leadTitle: 'Emailga to\'liq hisobot oling',
      leadSubtitle: 'Batafsil tahlil + Deleverga import rejasi',
      venueName: 'Muassasa nomi',
      country: 'Mamlakat',
      wantImport: 'Menyuni Deleverga import qilish',
      submit: 'Yuborish',
      leadSuccess: 'So\'rov yuborildi! Bog\'lanamiz.',
      footer: 'Delever tajribasi asosida — 1 soatda ulaymiz',
    },
  }

  const texts = t[language] || t.ru

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Проверка rate limit
    if (cooldownRemaining > 0) {
      setError(`Подождите ${formatTime(cooldownRemaining)} перед следующим анализом`)
      return
    }
    
    setError(null)
    setReport(null)

    if (!formData.menuUrl.trim()) {
      setError(texts.errorUrlRequired)
      return
    }

    try {
      new URL(formData.menuUrl)
    } catch {
      setError(texts.errorInvalidUrl)
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

      // Проверяем что ответ JSON
      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        // Если не JSON - показываем понятную ошибку
        console.error('API returned non-JSON:', text.slice(0, 200))
        throw new Error('Сервер временно недоступен. Попробуйте через минуту.')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze menu')
      }

      setReport(data)
      
      // Устанавливаем cooldown
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
      setCooldownRemaining(COOLDOWN_SECONDS)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead submitted:', leadForm)
    setLeadSubmitted(true)
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return texts.scoreExcellent
    if (score >= 60) return texts.scoreGood
    if (score >= 40) return texts.scoreAverage
    return texts.scorePoor
  }

  return (
    <>
      <SEO 
        title="Menu Doctor — Анализ меню ресторана"
        description="Анализируйте меню ресторана по ссылке и получайте рекомендации по улучшению структуры и увеличению среднего чека"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-teal-50/30 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white mb-6 shadow-xl shadow-teal-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Stethoscope className="h-10 w-10" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {texts.title}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {texts.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm border border-teal-100">
                <CheckCircle2 className="h-4 w-4" />
                {texts.hint1}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-100">
                <Sparkles className="h-4 w-4" />
                {texts.hint2}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">Данные для анализа</h2>
                    <p className="text-xs text-gray-500">Заполните форму</p>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-5">
                  {/* Menu URL */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Globe className="h-4 w-4 text-teal-600" />
                      {texts.menuUrl}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="url"
                      value={formData.menuUrl}
                      onChange={(e) => setFormData({ ...formData, menuUrl: e.target.value })}
                      placeholder={texts.menuUrlPlaceholder}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">{texts.menuUrlHelp}</p>
                  </div>

                  {/* Venue Type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <ChefHat className="h-4 w-4 text-teal-600" />
                      {texts.venueType}
                    </label>
                    <select
                      value={formData.venueType}
                      onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {venueTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label[language] || type.label.ru}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Average Bill */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                      {texts.averageBill}
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
                      {texts.location}
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
                      {texts.reportLanguage}
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value as 'ru' | 'uz' | 'en' })}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="ru">🇷🇺 Русский</option>
                      <option value="uz">🇺🇿 O'zbekcha</option>
                      <option value="en">🇺🇸 English</option>
                    </select>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading || cooldownRemaining > 0}
                    className={`w-full py-3.5 text-base font-medium shadow-lg ${
                      cooldownRemaining > 0 
                        ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                        : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-teal-500/25'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {texts.analyzing}
                      </>
                    ) : cooldownRemaining > 0 ? (
                      <>
                        <Clock className="h-5 w-5 mr-2" />
                        {formatTime(cooldownRemaining)}
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5 mr-2" />
                        {texts.analyze}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 min-h-[500px] flex items-center justify-center"
                  >
                    <MagicAnimation />
                  </motion.div>
                ) : report ? (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Score Card */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                      <div className="flex items-center gap-8">
                        <ScoreDisplay score={report.score} />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{texts.score}</h3>
                          <p className="text-lg text-gray-600">{getScoreLabel(report.score)}</p>
                          <div className="mt-4 w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                report.score >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                report.score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                report.score >= 40 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                                'bg-gradient-to-r from-red-400 to-rose-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${report.score}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100"
                    >
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-teal-800 mb-3">
                        <CheckCircle2 className="h-5 w-5" />
                        {texts.summary}
                      </h3>
                      <p className="text-teal-700 leading-relaxed">{report.summary}</p>
                    </motion.div>

                    {/* Issues */}
                    {report.issues.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                      >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600 mb-4">
                          <AlertCircle className="h-5 w-5" />
                          {texts.issues}
                        </h3>
                        <ul className="space-y-3">
                          {report.issues.map((issue, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {idx + 1}
                              </span>
                              {issue}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Recommendations */}
                    {report.recommendations.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                      >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-4">
                          <Lightbulb className="h-5 w-5" />
                          {texts.recommendations}
                        </h3>
                        <ul className="space-y-3">
                          {report.recommendations.map((rec, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                ✓
                              </span>
                              {rec}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Upsell Ideas */}
                    {report.upsellIdeas.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
                      >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700 mb-4">
                          <TrendingUp className="h-5 w-5" />
                          {texts.upsellIdeas}
                        </h3>
                        <ul className="space-y-3">
                          {report.upsellIdeas.map((idea, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + idx * 0.1 }}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                                💡
                              </span>
                              {idea}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Menu Structure */}
                    {report.menuStructure && report.menuStructure.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                      >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                          <List className="h-5 w-5" />
                          {texts.menuStructure}
                        </h3>
                        <div className="space-y-4">
                          {report.menuStructure.map((category, catIdx) => (
                            <div key={catIdx} className="border-l-4 border-teal-500 pl-4">
                              <h4 className="font-bold text-gray-800">{category.category}</h4>
                              {category.subcategory && (
                                <p className="text-sm text-gray-500">{category.subcategory}</p>
                              )}
                              <ul className="mt-2 space-y-1">
                                {category.items.slice(0, 5).map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-sm flex justify-between">
                                    <span className="text-gray-700">{item.name}</span>
                                    {item.price && <span className="text-teal-600 font-medium">{item.price}</span>}
                                  </li>
                                ))}
                                {category.items.length > 5 && (
                                  <li className="text-sm text-gray-400">...и ещё {category.items.length - 5} позиций</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 min-h-[500px] flex items-center justify-center"
                  >
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                        <Stethoscope className="h-10 w-10 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {texts.placeholder}
                      </h3>
                      <p className="text-gray-500 max-w-sm">
                        {texts.placeholderDesc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            {leadSubmitted ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">{texts.leadSuccess}</h3>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{texts.leadTitle}</h3>
                <p className="text-gray-600 mb-6">{texts.leadSubtitle}</p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 text-teal-600" />
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        required
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 text-teal-600" />
                        {texts.venueName}
                      </label>
                      <Input
                        type="text"
                        value={leadForm.venueName}
                        onChange={(e) => setLeadForm({ ...leadForm, venueName: e.target.value })}
                        placeholder="Название"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Globe className="h-4 w-4 text-teal-600" />
                      {texts.country}
                    </label>
                    <Input
                      type="text"
                      value={leadForm.country}
                      onChange={(e) => setLeadForm({ ...leadForm, country: e.target.value })}
                      placeholder="Узбекистан"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <input
                      type="checkbox"
                      id="wantImport"
                      checked={leadForm.wantImport}
                      onChange={(e) => setLeadForm({ ...leadForm, wantImport: e.target.checked })}
                      className="h-5 w-5 text-teal-600 rounded"
                    />
                    <label htmlFor="wantImport" className="text-sm text-teal-800 cursor-pointer font-medium">
                      {texts.wantImport}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {texts.submit}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  {texts.footer}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
