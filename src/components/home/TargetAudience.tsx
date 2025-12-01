import { Utensils, Store, Pill, Flower2, ShoppingBag, Milk, Droplets, Building2, Truck } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const audiences = [
  {
    icon: <Utensils className="h-6 w-6" />,
    title: 'Рестораны и кафе',
    pain: 'Высокие комиссии агрегаторов съедают прибыль. Нет контроля над данными клиентов',
    benefit: 'Собственные каналы продаж без комиссий. Полный контроль над клиентской базой',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: <Store className="h-6 w-6" />,
    title: 'Продуктовые магазины',
    pain: 'Сложно конкурировать с крупными маркетплейсами. Нет онлайн-присутствия',
    benefit: 'Собственное приложение и сайт. Быстрая доставка в радиусе магазина',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: 'Аптеки',
    pain: 'Клиенты уходят к конкурентам с доставкой. Нет удобного онлайн-заказа',
    benefit: 'Приложение для заказа лекарств. Интеграция с системой учёта',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Flower2 className="h-6 w-6" />,
    title: 'Цветочные магазины',
    pain: 'Сезонность спроса. Сложно управлять срочными заказами к праздникам',
    benefit: 'Онлайн-витрина с каталогом. Умная диспетчеризация срочных доставок',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: 'Магазины одежды',
    pain: 'Клиенты хотят примерку дома. Нет быстрой доставки в день заказа',
    benefit: 'Доставка в день заказа. Удобный возврат и обмен',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: <Milk className="h-6 w-6" />,
    title: 'Молочные продукты',
    pain: 'Короткий срок хранения. Нужна регулярная доставка по подписке',
    benefit: 'Подписки на регулярную доставку. Планирование маршрутов',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: 'Доставка воды',
    pain: 'Ручное управление подписками. Много звонков для приёма заказов',
    benefit: 'Автоматические подписки. Telegram-бот для заказа воды',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Сети и франшизы',
    pain: 'Каждая точка работает отдельно. Нет единой аналитики',
    benefit: 'Централизованное управление. Единые стандарты и отчётность',
    color: 'bg-slate-50 text-slate-600',
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Любой бизнес с доставкой',
    pain: 'Нужна своя система доставки, но нет ресурсов на разработку',
    benefit: 'Готовая платформа за неделю. Без разработки с нуля',
    color: 'bg-amber-50 text-amber-600',
  },
]

export function TargetAudience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Для любого бизнеса с доставкой
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              От ресторанов до аптек — одна платформа для всех сегментов
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.05}>
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-brand-lightTeal/20 flex flex-col h-full group hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${audience.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {audience.icon}
                </div>
                <h3 className="text-lg font-semibold text-brand-darkBlue mb-3 tracking-tight">
                  {audience.title}
                </h3>
                <div className="space-y-3 flex-grow">
                  <div>
                    <p className="text-xs font-medium text-red-500/80 mb-1 uppercase tracking-wide">
                      Проблема
                    </p>
                    <p className="text-sm text-brand-darkBlue/60 leading-relaxed">{audience.pain}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-600/80 mb-1 uppercase tracking-wide">
                      Решение
                    </p>
                    <p className="text-sm text-brand-darkBlue/70 leading-relaxed">{audience.benefit}</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
