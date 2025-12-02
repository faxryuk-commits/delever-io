import { Hero } from '@/components/home/Hero'
import { SegmentNavigator } from '@/components/home/SegmentNavigator'
import { PlatformDiagram } from '@/components/home/PlatformDiagram'
import { PainsSolutions } from '@/components/home/PainsSolutions'
import { FunctionClusters } from '@/components/home/FunctionClusters'
import { ProofStats } from '@/components/home/ProofStats'
import { MiniCases } from '@/components/home/MiniCases'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Clients } from '@/components/home/Clients'
import { FAQ } from '@/components/home/FAQ'

/**
 * Главная страница Delever
 * 
 * Структура оптимизирована для конверсии:
 * 1. Hero - главное сообщение + статистика + CTA
 * 2. Clients - доверие (логотипы клиентов)
 * 3. SegmentNavigator - быстрая сегментация ("Кто вы?")
 * 4. PlatformDiagram - что такое Delever (одна диаграмма)
 * 5. PainsSolutions - основные боли → решения (6 карточек)
 * 6. FunctionClusters - кластеры функций (6 категорий)
 * 7. ProofStats - доказательства / цифры
 * 8. MiniCases - мини-кейсы клиентов
 * 9. FAQ - часто задаваемые вопросы
 * 10. FinalCTA - финальный призыв к действию
 */
export function Home() {
  return (
    <div className="min-h-screen">
      {/* 1.1 Hero section */}
      <Hero />
      
      {/* Логотипы клиентов (доверие) */}
      <Clients />
      
      {/* 1.2 Быстрая сегментация */}
      <SegmentNavigator />
      
      {/* 1.3 Что такое Delever */}
      <PlatformDiagram />
      
      {/* 1.4 Основные боли → решения */}
      <PainsSolutions />
      
      {/* 1.5 Кластеры функций */}
      <FunctionClusters />
      
      {/* 1.6 Доказательства / цифры */}
      <ProofStats />
      
      {/* 1.7 Кейсы (мини) */}
      <MiniCases />
      
      {/* FAQ */}
      <FAQ />
      
      {/* 1.8 CTA-блок */}
      <FinalCTA />
    </div>
  )
}
