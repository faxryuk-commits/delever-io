import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign,
  Keyboard,
  GitMerge,
  Truck,
  Rocket,
  Building2,
  ShoppingBag,
  Calculator,
  Plus,
  Minus,
  Users,
  Check,
  Download,
  ArrowRight,
  ArrowLeft,
  Clock,
  Shield,
  Zap,
  Package
} from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { useLocale } from '@/i18n/LocaleContext'

// Типы ситуаций
type Situation = 'commissions' | 'manual' | 'fragmented' | 'migrate' | 'scratch'

// Базовые тарифы
const basePlans = [
  { id: 'start', name: 'Start', orders: 1000, priceUZS: 1300000, priceUSD: 150 },
  { id: 'medium', name: 'Medium', orders: 3000, priceUZS: 3250000, priceUSD: 280 },
  { id: 'big', name: 'Big', orders: 6000, priceUZS: 6500000, priceUSD: 580 },
  { id: 'enterprise', name: 'Enterprise', orders: 10000, priceUZS: 13000000, priceUSD: 1100 },
]

// Дополнительные модули
const modules = {
  aggregators: { id: 'aggregators', priceUZS: 260000, priceUSD: 35, perType: 'branch' },
  allAggregators: { id: 'allAggregators', priceUZS: 650000, priceUSD: 100, perType: 'branch' },
  courier: { id: 'courier', priceUZS: 260000, priceUSD: 35, perType: 'brand' },
  kiosk: { id: 'kiosk', priceUZS: 910000, priceUSD: 90, perType: 'piece' },
  marketing: { id: 'marketing', priceUZS: 390000, priceUSD: 35, perType: 'brand' },
}

// Ситуации с описаниями
const situations: { id: Situation; icon: typeof DollarSign; color: string }[] = [
  { id: 'commissions', icon: DollarSign, color: 'from-red-500 to-orange-500' },
  { id: 'manual', icon: Keyboard, color: 'from-purple-500 to-pink-500' },
  { id: 'fragmented', icon: GitMerge, color: 'from-blue-500 to-cyan-500' },
  { id: 'migrate', icon: Truck, color: 'from-amber-500 to-yellow-500' },
  { id: 'scratch', icon: Rocket, color: 'from-emerald-500 to-teal-500' },
]

export function SmartCalculator() {
  const { t, formatPrice, language } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  
  // Состояние
  const [step, setStep] = useState(1)
  const [situation, setSituation] = useState<Situation | null>(null)
  const [branches, setBranches] = useState(3)
  const [monthlyOrders, setMonthlyOrders] = useState(1500)
  const [avgCheck, setAvgCheck] = useState(80000)
  const [aggregatorFee, setAggregatorFee] = useState(20)
  const [operatorsCount, setOperatorsCount] = useState(2)
  const [operatorSalary, setOperatorSalary] = useState(5000000)
  
  // Выбранные модули
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  
  // Получить цену в правильной валюте
  const getPrice = (priceUZS: number, priceUSD: number) => {
    return language === 'en' ? priceUSD : priceUZS
  }
  
  // Автоподбор тарифа
  const getRecommendedPlan = () => {
    for (const plan of basePlans) {
      if (monthlyOrders <= plan.orders) {
        return plan
      }
    }
    return basePlans[basePlans.length - 1]
  }
  
  const recommendedPlan = getRecommendedPlan()
  
  // Расчёт стоимости модулей
  const calculateModulesCost = () => {
    let cost = 0
    if (selectedModules.includes('aggregators')) {
      cost += getPrice(modules.aggregators.priceUZS, modules.aggregators.priceUSD) * branches
    }
    if (selectedModules.includes('allAggregators')) {
      cost += getPrice(modules.allAggregators.priceUZS, modules.allAggregators.priceUSD) * branches
    }
    if (selectedModules.includes('courier')) {
      cost += getPrice(modules.courier.priceUZS, modules.courier.priceUSD)
    }
    if (selectedModules.includes('marketing')) {
      cost += getPrice(modules.marketing.priceUZS, modules.marketing.priceUSD)
    }
    return cost
  }
  
  // Расчёт выгоды в зависимости от ситуации
  const calculateBenefit = () => {
    const monthlyRevenue = monthlyOrders * avgCheck
    
    switch (situation) {
      case 'commissions': {
        // Экономия на комиссиях агрегаторов
        const aggregatorCost = monthlyRevenue * (aggregatorFee / 100)
        const deleverCost = getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD) + calculateModulesCost()
        return {
          savings: aggregatorCost - deleverCost,
          details: {
            aggregatorCost,
            deleverCost,
          }
        }
      }
      case 'manual': {
        // Экономия на операторах
        const operatorsCost = operatorsCount * operatorSalary
        const errorsSavings = monthlyOrders * 0.05 * 0.7 * 5000 // 5% ошибок, 70% устраняем, 5000 сум/ошибка
        const deleverCost = getPrice(modules.aggregators.priceUZS, modules.aggregators.priceUSD) * branches
        return {
          savings: operatorsCost + errorsSavings - deleverCost,
          details: {
            operatorsCost,
            errorsSavings,
            deleverCost,
            hoursSaved: Math.round((monthlyOrders * 3) / 60), // 3 мин на заказ
          }
        }
      }
      case 'fragmented': {
        // Экономия от объединения (условная оценка)
        const chaosLoss = monthlyRevenue * 0.05 // 5% потерь от хаоса
        const timeSavings = branches * 20 * 50000 // 20 часов в месяц × 50000 сум/час
        const deleverCost = getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD) + calculateModulesCost()
        return {
          savings: chaosLoss + timeSavings - deleverCost,
          details: {
            chaosLoss,
            timeSavings,
            deleverCost,
            hoursSaved: branches * 20,
          }
        }
      }
      case 'migrate': {
        // Переезд — показываем бонусы
        const deleverCost = getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD)
        return {
          savings: 0, // Экономия зависит от текущей системы
          details: {
            deleverCost,
            migrationDays: 3,
            freeFeatures: ['menu', 'clients', 'history', 'zones'],
          }
        }
      }
      case 'scratch': {
        // С нуля — показываем потенциал
        const potentialRevenue = monthlyRevenue
        const deleverCost = getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD)
        return {
          savings: potentialRevenue,
          details: {
            potentialRevenue,
            deleverCost,
            launchDays: 1,
          }
        }
      }
      default:
        return { savings: 0, details: {} }
    }
  }
  
  const benefit = calculateBenefit()
  
  // Общая стоимость
  const totalMonthlyCost = () => {
    if (situation === 'manual') {
      // Только агрегаторы — без базового тарифа
      return getPrice(modules.aggregators.priceUZS, modules.aggregators.priceUSD) * branches
    }
    return getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD) + calculateModulesCost()
  }
  
  // Депозит
  const getDeposit = () => {
    if (situation === 'manual') {
      return language === 'en' ? 600 : 7500000 // Только агрегаторы
    }
    return language === 'en' ? 520 : 6500000 // Полная платформа
  }
  
  // Генерация КП
  const downloadInvoice = async () => {
    const date = new Date().toLocaleDateString('ru-RU')
    const invoiceNumber = `DEL-${Date.now().toString().slice(-8)}`
    
    const situationNames: Record<Situation, string> = {
      commissions: t('calc2.situation.commissions'),
      manual: t('calc2.situation.manual'),
      fragmented: t('calc2.situation.fragmented'),
      migrate: t('calc2.situation.migrate'),
      scratch: t('calc2.situation.scratch'),
    }
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Коммерческое предложение Delever</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #002A47; padding-bottom: 20px; }
    .logo { font-size: 28px; font-weight: bold; color: #002A47; }
    .invoice-info { text-align: right; }
    .situation { background: linear-gradient(135deg, #002A47, #004d7a); color: white; padding: 20px; border-radius: 12px; margin-bottom: 30px; }
    .situation-title { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: bold; color: #002A47; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
    .label { color: #666; }
    .value { font-weight: 600; color: #002A47; }
    .benefit { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
    .benefit-label { font-size: 14px; opacity: 0.9; margin-bottom: 10px; }
    .benefit-value { font-size: 36px; font-weight: bold; }
    .total { background: #f8f9fa; padding: 20px; border-radius: 12px; margin-top: 20px; }
    .total-row { display: flex; justify-content: space-between; padding: 10px 0; }
    .total-main { font-size: 24px; font-weight: bold; color: #002A47; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #999; font-size: 12px; }
    .params { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
    .param-box { background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center; }
    .param-value { font-size: 24px; font-weight: bold; color: #002A47; }
    .param-label { font-size: 12px; color: #666; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🚀 Delever</div>
    <div class="invoice-info">
      <div><strong>Коммерческое предложение</strong></div>
      <div>№ ${invoiceNumber}</div>
      <div>от ${date}</div>
    </div>
  </div>

  <div class="situation">
    <div class="situation-title">${situationNames[situation!]}</div>
  </div>

  <div class="section">
    <div class="section-title">Параметры бизнеса</div>
    <div class="params">
      <div class="param-box">
        <div class="param-value">${branches}</div>
        <div class="param-label">Филиалов</div>
      </div>
      <div class="param-box">
        <div class="param-value">${monthlyOrders.toLocaleString()}</div>
        <div class="param-label">Заказов/мес</div>
      </div>
      <div class="param-box">
        <div class="param-value">${formatPrice(avgCheck)}</div>
        <div class="param-label">Средний чек</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Рекомендуемый тариф: ${recommendedPlan.name}</div>
    <div class="row">
      <span class="label">Базовая стоимость (до ${recommendedPlan.orders.toLocaleString()} заказов)</span>
      <span class="value">${formatPrice(getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD))}</span>
    </div>
    ${selectedModules.length > 0 ? `
    <div class="row">
      <span class="label">Дополнительные модули</span>
      <span class="value">${formatPrice(calculateModulesCost())}</span>
    </div>
    ` : ''}
  </div>

  ${situation !== 'migrate' ? `
  <div class="benefit">
    <div class="benefit-label">${situation === 'scratch' ? 'Потенциальная выручка' : 'Ваша выгода'}</div>
    <div class="benefit-value">${formatPrice(benefit.savings)}/мес</div>
  </div>
  ` : ''}

  <div class="total">
    <div class="total-row">
      <span>Ежемесячная стоимость:</span>
      <span class="total-main">${formatPrice(totalMonthlyCost())}</span>
    </div>
    <div class="total-row">
      <span>Депозит (разовый):</span>
      <span>${formatPrice(getDeposit())}</span>
    </div>
  </div>

  <div class="footer">
    <p>Delever — единая платформа для управления доставкой</p>
    <p>delever.io | support@delever.uz | +998 78 113 98 13</p>
  </div>
</body>
</html>`
    
    // Логируем в Telegram
    try {
      await fetch('/api/log-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: situationNames[situation!],
          plan: recommendedPlan.name,
          branches,
          monthlyOrders,
          avgCheck: formatPrice(avgCheck),
          benefit: formatPrice(benefit.savings),
          monthlyTotal: formatPrice(totalMonthlyCost()),
          deposit: formatPrice(getDeposit()),
          timestamp: new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })
        })
      })
    } catch (error) {
      console.error('Failed to log invoice:', error)
    }
    
    // Скачиваем
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Delever_КП_${invoiceNumber}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  // Рендер шагов
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-brand-darkBlue mb-2 text-center">
        {t('calc2.step1.title')}
      </h2>
      <p className="text-brand-darkBlue/60 mb-8 text-center">
        {t('calc2.step1.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {situations.map((sit) => {
          const Icon = sit.icon
          const isSelected = situation === sit.id
          return (
            <button
              key={sit.id}
              onClick={() => {
                setSituation(sit.id)
                // Автовыбор модулей для некоторых ситуаций
                if (sit.id === 'manual') {
                  setSelectedModules(['aggregators'])
                } else if (sit.id === 'fragmented') {
                  setSelectedModules(['aggregators'])
                } else {
                  setSelectedModules([])
                }
              }}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                isSelected 
                  ? `border-transparent bg-gradient-to-r ${sit.color} text-white shadow-lg scale-[1.02]` 
                  : 'border-brand-lightTeal/30 hover:border-brand-darkBlue/30 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                isSelected ? 'bg-white/20' : `bg-gradient-to-r ${sit.color} bg-opacity-10`
              }`}>
                <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-white'}`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                {t(`calc2.situation.${sit.id}`)}
              </h3>
              <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-brand-darkBlue/60'}`}>
                {t(`calc2.situation.${sit.id}.desc`)}
              </p>
            </button>
          )
        })}
      </div>
      
      {situation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <Button onClick={() => setStep(2)} size="lg">
            {t('calc2.continue')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
  
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button 
        onClick={() => setStep(1)}
        className="flex items-center gap-2 text-brand-darkBlue/60 hover:text-brand-darkBlue mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('calc2.back')}
      </button>
      
      <h2 className="text-2xl md:text-3xl font-bold text-brand-darkBlue mb-2">
        {t('calc2.step2.title')}
      </h2>
      <p className="text-brand-darkBlue/60 mb-8">
        {t('calc2.step2.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Филиалы */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
          <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-4">
            <Building2 className="h-4 w-4" />
            {t('calc2.branches')}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setBranches(Math.max(1, branches - 1))}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Minus className="h-4 w-4 text-brand-darkBlue" />
            </button>
            <span className="text-3xl font-bold text-brand-darkBlue flex-1 text-center">{branches}</span>
            <button 
              onClick={() => setBranches(branches + 1)}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Plus className="h-4 w-4 text-brand-darkBlue" />
            </button>
          </div>
        </div>
        
        {/* Заказы */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
          <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-4">
            <ShoppingBag className="h-4 w-4" />
            {t('calc2.ordersPerMonth')}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMonthlyOrders(Math.max(100, monthlyOrders - 500))}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Minus className="h-4 w-4 text-brand-darkBlue" />
            </button>
            <span className="text-2xl font-bold text-brand-darkBlue flex-1 text-center">{monthlyOrders.toLocaleString()}</span>
            <button 
              onClick={() => setMonthlyOrders(monthlyOrders + 500)}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Plus className="h-4 w-4 text-brand-darkBlue" />
            </button>
          </div>
        </div>
        
        {/* Средний чек */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
          <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-4">
            <Calculator className="h-4 w-4" />
            {t('calc2.avgCheck')}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAvgCheck(Math.max(10000, avgCheck - 10000))}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Minus className="h-4 w-4 text-brand-darkBlue" />
            </button>
            <span className="text-xl font-bold text-brand-darkBlue flex-1 text-center">{formatPrice(avgCheck)}</span>
            <button 
              onClick={() => setAvgCheck(avgCheck + 10000)}
              className="w-10 h-10 rounded-xl bg-brand-lightBlue/50 flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
            >
              <Plus className="h-4 w-4 text-brand-darkBlue" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Дополнительные параметры в зависимости от ситуации */}
      {situation === 'commissions' && (
        <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-100">
          <div className="flex items-center gap-2 text-sm text-red-600 mb-4">
            <DollarSign className="h-4 w-4" />
            {t('calc2.aggregatorFee')}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAggregatorFee(Math.max(10, aggregatorFee - 1))}
              className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <Minus className="h-4 w-4 text-red-600" />
            </button>
            <span className="text-3xl font-bold text-red-600 flex-1 text-center">{aggregatorFee}%</span>
            <button 
              onClick={() => setAggregatorFee(Math.min(35, aggregatorFee + 1))}
              className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <Plus className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
      )}
      
      {situation === 'manual' && (
        <div className="bg-purple-50 rounded-2xl p-6 mb-8 border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-purple-600 mb-4">
                <Users className="h-4 w-4" />
                {t('calc2.operatorsCount')}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setOperatorsCount(Math.max(1, operatorsCount - 1))}
                  className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <Minus className="h-4 w-4 text-purple-600" />
                </button>
                <span className="text-3xl font-bold text-purple-600 flex-1 text-center">{operatorsCount}</span>
                <button 
                  onClick={() => setOperatorsCount(operatorsCount + 1)}
                  className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <Plus className="h-4 w-4 text-purple-600" />
                </button>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-purple-600 mb-4">
                <DollarSign className="h-4 w-4" />
                {t('calc2.operatorSalary')}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setOperatorSalary(Math.max(2000000, operatorSalary - 500000))}
                  className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <Minus className="h-4 w-4 text-purple-600" />
                </button>
                <span className="text-lg font-bold text-purple-600 flex-1 text-center">{formatPrice(operatorSalary)}</span>
                <button 
                  onClick={() => setOperatorSalary(operatorSalary + 500000)}
                  className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <Plus className="h-4 w-4 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <Button onClick={() => setStep(3)} size="lg">
          {t('calc2.calculate')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
  
  const renderStep3 = () => {
    const currentSituation = situations.find(s => s.id === situation)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <button 
          onClick={() => setStep(2)}
          className="flex items-center gap-2 text-brand-darkBlue/60 hover:text-brand-darkBlue mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('calc2.back')}
        </button>
        
        {/* Результат — главная выгода */}
        {situation !== 'migrate' && (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`bg-gradient-to-r ${currentSituation?.color} rounded-3xl p-8 text-white text-center mb-8`}
          >
            <div className="text-lg opacity-90 mb-2">
              {situation === 'scratch' ? t('calc2.result.potential') : t('calc2.result.savings')}
            </div>
            <div className="text-5xl md:text-6xl font-bold mb-2">
              {formatPrice(benefit.savings)}
            </div>
            <div className="text-lg opacity-80">{t('calc2.perMonth')}</div>
            
            {situation === 'commissions' && benefit.details.aggregatorCost && (
              <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-70">{t('calc2.result.aggregatorCost')}</div>
                  <div className="text-xl font-bold">-{formatPrice(benefit.details.aggregatorCost as number)}</div>
                </div>
                <div>
                  <div className="opacity-70">{t('calc2.result.deleverCost')}</div>
                  <div className="text-xl font-bold">-{formatPrice(benefit.details.deleverCost as number)}</div>
                </div>
              </div>
            )}
            
            {situation === 'manual' && benefit.details.operatorsCost && (
              <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="opacity-70">{t('calc2.result.operatorsSaved')}</div>
                  <div className="text-xl font-bold">+{formatPrice(benefit.details.operatorsCost as number)}</div>
                </div>
                <div>
                  <div className="opacity-70">{t('calc2.result.hoursSaved')}</div>
                  <div className="text-xl font-bold">{benefit.details.hoursSaved} ч.</div>
                </div>
                <div>
                  <div className="opacity-70">{t('calc2.result.errorsReduced')}</div>
                  <div className="text-xl font-bold">-70%</div>
                </div>
              </div>
            )}
            
            {situation === 'fragmented' && (
              <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-70">{t('calc2.result.chaosLoss')}</div>
                  <div className="text-xl font-bold">+{formatPrice(benefit.details.chaosLoss as number)}</div>
                </div>
                <div>
                  <div className="opacity-70">{t('calc2.result.hoursSaved')}</div>
                  <div className="text-xl font-bold">{benefit.details.hoursSaved} ч.</div>
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Миграция — особый блок */}
        {situation === 'migrate' && (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">{t('calc2.migrate.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/20 rounded-2xl p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold">{t('calc2.migrate.freeTransfer')}</div>
                <div className="text-sm opacity-80">{t('calc2.migrate.freeTransferDesc')}</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold">{t('calc2.migrate.days', { days: 3 })}</div>
                <div className="text-sm opacity-80">{t('calc2.migrate.daysDesc')}</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold">{t('calc2.migrate.guarantee')}</div>
                <div className="text-sm opacity-80">{t('calc2.migrate.guaranteeDesc')}</div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-medium mb-2">{t('calc2.migrate.whatWeTransfer')}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {t('calc2.migrate.menu')}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {t('calc2.migrate.clients')}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {t('calc2.migrate.history')}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {t('calc2.migrate.zones')}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Быстрый старт — особый блок */}
        {situation === 'scratch' && (
          <div className="bg-white rounded-2xl p-6 mb-8 border border-brand-lightTeal/30">
            <h3 className="text-xl font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand-green" />
              {t('calc2.scratch.whatYouGet')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['site', 'telegram', 'qr', 'pos', 'courier', 'crm'].map(feature => (
                <div key={feature} className="flex items-center gap-2 text-brand-darkBlue/80">
                  <Check className="h-4 w-4 text-brand-green" />
                  {t(`calc2.scratch.feature.${feature}`)}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Рекомендуемый тариф */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-brand-lightTeal/30">
          <h3 className="text-xl font-bold text-brand-darkBlue mb-4">
            {t('calc2.recommendedPlan')}
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-brand-lightBlue/30 rounded-xl mb-4">
            <div>
              <div className="font-bold text-brand-darkBlue text-xl">{recommendedPlan.name}</div>
              <div className="text-sm text-brand-darkBlue/60">
                {t('calc2.upToOrders', { orders: recommendedPlan.orders.toLocaleString() })}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-brand-darkBlue text-2xl">
                {formatPrice(getPrice(recommendedPlan.priceUZS, recommendedPlan.priceUSD))}
              </div>
              <div className="text-sm text-brand-darkBlue/60">{t('calc2.perMonth')}</div>
            </div>
          </div>
          
          {/* Модули */}
          {situation !== 'manual' && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-brand-darkBlue/60 mb-2">
                {t('calc2.additionalModules')}
              </div>
              
              <label className="flex items-center justify-between p-3 bg-brand-lightBeige/30 rounded-xl cursor-pointer hover:bg-brand-lightBeige/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes('aggregators')}
                    onChange={() => {
                      setSelectedModules(prev => 
                        prev.includes('aggregators') 
                          ? prev.filter(m => m !== 'aggregators')
                          : [...prev, 'aggregators']
                      )
                    }}
                    className="w-5 h-5 rounded text-brand-darkBlue"
                  />
                  <div>
                    <div className="font-medium text-brand-darkBlue">{t('calc2.module.aggregators')}</div>
                    <div className="text-sm text-brand-darkBlue/60">{branches} {t('calc2.branchesMultiplier')}</div>
                  </div>
                </div>
                <div className="font-bold text-brand-darkBlue">
                  +{formatPrice(getPrice(modules.aggregators.priceUZS, modules.aggregators.priceUSD) * branches)}
                </div>
              </label>
              
              <label className="flex items-center justify-between p-3 bg-brand-lightBeige/30 rounded-xl cursor-pointer hover:bg-brand-lightBeige/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes('courier')}
                    onChange={() => {
                      setSelectedModules(prev => 
                        prev.includes('courier') 
                          ? prev.filter(m => m !== 'courier')
                          : [...prev, 'courier']
                      )
                    }}
                    className="w-5 h-5 rounded text-brand-darkBlue"
                  />
                  <div>
                    <div className="font-medium text-brand-darkBlue">{t('calc2.module.courier')}</div>
                  </div>
                </div>
                <div className="font-bold text-brand-darkBlue">
                  +{formatPrice(getPrice(modules.courier.priceUZS, modules.courier.priceUSD))}
                </div>
              </label>
              
              <label className="flex items-center justify-between p-3 bg-brand-lightBeige/30 rounded-xl cursor-pointer hover:bg-brand-lightBeige/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes('marketing')}
                    onChange={() => {
                      setSelectedModules(prev => 
                        prev.includes('marketing') 
                          ? prev.filter(m => m !== 'marketing')
                          : [...prev, 'marketing']
                      )
                    }}
                    className="w-5 h-5 rounded text-brand-darkBlue"
                  />
                  <div>
                    <div className="font-medium text-brand-darkBlue">{t('calc2.module.marketing')}</div>
                  </div>
                </div>
                <div className="font-bold text-brand-darkBlue">
                  +{formatPrice(getPrice(modules.marketing.priceUZS, modules.marketing.priceUSD))}
                </div>
              </label>
            </div>
          )}
        </div>
        
        {/* Итого */}
        <div className="bg-brand-darkBlue rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/70">{t('calc2.monthlyTotal')}</div>
            <div className="text-3xl font-bold">{formatPrice(totalMonthlyCost())}</div>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <div className="text-white/70">{t('calc2.deposit')}</div>
            <div className="font-bold">{formatPrice(getDeposit())}</div>
          </div>
          
          {benefit.savings > 0 && situation !== 'migrate' && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-brand-green">{t('calc2.yourBenefit')}</div>
              <div className="text-2xl font-bold text-brand-green">
                +{formatPrice(benefit.savings)}/{t('calc2.month')}
              </div>
            </div>
          )}
        </div>
        
        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={downloadInvoice}
            className="border-brand-darkBlue text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white"
          >
            <Download className="mr-2 h-5 w-5" />
            {t('calc2.downloadKP')}
          </Button>
          <Button 
            size="lg"
            onClick={() => setContactFormOpen(true)}
          >
            <Rocket className="mr-2 h-5 w-5" />
            {t('calc2.start')}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-lightBeige to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Индикатор шагов */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map(num => (
            <div 
              key={num}
              className={`flex items-center ${num < 3 ? 'flex-1 max-w-[100px]' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= num 
                  ? 'bg-brand-darkBlue text-white' 
                  : 'bg-brand-lightTeal/30 text-brand-darkBlue/40'
              }`}>
                {step > num ? <Check className="h-5 w-5" /> : num}
              </div>
              {num < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                  step > num ? 'bg-brand-darkBlue' : 'bg-brand-lightTeal/30'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </AnimatePresence>
      </div>
      
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </section>
  )
}

