import { useState } from 'react'
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
  Layers
} from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { useLocale } from '@/i18n/LocaleContext'

// Базовые тарифы
const basePlans = [
  { name: 'Start', orders: 1000, priceUZS: 1300000, perOrderUZS: 1300 },
  { name: 'Medium', orders: 3000, priceUZS: 3250000, perOrderUZS: 1100 },
  { name: 'Big', orders: 6000, priceUZS: 6500000, perOrderUZS: 1100 },
  { name: 'Enterprise', orders: 10000, priceUZS: 13000000, perOrderUZS: 1300 },
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

// Дополнительные модули с типом расчёта
// perType: 'branch' = за филиал, 'brand' = за бренд, 'kiosk' = за киоск, 'fixed' = фиксированно
const additionalModules = [
  { id: 'uzum', name: 'Uzum Tezkor', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал' },
  { id: 'wolt', name: 'Wolt', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал' },
  { id: 'yandex', name: 'Яндекс Еда', priceUZS: 260000, icon: Layers, perType: 'branch', label: 'за филиал' },
  { id: 'allAggregators', name: 'Агрегатор (все)', priceUZS: 650000, icon: Layers, perType: 'branch', label: 'за филиал' },
  { id: 'courier', name: 'Курьер сервис', priceUZS: 195000, icon: Truck, perType: 'fixed', label: '' },
  { id: 'kiosk', name: 'Киоск', priceUZS: 910000, icon: Monitor, perType: 'kiosk', label: 'за шт.' },
  { id: 'marketing', name: 'Маркетинг', priceUZS: 390000, icon: Megaphone, perType: 'brand', label: 'за бренд' },
  { id: 'booking', name: 'Бронь', priceUZS: 130000, icon: Calendar, perType: 'brand', label: 'за бренд' },
  { id: 'courierApp', name: 'Курьерское приложение', priceUZS: 260000, icon: Smartphone, perType: 'brand', label: 'за бренд' },
  { id: 'kds', name: 'Кухня (KDS)', priceUZS: 65000, icon: ChefHat, perType: 'branch', label: 'за филиал' },
  { id: 'callCenter', name: 'Колл-центр', priceUZS: 0, icon: Headphones, perType: 'fixed', label: '' },
  { id: 'manager', name: 'Выделенный менеджер', priceUZS: 1300000, icon: UserCog, perType: 'brand', label: 'за бренд' },
  { id: 'dashboard', name: 'Дашборд', priceUZS: 130000, icon: LayoutDashboard, perType: 'brand', label: 'за бренд' },
]

// Единоразовые платежи
const oneTimePayments = [
  { id: 'whiteLabel', name: 'White Label приложение', priceUZS: 13000000, icon: Smartphone },
]

export function PricingCalculator() {
  const { t, formatPrice } = useLocale()
  const [contactFormOpen, setContactFormOpen] = useState(false)
  
  // Состояние калькулятора
  const [branches, setBranches] = useState(1)
  const [brands, setBrands] = useState(1)
  const [kiosks, setKiosks] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(0) // index
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [selectedOneTime, setSelectedOneTime] = useState<string[]>([])
  const [extraOrders, setExtraOrders] = useState(0)

  const currentPlan = basePlans[selectedPlan]

  // Расчёт стоимости
  const calculateTotal = () => {
    let monthly = currentPlan.priceUZS
    
    // Доп заказы сверх лимита
    monthly += extraOrders * currentPlan.perOrderUZS
    
    // Дополнительные модули
    selectedModules.forEach(moduleId => {
      const module = additionalModules.find(m => m.id === moduleId)
      if (module) {
        switch (module.perType) {
          case 'branch':
            monthly += module.priceUZS * branches
            break
          case 'brand':
            monthly += module.priceUZS * brands
            break
          case 'kiosk':
            monthly += module.priceUZS * Math.max(1, kiosks)
            break
          default:
            monthly += module.priceUZS
        }
      }
    })
    
    // Единоразовые платежи
    let oneTime = 0
    selectedOneTime.forEach(id => {
      const item = oneTimePayments.find(p => p.id === id)
      if (item) oneTime += item.priceUZS
    })
    
    return { monthly, oneTime }
  }

  const totals = calculateTotal()

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

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Calculator */}
        <div className="lg:col-span-2 space-y-8">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Branches */}
              <div className="bg-brand-lightBlue/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-brand-darkBlue/60 mb-2">
                  <Store className="h-4 w-4" />
                  {t('calc.branches')}
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setBranches(Math.max(1, branches - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue w-12 text-center">{branches}</span>
                  <button 
                    onClick={() => setBranches(branches + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
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
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setBrands(Math.max(1, brands - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue w-12 text-center">{brands}</span>
                  <button 
                    onClick={() => setBrands(brands + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
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
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setKiosks(Math.max(0, kiosks - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-bold text-brand-darkBlue w-12 text-center">{kiosks.toString().padStart(2, '0')}</span>
                  <button 
                    onClick={() => setKiosks(kiosks + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
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
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-6 flex items-center gap-2">
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
            <div className="mt-6 p-4 bg-brand-lightBeige/30 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-brand-darkBlue">{t('calc.extraOrders')}</div>
                  <div className="text-xs text-brand-darkBlue/50">
                    {t('calc.pricePerOrder')}: {formatPrice(currentPlan.perOrderUZS)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setExtraOrders(Math.max(0, extraOrders - 100))}
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
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
                    className="w-8 h-8 rounded-lg bg-white border border-brand-lightTeal/30 flex items-center justify-center hover:bg-brand-lightBlue/30 transition-colors"
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
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {t('calc.additionalModules')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalModules.map((module) => {
                const Icon = module.icon
                const isSelected = selectedModules.includes(module.id)
                
                // Расчёт цены в зависимости от типа
                let multiplier = 1
                let multiplierLabel = ''
                switch (module.perType) {
                  case 'branch':
                    multiplier = branches
                    multiplierLabel = branches > 1 ? `×${branches}` : ''
                    break
                  case 'brand':
                    multiplier = brands
                    multiplierLabel = brands > 1 ? `×${brands}` : ''
                    break
                  case 'kiosk':
                    multiplier = Math.max(1, kiosks)
                    multiplierLabel = kiosks > 1 ? `×${kiosks}` : ''
                    break
                }
                const totalPrice = module.priceUZS * multiplier
                
                return (
                  <button
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      isSelected 
                        ? 'border-brand-darkBlue bg-brand-darkBlue text-white' 
                        : 'border-brand-lightTeal/30 hover:border-brand-darkBlue/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white/20' : 'bg-brand-lightBlue/30'
                    }`}>
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${isSelected ? 'text-white' : 'text-brand-darkBlue'}`}>
                        {module.name}
                      </div>
                      <div className={`text-sm ${isSelected ? 'text-white/70' : 'text-brand-darkBlue/50'}`}>
                        {formatPrice(module.priceUZS)}/мес {module.label && <span className="text-xs opacity-70">({module.label})</span>}
                        {multiplierLabel && <span className="ml-1 font-medium">{multiplierLabel}</span>}
                      </div>
                      {multiplier > 1 && (
                        <div className={`text-xs ${isSelected ? 'text-white/50' : 'text-brand-darkBlue/40'}`}>
                          = {formatPrice(totalPrice)}/мес
                        </div>
                      )}
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-white flex-shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* One-time payments */}
            <div className="mt-6 pt-6 border-t border-brand-lightTeal/20">
              <h4 className="text-sm font-medium text-brand-darkBlue/60 mb-4">{t('calc.oneTimePayments')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {oneTimePayments.map((item) => {
                  const Icon = item.icon
                  const isSelected = selectedOneTime.includes(item.id)
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleOneTime(item.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-brand-lightTeal/30 hover:border-emerald-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-emerald-100' : 'bg-brand-lightBlue/30'
                      }`}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-emerald-600' : 'text-brand-darkBlue'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium ${isSelected ? 'text-emerald-700' : 'text-brand-darkBlue'}`}>
                          {item.name}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-emerald-600' : 'text-brand-darkBlue/50'}`}>
                          {formatPrice(item.priceUZS)} {t('calc.oneTime')}
                        </div>
                      </div>
                      {isSelected && <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-2xl p-6 border border-brand-lightTeal/30 shadow-soft sticky top-28"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-6">{t('calc.costEstimate')}</h3>
            
            {/* Plan */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-brand-lightTeal/20">
              <div>
                <div className="text-sm text-brand-darkBlue/60">{t('calc.plan')}</div>
                <div className="font-semibold text-brand-darkBlue">{currentPlan.name}</div>
              </div>
              <div className="text-right font-semibold text-brand-darkBlue">
                {formatPrice(currentPlan.priceUZS)}
              </div>
            </div>

            {/* Selected Modules */}
            {selectedModules.length > 0 && (
              <div className="mb-4 pb-4 border-b border-brand-lightTeal/20">
                <div className="text-sm text-brand-darkBlue/60 mb-2">{t('calc.modules')}</div>
                {selectedModules.map(moduleId => {
                  const module = additionalModules.find(m => m.id === moduleId)
                  if (!module) return null
                  
                  let multiplier = 1
                  let label = ''
                  switch (module.perType) {
                    case 'branch':
                      multiplier = branches
                      label = branches > 1 ? `×${branches}` : ''
                      break
                    case 'brand':
                      multiplier = brands
                      label = brands > 1 ? `×${brands}` : ''
                      break
                    case 'kiosk':
                      multiplier = Math.max(1, kiosks)
                      label = kiosks > 1 ? `×${kiosks}` : ''
                      break
                  }
                  const totalPrice = module.priceUZS * multiplier
                  
                  return (
                    <div key={moduleId} className="flex justify-between text-sm py-1">
                      <span className="text-brand-darkBlue/70">
                        {module.name}
                        {label && <span className="text-xs ml-1">{label}</span>}
                      </span>
                      <span className="text-brand-darkBlue">{formatPrice(totalPrice)}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Extra Orders */}
            {extraOrders > 0 && (
              <div className="flex justify-between text-sm py-1 mb-4 pb-4 border-b border-brand-lightTeal/20">
                <span className="text-brand-darkBlue/70">
                  {t('calc.extraOrders')} ({extraOrders})
                </span>
                <span className="text-brand-darkBlue">{formatPrice(extraOrders * currentPlan.perOrderUZS)}</span>
              </div>
            )}

            {/* Monthly Total */}
            <div className="mb-6">
              <div className="text-sm text-brand-darkBlue/60 mb-1">{t('calc.monthlyTotal')}</div>
              <div className="text-3xl font-bold text-emerald-600">
                {formatPrice(totals.monthly)}
              </div>
              <div className="text-sm text-brand-darkBlue/50">{t('calc.perMonth')}</div>
            </div>

            {/* One-time Total */}
            {totals.oneTime > 0 && (
              <div className="mb-6 p-4 bg-brand-lightBeige/30 rounded-xl">
                <div className="text-sm text-brand-darkBlue/60 mb-1">{t('calc.oneTimeTotal')}</div>
                <div className="text-xl font-bold text-brand-darkBlue">
                  {formatPrice(totals.oneTime)}
                </div>
              </div>
            )}

            {/* Deposit Info */}
            <div className="mb-6 p-4 bg-brand-lightBlue/20 rounded-xl">
              <div className="text-sm font-medium text-brand-darkBlue mb-1">{t('calc.depositRequired')}</div>
              <div className="text-lg font-bold text-brand-darkBlue">{formatPrice(6500000)}</div>
              <div className="text-xs text-brand-darkBlue/50 mt-1">{t('calc.depositNote')}</div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setContactFormOpen(true)}
            >
              {t('calc.getOffer')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Platform Features */}
      <motion.div 
        className="mt-16 bg-white rounded-2xl p-8 border border-brand-lightTeal/30 shadow-soft"
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

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

