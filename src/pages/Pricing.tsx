import { SmartCalculator } from '@/components/SmartCalculator'
import { SEO } from '@/components/SEO'
import { useLocale } from '@/i18n/LocaleContext'

export function Pricing() {
  const { language } = useLocale()
  
  return (
    <div className="min-h-screen pt-20 pb-8 lg:pt-24 lg:pb-12 bg-gradient-to-b from-brand-lightBlue/20 to-white">
      <SEO 
        title={language === 'en' ? 'Pricing & Plans' : 'Тарифы и цены'}
        description={language === 'en'
          ? 'Delever pricing plans from $99/month. Calculate your costs and savings. Free ROI calculator included.'
          : 'Тарифы Delever от 1,300,000 сум/месяц. Рассчитайте стоимость и экономию. Бесплатный калькулятор ROI.'
        }
        keywords={language === 'en'
          ? 'delever pricing, delivery software cost, restaurant software price, ROI calculator'
          : 'цены delever, стоимость ПО для доставки, цена софта для ресторанов, калькулятор ROI'
        }
      />
      <SmartCalculator />
    </div>
  )
}
