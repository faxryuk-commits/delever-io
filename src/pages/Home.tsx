import { Hero } from '@/components/home/Hero'
import { ProcessFlow } from '@/components/home/ProcessFlow'
import { AggregatorIntegration } from '@/components/home/AggregatorIntegration'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Clients } from '@/components/home/Clients'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'
import { LaunchTimeline } from '@/components/home/LaunchTimeline'
import { ProductScreenshots } from '@/components/home/ProductScreenshots'

/**
 * Главная страница Delever
 * Структура оптимизирована для конверсии:
 * 1. Hero - главное сообщение + статистика
 * 2. Clients - доверие (логотипы)
 * 3. LaunchTimeline - уникальное предложение "запуск за неделю"
 * 4. ProductScreenshots - визуализация продукта
 * 5. ProcessFlow - как это работает
 * 6. AggregatorIntegration - интеграции
 * 7. CaseStudies - результаты клиентов
 * 8. FAQ - закрытие возражений
 * 9. CallToAction - финальный призыв к действию
 */
export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Clients />
      <LaunchTimeline />
      <ProductScreenshots />
      <ProcessFlow />
      <AggregatorIntegration />
      <CaseStudies />
      <FAQ />
      <CallToAction />
    </div>
  )
}
