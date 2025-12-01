import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Truck, BarChart3, Megaphone, Plug, ChevronDown } from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/DropdownMenu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const location = useLocation()

  const productCategories = [
    {
      category: 'Собственные каналы',
      items: [
        { path: '/products/channels', label: 'Каналы продаж', icon: <ShoppingCart className="h-5 w-5" />, desc: 'Сайт, приложение, Telegram-бот' },
      ],
    },
    {
      category: 'Операции',
      items: [
        { path: '/products/operations', label: 'Операции доставки', icon: <Truck className="h-5 w-5" />, desc: 'Диспетчеризация и курьеры' },
      ],
    },
    {
      category: 'Аналитика',
      items: [
        { path: '/products/analytics', label: 'Аналитика и отчёты', icon: <BarChart3 className="h-5 w-5" />, desc: 'Дашборды и AI-прогнозы' },
      ],
    },
    {
      category: 'Маркетинг',
      items: [
        { path: '/products/marketing', label: 'Маркетинг и лояльность', icon: <Megaphone className="h-5 w-5" />, desc: 'RFM-анализ и рассылки' },
        { path: '/integrations', label: 'Интеграции', icon: <Plug className="h-5 w-5" />, desc: 'Агрегаторы и POS-системы' },
      ],
    },
  ]

  const productItems = [
    { path: '/products', label: 'Все продукты' },
    { path: '/products/channels', label: 'Каналы продаж' },
    { path: '/products/operations', label: 'Операции' },
    { path: '/products/analytics', label: 'Аналитика' },
    { path: '/products/marketing', label: 'Маркетинг' },
    { path: '/integrations', label: 'Интеграции' },
  ]

  const navItems = [
    { path: '/pricing', label: 'Тарифы' },
    { path: '/partners', label: 'Партнёрам' },
    { path: '/about', label: 'О компании' },
  ]

  const isProductActive = () => {
    return (
      location.pathname === '/products' ||
      location.pathname.startsWith('/products/') ||
      location.pathname === '/integrations'
    )
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-lightTeal/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <Logo height={36} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Products Dropdown */}
              <DropdownMenu open={productsMenuOpen} onOpenChange={setProductsMenuOpen}>
                <DropdownMenuTrigger
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                    isProductActive()
                      ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                      : 'text-brand-darkBlue/70 hover:text-brand-darkBlue hover:bg-brand-lightBlue/40'
                  )}
                >
                  Продукты
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', productsMenuOpen && 'rotate-180')} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[680px] p-8 mt-2 shadow-lg border border-brand-lightTeal/30 bg-white">
                  <div className="grid grid-cols-4 gap-8">
                    {productCategories.map((category, catIdx) => (
                      <div key={catIdx} className="space-y-4">
                        <h4 className="text-[10px] font-bold text-brand-darkBlue/50 uppercase tracking-widest mb-4">
                          {category.category}
                        </h4>
                        {category.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setProductsMenuOpen(false)}
                            className={cn(
                              'block p-3.5 rounded-xl hover:bg-brand-lightBlue/40 transition-all duration-200 group/item',
                              isActive(item.path) && 'bg-brand-lightBlue/30'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                'text-brand-darkBlue/70 mt-0.5 group-hover/item:scale-110 group-hover/item:text-brand-darkBlue transition-all duration-200 flex-shrink-0',
                                isActive(item.path) && 'text-brand-darkBlue'
                              )}>
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={cn(
                                  'text-sm font-semibold text-brand-darkBlue mb-1.5 leading-tight',
                                  isActive(item.path) && 'text-brand-darkBlue'
                                )}>
                                  {item.label}
                                </div>
                                <div className="text-xs text-brand-darkBlue/55 leading-relaxed">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-brand-lightTeal/20">
                    <Link
                      to="/products"
                      onClick={() => setProductsMenuOpen(false)}
                      className="text-sm font-semibold text-brand-darkBlue hover:text-brand-darkBlue/70 transition-colors flex items-center gap-2 group/link"
                    >
                      Все продукты
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Integrations */}
              <Link
                to="/integrations"
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive('/integrations')
                    ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                    : 'text-brand-darkBlue/70 hover:text-brand-darkBlue hover:bg-brand-lightBlue/40'
                )}
              >
                Интеграции
              </Link>

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive(item.path)
                      ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                      : 'text-brand-darkBlue/70 hover:text-brand-darkBlue hover:bg-brand-lightBlue/40'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setContactFormOpen(true)}
                  className="h-9 px-4 text-sm font-medium"
                >
                  Демо
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => window.open('https://app.delever.io', '_blank')}
                  className="h-9 px-4 text-sm font-medium"
                >
                  Войти
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 p-0 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-lightTeal/20 bg-white/98 backdrop-blur-md animate-in slide-in-from-top-2">
            <nav className="container mx-auto px-4 py-6 space-y-1">
              {/* Products Section */}
              <div className="mb-6">
                <div className="px-3 py-2.5 text-xs font-bold text-brand-darkBlue/50 uppercase tracking-wider mb-3">
                  Продукты
                </div>
                <div className="space-y-1">
                  {productItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive(item.path)
                          ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                          : 'text-brand-darkBlue/70 hover:bg-brand-lightBlue/40 hover:text-brand-darkBlue'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Nav Items */}
              <div className="space-y-1">
                <Link
                  to="/integrations"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive('/integrations')
                      ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                      : 'text-brand-darkBlue/70 hover:bg-brand-lightBlue/40 hover:text-brand-darkBlue'
                  )}
                >
                  Интеграции
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive(item.path)
                        ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                        : 'text-brand-darkBlue/70 hover:bg-brand-lightBlue/40 hover:text-brand-darkBlue'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 space-y-2 border-t border-brand-lightTeal/20 mt-6">
                <Button
                  variant="outline"
                  className="w-full h-11 font-medium"
                  onClick={() => {
                    setContactFormOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Получить демо
                </Button>
                <Button
                  className="w-full h-11 font-medium"
                  onClick={() => window.open('https://app.delever.io', '_blank')}
                >
                  Войти в систему
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

