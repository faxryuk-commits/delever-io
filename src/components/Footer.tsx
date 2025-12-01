import { Link } from 'react-router-dom'
import { MapPin, Linkedin, Globe, ChevronDown, Send, Instagram, Phone, Mail, BookOpen, Code, Bell, Activity, Users } from 'lucide-react'
import { Logo } from './Logo'
import { useState } from 'react'

export function Footer() {
  const [languageOpen, setLanguageOpen] = useState(false)

  const mapLink = 'https://maps.app.goo.gl/1iobehkkfP83hAMj6'

  return (
    <footer className="bg-brand-darkBlue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="white" height={40} />
            </Link>
            <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-xs">
              Операционная система для доставки. Управляйте всеми каналами продаж из одного окна.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-2 mb-4">
              <a 
                href="https://www.linkedin.com/company/98819489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/delever.uz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://t.me/deleverme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="px-3 py-2 border border-white/20 rounded-lg flex items-center gap-2 hover:border-white/40 transition-colors text-sm"
              >
                <Globe className="h-4 w-4" />
                <span>Русский</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Продукты */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Продукты</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-white/60 hover:text-white transition-colors">
                  Обзор платформы
                </Link>
              </li>
              <li>
                <Link to="/products/channels" className="text-white/60 hover:text-white transition-colors">
                  Каналы продаж
                </Link>
              </li>
              <li>
                <Link to="/products/operations" className="text-white/60 hover:text-white transition-colors">
                  Операции доставки
                </Link>
              </li>
              <li>
                <Link to="/products/analytics" className="text-white/60 hover:text-white transition-colors">
                  Аналитика
                </Link>
              </li>
              <li>
                <Link to="/products/marketing" className="text-white/60 hover:text-white transition-colors">
                  Маркетинг и CRM
                </Link>
              </li>
              <li>
                <Link to="/white-label" className="text-white/60 hover:text-white transition-colors">
                  White Label
                </Link>
              </li>
            </ul>
          </div>

          {/* Интеграции */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Интеграции</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/integrations" className="text-white/60 hover:text-white transition-colors">
                  Все интеграции
                </Link>
              </li>
              <li>
                <Link to="/integrations#pos" className="text-white/60 hover:text-white transition-colors">
                  POS-системы
                </Link>
              </li>
              <li>
                <Link to="/integrations#aggregators" className="text-white/60 hover:text-white transition-colors">
                  Агрегаторы
                </Link>
              </li>
              <li>
                <Link to="/integrations#payments" className="text-white/60 hover:text-white transition-colors">
                  Платёжные системы
                </Link>
              </li>
              <li>
                <Link to="/integrations#delivery" className="text-white/60 hover:text-white transition-colors">
                  Службы доставки
                </Link>
              </li>
            </ul>
          </div>

          {/* Ресурсы */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ресурсы</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://delever.gitbook.io/delever" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  База знаний
                </a>
              </li>
              <li>
                <a 
                  href="https://delever.gitbook.io/delever/for-developers/soon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Code className="h-3.5 w-3.5" />
                  API документация
                </a>
              </li>
              <li>
                <a 
                  href="https://delever.gitbook.io/delever/description-updated/otchyoty-o-relizakh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Bell className="h-3.5 w-3.5" />
                  Обновления
                </a>
              </li>
              <li>
                <a 
                  href="https://status.delevr.uz/status/system" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Activity className="h-3.5 w-3.5" />
                  Статус системы
                </a>
              </li>
              <li>
                <Link to="/partners" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  Партнёрам
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Контакты</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="tel:+998781139813" 
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5" />
                  +998 78 113 98 13
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@delever.uz" 
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="h-3.5 w-3.5" />
                  support@delever.uz
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/deleverme"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  @deleverme
                </a>
              </li>
              <li>
                <a 
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-start gap-2"
                >
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>Ташкент, Амира Темура 129Б</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Bar - Compact */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Бизнесов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Стран</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">40+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Интеграций</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">13M+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Заказов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Delever. Все права защищены.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <Link to="#" className="hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
