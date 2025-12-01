import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  Plus, 
  Minus,
  Calculator,
  Building2,
  Store,
  Monitor,
  Truck,
  Smartphone,
  BarChart3,
  Users,
  Headphones,
  ChefHat,
  Megaphone,
  Calendar,
  LayoutDashboard,
  UserCog,
  Layers,
  Download,
  TrendingUp,
  DollarSign,
  Percent,
  ArrowRight
} from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { useLocale } from '@/i18n/LocaleContext'

// Базовые тарифы
const basePlans = [
  { name: 'Start', orders: 1000, priceUZS: 1300000, perOrderUZS: 1950 },
  { name: 'Medium', orders: 3000, priceUZS: 3250000, perOrderUZS: 1950 },
  { name: 'Big', orders: 6000, priceUZS: 6500000, perOrderUZS: 1950 },
  { name: 'Enterprise', orders: 10000, priceUZS: 13000000, perOrderUZS: 1950 },
]

// Полный функционал платформы
const platformFeatures = [
  {
    category: 'calc.basicFeatures',
    icon: Monitor,
    features: ['POS терминал', 'Telegram бот', 'Сайт компании', 'Колл-центр', 'QR-Меню', 'Платежи'],
  },
  {
    category: 'calc.crmManagement',
    icon: Users,
    features: ['Базовые отчеты', 'CRM система', 'Рассылки', 'Отзывы клиентов', 'RFM анализ', 'Сегментация базы'],
  },
  {
    category: 'calc.staff',
    icon: UserCog,
    features: ['Управление вакансиями', 'Прогнозирование сотрудников', 'Скидки и акции', 'Модуль курьеров (ЗП/Посещение)'],
  },
  {
    category: 'calc.analytics',
    icon: BarChart3,
    features: ['Дашборды', 'ABC-XYZ анализ', 'Дашборд руководителя', 'Прогнозирование заказов'],
  },
  {
    category: 'calc.support',
    icon: Headphones,
    features: ['Тех. поддержка (10:00-18:00)', 'SLA 99.9%', 'Выделенный менеджер*', 'Кастомная интеграция*', 'Доступ к API*'],
  },
]

// Дополнительные модули
const additionalModules = [
  { id: 'uzum', name: 'Uzum Tezkor', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал', category: 'aggregator' },
  { id: 'wolt', name: 'Wolt', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал', category: 'aggregator' },
  { id: 'yandex', name: 'Яндекс Еда', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал', category: 'aggregator' },
  { id: 'allAggregators', name: 'Агрегатор (все)', priceUZS: 650000, icon: Layers, perType: 'branch', label: 'за филиал', category: 'aggregator' },
  { id: 'courier', name: 'Курьер сервис', priceUZS: 195000, icon: Truck, perType: 'fixed', label: '', category: 'operations' },
  { id: 'kiosk', name: 'Киоск', priceUZS: 910000, icon: Monitor, perType: 'kiosk', label: 'за шт.', category: 'operations' },
  { id: 'marketing', name: 'Маркетинг', priceUZS: 390000, icon: Megaphone, perType: 'brand', label: 'за бренд', category: 'marketing' },
  { id: 'booking', name: 'Бронь', priceUZS: 130000, icon: Calendar, perType: 'brand', label: 'за бренд', category: 'operations' },
  { id: 'courierApp', name: 'Курьерское приложение', priceUZS: 260000, icon: Smartphone, perType: 'brand', label: 'за бренд', category: 'operations' },
  { id: 'kds', name: 'Кухня (KDS)', priceUZS: 65000, icon: ChefHat, perType: 'branch', label: 'за филиал', category: 'operations' },
  { id: 'callCenter', name: 'Колл-центр', priceUZS: 0, icon: Headphones, perType: 'fixed', label: '', category: 'operations' },
  { id: 'manager', name: 'Выделенный менеджер', priceUZS: 1300000, icon: UserCog, perType: 'brand', label: 'за бренд', category: 'support' },
  { id: 'dashboard', name: 'Дашборд', priceUZS: 130000, icon: LayoutDashboard, perType: 'brand', label: 'за бренд', category: 'analytics' },
]

// Единоразовые платежи
const oneTimePayments = [
  { id: 'whiteLabel', name: 'White Label приложение', priceUZS: 13000000, icon: Smartphone },
]

export function PricingCalculator() {
  const { t, formatPrice } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const invoiceRef = useRef<HTMLDivElement>(null)
  
  // Состояние калькулятора
  const [branches, setBranches] = useState(1)
  const [brands, setBrands] = useState(1)
  const [kiosks, setKiosks] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [selectedOneTime, setSelectedOneTime] = useState<string[]>([])
  const [extraOrders, setExtraOrders] = useState(0)
  
  // ROI параметры
  const [scenario, setScenario] = useState<'own' | 'integrate' | 'switch'>('switch')
  const [avgCheck, setAvgCheck] = useState(80000) // Средний чек
  const [aggregatorFee, setAggregatorFee] = useState(20) // Комиссия агрегатора %
  const [operatorSalary, setOperatorSalary] = useState(5000000) // Зарплата оператора
  const [operatorsCount, setOperatorsCount] = useState(2) // Кол-во операторов

  const currentPlan = basePlans[selectedPlan]

  // Функция расчёта цены модуля
  const getModulePrice = (module: typeof additionalModules[0]) => {
    switch (module.perType) {
      case 'branch': return module.priceUZS * branches
      case 'brand': return module.priceUZS * brands
      case 'kiosk': return module.priceUZS * Math.max(1, kiosks)
      default: return module.priceUZS
    }
  }

  // Расчёт стоимости
  const calculateTotal = () => {
    let monthly = currentPlan.priceUZS
    monthly += extraOrders * currentPlan.perOrderUZS
    
    selectedModules.forEach(moduleId => {
      const module = additionalModules.find(m => m.id === moduleId)
      if (module) monthly += getModulePrice(module)
    })
    
    let oneTime = 0
    selectedOneTime.forEach(id => {
      const item = oneTimePayments.find(p => p.id === id)
      if (item) oneTime += item.priceUZS
    })
    
    return { monthly, oneTime }
  }

  // ROI расчёты для разных сценариев
  const calculateROI = () => {
    const totalOrders = currentPlan.orders + extraOrders
    const monthlyRevenue = totalOrders * avgCheck
    const deleverCost = calculateTotal().monthly
    
    // Сценарий 1: Своя доставка (нет агрегаторов)
    const potentialAggregatorLoss = monthlyRevenue * (aggregatorFee / 100) // Потенциальные потери если бы был агрегатор
    const ownDeliveryProfit = monthlyRevenue - deleverCost // Чистая прибыль со своей доставки
    
    // Сценарий 2: Интеграция с агрегаторами (автоматизация)
    const operatorsCostSaved = operatorSalary * operatorsCount // Экономия на операторах
    const timePerOrder = 3 // минуты на ручной ввод заказа
    const hoursSaved = (totalOrders * timePerOrder) / 60 // Часов экономии в месяц
    const errorsReduced = 70 // % снижения ошибок
    const errorCostPerOrder = 5000 // Средняя стоимость ошибки в заказе
    const errorsSaved = totalOrders * 0.05 * (errorsReduced / 100) * errorCostPerOrder // 5% заказов с ошибками
    const integrationSavings = operatorsCostSaved + errorsSaved
    
    // Сценарий 3: Переход с агрегаторов
    const aggregatorCost = monthlyRevenue * (aggregatorFee / 100)
    const switchSavings = aggregatorCost - deleverCost
    const switchSavingsPercent = aggregatorCost > 0 ? (switchSavings / aggregatorCost) * 100 : 0
    
    const paybackMonths = switchSavings > 0 ? Math.ceil(calculateTotal().oneTime / switchSavings) : 0
    
    return {
      // Общие
      totalOrders,
      monthlyRevenue,
      deleverCost,
      paybackMonths,
      
      // Своя доставка
      potentialAggregatorLoss,
      ownDeliveryProfit,
      yearOwnProfit: ownDeliveryProfit * 12,
      
      // Интеграция
      operatorsCostSaved,
      hoursSaved,
      errorsReduced,
      errorsSaved,
      integrationSavings,
      yearIntegrationSavings: integrationSavings * 12,
      
      // Переход
      aggregatorCost,
      switchSavings,
      switchSavingsPercent,
      yearSwitchSavings: switchSavings * 12,
    }
  }

  const totals = calculateTotal()
  const roi = calculateROI()

  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const toggleOneTime = (id: string) => {
    setSelectedOneTime(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  // Генерация PDF
  const downloadInvoice = () => {
    const date = new Date().toLocaleDateString('ru-RU')
    const invoiceNumber = `DEL-${Date.now().toString().slice(-8)}`
    
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Коммерческое предложение Delever</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 2px solid #002A47; padding-bottom: 20px; }
    .logo { font-size: 28px; font-weight: bold; color: #002A47; }
    .invoice-info { text-align: right; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: bold; color: #002A47; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .row:last-child { border-bottom: none; }
    .label { color: #666; }
    .value { font-weight: 500; }
    .total-row { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; }
    .total-label { font-size: 16px; color: #666; }
    .total-value { font-size: 24px; font-weight: bold; color: #002A47; }
    .savings { background: #e8f5e9; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .savings-title { color: #2e7d32; font-weight: bold; margin-bottom: 10px; }
    .savings-value { font-size: 28px; font-weight: bold; color: #2e7d32; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px; }
    .params { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
    .param-box { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
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
        <div class="param-value">${kiosks}</div>
        <div class="param-label">Киосков</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Тариф: ${currentPlan.name}</div>
    <div class="row">
      <span class="label">Базовая стоимость (до ${currentPlan.orders.toLocaleString()} заказов)</span>
      <span class="value">${formatPrice(currentPlan.priceUZS)}</span>
    </div>
    ${extraOrders > 0 ? `
    <div class="row">
      <span class="label">Дополнительные заказы (${extraOrders} × ${formatPrice(currentPlan.perOrderUZS)})</span>
      <span class="value">${formatPrice(extraOrders * currentPlan.perOrderUZS)}</span>
    </div>` : ''}
  </div>

  ${selectedModules.length > 0 ? `
  <div class="section">
    <div class="section-title">Дополнительные модули</div>
    ${selectedModules.map(moduleId => {
      const module = additionalModules.find(m => m.id === moduleId)
      if (!module) return ''
      const price = getModulePrice(module)
      let multiplier = ''
      if (module.perType === 'branch' && branches > 1) multiplier = ` × ${branches}`
      if (module.perType === 'brand' && brands > 1) multiplier = ` × ${brands}`
      if (module.perType === 'kiosk' && kiosks > 1) multiplier = ` × ${kiosks}`
      return `
    <div class="row">
      <span class="label">${module.name}${multiplier}</span>
      <span class="value">${formatPrice(price)}</span>
    </div>`
    }).join('')}
  </div>` : ''}

  ${selectedOneTime.length > 0 ? `
  <div class="section">
    <div class="section-title">Единоразовые платежи</div>
    ${selectedOneTime.map(id => {
      const item = oneTimePayments.find(p => p.id === id)
      if (!item) return ''
      return `
    <div class="row">
      <span class="label">${item.name}</span>
      <span class="value">${formatPrice(item.priceUZS)}</span>
    </div>`
    }).join('')}
  </div>` : ''}

  <div class="total-row">
    <div class="row" style="border: none;">
      <span class="total-label">ИТОГО В МЕСЯЦ:</span>
      <span class="total-value">${formatPrice(totals.monthly)}</span>
    </div>
    ${totals.oneTime > 0 ? `
    <div class="row" style="border: none; margin-top: 10px;">
      <span class="label">Единоразово:</span>
      <span class="value">${formatPrice(totals.oneTime)}</span>
    </div>` : ''}
  </div>

  <div class="savings">
    <div class="savings-title">💰 Ваша экономия по сравнению с агрегаторами</div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div class="savings-value">${formatPrice(roi.yearSwitchSavings)}/год</div>
        <div style="color: #666; margin-top: 5px;">${formatPrice(roi.switchSavings)}/месяц</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 32px; font-weight: bold; color: #2e7d32;">${Math.round(roi.switchSavingsPercent)}%</div>
        <div style="color: #666; font-size: 12px;">экономии</div>
      </div>
    </div>
  </div>

  <div class="section" style="margin-top: 30px;">
    <div class="section-title">Депозит</div>
    <div class="row">
      <span class="label">Депозит (используется на оплату подписки)</span>
      <span class="value">${formatPrice(6500000)}</span>
    </div>
  </div>

  <div class="footer">
    <p>Delever — операционная система для доставки</p>
    <p>support@delever.uz | +998 78 113 98 13</p>
    <p>Предложение действительно 30 дней</p>
  </div>
</body>
</html>
    `
    
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Delever_КП_${invoiceNumber}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Сценарии
  const scenarios = [
    { id: 'own', icon: Store, color: 'from-blue-500 to-indigo-500' },
    { id: 'integrate', icon: Layers, color: 'from-purple-500 to-pink-500' },
    { id: 'switch', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ] as const

  return (
    <>
      {/* ROI Section */}
      <motion.div 
        className={`bg-gradient-to-r ${scenarios.find(s => s.id === scenario)?.color} rounded-2xl p-6 lg:p-8 mb-8 text-white`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Scenario Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {scenarios.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  scenario === s.id 
                    ? 'bg-white text-brand-darkBlue shadow-lg' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(`calc.scenario.${s.id}`)}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            {scenario === 'own' && <Store className="h-6 w-6" />}
            {scenario === 'integrate' && <Layers className="h-6 w-6" />}
            {scenario === 'switch' && <TrendingUp className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold">{t(`calc.scenario.${scenario}.title`)}</h3>
            <p className="text-white/80 text-sm">{t(`calc.scenario.${scenario}.subtitle`)}</p>
          </div>
        </div>

        {/* Параметры в зависимости от сценария */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Средний чек - для всех сценариев */}
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <DollarSign className="h-4 w-4" />
              {t('calc.avgCheck')}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setAvgCheck(Math.max(10000, avgCheck - 10000))}
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-bold flex-1 text-center">{formatPrice(avgCheck)}</span>
              <button 
                onClick={() => setAvgCheck(avgCheck + 10000)}
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Для сценариев с агрегаторами */}
          {(scenario === 'switch' || scenario === 'own') && (
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                <Percent className="h-4 w-4" />
                {t('calc.aggregatorFee')}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAggregatorFee(Math.max(10, aggregatorFee - 1))}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-bold flex-1 text-center">{aggregatorFee}%</span>
                <button 
                  onClick={() => setAggregatorFee(Math.min(35, aggregatorFee + 1))}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Для сценария интеграции - зарплата оператора */}
          {scenario === 'integrate' && (
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                <Users className="h-4 w-4" />
                {t('calc.operatorSalary')}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setOperatorSalary(Math.max(2000000, operatorSalary - 500000))}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-bold flex-1 text-center">{formatPrice(operatorSalary)}</span>
                <button 
                  onClick={() => setOperatorSalary(operatorSalary + 500000)}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Для сценария интеграции - кол-во операторов */}
          {scenario === 'integrate' && (
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                <UserCog className="h-4 w-4" />
                {t('calc.operatorsCount')}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setOperatorsCount(Math.max(1, operatorsCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-bold flex-1 text-center">{operatorsCount}</span>
                <button 
                  onClick={() => setOperatorsCount(operatorsCount + 1)}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Количество заказов */}
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Calculator className="h-4 w-4" />
              {t('calc.ordersPerMonth')}
            </div>
            <div className="text-xl font-bold text-center">
              {roi.totalOrders.toLocaleString()}
            </div>
          </div>
        </div>

        {/* ROI Results - для сценария "Своя доставка" */}
        {scenario === 'own' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.monthlyRevenue')}</div>
                <div className="text-lg font-bold">{formatPrice(roi.monthlyRevenue)}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.deleverCost')}</div>
                <div className="text-lg font-bold">-{formatPrice(roi.deleverCost)}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.netProfit')}</div>
                <div className="text-xl font-bold text-yellow-200">{formatPrice(roi.ownDeliveryProfit)}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.yearProfit')}</div>
                <div className="text-xl font-bold text-yellow-200">{formatPrice(roi.yearOwnProfit)}</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <div className="text-center text-white/80 text-sm">
                💡 {t('calc.ownDeliveryNote')} <span className="font-bold text-yellow-200">{formatPrice(roi.potentialAggregatorLoss)}/мес</span>
              </div>
            </div>
          </>
        )}

        {/* ROI Results - для сценария "Интеграция" */}
        {scenario === 'integrate' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.operatorsSaved')}</div>
                <div className="text-lg font-bold text-green-200">+{formatPrice(roi.operatorsCostSaved)}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.hoursSaved')}</div>
                <div className="text-lg font-bold">{Math.round(roi.hoursSaved)} ч.</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.errorsReduced')}</div>
                <div className="text-lg font-bold text-green-200">-{roi.errorsReduced}%</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.errorsSaved')}</div>
                <div className="text-lg font-bold text-green-200">+{formatPrice(roi.errorsSaved)}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.deleverCost')}</div>
                <div className="text-lg font-bold">-{formatPrice(roi.deleverCost)}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.totalSavings')}</div>
                <div className="text-xl font-bold text-yellow-200">+{formatPrice(roi.integrationSavings)}/мес</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.yearlySavings')}</div>
                <div className="text-xl font-bold text-yellow-200">+{formatPrice(roi.yearIntegrationSavings)}/год</div>
              </div>
            </div>
          </>
        )}

        {/* ROI Results - для сценария "Переход с агрегаторов" */}
        {scenario === 'switch' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.aggregatorsCost')}</div>
                <div className="text-lg font-bold text-red-200">-{formatPrice(roi.aggregatorCost)}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.deleverCost')}</div>
                <div className="text-lg font-bold">{formatPrice(roi.deleverCost)}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.monthlySavings')}</div>
                <div className="text-xl font-bold text-yellow-200">+{formatPrice(roi.switchSavings)}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-sm text-white/70 mb-1">{t('calc.yearlySavings')}</div>
                <div className="text-xl font-bold text-yellow-200">+{formatPrice(roi.yearSwitchSavings)}</div>
              </div>
            </div>

            {roi.switchSavings > 0 && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                  <span className="text-white/80">{t('calc.savingsPercent')}:</span>
                  <span className="text-2xl font-bold">{Math.round(roi.switchSavingsPercent)}%</span>
                  {totals.oneTime > 0 && roi.paybackMonths > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-white/80">{t('calc.payback')}:</span>
                      <span className="font-bold">{roi.paybackMonths} {t('calc.months')}</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Info */}
          <motion.div 
            className="bg-white rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {t('calc.businessParams')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Branches */}
              <div className="bg-brand-lightBlue/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-2">
                  <Store className="h-4 w-4" />
                  {t('calc.branches')}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBranches(Math.max(1, branches - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue flex-1 text-center">{branches}</span>
                  <button 
                    onClick={() => setBranches(branches + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Brands */}
              <div className="bg-brand-lightBlue/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-2">
                  <Building2 className="h-4 w-4" />
                  {t('calc.brands')}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBrands(Math.max(1, brands - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue flex-1 text-center">{brands}</span>
                  <button 
                    onClick={() => setBrands(brands + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Kiosks */}
              <div className="bg-brand-lightBlue/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-2">
                  <Monitor className="h-4 w-4" />
                  {t('calc.kiosks')}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setKiosks(Math.max(0, kiosks - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue flex-1 text-center">{kiosks.toString().padStart(2, '0')}</span>
                  <button 
                    onClick={() => setKiosks(kiosks + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Base Plan Selection */}
          <motion.div 
            className="bg-white rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {t('calc.choosePlan')}
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {basePlans.map((plan, idx) => (
                <button
                  key={plan.name}
                  onClick={() => setSelectedPlan(idx)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === idx 
                      ? 'border-brand-darkBlue bg-brand-darkBlue text-white' 
                      : 'border-brand-lightTeal/30 hover:border-brand-darkBlue/30'
                  }`}
                >
                  <div className={`text-lg font-bold ${selectedPlan === idx ? 'text-white' : 'text-brand-darkBlue'}`}>
                    {plan.name}
                  </div>
                  <div className={`text-xs ${selectedPlan === idx ? 'text-white/70' : 'text-brand-darkBlue/50'}`}>
                    {t('calc.upTo')} {plan.orders.toLocaleString()} {t('calc.orders')}
                  </div>
                  <div className={`text-sm font-semibold mt-2 ${selectedPlan === idx ? 'text-white' : 'text-brand-darkBlue'}`}>
                    {formatPrice(plan.priceUZS)}
                  </div>
                </button>
              ))}
            </div>

            {/* Extra Orders */}
            <div className="mt-4 p-4 bg-brand-lightBeige/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-brand-darkBlue">{t('calc.extraOrders')}</div>
                  <div className="text-xs text-brand-darkBlue/50">
                    {t('calc.pricePerOrder')}: {formatPrice(currentPlan.perOrderUZS)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setExtraOrders(Math.max(0, extraOrders - 100))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={extraOrders}
                    onChange={(e) => setExtraOrders(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-20 text-center text-xl font-bold text-brand-darkBlue bg-transparent border-none focus:outline-none"
                  />
                  <button 
                    onClick={() => setExtraOrders(extraOrders + 100)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Modules */}
          <motion.div 
            className="bg-white rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {t('calc.additionalModules')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalModules.map((module) => {
                const Icon = module.icon
                const isSelected = selectedModules.includes(module.id)
                const totalPrice = getModulePrice(module)
                let multiplier = 1
                if (module.perType === 'branch') multiplier = branches
                if (module.perType === 'brand') multiplier = brands
                if (module.perType === 'kiosk') multiplier = Math.max(1, kiosks)
                
                return (
                  <button
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'border-brand-darkBlue bg-brand-darkBlue text-white' 
                        : 'border-brand-lightTeal/30 hover:border-brand-darkBlue/30'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white/20' : 'bg-brand-lightBlue/30'
                    }`}>
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                        {module.name}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-brand-darkBlue/50'}`}>
                        {formatPrice(module.priceUZS)} {module.label}
                        {multiplier > 1 && <span className="font-medium"> × {multiplier} = {formatPrice(totalPrice)}</span>}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-white flex-shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* One-time */}
            <div className="mt-4 pt-4 border-t border-brand-lightTeal/20">
              <h4 className="text-sm font-medium text-brand-darkBlue/60 mb-3">{t('calc.oneTimePayments')}</h4>
              {oneTimePayments.map((item) => {
                const Icon = item.icon
                const isSelected = selectedOneTime.includes(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleOneTime(item.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-brand-lightTeal/30 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-emerald-100' : 'bg-brand-lightBlue/30'
                    }`}>
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-emerald-600' : 'text-brand-darkBlue'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${isSelected ? 'text-emerald-700' : 'text-brand-darkBlue'}`}>
                        {item.name}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-emerald-600' : 'text-brand-darkBlue/50'}`}>
                        {formatPrice(item.priceUZS)} {t('calc.oneTime')}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Invoice */}
        <div className="lg:col-span-1">
          <motion.div 
            ref={invoiceRef}
            className="bg-white rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft sticky top-28"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-darkBlue">{t('calc.costEstimate')}</h3>
              <button
                onClick={downloadInvoice}
                className="flex items-center gap-1.5 text-sm text-brand-darkBlue/60 hover:text-brand-darkBlue transition-colors"
              >
                <Download className="h-4 w-4" />
                {t('calc.download')}
              </button>
            </div>
            
            {/* Business params summary */}
            <div className="flex gap-2 mb-4 text-xs">
              <span className="px-2 py-1 bg-brand-lightBlue/30 rounded-md">{branches} {t('calc.branchesShort')}</span>
              <span className="px-2 py-1 bg-brand-lightBlue/30 rounded-md">{brands} {t('calc.brandsShort')}</span>
              {kiosks > 0 && <span className="px-2 py-1 bg-brand-lightBlue/30 rounded-md">{kiosks} {t('calc.kiosksShort')}</span>}
            </div>

            {/* Plan */}
            <div className="mb-4 pb-4 border-b border-brand-lightTeal/20">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-brand-darkBlue/50 uppercase tracking-wide">{t('calc.plan')}</div>
                  <div className="font-semibold text-brand-darkBlue">{currentPlan.name}</div>
                  <div className="text-xs text-brand-darkBlue/50">{t('calc.upTo')} {currentPlan.orders.toLocaleString()} {t('calc.orders')}</div>
                </div>
                <div className="text-right font-semibold text-brand-darkBlue">
                  {formatPrice(currentPlan.priceUZS)}
                </div>
              </div>
              {extraOrders > 0 && (
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-brand-lightTeal/10">
                  <span className="text-brand-darkBlue/70">+{extraOrders} {t('calc.orders')}</span>
                  <span className="text-brand-darkBlue">{formatPrice(extraOrders * currentPlan.perOrderUZS)}</span>
                </div>
              )}
            </div>

            {/* Modules by category */}
            {selectedModules.length > 0 && (
              <div className="mb-4 pb-4 border-b border-brand-lightTeal/20">
                <div className="text-xs text-brand-darkBlue/50 uppercase tracking-wide mb-2">{t('calc.modules')}</div>
                <div className="space-y-1.5">
                  {selectedModules.map(moduleId => {
                    const module = additionalModules.find(m => m.id === moduleId)
                    if (!module) return null
                    const price = getModulePrice(module)
                    let multiplier = ''
                    if (module.perType === 'branch' && branches > 1) multiplier = `×${branches}`
                    if (module.perType === 'brand' && brands > 1) multiplier = `×${brands}`
                    if (module.perType === 'kiosk' && kiosks > 1) multiplier = `×${kiosks}`
                    
                    return (
                      <div key={moduleId} className="flex justify-between text-sm">
                        <span className="text-brand-darkBlue/70">
                          {module.name}
                          {multiplier && <span className="text-xs ml-1 text-brand-darkBlue/40">{multiplier}</span>}
                        </span>
                        <span className="text-brand-darkBlue font-medium">{formatPrice(price)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Monthly Total */}
            <div className="bg-brand-darkBlue rounded-xl p-4 mb-4">
              <div className="text-sm text-white/70 mb-1">{t('calc.monthlyTotal')}</div>
              <div className="text-2xl font-bold text-white">
                {formatPrice(totals.monthly)}
              </div>
            </div>

            {/* One-time */}
            {totals.oneTime > 0 && (
              <div className="bg-brand-lightBeige/30 rounded-xl p-4 mb-4">
                <div className="text-sm text-brand-darkBlue/60 mb-1">{t('calc.oneTimeTotal')}</div>
                <div className="text-xl font-bold text-brand-darkBlue">
                  {formatPrice(totals.oneTime)}
                </div>
              </div>
            )}

            {/* Savings highlight - depends on scenario */}
            {scenario === 'switch' && roi.switchSavings > 0 && (
              <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('calc.yourSavings')}</span>
                </div>
                <div className="text-xl font-bold text-emerald-600">
                  +{formatPrice(roi.switchSavings)}/мес
                </div>
                <div className="text-sm text-emerald-600/70">
                  {formatPrice(roi.yearSwitchSavings)}/год
                </div>
              </div>
            )}
            {scenario === 'integrate' && roi.integrationSavings > 0 && (
              <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('calc.automationSavings')}</span>
                </div>
                <div className="text-xl font-bold text-purple-600">
                  +{formatPrice(roi.integrationSavings)}/мес
                </div>
                <div className="text-sm text-purple-600/70">
                  -{Math.round(roi.hoursSaved)} {t('calc.hoursSavedShort')}
                </div>
              </div>
            )}
            {scenario === 'own' && roi.ownDeliveryProfit > 0 && (
              <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Store className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('calc.netProfit')}</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {formatPrice(roi.ownDeliveryProfit)}/мес
                </div>
                <div className="text-sm text-blue-600/70">
                  {formatPrice(roi.yearOwnProfit)}/год
                </div>
              </div>
            )}

            {/* Deposit */}
            <div className="p-3 bg-brand-lightBlue/20 rounded-xl mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-brand-darkBlue/70">{t('calc.depositRequired')}</span>
                <span className="font-medium text-brand-darkBlue">{formatPrice(6500000)}</span>
              </div>
              <div className="text-xs text-brand-darkBlue/50 mt-1">{t('calc.depositNote')}</div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setContactFormOpen(true)}
              >
                {t('calc.getOffer')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="w-full" 
                onClick={downloadInvoice}
              >
                <Download className="mr-2 h-4 w-4" />
                {t('calc.downloadInvoice')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Platform Features */}
      <motion.div 
        className="mt-12 bg-white rounded-2xl p-8 border border-brand-lightTeal/30 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-brand-darkBlue mb-2 text-center">{t('calc.fullFunctionality')}</h3>
        <p className="text-brand-darkBlue/60 text-center mb-8">{t('calc.allFeaturesIncluded')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {platformFeatures.map((category, idx) => {
            const Icon = category.icon
            return (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-lightBlue/30 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-brand-darkBlue" />
                  </div>
                  <h4 className="font-semibold text-brand-darkBlue text-sm">{t(category.category)}</h4>
                </div>
                <ul className="space-y-2">
                  {category.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-brand-darkBlue/70">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        
        <p className="text-xs text-brand-darkBlue/40 text-center mt-6">
          * {t('calc.availableOnHigherPlans')}
        </p>
      </motion.div>

      {/* White Label Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="bg-brand-darkBlue rounded-2xl p-8 lg:p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Smartphone className="h-8 w-8 text-white" />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">{t('calc.whiteLabelTitle')}</h3>
              <p className="text-white/70 mb-4">
                {t('calc.whiteLabelDesc')}
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <span className="text-3xl font-bold text-white">{formatPrice(13000000)}</span>
                <span className="text-white/50 text-sm">{t('calc.oneTime')}</span>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setContactFormOpen(true)}
            >
              {t('common.learnMore')}
            </Button>
          </div>
        </div>
      </motion.div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
