import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/Button'

interface NavigationItem {
  path: string
  label: string
}

const navigationOrder: NavigationItem[] = [
  { path: '/products', label: 'Продукты' },
  { path: '/products/channels', label: 'Каналы продаж' },
  { path: '/products/operations', label: 'Операции' },
  { path: '/products/analytics', label: 'Аналитика' },
  { path: '/products/marketing', label: 'Маркетинг' },
  { path: '/integrations', label: 'Интеграции' },
  { path: '/pricing', label: 'Тарифы' },
  { path: '/partners', label: 'Партнёрам' },
  { path: '/about', label: 'О компании' },
]

export function PageNavigation() {
  const location = useLocation()
  const currentPath = location.pathname

  // Находим текущий индекс в порядке навигации
  const currentIndex = navigationOrder.findIndex((item) => {
    if (item.path === '/products') {
      return currentPath === '/products'
    }
    return currentPath.startsWith(item.path)
  })

  // Если страница не найдена в навигации, не показываем компонент
  if (currentIndex === -1) {
    return null
  }

  const prevItem = currentIndex > 0 ? navigationOrder[currentIndex - 1] : null
  const nextItem =
    currentIndex < navigationOrder.length - 1 ? navigationOrder[currentIndex + 1] : null

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-subtle border-t border-brand-lightTeal/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Page */}
          <div className="flex-1">
            {prevItem ? (
              <Link to={prevItem.path}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto group flex items-center gap-2"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs text-brand-darkBlue/55 mb-1 font-medium">Предыдущая</div>
                    <div className="font-semibold text-brand-darkBlue tracking-tight">{prevItem.label}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Current Page Indicator */}
          <div className="hidden md:flex items-center gap-2 text-sm text-brand-darkBlue/50 font-medium">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{navigationOrder.length}</span>
          </div>

          {/* Next Page */}
          <div className="flex-1 flex justify-end">
            {nextItem ? (
              <Link to={nextItem.path}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto group flex items-center gap-2"
                >
                  <div className="text-right">
                    <div className="text-xs text-brand-darkBlue/55 mb-1 font-medium">Следующая</div>
                    <div className="font-semibold text-brand-darkBlue tracking-tight">{nextItem.label}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

