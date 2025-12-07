import { AlertCircle, CheckCircle2, TrendingUp, Lightbulb, List, ChefHat } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleContext'
import type { MenuDoctorReport } from '@/types/menuDoctor'

interface MenuReportProps {
  data: MenuDoctorReport | null
}

function ScoreCircle({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-500'
    if (s >= 60) return 'text-yellow-500'
    if (s >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getBgColor = (s: number) => {
    if (s >= 80) return 'from-green-100 to-green-50'
    if (s >= 60) return 'from-yellow-100 to-yellow-50'
    if (s >= 40) return 'from-orange-100 to-orange-50'
    return 'from-red-100 to-red-50'
  }

  return (
    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getBgColor(score)} flex items-center justify-center shadow-lg`}>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getColor(score)}`}>{score}</div>
        <div className="text-gray-500 text-sm">/100</div>
      </div>
    </div>
  )
}

function ProgressBar({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-green-500'
    if (s >= 60) return 'bg-yellow-500'
    if (s >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${getColor(score)} transition-all duration-1000 ease-out`}
        style={{ width: `${score}%` }}
      />
    </div>
  )
}

export function MenuReport({ data }: MenuReportProps) {
  const { t } = useLocale()

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
            <ChefHat className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {t('menuDoctor.report.placeholder.title')}
          </h3>
          <p className="text-gray-500 text-sm max-w-xs">
            {t('menuDoctor.report.placeholder.description')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Score Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <ScoreCircle score={data.score} />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t('menuDoctor.report.score')}
            </h3>
            <ProgressBar score={data.score} />
            <p className="text-sm text-gray-500 mt-2">
              {data.score >= 80 && t('menuDoctor.report.scoreExcellent')}
              {data.score >= 60 && data.score < 80 && t('menuDoctor.report.scoreGood')}
              {data.score >= 40 && data.score < 60 && t('menuDoctor.report.scoreAverage')}
              {data.score < 40 && t('menuDoctor.report.scorePoor')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-teal-800 mb-3">
          <CheckCircle2 className="h-5 w-5" />
          {t('menuDoctor.report.summary')}
        </h3>
        <p className="text-teal-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* Issues */}
      {data.issues.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600 mb-4">
            <AlertCircle className="h-5 w-5" />
            {t('menuDoctor.report.issues')}
          </h3>
          <ul className="space-y-2">
            {data.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-4">
            <Lightbulb className="h-5 w-5" />
            {t('menuDoctor.report.recommendations')}
          </h3>
          <ul className="space-y-2">
            {data.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  ✓
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upsell Ideas */}
      {data.upsellIdeas.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 mb-4">
            <TrendingUp className="h-5 w-5" />
            {t('menuDoctor.report.upsellIdeas')}
          </h3>
          <ul className="space-y-2">
            {data.upsellIdeas.map((idea, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  💡
                </span>
                {idea}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Menu Structure */}
      {data.menuStructure && data.menuStructure.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <List className="h-5 w-5" />
            {t('menuDoctor.report.menuStructure')}
          </h3>
          <div className="space-y-4">
            {data.menuStructure.map((category, catIdx) => (
              <div key={catIdx} className="border-l-4 border-teal-500 pl-4">
                <h4 className="font-bold text-gray-800">{category.category}</h4>
                {category.subcategory && (
                  <p className="text-sm text-gray-500 mb-2">{category.subcategory}</p>
                )}
                <ul className="mt-2 space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-gray-700">{item.name}</span>
                        {item.price && (
                          <span className="text-teal-600 font-semibold ml-2">{item.price}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
