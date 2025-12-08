import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, 
  Globe, 
  Languages,
  Loader2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  List,
  Search,
  Sparkles,
  Wand2,
  Mail,
  Building2,
  Send,
  Clock,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'
import type { MenuDoctorReport, GoalSection, ScoreCriteria } from '@/types/menuDoctor'

// Download PDF Function
function downloadPDF(report: MenuDoctorReport, menuUrl: string) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Menu Doctor Report - ${new Date().toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1f2937; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #10b981; }
    .logo { font-size: 28px; font-weight: bold; color: #10b981; margin-bottom: 8px; }
    .subtitle { color: #6b7280; font-size: 14px; }
    .score-section { display: flex; align-items: center; gap: 30px; margin-bottom: 30px; padding: 20px; background: #f0fdf4; border-radius: 12px; }
    .score-circle { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; }
    .score-value { font-size: 36px; font-weight: bold; color: white; }
    .score-info h2 { font-size: 20px; color: #1f2937; margin-bottom: 8px; }
    .summary { background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #10b981; }
    .section { margin-bottom: 30px; }
    .section h3 { font-size: 18px; color: #1f2937; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
    .issue { padding: 12px; background: #fef2f2; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #ef4444; }
    .recommendation { padding: 12px; background: #eff6ff; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #3b82f6; }
    .goal-card { padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 10px; }
    .goal-card strong { color: #1f2937; }
    .goal-card .why { color: #6b7280; font-size: 14px; margin-top: 5px; }
    .goal-card .result { display: inline-block; background: #10b981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; }
    .quick-win { padding: 8px 12px; background: #fef3c7; border-radius: 6px; margin-bottom: 8px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
    .metric { text-align: center; padding: 15px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
    .metric-value { font-size: 24px; font-weight: bold; color: #10b981; }
    .metric-label { font-size: 12px; color: #6b7280; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🩺 Menu Doctor</div>
    <div class="subtitle">Анализ меню: ${menuUrl}</div>
    <div class="subtitle">${new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <span class="score-value">${report.score}</span>
    </div>
    <div class="score-info">
      <h2>Оценка меню: ${report.score}/100</h2>
      <p>${report.score >= 80 ? 'Отличная структура!' : report.score >= 60 ? 'Хорошее меню с потенциалом' : report.score >= 40 ? 'Есть что улучшить' : 'Требует доработки'}</p>
    </div>
  </div>

  ${report.metrics ? `
  <div class="metrics">
    ${report.metrics.totalItems ? `<div class="metric"><div class="metric-value">${report.metrics.totalItems}</div><div class="metric-label">позиций</div></div>` : ''}
    ${report.metrics.categories ? `<div class="metric"><div class="metric-value">${report.metrics.categories}</div><div class="metric-label">категорий</div></div>` : ''}
    ${report.metrics.avgPrice ? `<div class="metric"><div class="metric-value">${report.metrics.avgPrice}</div><div class="metric-label">средняя цена</div></div>` : ''}
    <div class="metric"><div class="metric-value">${report.metrics.hasCombo ? '✓' : '✗'}</div><div class="metric-label">комбо-наборы</div></div>
  </div>
  ` : ''}

  <div class="summary">
    <strong>Общий вывод:</strong><br>
    ${report.summary}
  </div>

  ${report.issues?.length ? `
  <div class="section">
    <h3>⚠️ Проблемы</h3>
    ${report.issues.map(issue => `<div class="issue">${issue}</div>`).join('')}
  </div>
  ` : ''}

  ${report.goalSales?.items?.length ? `
  <div class="section">
    <h3>📈 Для роста продаж</h3>
    ${report.goalSales.items.map(item => `
      <div class="goal-card">
        <strong>${item.action}</strong>
        ${item.why ? `<div class="why">Почему: ${item.why}</div>` : ''}
        ${item.how ? `<div class="why">Как: ${item.how}</div>` : ''}
        ${item.result ? `<span class="result">${item.result}</span>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${report.goalCheck?.items?.length ? `
  <div class="section">
    <h3>💰 Для увеличения чека</h3>
    ${report.goalCheck.items.map(item => `
      <div class="goal-card">
        <strong>${item.action}</strong>
        ${item.why ? `<div class="why">Почему: ${item.why}</div>` : ''}
        ${item.how ? `<div class="why">Как: ${item.how}</div>` : ''}
        ${item.result ? `<span class="result">${item.result}</span>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${report.quickWins?.items?.length ? `
  <div class="section">
    <h3>⚡ Быстрые победы</h3>
    ${report.quickWins.items.map(item => `<div class="quick-win">→ ${item}</div>`).join('')}
  </div>
  ` : ''}

  ${report.recommendations?.length && !report.goalSales ? `
  <div class="section">
    <h3>💡 Рекомендации</h3>
    ${report.recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
  </div>
  ` : ''}

  <div class="footer">
    <p>Отчёт сгенерирован Menu Doctor by Delever</p>
    <p>delever.uz • support@delever.uz</p>
  </div>

  <script>window.onload = () => window.print()</script>
</body>
</html>`

  printWindow.document.write(html)
  printWindow.document.close()
}

// Feedback Component
function FeedbackSection() {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  const [showResponse, setShowResponse] = useState(false)

  const positiveResponses = [
    { emoji: '🎉', title: 'Отлично!', text: 'Рады, что анализ оказался полезным! Теперь ваше меню станет ещё прибыльнее 💰', joke: 'P.S. Пицца с ананасами — это нормально. Мы не осуждаем 🍍' },
    { emoji: '🚀', title: 'Супер!', text: 'Ваш путь к идеальному меню начался! Внедряйте рекомендации и считайте прибыль', joke: 'Помните: голодный клиент — щедрый клиент 😄' },
    { emoji: '⭐', title: 'Великолепно!', text: 'Спасибо за высокую оценку! Мы старались сделать анализ максимально полезным', joke: 'Интересный факт: шеф-повара никогда не едят то, что готовят. Они слишком заняты 👨‍🍳' },
  ]

  const negativeResponses = [
    { emoji: '🤝', title: 'Спасибо за честность!', text: 'Ваш отзыв поможет нам стать лучше. Мы работаем над улучшением алгоритмов!', joke: 'Даже великие шеф-повара иногда пересаливают суп. Мы тоже учимся! 🧂' },
    { emoji: '💪', title: 'Принято!', text: 'Мы ценим вашу обратную связь. В следующей версии будет круче!', joke: 'Знаете, первый iPhone тоже не все оценили. А мы верим в себя! 📱' },
    { emoji: '🙏', title: 'Благодарим!', text: 'Критика делает нас сильнее. Расскажите подробнее на support@delever.uz', joke: 'Мы как тесто для пиццы — становимся лучше под давлением 🍕' },
  ]

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type)
    setShowResponse(true)
    // Можно отправить в аналитику
    console.log('Feedback:', type)
  }

  const response = feedback === 'positive' 
    ? positiveResponses[Math.floor(Math.random() * positiveResponses.length)]
    : negativeResponses[Math.floor(Math.random() * negativeResponses.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 border border-gray-200"
    >
      {!showResponse ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Как вам анализ? 
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Ваш отзыв поможет нам стать лучше
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFeedback('positive')}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/25 hover:bg-green-600 transition-colors"
            >
              <ThumbsUp className="w-5 h-5" />
              Полезно!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFeedback('negative')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              <ThumbsDown className="w-5 h-5" />
              Не очень
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-3">{response.emoji}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{response.title}</h3>
          <p className="text-gray-600 mb-3">{response.text}</p>
          <p className="text-sm text-gray-400 italic">{response.joke}</p>
          
          {feedback === 'positive' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-2">Поделитесь с коллегами:</p>
              <div className="flex justify-center gap-2">
                <button className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                  Telegram
                </button>
                <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                  WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

// Goal Card Component
function GoalCard({ goal, color, icon, delay }: { goal: GoalSection; color: 'blue' | 'green' | 'purple'; icon: string; delay: number }) {
  const colors = {
    blue: { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', title: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
    green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', title: 'text-green-700', badge: 'bg-green-100 text-green-700' },
    purple: { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', title: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  }
  const c = colors[color]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${c.bg} rounded-2xl p-6 ${c.border} border`}
    >
      <h3 className={`flex items-center gap-2 text-lg font-semibold ${c.title} mb-4`}>
        {icon} {goal.title}
      </h3>
      <div className="space-y-4">
        {goal.items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + idx * 0.1 }}
            className="bg-white/70 rounded-xl p-4 space-y-2"
          >
            <div className="font-medium text-gray-800">{item.action}</div>
            {item.why && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Почему: </span>{item.why}
              </div>
            )}
            {item.how && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Как: </span>{item.how}
              </div>
            )}
            {item.result && (
              <div className={`inline-block text-sm font-semibold ${c.badge} px-2 py-1 rounded-lg`}>
                {item.result}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Magic Animation Component
function MagicAnimation({ stage }: { stage: 'parsing' | 'metrics' | 'analyzing' }) {
  const stages = {
    parsing: { text: 'Загружаем меню...', subtext: 'Сканируем страницу и извлекаем данные', progress: 33 },
    metrics: { text: 'Считаем метрики...', subtext: 'Анализируем цены, категории и комбо', progress: 66 },
    analyzing: { text: 'Генерируем рекомендации...', subtext: 'AI формирует персональные советы', progress: 90 },
  }
  
  const current = stages[stage]
  
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
      
      {/* Progress bar */}
      <div className="mt-8 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${current.progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Stage indicators */}
      <div className="mt-4 flex gap-4">
        {Object.keys(stages).map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              s === stage ? 'bg-teal-500' : 
              Object.keys(stages).indexOf(stage) > i ? 'bg-teal-300' : 'bg-gray-300'
            }`} />
            <span className={`text-xs ${s === stage ? 'text-teal-600 font-medium' : 'text-gray-400'}`}>
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      
      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-lg font-medium text-gray-600"
      >
        {current.text}
      </motion.p>
      
      <motion.div 
        key={`sub-${stage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-sm text-gray-400 text-center max-w-sm"
      >
        {current.subtext}
      </motion.div>
    </div>
  )
}

// Score Criteria - примерный расчёт из общего score если нет данных
function getScoreCriteria(score: number, provided?: ScoreCriteria) {
  if (provided) return provided
  // Распределяем баллы по критериям (примерно)
  const base = Math.floor(score / 4)
  return {
    structure: Math.min(25, Math.max(5, base + 2)),
    descriptions: Math.min(25, Math.max(5, base - 1)),
    pricing: Math.min(25, Math.max(5, base + 1)),
    upsell: Math.min(25, Math.max(5, base)),
  }
}

// Score Display Component with Criteria
function ScoreDisplay({ score, scoreCriteria }: { score: number; scoreCriteria?: ScoreCriteria }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const criteria = getScoreCriteria(score, scoreCriteria)
  
  const getColor = (s: number) => {
    if (s >= 80) return { text: 'text-green-500', bg: 'from-green-400 to-emerald-500', ring: 'ring-green-200', bar: 'bg-green-500' }
    if (s >= 60) return { text: 'text-yellow-500', bg: 'from-yellow-400 to-orange-500', ring: 'ring-yellow-200', bar: 'bg-yellow-500' }
    if (s >= 40) return { text: 'text-orange-500', bg: 'from-orange-400 to-red-500', ring: 'ring-orange-200', bar: 'bg-orange-500' }
    return { text: 'text-red-500', bg: 'from-red-400 to-rose-500', ring: 'ring-red-200', bar: 'bg-red-500' }
  }
  const colors = getColor(score)

  const criteriaList = [
    { label: 'Структура меню', value: criteria.structure, max: 25, icon: '📋' },
    { label: 'Описания блюд', value: criteria.descriptions, max: 25, icon: '✍️' },
    { label: 'Ценовая стратегия', value: criteria.pricing, max: 25, icon: '💰' },
    { label: 'Потенциал апсейла', value: criteria.upsell, max: 25, icon: '📈' },
  ]

  return (
    <div className="relative">
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
      
      {/* Tooltip trigger */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <HelpCircle className="w-4 h-4 text-gray-400" />
      </button>

      {/* Criteria breakdown */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
          >
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-500" />
              Из чего складывается оценка
            </div>
            <div className="space-y-3">
              {criteriaList.map((c, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{c.icon} {c.label}</span>
                    <span className="font-medium">{c.value}/{c.max}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.value / c.max) * 100}%` }}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                      className={colors.bar}
                      style={{ height: '100%', borderRadius: 'inherit' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
              Методология основана на анализе 1000+ успешных меню ресторанов
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    email: '',
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

  const [analysisStage, setAnalysisStage] = useState<'idle' | 'parsing' | 'metrics' | 'analyzing'>('idle')

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

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Введите корректный email для получения отчёта')
      return
    }

    try {
      new URL(formData.menuUrl)
    } catch {
      setError(texts.errorInvalidUrl)
      return
    }

    setIsLoading(true)
    setAnalysisStage('parsing')

    try {
      // ЭТАП 1: Парсинг меню
      console.log('Stage 1: Parsing...')
      const parseResponse = await fetch('/api/menu-doctor/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.menuUrl }),
      })
      
      if (!parseResponse.ok) {
        const err = await parseResponse.json()
        throw new Error(err.error || 'Не удалось загрузить меню')
      }
      
      const parsed = await parseResponse.json()
      console.log('Parsed:', parsed.items?.length, 'items')
      
      // Проверяем ошибки парсинга
      if (parsed.error) {
        if (parsed.error === 'SPA_NOT_SUPPORTED') {
          throw new Error('Этот сайт загружает меню динамически (SPA). Попробуйте:\n• Ссылку на конкретный продукт\n• PDF меню\n• Сайт с обычным HTML')
        }
        throw new Error(parsed.message || parsed.error)
      }
      
      if (!parsed.items || parsed.items.length === 0) {
        throw new Error('Не удалось найти позиции меню на странице. Попробуйте другую ссылку.')
      }

      // ЭТАП 2: Расчёт метрик
      setAnalysisStage('metrics')
      console.log('Stage 2: Metrics...')
      
      const metricsResponse = await fetch('/api/menu-doctor/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      
      if (!metricsResponse.ok) {
        const err = await metricsResponse.json()
        throw new Error(err.error || 'Не удалось рассчитать метрики')
      }
      
      const metrics = await metricsResponse.json()
      console.log('Metrics:', metrics)

      // ЭТАП 3: AI анализ
      setAnalysisStage('analyzing')
      console.log('Stage 3: Analyzing...')
      
      const analyzeResponse = await fetch('/api/menu-doctor/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parsed,
          metrics,
          email: formData.email,
          language: formData.language,
        }),
      })
      
      if (!analyzeResponse.ok) {
        const err = await analyzeResponse.json()
        throw new Error(err.error || 'Не удалось проанализировать меню')
      }
      
      const result = await analyzeResponse.json()
      console.log('Result:', result)
      
      setReport(result)
      
      // Устанавливаем cooldown
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
      setCooldownRemaining(COOLDOWN_SECONDS)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
      setAnalysisStage('idle')
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

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 text-teal-600" />
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Пришлём детальный отчёт на почту</p>
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
                    <MagicAnimation stage={analysisStage === 'idle' ? 'parsing' : analysisStage} />
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
                        <ScoreDisplay score={report.score} scoreCriteria={report.scoreCriteria} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800 mb-2">{texts.score}</h3>
                              <p className="text-lg text-gray-600">{getScoreLabel(report.score)}</p>
                            </div>
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 }}
                              onClick={() => downloadPDF(report, formData.menuUrl)}
                              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/25"
                            >
                              <Download className="w-4 h-4" />
                              Скачать PDF
                            </motion.button>
                          </div>
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

                    {/* Metrics */}
                    {report.metrics && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                      >
                        {report.metrics.totalItems && (
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                            <div className="text-3xl font-bold text-teal-600">{report.metrics.totalItems}</div>
                            <div className="text-sm text-gray-500 mt-1">позиций</div>
                          </div>
                        )}
                        {report.metrics.categories && (
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                            <div className="text-3xl font-bold text-emerald-600">{report.metrics.categories}</div>
                            <div className="text-sm text-gray-500 mt-1">категорий</div>
                          </div>
                        )}
                        {report.metrics.avgPrice && (
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                            <div className="text-2xl font-bold text-blue-600">{report.metrics.avgPrice}</div>
                            <div className="text-sm text-gray-500 mt-1">средняя цена</div>
                          </div>
                        )}
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                          <div className={`text-3xl font-bold ${report.metrics.hasCombo ? 'text-green-600' : 'text-red-500'}`}>
                            {report.metrics.hasCombo ? (report.metrics.comboCount || '✓') : '✗'}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">комбо-наборы</div>
                        </div>
                      </motion.div>
                    )}

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

                    {/* Goal: Sales */}
                    {report.goalSales && report.goalSales.items?.length > 0 && (
                      <GoalCard goal={report.goalSales} color="blue" icon="📈" delay={0.4} />
                    )}

                    {/* Goal: Average Check */}
                    {report.goalCheck && report.goalCheck.items?.length > 0 && (
                      <GoalCard goal={report.goalCheck} color="green" icon="💰" delay={0.5} />
                    )}

                    {/* Goal: Retention */}
                    {report.goalRetention && report.goalRetention.items?.length > 0 && (
                      <GoalCard goal={report.goalRetention} color="purple" icon="🔄" delay={0.6} />
                    )}

                    {/* Quick Wins */}
                    {report.quickWins && report.quickWins.items?.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
                      >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-700 mb-4">
                          ⚡ {report.quickWins.title}
                        </h3>
                        <ul className="space-y-2">
                          {report.quickWins.items.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + idx * 0.05 }}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="text-orange-500">→</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Fallback: Old Recommendations */}
                    {report.recommendations && report.recommendations.length > 0 && !report.goalSales && (
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

                    {/* Fallback: Old Upsell Ideas */}
                    {report.upsellIdeas && report.upsellIdeas.length > 0 && !report.goalCheck && (
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

                    {/* Feedback Section */}
                    <FeedbackSection />
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
