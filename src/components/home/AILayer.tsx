import { Brain, TrendingUp, Package, Users, DollarSign } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const aiFeatures = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Прогнозирование спроса',
    description: 'ИИ анализирует исторические данные и предсказывает спрос на блюда, помогая оптимизировать закупки.',
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: 'Оптимизация запасов',
    description: 'Автоматический расчёт оптимального количества ингредиентов, снижение потерь и пересортицы.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Управление персоналом',
    description: 'Рекомендации по расписанию работы сотрудников на основе прогноза загрузки.',
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Денежный поток',
    description: 'Прогнозирование денежных потоков и рекомендации по оптимизации финансов.',
  },
]

export function AILayer() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-2xl mb-5">
              <Brain className="h-8 w-8 text-brand-darkBlue" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              AI, который работает на ваш бизнес
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Искусственный интеллект анализирует ваши данные и предлагает конкретные решения для увеличения прибыли и оптимизации операций
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiFeatures.map((feature, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-brand-lightTeal/20 flex flex-col h-full">
              <div className="text-brand-darkBlue mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-darkBlue/65 leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.4}>
          <div className="bg-gradient-accent rounded-2xl p-8 border border-brand-darkBlue/10">
          <p className="text-center text-lg font-semibold text-brand-darkBlue">
            AI встроен в основу платформы — это не дополнительная функция, а основа системы
          </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}

