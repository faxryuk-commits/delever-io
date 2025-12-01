import { XCircle, CheckCircle } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const problems = [
  'Потеря заказов из-за ошибок при ручном вводе',
  'Несколько планшетов от разных агрегаторов на кухне',
  'Невозможность отследить заказ от приёма до доставки',
  'Высокие комиссии агрегаторов снижают маржинальность',
  'Отсутствие данных о клиентах и их предпочтениях',
]

const solutions = [
  'Все заказы из агрегаторов и собственных каналов в одном окне',
  'Автоматический приём и передача заказов в кассу и на кухню',
  'Полный контроль над каждым заказом от приёма до доставки',
  'Собственные каналы продаж без комиссий увеличивают прибыль',
  'Единая база клиентов с историей заказов и предпочтениями',
]

export function ProblemSolution() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              От хаоса к порядку
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Превратите множество систем, планшетов и ручной работы в единую автоматизированную платформу
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problems */}
          <FadeInOnScroll delay={0.2} direction="left">
            <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-soft">
            <h3 className="text-2xl font-semibold text-brand-darkBlue mb-6 tracking-tight">
              Проблемы без Delever
            </h3>
            <ul className="space-y-4">
              {problems.map((problem, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-darkBlue/70 leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
            </div>
          </FadeInOnScroll>

          {/* Solutions */}
          <FadeInOnScroll delay={0.3} direction="right">
            <div className="bg-gradient-accent rounded-2xl p-8 border border-brand-lightTeal/30 shadow-soft">
            <h3 className="text-2xl font-semibold text-brand-darkBlue mb-6 tracking-tight">
              Как Delever решает
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                  <span className="text-brand-darkBlue/70 leading-relaxed">{solution}</span>
                </li>
              ))}
            </ul>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  )
}

