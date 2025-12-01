import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { 
  ArrowRight, 
  Smartphone, 
  Palette, 
  Rocket, 
  Shield, 
  Star,
  Clock,
  Check,
  ChevronDown,
  Zap,
  Bell,
  CreditCard,
  MapPin,
  Heart,
  Gift,
  BarChart3,
  MessageSquare,
  Store,
  Pizza,
  Coffee,
  ShoppingBag,
  Building2
} from 'lucide-react'

// Статистика
const stats = [
  { value: '+60%', label: 'Рост выручки', sublabel: 'в среднем за год' },
  { value: '×2.3', label: 'Больше заказов', sublabel: 'чем через сайт' },
  { value: '-22%', label: 'Меньше расходов', sublabel: 'на привлечение' },
  { value: '4.8', label: 'Рейтинг в сторах', sublabel: 'средняя оценка' },
]

// Преимущества
const benefits = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: 'Полная кастомизация',
    description: 'Ваш логотип, цвета, шрифты. Приложение выглядит как собственная разработка',
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: 'Запуск за 2 недели',
    description: 'Публикация в App Store и Google Play. Без месяцев разработки',
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: 'Push-уведомления',
    description: 'Возвращайте клиентов. Уведомления об акциях, статусе заказа',
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Программа лояльности',
    description: 'Бонусы, кэшбэк, реферальная программа — всё из коробки',
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Онлайн-оплата',
    description: 'Payme, Click, Uzum Bank и другие платёжные системы',
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Отслеживание курьера',
    description: 'Клиент видит курьера на карте в реальном времени',
  },
]

// Функции приложения
const features = [
  { icon: <Zap />, title: 'Заказ в 2 касания', desc: 'Сохранение данных, быстрый повтор заказа' },
  { icon: <MapPin />, title: 'Зоны доставки', desc: 'Разные условия для разных районов' },
  { icon: <Clock />, title: 'Выбор времени', desc: 'Заказ на сейчас или на конкретное время' },
  { icon: <Gift />, title: 'Промокоды', desc: 'Гибкая система скидок и акций' },
  { icon: <Star />, title: 'Отзывы', desc: 'Сбор обратной связи после заказа' },
  { icon: <BarChart3 />, title: 'Аналитика', desc: 'Данные о поведении пользователей' },
  { icon: <MessageSquare />, title: 'Чат поддержки', desc: 'Встроенный чат с оператором' },
  { icon: <Shield />, title: 'Безопасность', desc: 'Защита данных и платежей' },
]

// Для кого
const segments = [
  { icon: <Pizza />, title: 'Пиццерии', color: 'from-orange-400 to-red-500' },
  { icon: <Coffee />, title: 'Кофейни', color: 'from-amber-400 to-orange-500' },
  { icon: <Store />, title: 'Рестораны', color: 'from-emerald-400 to-teal-500' },
  { icon: <ShoppingBag />, title: 'Магазины', color: 'from-blue-400 to-indigo-500' },
  { icon: <Building2 />, title: 'Сети', color: 'from-purple-400 to-pink-500' },
]

// Процесс
const process = [
  { step: '01', title: 'Бриф', desc: 'Обсуждаем ваш бренд, цели и пожелания' },
  { step: '02', title: 'Дизайн', desc: 'Адаптируем приложение под ваш стиль' },
  { step: '03', title: 'Тестирование', desc: 'Проверяем все функции вместе с вами' },
  { step: '04', title: 'Публикация', desc: 'Размещаем в App Store и Google Play' },
]

// FAQ
const faq = [
  {
    q: 'Это будет наше приложение?',
    a: 'Да, приложение публикуется от имени вашей компании в App Store и Google Play. Ваш логотип, название, описание. Клиенты видят только ваш бренд.',
  },
  {
    q: 'Сколько времени занимает запуск?',
    a: 'От брифа до публикации в сторах — 2 недели. Если у вас уже есть брендбук и контент, можем запустить ещё быстрее.',
  },
  {
    q: 'Есть ли комиссия с заказов?',
    a: 'Нет, мы не берём комиссию с заказов. Вы платите только фиксированную стоимость за приложение и ежемесячную подписку на платформу Delever.',
  },
  {
    q: 'Что входит в стоимость?',
    a: 'Разработка и публикация приложения для iOS и Android, кастомизация дизайна, интеграция с Delever, push-уведомления, программа лояльности, техподдержка.',
  },
  {
    q: 'Можно ли обновлять приложение?',
    a: 'Да, вы можете менять меню, цены, акции, баннеры через админку Delever. Обновления применяются мгновенно без переустановки приложения.',
  },
]

export function WhiteLabel() {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue via-[#003d66] to-[#00527a]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <FadeInOnScroll>
              <div className="text-center max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm text-white/90 mb-8">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  Премиум решение для вашего бизнеса
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                  Своё приложение —
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    +60% к выручке
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Мобильное приложение под вашим брендом. Без комиссий агрегаторов, с программой лояльности и push-уведомлениями
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <Button 
                    size="lg" 
                    onClick={() => setContactFormOpen(true)}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-brand-darkBlue font-bold text-lg px-8 py-6"
                  >
                    Получить презентацию
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setContactFormOpen(true)}
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                  >
                    Рассчитать стоимость
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/90 font-medium">{stat.label}</div>
                      <div className="text-white/60 text-sm">{stat.sublabel}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* App Preview Section - Placeholder */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Приложение топ-уровня
                </h2>
                <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto">
                  Красивое, быстрое и функциональное. Как у лидеров рынка, но под вашим брендом
                </p>
              </div>
            </FadeInOnScroll>

            {/* Phone Mockup Placeholder */}
            <FadeInOnScroll delay={0.2}>
              <div className="flex justify-center items-center gap-8 mb-16">
                {[1, 2, 3].map((_, idx) => (
                  <div 
                    key={idx}
                    className={`relative ${idx === 1 ? 'scale-110 z-10' : 'opacity-70 scale-95'}`}
                  >
                    <div className="w-[200px] md:w-[280px] h-[400px] md:h-[560px] bg-gradient-to-br from-brand-lightBlue to-brand-lightBeige rounded-[40px] border-8 border-brand-darkBlue/10 shadow-2xl flex flex-col items-center justify-center p-6">
                      <Smartphone className="h-16 w-16 text-brand-darkBlue/30 mb-4" />
                      <div className="text-center">
                        <div className="text-brand-darkBlue/50 font-medium mb-2">Скриншот приложения</div>
                        <div className="text-brand-darkBlue/30 text-sm">Скоро здесь будет пример</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInOnScroll>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.05}>
                  <div className="bg-brand-lightBlue/50 rounded-xl p-5 hover:bg-brand-lightBlue transition-colors">
                    <div className="text-brand-darkBlue mb-3">{feature.icon}</div>
                    <h3 className="font-semibold text-brand-darkBlue mb-1">{feature.title}</h3>
                    <p className="text-sm text-brand-darkBlue/60">{feature.desc}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Почему своё приложение?
                </h2>
                <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto">
                  Клиенты в приложении заказывают в 2.3 раза чаще и тратят больше
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-lightBlue to-brand-lightTeal rounded-2xl flex items-center justify-center text-brand-darkBlue mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-brand-darkBlue mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-darkBlue/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* For Who Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Для любого формата
                </h2>
                <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto">
                  Адаптируем приложение под особенности вашего бизнеса
                </p>
              </div>
            </FadeInOnScroll>

            <div className="flex flex-wrap justify-center gap-6">
              {segments.map((segment, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="group cursor-pointer">
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${segment.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-center">
                        <div className="mb-2">{segment.icon}</div>
                        <div className="font-semibold">{segment.title}</div>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-darkBlue to-[#003d66]">
          <div className="container mx-auto max-w-7xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  Запуск за 2 недели
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  От идеи до публикации в App Store и Google Play
                </p>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((item, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.15}>
                  <div className="relative">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                      <div className="text-5xl font-bold text-white/20 mb-4">{item.step}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                    {idx < process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-white/30" />
                      </div>
                    )}
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-5xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Выгоднее агрегаторов
                </h2>
                <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto">
                  Сравните затраты и возможности
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Aggregators */}
                <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                  <div className="text-red-600 font-bold text-lg mb-6">Агрегаторы</div>
                  <ul className="space-y-4">
                    {[
                      'Комиссия 15-35% с каждого заказа',
                      'Клиенты не ваши, а агрегатора',
                      'Нет данных о клиентах',
                      'Конкуренция с другими ресторанами',
                      'Нет программы лояльности',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-600 text-xs">✕</span>
                        </div>
                        <span className="text-red-900/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* White Label */}
                <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-200">
                  <div className="text-emerald-600 font-bold text-lg mb-6">Своё приложение</div>
                  <ul className="space-y-4">
                    {[
                      'Без комиссий — фиксированная цена',
                      '100% клиентов — ваши',
                      'Полная база данных клиентов',
                      'Только ваш бренд в приложении',
                      'Встроенная программа лояльности',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-emerald-900/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
          <div className="container mx-auto max-w-4xl">
            <FadeInOnScroll>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Gift className="h-4 w-4" />
                  Специальное предложение
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">
                  13,000,000 <span className="text-2xl text-brand-darkBlue/60">soʼm</span>
                </h2>
                
                <p className="text-xl text-brand-darkBlue/70 mb-8">
                  Единоразовая оплата за разработку и публикацию
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    'iOS приложение',
                    'Android приложение',
                    'Кастомный дизайн',
                    'Публикация в сторах',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2 text-brand-darkBlue/80">
                      <Check className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  onClick={() => setContactFormOpen(true)}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-brand-darkBlue font-bold text-lg px-12 py-6"
                >
                  Заказать приложение
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-3xl">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
                  Частые вопросы
                </h2>
              </div>
            </FadeInOnScroll>

            <div className="space-y-4">
              {faq.map((item, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-brand-lightBeige rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between"
                    >
                      <span className="font-semibold text-brand-darkBlue text-lg">{item.q}</span>
                      <ChevronDown className={`h-5 w-5 text-brand-darkBlue transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6">
                        <p className="text-brand-darkBlue/70 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-darkBlue to-[#003d66]">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeInOnScroll>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Готовы увеличить выручку?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Оставьте заявку — покажем демо и рассчитаем стоимость для вашего бизнеса
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => setContactFormOpen(true)}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-brand-darkBlue font-bold text-lg px-8 py-6"
                >
                  Получить презентацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.open('https://t.me/deleverme', '_blank')}
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Написать в Telegram
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </div>

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} tag="white-label" />
    </>
  )
}

