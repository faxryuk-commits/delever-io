// Programmatic SEO — генерация гео-статей
// Каждый шаблон умножается на города = сотни страниц

import { allCities, type City, type Country, getCityBySlug, getCountryBySlug } from './geo-data'

export interface GeoArticleTemplate {
  slugTemplate: string // например: "open-restaurant-in-{city}"
  hub: string
  
  // SEO шаблоны с плейсхолдерами: {city}, {country}, {currency}
  title: { ru: string; en: string; uz: string }
  h1: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  keywords: { ru: string; en: string; uz: string }
  
  intro: { ru: string; en: string; uz: string }
  
  sections: {
    title: { ru: string; en: string; uz: string }
    content: { ru: string; en: string; uz: string }
  }[]
  
  cta: {
    text: { ru: string; en: string; uz: string }
    link: string
  }
  
  faq: {
    q: { ru: string; en: string; uz: string }
    a: { ru: string; en: string; uz: string }
  }[]
}

// ============================================
// ШАБЛОНЫ ГЕО-СТАТЕЙ
// ============================================
export const geoArticleTemplates: GeoArticleTemplate[] = [
  // ============================================
  // ОТКРЫТИЕ РЕСТОРАНА
  // ============================================
  {
    slugTemplate: 'open-restaurant-in-{city}',
    hub: 'open-restaurant',
    title: {
      ru: 'Как открыть ресторан в {city} — пошаговый гайд 2025',
      en: 'How to Open a Restaurant in {city} — Step-by-Step Guide 2025',
      uz: '{city}da restoran qanday ochish — 2025 bosqichma-bosqich qo\'llanma'
    },
    h1: {
      ru: 'Как открыть ресторан в {city}',
      en: 'How to Open a Restaurant in {city}',
      uz: '{city}da restoran qanday ochish'
    },
    description: {
      ru: 'Полный гайд по открытию ресторана в {city}: документы, локация, оборудование, персонал, запуск доставки. Советы от экспертов Delever.',
      en: 'Complete guide to opening a restaurant in {city}: documents, location, equipment, staff, delivery launch. Tips from Delever experts.',
      uz: '{city}da restoran ochish bo\'yicha to\'liq qo\'llanma: hujjatlar, joylashuv, uskunalar, xodimlar, yetkazib berishni ishga tushirish.'
    },
    keywords: {
      ru: 'открыть ресторан {city}, открыть кафе {city}, бизнес {city}, ресторанный бизнес {country}',
      en: 'open restaurant {city}, open cafe {city}, business {city}, restaurant business {country}',
      uz: '{city}da restoran ochish, {city}da kafe ochish, {country} restoran biznesi'
    },
    intro: {
      ru: '{city} — один из самых перспективных городов для ресторанного бизнеса в {country}. Население {population}, более {restaurants} заведений общепита. В этом гайде расскажем, как открыть успешный ресторан в {city} и сразу запустить доставку.',
      en: '{city} is one of the most promising cities for restaurant business in {country}. Population {population}, over {restaurants} food establishments. In this guide, we\'ll tell you how to open a successful restaurant in {city} and launch delivery right away.',
      uz: '{city} — {country}da restoran biznesi uchun eng istiqbolli shaharlardan biri. Aholisi {population}, {restaurants} dan ortiq ovqatlanish muassasalari. Ushbu qo\'llanmada {city}da muvaffaqiyatli restoran ochish va darhol yetkazib berishni boshlashni aytib beramiz.'
    },
    sections: [
      {
        title: { ru: 'Документы для открытия в {city}', en: 'Documents for Opening in {city}', uz: '{city}da ochish uchun hujjatlar' },
        content: {
          ru: 'Для открытия ресторана в {city} вам потребуется: регистрация юридического лица, санитарное разрешение, заключение пожарной инспекции, лицензия на общественное питание. Процесс занимает 2-4 недели.',
          en: 'To open a restaurant in {city} you will need: legal entity registration, sanitary permit, fire inspection certificate, public catering license. The process takes 2-4 weeks.',
          uz: '{city}da restoran ochish uchun sizga kerak bo\'ladi: yuridik shaxsni ro\'yxatdan o\'tkazish, sanitariya ruxsatnomasi, yong\'in inspeksiyasi xulosasi, ommaviy ovqatlanish litsenziyasi. Jarayon 2-4 hafta davom etadi.'
        }
      },
      {
        title: { ru: 'Лучшие районы для ресторана в {city}', en: 'Best Areas for Restaurant in {city}', uz: '{city}da restoran uchun eng yaxshi tumanlar' },
        content: {
          ru: 'При выборе локации в {city} учитывайте: пешеходный трафик, конкурентов поблизости, стоимость аренды, парковку. Для доставки локация менее критична — можно открыть dark kitchen в промзоне.',
          en: 'When choosing a location in {city}, consider: foot traffic, nearby competitors, rent cost, parking. For delivery, location is less critical — you can open a dark kitchen in an industrial zone.',
          uz: '{city}da joylashuvni tanlashda e\'tiborga oling: piyodalar trafigi, yaqin atrofdagi raqobatchilar, ijara narxi, parkovka. Yetkazib berish uchun joylashuv unchalik muhim emas — sanoat zonasida dark kitchen ochishingiz mumkin.'
        }
      },
      {
        title: { ru: 'Запуск доставки в {city}', en: 'Launching Delivery in {city}', uz: '{city}da yetkazib berishni ishga tushirish' },
        content: {
          ru: 'В {city} активно работают агрегаторы доставки. Но комиссия 15-35% съедает прибыль. Рекомендуем гибридную модель: агрегаторы для привлечения + свой сайт и Telegram для удержания. С Delever запуск доставки в {city} занимает 1 день.',
          en: 'Delivery aggregators are actively working in {city}. But 15-35% commission eats into profits. We recommend a hybrid model: aggregators for acquisition + your own website and Telegram for retention. With Delever, launching delivery in {city} takes 1 day.',
          uz: '{city}da yetkazib berish agregatorlari faol ishlaydi. Lekin 15-35% komissiya foydani yeb qo\'yadi. Gibrid modelni tavsiya qilamiz: jalb qilish uchun agregatorlar + ushlab turish uchun o\'z saytingiz va Telegram. Delever bilan {city}da yetkazib berishni ishga tushirish 1 kun davom etadi.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку в {city}', en: 'Launch Delivery in {city}', uz: '{city}da yetkazib berishni ishga tushirish' },
      link: '/pricing'
    },
    faq: [
      {
        q: { ru: 'Сколько стоит открыть ресторан в {city}?', en: 'How much does it cost to open a restaurant in {city}?', uz: '{city}da restoran ochish qancha turadi?' },
        a: { ru: 'Небольшое кафе в {city} можно открыть от $15,000-30,000. Полноценный ресторан — от $50,000. Dark kitchen — от $10,000. Цены зависят от локации и концепции.', en: 'A small cafe in {city} can be opened for $15,000-30,000. A full restaurant — from $50,000. Dark kitchen — from $10,000. Prices depend on location and concept.', uz: '{city}da kichik kafeni $15,000-30,000 ga ochish mumkin. To\'liq restoran — $50,000 dan. Dark kitchen — $10,000 dan. Narxlar joylashuv va kontseptsiyaga bog\'liq.' }
      },
      {
        q: { ru: 'Какие агрегаторы работают в {city}?', en: 'Which aggregators work in {city}?', uz: '{city}da qaysi agregatorlar ishlaydi?' },
        a: { ru: 'В {city} работают основные агрегаторы: Glovo, Wolt, Uzum Tezkor, Яндекс Еда. Delever интегрирован со всеми — заказы приходят в одно окно.', en: 'Major aggregators work in {city}: Glovo, Wolt, Uzum Tezkor, Yandex Eats. Delever is integrated with all of them — orders come to one window.', uz: '{city}da asosiy agregatorlar ishlaydi: Glovo, Wolt, Uzum Tezkor, Yandex Eda. Delever hammasi bilan integratsiyalangan — buyurtmalar bitta oynaga keladi.' }
      }
    ]
  },

  // ============================================
  // ЗАПУСК ДОСТАВКИ
  // ============================================
  {
    slugTemplate: 'launch-delivery-in-{city}',
    hub: 'launch-delivery',
    title: {
      ru: 'Как запустить доставку в {city} — гайд для ресторанов 2025',
      en: 'How to Launch Delivery in {city} — Restaurant Guide 2025',
      uz: '{city}da yetkazib berishni qanday boshlash — restoranlar uchun qo\'llanma 2025'
    },
    h1: {
      ru: 'Как запустить доставку еды в {city}',
      en: 'How to Launch Food Delivery in {city}',
      uz: '{city}da ovqat yetkazib berishni qanday boshlash'
    },
    description: {
      ru: 'Полный гайд по запуску доставки в {city}: свои каналы vs агрегаторы, найм курьеров, интеграция с POS. Запуск за 1 день с Delever.',
      en: 'Complete guide to launching delivery in {city}: own channels vs aggregators, courier hiring, POS integration. Launch in 1 day with Delever.',
      uz: '{city}da yetkazib berishni ishga tushirish bo\'yicha to\'liq qo\'llanma: o\'z kanallari vs agregatorlar, kuryer yollash, POS integratsiyasi. Delever bilan 1 kunda ishga tushirish.'
    },
    keywords: {
      ru: 'доставка еды {city}, запустить доставку {city}, ресторан доставка {city}, курьеры {city}',
      en: 'food delivery {city}, launch delivery {city}, restaurant delivery {city}, couriers {city}',
      uz: '{city} ovqat yetkazib berish, {city}da yetkazib berishni boshlash'
    },
    intro: {
      ru: 'Рынок доставки в {city} растёт на 30-40% ежегодно. Если у вашего ресторана ещё нет доставки — вы теряете до 50% потенциальной выручки. В этом гайде покажем, как запустить доставку в {city} за 1 день.',
      en: 'The delivery market in {city} is growing by 30-40% annually. If your restaurant doesn\'t have delivery yet — you\'re losing up to 50% of potential revenue. In this guide, we\'ll show you how to launch delivery in {city} in 1 day.',
      uz: '{city}da yetkazib berish bozori har yili 30-40% ga o\'sib bormoqda. Agar restoraningizda hali yetkazib berish bo\'lmasa — siz potentsial daromadning 50% gacha yo\'qotyapsiz. Ushbu qo\'llanmada {city}da 1 kunda yetkazib berishni qanday ishga tushirishni ko\'rsatamiz.'
    },
    sections: [
      {
        title: { ru: 'Агрегаторы в {city}', en: 'Aggregators in {city}', uz: '{city}dagi agregatorlar' },
        content: {
          ru: 'В {city} активно работают: Glovo, Wolt, Uzum Tezkor, Яндекс Еда. Плюсы: готовый трафик. Минусы: комиссия 15-35%, нет данных о клиентах. С Delever все заказы агрегаторов приходят в одно окно.',
          en: 'Active in {city}: Glovo, Wolt, Uzum Tezkor, Yandex Eats. Pros: ready traffic. Cons: 15-35% commission, no customer data. With Delever, all aggregator orders come to one window.',
          uz: '{city}da faol: Glovo, Wolt, Uzum Tezkor, Yandex Eda. Pluslar: tayyor trafik. Minuslar: 15-35% komissiya, mijozlar haqida ma\'lumot yo\'q. Delever bilan barcha agregator buyurtmalari bitta oynaga keladi.'
        }
      },
      {
        title: { ru: 'Свои каналы доставки в {city}', en: 'Own Delivery Channels in {city}', uz: '{city}da o\'z yetkazib berish kanallari' },
        content: {
          ru: 'Собственный сайт и Telegram-бот — 0% комиссии и полный контроль клиентской базы. С Delever вы получаете готовый сайт доставки для {city}, Telegram-бот, мобильное приложение — запуск за 1 день.',
          en: 'Own website and Telegram bot — 0% commission and full control of customer base. With Delever you get a ready delivery website for {city}, Telegram bot, mobile app — launch in 1 day.',
          uz: 'O\'z saytingiz va Telegram-botingiz — 0% komissiya va mijozlar bazasini to\'liq nazorat qilish. Delever bilan siz {city} uchun tayyor yetkazib berish saytini, Telegram-botni, mobil ilovani olasiz — 1 kunda ishga tushirish.'
        }
      },
      {
        title: { ru: 'Курьеры в {city}', en: 'Couriers in {city}', uz: '{city}dagi kuryerlar' },
        content: {
          ru: 'Варианты курьерской логистики в {city}: свои курьеры (контроль, но расходы на управление), аутсорс через Яндекс Доставку или Wolt Drive (гибкость, оплата за заказ). Delever интегрирован с обоими вариантами.',
          en: 'Courier logistics options in {city}: own couriers (control, but management costs), outsource via Yandex Delivery or Wolt Drive (flexibility, pay per order). Delever is integrated with both options.',
          uz: '{city}da kuryer logistikasi variantlari: o\'z kuryerlari (nazorat, lekin boshqaruv xarajatlari), Yandex Delivery yoki Wolt Drive orqali autsorsing (moslashuvchanlik, har bir buyurtma uchun to\'lov). Delever ikkala variant bilan integratsiyalangan.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку в {city} за 1 день', en: 'Launch Delivery in {city} in 1 Day', uz: '{city}da 1 kunda yetkazib berishni ishga tushirish' },
      link: '/pricing'
    },
    faq: []
  },

  // ============================================
  // DARK KITCHEN
  // ============================================
  {
    slugTemplate: 'dark-kitchen-in-{city}',
    hub: 'dark-kitchen',
    title: {
      ru: 'Как открыть dark kitchen в {city} — гайд 2025',
      en: 'How to Open a Dark Kitchen in {city} — Guide 2025',
      uz: '{city}da dark kitchen qanday ochish — 2025 qo\'llanma'
    },
    h1: {
      ru: 'Как открыть dark kitchen в {city}',
      en: 'How to Open a Dark Kitchen in {city}',
      uz: '{city}da dark kitchen qanday ochish'
    },
    description: {
      ru: 'Полный гайд по открытию облачной кухни в {city}: локация, оборудование, меню, доставка. Как запустить dark kitchen с минимальными вложениями.',
      en: 'Complete guide to opening a cloud kitchen in {city}: location, equipment, menu, delivery. How to launch a dark kitchen with minimal investment.',
      uz: '{city}da bulutli oshxona ochish bo\'yicha to\'liq qo\'llanma: joylashuv, uskunalar, menyu, yetkazib berish. Minimal investitsiyalar bilan dark kitchen qanday ishga tushirish.'
    },
    keywords: {
      ru: 'dark kitchen {city}, облачная кухня {city}, ghost kitchen {city}, открыть кухню доставки {city}',
      en: 'dark kitchen {city}, cloud kitchen {city}, ghost kitchen {city}, open delivery kitchen {city}',
      uz: '{city} dark kitchen, {city} bulutli oshxona, {city} ghost kitchen'
    },
    intro: {
      ru: 'Dark kitchen (облачная кухня) — это ресторан без зала, работающий только на доставку. В {city} это один из самых перспективных форматов: низкая аренда, фокус на онлайн-продажи, быстрый старт. Расскажем, как открыть dark kitchen в {city}.',
      en: 'A dark kitchen (cloud kitchen) is a restaurant without a dining room, working only for delivery. In {city}, this is one of the most promising formats: low rent, focus on online sales, quick start. We\'ll tell you how to open a dark kitchen in {city}.',
      uz: 'Dark kitchen (bulutli oshxona) — bu faqat yetkazib berish uchun ishlaydigan zalsiz restoran. {city}da bu eng istiqbolli formatlardan biri: kam ijara, onlayn sotuvlarga e\'tibor, tez boshlash. {city}da dark kitchen qanday ochishni aytib beramiz.'
    },
    sections: [
      {
        title: { ru: 'Преимущества dark kitchen в {city}', en: 'Advantages of Dark Kitchen in {city}', uz: '{city}da dark kitchen ning afzalliklari' },
        content: {
          ru: 'Аренда в промзоне {city} в 3-5 раз дешевле центра. Не нужен ремонт зала и мебель. Фокус только на качество еды и скорость доставки. Можно запустить несколько виртуальных брендов с одной кухни.',
          en: 'Rent in {city}\'s industrial zone is 3-5 times cheaper than the center. No need for hall renovation and furniture. Focus only on food quality and delivery speed. You can launch several virtual brands from one kitchen.',
          uz: '{city} sanoat zonasida ijara markazdan 3-5 baravar arzon. Zal ta\'miri va mebelga ehtiyoj yo\'q. Faqat ovqat sifati va yetkazib berish tezligiga e\'tibor qarating. Bitta oshxonadan bir nechta virtual brendlarni ishga tushirishingiz mumkin.'
        }
      },
      {
        title: { ru: 'Запуск доставки для dark kitchen', en: 'Launching Delivery for Dark Kitchen', uz: 'Dark kitchen uchun yetkazib berishni ishga tushirish' },
        content: {
          ru: 'Для dark kitchen доставка — единственный канал продаж. С Delever вы получаете: сайт заказов, Telegram-бот, интеграцию с агрегаторами {city}, курьерское приложение. Всё за 1 день.',
          en: 'For dark kitchen, delivery is the only sales channel. With Delever you get: order website, Telegram bot, integration with {city} aggregators, courier app. All in 1 day.',
          uz: 'Dark kitchen uchun yetkazib berish — yagona sotuv kanali. Delever bilan siz olasiz: buyurtma sayti, Telegram-bot, {city} agregatorlari bilan integratsiya, kuryer ilovasi. Hammasi 1 kunda.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить dark kitchen в {city}', en: 'Launch Dark Kitchen in {city}', uz: '{city}da dark kitchen ishga tushirish' },
      link: '/solutions/dark-kitchen'
    },
    faq: [
      {
        q: { ru: 'Сколько стоит открыть dark kitchen в {city}?', en: 'How much does it cost to open a dark kitchen in {city}?', uz: '{city}da dark kitchen ochish qancha turadi?' },
        a: { ru: 'В {city} dark kitchen можно открыть от $10,000-20,000. Основные расходы: аренда, оборудование кухни, первоначальный запас продуктов.', en: 'In {city}, a dark kitchen can be opened for $10,000-20,000. Main expenses: rent, kitchen equipment, initial food stock.', uz: '{city}da dark kitchen ni $10,000-20,000 ga ochish mumkin. Asosiy xarajatlar: ijara, oshxona uskunalari, dastlabki oziq-ovqat zaxirasi.' }
      }
    ]
  },

  // ============================================
  // РОСТ ПРОДАЖ
  // ============================================
  {
    slugTemplate: 'increase-sales-in-{city}',
    hub: 'grow-sales',
    title: {
      ru: 'Как увеличить продажи ресторана в {city} — 10 способов',
      en: 'How to Increase Restaurant Sales in {city} — 10 Ways',
      uz: '{city}da restoran sotuvini qanday oshirish — 10 usul'
    },
    h1: {
      ru: 'Как увеличить продажи ресторана в {city}',
      en: 'How to Increase Restaurant Sales in {city}',
      uz: '{city}da restoran sotuvini qanday oshirish'
    },
    description: {
      ru: 'Проверенные способы увеличения продаж ресторана в {city}: онлайн-заказы, upsell, программа лояльности, акции. Кейсы от Delever.',
      en: 'Proven ways to increase restaurant sales in {city}: online orders, upsell, loyalty program, promotions. Case studies from Delever.',
      uz: '{city}da restoran sotuvini oshirishning tasdiqlangan usullari: onlayn buyurtmalar, upsell, sodiqlik dasturi, aksiyalar. Delever dan keyslar.'
    },
    keywords: {
      ru: 'увеличить продажи ресторана {city}, повысить выручку кафе {city}, маркетинг ресторана {city}',
      en: 'increase restaurant sales {city}, boost cafe revenue {city}, restaurant marketing {city}',
      uz: '{city}da restoran sotuvini oshirish, {city}da kafe daromadini oshirish'
    },
    intro: {
      ru: 'Конкуренция в ресторанном бизнесе {city} растёт. Чтобы увеличить продажи, нужно использовать современные инструменты: онлайн-заказы, программы лояльности, автоматизацию маркетинга. Вот 10 проверенных способов.',
      en: 'Competition in {city}\'s restaurant business is growing. To increase sales, you need to use modern tools: online orders, loyalty programs, marketing automation. Here are 10 proven ways.',
      uz: '{city} restoran biznesida raqobat o\'sib bormoqda. Sotuvni oshirish uchun zamonaviy vositalardan foydalanish kerak: onlayn buyurtmalar, sodiqlik dasturlari, marketing avtomatizatsiyasi. Mana 10 ta tasdiqlangan usul.'
    },
    sections: [
      {
        title: { ru: '1. Запустите онлайн-заказы', en: '1. Launch Online Orders', uz: '1. Onlayn buyurtmalarni ishga tushiring' },
        content: {
          ru: 'Если у вас нет сайта доставки в {city} — вы теряете 30-50% потенциальной выручки. С Delever запуск занимает 1 день, без комиссий.',
          en: 'If you don\'t have a delivery website in {city} — you\'re losing 30-50% of potential revenue. With Delever, launch takes 1 day, no commissions.',
          uz: 'Agar {city}da yetkazib berish saytingiz bo\'lmasa — siz potentsial daromadning 30-50% ni yo\'qotyapsiz. Delever bilan ishga tushirish 1 kun davom etadi, komissiyalarsiz.'
        }
      },
      {
        title: { ru: '2. Программа лояльности', en: '2. Loyalty Program', uz: '2. Sodiqlik dasturi' },
        content: {
          ru: 'Кешбэк и бонусы увеличивают повторные заказы на 30-40%. В Delever есть встроенная программа лояльности для ресторанов {city}.',
          en: 'Cashback and bonuses increase repeat orders by 30-40%. Delever has a built-in loyalty program for {city} restaurants.',
          uz: 'Keshbek va bonuslar takroriy buyurtmalarni 30-40% ga oshiradi. Delever da {city} restoranlari uchun o\'rnatilgan sodiqlik dasturi mavjud.'
        }
      },
      {
        title: { ru: '3. Upsell при заказе', en: '3. Upsell at Checkout', uz: '3. Buyurtma vaqtida upsell' },
        content: {
          ru: 'Предлагайте добавки и напитки при оформлении. Это увеличивает средний чек на 15-25% без дополнительных затрат.',
          en: 'Offer add-ons and drinks at checkout. This increases average check by 15-25% without additional costs.',
          uz: 'Rasmiylashtirish vaqtida qo\'shimchalar va ichimliklar taklif qiling. Bu qo\'shimcha xarajatlarsiz o\'rtacha chekni 15-25% ga oshiradi.'
        }
      }
    ],
    cta: {
      text: { ru: 'Увеличить продажи с Delever', en: 'Increase Sales with Delever', uz: 'Delever bilan sotuvni oshirish' },
      link: '/products/marketing'
    },
    faq: []
  },

  // ============================================
  // ДОСТАВКА ПИЦЦЫ
  // ============================================
  {
    slugTemplate: 'pizza-delivery-in-{city}',
    hub: 'launch-delivery',
    title: {
      ru: 'Доставка пиццы в {city} — как запустить за 1 день',
      en: 'Pizza Delivery in {city} — How to Launch in 1 Day',
      uz: '{city}da pitsa yetkazib berish — 1 kunda qanday ishga tushirish'
    },
    h1: {
      ru: 'Как запустить доставку пиццы в {city}',
      en: 'How to Launch Pizza Delivery in {city}',
      uz: '{city}da pitsa yetkazib berishni qanday ishga tushirish'
    },
    description: {
      ru: 'Гайд по запуску доставки пиццы в {city}: сайт заказов, агрегаторы, курьеры, конструктор пиццы. Кейсы пиццерий с Delever.',
      en: 'Guide to launching pizza delivery in {city}: order website, aggregators, couriers, pizza builder. Pizzeria case studies with Delever.',
      uz: '{city}da pitsa yetkazib berishni ishga tushirish qo\'llanmasi: buyurtma sayti, agregatorlar, kuryerlar, pitsa konstruktori. Delever bilan pitseriyalar keyslari.'
    },
    keywords: {
      ru: 'доставка пиццы {city}, заказать пиццу {city}, пиццерия доставка {city}, открыть пиццерию {city}',
      en: 'pizza delivery {city}, order pizza {city}, pizzeria delivery {city}, open pizzeria {city}',
      uz: '{city} pitsa yetkazib berish, {city}da pitsa buyurtma qilish, {city} pitseriya yetkazib berish'
    },
    intro: {
      ru: 'Пицца — самый доставляемый продукт в {city}. Конкуренция высокая, но рынок огромный. Расскажем, как запустить доставку пиццы и выделиться среди конкурентов.',
      en: 'Pizza is the most delivered product in {city}. Competition is high, but the market is huge. We\'ll tell you how to launch pizza delivery and stand out from competitors.',
      uz: 'Pitsa — {city}da eng ko\'p yetkazib beriladigan mahsulot. Raqobat yuqori, lekin bozor ulkan. Pitsa yetkazib berishni qanday ishga tushirish va raqobatchilardan ajralib turishni aytib beramiz.'
    },
    sections: [
      {
        title: { ru: 'Конструктор пиццы', en: 'Pizza Builder', uz: 'Pitsa konstruktori' },
        content: {
          ru: 'Клиенты любят собирать свою пиццу. В Delever есть встроенный конструктор: выбор теста, соуса, топпингов. Увеличивает средний чек на 20-30%.',
          en: 'Customers love to build their own pizza. Delever has a built-in builder: choice of dough, sauce, toppings. Increases average check by 20-30%.',
          uz: 'Mijozlar o\'z pitsasini yig\'ishni yaxshi ko\'radilar. Delever da o\'rnatilgan konstruktor mavjud: xamir, sous, toppinglarni tanlash. O\'rtacha chekni 20-30% ga oshiradi.'
        }
      },
      {
        title: { ru: 'Скорость доставки', en: 'Delivery Speed', uz: 'Yetkazib berish tezligi' },
        content: {
          ru: 'Для пиццы критична скорость — клиент ждёт горячую. Оптимальное время: 30-45 минут. Delever помогает оптимизировать маршруты курьеров в {city}.',
          en: 'Speed is critical for pizza — the customer expects it hot. Optimal time: 30-45 minutes. Delever helps optimize courier routes in {city}.',
          uz: 'Pitsa uchun tezlik muhim — mijoz issiq pitsani kutadi. Optimal vaqt: 30-45 daqiqa. Delever {city}da kuryer marshrutlarini optimallashtirishga yordam beradi.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку пиццы', en: 'Launch Pizza Delivery', uz: 'Pitsa yetkazib berishni ishga tushirish' },
      link: '/solutions/pizzeria'
    },
    faq: []
  },

  // ============================================
  // ДОСТАВКА СУШИ
  // ============================================
  {
    slugTemplate: 'sushi-delivery-in-{city}',
    hub: 'launch-delivery',
    title: {
      ru: 'Доставка суши в {city} — как запустить за 1 день',
      en: 'Sushi Delivery in {city} — How to Launch in 1 Day',
      uz: '{city}da sushi yetkazib berish — 1 kunda qanday ishga tushirish'
    },
    h1: {
      ru: 'Как запустить доставку суши в {city}',
      en: 'How to Launch Sushi Delivery in {city}',
      uz: '{city}da sushi yetkazib berishni qanday ishga tushirish'
    },
    description: {
      ru: 'Гайд по запуску доставки суши в {city}: сайт заказов, сеты, комбо, упаковка. Кейсы суши-баров с Delever.',
      en: 'Guide to launching sushi delivery in {city}: order website, sets, combos, packaging. Sushi bar case studies with Delever.',
      uz: '{city}da sushi yetkazib berishni ishga tushirish qo\'llanmasi: buyurtma sayti, setlar, kombo, qadoqlash. Delever bilan sushi-barlar keyslari.'
    },
    keywords: {
      ru: 'доставка суши {city}, заказать суши {city}, суши-бар доставка {city}, роллы {city}',
      en: 'sushi delivery {city}, order sushi {city}, sushi bar delivery {city}, rolls {city}',
      uz: '{city} sushi yetkazib berish, {city}da sushi buyurtma qilish'
    },
    intro: {
      ru: 'Суши — второй по популярности продукт доставки в {city} после пиццы. Высокий средний чек и маржинальность. Расскажем, как запустить доставку суши.',
      en: 'Sushi is the second most popular delivery product in {city} after pizza. High average check and margins. We\'ll tell you how to launch sushi delivery.',
      uz: 'Sushi — {city}da pitsadan keyin ikkinchi eng mashhur yetkazib berish mahsuloti. Yuqori o\'rtacha chek va foyda. Sushi yetkazib berishni qanday ishga tushirishni aytib beramiz.'
    },
    sections: [
      {
        title: { ru: 'Сеты и комбо', en: 'Sets and Combos', uz: 'Setlar va kombo' },
        content: {
          ru: 'Комбо-сеты увеличивают средний чек на 40-60%. В Delever легко создавать сложные сеты с разными вариациями.',
          en: 'Combo sets increase average check by 40-60%. In Delever, it\'s easy to create complex sets with different variations.',
          uz: 'Kombo-setlar o\'rtacha chekni 40-60% ga oshiradi. Delever da turli variatsiyalar bilan murakkab setlarni yaratish oson.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку суши', en: 'Launch Sushi Delivery', uz: 'Sushi yetkazib berishni ishga tushirish' },
      link: '/solutions/sushi'
    },
    faq: []
  }
]

// ============================================
// ГЕНЕРАЦИЯ ГЕО-СТРАНИЦ
// ============================================
export interface GeneratedGeoArticle {
  slug: string
  citySlug: string
  city: City
  country: Country
  template: GeoArticleTemplate
  
  // Сгенерированный контент
  title: { ru: string; en: string; uz: string }
  h1: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  keywords: { ru: string; en: string; uz: string }
  intro: { ru: string; en: string; uz: string }
  sections: { title: { ru: string; en: string; uz: string }; content: { ru: string; en: string; uz: string } }[]
  cta: { text: { ru: string; en: string; uz: string }; link: string }
  faq: { q: { ru: string; en: string; uz: string }; a: { ru: string; en: string; uz: string } }[]
}

// Функция замены плейсхолдеров
function replacePlaceholders(
  text: string, 
  city: City, 
  country: Country, 
  lang: 'ru' | 'en' | 'uz'
): string {
  return text
    .replace(/{city}/g, city.name[lang])
    .replace(/{country}/g, country.name[lang])
    .replace(/{population}/g, city.population)
    .replace(/{restaurants}/g, city.restaurantCount)
    .replace(/{currency}/g, country.currency.name[lang])
}

// Генерация одной гео-статьи
export function generateGeoArticle(
  template: GeoArticleTemplate, 
  city: City
): GeneratedGeoArticle | null {
  const country = getCountryBySlug(city.countrySlug)
  if (!country) return null

  const slug = template.slugTemplate.replace('{city}', city.slug)

  const replaceAll = (obj: { ru: string; en: string; uz: string }) => ({
    ru: replacePlaceholders(obj.ru, city, country, 'ru'),
    en: replacePlaceholders(obj.en, city, country, 'en'),
    uz: replacePlaceholders(obj.uz, city, country, 'uz')
  })

  return {
    slug: `geo/${slug}`,
    citySlug: city.slug,
    city,
    country,
    template,
    title: replaceAll(template.title),
    h1: replaceAll(template.h1),
    description: replaceAll(template.description),
    keywords: replaceAll(template.keywords),
    intro: replaceAll(template.intro),
    sections: template.sections.map(s => ({
      title: replaceAll(s.title),
      content: replaceAll(s.content)
    })),
    cta: {
      text: replaceAll(template.cta.text),
      link: template.cta.link
    },
    faq: template.faq.map(f => ({
      q: replaceAll(f.q),
      a: replaceAll(f.a)
    }))
  }
}

// Генерация всех гео-страниц
export function generateAllGeoArticles(): GeneratedGeoArticle[] {
  const articles: GeneratedGeoArticle[] = []
  
  for (const template of geoArticleTemplates) {
    for (const city of allCities) {
      const article = generateGeoArticle(template, city)
      if (article) {
        articles.push(article)
      }
    }
  }
  
  return articles
}

// Получить гео-статью по slug
export function getGeoArticleBySlug(slug: string): GeneratedGeoArticle | undefined {
  // Убираем "geo/" префикс если есть
  const cleanSlug = slug.replace(/^geo\//, '')
  
  // Парсим slug: "open-restaurant-in-tashkent" -> template: "open-restaurant-in-{city}", city: "tashkent"
  for (const template of geoArticleTemplates) {
    const pattern = template.slugTemplate.replace('{city}', '([a-z-]+)')
    const regex = new RegExp(`^${pattern}$`)
    const match = cleanSlug.match(regex)
    
    if (match) {
      const citySlug = match[1]
      const city = getCityBySlug(citySlug)
      if (city) {
        return generateGeoArticle(template, city) || undefined
      }
    }
  }
  
  return undefined
}

// Статистика
export const geoArticleStats = {
  templates: geoArticleTemplates.length,
  cities: allCities.length,
  totalPages: geoArticleTemplates.length * allCities.length
}
