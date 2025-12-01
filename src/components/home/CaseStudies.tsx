import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface CaseStudy {
  company: string
  segment: string
  results: {
    icon: React.ReactNode
    metric: string
    label: string
  }[]
}

const cases: CaseStudy[] = [
  {
    company: 'Yaponamama',
    segment: 'Ресторан',
    results: [
      { icon: <TrendingUp className="h-4 w-4" />, metric: '+45%', label: 'Рост заказов' },
      { icon: <Clock className="h-4 w-4" />, metric: '-30%', label: 'Время доставки' },
      { icon: <DollarSign className="h-4 w-4" />, metric: '+28%', label: 'Средний чек' },
    ],
  },
  {
    company: 'GIPPO',
    segment: 'Сеть магазинов',
    results: [
      { icon: <Users className="h-4 w-4" />, metric: '+60%', label: 'Онлайн-заказы' },
      { icon: <TrendingUp className="h-4 w-4" />, metric: '+35%', label: 'Выручка' },
      { icon: <Clock className="h-4 w-4" />, metric: '-25%', label: 'Ошибки' },
    ],
  },
  {
    company: 'MAXWAY',
    segment: 'Фастфуд',
    results: [
      { icon: <DollarSign className="h-4 w-4" />, metric: '+40%', label: 'GMV' },
      { icon: <Users className="h-4 w-4" />, metric: '+50%', label: 'Клиенты' },
      { icon: <TrendingUp className="h-4 w-4" />, metric: '+32%', label: 'Конверсия' },
    ],
  },
]

export function CaseStudies() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-3 tracking-tight">
            Результаты клиентов
          </h2>
          <p className="text-base lg:text-lg text-brand-darkBlue/60 max-w-xl mx-auto">
            Реальные цифры после внедрения Delever
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {cases.map((caseStudy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-xl p-5 lg:p-6 border border-brand-lightTeal/20 hover:border-brand-darkBlue/15 transition-colors"
            >
              {/* Company */}
              <div className="mb-4 pb-4 border-b border-brand-lightTeal/20">
                <h3 className="text-lg font-semibold text-brand-darkBlue">
                  {caseStudy.company}
                </h3>
                <p className="text-xs text-brand-darkBlue/50 mt-0.5">
                  {caseStudy.segment}
                </p>
              </div>

              {/* Results */}
              <div className="space-y-3">
                {caseStudy.results.map((result, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-lightBlue/50 flex items-center justify-center text-brand-darkBlue">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-brand-darkBlue">
                          {result.metric}
                        </span>
                        <span className="text-sm text-brand-darkBlue/60">
                          {result.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
