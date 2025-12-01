import { 
  ShoppingCart, 
  Zap,
  Monitor,
  Truck,
  BarChart3,
  Package
} from 'lucide-react'

interface FlowStep {
  id: string
  title: string
  icon: React.ReactNode
  items: string[]
  color: string
  bgColor: string
}

export function ProcessFlow() {
  const flowSteps: FlowStep[] = [
    {
      id: 'channels',
      title: 'Каналы продаж',
      icon: <ShoppingCart className="h-6 w-6" />,
      items: [
        'Агрегаторы (Wolt, Yandex Eats, Talabat)',
        'Telegram-бот',
        'Веб-сайт',
        'Мобильное приложение',
        'QR-меню',
        'Колл-центр',
        'Киоск',
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'delever',
      title: 'Delever',
      icon: <Zap className="h-6 w-6" />,
      items: [
        'Единая платформа',
        'Автоматизация',
        'Управление заказами',
        'Синхронизация данных',
      ],
      color: 'text-brand-darkBlue',
      bgColor: 'bg-gradient-brand',
    },
    {
      id: 'integrations',
      title: 'Интеграции',
      icon: <Monitor className="h-6 w-6" />,
      items: [
        'POS-системы (iiko, R-Keeper)',
        'Платежи (Click, Payme)',
        'Кухня',
        'Склад',
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'operations',
      title: 'Операции',
      icon: <Package className="h-6 w-6" />,
      items: [
        'Диспетчеризация',
        'Кухня',
        'Курьеры',
        'Статусы заказов',
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'delivery',
      title: 'Доставка',
      icon: <Truck className="h-6 w-6" />,
      items: [
        'Delever курьеры',
        'Я Доставка',
        'Собственные курьеры',
        'Трекинг в реальном времени',
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      icon: <BarChart3 className="h-6 w-6" />,
      items: [
        'Дашборды',
        'Отчёты',
        'AI-прогнозы',
        'KPI и метрики',
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">
            Полная цепочка от заказа до аналитики
          </h2>
          <p className="text-xl text-brand-darkBlue/80 max-w-3xl mx-auto">
            Все этапы работы с заказами в единой платформе — от приёма заказа до аналитики и оптимизации
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative bg-gradient-to-r from-brand-lightBlue/30 via-brand-lightBeige/30 to-brand-lightBlue/30 rounded-2xl p-8 border-2 border-brand-lightTeal/20">
            {/* Flow Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-300 via-brand-darkBlue to-indigo-300 transform -translate-y-1/2 z-0" />
            
            {/* Steps */}
            <div className="relative flex justify-between items-start py-8">
              {flowSteps.map((step, idx) => (
                <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  {/* Arrow between steps */}
                  {idx < flowSteps.length - 1 && (
                    <div className="absolute top-12 left-[60%] w-[80%] h-0.5 bg-brand-darkBlue/20 z-0" />
                  )}
                  
                  {/* Step Circle */}
                  <div className={`relative z-10 w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center ${step.color} border-4 border-white shadow-xl mb-4 transition-transform hover:scale-110`}>
                    {step.icon}
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-darkBlue text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                    {idx + 1}
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-brand-darkBlue mb-4 text-center">
                    {step.title}
                  </h3>
                  
                  {/* Step Items */}
                  <div className="w-full max-w-[200px]">
                    <ul className="space-y-2">
                      {step.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-xs text-brand-darkBlue/80 bg-white rounded-lg px-3 py-2 border border-brand-lightTeal/30 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Flow */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {flowSteps.map((step, idx) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {idx < flowSteps.length - 1 && (
                  <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-brand-lightBlue to-brand-lightTeal z-0" />
                )}
                
                <div className="relative flex items-start gap-6">
                  {/* Step Circle */}
                  <div className={`relative z-10 w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center ${step.color} border-4 border-white shadow-lg flex-shrink-0`}>
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">
                      {step.title}
                    </h3>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-sm text-brand-darkBlue/70 bg-white rounded-lg px-4 py-2 border border-brand-lightTeal/30 shadow-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-16 bg-gradient-to-r from-brand-lightBlue via-brand-lightBeige to-brand-lightBlue rounded-2xl p-8 border-2 border-brand-darkBlue/10 shadow-lg">
          <p className="text-center text-xl font-semibold text-brand-darkBlue leading-relaxed">
            Поток заказов от всех источников до клиента через единую платформу Delever
          </p>
          <p className="text-center text-brand-darkBlue/70 mt-3">
            Все этапы автоматизированы и синхронизированы в реальном времени
          </p>
        </div>
      </div>
    </section>
  )
}

