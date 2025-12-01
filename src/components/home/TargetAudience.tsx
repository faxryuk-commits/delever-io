import { Utensils, Coffee, Building2, Store, Users } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const audiences = [
  {
    icon: <Utensils className="h-6 w-6" />,
    title: 'Рестораны',
    pain: 'Высокие комиссии агрегаторов съедают прибыль. Нет контроля над данными клиентов',
    benefit: 'Собственные каналы продаж без комиссий. Полный контроль над клиентской базой и маркетингом',
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: 'Кафе',
    pain: 'Ошибки при ручном приёме заказов. Персонал тратит время на телефонные звонки',
    benefit: 'Автоматизация приёма заказов снижает ошибки на 90%. Персонал фокусируется на качестве',
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Облачные кухни',
    pain: 'Сложно управлять несколькими брендами и отслеживать заказы из разных источников',
    benefit: 'Единая платформа для всех брендов. Централизованное управление заказами и меню',
  },
  {
    icon: <Store className="h-6 w-6" />,
    title: 'Сети ресторанов',
    pain: 'Каждая точка работает отдельно. Нет единой аналитики и контроля качества',
    benefit: 'Централизованное управление всеми точками. Единая аналитика и стандарты качества',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Франшизы',
    pain: 'Франчайзи используют разные системы. Нет единых стандартов и контроля',
    benefit: 'Единая платформа для всех франчайзи с индивидуальными настройками и централизованной аналитикой',
  },
]

export function TargetAudience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Для кого Delever
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Решение для всех типов заведений общественного питания
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-brand-lightTeal/20 flex flex-col h-full">
              <div className="text-brand-darkBlue mb-5">{audience.icon}</div>
              <h3 className="text-xl font-semibold text-brand-darkBlue mb-4 tracking-tight">
                {audience.title}
              </h3>
              <div className="space-y-3 flex-grow">
                <div>
                  <p className="text-sm font-medium text-brand-darkBlue/55 mb-1">
                    Проблема:
                  </p>
                  <p className="text-sm text-brand-darkBlue/65 leading-relaxed">{audience.pain}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-darkBlue/70 mb-1">Выгода:</p>
                  <p className="text-sm text-brand-darkBlue/65 leading-relaxed">{audience.benefit}</p>
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

