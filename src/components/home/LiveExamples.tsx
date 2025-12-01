import { ExternalLink, Smartphone, Globe, Apple } from 'lucide-react'
import { FadeInOnScroll } from '../ui/FadeInOnScroll'

const examples = [
  {
    name: 'Yaponamama',
    segment: 'Ресторан',
    description: 'Сеть японских ресторанов с доставкой',
    type: 'app',
    icon: '🍣',
    color: 'from-red-500 to-orange-500',
    link: 'https://apps.apple.com/ru/app/yaponamama/id1492303498',
  },
  {
    name: 'Zoo Planeta',
    segment: 'Зоомагазин',
    description: 'Товары для животных с доставкой',
    type: 'app',
    icon: '🐾',
    color: 'from-green-500 to-emerald-500',
    link: 'https://apps.apple.com/ru/app/zoo-planeta/id6752120554',
  },
  {
    name: 'Fati Flowers',
    segment: 'Цветочный магазин',
    description: 'Доставка цветов и букетов',
    type: 'web',
    icon: '💐',
    color: 'from-pink-500 to-rose-500',
    link: 'https://fatiflowers.delever.uz/ru',
  },
  {
    name: 'Beauty Gate',
    segment: 'Парфюмерия',
    description: 'Косметика и парфюмерия',
    type: 'web',
    icon: '💄',
    color: 'from-purple-500 to-violet-500',
    link: 'https://beautygate.delever.uz/ru',
  },
  {
    name: 'Delever Courier',
    segment: 'Приложение курьера',
    description: 'Мобильное приложение для курьеров',
    type: 'courier',
    icon: '🚴',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://apps.apple.com/ru/app/delever-courier/id1610711287',
  },
]

export function LiveExamples() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-lightBeige/30">
      <div className="container mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white text-brand-darkBlue px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Globe className="w-4 h-4" />
              Живые примеры
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
              Работает прямо сейчас
            </h2>
            <p className="text-xl text-brand-darkBlue/70 max-w-2xl mx-auto font-light">
              Реальные приложения и сайты, созданные на платформе Delever
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.1}>
              <a
                href={example.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-brand-lightTeal/20 hover:border-brand-darkBlue/20 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${example.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {example.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-brand-darkBlue group-hover:text-brand-darkBlue/80 transition-colors">
                        {example.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-brand-darkBlue/30 group-hover:text-brand-darkBlue/60 transition-colors" />
                    </div>
                    <p className="text-sm text-brand-darkBlue/50 mb-2">{example.segment}</p>
                    <p className="text-sm text-brand-darkBlue/70">{example.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-brand-lightTeal/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-brand-darkBlue/50">
                    {example.type === 'app' && (
                      <>
                        <Apple className="w-4 h-4" />
                        <span>App Store</span>
                      </>
                    )}
                    {example.type === 'web' && (
                      <>
                        <Globe className="w-4 h-4" />
                        <span>Веб-сайт</span>
                      </>
                    )}
                    {example.type === 'courier' && (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Мобильное приложение</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    На Delever
                  </span>
                </div>
              </a>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-brand-darkBlue/60 mb-4">
              И ещё более 1000 бизнесов используют Delever каждый день
            </p>
            <a 
              href="https://admin.delever.uz/#/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-darkBlue font-semibold hover:text-emerald-600 transition-colors"
            >
              Присоединиться к ним
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}

