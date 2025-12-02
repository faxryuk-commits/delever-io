import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Check,
  PiggyBank,
  Clock,
  Users,
  TrendingDown,
  Frown,
  Zap
} from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'

const painsSolutions = [
  {
    id: 'commissions',
    painIcon: PiggyBank,
    painKey: 'pains.commissions.pain',
    solutionKey: 'pains.commissions.solution',
    statBefore: '20-35%',
    statAfter: '0%',
    statLabel: 'pains.commissions.stat'
  },
  {
    id: 'speed',
    painIcon: Clock,
    painKey: 'pains.speed.pain',
    solutionKey: 'pains.speed.solution',
    statBefore: '45 мин',
    statAfter: '28 мин',
    statLabel: 'pains.speed.stat'
  },
  {
    id: 'loyalty',
    painIcon: Users,
    painKey: 'pains.loyalty.pain',
    solutionKey: 'pains.loyalty.solution',
    statBefore: '15%',
    statAfter: '42%',
    statLabel: 'pains.loyalty.stat'
  },
  {
    id: 'chaos',
    painIcon: Zap,
    painKey: 'pains.chaos.pain',
    solutionKey: 'pains.chaos.solution',
    statBefore: '5+',
    statAfter: '1',
    statLabel: 'pains.chaos.stat'
  },
  {
    id: 'analytics',
    painIcon: TrendingDown,
    painKey: 'pains.analytics.pain',
    solutionKey: 'pains.analytics.solution',
    statBefore: '0',
    statAfter: '100%',
    statLabel: 'pains.analytics.stat'
  },
  {
    id: 'customers',
    painIcon: Frown,
    painKey: 'pains.customers.pain',
    solutionKey: 'pains.customers.solution',
    statBefore: '3.2',
    statAfter: '4.8',
    statLabel: 'pains.customers.stat'
  },
]

export function PainsSolutions() {
  const { t } = useLocale()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-brand-lightBeige/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkBlue mb-4">
            {t('pains.title')}
          </h2>
          <p className="text-lg text-brand-darkBlue/60 max-w-2xl mx-auto">
            {t('pains.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painsSolutions.map((item, idx) => {
            const PainIcon = item.painIcon
            return (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl border border-brand-lightTeal/20 overflow-hidden shadow-soft hover:shadow-lg transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Боль */}
                <div className="p-5 bg-brand-lightBeige/50 border-b border-brand-lightTeal/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-darkBlue/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-brand-darkBlue/60" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-brand-darkBlue/50 uppercase tracking-wider mb-1">
                        {t('pains.problem')}
                      </div>
                      <p className="text-brand-darkBlue font-medium text-sm">
                        {t(item.painKey)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Решение */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-lightTeal/30 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-brand-darkBlue" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-brand-darkBlue/50 uppercase tracking-wider mb-1">
                        {t('pains.solution')}
                      </div>
                      <p className="text-brand-darkBlue/70 text-sm">
                        {t(item.solutionKey)}
                      </p>
                    </div>
                  </div>

                  {/* Статистика было/стало */}
                  <div className="flex items-center justify-between bg-brand-lightBlue/30 rounded-xl p-3">
                    <div className="text-center">
                      <div className="text-xs text-brand-darkBlue/50 mb-1">{t('pains.before')}</div>
                      <div className="text-lg font-bold text-brand-darkBlue/40 line-through decoration-2">
                        {item.statBefore}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-[2px] bg-brand-darkBlue/20" />
                      <PainIcon className="h-5 w-5 text-brand-darkBlue/40 mx-2" />
                      <div className="w-8 h-[2px] bg-brand-darkBlue/20" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-brand-darkBlue/50 mb-1">{t('pains.after')}</div>
                      <div className="text-lg font-bold text-brand-darkBlue">
                        {item.statAfter}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-brand-darkBlue/50 mt-2">
                    {t(item.statLabel)}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

