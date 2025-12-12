// SEO страницы для Delever.io
// Структурированные данные для автоматической генерации страниц

export interface SEOPageData {
  slug: string
  category: 'integration' | 'solution' | 'product' | 'comparison' | 'geo' | 'feature'
  subcategory?: string
  
  // SEO мета
  title: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  keywords: { ru: string; en: string; uz: string }
  h1: { ru: string; en: string; uz: string }
  
  // Контент
  intro: { ru: string; en: string; uz: string }
  features: { ru: string[]; en: string[]; uz: string[] }
  benefits: { ru: string[]; en: string[]; uz: string[] }
  
  // FAQ для GEO
  faq: {
    question: { ru: string; en: string; uz: string }
    answer: { ru: string; en: string; uz: string }
  }[]
  
  // UI
  icon?: string
  logo?: string
  color: string
  
  // Related pages for internal linking
  relatedPages: string[]
  
  // Schema type
  schemaType: 'SoftwareApplication' | 'Product' | 'HowTo' | 'FAQPage' | 'Organization'
}

// ============================================
// POS ИНТЕГРАЦИИ
// ============================================
export const posIntegrations: SEOPageData[] = [
  {
    slug: 'integrations/iiko',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с iiko — автоматизация доставки для ресторанов',
      en: 'iiko Integration — Delivery Automation for Restaurants',
      uz: 'iiko integratsiyasi — restoranlar uchun yetkazib berish avtomatizatsiyasi'
    },
    description: {
      ru: 'Подключите iiko к Delever: автоматическая передача заказов, синхронизация меню, стоп-листы. Настройка за 1 день. 500+ ресторанов уже работают.',
      en: 'Connect iiko to Delever: automatic order transfer, menu sync, stop-lists. Setup in 1 day. 500+ restaurants already connected.',
      uz: 'iiko ni Delever ga ulang: avtomatik buyurtma uzatish, menyu sinxronizatsiyasi, stop-listlar. 1 kunda sozlash. 500+ restoran allaqachon ulangan.'
    },
    keywords: {
      ru: 'интеграция iiko, iiko доставка, iiko онлайн заказы, iiko Delever, подключить iiko, iiko автоматизация',
      en: 'iiko integration, iiko delivery, iiko online orders, iiko Delever, connect iiko, iiko automation',
      uz: 'iiko integratsiya, iiko yetkazib berish, iiko onlayn buyurtmalar, iiko Delever, iiko ulash'
    },
    h1: {
      ru: 'Интеграция iiko с Delever',
      en: 'iiko Integration with Delever',
      uz: 'iiko Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Подключите вашу POS-систему iiko к Delever и автоматизируйте приём заказов с сайта, Telegram, агрегаторов. Заказы мгновенно попадают в кассу — без ручного ввода.',
      en: 'Connect your iiko POS to Delever and automate order intake from website, Telegram, aggregators. Orders instantly appear in the cash register — no manual entry.',
      uz: 'iiko POS tizimingizni Delever ga ulang va sayt, Telegram, agregatorlardan buyurtmalarni avtomatlashtiring. Buyurtmalar darhol kassaga tushadi — qo\'lda kiritishsiz.'
    },
    features: {
      ru: [
        'Автоматическая передача заказов в iiko',
        'Двусторонняя синхронизация меню',
        'Стоп-листы в реальном времени',
        'Печать на кухонные принтеры',
        'Фискализация чеков',
        'Отчёты по заказам'
      ],
      en: [
        'Automatic order transfer to iiko',
        'Two-way menu synchronization',
        'Real-time stop-lists',
        'Kitchen printer support',
        'Receipt fiscalization',
        'Order reports'
      ],
      uz: [
        'Buyurtmalarni iiko ga avtomatik uzatish',
        'Ikki tomonlama menyu sinxronizatsiyasi',
        'Real vaqtda stop-listlar',
        'Oshxona printerlariga chop etish',
        'Cheklarni fiskalizatsiya qilish',
        'Buyurtmalar hisoboti'
      ]
    },
    benefits: {
      ru: [
        'Экономия 3+ часов в день на ручном вводе',
        'Снижение ошибок в заказах на 95%',
        'Единое меню на всех каналах',
        'Настройка за 1 день'
      ],
      en: [
        'Save 3+ hours daily on manual entry',
        'Reduce order errors by 95%',
        'Single menu across all channels',
        'Setup in 1 day'
      ],
      uz: [
        'Kuniga 3+ soat tejash qo\'lda kiritishda',
        'Buyurtma xatolarini 95% ga kamaytirish',
        'Barcha kanallarda yagona menyu',
        '1 kunda sozlash'
      ]
    },
    faq: [
      {
        question: {
          ru: 'Как подключить iiko к Delever?',
          en: 'How to connect iiko to Delever?',
          uz: 'iiko ni Delever ga qanday ulash mumkin?'
        },
        answer: {
          ru: 'Подключение занимает 1 день. Мы настраиваем API интеграцию, синхронизируем меню и обучаем персонал. Всё включено в тариф.',
          en: 'Connection takes 1 day. We set up API integration, sync the menu, and train your staff. Everything is included in the plan.',
          uz: 'Ulash 1 kun davom etadi. Biz API integratsiyani sozlaymiz, menyuni sinxronlaymiz va xodimlaringizni o\'rgatamiz. Hammasi tarifga kiritilgan.'
        }
      },
      {
        question: {
          ru: 'Какие версии iiko поддерживаются?',
          en: 'Which iiko versions are supported?',
          uz: 'Qaysi iiko versiyalari qo\'llab-quvvatlanadi?'
        },
        answer: {
          ru: 'Delever поддерживает iiko 7.x и 8.x (iikoCloud). Работаем с iiko RMS, iikoFront, iikoOffice.',
          en: 'Delever supports iiko 7.x and 8.x (iikoCloud). We work with iiko RMS, iikoFront, iikoOffice.',
          uz: 'Delever iiko 7.x va 8.x (iikoCloud) ni qo\'llab-quvvatlaydi. iiko RMS, iikoFront, iikoOffice bilan ishlaymiz.'
        }
      }
    ],
    icon: '🍊',
    color: 'from-orange-500 to-orange-600',
    relatedPages: ['integrations/rkeeper', 'integrations/poster', 'aggregators/glovo', 'products/channels'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/rkeeper',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с R-Keeper — подключение доставки к кассе',
      en: 'R-Keeper Integration — Connect Delivery to POS',
      uz: 'R-Keeper integratsiyasi — yetkazib berishni kassaga ulash'
    },
    description: {
      ru: 'Интеграция R-Keeper с Delever: заказы с сайта и агрегаторов автоматически в кассе. Меню, стоп-листы, отчёты. Настройка за 1 день.',
      en: 'R-Keeper integration with Delever: orders from website and aggregators automatically in POS. Menu, stop-lists, reports. Setup in 1 day.',
      uz: 'R-Keeper Delever bilan integratsiyasi: sayt va agregatorlardan buyurtmalar avtomatik kassaga tushadi. Menyu, stop-listlar, hisobotlar. 1 kunda sozlash.'
    },
    keywords: {
      ru: 'интеграция R-Keeper, R-Keeper доставка, R-Keeper онлайн заказы, R-Keeper API, подключить R-Keeper',
      en: 'R-Keeper integration, R-Keeper delivery, R-Keeper online orders, R-Keeper API, connect R-Keeper',
      uz: 'R-Keeper integratsiya, R-Keeper yetkazib berish, R-Keeper onlayn buyurtmalar'
    },
    h1: {
      ru: 'Интеграция R-Keeper с Delever',
      en: 'R-Keeper Integration with Delever',
      uz: 'R-Keeper Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Подключите R-Keeper к Delever для автоматического приёма заказов со всех каналов: сайт, Telegram, Glovo, Wolt, Yandex Eda. Без ручного ввода — заказы сразу в кассе.',
      en: 'Connect R-Keeper to Delever for automatic order intake from all channels: website, Telegram, Glovo, Wolt, Yandex Eats. No manual entry — orders directly in POS.',
      uz: 'R-Keeper ni Delever ga ulang va barcha kanallardan buyurtmalarni avtomatik qabul qiling: sayt, Telegram, Glovo, Wolt, Yandex Eda. Qo\'lda kiritishsiz — buyurtmalar darhol kassada.'
    },
    features: {
      ru: [
        'Автопринятие заказов в R-Keeper',
        'Синхронизация меню и цен',
        'Управление стоп-листами',
        'Печать чеков на кухню',
        'Интеграция с Deliverect',
        'Отчёты и аналитика'
      ],
      en: [
        'Auto-accept orders in R-Keeper',
        'Menu and price synchronization',
        'Stop-list management',
        'Kitchen ticket printing',
        'Deliverect integration',
        'Reports and analytics'
      ],
      uz: [
        'R-Keeper da buyurtmalarni avto-qabul qilish',
        'Menyu va narxlarni sinxronizatsiya',
        'Stop-listlarni boshqarish',
        'Oshxonaga chek chop etish',
        'Deliverect integratsiyasi',
        'Hisobotlar va tahlil'
      ]
    },
    benefits: {
      ru: [
        'Снижение времени обработки заказа на 70%',
        'Нет ошибок при передаче в кассу',
        'Единый источник правды для меню',
        'Работает с R-Keeper 6 и 7'
      ],
      en: [
        '70% reduction in order processing time',
        'No errors in POS transfer',
        'Single source of truth for menu',
        'Works with R-Keeper 6 and 7'
      ],
      uz: [
        'Buyurtma ishlash vaqtini 70% ga kamaytirish',
        'Kassaga uzatishda xatolar yo\'q',
        'Menyu uchun yagona haqiqat manbasi',
        'R-Keeper 6 va 7 bilan ishlaydi'
      ]
    },
    faq: [
      {
        question: {
          ru: 'Поддерживается ли R-Keeper 7?',
          en: 'Is R-Keeper 7 supported?',
          uz: 'R-Keeper 7 qo\'llab-quvvatlanadimi?'
        },
        answer: {
          ru: 'Да, Delever полностью поддерживает R-Keeper 6 и R-Keeper 7. Интеграция через API или Deliverect.',
          en: 'Yes, Delever fully supports R-Keeper 6 and R-Keeper 7. Integration via API or Deliverect.',
          uz: 'Ha, Delever R-Keeper 6 va R-Keeper 7 ni to\'liq qo\'llab-quvvatlaydi. API yoki Deliverect orqali integratsiya.'
        }
      }
    ],
    icon: '🔵',
    color: 'from-blue-500 to-blue-600',
    relatedPages: ['integrations/iiko', 'integrations/poster', 'aggregators/wolt'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/poster',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Poster POS — онлайн-заказы для ресторанов',
      en: 'Poster POS Integration — Online Orders for Restaurants',
      uz: 'Poster POS integratsiyasi — restoranlar uchun onlayn buyurtmalar'
    },
    description: {
      ru: 'Подключите Poster к Delever: автоматический приём заказов с сайта и агрегаторов. Синхронизация меню, стоп-листов. Бесплатная настройка.',
      en: 'Connect Poster to Delever: automatic order intake from website and aggregators. Menu and stop-list sync. Free setup.',
      uz: 'Poster ni Delever ga ulang: sayt va agregatorlardan avtomatik buyurtma qabul qilish. Menyu va stop-list sinxronizatsiyasi. Bepul sozlash.'
    },
    keywords: {
      ru: 'Poster интеграция, Poster доставка, Poster POS онлайн заказы, подключить Poster',
      en: 'Poster integration, Poster delivery, Poster POS online orders, connect Poster',
      uz: 'Poster integratsiya, Poster yetkazib berish, Poster POS onlayn buyurtmalar'
    },
    h1: {
      ru: 'Интеграция Poster с Delever',
      en: 'Poster Integration with Delever',
      uz: 'Poster Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Poster — популярная облачная касса для кафе и ресторанов. С Delever все онлайн-заказы автоматически передаются в Poster без ручного ввода.',
      en: 'Poster is a popular cloud POS for cafes and restaurants. With Delever, all online orders are automatically transferred to Poster without manual entry.',
      uz: 'Poster — kafe va restoranlar uchun mashhur bulutli kassa. Delever bilan barcha onlayn buyurtmalar qo\'lda kiritishsiz avtomatik Poster ga uzatiladi.'
    },
    features: {
      ru: [
        'Облачная синхронизация меню',
        'Автопередача заказов',
        'Стоп-листы в реальном времени',
        'Скидки и акции',
        'Отчёты по продажам',
        'Мобильное приложение'
      ],
      en: [
        'Cloud menu synchronization',
        'Auto order transfer',
        'Real-time stop-lists',
        'Discounts and promotions',
        'Sales reports',
        'Mobile application'
      ],
      uz: [
        'Bulutli menyu sinxronizatsiyasi',
        'Avtomatik buyurtma uzatish',
        'Real vaqtda stop-listlar',
        'Chegirmalar va aksiyalar',
        'Savdo hisobotlari',
        'Mobil ilova'
      ]
    },
    benefits: {
      ru: [
        'Идеально для малого бизнеса',
        'Простая настройка за 30 минут',
        'Доступная цена',
        'Работает онлайн без сервера'
      ],
      en: [
        'Perfect for small business',
        'Simple 30-minute setup',
        'Affordable price',
        'Works online without server'
      ],
      uz: [
        'Kichik biznes uchun ideal',
        '30 daqiqada oddiy sozlash',
        'Qulay narx',
        'Serversiz onlayn ishlaydi'
      ]
    },
    faq: [],
    icon: '💚',
    color: 'from-green-500 to-green-600',
    relatedPages: ['integrations/iiko', 'integrations/jowi', 'products/channels'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/jowi',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Jowi — автоматизация заказов',
      en: 'Jowi Integration — Order Automation',
      uz: 'Jowi integratsiyasi — buyurtmalarni avtomatlashtirish'
    },
    description: {
      ru: 'Интеграция Jowi POS с Delever для автоматического приёма онлайн-заказов. Синхронизация меню и цен. Настройка за 1 день.',
      en: 'Jowi POS integration with Delever for automatic online order intake. Menu and price synchronization. Setup in 1 day.',
      uz: 'Jowi POS Delever bilan integratsiyasi onlayn buyurtmalarni avtomatik qabul qilish uchun. Menyu va narxlarni sinxronizatsiya. 1 kunda sozlash.'
    },
    keywords: {
      ru: 'Jowi интеграция, Jowi доставка, Jowi онлайн заказы',
      en: 'Jowi integration, Jowi delivery, Jowi online orders',
      uz: 'Jowi integratsiya, Jowi yetkazib berish'
    },
    h1: {
      ru: 'Интеграция Jowi с Delever',
      en: 'Jowi Integration with Delever',
      uz: 'Jowi Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Jowi — популярная POS-система в Узбекистане. Delever обеспечивает полную интеграцию для автоматизации доставки.',
      en: 'Jowi is a popular POS system in Uzbekistan. Delever provides full integration for delivery automation.',
      uz: 'Jowi — O\'zbekistonda mashhur POS tizimi. Delever yetkazib berishni avtomatlashtirish uchun to\'liq integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Синхронизация меню', 'Автопередача заказов', 'Стоп-листы', 'Отчёты'],
      en: ['Menu sync', 'Auto order transfer', 'Stop-lists', 'Reports'],
      uz: ['Menyu sinxronizatsiyasi', 'Avtomatik buyurtma uzatish', 'Stop-listlar', 'Hisobotlar']
    },
    benefits: {
      ru: ['Популярно в Узбекистане', 'Быстрая настройка', 'Локальная поддержка'],
      en: ['Popular in Uzbekistan', 'Quick setup', 'Local support'],
      uz: ['O\'zbekistonda mashhur', 'Tez sozlash', 'Mahalliy qo\'llab-quvvatlash']
    },
    faq: [],
    icon: '🩵',
    color: 'from-cyan-500 to-cyan-600',
    relatedPages: ['integrations/iiko', 'integrations/poster'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/syrve',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Syrve (iiko Cloud) — облачная автоматизация',
      en: 'Syrve (iiko Cloud) Integration — Cloud Automation',
      uz: 'Syrve (iiko Cloud) integratsiyasi — bulutli avtomatlashtirish'
    },
    description: {
      ru: 'Подключите Syrve к Delever для облачной автоматизации ресторана. Заказы с сайта и агрегаторов сразу в системе.',
      en: 'Connect Syrve to Delever for cloud restaurant automation. Orders from website and aggregators directly in the system.',
      uz: 'Syrve ni Delever ga ulang bulutli restoran avtomatizatsiyasi uchun. Sayt va agregatorlardan buyurtmalar bevosita tizimda.'
    },
    keywords: {
      ru: 'Syrve интеграция, iiko Cloud, Syrve доставка',
      en: 'Syrve integration, iiko Cloud, Syrve delivery',
      uz: 'Syrve integratsiya, iiko Cloud'
    },
    h1: {
      ru: 'Интеграция Syrve с Delever',
      en: 'Syrve Integration with Delever',
      uz: 'Syrve Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Syrve (ранее iiko Cloud) — современная облачная система управления рестораном. Полная интеграция с Delever.',
      en: 'Syrve (formerly iiko Cloud) — modern cloud restaurant management system. Full integration with Delever.',
      uz: 'Syrve (avvalgi iiko Cloud) — zamonaviy bulutli restoran boshqaruv tizimi. Delever bilan to\'liq integratsiya.'
    },
    features: {
      ru: ['Облачная синхронизация', 'API интеграция', 'Мультифилиальность', 'Аналитика'],
      en: ['Cloud sync', 'API integration', 'Multi-location', 'Analytics'],
      uz: ['Bulutli sinxronizatsiya', 'API integratsiya', 'Ko\'p filial', 'Tahlil']
    },
    benefits: {
      ru: ['Работает из любой точки', 'Автообновления', 'Масштабируемость'],
      en: ['Works from anywhere', 'Auto updates', 'Scalability'],
      uz: ['Istalgan joydan ishlaydi', 'Avtomatik yangilanishlar', 'Kengayuvchanlik']
    },
    faq: [],
    icon: '☁️',
    color: 'from-violet-500 to-violet-600',
    relatedPages: ['integrations/iiko', 'integrations/rkeeper'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// АГРЕГАТОРЫ
// ============================================
export const aggregatorIntegrations: SEOPageData[] = [
  {
    slug: 'aggregators/glovo',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция с Glovo — автопринятие заказов в ресторане',
      en: 'Glovo Integration — Auto-Accept Orders in Restaurant',
      uz: 'Glovo integratsiyasi — restoranda buyurtmalarni avto-qabul qilish'
    },
    description: {
      ru: 'Автоматическое принятие заказов Glovo в кассу ресторана. Без планшета, без ручного ввода. Интеграция с iiko, R-Keeper, Poster.',
      en: 'Automatic Glovo order acceptance to restaurant POS. No tablet, no manual entry. Integration with iiko, R-Keeper, Poster.',
      uz: 'Glovo buyurtmalarini restoran kassasiga avtomatik qabul qilish. Planshet yoki qo\'lda kiritishsiz. iiko, R-Keeper, Poster bilan integratsiya.'
    },
    keywords: {
      ru: 'Glovo интеграция, Glovo автопринятие, Glovo касса, Glovo iiko, Glovo R-Keeper',
      en: 'Glovo integration, Glovo auto-accept, Glovo POS, Glovo iiko',
      uz: 'Glovo integratsiya, Glovo avto-qabul, Glovo kassa'
    },
    h1: {
      ru: 'Интеграция Glovo с Delever',
      en: 'Glovo Integration with Delever',
      uz: 'Glovo Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Подключите Glovo к Delever — заказы автоматически попадают в вашу кассу (iiko, R-Keeper, Poster). Больше не нужен планшет Glovo и ручной ввод заказов.',
      en: 'Connect Glovo to Delever — orders automatically go to your POS (iiko, R-Keeper, Poster). No more Glovo tablet and manual order entry.',
      uz: 'Glovo ni Delever ga ulang — buyurtmalar avtomatik kassangizga tushadi (iiko, R-Keeper, Poster). Glovo plansheti va qo\'lda buyurtma kiritish kerak emas.'
    },
    features: {
      ru: [
        'Автопринятие заказов Glovo',
        'Передача в POS за 2 секунды',
        'Синхронизация меню с Glovo',
        'Управление стоп-листами',
        'Отклонение заказов из системы',
        'Аналитика по Glovo'
      ],
      en: [
        'Auto-accept Glovo orders',
        'POS transfer in 2 seconds',
        'Menu sync with Glovo',
        'Stop-list management',
        'Order rejection from system',
        'Glovo analytics'
      ],
      uz: [
        'Glovo buyurtmalarini avto-qabul qilish',
        '2 soniyada POS ga uzatish',
        'Glovo bilan menyu sinxronizatsiyasi',
        'Stop-listlarni boshqarish',
        'Tizimdan buyurtmalarni rad etish',
        'Glovo bo\'yicha tahlil'
      ]
    },
    benefits: {
      ru: [
        'Убираем планшет Glovo',
        'Снижение ошибок на 95%',
        'Экономия 2+ часов в день',
        'Единый экран всех заказов'
      ],
      en: [
        'Remove Glovo tablet',
        '95% error reduction',
        'Save 2+ hours daily',
        'Single screen for all orders'
      ],
      uz: [
        'Glovo planshetini olib tashlaymiz',
        'Xatolarni 95% ga kamaytirish',
        'Kuniga 2+ soat tejash',
        'Barcha buyurtmalar uchun yagona ekran'
      ]
    },
    faq: [
      {
        question: {
          ru: 'Как работает интеграция с Glovo?',
          en: 'How does Glovo integration work?',
          uz: 'Glovo integratsiyasi qanday ishlaydi?'
        },
        answer: {
          ru: 'Delever подключается к Glovo API. Когда клиент делает заказ в Glovo, он автоматически принимается и передаётся в вашу кассу за 2 секунды.',
          en: 'Delever connects to Glovo API. When a customer places an order on Glovo, it is automatically accepted and transferred to your POS in 2 seconds.',
          uz: 'Delever Glovo API ga ulanadi. Mijoz Glovo da buyurtma berganda, u avtomatik qabul qilinadi va 2 soniyada kassangizga uzatiladi.'
        }
      }
    ],
    logo: '/logos/Glovo.png',
    color: 'from-yellow-500 to-yellow-600',
    relatedPages: ['aggregators/wolt', 'aggregators/yandex-eats', 'integrations/iiko'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'aggregators/wolt',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция с Wolt — автоматизация заказов агрегатора',
      en: 'Wolt Integration — Aggregator Order Automation',
      uz: 'Wolt integratsiyasi — agregator buyurtmalarini avtomatlashtirish'
    },
    description: {
      ru: 'Автопринятие заказов Wolt в кассу ресторана. Интеграция с iiko, R-Keeper. Синхронизация меню. Без планшета Wolt.',
      en: 'Auto-accept Wolt orders to restaurant POS. Integration with iiko, R-Keeper. Menu sync. No Wolt tablet.',
      uz: 'Wolt buyurtmalarini restoran kassasiga avto-qabul qilish. iiko, R-Keeper bilan integratsiya. Menyu sinxronizatsiyasi. Wolt planshetisiz.'
    },
    keywords: {
      ru: 'Wolt интеграция, Wolt автопринятие, Wolt касса, Wolt iiko',
      en: 'Wolt integration, Wolt auto-accept, Wolt POS, Wolt iiko',
      uz: 'Wolt integratsiya, Wolt avto-qabul, Wolt kassa'
    },
    h1: {
      ru: 'Интеграция Wolt с Delever',
      en: 'Wolt Integration with Delever',
      uz: 'Wolt Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Wolt — один из крупнейших агрегаторов доставки еды. С Delever заказы Wolt автоматически попадают в вашу POS-систему.',
      en: 'Wolt is one of the largest food delivery aggregators. With Delever, Wolt orders automatically go to your POS system.',
      uz: 'Wolt — eng yirik ovqat yetkazib berish agregatorlaridan biri. Delever bilan Wolt buyurtmalari avtomatik POS tizimingizga tushadi.'
    },
    features: {
      ru: ['Автопринятие заказов', 'Синхронизация меню', 'Интеграция с POS', 'Wolt Drive поддержка'],
      en: ['Auto-accept orders', 'Menu sync', 'POS integration', 'Wolt Drive support'],
      uz: ['Buyurtmalarni avto-qabul qilish', 'Menyu sinxronizatsiyasi', 'POS integratsiyasi', 'Wolt Drive qo\'llab-quvvatlash']
    },
    benefits: {
      ru: ['Единый экран заказов', 'Без планшета Wolt', 'Экономия времени'],
      en: ['Single order screen', 'No Wolt tablet', 'Time savings'],
      uz: ['Yagona buyurtmalar ekrani', 'Wolt planshetisiz', 'Vaqtni tejash']
    },
    faq: [],
    logo: '/logos/wolt.png',
    color: 'from-cyan-500 to-cyan-600',
    relatedPages: ['aggregators/glovo', 'aggregators/yandex-eats', 'delivery/wolt-drive'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'aggregators/yandex-eats',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция с Яндекс Едой — автоматизация заказов',
      en: 'Yandex Eats Integration — Order Automation',
      uz: 'Yandex Eda integratsiyasi — buyurtmalarni avtomatlashtirish'
    },
    description: {
      ru: 'Автоматическое принятие заказов Яндекс Еды в кассу. Интеграция с iiko, R-Keeper. Без планшета агрегатора.',
      en: 'Automatic Yandex Eats order acceptance to POS. Integration with iiko, R-Keeper. No aggregator tablet.',
      uz: 'Yandex Eda buyurtmalarini kassaga avtomatik qabul qilish. iiko, R-Keeper bilan integratsiya. Agregator planshetisiz.'
    },
    keywords: {
      ru: 'Яндекс Еда интеграция, Yandex Eats автопринятие, Яндекс Еда касса',
      en: 'Yandex Eats integration, Yandex Eats auto-accept, Yandex Eats POS',
      uz: 'Yandex Eda integratsiya, Yandex Eda avto-qabul'
    },
    h1: {
      ru: 'Интеграция Яндекс Еды с Delever',
      en: 'Yandex Eats Integration with Delever',
      uz: 'Yandex Eda Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Яндекс Еда — популярный агрегатор в СНГ. Delever автоматизирует приём заказов и передачу в кассу.',
      en: 'Yandex Eats is a popular aggregator in CIS. Delever automates order intake and POS transfer.',
      uz: 'Yandex Eda — MDH da mashhur agregator. Delever buyurtmalarni qabul qilish va kassaga uzatishni avtomatlashtiradi.'
    },
    features: {
      ru: ['Автопринятие заказов', 'Синхронизация меню', 'Yandex Delivery интеграция'],
      en: ['Auto-accept orders', 'Menu sync', 'Yandex Delivery integration'],
      uz: ['Buyurtmalarni avto-qabul qilish', 'Menyu sinxronizatsiyasi', 'Yandex Delivery integratsiyasi']
    },
    benefits: {
      ru: ['Работает в Узбекистане и Казахстане', 'Интеграция с Яндекс Доставкой'],
      en: ['Works in Uzbekistan and Kazakhstan', 'Yandex Delivery integration'],
      uz: ['O\'zbekiston va Qozog\'istonda ishlaydi', 'Yandex Delivery integratsiyasi']
    },
    faq: [],
    logo: '/logos/Yandex Eats.jpeg',
    color: 'from-red-500 to-red-600',
    relatedPages: ['aggregators/glovo', 'aggregators/wolt', 'delivery/yandex-delivery'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'aggregators/uzum-tezkor',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция с Uzum Tezkor — автоматизация заказов',
      en: 'Uzum Tezkor Integration — Order Automation',
      uz: 'Uzum Tezkor integratsiyasi — buyurtmalarni avtomatlashtirish'
    },
    description: {
      ru: 'Автопринятие заказов Uzum Tezkor в кассу ресторана. Интеграция с iiko, Jowi. Популярно в Узбекистане.',
      en: 'Auto-accept Uzum Tezkor orders to restaurant POS. Integration with iiko, Jowi. Popular in Uzbekistan.',
      uz: 'Uzum Tezkor buyurtmalarini restoran kassasiga avto-qabul qilish. iiko, Jowi bilan integratsiya. O\'zbekistonda mashhur.'
    },
    keywords: {
      ru: 'Uzum Tezkor интеграция, Uzum автопринятие, Uzum касса',
      en: 'Uzum Tezkor integration, Uzum auto-accept',
      uz: 'Uzum Tezkor integratsiya, Uzum avto-qabul'
    },
    h1: {
      ru: 'Интеграция Uzum Tezkor с Delever',
      en: 'Uzum Tezkor Integration with Delever',
      uz: 'Uzum Tezkor Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Uzum Tezkor — крупнейший агрегатор доставки еды в Узбекистане. Delever обеспечивает автоматическое принятие заказов.',
      en: 'Uzum Tezkor is the largest food delivery aggregator in Uzbekistan. Delever provides automatic order acceptance.',
      uz: 'Uzum Tezkor — O\'zbekistonda eng yirik ovqat yetkazib berish agregatori. Delever buyurtmalarni avtomatik qabul qilishni ta\'minlaydi.'
    },
    features: {
      ru: ['Автопринятие заказов', 'Синхронизация меню', 'Работа в Узбекистане'],
      en: ['Auto-accept orders', 'Menu sync', 'Works in Uzbekistan'],
      uz: ['Buyurtmalarni avto-qabul qilish', 'Menyu sinxronizatsiyasi', 'O\'zbekistonda ishlaydi']
    },
    benefits: {
      ru: ['#1 агрегатор в Узбекистане', 'Локальная поддержка'],
      en: ['#1 aggregator in Uzbekistan', 'Local support'],
      uz: ['O\'zbekistonda #1 agregator', 'Mahalliy qo\'llab-quvvatlash']
    },
    faq: [],
    logo: '/logos/Uzum tezkor.png',
    color: 'from-purple-500 to-purple-600',
    relatedPages: ['aggregators/glovo', 'integrations/jowi'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'aggregators/bolt-food',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция с Bolt Food — автопринятие заказов',
      en: 'Bolt Food Integration — Auto-Accept Orders',
      uz: 'Bolt Food integratsiyasi — buyurtmalarni avto-qabul qilish'
    },
    description: {
      ru: 'Автоматическое принятие заказов Bolt Food в кассу. Интеграция с POS-системами. Без планшета Bolt.',
      en: 'Automatic Bolt Food order acceptance to POS. POS system integration. No Bolt tablet.',
      uz: 'Bolt Food buyurtmalarini kassaga avtomatik qabul qilish. POS tizimlar bilan integratsiya. Bolt planshetisiz.'
    },
    keywords: {
      ru: 'Bolt Food интеграция, Bolt Food автопринятие',
      en: 'Bolt Food integration, Bolt Food auto-accept',
      uz: 'Bolt Food integratsiya, Bolt Food avto-qabul'
    },
    h1: {
      ru: 'Интеграция Bolt Food с Delever',
      en: 'Bolt Food Integration with Delever',
      uz: 'Bolt Food Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Bolt Food — агрегатор доставки от Bolt. Delever автоматизирует приём заказов и передачу в кассу.',
      en: 'Bolt Food is a delivery aggregator from Bolt. Delever automates order intake and POS transfer.',
      uz: 'Bolt Food — Bolt dan yetkazib berish agregatori. Delever buyurtmalarni qabul qilish va kassaga uzatishni avtomatlashtiradi.'
    },
    features: {
      ru: ['Автопринятие заказов', 'POS интеграция', 'Синхронизация меню'],
      en: ['Auto-accept orders', 'POS integration', 'Menu sync'],
      uz: ['Buyurtmalarni avto-qabul qilish', 'POS integratsiyasi', 'Menyu sinxronizatsiyasi']
    },
    benefits: {
      ru: ['Растущий агрегатор', 'Единый экран заказов'],
      en: ['Growing aggregator', 'Single order screen'],
      uz: ['O\'sib borayotgan agregator', 'Yagona buyurtmalar ekrani']
    },
    faq: [],
    logo: '/logos/Bolt food.png',
    color: 'from-green-500 to-green-600',
    relatedPages: ['aggregators/glovo', 'aggregators/wolt'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// ПЛАТЕЖНЫЕ СИСТЕМЫ
// ============================================
export const paymentIntegrations: SEOPageData[] = [
  {
    slug: 'integrations/payme',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция с Payme — онлайн-оплата для ресторанов',
      en: 'Payme Integration — Online Payments for Restaurants',
      uz: 'Payme integratsiyasi — restoranlar uchun onlayn to\'lov'
    },
    description: {
      ru: 'Приём онлайн-платежей через Payme на сайте доставки. Автоматическая фискализация. Отчёты по оплатам.',
      en: 'Accept online payments via Payme on delivery website. Automatic fiscalization. Payment reports.',
      uz: 'Yetkazib berish saytida Payme orqali onlayn to\'lovlarni qabul qilish. Avtomatik fiskalizatsiya. To\'lov hisobotlari.'
    },
    keywords: {
      ru: 'Payme интеграция, Payme ресторан, Payme доставка, онлайн оплата Payme',
      en: 'Payme integration, Payme restaurant, Payme delivery, online payment Payme',
      uz: 'Payme integratsiya, Payme restoran, Payme yetkazib berish, onlayn to\'lov Payme'
    },
    h1: {
      ru: 'Интеграция Payme с Delever',
      en: 'Payme Integration with Delever',
      uz: 'Payme Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Payme — популярная платёжная система в Узбекистане. Delever обеспечивает бесшовную интеграцию для онлайн-оплаты заказов.',
      en: 'Payme is a popular payment system in Uzbekistan. Delever provides seamless integration for online order payments.',
      uz: 'Payme — O\'zbekistonda mashhur to\'lov tizimi. Delever buyurtmalarni onlayn to\'lash uchun uzluksiz integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Онлайн-оплата на сайте', 'Оплата в Telegram-боте', 'Автофискализация', 'Отчёты по оплатам'],
      en: ['Website online payment', 'Telegram bot payment', 'Auto fiscalization', 'Payment reports'],
      uz: ['Saytda onlayn to\'lov', 'Telegram-botda to\'lov', 'Avtofiskalizatsiya', 'To\'lov hisobotlari']
    },
    benefits: {
      ru: ['#1 платёжная система в Узбекистане', 'Мгновенное зачисление'],
      en: ['#1 payment system in Uzbekistan', 'Instant crediting'],
      uz: ['O\'zbekistonda #1 to\'lov tizimi', 'Bir zumda hisobga o\'tkazish']
    },
    faq: [],
    icon: '💳',
    color: 'from-cyan-500 to-cyan-600',
    relatedPages: ['integrations/click', 'integrations/uzum-bank'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/click',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция с Click — приём платежей для доставки',
      en: 'Click Integration — Payment Acceptance for Delivery',
      uz: 'Click integratsiyasi — yetkazib berish uchun to\'lovlarni qabul qilish'
    },
    description: {
      ru: 'Приём онлайн-платежей через Click на сайте и в Telegram. Автоматическая сверка. Фискализация чеков.',
      en: 'Accept online payments via Click on website and Telegram. Automatic reconciliation. Receipt fiscalization.',
      uz: 'Sayt va Telegram da Click orqali onlayn to\'lovlarni qabul qilish. Avtomatik solishtirish. Cheklarni fiskalizatsiya qilish.'
    },
    keywords: {
      ru: 'Click интеграция, Click ресторан, Click доставка',
      en: 'Click integration, Click restaurant, Click delivery',
      uz: 'Click integratsiya, Click restoran, Click yetkazib berish'
    },
    h1: {
      ru: 'Интеграция Click с Delever',
      en: 'Click Integration with Delever',
      uz: 'Click Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Click — популярная платёжная система в Узбекистане. Полная интеграция с Delever для онлайн-оплаты.',
      en: 'Click is a popular payment system in Uzbekistan. Full integration with Delever for online payments.',
      uz: 'Click — O\'zbekistonda mashhur to\'lov tizimi. Onlayn to\'lovlar uchun Delever bilan to\'liq integratsiya.'
    },
    features: {
      ru: ['Онлайн-оплата', 'Click UP интеграция', 'Фискализация'],
      en: ['Online payment', 'Click UP integration', 'Fiscalization'],
      uz: ['Onlayn to\'lov', 'Click UP integratsiyasi', 'Fiskalizatsiya']
    },
    benefits: {
      ru: ['Широкое покрытие', 'Быстрая интеграция'],
      en: ['Wide coverage', 'Quick integration'],
      uz: ['Keng qamrov', 'Tez integratsiya']
    },
    faq: [],
    icon: '🔵',
    color: 'from-blue-500 to-blue-600',
    relatedPages: ['integrations/payme', 'integrations/uzum-bank'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// СЛУЖБЫ ДОСТАВКИ
// ============================================
export const deliveryIntegrations: SEOPageData[] = [
  {
    slug: 'delivery/yandex-delivery',
    category: 'integration',
    subcategory: 'delivery',
    title: {
      ru: 'Интеграция с Яндекс Доставкой — курьеры для ресторана',
      en: 'Yandex Delivery Integration — Couriers for Restaurant',
      uz: 'Yandex Delivery integratsiyasi — restoran uchun kuryerlar'
    },
    description: {
      ru: 'Подключите Яндекс Доставку к Delever: автоматический вызов курьера, отслеживание, расчёт стоимости.',
      en: 'Connect Yandex Delivery to Delever: automatic courier call, tracking, cost calculation.',
      uz: 'Yandex Delivery ni Delever ga ulang: avtomatik kuryer chaqirish, kuzatish, narxni hisoblash.'
    },
    keywords: {
      ru: 'Яндекс Доставка интеграция, Яндекс курьеры, Yandex Delivery ресторан',
      en: 'Yandex Delivery integration, Yandex couriers',
      uz: 'Yandex Delivery integratsiya, Yandex kuryerlari'
    },
    h1: {
      ru: 'Интеграция Яндекс Доставки с Delever',
      en: 'Yandex Delivery Integration with Delever',
      uz: 'Yandex Delivery Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Яндекс Доставка позволяет использовать курьеров Яндекса для доставки заказов. Delever автоматизирует весь процесс.',
      en: 'Yandex Delivery allows using Yandex couriers for order delivery. Delever automates the entire process.',
      uz: 'Yandex Delivery buyurtmalarni yetkazib berish uchun Yandex kuryerlaridan foydalanish imkonini beradi. Delever butun jarayonni avtomatlashtiradi.'
    },
    features: {
      ru: ['Автовызов курьера', 'GPS отслеживание', 'Расчёт стоимости', 'Статусы доставки'],
      en: ['Auto courier call', 'GPS tracking', 'Cost calculation', 'Delivery statuses'],
      uz: ['Avtomatik kuryer chaqirish', 'GPS kuzatuv', 'Narxni hisoblash', 'Yetkazib berish holatlari']
    },
    benefits: {
      ru: ['Без своих курьеров', 'Масштабируемость', 'Прозрачные расходы'],
      en: ['No own couriers', 'Scalability', 'Transparent costs'],
      uz: ['O\'z kuryerlarsiz', 'Kengayuvchanlik', 'Shaffof xarajatlar']
    },
    faq: [],
    logo: '/logos/Yandex go (dostavka).svg.png',
    color: 'from-yellow-500 to-yellow-600',
    relatedPages: ['delivery/wolt-drive', 'delivery/millennium'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'delivery/wolt-drive',
    category: 'integration',
    subcategory: 'delivery',
    title: {
      ru: 'Интеграция с Wolt Drive — курьерская служба для ресторанов',
      en: 'Wolt Drive Integration — Courier Service for Restaurants',
      uz: 'Wolt Drive integratsiyasi — restoranlar uchun kuryer xizmati'
    },
    description: {
      ru: 'Wolt Drive интеграция: курьеры Wolt доставят заказы с вашего сайта. Автоматический вызов, отслеживание.',
      en: 'Wolt Drive integration: Wolt couriers deliver orders from your website. Automatic dispatch, tracking.',
      uz: 'Wolt Drive integratsiyasi: Wolt kuryerlari saytingizdan buyurtmalarni yetkazadi. Avtomatik jo\'natish, kuzatish.'
    },
    keywords: {
      ru: 'Wolt Drive интеграция, Wolt курьеры, Wolt Drive ресторан',
      en: 'Wolt Drive integration, Wolt couriers',
      uz: 'Wolt Drive integratsiya, Wolt kuryerlari'
    },
    h1: {
      ru: 'Интеграция Wolt Drive с Delever',
      en: 'Wolt Drive Integration with Delever',
      uz: 'Wolt Drive Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Wolt Drive — курьерский сервис от Wolt. Используйте курьеров Wolt для доставки заказов с собственного сайта.',
      en: 'Wolt Drive is a courier service from Wolt. Use Wolt couriers to deliver orders from your own website.',
      uz: 'Wolt Drive — Wolt dan kuryer xizmati. O\'z saytingizdan buyurtmalarni yetkazish uchun Wolt kuryerlaridan foydalaning.'
    },
    features: {
      ru: ['Курьеры Wolt', 'Автовызов', 'Live tracking'],
      en: ['Wolt couriers', 'Auto dispatch', 'Live tracking'],
      uz: ['Wolt kuryerlari', 'Avtomatik jo\'natish', 'Jonli kuzatuv']
    },
    benefits: {
      ru: ['Без своих курьеров', 'Профессиональный сервис'],
      en: ['No own couriers', 'Professional service'],
      uz: ['O\'z kuryerlarsiz', 'Professional xizmat']
    },
    faq: [],
    logo: '/logos/wolt.png',
    color: 'from-cyan-500 to-cyan-600',
    relatedPages: ['delivery/yandex-delivery', 'aggregators/wolt'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'delivery/millennium',
    category: 'integration',
    subcategory: 'delivery',
    title: {
      ru: 'Интеграция с Taxi Millennium — курьеры для доставки',
      en: 'Taxi Millennium Integration — Couriers for Delivery',
      uz: 'Taxi Millennium integratsiyasi — yetkazib berish uchun kuryerlar'
    },
    description: {
      ru: 'Taxi Millennium интеграция: вызов курьеров для доставки заказов в Узбекистане.',
      en: 'Taxi Millennium integration: call couriers for order delivery in Uzbekistan.',
      uz: 'Taxi Millennium integratsiyasi: O\'zbekistonda buyurtmalarni yetkazish uchun kuryerlarni chaqirish.'
    },
    keywords: {
      ru: 'Millennium интеграция, Millennium курьеры, доставка Millennium',
      en: 'Millennium integration, Millennium couriers',
      uz: 'Millennium integratsiya, Millennium kuryerlari'
    },
    h1: {
      ru: 'Интеграция Taxi Millennium с Delever',
      en: 'Taxi Millennium Integration with Delever',
      uz: 'Taxi Millennium Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Taxi Millennium — популярный сервис такси в Узбекистане. С Delever можно использовать курьеров Millennium для доставки.',
      en: 'Taxi Millennium is a popular taxi service in Uzbekistan. With Delever you can use Millennium couriers for delivery.',
      uz: 'Taxi Millennium — O\'zbekistonda mashhur taksi xizmati. Delever bilan yetkazib berish uchun Millennium kuryerlaridan foydalanishingiz mumkin.'
    },
    features: {
      ru: ['Интеграция с такси', 'Автовызов', 'Локальный сервис'],
      en: ['Taxi integration', 'Auto dispatch', 'Local service'],
      uz: ['Taksi integratsiyasi', 'Avtomatik chaqirish', 'Mahalliy xizmat']
    },
    benefits: {
      ru: ['Популярно в Узбекистане', 'Доступные цены'],
      en: ['Popular in Uzbekistan', 'Affordable prices'],
      uz: ['O\'zbekistonda mashhur', 'Qulay narxlar']
    },
    faq: [],
    logo: '/logos/Millenium taxi.png',
    color: 'from-yellow-500 to-yellow-600',
    relatedPages: ['delivery/yandex-delivery', 'delivery/noor'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// РЕШЕНИЯ ПО ТИПУ БИЗНЕСА
// ============================================
export const businessSolutions: SEOPageData[] = [
  {
    slug: 'solutions/pizzeria',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для пиццерии — запуск за 1 день',
      en: 'Delivery System for Pizzeria — Launch in 1 Day',
      uz: 'Pizzeriya uchun yetkazib berish tizimi — 1 kunda ishga tushirish'
    },
    description: {
      ru: 'Готовое решение для пиццерии: сайт, Telegram-бот, мобильное приложение. Интеграция с iiko, агрегаторами. Запуск за 1 день.',
      en: 'Ready solution for pizzeria: website, Telegram bot, mobile app. Integration with iiko, aggregators. Launch in 1 day.',
      uz: 'Pizzeriya uchun tayyor yechim: sayt, Telegram-bot, mobil ilova. iiko, agregatorlar bilan integratsiya. 1 kunda ishga tushirish.'
    },
    keywords: {
      ru: 'доставка пиццы система, пиццерия онлайн заказы, приложение для пиццерии, сайт пиццерии',
      en: 'pizza delivery system, pizzeria online orders, pizzeria app, pizzeria website',
      uz: 'pitsa yetkazib berish tizimi, pizzeriya onlayn buyurtmalar, pizzeriya ilovasi'
    },
    h1: {
      ru: 'Система доставки для пиццерии',
      en: 'Delivery System for Pizzeria',
      uz: 'Pizzeriya uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Пиццерия — идеальный бизнес для доставки. Delever предлагает готовое решение: сайт с конструктором пиццы, Telegram-бот, приложение курьера.',
      en: 'Pizzeria is an ideal business for delivery. Delever offers a ready solution: website with pizza constructor, Telegram bot, courier app.',
      uz: 'Pizzeriya — yetkazib berish uchun ideal biznes. Delever tayyor yechim taklif etadi: pizza konstruktori bilan sayt, Telegram-bot, kuryer ilovasi.'
    },
    features: {
      ru: ['Конструктор пиццы на сайте', 'Telegram-бот', 'Приложение курьера', 'Интеграция с iiko'],
      en: ['Pizza constructor on website', 'Telegram bot', 'Courier app', 'iiko integration'],
      uz: ['Saytda pizza konstruktori', 'Telegram-bot', 'Kuryer ilovasi', 'iiko integratsiyasi']
    },
    benefits: {
      ru: ['Средний чек +25%', 'Запуск за 1 день', 'Снижение комиссий агрегаторов'],
      en: ['Average check +25%', 'Launch in 1 day', 'Reduce aggregator commissions'],
      uz: ['O\'rtacha chek +25%', '1 kunda ishga tushirish', 'Agregator komissiyalarini kamaytirish']
    },
    faq: [
      {
        question: {
          ru: 'Можно ли создать конструктор пиццы?',
          en: 'Can I create a pizza constructor?',
          uz: 'Pizza konstruktorini yaratish mumkinmi?'
        },
        answer: {
          ru: 'Да, Delever поддерживает конструктор блюд с модификаторами. Клиент может выбрать размер, тесто, добавки.',
          en: 'Yes, Delever supports dish constructor with modifiers. Customer can choose size, dough, toppings.',
          uz: 'Ha, Delever modifikatorlar bilan taom konstruktorini qo\'llab-quvvatlaydi. Mijoz o\'lcham, xamir, qo\'shimchalarni tanlashi mumkin.'
        }
      }
    ],
    icon: '🍕',
    color: 'from-red-500 to-orange-500',
    relatedPages: ['solutions/sushi', 'solutions/burger', 'products/channels'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/sushi',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для суши-бара — онлайн-заказы',
      en: 'Delivery System for Sushi Bar — Online Orders',
      uz: 'Sushi-bar uchun yetkazib berish tizimi — onlayn buyurtmalar'
    },
    description: {
      ru: 'Решение для суши-бара: красивый сайт, Telegram-бот, интеграция с POS. Конструктор роллов. Запуск за 1 день.',
      en: 'Solution for sushi bar: beautiful website, Telegram bot, POS integration. Roll constructor. Launch in 1 day.',
      uz: 'Sushi-bar uchun yechim: chiroyli sayt, Telegram-bot, POS integratsiyasi. Roll konstruktori. 1 kunda ishga tushirish.'
    },
    keywords: {
      ru: 'доставка суши система, суши-бар онлайн заказы, приложение для суши',
      en: 'sushi delivery system, sushi bar online orders, sushi app',
      uz: 'sushi yetkazib berish tizimi, sushi-bar onlayn buyurtmalar'
    },
    h1: {
      ru: 'Система доставки для суши-бара',
      en: 'Delivery System for Sushi Bar',
      uz: 'Sushi-bar uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Суши-бары — один из топ-сегментов доставки. Delever предлагает специализированное решение с конструктором сетов и роллов.',
      en: 'Sushi bars are one of the top delivery segments. Delever offers a specialized solution with set and roll constructor.',
      uz: 'Sushi-barlar — yetkazib berishning top segmentlaridan biri. Delever setlar va rolllar konstruktori bilan maxsus yechim taklif etadi.'
    },
    features: {
      ru: ['Конструктор сетов', 'Красивый каталог', 'Telegram-бот', 'Программа лояльности'],
      en: ['Set constructor', 'Beautiful catalog', 'Telegram bot', 'Loyalty program'],
      uz: ['Setlar konstruktori', 'Chiroyli katalog', 'Telegram-bot', 'Sodiqlik dasturi']
    },
    benefits: {
      ru: ['Высокий средний чек', 'Повторные заказы +40%'],
      en: ['High average check', 'Repeat orders +40%'],
      uz: ['Yuqori o\'rtacha chek', 'Takroriy buyurtmalar +40%']
    },
    faq: [],
    icon: '🍣',
    color: 'from-pink-500 to-rose-500',
    relatedPages: ['solutions/pizzeria', 'solutions/dark-kitchen'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/dark-kitchen',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система для Dark Kitchen — облачная кухня без зала',
      en: 'Dark Kitchen System — Cloud Kitchen Without Dining',
      uz: 'Dark Kitchen uchun tizim — zalsiz bulutli oshxona'
    },
    description: {
      ru: 'Решение для Dark Kitchen: несколько брендов в одной кухне, единая система заказов, интеграция с агрегаторами.',
      en: 'Dark Kitchen solution: multiple brands in one kitchen, unified ordering system, aggregator integration.',
      uz: 'Dark Kitchen uchun yechim: bitta oshxonada bir nechta brendlar, yagona buyurtma tizimi, agregatorlar bilan integratsiya.'
    },
    keywords: {
      ru: 'dark kitchen система, облачная кухня, виртуальный ресторан, ghost kitchen',
      en: 'dark kitchen system, cloud kitchen, virtual restaurant, ghost kitchen',
      uz: 'dark kitchen tizimi, bulutli oshxona, virtual restoran'
    },
    h1: {
      ru: 'Система для Dark Kitchen',
      en: 'Dark Kitchen System',
      uz: 'Dark Kitchen uchun tizim'
    },
    intro: {
      ru: 'Dark Kitchen (облачная кухня) — бизнес-модель без зала, только доставка. Delever идеально подходит для управления несколькими брендами.',
      en: 'Dark Kitchen (cloud kitchen) — business model without dining, delivery only. Delever is perfect for managing multiple brands.',
      uz: 'Dark Kitchen (bulutli oshxona) — zalsiz biznes modeli, faqat yetkazib berish. Delever bir nechta brendlarni boshqarish uchun ideal.'
    },
    features: {
      ru: ['Мультибренд', 'Единая кухня', 'Все агрегаторы', 'Аналитика по брендам'],
      en: ['Multi-brand', 'Single kitchen', 'All aggregators', 'Brand analytics'],
      uz: ['Ko\'p brendli', 'Yagona oshxona', 'Barcha agregatorlar', 'Brendlar bo\'yicha tahlil']
    },
    benefits: {
      ru: ['Низкие операционные расходы', 'Быстрый запуск новых брендов', 'Масштабируемость'],
      en: ['Low operational costs', 'Quick launch of new brands', 'Scalability'],
      uz: ['Past operatsion xarajatlar', 'Yangi brendlarni tez ishga tushirish', 'Kengayuvchanlik']
    },
    faq: [],
    icon: '🏭',
    color: 'from-gray-600 to-gray-700',
    relatedPages: ['solutions/food-chain', 'aggregators/glovo'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/food-chain',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система для сети ресторанов — централизованное управление',
      en: 'Restaurant Chain System — Centralized Management',
      uz: 'Restoran tarmog\'i uchun tizim — markazlashtirilgan boshqaruv'
    },
    description: {
      ru: 'Решение для сети ресторанов: единое меню, централизованные отчёты, мультифилиальность. Масштабируется до 500+ точек.',
      en: 'Restaurant chain solution: unified menu, centralized reports, multi-location. Scales to 500+ locations.',
      uz: 'Restoran tarmog\'i uchun yechim: yagona menyu, markazlashtirilgan hisobotlar, ko\'p filiallilik. 500+ nuqtagacha kengayadi.'
    },
    keywords: {
      ru: 'система для сети ресторанов, франшиза ресторан, мультифилиальность, централизованное управление',
      en: 'restaurant chain system, restaurant franchise, multi-location, centralized management',
      uz: 'restoran tarmog\'i uchun tizim, restoran franshizasi, ko\'p filiallilik'
    },
    h1: {
      ru: 'Система для сети ресторанов',
      en: 'Restaurant Chain System',
      uz: 'Restoran tarmog\'i uchun tizim'
    },
    intro: {
      ru: 'Управление сетью ресторанов требует централизации. Delever обеспечивает единое меню, отчёты, контроль всех филиалов.',
      en: 'Restaurant chain management requires centralization. Delever provides unified menu, reports, control of all locations.',
      uz: 'Restoran tarmog\'ini boshqarish markazlashtirishni talab qiladi. Delever yagona menyu, hisobotlar, barcha filiallarni nazorat qilishni ta\'minlaydi.'
    },
    features: {
      ru: ['Единое меню на все филиалы', 'Централизованные отчёты', 'Разграничение прав доступа', 'Сравнение филиалов'],
      en: ['Unified menu for all locations', 'Centralized reports', 'Access rights management', 'Location comparison'],
      uz: ['Barcha filiallar uchun yagona menyu', 'Markazlashtirilgan hisobotlar', 'Kirish huquqlarini boshqarish', 'Filiallarni solishtirish']
    },
    benefits: {
      ru: ['EVOS, Yaponamama, Les Ailes уже используют', 'Масштабируемость до 500+ точек'],
      en: ['EVOS, Yaponamama, Les Ailes already use', 'Scales to 500+ locations'],
      uz: ['EVOS, Yaponamama, Les Ailes allaqachon foydalanmoqda', '500+ nuqtagacha kengayadi']
    },
    faq: [],
    icon: '🏢',
    color: 'from-indigo-500 to-indigo-600',
    relatedPages: ['solutions/dark-kitchen', 'products/analytics'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/cafe',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для кафе — онлайн-заказы',
      en: 'Delivery System for Cafe — Online Orders',
      uz: 'Kafe uchun yetkazib berish tizimi — onlayn buyurtmalar'
    },
    description: {
      ru: 'Решение для кафе: сайт с доставкой, Telegram-бот, QR-меню. Простая настройка. Доступная цена.',
      en: 'Cafe solution: delivery website, Telegram bot, QR menu. Simple setup. Affordable price.',
      uz: 'Kafe uchun yechim: yetkazib berish sayti, Telegram-bot, QR-menyu. Oddiy sozlash. Qulay narx.'
    },
    keywords: {
      ru: 'доставка для кафе, кафе онлайн заказы, сайт кафе',
      en: 'cafe delivery, cafe online orders, cafe website',
      uz: 'kafe uchun yetkazib berish, kafe onlayn buyurtmalar'
    },
    h1: {
      ru: 'Система доставки для кафе',
      en: 'Delivery System for Cafe',
      uz: 'Kafe uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Кафе может запустить доставку быстро и недорого. Delever предлагает готовое решение для малого бизнеса.',
      en: 'Cafe can launch delivery quickly and affordably. Delever offers a ready solution for small business.',
      uz: 'Kafe yetkazib berishni tez va arzon ishga tushirishi mumkin. Delever kichik biznes uchun tayyor yechim taklif etadi.'
    },
    features: {
      ru: ['Простой сайт', 'Telegram-бот', 'QR-меню', 'Онлайн-оплата'],
      en: ['Simple website', 'Telegram bot', 'QR menu', 'Online payment'],
      uz: ['Oddiy sayt', 'Telegram-bot', 'QR-menyu', 'Onlayn to\'lov']
    },
    benefits: {
      ru: ['Доступная цена', 'Быстрый запуск', 'Без технических знаний'],
      en: ['Affordable price', 'Quick launch', 'No technical knowledge needed'],
      uz: ['Qulay narx', 'Tez ishga tushirish', 'Texnik bilim kerak emas']
    },
    faq: [],
    icon: '☕',
    color: 'from-amber-500 to-amber-600',
    relatedPages: ['solutions/pizzeria', 'products/channels'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/burger',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для бургерной — онлайн-заказы',
      en: 'Delivery System for Burger Restaurant — Online Orders',
      uz: 'Burger restoran uchun yetkazib berish tizimi — onlayn buyurtmalar'
    },
    description: {
      ru: 'Решение для бургерной: сайт с конструктором бургеров, Telegram-бот, интеграция с POS.',
      en: 'Burger restaurant solution: website with burger constructor, Telegram bot, POS integration.',
      uz: 'Burger restoran uchun yechim: burger konstruktori bilan sayt, Telegram-bot, POS integratsiyasi.'
    },
    keywords: {
      ru: 'доставка бургеров система, бургерная онлайн заказы',
      en: 'burger delivery system, burger restaurant online orders',
      uz: 'burger yetkazib berish tizimi, burger restoran onlayn buyurtmalar'
    },
    h1: {
      ru: 'Система доставки для бургерной',
      en: 'Delivery System for Burger Restaurant',
      uz: 'Burger restoran uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Бургерные — популярный формат для доставки. Delever предлагает конструктор бургеров и интеграцию с кассой.',
      en: 'Burger restaurants are a popular delivery format. Delever offers burger constructor and POS integration.',
      uz: 'Burger restoranlar — yetkazib berish uchun mashhur format. Delever burger konstruktori va kassa integratsiyasini taklif etadi.'
    },
    features: {
      ru: ['Конструктор бургеров', 'Комбо-наборы', 'Telegram-бот', 'Программа лояльности'],
      en: ['Burger constructor', 'Combo sets', 'Telegram bot', 'Loyalty program'],
      uz: ['Burger konstruktori', 'Combo to\'plamlar', 'Telegram-bot', 'Sodiqlik dasturi']
    },
    benefits: {
      ru: ['Высокая маржинальность', 'Быстрая доставка'],
      en: ['High margin', 'Fast delivery'],
      uz: ['Yuqori foyda', 'Tez yetkazib berish']
    },
    faq: [],
    icon: '🍔',
    color: 'from-orange-500 to-red-500',
    relatedPages: ['solutions/pizzeria', 'solutions/fast-food'],
    schemaType: 'Product'
  }
]

// ============================================
// ГЕО СТРАНИЦЫ
// ============================================
export const geoPages: SEOPageData[] = [
  {
    slug: 'geo/uzbekistan',
    category: 'geo',
    title: {
      ru: 'Delever в Узбекистане — система доставки для ресторанов',
      en: 'Delever in Uzbekistan — Restaurant Delivery System',
      uz: 'Delever O\'zbekistonda — restoranlar uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Delever — #1 платформа доставки в Узбекистане. 500+ ресторанов: EVOS, Yaponamama, Les Ailes. Интеграция с Uzum, Payme, Click.',
      en: 'Delever — #1 delivery platform in Uzbekistan. 500+ restaurants: EVOS, Yaponamama, Les Ailes. Integration with Uzum, Payme, Click.',
      uz: 'Delever — O\'zbekistonda #1 yetkazib berish platformasi. 500+ restoran: EVOS, Yaponamama, Les Ailes. Uzum, Payme, Click bilan integratsiya.'
    },
    keywords: {
      ru: 'доставка Узбекистан, ресторан доставка Ташкент, система доставки Узбекистан',
      en: 'delivery Uzbekistan, restaurant delivery Tashkent, delivery system Uzbekistan',
      uz: 'yetkazib berish O\'zbekiston, restoran yetkazib berish Toshkent, yetkazib berish tizimi O\'zbekiston'
    },
    h1: {
      ru: 'Delever в Узбекистане',
      en: 'Delever in Uzbekistan',
      uz: 'Delever O\'zbekistonda'
    },
    intro: {
      ru: 'Delever — ведущая платформа управления доставкой в Узбекистане. Более 500 ресторанов доверяют нам: EVOS, Yaponamama, Maxway, Les Ailes.',
      en: 'Delever is the leading delivery management platform in Uzbekistan. Over 500 restaurants trust us: EVOS, Yaponamama, Maxway, Les Ailes.',
      uz: 'Delever — O\'zbekistondagi yetakchi yetkazib berishni boshqarish platformasi. 500 dan ortiq restoran bizga ishonadi: EVOS, Yaponamama, Maxway, Les Ailes.'
    },
    features: {
      ru: ['Интеграция с Uzum Tezkor', 'Payme, Click оплата', 'Jowi, iiko интеграция', 'Локальная поддержка 24/7'],
      en: ['Uzum Tezkor integration', 'Payme, Click payment', 'Jowi, iiko integration', '24/7 local support'],
      uz: ['Uzum Tezkor integratsiyasi', 'Payme, Click to\'lov', 'Jowi, iiko integratsiyasi', '24/7 mahalliy qo\'llab-quvvatlash']
    },
    benefits: {
      ru: ['#1 платформа в Узбекистане', 'Офис в Ташкенте', 'Поддержка на узбекском'],
      en: ['#1 platform in Uzbekistan', 'Office in Tashkent', 'Support in Uzbek'],
      uz: ['O\'zbekistonda #1 platforma', 'Toshkentda ofis', 'O\'zbek tilida qo\'llab-quvvatlash']
    },
    faq: [],
    icon: '🇺🇿',
    color: 'from-blue-500 to-green-500',
    relatedPages: ['geo/kazakhstan', 'aggregators/uzum-tezkor', 'integrations/jowi'],
    schemaType: 'Organization'
  },
  {
    slug: 'geo/kazakhstan',
    category: 'geo',
    title: {
      ru: 'Delever в Казахстане — система доставки для ресторанов',
      en: 'Delever in Kazakhstan — Restaurant Delivery System',
      uz: 'Delever Qozog\'istonda — restoranlar uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Delever в Казахстане: интеграция с Glovo, Wolt, Яндекс Едой. Оплата через Kaspi. Поддержка на русском и казахском.',
      en: 'Delever in Kazakhstan: integration with Glovo, Wolt, Yandex Eats. Kaspi payment. Support in Russian and Kazakh.',
      uz: 'Delever Qozog\'istonda: Glovo, Wolt, Yandex Eda bilan integratsiya. Kaspi to\'lov. Rus va qozoq tillarida qo\'llab-quvvatlash.'
    },
    keywords: {
      ru: 'доставка Казахстан, ресторан доставка Алматы, система доставки Казахстан',
      en: 'delivery Kazakhstan, restaurant delivery Almaty, delivery system Kazakhstan',
      uz: 'yetkazib berish Qozog\'iston, restoran yetkazib berish Olma-ota'
    },
    h1: {
      ru: 'Delever в Казахстане',
      en: 'Delever in Kazakhstan',
      uz: 'Delever Qozog\'istonda'
    },
    intro: {
      ru: 'Delever работает в Казахстане: Алматы, Астана, Шымкент. Интеграция с локальными агрегаторами и платёжными системами.',
      en: 'Delever operates in Kazakhstan: Almaty, Astana, Shymkent. Integration with local aggregators and payment systems.',
      uz: 'Delever Qozog\'istonda ishlaydi: Olma-ota, Ostona, Shimkent. Mahalliy agregatorlar va to\'lov tizimlari bilan integratsiya.'
    },
    features: {
      ru: ['Kaspi оплата', 'Glovo, Wolt интеграция', 'iiko, R-Keeper поддержка'],
      en: ['Kaspi payment', 'Glovo, Wolt integration', 'iiko, R-Keeper support'],
      uz: ['Kaspi to\'lov', 'Glovo, Wolt integratsiyasi', 'iiko, R-Keeper qo\'llab-quvvatlash']
    },
    benefits: {
      ru: ['Локализация для Казахстана', 'Поддержка на казахском'],
      en: ['Localization for Kazakhstan', 'Support in Kazakh'],
      uz: ['Qozog\'iston uchun lokalizatsiya', 'Qozoq tilida qo\'llab-quvvatlash']
    },
    faq: [],
    icon: '🇰🇿',
    color: 'from-cyan-500 to-blue-500',
    relatedPages: ['geo/uzbekistan', 'aggregators/glovo', 'aggregators/wolt'],
    schemaType: 'Organization'
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ POS ИНТЕГРАЦИИ
// ============================================
export const morePosIntegrations: SEOPageData[] = [
  {
    slug: 'integrations/paloma',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Paloma POS — автоматизация ресторана',
      en: 'Paloma POS Integration — Restaurant Automation',
      uz: 'Paloma POS integratsiyasi — restoran avtomatizatsiyasi'
    },
    description: {
      ru: 'Интеграция Paloma POS с Delever для автоматизации онлайн-заказов. Синхронизация меню, стоп-листы, отчёты.',
      en: 'Paloma POS integration with Delever for online order automation. Menu sync, stop-lists, reports.',
      uz: 'Paloma POS Delever bilan integratsiyasi onlayn buyurtmalarni avtomatlashtirish uchun. Menyu sinxronizatsiyasi, stop-listlar, hisobotlar.'
    },
    keywords: {
      ru: 'Paloma интеграция, Paloma POS, Paloma доставка',
      en: 'Paloma integration, Paloma POS, Paloma delivery',
      uz: 'Paloma integratsiya, Paloma POS'
    },
    h1: {
      ru: 'Интеграция Paloma с Delever',
      en: 'Paloma Integration with Delever',
      uz: 'Paloma Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Paloma — современная POS-система для ресторанов. Delever обеспечивает полную интеграцию для автоматизации доставки.',
      en: 'Paloma is a modern POS system for restaurants. Delever provides full integration for delivery automation.',
      uz: 'Paloma — restoranlar uchun zamonaviy POS tizimi. Delever yetkazib berishni avtomatlashtirish uchun to\'liq integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Синхронизация меню', 'Автопередача заказов', 'Стоп-листы', 'Отчёты'],
      en: ['Menu sync', 'Auto order transfer', 'Stop-lists', 'Reports'],
      uz: ['Menyu sinxronizatsiyasi', 'Avtomatik buyurtma uzatish', 'Stop-listlar', 'Hisobotlar']
    },
    benefits: {
      ru: ['Современный интерфейс', 'Облачная система', 'Быстрая настройка'],
      en: ['Modern interface', 'Cloud system', 'Quick setup'],
      uz: ['Zamonaviy interfeys', 'Bulutli tizim', 'Tez sozlash']
    },
    faq: [],
    icon: '🩷',
    color: 'from-pink-500 to-pink-600',
    relatedPages: ['integrations/iiko', 'integrations/poster'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/clopos',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Clopos — автоматизация доставки',
      en: 'Clopos Integration — Delivery Automation',
      uz: 'Clopos integratsiyasi — yetkazib berish avtomatizatsiyasi'
    },
    description: {
      ru: 'Clopos интеграция с Delever: автоматический приём заказов с сайта и агрегаторов. Синхронизация меню.',
      en: 'Clopos integration with Delever: automatic order intake from website and aggregators. Menu sync.',
      uz: 'Clopos Delever bilan integratsiyasi: sayt va agregatorlardan avtomatik buyurtma qabul qilish. Menyu sinxronizatsiyasi.'
    },
    keywords: {
      ru: 'Clopos интеграция, Clopos POS, Clopos доставка',
      en: 'Clopos integration, Clopos POS',
      uz: 'Clopos integratsiya'
    },
    h1: {
      ru: 'Интеграция Clopos с Delever',
      en: 'Clopos Integration with Delever',
      uz: 'Clopos Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Clopos — POS-система нового поколения. Полная интеграция с Delever для управления доставкой.',
      en: 'Clopos is a next-generation POS system. Full integration with Delever for delivery management.',
      uz: 'Clopos — yangi avlod POS tizimi. Yetkazib berishni boshqarish uchun Delever bilan to\'liq integratsiya.'
    },
    features: {
      ru: ['Облачная система', 'Мобильное приложение', 'Синхронизация меню'],
      en: ['Cloud system', 'Mobile app', 'Menu sync'],
      uz: ['Bulutli tizim', 'Mobil ilova', 'Menyu sinxronizatsiyasi']
    },
    benefits: {
      ru: ['Доступная цена', 'Простой интерфейс'],
      en: ['Affordable price', 'Simple interface'],
      uz: ['Qulay narx', 'Oddiy interfeys']
    },
    faq: [],
    color: 'from-teal-500 to-teal-600',
    relatedPages: ['integrations/poster', 'integrations/jowi'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/loook',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с LOOOK — POS для сетей ресторанов',
      en: 'LOOOK Integration — POS for Restaurant Chains',
      uz: 'LOOOK integratsiyasi — restoran tarmoqlari uchun POS'
    },
    description: {
      ru: 'LOOOK POS интеграция с Delever. Единая система для сети ресторанов. Автоматизация заказов.',
      en: 'LOOOK POS integration with Delever. Unified system for restaurant chains. Order automation.',
      uz: 'LOOOK POS Delever bilan integratsiyasi. Restoran tarmoqlari uchun yagona tizim. Buyurtmalarni avtomatlashtirish.'
    },
    keywords: {
      ru: 'LOOOK интеграция, LOOOK POS, LOOOK сеть ресторанов',
      en: 'LOOOK integration, LOOOK POS',
      uz: 'LOOOK integratsiya'
    },
    h1: {
      ru: 'Интеграция LOOOK с Delever',
      en: 'LOOOK Integration with Delever',
      uz: 'LOOOK Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'LOOOK — специализированная POS-система для сетей ресторанов. Delever обеспечивает централизованную интеграцию.',
      en: 'LOOOK is a specialized POS system for restaurant chains. Delever provides centralized integration.',
      uz: 'LOOOK — restoran tarmoqlari uchun maxsus POS tizimi. Delever markazlashtirilgan integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Мультифилиальность', 'Единое меню', 'Централизованные отчёты'],
      en: ['Multi-location', 'Unified menu', 'Centralized reports'],
      uz: ['Ko\'p filiallilik', 'Yagona menyu', 'Markazlashtirilgan hisobotlar']
    },
    benefits: {
      ru: ['Для крупных сетей', 'Масштабируемость'],
      en: ['For large chains', 'Scalability'],
      uz: ['Yirik tarmoqlar uchun', 'Kengayuvchanlik']
    },
    faq: [],
    color: 'from-amber-500 to-amber-600',
    relatedPages: ['integrations/iiko', 'solutions/food-chain'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/alipos',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с AliPos — автоматизация ресторана',
      en: 'AliPos Integration — Restaurant Automation',
      uz: 'AliPos integratsiyasi — restoran avtomatizatsiyasi'
    },
    description: {
      ru: 'AliPos интеграция с Delever: автоматический приём заказов, синхронизация меню. Популярно в Узбекистане.',
      en: 'AliPos integration with Delever: automatic order intake, menu sync. Popular in Uzbekistan.',
      uz: 'AliPos Delever bilan integratsiyasi: avtomatik buyurtma qabul qilish, menyu sinxronizatsiyasi. O\'zbekistonda mashhur.'
    },
    keywords: {
      ru: 'AliPos интеграция, AliPos POS, AliPos доставка',
      en: 'AliPos integration, AliPos POS',
      uz: 'AliPos integratsiya'
    },
    h1: {
      ru: 'Интеграция AliPos с Delever',
      en: 'AliPos Integration with Delever',
      uz: 'AliPos Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'AliPos — популярная POS-система в Узбекистане. Delever обеспечивает полную интеграцию для автоматизации доставки.',
      en: 'AliPos is a popular POS system in Uzbekistan. Delever provides full integration for delivery automation.',
      uz: 'AliPos — O\'zbekistonda mashhur POS tizimi. Delever yetkazib berishni avtomatlashtirish uchun to\'liq integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Синхронизация меню', 'Автопередача заказов', 'Стоп-листы', 'Локальная поддержка'],
      en: ['Menu sync', 'Auto order transfer', 'Stop-lists', 'Local support'],
      uz: ['Menyu sinxronizatsiyasi', 'Avtomatik buyurtma uzatish', 'Stop-listlar', 'Mahalliy qo\'llab-quvvatlash']
    },
    benefits: {
      ru: ['Популярно в Узбекистане', 'Доступная цена', 'Быстрая настройка'],
      en: ['Popular in Uzbekistan', 'Affordable price', 'Quick setup'],
      uz: ['O\'zbekistonda mashhur', 'Qulay narx', 'Tez sozlash']
    },
    faq: [],
    color: 'from-blue-500 to-blue-600',
    relatedPages: ['integrations/jowi', 'integrations/poster'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/neon-alisa',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция с Neon Alisa POS — автоматизация ресторана',
      en: 'Neon Alisa POS Integration — Restaurant Automation',
      uz: 'Neon Alisa POS integratsiyasi — restoran avtomatizatsiyasi'
    },
    description: {
      ru: 'Neon Alisa POS интеграция с Delever: автоматический приём заказов, синхронизация меню. Популярная POS-система.',
      en: 'Neon Alisa POS integration with Delever: automatic order intake, menu sync. Popular POS system.',
      uz: 'Neon Alisa POS Delever bilan integratsiyasi: avtomatik buyurtma qabul qilish, menyu sinxronizatsiyasi. Mashhur POS tizimi.'
    },
    keywords: {
      ru: 'Neon Alisa интеграция, Neon Alisa POS, Neon Alisa доставка',
      en: 'Neon Alisa integration, Neon Alisa POS, Neon Alisa delivery',
      uz: 'Neon Alisa integratsiya, Neon Alisa POS'
    },
    h1: {
      ru: 'Интеграция Neon Alisa с Delever',
      en: 'Neon Alisa Integration with Delever',
      uz: 'Neon Alisa Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Neon Alisa — POS-система для ресторанов и кафе. Delever обеспечивает полную интеграцию для автоматизации онлайн-заказов.',
      en: 'Neon Alisa is a POS system for restaurants and cafes. Delever provides full integration for online order automation.',
      uz: 'Neon Alisa — restoranlar va kafeler uchun POS tizimi. Delever onlayn buyurtmalarni avtomatlashtirish uchun to\'liq integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Синхронизация меню', 'Автопередача заказов', 'Стоп-листы', 'Отчёты по продажам'],
      en: ['Menu sync', 'Auto order transfer', 'Stop-lists', 'Sales reports'],
      uz: ['Menyu sinxronizatsiyasi', 'Avtomatik buyurtma uzatish', 'Stop-listlar', 'Savdo hisobotlari']
    },
    benefits: {
      ru: ['Современный интерфейс', 'Простая настройка', 'Локальная поддержка'],
      en: ['Modern interface', 'Easy setup', 'Local support'],
      uz: ['Zamonaviy interfeys', 'Oddiy sozlash', 'Mahalliy qo\'llab-quvvatlash']
    },
    faq: [],
    color: 'from-purple-500 to-purple-600',
    relatedPages: ['integrations/iiko', 'integrations/jowi', 'integrations/poster'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/yaros',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция Yaros с Delever — автоматизация доставки',
      en: 'Yaros Integration with Delever — Delivery Automation',
      uz: 'Yaros Delever bilan integratsiyasi — yetkazib berish avtomatizatsiyasi'
    },
    description: {
      ru: 'Подключите Yaros POS к Delever: автоматическая передача заказов, синхронизация меню, стоп-листы. Настройка за 1 день.',
      en: 'Connect Yaros POS to Delever: automatic order transfer, menu sync, stop-lists. Setup in 1 day.',
      uz: 'Yaros POS ni Delever ga ulang: avtomatik buyurtma uzatish, menyu sinxronizatsiyasi, stop-listlar. 1 kunda sozlash.'
    },
    keywords: {
      ru: 'Yaros интеграция, Yaros POS, Yaros доставка',
      en: 'Yaros integration, Yaros POS, Yaros delivery',
      uz: 'Yaros integratsiya, Yaros POS'
    },
    h1: {
      ru: 'Интеграция Yaros с Delever',
      en: 'Yaros Integration with Delever',
      uz: 'Yaros Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Yaros — популярная POS-система в Центральной Азии. Delever обеспечивает бесшовную интеграцию для автоматизации онлайн-заказов.',
      en: 'Yaros is a popular POS system in Central Asia. Delever provides seamless integration for online order automation.',
      uz: 'Yaros — Markaziy Osiyoda mashhur POS tizimi. Delever onlayn buyurtmalarni avtomatlashtirish uchun uzluksiz integratsiyani ta\'minlaydi.'
    },
    features: {
      ru: ['Синхронизация меню', 'Автопередача заказов', 'Стоп-листы', 'Отчёты по продажам'],
      en: ['Menu sync', 'Auto order transfer', 'Stop-lists', 'Sales reports'],
      uz: ['Menyu sinxronizatsiyasi', 'Avtomatik buyurtma uzatish', 'Stop-listlar', 'Savdo hisobotlari']
    },
    benefits: {
      ru: ['Популярен в Узбекистане', 'Быстрая настройка', 'Локальная поддержка'],
      en: ['Popular in Uzbekistan', 'Quick setup', 'Local support'],
      uz: ['O\'zbekistonda mashhur', 'Tez sozlash', 'Mahalliy qo\'llab-quvvatlash']
    },
    faq: [],
    color: 'from-teal-500 to-teal-600',
    relatedPages: ['integrations/iiko', 'integrations/jowi', 'integrations/poster'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/dodo-pizza',
    category: 'integration',
    subcategory: 'pos',
    title: {
      ru: 'Интеграция Dodo IS с Delever — для франшиз Додо Пицца',
      en: 'Dodo IS Integration with Delever — for Dodo Pizza Franchises',
      uz: 'Dodo IS Delever bilan integratsiyasi — Dodo Pizza franchizalari uchun'
    },
    description: {
      ru: 'Подключите Dodo IS к Delever: дополнительные каналы продаж, интеграция с агрегаторами, единое управление заказами.',
      en: 'Connect Dodo IS to Delever: additional sales channels, aggregator integration, unified order management.',
      uz: 'Dodo IS ni Delever ga ulang: qo\'shimcha savdo kanallari, agregatorlar bilan integratsiya, yagona buyurtma boshqaruvi.'
    },
    keywords: {
      ru: 'Dodo IS интеграция, Dodo Pizza система, Додо Пицца доставка',
      en: 'Dodo IS integration, Dodo Pizza system, Dodo Pizza delivery',
      uz: 'Dodo IS integratsiya, Dodo Pizza tizimi'
    },
    h1: {
      ru: 'Интеграция Dodo IS с Delever',
      en: 'Dodo IS Integration with Delever',
      uz: 'Dodo IS Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Dodo IS — проприетарная система Додо Пиццы. Delever позволяет расширить каналы продаж и интегрировать дополнительных агрегаторов.',
      en: 'Dodo IS is Dodo Pizza\'s proprietary system. Delever allows you to expand sales channels and integrate additional aggregators.',
      uz: 'Dodo IS — Dodo Pizza ning o\'z tizimi. Delever savdo kanallarini kengaytirish va qo\'shimcha agregatorlarni integratsiya qilish imkonini beradi.'
    },
    features: {
      ru: ['Дополнительные агрегаторы', 'Telegram-канал продаж', 'Собственный сайт заказов', 'Маркетинговые инструменты'],
      en: ['Additional aggregators', 'Telegram sales channel', 'Own order website', 'Marketing tools'],
      uz: ['Qo\'shimcha agregatorlar', 'Telegram savdo kanali', 'O\'z buyurtma sayti', 'Marketing vositalari']
    },
    benefits: {
      ru: ['Расширение охвата', 'Больше каналов продаж', 'Единое управление'],
      en: ['Extended reach', 'More sales channels', 'Unified management'],
      uz: ['Kengaytirilgan qamrov', 'Ko\'proq savdo kanallari', 'Yagona boshqaruv']
    },
    faq: [],
    logo: '/logos/dodo.png',
    color: 'from-orange-400 to-orange-500',
    relatedPages: ['integrations/iiko', 'solutions/pizzeria'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ АГРЕГАТОРЫ
// ============================================
export const moreAggregators: SEOPageData[] = [
  {
    slug: 'aggregators/chocofood',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция Chocofood с Delever — автоматизация заказов',
      en: 'Chocofood Integration with Delever — Order Automation',
      uz: 'Chocofood Delever bilan integratsiyasi — buyurtmalarni avtomatlashtirish'
    },
    description: {
      ru: 'Подключите Chocofood к Delever: заказы автоматически попадают в вашу систему. Без планшетов, без ручного ввода.',
      en: 'Connect Chocofood to Delever: orders automatically enter your system. No tablets, no manual entry.',
      uz: 'Chocofood ni Delever ga ulang: buyurtmalar avtomatik ravishda tizimingizga tushadi. Planshetlarsiz, qo\'lda kiritishsiz.'
    },
    keywords: {
      ru: 'Chocofood интеграция, Chocofood API, Chocofood для ресторанов Казахстан',
      en: 'Chocofood integration, Chocofood API, Chocofood for Kazakhstan restaurants',
      uz: 'Chocofood integratsiya, Chocofood API'
    },
    h1: {
      ru: 'Интеграция Chocofood с Delever',
      en: 'Chocofood Integration with Delever',
      uz: 'Chocofood Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Chocofood — популярный агрегатор доставки в Казахстане. Интеграция с Delever позволяет автоматически принимать заказы и управлять всеми агрегаторами в одном окне.',
      en: 'Chocofood is a popular delivery aggregator in Kazakhstan. Integration with Delever allows you to automatically accept orders and manage all aggregators in one window.',
      uz: 'Chocofood — Qozog\'istonda mashhur yetkazib berish agregatori. Delever bilan integratsiya buyurtmalarni avtomatik qabul qilish va barcha agregatorlarni bitta oynada boshqarish imkonini beradi.'
    },
    features: {
      ru: ['Автоприём заказов', 'Синхронизация меню', 'Управление стоп-листами', 'Статусы заказов'],
      en: ['Auto order acceptance', 'Menu sync', 'Stop-list management', 'Order statuses'],
      uz: ['Avtomatik buyurtma qabul qilish', 'Menyu sinxronizatsiyasi', 'Stop-listlarni boshqarish', 'Buyurtma holatlari']
    },
    benefits: {
      ru: ['Без планшета Chocofood', 'Все агрегаторы в одном окне', 'Автоматическое обновление статусов'],
      en: ['No Chocofood tablet', 'All aggregators in one window', 'Automatic status updates'],
      uz: ['Chocofood planshetsiz', 'Barcha agregatorlar bitta oynada', 'Avtomatik holat yangilanishi']
    },
    faq: [],
    icon: '🍫',
    color: 'from-amber-500 to-amber-600',
    relatedPages: ['aggregators/glovo', 'aggregators/wolt', 'products/operations'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'aggregators/foody',
    category: 'integration',
    subcategory: 'aggregator',
    title: {
      ru: 'Интеграция Foody с Delever — автоматизация заказов',
      en: 'Foody Integration with Delever — Order Automation',
      uz: 'Foody Delever bilan integratsiyasi — buyurtmalarni avtomatlashtirish'
    },
    description: {
      ru: 'Подключите Foody к Delever: заказы автоматически попадают в вашу систему. Единое окно для всех агрегаторов.',
      en: 'Connect Foody to Delever: orders automatically enter your system. Single window for all aggregators.',
      uz: 'Foody ni Delever ga ulang: buyurtmalar avtomatik ravishda tizimingizga tushadi. Barcha agregatorlar uchun yagona oyna.'
    },
    keywords: {
      ru: 'Foody интеграция, Foody API, Foody для ресторанов',
      en: 'Foody integration, Foody API, Foody for restaurants',
      uz: 'Foody integratsiya, Foody API'
    },
    h1: {
      ru: 'Интеграция Foody с Delever',
      en: 'Foody Integration with Delever',
      uz: 'Foody Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Foody — агрегатор доставки еды. Интеграция с Delever позволяет управлять заказами Foody вместе с другими агрегаторами в одном интерфейсе.',
      en: 'Foody is a food delivery aggregator. Integration with Delever allows you to manage Foody orders along with other aggregators in one interface.',
      uz: 'Foody — ovqat yetkazib berish agregatori. Delever bilan integratsiya Foody buyurtmalarini boshqa agregatorlar bilan birga bitta interfeysda boshqarish imkonini beradi.'
    },
    features: {
      ru: ['Автоприём заказов', 'Единый интерфейс', 'Синхронизация меню', 'Аналитика'],
      en: ['Auto order acceptance', 'Unified interface', 'Menu sync', 'Analytics'],
      uz: ['Avtomatik buyurtma qabul qilish', 'Yagona interfeys', 'Menyu sinxronizatsiyasi', 'Analitika']
    },
    benefits: {
      ru: ['Все заказы в одном месте', 'Автоматизация процессов', 'Меньше ошибок'],
      en: ['All orders in one place', 'Process automation', 'Fewer errors'],
      uz: ['Barcha buyurtmalar bir joyda', 'Jarayonlarni avtomatlashtirish', 'Kamroq xatolar']
    },
    faq: [],
    icon: '🍽️',
    color: 'from-red-500 to-red-600',
    relatedPages: ['aggregators/glovo', 'aggregators/wolt', 'products/operations'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ ПЛАТЁЖНЫЕ СИСТЕМЫ
// ============================================
export const morePayments: SEOPageData[] = [
  {
    slug: 'integrations/uzum-bank',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция Uzum Bank с Delever — онлайн оплата',
      en: 'Uzum Bank Integration with Delever — Online Payment',
      uz: 'Uzum Bank Delever bilan integratsiyasi — onlayn to\'lov'
    },
    description: {
      ru: 'Принимайте оплату через Uzum Bank на сайте и в приложении. Моментальные переводы, низкие комиссии.',
      en: 'Accept Uzum Bank payments on your website and app. Instant transfers, low fees.',
      uz: 'Sayt va ilovada Uzum Bank orqali to\'lov qabul qiling. Tezkor o\'tkazmalar, past komissiyalar.'
    },
    keywords: {
      ru: 'Uzum Bank интеграция, Uzum Bank оплата, Uzum Bank API',
      en: 'Uzum Bank integration, Uzum Bank payment, Uzum Bank API',
      uz: 'Uzum Bank integratsiya, Uzum Bank to\'lov'
    },
    h1: {
      ru: 'Интеграция Uzum Bank с Delever',
      en: 'Uzum Bank Integration with Delever',
      uz: 'Uzum Bank Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Uzum Bank — один из крупнейших банков Узбекистана. Интеграция позволяет принимать оплату картами Uzum напрямую на вашем сайте доставки.',
      en: 'Uzum Bank is one of the largest banks in Uzbekistan. Integration allows you to accept Uzum card payments directly on your delivery website.',
      uz: 'Uzum Bank — O\'zbekistondagi yirik banklardan biri. Integratsiya yetkazib berish saytingizda to\'g\'ridan-to\'g\'ri Uzum kartalaridan to\'lov qabul qilish imkonini beradi.'
    },
    features: {
      ru: ['Оплата картами Uzum', 'Моментальные переводы', 'Отчёты по транзакциям', 'Безопасные платежи'],
      en: ['Uzum card payments', 'Instant transfers', 'Transaction reports', 'Secure payments'],
      uz: ['Uzum kartalaridan to\'lov', 'Tezkor o\'tkazmalar', 'Tranzaksiya hisobotlari', 'Xavfsiz to\'lovlar']
    },
    benefits: {
      ru: ['Популярный банк в Узбекистане', 'Низкие комиссии', 'Быстрое подключение'],
      en: ['Popular bank in Uzbekistan', 'Low fees', 'Quick setup'],
      uz: ['O\'zbekistonda mashhur bank', 'Past komissiyalar', 'Tez ulash']
    },
    faq: [],
    icon: '🏦',
    color: 'from-purple-500 to-purple-600',
    relatedPages: ['integrations/payme', 'integrations/click', 'products/channels'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/kaspi',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция Kaspi с Delever — оплата для Казахстана',
      en: 'Kaspi Integration with Delever — Payment for Kazakhstan',
      uz: 'Kaspi Delever bilan integratsiyasi — Qozog\'iston uchun to\'lov'
    },
    description: {
      ru: 'Принимайте оплату через Kaspi Pay и Kaspi QR в Казахстане. Популярный способ оплаты для ваших клиентов.',
      en: 'Accept Kaspi Pay and Kaspi QR payments in Kazakhstan. Popular payment method for your customers.',
      uz: 'Qozog\'istonda Kaspi Pay va Kaspi QR orqali to\'lov qabul qiling. Mijozlaringiz uchun mashhur to\'lov usuli.'
    },
    keywords: {
      ru: 'Kaspi интеграция, Kaspi Pay, Kaspi QR, оплата Казахстан',
      en: 'Kaspi integration, Kaspi Pay, Kaspi QR, Kazakhstan payment',
      uz: 'Kaspi integratsiya, Kaspi Pay, Kaspi QR'
    },
    h1: {
      ru: 'Интеграция Kaspi с Delever',
      en: 'Kaspi Integration with Delever',
      uz: 'Kaspi Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Kaspi — самый популярный банк в Казахстане. 90% населения используют Kaspi для платежей. Интеграция с Delever даёт вашим клиентам удобный способ оплаты.',
      en: 'Kaspi is the most popular bank in Kazakhstan. 90% of the population uses Kaspi for payments. Integration with Delever gives your customers a convenient payment method.',
      uz: 'Kaspi — Qozog\'istondagi eng mashhur bank. Aholining 90% to\'lovlar uchun Kaspi dan foydalanadi. Delever bilan integratsiya mijozlaringizga qulay to\'lov usulini beradi.'
    },
    features: {
      ru: ['Kaspi Pay', 'Kaspi QR', 'Моментальные переводы', 'Автоматические уведомления'],
      en: ['Kaspi Pay', 'Kaspi QR', 'Instant transfers', 'Automatic notifications'],
      uz: ['Kaspi Pay', 'Kaspi QR', 'Tezkor o\'tkazmalar', 'Avtomatik bildirishnomalar']
    },
    benefits: {
      ru: ['90% охват в Казахстане', 'Удобно для клиентов', 'Быстрые переводы'],
      en: ['90% coverage in Kazakhstan', 'Convenient for customers', 'Fast transfers'],
      uz: ['Qozog\'istonda 90% qamrov', 'Mijozlar uchun qulay', 'Tez o\'tkazmalar']
    },
    faq: [],
    icon: '🔴',
    color: 'from-red-500 to-red-600',
    relatedPages: ['integrations/payme', 'geo/almaty', 'geo/astana'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/epay',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция Epay с Delever — онлайн оплата картами',
      en: 'Epay Integration with Delever — Online Card Payment',
      uz: 'Epay Delever bilan integratsiyasi — onlayn karta to\'lovi'
    },
    description: {
      ru: 'Принимайте оплату международными картами Visa, MasterCard через Epay. Для ресторанов в Казахстане.',
      en: 'Accept Visa, MasterCard international card payments via Epay. For restaurants in Kazakhstan.',
      uz: 'Epay orqali Visa, MasterCard xalqaro kartalaridan to\'lov qabul qiling. Qozog\'istondagi restoranlar uchun.'
    },
    keywords: {
      ru: 'Epay интеграция, Epay Казахстан, оплата картой онлайн',
      en: 'Epay integration, Epay Kazakhstan, online card payment',
      uz: 'Epay integratsiya, Epay Qozog\'iston'
    },
    h1: {
      ru: 'Интеграция Epay с Delever',
      en: 'Epay Integration with Delever',
      uz: 'Epay Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Epay — эквайринговый сервис для приёма карт Visa и MasterCard в Казахстане. Интеграция с Delever позволяет принимать оплату на сайте и в приложении.',
      en: 'Epay is an acquiring service for accepting Visa and MasterCard in Kazakhstan. Integration with Delever allows you to accept payments on website and app.',
      uz: 'Epay — Qozog\'istonda Visa va MasterCard kartalarini qabul qilish uchun ekvayring xizmati. Delever bilan integratsiya sayt va ilovada to\'lov qabul qilish imkonini beradi.'
    },
    features: {
      ru: ['Visa и MasterCard', '3D Secure', 'Отчёты по транзакциям', 'Возвраты'],
      en: ['Visa and MasterCard', '3D Secure', 'Transaction reports', 'Refunds'],
      uz: ['Visa va MasterCard', '3D Secure', 'Tranzaksiya hisobotlari', 'Qaytarishlar']
    },
    benefits: {
      ru: ['Международные карты', 'Безопасные платежи', 'Быстрое подключение'],
      en: ['International cards', 'Secure payments', 'Quick setup'],
      uz: ['Xalqaro kartalar', 'Xavfsiz to\'lovlar', 'Tez ulash']
    },
    faq: [],
    icon: '💳',
    color: 'from-blue-500 to-blue-600',
    relatedPages: ['integrations/kaspi', 'integrations/payme'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/tiptop-pay',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция TipTop Pay с Delever — мультивалютные платежи',
      en: 'TipTop Pay Integration with Delever — Multi-currency Payments',
      uz: 'TipTop Pay Delever bilan integratsiyasi — ko\'p valyutali to\'lovlar'
    },
    description: {
      ru: 'Принимайте платежи в разных валютах через TipTop Pay. Идеально для международных ресторанных сетей.',
      en: 'Accept payments in different currencies via TipTop Pay. Perfect for international restaurant chains.',
      uz: 'TipTop Pay orqali turli valyutalarda to\'lov qabul qiling. Xalqaro restoran tarmoqlari uchun ideal.'
    },
    keywords: {
      ru: 'TipTop Pay интеграция, мультивалютные платежи, международная оплата',
      en: 'TipTop Pay integration, multi-currency payments, international payment',
      uz: 'TipTop Pay integratsiya, ko\'p valyutali to\'lovlar'
    },
    h1: {
      ru: 'Интеграция TipTop Pay с Delever',
      en: 'TipTop Pay Integration with Delever',
      uz: 'TipTop Pay Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'TipTop Pay — мультивалютная платёжная система. Подходит для ресторанов, работающих в нескольких странах или принимающих оплату в разных валютах.',
      en: 'TipTop Pay is a multi-currency payment system. Suitable for restaurants operating in multiple countries or accepting payments in different currencies.',
      uz: 'TipTop Pay — ko\'p valyutali to\'lov tizimi. Bir nechta mamlakatlarda ishlaydigan yoki turli valyutalarda to\'lov qabul qiladigan restoranlar uchun mos.'
    },
    features: {
      ru: ['Мультивалютность', 'Международные карты', 'Apple Pay, Google Pay', 'Отчёты'],
      en: ['Multi-currency', 'International cards', 'Apple Pay, Google Pay', 'Reports'],
      uz: ['Ko\'p valyutalik', 'Xalqaro kartalar', 'Apple Pay, Google Pay', 'Hisobotlar']
    },
    benefits: {
      ru: ['Работа в разных странах', 'Все способы оплаты', 'Единый отчёт'],
      en: ['Work in different countries', 'All payment methods', 'Unified report'],
      uz: ['Turli mamlakatlarda ishlash', 'Barcha to\'lov usullari', 'Yagona hisobot']
    },
    faq: [],
    icon: '🌐',
    color: 'from-green-500 to-green-600',
    relatedPages: ['integrations/payme', 'integrations/click'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/atmos',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция Atmos с Delever — быстрые платежи',
      en: 'Atmos Integration with Delever — Fast Payments',
      uz: 'Atmos Delever bilan integratsiyasi — tez to\'lovlar'
    },
    description: {
      ru: 'Принимайте оплату через Atmos — популярное приложение для переводов в Узбекистане.',
      en: 'Accept payments via Atmos — a popular transfer app in Uzbekistan.',
      uz: 'Atmos orqali to\'lov qabul qiling — O\'zbekistonda mashhur pul o\'tkazish ilovasi.'
    },
    keywords: {
      ru: 'Atmos интеграция, Atmos оплата, Atmos Узбекистан',
      en: 'Atmos integration, Atmos payment, Atmos Uzbekistan',
      uz: 'Atmos integratsiya, Atmos to\'lov'
    },
    h1: {
      ru: 'Интеграция Atmos с Delever',
      en: 'Atmos Integration with Delever',
      uz: 'Atmos Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Atmos — быстрорастущее приложение для переводов в Узбекистане. Интеграция позволяет принимать оплату через Atmos на вашем сайте доставки.',
      en: 'Atmos is a fast-growing transfer app in Uzbekistan. Integration allows you to accept Atmos payments on your delivery website.',
      uz: 'Atmos — O\'zbekistonda tez rivojlanayotgan pul o\'tkazish ilovasi. Integratsiya yetkazib berish saytingizda Atmos to\'lovlarini qabul qilish imkonini beradi.'
    },
    features: {
      ru: ['Быстрые переводы', 'QR-оплата', 'Моментальные уведомления', 'Низкие комиссии'],
      en: ['Fast transfers', 'QR payment', 'Instant notifications', 'Low fees'],
      uz: ['Tez o\'tkazmalar', 'QR-to\'lov', 'Tezkor bildirishnomalar', 'Past komissiyalar']
    },
    benefits: {
      ru: ['Популярно среди молодёжи', 'Быстрые платежи', 'Удобно для клиентов'],
      en: ['Popular among youth', 'Fast payments', 'Convenient for customers'],
      uz: ['Yoshlar orasida mashhur', 'Tez to\'lovlar', 'Mijozlar uchun qulay']
    },
    faq: [],
    icon: '⚡',
    color: 'from-purple-400 to-purple-500',
    relatedPages: ['integrations/payme', 'integrations/click'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'integrations/anorbank',
    category: 'integration',
    subcategory: 'payment',
    title: {
      ru: 'Интеграция Anorbank с Delever — банковские платежи',
      en: 'Anorbank Integration with Delever — Bank Payments',
      uz: 'Anorbank Delever bilan integratsiyasi — bank to\'lovlari'
    },
    description: {
      ru: 'Принимайте оплату через Anorbank — цифровой банк Узбекистана. Карты, переводы, QR-оплата.',
      en: 'Accept payments via Anorbank — a digital bank in Uzbekistan. Cards, transfers, QR payments.',
      uz: 'Anorbank orqali to\'lov qabul qiling — O\'zbekistondagi raqamli bank. Kartalar, o\'tkazmalar, QR-to\'lov.'
    },
    keywords: {
      ru: 'Anorbank интеграция, Anorbank оплата, Anorbank API',
      en: 'Anorbank integration, Anorbank payment, Anorbank API',
      uz: 'Anorbank integratsiya, Anorbank to\'lov'
    },
    h1: {
      ru: 'Интеграция Anorbank с Delever',
      en: 'Anorbank Integration with Delever',
      uz: 'Anorbank Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Anorbank — современный цифровой банк Узбекистана. Интеграция с Delever позволяет принимать платежи картами Anorbank на вашем сайте.',
      en: 'Anorbank is a modern digital bank in Uzbekistan. Integration with Delever allows you to accept Anorbank card payments on your website.',
      uz: 'Anorbank — O\'zbekistondagi zamonaviy raqamli bank. Delever bilan integratsiya saytingizda Anorbank kartalaridan to\'lov qabul qilish imkonini beradi.'
    },
    features: {
      ru: ['Карты Anorbank', 'QR-оплата', 'Мгновенные переводы', 'Отчёты'],
      en: ['Anorbank cards', 'QR payment', 'Instant transfers', 'Reports'],
      uz: ['Anorbank kartalari', 'QR-to\'lov', 'Tezkor o\'tkazmalar', 'Hisobotlar']
    },
    benefits: {
      ru: ['Цифровой банк', 'Быстрое подключение', 'Низкие комиссии'],
      en: ['Digital bank', 'Quick setup', 'Low fees'],
      uz: ['Raqamli bank', 'Tez ulash', 'Past komissiyalar']
    },
    faq: [],
    icon: '🏦',
    color: 'from-green-600 to-green-700',
    relatedPages: ['integrations/payme', 'integrations/uzum-bank'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СЛУЖБЫ ДОСТАВКИ
// ============================================
export const moreDelivery: SEOPageData[] = [
  {
    slug: 'delivery/noor',
    category: 'integration',
    subcategory: 'delivery',
    title: {
      ru: 'Интеграция Noor с Delever — курьерская доставка',
      en: 'Noor Integration with Delever — Courier Delivery',
      uz: 'Noor Delever bilan integratsiyasi — kuryer yetkazib berish'
    },
    description: {
      ru: 'Подключите курьерскую службу Noor к Delever. Автоматическое создание заказов на доставку, отслеживание курьеров.',
      en: 'Connect Noor courier service to Delever. Automatic delivery order creation, courier tracking.',
      uz: 'Noor kuryer xizmatini Delever ga ulang. Avtomatik yetkazib berish buyurtmalarini yaratish, kuryerlarni kuzatish.'
    },
    keywords: {
      ru: 'Noor доставка, Noor курьеры, Noor интеграция',
      en: 'Noor delivery, Noor couriers, Noor integration',
      uz: 'Noor yetkazib berish, Noor kuryerlar, Noor integratsiya'
    },
    h1: {
      ru: 'Интеграция Noor с Delever',
      en: 'Noor Integration with Delever',
      uz: 'Noor Delever bilan integratsiyasi'
    },
    intro: {
      ru: 'Noor — курьерская служба в Узбекистане. Интеграция с Delever позволяет автоматически создавать заявки на доставку и отслеживать курьеров в реальном времени.',
      en: 'Noor is a courier service in Uzbekistan. Integration with Delever allows you to automatically create delivery requests and track couriers in real-time.',
      uz: 'Noor — O\'zbekistondagi kuryer xizmati. Delever bilan integratsiya avtomatik ravishda yetkazib berish so\'rovlarini yaratish va kuryerlarni real vaqtda kuzatish imkonini beradi.'
    },
    features: {
      ru: ['Автосоздание заказов', 'Отслеживание в реальном времени', 'Уведомления клиентам', 'История доставок'],
      en: ['Auto order creation', 'Real-time tracking', 'Customer notifications', 'Delivery history'],
      uz: ['Avtomatik buyurtma yaratish', 'Real vaqtda kuzatish', 'Mijozlarga bildirishnomalar', 'Yetkazib berish tarixi']
    },
    benefits: {
      ru: ['Не нужны свои курьеры', 'Оплата за доставку', 'Гибкий график'],
      en: ['No need for own couriers', 'Pay per delivery', 'Flexible schedule'],
      uz: ['O\'z kuryerlar kerak emas', 'Har bir yetkazib berish uchun to\'lov', 'Moslashuvchan jadval']
    },
    faq: [],
    logo: '/logos/Noor.jpg',
    color: 'from-blue-500 to-blue-600',
    relatedPages: ['delivery/yandex-delivery', 'delivery/wolt-drive', 'delivery/millennium'],
    schemaType: 'SoftwareApplication'
  }
]

// ============================================
// СТРАНИЦЫ СРАВНЕНИЯ
// ============================================
export const comparisonPages: SEOPageData[] = [
  {
    slug: 'compare/delever-vs-pos',
    category: 'comparison',
    title: {
      ru: 'Delever и POS-системы — в чём разница?',
      en: 'Delever and POS Systems — What\'s the Difference?',
      uz: 'Delever va POS tizimlar — farqi nimada?'
    },
    description: {
      ru: 'Delever — это не конкурент iiko или R-Keeper. Это платформа поверх POS, которая добавляет онлайн-каналы продаж: сайт, Telegram, агрегаторы.',
      en: 'Delever is not a competitor to iiko or R-Keeper. It\'s a platform on top of POS that adds online sales channels: website, Telegram, aggregators.',
      uz: 'Delever iiko yoki R-Keeper ga raqobatchi emas. Bu POS ustiga platforma bo\'lib, onlayn savdo kanallarini qo\'shadi: sayt, Telegram, agregatorlar.'
    },
    keywords: {
      ru: 'Delever vs iiko, Delever vs R-Keeper, разница POS и Delever, что выбрать iiko или Delever',
      en: 'Delever vs iiko, Delever vs R-Keeper, difference POS and Delever',
      uz: 'Delever vs iiko, Delever vs R-Keeper, POS va Delever farqi'
    },
    h1: {
      ru: 'Delever и POS-системы: не конкуренты, а партнёры',
      en: 'Delever and POS Systems: Not Competitors, But Partners',
      uz: 'Delever va POS tizimlar: raqobatchilar emas, hamkorlar'
    },
    intro: {
      ru: 'Часто спрашивают: "Зачем Delever, если есть iiko?" Ответ: это разные инструменты для разных задач. iiko — учётная система (склад, касса, отчёты). Delever — платформа онлайн-продаж (сайт, Telegram, агрегаторы). Они работают вместе.',
      en: 'Often asked: "Why Delever if there\'s iiko?" Answer: these are different tools for different tasks. iiko is an accounting system (inventory, POS, reports). Delever is an online sales platform (website, Telegram, aggregators). They work together.',
      uz: 'Ko\'p so\'rashadi: "Agar iiko bo\'lsa, nega Delever kerak?" Javob: bu turli vazifalar uchun turli vositalar. iiko — hisobchilik tizimi (ombor, kassa, hisobotlar). Delever — onlayn savdo platformasi (sayt, Telegram, agregatorlar). Ular birgalikda ishlaydi.'
    },
    features: {
      ru: [
        'POS (iiko, R-Keeper): учёт, склад, касса, фискализация',
        'Delever: сайт, Telegram-бот, мобильное приложение',
        'Delever: интеграция с агрегаторами (Glovo, Wolt, Uzum)',
        'Delever: курьерское приложение и отслеживание',
        'Delever: маркетинг и CRM для доставки',
        'Вместе: POS получает заказы из всех каналов автоматически'
      ],
      en: [
        'POS (iiko, R-Keeper): accounting, inventory, cashier, fiscalization',
        'Delever: website, Telegram bot, mobile app',
        'Delever: aggregator integration (Glovo, Wolt, Uzum)',
        'Delever: courier app and tracking',
        'Delever: marketing and CRM for delivery',
        'Together: POS receives orders from all channels automatically'
      ],
      uz: [
        'POS (iiko, R-Keeper): hisobchilik, ombor, kassa, fiskalizatsiya',
        'Delever: sayt, Telegram-bot, mobil ilova',
        'Delever: agregatorlar bilan integratsiya (Glovo, Wolt, Uzum)',
        'Delever: kuryer ilovasi va kuzatuv',
        'Delever: yetkazib berish uchun marketing va CRM',
        'Birgalikda: POS barcha kanallardan buyurtmalarni avtomatik qabul qiladi'
      ]
    },
    benefits: {
      ru: [
        'Не нужно выбирать — используйте оба',
        'POS для учёта, Delever для продаж',
        '500+ ресторанов используют связку iiko + Delever',
        'Автоматическая передача заказов в кассу'
      ],
      en: [
        'No need to choose — use both',
        'POS for accounting, Delever for sales',
        '500+ restaurants use iiko + Delever bundle',
        'Automatic order transfer to POS'
      ],
      uz: [
        'Tanlash kerak emas — ikkalasini ishlating',
        'POS hisobchilik uchun, Delever sotuvlar uchun',
        '500+ restoran iiko + Delever to\'plamidan foydalanadi',
        'Buyurtmalarni kassaga avtomatik uzatish'
      ]
    },
    faq: [
      {
        question: {
          ru: 'Можно ли использовать Delever без POS-системы?',
          en: 'Can I use Delever without a POS system?',
          uz: 'Delever ni POS tizimsiz ishlatish mumkinmi?'
        },
        answer: {
          ru: 'Да! Delever работает и без POS — заказы будут приходить в админ-панель и Telegram. Но с интеграцией удобнее: заказы сразу в кассе.',
          en: 'Yes! Delever works without POS — orders will come to admin panel and Telegram. But integration is more convenient: orders directly in POS.',
          uz: 'Ha! Delever POS siz ham ishlaydi — buyurtmalar admin-panel va Telegram ga keladi. Lekin integratsiya bilan qulayroq: buyurtmalar to\'g\'ridan-to\'g\'ri kassada.'
        }
      },
      {
        question: {
          ru: 'Delever заменяет iiko?',
          en: 'Does Delever replace iiko?',
          uz: 'Delever iiko ni almashtiradimi?'
        },
        answer: {
          ru: 'Нет. Delever не заменяет iiko, а дополняет. iiko — это касса и учёт. Delever — это онлайн-каналы продаж. Вместе они дают полную автоматизацию.',
          en: 'No. Delever doesn\'t replace iiko, it complements it. iiko is POS and accounting. Delever is online sales channels. Together they provide full automation.',
          uz: 'Yo\'q. Delever iiko ni almashtirmaydi, to\'ldiradi. iiko — bu kassa va hisobchilik. Delever — bu onlayn savdo kanallari. Birgalikda ular to\'liq avtomatlashtirishni ta\'minlaydi.'
        }
      }
    ],
    icon: '⚡',
    color: 'from-brand-blue to-brand-darkBlue',
    relatedPages: ['integrations/iiko', 'integrations/rkeeper', 'products/channels'],
    schemaType: 'FAQPage'
  },
  {
    slug: 'compare/own-delivery-vs-aggregators',
    category: 'comparison',
    title: {
      ru: 'Своя доставка vs агрегаторы — что выгоднее?',
      en: 'Own Delivery vs Aggregators — What\'s More Profitable?',
      uz: 'O\'z yetkazib berish vs agregatorlar — nimasi foydali?'
    },
    description: {
      ru: 'Сравнение своих каналов продаж (сайт, Telegram) с агрегаторами (Glovo, Wolt). Комиссии, контроль клиентов, маржинальность.',
      en: 'Comparison of own sales channels (website, Telegram) with aggregators (Glovo, Wolt). Commissions, customer control, margins.',
      uz: 'O\'z savdo kanallari (sayt, Telegram) ni agregatorlar (Glovo, Wolt) bilan solishtirish. Komissiyalar, mijozlarni nazorat qilish, foyda.'
    },
    keywords: {
      ru: 'своя доставка vs Glovo, комиссия агрегаторов, свой сайт доставки, выгода своей доставки',
      en: 'own delivery vs Glovo, aggregator commission, own delivery website',
      uz: 'o\'z yetkazib berish vs Glovo, agregator komissiyasi, o\'z yetkazib berish sayti'
    },
    h1: {
      ru: 'Своя доставка vs агрегаторы',
      en: 'Own Delivery vs Aggregators',
      uz: 'O\'z yetkazib berish vs agregatorlar'
    },
    intro: {
      ru: 'Агрегаторы (Glovo, Wolt, Uzum) берут 15-35% комиссию. Свой сайт и Telegram-бот — 0% комиссии. Но агрегаторы дают трафик. Оптимально: использовать оба канала и переводить клиентов на свои.',
      en: 'Aggregators (Glovo, Wolt, Uzum) charge 15-35% commission. Own website and Telegram bot — 0% commission. But aggregators provide traffic. Optimal: use both channels and convert customers to your own.',
      uz: 'Agregatorlar (Glovo, Wolt, Uzum) 15-35% komissiya oladi. O\'z sayt va Telegram-bot — 0% komissiya. Lekin agregatorlar trafik beradi. Optimal: ikkala kanalni ishlating va mijozlarni o\'zingiznikiga o\'tkazing.'
    },
    features: {
      ru: [
        'Агрегаторы: 15-35% комиссия с каждого заказа',
        'Свои каналы: 0% комиссия, только подписка Delever',
        'Агрегаторы: дают новых клиентов',
        'Свои каналы: клиент ваш навсегда',
        'Свои каналы: программа лояльности, акции',
        'Рекомендация: используйте оба, переводите на свои'
      ],
      en: [
        'Aggregators: 15-35% commission per order',
        'Own channels: 0% commission, only Delever subscription',
        'Aggregators: bring new customers',
        'Own channels: customer is yours forever',
        'Own channels: loyalty program, promotions',
        'Recommendation: use both, convert to your own'
      ],
      uz: [
        'Agregatorlar: har bir buyurtmadan 15-35% komissiya',
        'O\'z kanallar: 0% komissiya, faqat Delever obunasi',
        'Agregatorlar: yangi mijozlarni keltiradi',
        'O\'z kanallar: mijoz sizniki abadiy',
        'O\'z kanallar: sodiqlik dasturi, aksiyalar',
        'Tavsiya: ikkalasini ishlating, o\'zingiznikiga o\'tkazing'
      ]
    },
    benefits: {
      ru: [
        'Экономия до 30% на комиссиях',
        'Контроль базы клиентов',
        'Прямой маркетинг (push, SMS)',
        'Выше маржа на своих каналах'
      ],
      en: [
        'Save up to 30% on commissions',
        'Control customer database',
        'Direct marketing (push, SMS)',
        'Higher margin on own channels'
      ],
      uz: [
        'Komissiyalarda 30% gacha tejash',
        'Mijozlar bazasini nazorat qilish',
        'To\'g\'ridan-to\'g\'ri marketing (push, SMS)',
        'O\'z kanallarda yuqori foyda'
      ]
    },
    faq: [],
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    relatedPages: ['aggregators/glovo', 'products/channels', 'products/marketing'],
    schemaType: 'FAQPage'
  }
]

// ============================================
// ГОРОДА
// ============================================
export const cityPages: SEOPageData[] = [
  {
    slug: 'geo/tashkent',
    category: 'geo',
    title: {
      ru: 'Delever в Ташкенте — система доставки для ресторанов',
      en: 'Delever in Tashkent — Restaurant Delivery System',
      uz: 'Delever Toshkentda — restoranlar uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Delever — #1 платформа доставки в Ташкенте. 300+ ресторанов: EVOS, Yaponamama, Maxway, Bellissimo. Интеграция с Uzum, Payme.',
      en: 'Delever — #1 delivery platform in Tashkent. 300+ restaurants: EVOS, Yaponamama, Maxway, Bellissimo. Integration with Uzum, Payme.',
      uz: 'Delever — Toshkentda #1 yetkazib berish platformasi. 300+ restoran: EVOS, Yaponamama, Maxway, Bellissimo. Uzum, Payme bilan integratsiya.'
    },
    keywords: {
      ru: 'доставка Ташкент, ресторан доставка Ташкент, система доставки Ташкент, Delever Ташкент',
      en: 'delivery Tashkent, restaurant delivery Tashkent, delivery system Tashkent',
      uz: 'yetkazib berish Toshkent, restoran yetkazib berish Toshkent'
    },
    h1: {
      ru: 'Delever в Ташкенте',
      en: 'Delever in Tashkent',
      uz: 'Delever Toshkentda'
    },
    intro: {
      ru: 'Ташкент — столица Узбекистана и крупнейший рынок доставки в регионе. Более 300 ресторанов Ташкента используют Delever.',
      en: 'Tashkent is the capital of Uzbekistan and the largest delivery market in the region. Over 300 Tashkent restaurants use Delever.',
      uz: 'Toshkent — O\'zbekiston poytaxti va mintaqadagi eng yirik yetkazib berish bozori. 300 dan ortiq Toshkent restorani Delever dan foydalanadi.'
    },
    features: {
      ru: ['300+ ресторанов', 'Все агрегаторы', 'Локальная поддержка', 'Офис в Ташкенте'],
      en: ['300+ restaurants', 'All aggregators', 'Local support', 'Office in Tashkent'],
      uz: ['300+ restoran', 'Barcha agregatorlar', 'Mahalliy qo\'llab-quvvatlash', 'Toshkentda ofis']
    },
    benefits: {
      ru: ['#1 в Ташкенте', 'Быстрая поддержка', 'Знание локального рынка'],
      en: ['#1 in Tashkent', 'Fast support', 'Local market knowledge'],
      uz: ['Toshkentda #1', 'Tez qo\'llab-quvvatlash', 'Mahalliy bozorni bilish']
    },
    faq: [
      {
        question: {
          ru: 'Сколько ресторанов в Ташкенте используют Delever?',
          en: 'How many restaurants in Tashkent use Delever?',
          uz: 'Toshkentda nechta restoran Delever dan foydalanadi?'
        },
        answer: {
          ru: 'Более 300 ресторанов Ташкента используют Delever, включая крупнейшие сети: EVOS, Yaponamama, Maxway, Bellissimo, Oqtepa Lavash.',
          en: 'Over 300 Tashkent restaurants use Delever, including major chains: EVOS, Yaponamama, Maxway, Bellissimo, Oqtepa Lavash.',
          uz: '300 dan ortiq Toshkent restorani Delever dan foydalanadi, shu jumladan yirik tarmoqlar: EVOS, Yaponamama, Maxway, Bellissimo, Oqtepa Lavash.'
        }
      }
    ],
    icon: '🏙️',
    color: 'from-blue-500 to-cyan-500',
    relatedPages: ['geo/uzbekistan', 'geo/samarkand', 'aggregators/uzum-tezkor'],
    schemaType: 'Organization'
  },
  {
    slug: 'geo/samarkand',
    category: 'geo',
    title: {
      ru: 'Delever в Самарканде — доставка для ресторанов',
      en: 'Delever in Samarkand — Restaurant Delivery',
      uz: 'Delever Samarqandda — restoranlar uchun yetkazib berish'
    },
    description: {
      ru: 'Delever в Самарканде: система доставки для ресторанов. Интеграция с POS, агрегаторами, платежами.',
      en: 'Delever in Samarkand: delivery system for restaurants. Integration with POS, aggregators, payments.',
      uz: 'Delever Samarqandda: restoranlar uchun yetkazib berish tizimi. POS, agregatorlar, to\'lovlar bilan integratsiya.'
    },
    keywords: {
      ru: 'доставка Самарканд, ресторан Самарканд, Delever Самарканд',
      en: 'delivery Samarkand, restaurant Samarkand',
      uz: 'yetkazib berish Samarqand, restoran Samarqand'
    },
    h1: {
      ru: 'Delever в Самарканде',
      en: 'Delever in Samarkand',
      uz: 'Delever Samarqandda'
    },
    intro: {
      ru: 'Самарканд — второй по величине город Узбекистана. Delever помогает ресторанам Самарканда запустить доставку.',
      en: 'Samarkand is the second largest city in Uzbekistan. Delever helps Samarkand restaurants launch delivery.',
      uz: 'Samarqand — O\'zbekistonning ikkinchi eng katta shahri. Delever Samarqand restoranlariga yetkazib berishni ishga tushirishga yordam beradi.'
    },
    features: {
      ru: ['Работаем в Самарканде', 'Локальные агрегаторы', 'Интеграция с POS'],
      en: ['Working in Samarkand', 'Local aggregators', 'POS integration'],
      uz: ['Samarqandda ishlaymiz', 'Mahalliy agregatorlar', 'POS integratsiyasi']
    },
    benefits: {
      ru: ['Растущий рынок', 'Меньше конкуренции'],
      en: ['Growing market', 'Less competition'],
      uz: ['O\'sib borayotgan bozor', 'Kamroq raqobat']
    },
    faq: [],
    icon: '🕌',
    color: 'from-amber-500 to-orange-500',
    relatedPages: ['geo/uzbekistan', 'geo/tashkent', 'geo/bukhara'],
    schemaType: 'Organization'
  },
  {
    slug: 'geo/bukhara',
    category: 'geo',
    title: {
      ru: 'Delever в Бухаре — доставка для ресторанов',
      en: 'Delever in Bukhara — Restaurant Delivery',
      uz: 'Delever Buxoroda — restoranlar uchun yetkazib berish'
    },
    description: {
      ru: 'Delever в Бухаре: запустите доставку для вашего ресторана. Интеграция с POS, онлайн-оплата.',
      en: 'Delever in Bukhara: launch delivery for your restaurant. POS integration, online payment.',
      uz: 'Delever Buxoroda: restoraningiz uchun yetkazib berishni ishga tushiring. POS integratsiyasi, onlayn to\'lov.'
    },
    keywords: {
      ru: 'доставка Бухара, ресторан Бухара, Delever Бухара',
      en: 'delivery Bukhara, restaurant Bukhara',
      uz: 'yetkazib berish Buxoro, restoran Buxoro'
    },
    h1: {
      ru: 'Delever в Бухаре',
      en: 'Delever in Bukhara',
      uz: 'Delever Buxoroda'
    },
    intro: {
      ru: 'Бухара — исторический город с растущим рынком доставки. Delever помогает местным ресторанам выйти онлайн.',
      en: 'Bukhara is a historic city with a growing delivery market. Delever helps local restaurants go online.',
      uz: 'Buxoro — yetkazib berish bozori o\'sib borayotgan tarixiy shahar. Delever mahalliy restoranlarga onlaynga chiqishga yordam beradi.'
    },
    features: {
      ru: ['Работаем в Бухаре', 'Интеграция с Jowi', 'Онлайн-оплата'],
      en: ['Working in Bukhara', 'Jowi integration', 'Online payment'],
      uz: ['Buxoroda ishlaymiz', 'Jowi integratsiyasi', 'Onlayn to\'lov']
    },
    benefits: {
      ru: ['Туристический город', 'Растущий спрос'],
      en: ['Tourist city', 'Growing demand'],
      uz: ['Turistik shahar', 'O\'sib borayotgan talab']
    },
    faq: [],
    icon: '🏛️',
    color: 'from-yellow-500 to-amber-500',
    relatedPages: ['geo/uzbekistan', 'geo/samarkand'],
    schemaType: 'Organization'
  },
  {
    slug: 'geo/almaty',
    category: 'geo',
    title: {
      ru: 'Delever в Алматы — система доставки для ресторанов',
      en: 'Delever in Almaty — Restaurant Delivery System',
      uz: 'Delever Olma-otada — restoranlar uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Delever в Алматы: интеграция с Glovo, Wolt, Kaspi. Автоматизация доставки для ресторанов Алматы.',
      en: 'Delever in Almaty: integration with Glovo, Wolt, Kaspi. Delivery automation for Almaty restaurants.',
      uz: 'Delever Olma-otada: Glovo, Wolt, Kaspi bilan integratsiya. Olma-ota restoranlar uchun yetkazib berishni avtomatlashtirish.'
    },
    keywords: {
      ru: 'доставка Алматы, ресторан доставка Алматы, Delever Алматы, Glovo Алматы',
      en: 'delivery Almaty, restaurant delivery Almaty, Delever Almaty',
      uz: 'yetkazib berish Olma-ota'
    },
    h1: {
      ru: 'Delever в Алматы',
      en: 'Delever in Almaty',
      uz: 'Delever Olma-otada'
    },
    intro: {
      ru: 'Алматы — крупнейший город Казахстана и главный рынок доставки. Delever работает со всеми агрегаторами Алматы.',
      en: 'Almaty is the largest city in Kazakhstan and the main delivery market. Delever works with all Almaty aggregators.',
      uz: 'Olma-ota — Qozog\'istonning eng katta shahri va asosiy yetkazib berish bozori. Delever barcha Olma-ota agregatorlari bilan ishlaydi.'
    },
    features: {
      ru: ['Glovo, Wolt интеграция', 'Kaspi оплата', 'iiko, R-Keeper'],
      en: ['Glovo, Wolt integration', 'Kaspi payment', 'iiko, R-Keeper'],
      uz: ['Glovo, Wolt integratsiyasi', 'Kaspi to\'lov', 'iiko, R-Keeper']
    },
    benefits: {
      ru: ['Крупнейший рынок КЗ', 'Все агрегаторы'],
      en: ['Largest KZ market', 'All aggregators'],
      uz: ['Eng katta QZ bozori', 'Barcha agregatorlar']
    },
    faq: [],
    icon: '🏔️',
    color: 'from-cyan-500 to-blue-500',
    relatedPages: ['geo/kazakhstan', 'geo/astana', 'aggregators/glovo'],
    schemaType: 'Organization'
  },
  {
    slug: 'geo/astana',
    category: 'geo',
    title: {
      ru: 'Delever в Астане — система доставки для ресторанов',
      en: 'Delever in Astana — Restaurant Delivery System',
      uz: 'Delever Ostonada — restoranlar uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Delever в Астане: интеграция с Glovo, Wolt, Kaspi. Автоматизация доставки для ресторанов столицы.',
      en: 'Delever in Astana: integration with Glovo, Wolt, Kaspi. Delivery automation for capital restaurants.',
      uz: 'Delever Ostonada: Glovo, Wolt, Kaspi bilan integratsiya. Poytaxt restoranlar uchun yetkazib berishni avtomatlashtirish.'
    },
    keywords: {
      ru: 'доставка Астана, ресторан доставка Астана, Delever Астана',
      en: 'delivery Astana, restaurant delivery Astana',
      uz: 'yetkazib berish Ostona'
    },
    h1: {
      ru: 'Delever в Астане',
      en: 'Delever in Astana',
      uz: 'Delever Ostonada'
    },
    intro: {
      ru: 'Астана — столица Казахстана с быстрорастущим рынком доставки. Delever помогает ресторанам Астаны автоматизировать процессы.',
      en: 'Astana is the capital of Kazakhstan with a fast-growing delivery market. Delever helps Astana restaurants automate processes.',
      uz: 'Ostona — tez rivojlanayotgan yetkazib berish bozoriga ega Qozog\'iston poytaxti. Delever Ostona restoranlariga jarayonlarni avtomatlashtirishga yordam beradi.'
    },
    features: {
      ru: ['Glovo, Wolt', 'Kaspi Pay', 'Поддержка 24/7'],
      en: ['Glovo, Wolt', 'Kaspi Pay', '24/7 support'],
      uz: ['Glovo, Wolt', 'Kaspi Pay', '24/7 qo\'llab-quvvatlash']
    },
    benefits: {
      ru: ['Столица КЗ', 'Высокий средний чек'],
      en: ['KZ capital', 'High average check'],
      uz: ['QZ poytaxti', 'Yuqori o\'rtacha chek']
    },
    faq: [],
    icon: '🏛️',
    color: 'from-blue-500 to-indigo-500',
    relatedPages: ['geo/kazakhstan', 'geo/almaty'],
    schemaType: 'Organization'
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ РЕШЕНИЯ
// ============================================
export const moreSolutions: SEOPageData[] = [
  {
    slug: 'solutions/confectionery',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для кондитерской — онлайн-заказы тортов',
      en: 'Delivery System for Confectionery — Online Cake Orders',
      uz: 'Qandolatchilik uchun yetkazib berish tizimi — onlayn tort buyurtmalari'
    },
    description: {
      ru: 'Решение для кондитерской: сайт с каталогом тортов, предзаказ, Telegram-бот. Интеграция с POS.',
      en: 'Confectionery solution: website with cake catalog, pre-order, Telegram bot. POS integration.',
      uz: 'Qandolatchilik uchun yechim: tortlar katalogi bilan sayt, oldindan buyurtma, Telegram-bot. POS integratsiyasi.'
    },
    keywords: {
      ru: 'доставка тортов, кондитерская онлайн, заказ торта онлайн',
      en: 'cake delivery, confectionery online, order cake online',
      uz: 'tort yetkazib berish, qandolatchilik onlayn'
    },
    h1: {
      ru: 'Система доставки для кондитерской',
      en: 'Delivery System for Confectionery',
      uz: 'Qandolatchilik uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Кондитерские требуют особого подхода: предзаказ, выбор размера, надписи на торте. Delever поддерживает все эти функции.',
      en: 'Confectioneries require a special approach: pre-order, size selection, cake inscriptions. Delever supports all these features.',
      uz: 'Qandolatchiliklar alohida yondashuvni talab qiladi: oldindan buyurtma, o\'lcham tanlash, tortdagi yozuvlar. Delever bu barcha funksiyalarni qo\'llab-quvvatlaydi.'
    },
    features: {
      ru: ['Каталог тортов', 'Предзаказ на дату', 'Конструктор торта', 'Надписи'],
      en: ['Cake catalog', 'Pre-order for date', 'Cake constructor', 'Inscriptions'],
      uz: ['Tortlar katalogi', 'Sanaga oldindan buyurtma', 'Tort konstruktori', 'Yozuvlar']
    },
    benefits: {
      ru: ['Высокий средний чек', 'Предоплата'],
      en: ['High average check', 'Prepayment'],
      uz: ['Yuqori o\'rtacha chek', 'Oldindan to\'lov']
    },
    faq: [],
    icon: '🎂',
    color: 'from-pink-500 to-rose-500',
    relatedPages: ['solutions/cafe', 'dessert'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/coffee-shop',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для кофейни — онлайн-заказы кофе',
      en: 'Delivery System for Coffee Shop — Online Coffee Orders',
      uz: 'Qahvaxona uchun yetkazib berish tizimi — onlayn qahva buyurtmalari'
    },
    description: {
      ru: 'Решение для кофейни: сайт, Telegram-бот, QR-меню. Программа лояльности, предзаказ.',
      en: 'Coffee shop solution: website, Telegram bot, QR menu. Loyalty program, pre-order.',
      uz: 'Qahvaxona uchun yechim: sayt, Telegram-bot, QR-menyu. Sodiqlik dasturi, oldindan buyurtma.'
    },
    keywords: {
      ru: 'доставка кофе, кофейня онлайн заказ, кофе на вынос',
      en: 'coffee delivery, coffee shop online order, takeaway coffee',
      uz: 'qahva yetkazib berish, qahvaxona onlayn buyurtma'
    },
    h1: {
      ru: 'Система доставки для кофейни',
      en: 'Delivery System for Coffee Shop',
      uz: 'Qahvaxona uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Кофейни активно осваивают доставку и самовывоз. Delever предлагает QR-меню, предзаказ и программу лояльности.',
      en: 'Coffee shops are actively adopting delivery and takeaway. Delever offers QR menu, pre-order, and loyalty program.',
      uz: 'Qahvaxonalar yetkazib berish va olib ketishni faol o\'zlashtiryapti. Delever QR-menyu, oldindan buyurtma va sodiqlik dasturini taklif etadi.'
    },
    features: {
      ru: ['QR-меню', 'Предзаказ', 'Программа лояльности', 'Быстрый checkout'],
      en: ['QR menu', 'Pre-order', 'Loyalty program', 'Quick checkout'],
      uz: ['QR-menyu', 'Oldindan buyurtma', 'Sodiqlik dasturi', 'Tez checkout']
    },
    benefits: {
      ru: ['Быстрые заказы', 'Повторные покупки'],
      en: ['Quick orders', 'Repeat purchases'],
      uz: ['Tez buyurtmalar', 'Takroriy xaridlar']
    },
    faq: [],
    icon: '☕',
    color: 'from-amber-600 to-amber-700',
    relatedPages: ['solutions/cafe', 'solutions/confectionery'],
    schemaType: 'Product'
  },
  {
    slug: 'solutions/grocery',
    category: 'solution',
    subcategory: 'business-type',
    title: {
      ru: 'Система доставки для продуктового магазина',
      en: 'Delivery System for Grocery Store',
      uz: 'Oziq-ovqat do\'koni uchun yetkazib berish tizimi'
    },
    description: {
      ru: 'Решение для продуктового магазина: сайт с каталогом, Telegram-бот, курьерское приложение.',
      en: 'Grocery store solution: website with catalog, Telegram bot, courier app.',
      uz: 'Oziq-ovqat do\'koni uchun yechim: katalog bilan sayt, Telegram-bot, kuryer ilovasi.'
    },
    keywords: {
      ru: 'доставка продуктов, продуктовый магазин доставка, grocery delivery',
      en: 'grocery delivery, food delivery, supermarket delivery',
      uz: 'oziq-ovqat yetkazib berish, do\'kon yetkazib berish'
    },
    h1: {
      ru: 'Система доставки для продуктового магазина',
      en: 'Delivery System for Grocery Store',
      uz: 'Oziq-ovqat do\'koni uchun yetkazib berish tizimi'
    },
    intro: {
      ru: 'Продуктовые магазины всё чаще запускают доставку. Delever поддерживает большие каталоги, весовой товар, слоты доставки.',
      en: 'Grocery stores are increasingly launching delivery. Delever supports large catalogs, weighted products, delivery slots.',
      uz: 'Oziq-ovqat do\'konlari tobora ko\'proq yetkazib berishni ishga tushirmoqda. Delever katta kataloglar, tortilgan mahsulotlar, yetkazib berish slotlarini qo\'llab-quvvatlaydi.'
    },
    features: {
      ru: ['Большой каталог', 'Весовой товар', 'Слоты доставки', 'Минимальный заказ'],
      en: ['Large catalog', 'Weighted products', 'Delivery slots', 'Minimum order'],
      uz: ['Katta katalog', 'Tortilgan mahsulotlar', 'Yetkazib berish slotlari', 'Minimal buyurtma']
    },
    benefits: {
      ru: ['Высокая частота заказов', 'Большие корзины'],
      en: ['High order frequency', 'Large baskets'],
      uz: ['Yuqori buyurtma chastotasi', 'Katta savatlar']
    },
    faq: [],
    icon: '🛒',
    color: 'from-green-500 to-emerald-500',
    relatedPages: ['delivery/yandex-delivery', 'solutions/dark-kitchen'],
    schemaType: 'Product'
  }
]

// ============================================
// ЭКСПОРТ ВСЕХ СТРАНИЦ
// ============================================
export const allSEOPages: SEOPageData[] = [
  ...posIntegrations,
  ...morePosIntegrations,
  ...aggregatorIntegrations,
  ...moreAggregators,
  ...paymentIntegrations,
  ...morePayments,
  ...deliveryIntegrations,
  ...moreDelivery,
  ...businessSolutions,
  ...moreSolutions,
  ...comparisonPages,
  ...geoPages,
  ...cityPages
]

// Получить страницу по slug
export function getSEOPageBySlug(slug: string): SEOPageData | undefined {
  return allSEOPages.find(page => page.slug === slug)
}

// Получить страницы по категории
export function getSEOPagesByCategory(category: SEOPageData['category']): SEOPageData[] {
  return allSEOPages.filter(page => page.category === category)
}

// Получить страницы по subcategory
export function getSEOPagesBySubcategory(subcategory: string): SEOPageData[] {
  return allSEOPages.filter(page => page.subcategory === subcategory)
}
