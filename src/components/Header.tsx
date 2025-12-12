import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Truck, BarChart3, Megaphone, Plug, ChevronDown, Layers, Sparkles, Stethoscope, BookOpen, TrendingUp, Users, Building2 } from 'lucide-react'
import { Button } from './ui/Button'
import { ContactForm } from './ContactForm'
import { Logo } from './Logo'
import { LocaleSwitcher } from './LocaleSwitcher'
import { useLocale } from '@/i18n/LocaleContext'
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
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useLocale()

  const productCategories = [
    {
      categoryKey: 'header.ownChannels',
      items: [
        { path: '/products/channels', labelKey: 'header.channels', icon: <ShoppingCart className="h-5 w-5" />, descKey: 'header.channelsDesc' },
      ],
    },
    {
      categoryKey: 'header.operations',
      items: [
        { path: '/products/operations', labelKey: 'header.operationsItem', icon: <Truck className="h-5 w-5" />, descKey: 'header.operationsDesc' },
      ],
    },
    {
      categoryKey: 'header.analytics',
      items: [
        { path: '/products/analytics', labelKey: 'header.analyticsItem', icon: <BarChart3 className="h-5 w-5" />, descKey: 'header.analyticsDesc' },
      ],
    },
    {
      categoryKey: 'header.marketing',
      items: [
        { path: '/products/marketing', labelKey: 'header.marketingItem', icon: <Megaphone className="h-5 w-5" />, descKey: 'header.marketingDesc' },
        { path: '/ai-marketing', labelKey: 'nav.aiMarketing', icon: <Sparkles className="h-5 w-5" />, descKey: 'nav.aiMarketingDesc' },
        { path: '/menu-doctor', labelKey: 'nav.menuDoctor', icon: <Stethoscope className="h-5 w-5" />, descKey: 'nav.menuDoctorDesc' },
      ],
    },
    {
      categoryKey: 'header.aggregatorsCategory',
      items: [
        { path: '/aggregators', labelKey: 'nav.aggregators', icon: <Layers className="h-5 w-5" />, descKey: 'header.aggregatorsDesc' },
        { path: '/integrations', labelKey: 'nav.integrations', icon: <Plug className="h-5 w-5" />, descKey: 'header.integrationsDesc' },
      ],
    },
  ]

  const productItems = [
    { path: '/products', labelKey: 'header.allProducts' },
    { path: '/products/channels', labelKey: 'header.channels' },
    { path: '/products/operations', labelKey: 'header.operationsShort' },
    { path: '/products/analytics', labelKey: 'header.analyticsShort' },
    { path: '/products/marketing', labelKey: 'header.marketingShort' },
    { path: '/integrations', labelKey: 'nav.integrations' },
  ]

  const navItems = [
    { path: '/aggregators', labelKey: 'nav.aggregators' },
    { path: '/pricing', labelKey: 'nav.pricing' },
    { path: '/partners', labelKey: 'nav.partners' },
  ]

  const aboutItems = [
    { path: '/about', label: 'О компании', icon: <Building2 className="h-5 w-5" />, desc: 'Наша история и миссия' },
    { path: '/clients', label: 'Клиенты', icon: <Users className="h-5 w-5" />, desc: '500+ ресторанов' },
    { path: '/guides', label: 'Гайды', icon: <BookOpen className="h-5 w-5" />, desc: 'Статьи для бизнеса' },
    { path: '/case-studies', label: 'Кейсы', icon: <TrendingUp className="h-5 w-5" />, desc: 'Истории успеха' },
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
      <header className="fixed top-9 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-lightTeal/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo height={42} withHover withGlow />
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
                  {t('nav.products')}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', productsMenuOpen && 'rotate-180')} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[820px] p-8 mt-2 shadow-lg border border-brand-lightTeal/30 bg-white">
                  <div className="grid grid-cols-5 gap-6">
                    {productCategories.map((category, catIdx) => (
                      <div key={catIdx} className="space-y-4">
                        <h4 className="text-[10px] font-bold text-brand-darkBlue/50 uppercase tracking-widest mb-4">
                          {t(category.categoryKey)}
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
                                  {t(item.labelKey)}
                                </div>
                                <div className="text-xs text-brand-darkBlue/55 leading-relaxed">
                                  {t(item.descKey)}
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
                      {t('header.allProducts')}
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
                {t('nav.integrations')}
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
                  {t(item.labelKey)}
                </Link>
              ))}

              {/* About Dropdown */}
              <DropdownMenu open={aboutMenuOpen} onOpenChange={setAboutMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                      (isActive('/about') || isActive('/guides') || isActive('/case-studies') || isActive('/clients'))
                        ? 'bg-brand-lightBlue/60 text-brand-darkBlue font-semibold'
                        : 'text-brand-darkBlue/70 hover:text-brand-darkBlue hover:bg-brand-lightBlue/40'
                    )}
                  >
                    {t('nav.about')}
                    <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', aboutMenuOpen && 'rotate-180')} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 bg-white rounded-xl shadow-xl border border-brand-lightTeal/20">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setAboutMenuOpen(false)}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg hover:bg-brand-lightBlue/30 transition-colors',
                        isActive(item.path) && 'bg-brand-lightBlue/20'
                      )}
                    >
                      <div className="text-brand-darkBlue/70 mt-0.5">{item.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-brand-darkBlue">{item.label}</div>
                        <div className="text-xs text-brand-darkBlue/50">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Language Switcher - visible on all screens */}
              <LocaleSwitcher />

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open('https://admin.delever.uz/#/login', '_blank')}
                  className="h-9 px-4 text-sm font-medium"
                >
                  {t('nav.login')}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setContactFormOpen(true)}
                  className="h-9 px-4 text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  {t('nav.start')}
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
                  {t('nav.products')}
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
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Nav Items */}
              <div className="space-y-1">
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
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-brand-lightTeal/20 space-y-2">
                <Button
                  variant="outline"
                  className="w-full h-11 font-medium"
                  onClick={() => window.open('https://admin.delever.uz/#/login', '_blank')}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  className="w-full h-11 font-medium bg-gradient-to-r from-emerald-500 to-teal-500"
                  onClick={() => {
                    setContactFormOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  {t('nav.start')}
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

