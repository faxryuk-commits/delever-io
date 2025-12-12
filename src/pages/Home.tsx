import { Hero } from '@/components/home/Hero'
import { Clients } from '@/components/home/Clients'
import { SegmentNavigator } from '@/components/home/SegmentNavigator'
import { PlatformDiagram } from '@/components/home/PlatformDiagram'
import { PainsSolutions } from '@/components/home/PainsSolutions'
import { FunctionClusters } from '@/components/home/FunctionClusters'
import { ProofStats } from '@/components/home/ProofStats'
import { MiniCases } from '@/components/home/MiniCases'
import { FinalCTA } from '@/components/home/FinalCTA'
import { FAQ } from '@/components/home/FAQ'
import { SEO } from '@/components/SEO'
import { OrganizationSchema, WebSiteSchema, SoftwareSchema } from '@/components/seo/SchemaOrg'
import { useLocale } from '@/i18n/LocaleContext'

/**
 * Главная страница Delever
 * 
 * Структура:
 * 1. Hero - главное сообщение + CTA
 * 2. PlatformDiagram - что такое Delever
 * 3. FunctionClusters - все функции для вашего бизнеса
 * 4. SegmentNavigator - выберите ваш профиль
 * 5. PainsSolutions - узнаете свои проблемы
 * 6. ProofStats - цифры говорят сами за себя
 * 7. MiniCases - реальные цифры роста
 * 8. FAQ - часто задаваемые вопросы
 * 9. FinalCTA - готовы запустить свою систему
 */
export function Home() {
  const { language } = useLocale()
  
  return (
    <div className="min-h-screen">
      <SEO 
        title={language === 'en' ? 'Unified Delivery Management Platform' : 'Единая платформа для управления доставкой'}
        description={language === 'en' 
          ? 'Manage all sales channels, delivery operations and analytics from one place. 1000+ restaurants in 7 countries. Launch your delivery in 1 day.'
          : 'Управляйте всеми каналами продаж, операциями доставки и аналитикой из одного места. 1000+ ресторанов в 7 странах. Запуск за 1 день.'
        }
        keywords={language === 'en'
          ? 'delivery platform, restaurant software, POS integration, food delivery, aggregator integration'
          : 'платформа доставки, ПО для ресторанов, интеграция POS, доставка еды, агрегаторы'
        }
      />
      
      {/* Schema.org структурированные данные */}
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareSchema />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 1.5. Им доверяют миллионы */}
      <Clients />
      
      {/* 2. Что такое Delever */}
      <PlatformDiagram />
      
      {/* 3. Все функции для вашего бизнеса */}
      <FunctionClusters />
      
      {/* 4. Выберите ваш профиль */}
      <SegmentNavigator />
      
      {/* 5. Узнаете свои проблемы */}
      <PainsSolutions />
      
      {/* 6. Цифры говорят сами за себя */}
      <ProofStats />
      
      {/* 7. Реальные цифры роста */}
      <MiniCases />
      
      {/* 8. FAQ */}
      <FAQ />
      
      {/* 9. Готовы запустить свою систему */}
      <FinalCTA />
    </div>
  )
}
