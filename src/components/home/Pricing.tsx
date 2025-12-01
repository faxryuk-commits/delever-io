import { Check } from 'lucide-react'
import { Button } from '../ui/Button'

const plans = [
  {
    name: 'Light',
    price: '$99',
    period: '/месяц',
    description: 'Для небольших заведений',
    features: ['POS интеграция', 'Telegram-бот', 'Базовый CRM', 'Отчёты'],
    highlight: false,
  },
  {
    name: 'Start',
    price: '$299',
    period: '/месяц',
    description: 'Для растущего бизнеса',
    features: [
      'Всё из Light',
      'Веб-сайт',
      'RFM анализ',
      'Курьерский модуль',
      'Расширенная аналитика',
    ],
    highlight: true,
  },
  {
    name: 'Medium',
    price: '$599',
    period: '/месяц',
    description: 'Для сетей ресторанов',
    features: [
      'Всё из Start',
      'Мобильное приложение',
      'ABC-XYZ анализ',
      'Маркетинг модуль',
      'Приоритетная поддержка',
    ],
    highlight: false,
  },
  {
    name: 'Big',
    price: '$999',
    period: '/месяц',
    description: 'Для крупных сетей',
    features: [
      'Всё из Medium',
      'Множество точек',
      'Расширенная аналитика',
      'Кастомные интеграции',
      'SLA гарантии',
    ],
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'По запросу',
    period: '',
    description: 'Индивидуальные решения',
    features: [
      'Всё из Big',
      'Выделенный менеджер',
      'API доступ',
      'Кастомная разработка',
      'Персональный SLA',
    ],
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">
            Тарифы Delever
          </h2>
          <p className="text-xl text-brand-darkBlue/80">
            Выберите план, который подходит вашему бизнесу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-6 shadow-lg border-2 relative ${
                plan.highlight
                  ? 'border-brand-darkBlue scale-105'
                  : 'border-brand-lightTeal/30'
              } transition-transform hover:shadow-xl`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-darkBlue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Популярный
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-brand-darkBlue">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-brand-darkBlue/60 text-lg ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-brand-darkBlue/70">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 min-h-[200px]">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-darkBlue/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.highlight ? 'primary' : 'outline'}
                onClick={() => window.open('https://app.delever.io/register', '_blank')}
              >
                Выбрать план
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

