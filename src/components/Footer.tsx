import { Link } from 'react-router-dom'
import { MapPin, Linkedin, Globe, ChevronDown, Send, Instagram, Phone, Mail } from 'lucide-react'
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

            {/* Language Selector */}
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

          {/* Продукты */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Продукты</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors">
                  Обзор платформы
                </Link>
              </li>
              <li>
                <Link to="/products/channels" className="text-white/70 hover:text-white transition-colors">
                  Каналы продаж
                </Link>
              </li>
              <li>
                <Link to="/products/operations" className="text-white/70 hover:text-white transition-colors">
                  Операции доставки
                </Link>
              </li>
              <li>
                <Link to="/products/analytics" className="text-white/70 hover:text-white transition-colors">
                  Аналитика
                </Link>
              </li>
              <li>
                <Link to="/products/marketing" className="text-white/70 hover:text-white transition-colors">
                  Маркетинг и CRM
                </Link>
              </li>
              <li>
                <Link to="/white-label" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  White Label приложение
                  <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded">NEW</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Интеграции */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Интеграции</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Все интеграции (40+)
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  POS-системы
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Агрегаторы заказов
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Платёжные системы
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-white transition-colors">
                  Службы доставки
                </Link>
              </li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Компания</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Тарифы и цены
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Партнёрская программа
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
              <li>
                <a 
                  href="https://admin.delever.uz/#/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Вход в систему
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:+998781139813" 
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  +998 78 113 98 13
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@delever.uz" 
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  support@delever.uz
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/deleverme"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  @deleverme
                </a>
              </li>
              <li>
                <a 
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-start gap-2"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Ташкент, Амира Темура 129Б<br />БЦ Анор Плаза, 2 этаж</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.7241415055043!2d69.28796162216315!3d41.35571602294045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KLQsNGI0LrQtdC90YIsINCf0YDQvtGB0L_QtdC60YIg0JDQvNC40YDQsCDQotC10LzRg9GA0LAgMTI50JEsINCQ0L3QvtGAINCf0LvQsNC30LA!5e0!3m2!1sru!2s!4v1764602935288!5m2!1sru!2s" 
                width="100%" 
                height="180" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Офис Delever на карте"
                className="rounded-xl"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-white/60">Бизнесов</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">5</div>
                <div className="text-sm text-white/60">Стран</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">40+</div>
                <div className="text-sm text-white/60">Интеграций</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">13M+</div>
                <div className="text-sm text-white/60">Заказов</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Delever. Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="https://www.linkedin.com/company/98819489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/delever.uz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/deleverme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
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
