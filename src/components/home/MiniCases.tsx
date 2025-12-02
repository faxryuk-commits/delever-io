import { motion } from 'framer-motion'
import { 
  ArrowRight,
  Quote
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const cases = [
  {
    id: 'burger',
    company: 'BurgerX',
    logo: '/logos/evos.png',
    industry: 'cases.industry.fastfood',
    problem: 'cases.burger.problem',
    result: 'cases.burger.result',
    metric: '+42%',
    metricLabel: 'cases.burger.metric',
    quote: 'cases.burger.quote',
    author: 'cases.burger.author',
  },
  {
    id: 'coffee',
    company: 'CoffeeLuxe',
    logo: '/logos/istanbul.svg',
    industry: 'cases.industry.cafe',
    problem: 'cases.coffee.problem',
    result: 'cases.coffee.result',
    metric: '+28%',
    metricLabel: 'cases.coffee.metric',
    quote: 'cases.coffee.quote',
    author: 'cases.coffee.author',
  },
  {
    id: 'sushi',
    company: 'SushiMaster',
    logo: '/logos/yaponamama.png',
    industry: 'cases.industry.restaurant',
    problem: 'cases.sushi.problem',
    result: 'cases.sushi.result',
    metric: '-35%',
    metricLabel: 'cases.sushi.metric',
    quote: 'cases.sushi.quote',
    author: 'cases.sushi.author',
  },
]

export function MiniCases() {
  const { t } = useLocale()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-lightBeige/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('cases.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, idx) => (
            <motion.div
              key={caseItem.id}
              className="bg-white rounded-2xl border border-brand-lightTeal/20 overflow-hidden shadow-soft hover:shadow-lg transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Заголовок кейса */}
              <div className="bg-brand-darkBlue p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                    <img 
                      src={caseItem.logo} 
                      alt={caseItem.company}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/logo.svg'
                      }}
                    />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold">{caseItem.company}</h3>
                    <p className="text-sm text-white/80">{t(caseItem.industry)}</p>
                  </div>
                </div>
              </div>

              {/* Контент */}
              <div className="p-5">
                {/* Проблема → Результат */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-xs">✕</span>
                    </div>
                    <p className="text-sm text-brand-darkBlue/70">{t(caseItem.problem)}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-500 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-brand-darkBlue/70">{t(caseItem.result)}</p>
                  </div>
                </div>

                {/* Главная метрика */}
                <div className="bg-brand-green/10 rounded-xl p-4 text-center mb-4">
                  <div className="text-3xl font-bold text-brand-green">
                    {caseItem.metric}
                  </div>
                  <div className="text-sm text-brand-darkBlue/60">
                    {t(caseItem.metricLabel)}
                  </div>
                </div>

                {/* Цитата */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-brand-lightTeal/30" />
                  <p className="text-sm text-brand-darkBlue/70 italic pl-5">
                    "{t(caseItem.quote)}"
                  </p>
                  <p className="text-xs text-brand-darkBlue/50 mt-2 pl-5">
                    — {t(caseItem.author)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ссылка на все кейсы */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="/about#cases"
            className="inline-flex items-center gap-2 text-brand-darkBlue font-medium hover:text-brand-darkBlue/70 transition-colors"
          >
            {t('cases.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

