import { Bot, Globe, Smartphone, QrCode, Monitor, Phone, TrendingUp, DollarSign, Users, Zap, CheckCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion'

interface ChannelDetail {
  id: string
  icon: React.ReactNode
  title: string
  shortDescription: string
  whatIsIt: string
  howItWorks: string[]
  whyYouNeedIt: string[]
  roi: {
    metric: string
    value: string
    description: string
  }[]
  benefits: string[]
}

const channels: ChannelDetail[] = [
  {
    id: 'telegram',
    icon: <Bot className="h-8 w-8" />,
    title: 'Telegram-бот',
    shortDescription: 'Принимайте заказы прямо в мессенджере. Клиенты заказывают без установки приложений, вы получаете заказы в единой системе.',
    whatIsIt: 'Telegram-бот — это автоматизированный помощник в мессенджере Telegram, который позволяет клиентам делать заказы прямо в чате. Не нужно устанавливать приложения или переходить на сайт — всё происходит в привычном интерфейсе мессенджера.',
    howItWorks: [
      'Клиент открывает ваш Telegram-бот и видит меню с категориями',
      'Выбирает блюда, добавляет в корзину и оформляет заказ',
      'Заказ автоматически попадает в систему Delever',
      'Клиент получает подтверждение и может отслеживать статус доставки',
      'Все данные сохраняются в единой базе клиентов',
    ],
    whyYouNeedIt: [
      'Telegram — один из самых популярных мессенджеров в СНГ с миллионами активных пользователей',
      'Нет необходимости устанавливать приложения — клиенты заказывают там, где уже общаются',
      'Быстрое оформление заказа — меньше кликов, чем на сайте',
      'Прямой канал связи с клиентами для рассылок и уведомлений',
      'Низкая стоимость внедрения по сравнению с мобильным приложением',
    ],
    roi: [
      { metric: 'Рост заказов', value: '+25-35%', description: 'Клиенты заказывают чаще благодаря удобству мессенджера' },
      { metric: 'Средний чек', value: '+15-20%', description: 'Быстрое оформление увеличивает количество позиций в заказе' },
      { metric: 'Конверсия', value: '+30%', description: 'Меньше барьеров для заказа повышает конверсию' },
    ],
    benefits: [
      'Работает 24/7 без участия операторов',
      'Автоматические напоминания о незавершённых заказах',
      'Интеграция с программой лояльности',
      'Персональные предложения на основе истории заказов',
      'Push-уведомления о статусе заказа и акциях',
    ],
  },
  {
    id: 'website',
    icon: <Globe className="h-8 w-8" />,
    title: 'Веб-сайт',
    shortDescription: 'Собственный сайт с онлайн-заказом под вашим брендом. Полный контроль над данными клиентов и отсутствие комиссий агрегаторов.',
    whatIsIt: 'Веб-сайт с онлайн-заказом — это ваш собственный интернет-магазин, где клиенты могут просматривать меню, выбирать блюда и оформлять заказы. Сайт полностью под вашим брендом и работает независимо от агрегаторов.',
    howItWorks: [
      'Клиент заходит на ваш сайт через браузер на любом устройстве',
      'Просматривает меню с фотографиями и описаниями блюд',
      'Добавляет товары в корзину и оформляет заказ',
      'Выбирает способ оплаты и доставки',
      'Заказ автоматически передаётся в систему Delever и на кухню',
    ],
    whyYouNeedIt: [
      'Полный контроль над брендом и пользовательским опытом',
      'Нет комиссий агрегаторов — сохраняете 100% выручки',
      'Собственная база клиентов для маркетинга и лояльности',
      'SEO-оптимизация помогает находить новых клиентов через поиск',
      'Профессиональный имидж повышает доверие клиентов',
    ],
    roi: [
      { metric: 'Экономия на комиссиях', value: '20-35%', description: 'Сохраняете комиссии агрегаторов, которые раньше уходили на их платформы' },
      { metric: 'Рост выручки', value: '+40-60%', description: 'Собственный канал без комиссий увеличивает маржинальность' },
      { metric: 'Средний чек', value: '+20-25%', description: 'Больше времени на сайте = больше позиций в заказе' },
    ],
    benefits: [
      'Адаптивный дизайн для всех устройств',
      'Быстрая загрузка и удобная навигация',
      'Интеграция с платёжными системами',
      'Программа лояльности и персональные предложения',
      'Аналитика посещений и конверсий',
    ],
  },
  {
    id: 'mobile',
    icon: <Smartphone className="h-8 w-8" />,
    title: 'Мобильное приложение',
    shortDescription: 'Нативные iOS и Android приложения с вашим брендингом. Прямой канал связи с клиентами и возможность push-уведомлений.',
    whatIsIt: 'Мобильное приложение — это нативное приложение для iOS и Android, которое устанавливается на телефон клиента. Приложение работает быстрее сайта, имеет доступ к функциям телефона и позволяет отправлять push-уведомления.',
    howItWorks: [
      'Клиент скачивает ваше приложение из App Store или Google Play',
      'Регистрируется или входит в аккаунт',
      'Просматривает меню, делает заказы и сохраняет избранное',
      'Получает push-уведомления о статусе заказа и акциях',
      'Использует сохранённые адреса и карты для быстрого заказа',
    ],
    whyYouNeedIt: [
      'Приложения работают быстрее сайтов и имеют лучший UX',
      'Push-уведомления увеличивают возврат клиентов на 40-60%',
      'Приложение всегда под рукой — клиенты заказывают чаще',
      'Сохранённые данные ускоряют повторные заказы',
      'Профессиональный имидж и повышение лояльности',
    ],
    roi: [
      { metric: 'Повторные заказы', value: '+50-70%', description: 'Push-уведомления и удобство увеличивают частоту заказов' },
      { metric: 'Средний чек', value: '+25-30%', description: 'Быстрое оформление и сохранённые данные увеличивают чек' },
      { metric: 'LTV клиента', value: '+60-80%', description: 'Выше вовлечённость и лояльность клиентов' },
    ],
    benefits: [
      'Нативные приложения для iOS и Android',
      'Push-уведомления о заказах и акциях',
      'Сохранённые адреса и способы оплаты',
      'История заказов и избранные блюда',
      'Программа лояльности с бонусами',
    ],
  },
  {
    id: 'qr',
    icon: <QrCode className="h-8 w-8" />,
    title: 'QR-меню',
    shortDescription: 'Бесконтактное меню с функцией заказа. Клиенты сканируют QR-код и сразу могут сделать заказ без установки приложений.',
    whatIsIt: 'QR-меню — это цифровое меню, доступное через QR-код. Клиент сканирует код камерой телефона и попадает на страницу с меню, где может не только посмотреть блюда, но и сразу сделать заказ.',
    howItWorks: [
      'Клиент сканирует QR-код на столе камерой телефона',
      'Открывается страница с меню вашего ресторана',
      'Просматривает блюда с фотографиями и описаниями',
      'Добавляет в корзину и оформляет заказ',
      'Заказ автоматически попадает на кухню и в систему',
    ],
    whyYouNeedIt: [
      'Бесконтактное обслуживание — актуально в пост-ковидную эпоху',
      'Не нужно печатать меню — экономия на полиграфии',
      'Быстрое обновление меню и цен без перепечатки',
      'Возможность заказа прямо со стола без вызова официанта',
      'Снижение нагрузки на персонал',
    ],
    roi: [
      { metric: 'Экономия на меню', value: '100%', description: 'Не нужно печатать и обновлять бумажные меню' },
      { metric: 'Средний чек', value: '+15-20%', description: 'Клиенты видят больше блюд и заказывают больше' },
      { metric: 'Скорость обслуживания', value: '+30%', description: 'Меньше времени на принятие заказа' },
    ],
    benefits: [
      'Мгновенное обновление меню и цен',
      'Фотографии блюд повышают конверсию',
      'Многоязычность для туристов',
      'Интеграция с программой лояльности',
      'Аналитика популярных блюд',
    ],
  },
  {
    id: 'kiosk',
    icon: <Monitor className="h-8 w-8" />,
    title: 'Киоск',
    shortDescription: 'Сенсорные киоски для зала ресторана. Самообслуживание снижает нагрузку на официантов и увеличивает средний чек.',
    whatIsIt: 'Киоск самообслуживания — это сенсорный терминал в зале ресторана, где клиенты могут самостоятельно просмотреть меню, выбрать блюда и оформить заказ. Идеально для фастфуда и кафе с высокой проходимостью.',
    howItWorks: [
      'Клиент подходит к киоску в зале ресторана',
      'Просматривает меню на большом сенсорном экране',
      'Выбирает блюда, видит фотографии и описания',
      'Оформляет заказ и оплачивает картой или наличными',
      'Получает номер заказа и ждёт готовности',
    ],
    whyYouNeedIt: [
      'Снижение нагрузки на персонал — меньше официантов нужно',
      'Увеличение пропускной способности — больше заказов за смену',
      'Клиенты видят больше блюд и заказывают больше',
      'Снижение ошибок при приёме заказа',
      'Современный имидж привлекает молодую аудиторию',
    ],
    roi: [
      { metric: 'Экономия на персонале', value: '30-40%', description: 'Меньше официантов нужно для обслуживания' },
      { metric: 'Средний чек', value: '+20-30%', description: 'Клиенты видят больше опций и заказывают больше' },
      { metric: 'Пропускная способность', value: '+50%', description: 'Больше заказов обрабатывается за смену' },
    ],
    benefits: [
      'Большой экран с качественными фотографиями',
      'Мгновенное обновление меню и цен',
      'Интеграция с платёжными системами',
      'Программа лояльности прямо на киоске',
      'Аналитика популярных блюд и времени заказов',
    ],
  },
  {
    id: 'callcenter',
    icon: <Phone className="h-8 w-8" />,
    title: 'Колл-центр',
    shortDescription: 'Единая система обработки телефонных заказов. Все заказы попадают в общую систему вместе с онлайн-заказами.',
    whatIsIt: 'Колл-центр — это специализированный интерфейс для операторов, которые принимают заказы по телефону. Все телефонные заказы автоматически попадают в единую систему Delever вместе с онлайн-заказами.',
    howItWorks: [
      'Клиент звонит по телефону ресторана',
      'Оператор открывает интерфейс Delever для приёма заказа',
      'Вводит данные клиента и выбранные блюда',
      'Заказ автоматически передаётся на кухню и в систему',
      'Клиент получает подтверждение и может отслеживать статус',
    ],
    whyYouNeedIt: [
      'Многие клиенты предпочитают заказывать по телефону',
      'Персональный подход повышает лояльность',
      'Оператор может рекомендовать блюда и увеличивать чек',
      'Единая система для всех типов заказов',
      'История звонков и заказов в одном месте',
    ],
    roi: [
      { metric: 'Конверсия звонков', value: '+25-35%', description: 'Удобный интерфейс увеличивает конверсию звонков в заказы' },
      { metric: 'Средний чек', value: '+15-20%', description: 'Оператор может рекомендовать дополнительные блюда' },
      { metric: 'Скорость обработки', value: '+40%', description: 'Автоматизация ускоряет приём заказа' },
    ],
    benefits: [
      'Удобный интерфейс для операторов',
      'Автоматический поиск клиентов по номеру телефона',
      'История заказов клиента для персонализации',
      'Интеграция с кухней и доставкой',
      'Аналитика звонков и конверсий',
    ],
  },
]

export function ChannelDetails() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">
            Детальная информация о каждом канале
          </h2>
          <p className="text-xl text-brand-darkBlue/80 max-w-3xl mx-auto">
            Узнайте, как работает каждый канал, почему он нужен вашему бизнесу и какой ROI он приносит
          </p>
        </div>

        <div className="space-y-6">
          {channels.map((channel) => (
            <Accordion key={channel.id} type="single" collapsible className="w-full">
              <AccordionItem value={channel.id} className="border-2 border-brand-lightTeal/30 rounded-xl mb-4 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <div className="text-brand-darkBlue">{channel.icon}</div>
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl font-bold text-brand-darkBlue mb-2">
                        {channel.title}
                      </h3>
                      <p className="text-brand-darkBlue/70">{channel.shortDescription}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* What is it */}
                      <div>
                        <h4 className="text-lg font-semibold text-brand-darkBlue mb-3 flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Что это такое?
                        </h4>
                        <p className="text-brand-darkBlue/80 leading-relaxed">{channel.whatIsIt}</p>
                      </div>

                      {/* How it works */}
                      <div>
                        <h4 className="text-lg font-semibold text-brand-darkBlue mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Как это работает?
                        </h4>
                        <ol className="space-y-2">
                          {channel.howItWorks.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-brand-darkBlue/80">
                              <span className="flex-shrink-0 w-6 h-6 bg-brand-lightBlue rounded-full flex items-center justify-center text-sm font-semibold text-brand-darkBlue">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Why you need it */}
                      <div>
                        <h4 className="text-lg font-semibold text-brand-darkBlue mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Почему это нужно?
                        </h4>
                        <ul className="space-y-2">
                          {channel.whyYouNeedIt.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-brand-darkBlue/80">
                              <CheckCircle className="h-5 w-5 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* ROI */}
                      <div>
                        <h4 className="text-lg font-semibold text-brand-darkBlue mb-4 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Примеры ROI
                        </h4>
                        <div className="space-y-4">
                          {channel.roi.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-gradient-to-br from-brand-lightBlue to-brand-lightBeige rounded-lg p-4 border-2 border-brand-lightTeal/30"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-brand-darkBlue/70">
                                  {item.metric}
                                </span>
                                <span className="text-2xl font-bold text-brand-darkBlue">
                                  {item.value}
                                </span>
                              </div>
                              <p className="text-sm text-brand-darkBlue/70">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-lg font-semibold text-brand-darkBlue mb-3 flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Дополнительные преимущества
                        </h4>
                        <ul className="space-y-2">
                          {channel.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-brand-darkBlue/80">
                              <CheckCircle className="h-5 w-5 text-brand-darkBlue mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

