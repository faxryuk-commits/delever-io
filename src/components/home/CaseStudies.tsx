import React from 'react'
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

interface CaseStudy {
  company: string
  location: string
  results: {
    icon: React.ReactNode
    metric: string
    label: string
  }[]
  highlight: string
}

const cases: CaseStudy[] = [
  {
    company: 'Yaponamama',
    location: 'Ташкент, Узбекистан',
    results: [
      { icon: <TrendingUp className="h-5 w-5" />, metric: '+45%', label: 'Рост заказов' },
      { icon: <Clock className="h-5 w-5" />, metric: '-30%', label: 'Время доставки' },
      { icon: <DollarSign className="h-5 w-5" />, metric: '+28%', label: 'Средний чек' },
    ],
    highlight: 'Запуск собственных каналов продаж за 5 дней',
  },
  {
    company: 'GIPPO',
    location: 'Ташкент, Узбекистан',
    results: [
      { icon: <Users className="h-5 w-5" />, metric: '+60%', label: 'Онлайн-заказы' },
      { icon: <TrendingUp className="h-5 w-5" />, metric: '+35%', label: 'Выручка' },
      { icon: <Clock className="h-5 w-5" />, metric: '-25%', label: 'Ошибки' },
    ],
    highlight: 'Единая платформа для 15 точек сети',
  },
  {
    company: 'MAXWAY',
    location: 'Ташкент, Узбекистан',
    results: [
      { icon: <DollarSign className="h-5 w-5" />, metric: '+40%', label: 'GMV' },
      { icon: <Users className="h-5 w-5" />, metric: '+50%', label: 'Активные клиенты' },
      { icon: <TrendingUp className="h-5 w-5" />, metric: '+32%', label: 'Конверсия' },
    ],
    highlight: 'Интеграция с агрегаторами и собственными каналами',
  },
]

export function CaseStudies() {
  return (
    <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Результаты наших клиентов
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Реальные цифры роста после внедрения Delever
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((caseStudy, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-brand-lightTeal/20 flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-darkBlue tracking-tight">
                  {caseStudy.company}
                </h3>
                <p className="text-sm text-brand-darkBlue/55 mt-1">{caseStudy.location}</p>
              </div>

              <div className="space-y-4 mb-6 flex-grow">
                {caseStudy.results.map((result, rIdx) => (
                  <div key={rIdx} className="flex items-center space-x-3">
                    <div className="text-brand-darkBlue">{result.icon}</div>
                    <div>
                      <div className="font-semibold text-brand-darkBlue tracking-tight">
                        {result.metric}
                      </div>
                      <div className="text-sm text-brand-darkBlue/65">
                        {result.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-accent rounded-xl p-4 border border-brand-darkBlue/10 mt-auto min-h-[60px] flex items-center">
                <p className="text-sm font-semibold text-brand-darkBlue">
                  {caseStudy.highlight}
                </p>
              </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

