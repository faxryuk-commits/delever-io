import { Link } from 'react-router-dom'
import { MapPin, Linkedin, Youtube, Globe, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { useState } from 'react'

export function Footer() {
  const [languageOpen, setLanguageOpen] = useState(false)

  return (
    <footer className="bg-brand-darkBlue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="white" height={40} />
            </div>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Операционная система для доставки. Единая платформа для управления всеми каналами
              продаж, операциями и аналитикой.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://linkedin.com/company/delever" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/@delever" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Language & Region Selectors */}
            <div className="space-y-3">
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="w-full px-4 py-2 border border-white/20 rounded-lg flex items-center justify-between hover:border-white/40 transition-colors text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Русский</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Ресурсы</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Партнёрам
                </Link>
              </li>
              <li>
                <a href="mailto:info@delever.io" className="text-white/70 hover:text-white transition-colors">
                  Связаться с нами
                </a>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Истории клиентов
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Решения</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products/channels" className="text-white/70 hover:text-white transition-colors">
                  Каналы продаж
                </Link>
              </li>
              <li>
                <Link to="/products/operations" className="text-white/70 hover:text-white transition-colors">
                  Операции
                </Link>
              </li>
              <li>
                <Link to="/products/analytics" className="text-white/70 hover:text-white transition-colors">
                  Аналитика
                </Link>
              </li>
              <li>
                <Link to="/products/marketing" className="text-white/70 hover:text-white transition-colors">
                  Маркетинг
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Интеграции
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Интеграции</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Все интеграции
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  POS-системы
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Агрегаторы
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Онлайн-заказы
                </a>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Стать партнёром
                </Link>
              </li>
            </ul>
          </div>

          {/* Delever for */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Delever для</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors">
                  Рестораны
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Розничная торговля
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="space-y-2">
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} Delever. Все права защищены.
              </p>
              <p className="text-sm text-white/70 flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Ташкент, Узбекистан</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                Безопасность
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

