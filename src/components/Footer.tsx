import { Link } from 'react-router-dom'
import { MapPin, Linkedin, Globe, ChevronDown, Send, Instagram } from 'lucide-react'
import { Logo } from './Logo'
import { useState } from 'react'

export function Footer() {
  const [languageOpen, setLanguageOpen] = useState(false)

  // Ссылка на Google Maps офиса
  const mapLink = 'https://maps.app.goo.gl/1iobehkkfP83hAMj6'

  return (
    <footer className="bg-brand-darkBlue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <Logo variant="white" height={44} withHover />
            </Link>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Операционная система для доставки. Единая платформа для управления всеми каналами
              продаж, операциями и аналитикой.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://www.linkedin.com/company/98819489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/delever.uz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/deleverme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
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
                <a href="mailto:support@delever.uz" className="text-white/70 hover:text-white transition-colors">
                  Связаться с нами
                </a>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <a 
                  href="https://t.me/deleverme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Telegram канал
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
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  POS-системы
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Агрегаторы
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Платёжные шлюзы
                </Link>
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
                  Рестораны и кафе
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors">
                  Магазины и аптеки
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors">
                  Dark Kitchen
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Map & Contact Section */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="rounded-xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.7241415055043!2d69.28796162216315!3d41.35571602294045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KLQsNGI0LrQtdC90YIsINCf0YDQvtGB0L_QtdC60YIg0JDQvNC40YDQsCDQotC10LzRg9GA0LAgMTI50JEsINCQ0L3QvtGAINCf0LvQsNC30LA!5e0!3m2!1sru!2s!4v1764602935288!5m2!1sru!2s" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Офис Delever на карте"
                className="rounded-xl"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base mb-4">Контакты</h3>
              <a 
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors flex items-start space-x-3"
              >
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Ташкент, Проспект Амира Темура 129Б<br />БЦ Анор Плаза, 2 этаж, офис 1</span>
              </a>
              <a 
                href="tel:+998781139813" 
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center space-x-3"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+998 78 113 98 13</span>
              </a>
              <a 
                href="mailto:support@delever.uz" 
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center space-x-3"
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@delever.uz</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Delever. Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="https://www.linkedin.com/company/98819489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/delever.uz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/deleverme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
