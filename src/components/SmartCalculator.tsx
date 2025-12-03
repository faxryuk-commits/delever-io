import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign,
  Keyboard,
  GitMerge,
  Truck,
  Rocket,
  Building2,
  Calculator,
  Plus,
  Minus,
  Download,
  ArrowRight,
  ArrowLeft,
  Package,
  Store,
  Layers,
  Sparkles,
  Megaphone,
  TrendingUp,
  Percent,
  Info
} from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { useLocale } from '@/i18n/LocaleContext'

// Типы ситуаций
type Situation = 'commissions' | 'manual' | 'fragmented' | 'migrate' | 'scratch'
type ROIScenario = 'own' | 'integrate' | 'switch'

// Базовые тарифы
const basePlans = [
  { id: 'start', name: 'Start', orders: 1000, priceUZS: 1300000, priceUSD: 150, perOrderUZS: 1950, perOrderUSD: 0.20, popular: false },
  { id: 'medium', name: 'Medium', orders: 3000, priceUZS: 3250000, priceUSD: 280, perOrderUZS: 1950, perOrderUSD: 0.20, popular: true },
  { id: 'big', name: 'Big', orders: 6000, priceUZS: 6500000, priceUSD: 580, perOrderUZS: 1950, perOrderUSD: 0.20, popular: false },
  { id: 'enterprise', name: 'Enterprise', orders: 10000, priceUZS: 13000000, priceUSD: 1100, perOrderUZS: 1950, perOrderUSD: 0.20, popular: false },
]

// Дополнительные модули по категориям
const moduleCategories = [
  {
    id: 'aggregators',
    icon: Layers,
    modules: [
      { id: 'uzum', nameKey: 'calc.module.uzum', priceUZS: 260000, priceUSD: 35, perType: 'branch' as const },
      { id: 'wolt', nameKey: 'calc.module.wolt', priceUZS: 260000, priceUSD: 35, perType: 'branch' as const },
      { id: 'yandex', nameKey: 'calc.module.yandex', priceUZS: 260000, priceUSD: 35, perType: 'branch' as const },
      { id: 'allAggregators', nameKey: 'calc.module.allAggregators', priceUZS: 650000, priceUSD: 100, perType: 'branch' as const },
    ]
  },
  {
    id: 'operations',
    icon: Store,
    modules: [
      { id: 'courier', nameKey: 'calc.module.courier', priceUZS: 195000, priceUSD: 30, perType: 'fixed' as const },
      { id: 'courierApp', nameKey: 'calc.module.courierApp', priceUZS: 260000, priceUSD: 35, perType: 'brand' as const },
      { id: 'kiosk', nameKey: 'calc.module.kiosk', priceUZS: 910000, priceUSD: 90, perType: 'kiosk' as const },
      { id: 'kds', nameKey: 'calc.module.kds', priceUZS: 65000, priceUSD: 10, perType: 'branch' as const },
      { id: 'booking', nameKey: 'calc.module.booking', priceUZS: 130000, priceUSD: 20, perType: 'brand' as const },
      { id: 'callCenter', nameKey: 'calc.module.callCenter', priceUZS: 0, priceUSD: 20, perType: 'fixed' as const },
    ]
  },
  {
    id: 'marketing',
    icon: Megaphone,
    modules: [
      { id: 'marketing', nameKey: 'calc.module.marketing', priceUZS: 390000, priceUSD: 35, perType: 'brand' as const },
      { id: 'dashboard', nameKey: 'calc.module.dashboard', priceUZS: 130000, priceUSD: 20, perType: 'brand' as const },
      { id: 'manager', nameKey: 'calc.module.manager', priceUZS: 1300000, priceUSD: 150, perType: 'brand' as const },
    ]
  },
]

// Ситуации
const situations: { id: Situation; icon: typeof DollarSign; color: string }[] = [
  { id: 'commissions', icon: DollarSign, color: 'from-red-500 to-orange-500' },
  { id: 'manual', icon: Keyboard, color: 'from-purple-500 to-pink-500' },
  { id: 'fragmented', icon: GitMerge, color: 'from-blue-500 to-cyan-500' },
  { id: 'migrate', icon: Truck, color: 'from-amber-500 to-yellow-500' },
  { id: 'scratch', icon: Rocket, color: 'from-emerald-500 to-teal-500' },
]

// ROI сценарии
const roiScenarios: { id: ROIScenario; icon: typeof Store; color: string }[] = [
  { id: 'own', icon: Store, color: 'from-emerald-500 to-teal-500' },
  { id: 'integrate', icon: Layers, color: 'from-purple-500 to-pink-500' },
  { id: 'switch', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
]

export function SmartCalculator() {
  const { t, formatPrice, language } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  
  // Состояние
  const [step, setStep] = useState(1)
  const [situation, setSituation] = useState<Situation | null>(null)
  
  // Параметры бизнеса
  const [branches, setBranches] = useState(3)
  const [brands, setBrands] = useState(1)
  const [kiosks, setKiosks] = useState(0)
  const [monthlyOrders, setMonthlyOrders] = useState(2000)
  const [avgCheck, setAvgCheck] = useState(80000)
  
  // Тариф
  const [selectedPlanId, setSelectedPlanId] = useState('medium')
  
  // Модули
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  
  // ROI параметры
  const [roiScenario, setRoiScenario] = useState<ROIScenario>('switch')
  const [aggregatorFee, setAggregatorFee] = useState(20)
  const [operatorsCount, setOperatorsCount] = useState(2)
  const [operatorSalary, setOperatorSalary] = useState(5000000)
  const [marketingBudget, setMarketingBudget] = useState(5000000)
  const [courierSalary, setCourierSalary] = useState(4000000)
  const [couriersCount, setCouriersCount] = useState(3)
  
  // Получить цену в правильной валюте
  const getPrice = (priceUZS: number, priceUSD: number) => {
    return language === 'en' ? priceUSD : priceUZS
  }
  
  // Текущий тариф
  const selectedPlan = basePlans.find(p => p.id === selectedPlanId) || basePlans[1]
  
  // Расчёт сверхлимита
  const extraOrders = Math.max(0, monthlyOrders - selectedPlan.orders)
  const extraOrdersCost = extraOrders * getPrice(selectedPlan.perOrderUZS, selectedPlan.perOrderUSD)
  
  // Расчёт стоимости модулей
  const calculateModulesCost = () => {
    let cost = 0
    const allModules = moduleCategories.flatMap(c => c.modules)
    
    selectedModules.forEach(moduleId => {
      const module = allModules.find(m => m.id === moduleId)
      if (module) {
        const basePrice = getPrice(module.priceUZS, module.priceUSD)
        switch (module.perType) {
          case 'branch':
            cost += basePrice * branches
            break
          case 'brand':
            cost += basePrice * brands
            break
          case 'kiosk':
            cost += basePrice * Math.max(1, kiosks)
            break
          default:
            cost += basePrice
        }
      }
    })
    return cost
  }
  
  // Общая стоимость
  const planCost = getPrice(selectedPlan.priceUZS, selectedPlan.priceUSD)
  const modulesCost = calculateModulesCost()
  const totalMonthlyCost = planCost + extraOrdersCost + modulesCost
  const deposit = language === 'en' ? 520 : 6500000
  
  // ROI расчёты
  const calculateROI = () => {
    const monthlyRevenue = monthlyOrders * avgCheck
    
    // Своя доставка
    const potentialAggregatorLoss = monthlyRevenue * (aggregatorFee / 100)
    const ownDeliveryProfit = monthlyRevenue - totalMonthlyCost
    
    // Интеграция с агрегаторами
    const operatorsCostSaved = operatorSalary * operatorsCount
    const hoursSaved = Math.round((monthlyOrders * 3) / 60)
    const errorsSaved = monthlyOrders * 0.05 * 0.7 * 5000
    const integrationSavings = operatorsCostSaved + errorsSaved
    
    // Переход с агрегаторов
    const aggregatorCost = monthlyRevenue * (aggregatorFee / 100)
    const couriersCost = couriersCount * courierSalary
    const newCustomersPerMonth = Math.round(monthlyOrders * 0.3)
    const acquisitionCost = newCustomersPerMonth * 15000
    const totalOwnDeliveryCost = totalMonthlyCost + marketingBudget + acquisitionCost + couriersCost
    const switchSavings = aggregatorCost - totalOwnDeliveryCost
    const switchSavingsPercent = aggregatorCost > 0 ? (switchSavings / aggregatorCost) * 100 : 0
    
    return {
      monthlyRevenue,
      potentialAggregatorLoss,
      ownDeliveryProfit,
      operatorsCostSaved,
      hoursSaved,
      errorsSaved,
      integrationSavings,
      aggregatorCost,
      couriersCost,
      acquisitionCost,
      totalOwnDeliveryCost,
      switchSavings,
      switchSavingsPercent,
    }
  }
  
  const roi = calculateROI()
  
  // Переключение модуля
  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }
  
  // Генерация детальной сметы
  const getInvoiceItems = () => {
    const items: { name: string; qty?: string; price: number }[] = []
    
    // Тариф
    items.push({
      name: `${t('calc2.plan')} ${selectedPlan.name} (${t('calc2.upToOrders', { orders: selectedPlan.orders.toLocaleString() })})`,
      price: planCost
    })
    
    // Сверхлимит
    if (extraOrders > 0) {
      items.push({
        name: t('calc2.extraOrders'),
        qty: `${extraOrders} × ${formatPrice(getPrice(selectedPlan.perOrderUZS, selectedPlan.perOrderUSD))}`,
        price: extraOrdersCost
      })
    }
    
    // Модули
    const allModules = moduleCategories.flatMap(c => c.modules)
    selectedModules.forEach(moduleId => {
      const module = allModules.find(m => m.id === moduleId)
      if (module) {
        const basePrice = getPrice(module.priceUZS, module.priceUSD)
        let qty = ''
        let price = basePrice
        
        switch (module.perType) {
          case 'branch':
            qty = `${branches} ${t('calc2.branchesShort')}`
            price = basePrice * branches
            break
          case 'brand':
            qty = `${brands} ${t('calc2.brandsShort')}`
            price = basePrice * brands
            break
          case 'kiosk':
            qty = `${Math.max(1, kiosks)} ${t('calc2.pcs')}`
            price = basePrice * Math.max(1, kiosks)
            break
        }
        
        items.push({
          name: t(module.nameKey),
          qty,
          price
        })
      }
    })
    
    return items
  }
  
  // Генерация КП
  const downloadInvoice = async () => {
    const date = new Date().toLocaleDateString('ru-RU')
    const invoiceNumber = `DEL-${Date.now().toString().slice(-8)}`
    const items = getInvoiceItems()
    
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
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; color: #333; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #002A47; padding-bottom: 20px; }
    .logo { font-size: 28px; font-weight: bold; color: #002A47; }
    .invoice-info { text-align: right; }
    .situation { background: linear-gradient(135deg, #002A47, #004d7a); color: white; padding: 15px 20px; border-radius: 12px; margin-bottom: 30px; display: inline-block; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: bold; color: #002A47; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .params { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
    .param-box { background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center; }
    .param-value { font-size: 24px; font-weight: bold; color: #002A47; }
    .param-label { font-size: 12px; color: #666; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; font-weight: 600; color: #002A47; }
    .text-right { text-align: right; }
    .total-row { background: linear-gradient(135deg, #002A47, #004d7a); color: white; }
    .total-row td { padding: 20px; font-size: 18px; font-weight: bold; border: none; }
    .deposit-row { background: #FFF8E1; }
    .deposit-row td { border-left: 4px solid #FFC107; }
    .benefit { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
    .benefit-label { font-size: 14px; opacity: 0.9; margin-bottom: 10px; }
    .benefit-value { font-size: 36px; font-weight: bold; }
    .roi-section { background: #f0f9ff; padding: 25px; border-radius: 12px; margin: 25px 0; }
    .roi-title { font-weight: bold; color: #002A47; margin-bottom: 15px; }
    .roi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .roi-box { background: white; padding: 15px; border-radius: 8px; }
    .roi-box-title { font-size: 12px; color: #666; margin-bottom: 5px; }
    .roi-box-value { font-size: 20px; font-weight: bold; color: #002A47; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #999; font-size: 12px; }
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

  <div class="situation">${situation ? situationNames[situation] : 'Расчёт стоимости'}</div>

  <div class="section">
    <div class="section-title">Параметры бизнеса</div>
    <div class="params">
      <div class="param-box">
        <div class="param-value">${branches}</div>
        <div class="param-label">Филиалов</div>
      </div>
      <div class="param-box">
        <div class="param-value">${brands}</div>
        <div class="param-label">Брендов</div>
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
    <div class="section-title">Детальная смета</div>
    <table>
      <thead>
        <tr>
          <th>Услуга</th>
          <th>Количество</th>
          <th class="text-right">Стоимость</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty || '—'}</td>
          <td class="text-right">${formatPrice(item.price)}</td>
        </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="2">ИТОГО ежемесячно</td>
          <td class="text-right">${formatPrice(totalMonthlyCost)}</td>
        </tr>
        <tr class="deposit-row">
          <td colspan="2">Депозит (разовый платёж)</td>
          <td class="text-right">${formatPrice(deposit)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  ${roi.switchSavings > 0 ? `
  <div class="benefit">
    <div class="benefit-label">Ваша выгода при переходе с агрегаторов</div>
    <div class="benefit-value">+${formatPrice(roi.switchSavings)}/мес</div>
  </div>

  <div class="roi-section">
    <div class="roi-title">Детальный расчёт ROI</div>
    <div class="roi-grid">
      <div class="roi-box">
        <div class="roi-box-title">Текущие расходы на агрегаторы (${aggregatorFee}%)</div>
        <div class="roi-box-value" style="color: #dc2626;">-${formatPrice(roi.aggregatorCost)}/мес</div>
      </div>
      <div class="roi-box">
        <div class="roi-box-title">Расходы с Delever</div>
        <div class="roi-box-value">-${formatPrice(roi.totalOwnDeliveryCost)}/мес</div>
      </div>
      <div class="roi-box">
        <div class="roi-box-title">Годовая экономия</div>
        <div class="roi-box-value" style="color: #059669;">+${formatPrice(roi.switchSavings * 12)}</div>
      </div>
      <div class="roi-box">
        <div class="roi-box-title">Процент экономии</div>
        <div class="roi-box-value" style="color: #059669;">${Math.round(roi.switchSavingsPercent)}%</div>
      </div>
    </div>
  </div>
  ` : ''}

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
          situation: situation ? situationNames[situation] : 'Прямой расчёт',
          plan: selectedPlan.name,
          branches,
          brands,
          monthlyOrders,
          avgCheck: formatPrice(avgCheck),
          modules: selectedModules.join(', '),
          monthlyTotal: formatPrice(totalMonthlyCost),
          deposit: formatPrice(deposit),
          benefit: roi.switchSavings > 0 ? formatPrice(roi.switchSavings) : '—',
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
  
  // ============ РЕНДЕР ============
  
  // Шаг 1: Выбор ситуации
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {situations.map((sit) => {
          const Icon = sit.icon
          const isSelected = situation === sit.id
          return (
            <button
              key={sit.id}
              onClick={() => setSituation(sit.id)}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                isSelected 
                  ? `border-transparent bg-gradient-to-r ${sit.color} text-white shadow-lg scale-[1.02]` 
                  : 'border-brand-lightTeal/30 hover:border-brand-darkBlue/30 bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                isSelected ? 'bg-white/20' : `bg-gradient-to-r ${sit.color}`
              }`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                {t(`calc2.situation.${sit.id}`)}
              </h3>
              <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-brand-darkBlue/60'}`}>
                {t(`calc2.situation.${sit.id}.desc`)}
              </p>
            </button>
          )
        })}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline"
          onClick={() => {
            setSituation(null)
            setStep(2)
          }}
          className="border-brand-darkBlue/30"
        >
          {t('calc2.skipToCalculator')}
        </Button>
        {situation && (
          <Button onClick={() => setStep(2)}>
            {t('calc2.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
  
  // Шаг 2: Параметры + Тарифы + Модули + ROI
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Кнопка назад */}
      <button 
        onClick={() => setStep(1)}
        className="flex items-center gap-2 text-brand-darkBlue/60 hover:text-brand-darkBlue transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('calc2.back')}
      </button>
      
      {/* Контекст ситуации */}
      {situation && (
        <div className={`bg-gradient-to-r ${situations.find(s => s.id === situation)?.color} rounded-2xl p-4 text-white flex items-center gap-3`}>
          {(() => {
            const Icon = situations.find(s => s.id === situation)?.icon || DollarSign
            return <Icon className="h-5 w-5" />
          })()}
          <span className="font-medium">{t(`calc2.situation.${situation}`)}</span>
        </div>
      )}
      
      {/* Параметры бизнеса */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
        <h3 className="text-lg font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-brand-blue" />
          {t('calc2.step2.title')}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Филиалы */}
          <div>
            <label className="text-sm text-brand-darkBlue/60 mb-2 block">{t('calc2.branches')}</label>
            <div className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-xl p-2">
              <button 
                onClick={() => setBranches(Math.max(1, branches - 1))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-bold text-brand-darkBlue flex-1 text-center">{branches}</span>
              <button 
                onClick={() => setBranches(branches + 1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Бренды */}
          <div>
            <label className="text-sm text-brand-darkBlue/60 mb-2 block">{t('calc2.brands')}</label>
            <div className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-xl p-2">
              <button 
                onClick={() => setBrands(Math.max(1, brands - 1))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-bold text-brand-darkBlue flex-1 text-center">{brands}</span>
              <button 
                onClick={() => setBrands(brands + 1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Заказы */}
          <div>
            <label className="text-sm text-brand-darkBlue/60 mb-2 block">{t('calc2.ordersPerMonth')}</label>
            <div className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-xl p-2">
              <button 
                onClick={() => setMonthlyOrders(Math.max(100, monthlyOrders - 500))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-bold text-brand-darkBlue flex-1 text-center">{monthlyOrders.toLocaleString()}</span>
              <button 
                onClick={() => setMonthlyOrders(monthlyOrders + 500)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Средний чек */}
          <div>
            <label className="text-sm text-brand-darkBlue/60 mb-2 block">{t('calc2.avgCheck')}</label>
            <div className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-xl p-2">
              <button 
                onClick={() => setAvgCheck(Math.max(10000, avgCheck - 10000))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-bold text-brand-darkBlue flex-1 text-center">{formatPrice(avgCheck)}</span>
              <button 
                onClick={() => setAvgCheck(avgCheck + 10000)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Все тарифы */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
        <h3 className="text-lg font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-yellow" />
          {t('calc2.selectPlan')}
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {basePlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id
            const isRecommended = monthlyOrders <= plan.orders && 
              (basePlans.indexOf(plan) === 0 || monthlyOrders > basePlans[basePlans.indexOf(plan) - 1].orders)
            
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected 
                    ? 'border-brand-darkBlue bg-brand-darkBlue text-white shadow-lg' 
                    : 'border-brand-lightTeal/30 bg-white hover:border-brand-darkBlue/30'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-green text-white text-xs px-2 py-0.5 rounded-full">
                    {t('calc2.popular')}
                  </span>
                )}
                {isRecommended && !plan.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full">
                    {t('calc2.recommended')}
                  </span>
                )}
                
                <div className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                  {plan.name}
                </div>
                <div className={`text-sm mb-3 ${isSelected ? 'text-white/70' : 'text-brand-darkBlue/60'}`}>
                  {t('calc2.upToOrders', { orders: plan.orders.toLocaleString() })}
                </div>
                <div className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                  {formatPrice(getPrice(plan.priceUZS, plan.priceUSD))}
                </div>
                <div className={`text-xs ${isSelected ? 'text-white/60' : 'text-brand-darkBlue/50'}`}>
                  +{formatPrice(getPrice(plan.perOrderUZS, plan.perOrderUSD))}/{t('calc2.orderAfterLimit')}
                </div>
              </button>
            )
          })}
        </div>
        
        {extraOrders > 0 && (
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-600" />
            <span className="text-sm text-amber-800">
              {t('calc2.extraOrdersNote', { 
                extra: extraOrders.toLocaleString(), 
                cost: formatPrice(extraOrdersCost) 
              })}
            </span>
          </div>
        )}
      </div>
      
      {/* Все модули по категориям */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightTeal/20">
        <h3 className="text-lg font-bold text-brand-darkBlue mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-brand-orange" />
          {t('calc2.additionalModules')}
        </h3>
        
        <div className="space-y-4">
          {moduleCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <div key={category.id} className="border border-brand-lightTeal/20 rounded-xl overflow-hidden">
                <div className="bg-brand-lightBeige/30 px-4 py-3 flex items-center gap-2">
                  <CategoryIcon className="h-4 w-4 text-brand-darkBlue/60" />
                  <span className="font-medium text-brand-darkBlue">{t(`calc2.category.${category.id}`)}</span>
                </div>
                <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {category.modules.map((module) => {
                    const isSelected = selectedModules.includes(module.id)
                    const basePrice = getPrice(module.priceUZS, module.priceUSD)
                    let multiplier = 1
                    let multiplierText = ''
                    
                    switch (module.perType) {
                      case 'branch':
                        multiplier = branches
                        multiplierText = `× ${branches} ${t('calc2.branchesShort')}`
                        break
                      case 'brand':
                        multiplier = brands
                        multiplierText = `× ${brands} ${t('calc2.brandsShort')}`
                        break
                      case 'kiosk':
                        multiplier = Math.max(1, kiosks)
                        multiplierText = kiosks > 0 ? `× ${kiosks} ${t('calc2.pcs')}` : ''
                        break
                    }
                    
                    return (
                      <label 
                        key={module.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-brand-darkBlue/5 border border-brand-darkBlue/20' 
                            : 'bg-brand-lightBlue/20 hover:bg-brand-lightBlue/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleModule(module.id)}
                            className="w-4 h-4 rounded text-brand-darkBlue"
                          />
                          <div>
                            <div className="font-medium text-brand-darkBlue text-sm">{t(module.nameKey)}</div>
                            {multiplierText && (
                              <div className="text-xs text-brand-darkBlue/50">{multiplierText}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-brand-darkBlue text-sm">
                            {formatPrice(basePrice * multiplier)}
                          </div>
                          {multiplier > 1 && (
                            <div className="text-xs text-brand-darkBlue/50">
                              {formatPrice(basePrice)}/{t(`calc2.per${module.perType.charAt(0).toUpperCase() + module.perType.slice(1)}`)}
                            </div>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>
                
                {/* Кнопка для киосков */}
                {category.id === 'operations' && selectedModules.includes('kiosk') && (
                  <div className="px-4 pb-3">
                    <label className="text-sm text-brand-darkBlue/60 mb-2 block">{t('calc2.kiosksCount')}</label>
                    <div className="flex items-center gap-2 bg-brand-lightBlue/30 rounded-xl p-2 w-fit">
                      <button 
                        onClick={() => setKiosks(Math.max(1, kiosks - 1))}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-xl font-bold text-brand-darkBlue w-12 text-center">{kiosks || 1}</span>
                      <button 
                        onClick={() => setKiosks(kiosks + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-brand-lightBlue transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* ROI Калькулятор */}
      <div className="bg-gradient-to-r from-brand-darkBlue to-blue-900 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('calc2.roiCalculator')}
        </h3>
        
        {/* Сценарии */}
        <div className="flex flex-wrap gap-2 mb-6">
          {roiScenarios.map((scenario) => {
            const Icon = scenario.icon
            return (
              <button
                key={scenario.id}
                onClick={() => setRoiScenario(scenario.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  roiScenario === scenario.id 
                    ? 'bg-white text-brand-darkBlue shadow-lg' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(`calc2.scenario.${scenario.id}`)}
              </button>
            )
          })}
        </div>
        
        {/* Параметры ROI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Комиссия агрегатора */}
          {(roiScenario === 'switch' || roiScenario === 'own') && (
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-xs text-white/70 mb-2 flex items-center gap-1">
                <Percent className="h-3 w-3" />
                {t('calc2.aggregatorFee')}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAggregatorFee(Math.max(10, aggregatorFee - 1))}
                  className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-lg font-bold flex-1 text-center">{aggregatorFee}%</span>
                <button 
                  onClick={() => setAggregatorFee(Math.min(35, aggregatorFee + 1))}
                  className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
          
          {/* Операторы (для интеграции) */}
          {roiScenario === 'integrate' && (
            <>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-white/70 mb-2">{t('calc2.operatorsCount')}</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setOperatorsCount(Math.max(1, operatorsCount - 1))}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-lg font-bold flex-1 text-center">{operatorsCount}</span>
                  <button 
                    onClick={() => setOperatorsCount(operatorsCount + 1)}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-white/70 mb-2">{t('calc2.operatorSalary')}</div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setOperatorSalary(Math.max(2000000, operatorSalary - 500000))}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold flex-1 text-center">{formatPrice(operatorSalary)}</span>
                  <button 
                    onClick={() => setOperatorSalary(operatorSalary + 500000)}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </>
          )}
          
          {/* Расходы на переход */}
          {roiScenario === 'switch' && (
            <>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-white/70 mb-2">{t('calc2.marketingBudget')}</div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setMarketingBudget(Math.max(0, marketingBudget - 1000000))}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold flex-1 text-center">{formatPrice(marketingBudget)}</span>
                  <button 
                    onClick={() => setMarketingBudget(marketingBudget + 1000000)}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-white/70 mb-2">{t('calc2.couriersCount')}</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCouriersCount(Math.max(0, couriersCount - 1))}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-lg font-bold flex-1 text-center">{couriersCount}</span>
                  <button 
                    onClick={() => setCouriersCount(couriersCount + 1)}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-white/70 mb-2">{t('calc2.courierSalary')}</div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCourierSalary(Math.max(2000000, courierSalary - 500000))}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold flex-1 text-center">{formatPrice(courierSalary)}</span>
                  <button 
                    onClick={() => setCourierSalary(courierSalary + 500000)}
                    className="w-6 h-6 rounded bg-white/20 flex items-center justify-center hover:bg-white/30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Результаты ROI */}
        {roiScenario === 'own' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.monthlyRevenue')}</div>
              <div className="text-lg font-bold">{formatPrice(roi.monthlyRevenue)}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.deleverCost')}</div>
              <div className="text-lg font-bold">-{formatPrice(totalMonthlyCost)}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.netProfit')}</div>
              <div className="text-xl font-bold text-brand-green">{formatPrice(roi.ownDeliveryProfit)}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.savedFromAggregators')}</div>
              <div className="text-xl font-bold text-brand-green">+{formatPrice(roi.potentialAggregatorLoss)}</div>
            </div>
          </div>
        )}
        
        {roiScenario === 'integrate' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.operatorsSaved')}</div>
              <div className="text-lg font-bold text-brand-green">+{formatPrice(roi.operatorsCostSaved)}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.hoursSaved')}</div>
              <div className="text-lg font-bold">{roi.hoursSaved} {t('calc2.hours')}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.errorsSaved')}</div>
              <div className="text-lg font-bold text-brand-green">+{formatPrice(roi.errorsSaved)}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <div className="text-xs text-white/70 mb-1">{t('calc2.totalSavings')}</div>
              <div className="text-xl font-bold text-brand-green">+{formatPrice(roi.integrationSavings)}</div>
            </div>
          </div>
        )}
        
        {roiScenario === 'switch' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-500/20 rounded-xl p-4">
                <div className="text-sm text-white/80 mb-2">{t('calc2.withAggregators')}</div>
                <div className="text-2xl font-bold text-red-300">-{formatPrice(roi.aggregatorCost)}/мес</div>
                <div className="text-xs text-white/60">{aggregatorFee}% {t('calc2.fromRevenue')}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-white/80 mb-2">{t('calc2.withOwnDelivery')}</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60">Delever:</span>
                    <span>{formatPrice(totalMonthlyCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">{t('calc2.marketing')}:</span>
                    <span>{formatPrice(marketingBudget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">{t('calc2.couriers')}:</span>
                    <span>{formatPrice(roi.couriersCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/20 font-bold">
                    <span>{t('calc2.total')}:</span>
                    <span>{formatPrice(roi.totalOwnDeliveryCost)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`rounded-xl p-6 text-center ${roi.switchSavings > 0 ? 'bg-emerald-500/30' : 'bg-orange-500/30'}`}>
              <div className="text-sm text-white/80 mb-2">
                {roi.switchSavings > 0 ? t('calc2.yourSavings') : t('calc2.additionalCost')}
              </div>
              <div className={`text-3xl font-bold ${roi.switchSavings > 0 ? 'text-emerald-200' : 'text-orange-200'}`}>
                {roi.switchSavings > 0 ? '+' : ''}{formatPrice(roi.switchSavings)}/мес
              </div>
              {roi.switchSavings > 0 && (
                <div className="text-sm text-white/60 mt-2">
                  {t('calc2.yearSavings')}: {formatPrice(roi.switchSavings * 12)}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Итоговая смета */}
      <div className="bg-white rounded-2xl shadow-sm border border-brand-lightTeal/20 overflow-hidden">
        <div className="bg-brand-darkBlue p-4 text-white flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          <h3 className="text-lg font-bold">{t('calc2.summary')}</h3>
        </div>
        
        <div className="p-4">
          <table className="w-full">
            <tbody>
              {getInvoiceItems().map((item, index) => (
                <tr key={index} className="border-b border-brand-lightTeal/20">
                  <td className="py-3 text-brand-darkBlue">{item.name}</td>
                  <td className="py-3 text-brand-darkBlue/60 text-sm">{item.qty}</td>
                  <td className="py-3 text-right font-bold text-brand-darkBlue">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 pt-4 border-t-2 border-brand-darkBlue">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-brand-darkBlue">{t('calc2.monthlyTotal')}</span>
              <span className="text-2xl font-bold text-brand-darkBlue">{formatPrice(totalMonthlyCost)}</span>
            </div>
            <div className="flex justify-between items-center text-brand-darkBlue/70">
              <span>{t('calc2.deposit')}</span>
              <span className="font-medium">{formatPrice(deposit)}</span>
            </div>
          </div>
          
          {roi.switchSavings > 0 && roiScenario === 'switch' && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-emerald-800 font-medium">{t('calc2.yourBenefit')}</span>
                <span className="text-xl font-bold text-emerald-600">+{formatPrice(roi.switchSavings)}/{t('calc2.month')}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* CTA */}
        <div className="p-4 bg-brand-lightBeige/30 flex flex-col sm:flex-row gap-3 justify-center">
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
      </div>
    </motion.div>
  )

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-brand-lightBeige/50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Индикатор шагов */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 1 ? 'bg-brand-darkBlue text-white' : 'bg-brand-lightTeal/30 text-brand-darkBlue/60'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
            <span className="hidden sm:inline">{t('calc2.stepSituation')}</span>
          </button>
          <div className="w-8 h-0.5 bg-brand-lightTeal/30" />
          <button 
            onClick={() => step > 1 && setStep(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 2 ? 'bg-brand-darkBlue text-white' : 'bg-brand-lightTeal/30 text-brand-darkBlue/60'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
            <span className="hidden sm:inline">{t('calc2.stepCalculator')}</span>
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
        </AnimatePresence>
      </div>
      
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </section>
  )
}
