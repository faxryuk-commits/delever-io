import { CheckCircle, Zap, Globe, Clock, Tablet } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const aggregators = ['Wolt', 'Yandex Eats', 'Talabat', 'Deliveroo', 'Noon', 'Uzum Tezkor']

const stats = [
  { icon: <Zap className="h-6 w-6" />, value: '95%', label: 'Автоматизация' },
  { icon: <Globe className="h-6 w-6" />, value: '15+', label: 'Агрегаторов' },
  { icon: <Clock className="h-6 w-6" />, value: '24/7', label: 'Работа' },
  { icon: <Tablet className="h-6 w-6" />, value: '0', label: 'Планшетов' },
]

const features = [
  'Автоматический приём заказов',
  'Синхронизация меню и цен',
  'Управление стоп-листами',
  'Передача в кассу',
  'Отслеживание статуса доставки',
]

export function AggregatorIntegration() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Все агрегаторы в одном окне
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Забудьте про несколько планшетов на кухне. Все заказы из агрегаторов приходят в единую систему Delever
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <FadeInOnScroll delay={0.2} direction="left">
            <div>
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-brand-lightTeal/20 mb-6">
              <h3 className="text-2xl font-semibold text-brand-darkBlue mb-5 tracking-tight">
                Как это работает
              </h3>
              <p className="text-brand-darkBlue/70 mb-6 leading-relaxed">
                Заказы из всех агрегаторов автоматически поступают в Delever. Управляйте стоп-листами, меню и ценами из одного места — изменения синхронизируются со всеми платформами.
              </p>
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                    <span className="text-brand-darkBlue/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-accent rounded-xl p-5 border border-brand-darkBlue/10">
              <p className="text-sm font-semibold text-brand-darkBlue">
                Больше никаких планшетов на кухне — все заказы в одном интерфейсе
              </p>
            </div>
            </div>
          </FadeInOnScroll>

          {/* Right Column */}
          <FadeInOnScroll delay={0.3} direction="right">
            <div>
            {/* Aggregator Badges */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">
                Поддерживаемые агрегаторы
              </h3>
              <div className="flex flex-wrap gap-3">
                {aggregators.map((agg, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-4 py-2 rounded-lg border border-brand-lightTeal/20 text-sm font-medium text-brand-darkBlue hover:border-brand-darkBlue/40 hover:shadow-soft transition-all"
                  >
                    {agg}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-brand-lightTeal/20 text-center shadow-soft hover:shadow-medium transition-all flex flex-col justify-center"
                >
                  <div className="text-brand-darkBlue mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-brand-darkBlue mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-darkBlue/65 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  )
}

