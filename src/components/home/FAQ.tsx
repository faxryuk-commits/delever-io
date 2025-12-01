import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion'

const faqs = [
  {
    question: 'Сколько стоит подключение?',
    answer:
      'Стоимость зависит от выбранного тарифа и количества точек. Базовый тариф начинается от $99/месяц за одну точку. Для точного расчёта свяжитесь с нами — мы подберём оптимальный тариф под ваш бизнес.',
  },
  {
    question: 'Сколько времени занимает настройка?',
    answer:
      'Стандартная настройка занимает 7-14 дней. За это время мы подключаем каналы продаж, интегрируем с вашей POS-системой, настраиваем меню и обучаем команду. При необходимости можем ускорить процесс.',
  },
  {
    question: 'Какие каналы продаж можно запустить?',
    answer:
      'Delever поддерживает все основные каналы: Telegram-бот, веб-сайт, мобильное приложение (iOS/Android), QR-меню, киоски и колл-центр. Все каналы работают на единой платформе с общим каталогом и базой клиентов.',
  },
  {
    question: 'С какими POS-системами интегрируется Delever?',
    answer:
      'Мы интегрируемся с популярными POS-системами: iiko, R-Keeper/Syrve, Poster, Paloma и другими. Интеграция происходит автоматически через API — заказы сразу попадают в вашу кассу без ручного ввода.',
  },
  {
    question: 'Как работают заказы из агрегаторов?',
    answer:
      'Delever принимает заказы из всех популярных агрегаторов: Wolt, Yandex Eats, Talabat, Deliveroo, Noon и других. Все заказы приходят в единое окно Delever — больше не нужно держать несколько планшетов на кухне.',
  },
  {
    question: 'Какие способы оплаты поддерживаются?',
    answer:
      'Поддерживаются все популярные платёжные системы: Click, Payme, Uzum, Stripe, Yandex Pay и другие. Клиенты могут оплачивать картой, через электронные кошельки или наличными при получении заказа.',
  },
  {
    question: 'Какая аналитика доступна?',
    answer:
      'В платформу встроена мощная аналитика: дашборды для владельца и управляющего, ABC-XYZ анализ продуктов, KPI по каналам, курьерам и точкам. Все данные обновляются в реальном времени.',
  },
  {
    question: 'Есть ли система лояльности?',
    answer:
      'Да, Delever включает полноценную систему лояльности: бонусные программы, промокоды, персональные предложения, RFM-анализ клиентов и автоматические триггерные рассылки для увеличения среднего чека.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4 tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-brand-darkBlue/70 font-light">
            Ответы на популярные вопросы о платформе Delever
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-brand-darkBlue">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-brand-darkBlue/70 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

