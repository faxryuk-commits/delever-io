import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { ProcessFlow } from '@/components/home/ProcessFlow'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Megaphone, 
  ArrowRight,
  XCircle,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Brain,
  Mail,
  Gift
} from 'lucide-react'

export function Products() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const products = [
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Каналы продаж',
      subtitle: 'Собственные каналы под вашим брендом',
      description: 'Запустите сайт, приложение, Telegram-бот, QR-меню и другие каналы без комиссий агрегаторов. Все заказы в единой системе с полным контролем над данными клиентов.',
      link: '/products/channels',
      problems: [
        'Высокие комиссии агрегаторов (20-35%) съедают прибыль',
        'Нет прямого общения с клиентами',
        'Потеря брендинга среди конкурентов',
      ],
      solutions: [
        'Заказы без комиссий: сохраняйте 100% выручки',
        'Push-уведомления: общайтесь с клиентами напрямую',
        'Ваш бренд: ваш логотип, ваши цвета, ваш опыт',
      ],
      features: [
        { icon: <ShoppingCart className="h-6 w-6" />, title: 'Telegram-бот', desc: 'Принимайте заказы прямо в мессенджере' },
        { icon: <Users className="h-6 w-6" />, title: 'Веб-сайт', desc: 'Собственный сайт с онлайн-заказом' },
        { icon: <Zap className="h-6 w-6" />, title: 'Мобильное приложение', desc: 'iOS и Android приложения под вашим брендом' },
        { icon: <Gift className="h-6 w-6" />, title: 'QR-меню', desc: 'Бесконтактное меню с функцией заказа' },
      ],
      color: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Операции',
      subtitle: 'Полный контроль над доставкой',
      description: 'Управляйте диспетчеризацией, курьерами и кухней из одного окна. Автоматизация процессов снижает ошибки и ускоряет доставку на 30%.',
      link: '/products/operations',
      problems: [
        'Ошибки при ручном вводе заказов',
        'Невозможность отследить заказ от приёма до доставки',
        'Высокие операционные расходы',
      ],
      solutions: [
        'Автоматический приём и передача заказов в кассу и на кухню',
        'Полный контроль над каждым заказом в реальном времени',
        'Снижение операционных затрат на 20%',
      ],
      features: [
        { icon: <Truck className="h-6 w-6" />, title: 'Диспетчеризация', desc: 'Автоматическое распределение заказов' },
        { icon: <Users className="h-6 w-6" />, title: 'Курьерский модуль', desc: 'Приложение для курьеров с навигацией' },
        { icon: <Zap className="h-6 w-6" />, title: 'Рабочие места', desc: 'Интерфейсы для операторов и кухни' },
        { icon: <CheckCircle className="h-6 w-6" />, title: 'Стабильность 99.9%', desc: 'Гарантированная работа 24/7' },
      ],
      color: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Аналитика',
      subtitle: 'Управление на основе данных',
      description: 'Принимайте решения на основе данных, а не интуиции. Дашборды, отчёты и AI-прогнозы помогают оптимизировать меню, запасы и увеличивать прибыль.',
      link: '/products/analytics',
      problems: [
        'Нет данных для принятия решений',
        'Не понимаете, какие блюда прибыльны',
        'Сложно прогнозировать спрос',
      ],
      solutions: [
        'Персонализированные дашборды для владельца и управляющего',
        'ABC-XYZ анализ для оптимизации меню',
        'AI-прогнозы спроса для оптимизации закупок',
      ],
      features: [
        { icon: <BarChart3 className="h-6 w-6" />, title: 'Дашборды', desc: 'Все метрики в реальном времени' },
        { icon: <TrendingUp className="h-6 w-6" />, title: 'Анализ продаж', desc: 'Детальный анализ по каналам и продуктам' },
        { icon: <Brain className="h-6 w-6" />, title: 'AI-прогнозы', desc: 'Предсказание спроса на блюда' },
        { icon: <Users className="h-6 w-6" />, title: 'KPI и эффективность', desc: 'Отслеживание эффективности каждого канала' },
      ],
      color: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: 'Маркетинг',
      subtitle: 'Лояльность на автопилоте',
      description: 'Автоматизируйте маркетинг с помощью RFM-анализа и триггерных рассылок. Персонализируйте предложения для каждого клиента и увеличивайте средний чек на 25%.',
      link: '/products/marketing',
      problems: [
        'Клиенты забывают о вас',
        'Нет персонализации предложений',
        'Сложно вернуть уснувших клиентов',
      ],
      solutions: [
        'RFM-анализ для автоматической сегментации клиентов',
        'Персональные предложения на основе истории заказов',
        'Автоматические триггерные рассылки',
      ],
      features: [
        { icon: <Users className="h-6 w-6" />, title: 'RFM-анализ', desc: 'Автоматическая сегментация клиентов' },
        { icon: <Mail className="h-6 w-6" />, title: 'Персонализированные рассылки', desc: 'Telegram, SMS и push-уведомления' },
        { icon: <Gift className="h-6 w-6" />, title: 'Программы лояльности', desc: 'Бонусные программы и промокоды' },
        { icon: <Zap className="h-6 w-6" />, title: 'Автоматические кампании', desc: 'Триггерные рассылки для каждого клиента' },
      ],
      color: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
  ]

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Всё необходимое для роста
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">вашего бизнеса</span>
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 leading-relaxed font-light">
                Четыре модуля, которые работают вместе как единая система. От приёма заказов до аналитики и маркетинга — всё в одной платформе.
              </p>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Process Flow */}
        <ProcessFlow />

        {/* Products Grid */}
        <section className="container mx-auto max-w-7xl space-y-24 mb-20 mt-20">
          {products.map((product, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.2}>
              <div className={`bg-gradient-to-br ${product.color} rounded-2xl p-8 md:p-12 shadow-lg`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${product.iconBg} rounded-xl p-3 text-white`}>
                      {product.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-brand-darkBlue mb-2">
                        {product.title}
                      </h2>
                      <p className="text-lg text-brand-darkBlue/70">{product.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-brand-darkBlue/80 mb-8 text-lg leading-relaxed">
                    {product.description}
                  </p>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/80 rounded-xl p-6 border-2 border-red-100">
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-brand-darkBlue">Проблема</h3>
                      </div>
                      <ul className="space-y-2">
                        {product.problems.map((problem, pIdx) => (
                          <li key={pIdx} className="text-sm text-brand-darkBlue/70 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/80 rounded-xl p-6 border-2 border-green-100">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-brand-darkBlue">Решение</h3>
                      </div>
                      <ul className="space-y-2">
                        {product.solutions.map((solution, sIdx) => (
                          <li key={sIdx} className="text-sm text-brand-darkBlue/70 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link to={product.link}>
                    <Button size="lg" className="group">
                      Узнать больше
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Right Column - Features */}
                <div className="bg-white/90 rounded-xl p-8 border-2 border-white/50">
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-6">Ключевые возможности</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-white rounded-lg p-4 border border-brand-lightTeal/30"
                      >
                        <div className="text-brand-darkBlue mb-2">{feature.icon}</div>
                        <h4 className="font-semibold text-brand-darkBlue mb-1 text-sm">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-brand-darkBlue/70">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </FadeInOnScroll>
          ))}
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-4xl">
          <div className="bg-gradient-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы начать?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Запустите собственную доставку за неделю. Получите демо и посмотрите, как Delever поможет увеличить прибыль
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.open('https://app.delever.io/register', '_blank')}
                className="group"
              >
                Запустить сейчас
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setContactFormOpen(true)}>
                Получить консультацию
              </Button>
            </div>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}
