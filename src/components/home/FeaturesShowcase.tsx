import React from 'react'
import { Link } from 'react-router-dom'
import { Bot, Globe, Smartphone, QrCode, Monitor, Phone, ArrowRight } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const features: Feature[] = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: 'Telegram-бот',
    description: 'Принимайте заказы прямо в мессенджере. Клиенты заказывают без установки приложений, вы получаете заказы в единой системе.',
    link: '/products/channels#telegram',
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Веб-сайт',
    description: 'Собственный сайт с онлайн-заказом под вашим брендом. Полный контроль над данными клиентов и отсутствие комиссий агрегаторов.',
    link: '/products/channels#website',
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: 'Мобильное приложение',
    description: 'Нативные iOS и Android приложения с вашим брендингом. Прямой канал связи с клиентами и возможность push-уведомлений.',
    link: '/products/channels#app',
  },
  {
    icon: <QrCode className="h-8 w-8" />,
    title: 'QR-меню',
    description: 'Бесконтактное меню с функцией заказа. Клиенты сканируют QR-код и сразу могут сделать заказ без установки приложений.',
    link: '/products/channels#qr',
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    title: 'Киоск',
    description: 'Сенсорные киоски для зала ресторана. Самообслуживание снижает нагрузку на официантов и увеличивает средний чек.',
    link: '/products/channels#kiosk',
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: 'Колл-центр',
    description: 'Единая система обработки телефонных заказов. Все заказы попадают в общую систему вместе с онлайн-заказами.',
    link: '/products/channels#callcenter',
  },
]

export function FeaturesShowcase() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Собственные каналы продаж
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Запустите все цифровые каналы продаж под вашим брендом. Единый каталог, общие акции и один профиль клиента во всех каналах.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.1}>
              <Link to={feature.link} className="block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-brand-lightTeal/20 hover:border-brand-blue/30 group flex flex-col h-full">
                  <div className="text-brand-darkBlue mb-5 group-hover:scale-110 group-hover:text-brand-blue transition-all duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-3 tracking-tight group-hover:text-brand-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-brand-darkBlue/65 leading-relaxed flex-grow mb-4">{feature.description}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-brand-darkBlue/60 group-hover:text-brand-blue transition-colors">
                    <span>Подробнее</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

