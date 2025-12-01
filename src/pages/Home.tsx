import { Hero } from '@/components/home/Hero'
import { ProcessFlow } from '@/components/home/ProcessFlow'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Clients } from '@/components/home/Clients'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'
import { LaunchTimeline } from '@/components/home/LaunchTimeline'
import { ProductScreenshots } from '@/components/home/ProductScreenshots'
import { ROICalculator } from '@/components/home/ROICalculator'
import { ComparisonTable } from '@/components/home/ComparisonTable'
import { ArchitectureMap } from '@/components/home/ArchitectureMap'

/**
 * Главная страница Delever
 * Структура оптимизирована для конверсии:
 * 1. Hero - главное сообщение + статистика
 * 2. Clients - доверие (логотипы)
 * 3. LaunchTimeline - уникальное предложение "запуск за неделю"
 * 4. ArchitectureMap - архитектура платформы
 * 5. ProductScreenshots - визуализация продукта
 * 6. ProcessFlow - как это работает
 * 7. ROICalculator - калькулятор экономии
 * 8. ComparisonTable - сравнение с агрегаторами
 * 9. CaseStudies - результаты клиентов
 * 10. FAQ - закрытие возражений
 * 11. CallToAction - финальный призыв к действию
 */
export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Clients />
      <LaunchTimeline />
      <ArchitectureMap />
      <ProductScreenshots />
      <ProcessFlow />
      <ROICalculator />
      <ComparisonTable />
      <CaseStudies />
      <FAQ />
      <CallToAction />
    </div>
  )
}
