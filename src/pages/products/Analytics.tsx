import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { PageNavigation } from '@/components/PageNavigation'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { BarChart3, TrendingUp, Package, Users, Brain, ArrowRight } from 'lucide-react'

export function Analytics() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Дашборды',
      description: 'Персонализированные дашборды для владельца и управляющего. Все ключевые метрики в реальном времени на одном экране.',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Анализ продаж',
      description: 'Детальный анализ заказов, выручки и среднего чека по каналам, времени суток, дням недели и продуктам.',
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: 'ABC-XYZ анализ',
      description: 'Определите самые прибыльные и популярные позиции. Оптимизируйте меню, убрав непопулярные блюда и увеличив прибыльность.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'KPI и эффективность',
      description: 'Отслеживайте эффективность каждого канала продаж, курьера, точки и оператора. Выявляйте лучшие практики и проблемные зоны.',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-прогнозы',
      description: 'Искусственный интеллект предсказывает спрос на блюда, помогая оптимизировать закупки и снижать потери продуктов.',
    },
  ]

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="container mx-auto max-w-7xl mb-12">
          <FadeInOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-darkBlue mb-6 tracking-tight">
                Аналитика и отчёты
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">для принятия решений</span>
              </h1>
              <p className="text-xl text-brand-darkBlue/80 mb-8 font-light leading-relaxed">
                Принимайте решения на основе данных, а не интуиции. Дашборды, отчёты и AI-прогнозы помогают оптимизировать меню, запасы и увеличивать прибыль.
              </p>
              <Button size="lg" onClick={() => setContactFormOpen(true)}>
                Подключить аналитику Delever
              </Button>
            </div>
          </FadeInOnScroll>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft border border-brand-lightTeal/20 hover:shadow-medium transition-all duration-300 flex flex-col h-full">
                  <div className="text-brand-darkBlue mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brand-darkBlue/80 flex-grow leading-relaxed">{feature.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview - Real Screenshots */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
                  Интерфейс аналитики
                </h2>
                <p className="text-xl text-brand-darkBlue/80">
                  Реальные дашборды и отчёты из системы Delever
                </p>
              </div>
            </FadeInOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard */}
              <FadeInOnScroll>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-lightTeal/20">
                  <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Дашборд</span>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src="/screenshots/dashboard.png" 
                      alt="Дашборд аналитики"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center text-brand-darkBlue/30">
                      <BarChart3 className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-darkBlue">Главный дашборд</h3>
                    <p className="text-sm text-brand-darkBlue/60">Выручка, заказы, средний чек, время доставки</p>
                  </div>
                </div>
              </FadeInOnScroll>

              {/* ABC/XYZ */}
              <FadeInOnScroll delay={0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-lightTeal/20">
                  <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">ABC/XYZ анализ</span>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src="/screenshots/products.png" 
                      alt="ABC/XYZ анализ продуктов"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center text-brand-darkBlue/30">
                      <Package className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-darkBlue">ABC/XYZ анализ продуктов</h3>
                    <p className="text-sm text-brand-darkBlue/60">Прибыльность и стабильность продаж каждого товара</p>
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Customers */}
              <FadeInOnScroll delay={0.2}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-lightTeal/20">
                  <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Клиенты</span>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src="/screenshots/customers.png" 
                      alt="Аналитика клиентов"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center text-brand-darkBlue/30">
                      <Users className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-darkBlue">Аналитика клиентов</h3>
                    <p className="text-sm text-brand-darkBlue/60">RFM-сегментация, ценность клиентов, частота заказов</p>
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Stats Summary */}
              <FadeInOnScroll delay={0.3}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-lightTeal/20 flex flex-col justify-center h-full">
                  <h3 className="text-2xl font-bold text-brand-darkBlue mb-6">Что вы получите</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-brand-darkBlue/80">Рост выручки на 20-30%</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-brand-darkBlue/80">Снижение потерь продуктов на 20%</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-brand-darkBlue/80">Повышение LTV клиентов на 25%</span>
                    </li>
                  </ul>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
                Как аналитика помогла нашим клиентам
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300">
                <h3 className="text-xl font-semibold text-brand-darkBlue mb-3">
                  Оптимизация меню
                </h3>
                <p className="text-brand-darkBlue/80">
                  Благодаря ABC-XYZ анализу клиент выявил непопулярные позиции и оптимизировал меню, что привело к росту среднего чека на 15%.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-brand-lightTeal/20 shadow-soft hover:shadow-medium transition-all duration-300">
                <h3 className="text-xl font-semibold text-brand-darkBlue mb-3">
                  Прогнозирование спроса
                </h3>
                <p className="text-brand-darkBlue/80">
                  AI-прогнозы помогли клиенту снизить потери продуктов на 20% и оптимизировать закупки.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Готовы начать управлять на основе данных?</h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Подключите аналитику Delever и получите полный контроль над бизнесом
            </p>
            <Button size="lg" variant="secondary" onClick={() => setContactFormOpen(true)}>
              Подключить аналитику
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      <PageNavigation />
      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
    </>
  )
}

