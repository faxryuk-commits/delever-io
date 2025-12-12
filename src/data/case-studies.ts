/**
 * Case Studies — истории успеха клиентов Delever
 */

export interface CaseStudy {
  slug: string
  company: string
  logo: string
  industry: string
  country: string
  city: string
  
  // Мета
  title: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  
  // Hero
  tagline: { ru: string; en: string; uz: string }
  heroImage?: string
  
  // Проблема и решение
  challenge: { ru: string; en: string; uz: string }
  solution: { ru: string; en: string; uz: string }
  
  // Результаты (метрики)
  results: {
    metric: string
    before: string
    after: string
    improvement: string
    label: { ru: string; en: string; uz: string }
  }[]
  
  // Цитата клиента
  quote?: {
    text: { ru: string; en: string; uz: string }
    author: string
    role: { ru: string; en: string; uz: string }
    avatar?: string
  }
  
  // Используемые продукты
  products: string[]
  
  // Timeline
  timeline: {
    date: string
    event: { ru: string; en: string; uz: string }
  }[]
}

export const caseStudies: CaseStudy[] = [
  // ============================================
  // Grand Lavash
  // ============================================
  {
    slug: 'grand-lavash',
    company: 'Grand Lavash',
    logo: '/logos/grand-lavash.png',
    industry: 'Lavash & Kebab',
    country: 'Uzbekistan',
    city: 'Nukus',
    
    title: {
      ru: 'Как Grand Lavash увеличил выручку с доставки на 45% за 6 месяцев',
      en: 'How Grand Lavash Increased Delivery Revenue by 45% in 6 Months',
      uz: 'Grand Lavash 6 oyda yetkazib berish daromadini qanday 45% ga oshirdi'
    },
    description: {
      ru: 'Кейс внедрения Delever в популярной сети лаваша в Нукусе. Интеграция с iiko, запуск Telegram-бота, оптимизация доставки.',
      en: 'Delever implementation case study in popular lavash chain in Nukus. iiko integration, Telegram bot launch, delivery optimization.',
      uz: 'Nukusdagi mashhur lavash tarmog\'ida Delever joriy etish keysi.'
    },
    
    tagline: {
      ru: 'От агрегаторов к собственной системе доставки',
      en: 'From Aggregators to Own Delivery System',
      uz: 'Agregatorlardan o\'z yetkazib berish tizimiga'
    },
    
    challenge: {
      ru: 'Grand Lavash — популярная сеть лаваша в Нукусе с 5+ точками. До Delever 80% доставки шло через агрегаторы с комиссией 25-30%. Заказы с сайта и Telegram вводились вручную в iiko, что приводило к ошибкам и задержкам. Не было единой базы клиентов и аналитики по каналам.',
      en: 'Grand Lavash is a popular lavash chain in Nukus with 5+ locations. Before Delever, 80% of delivery was through aggregators with 25-30% commission. Website and Telegram orders were manually entered into iiko, causing errors and delays. No unified customer database or channel analytics.',
      uz: 'Grand Lavash — Nukusdagi mashhur lavash tarmog\'i, 5+ filial. Deleverdan oldin yetkazib berishning 80% 25-30% komissiya bilan agregatorlar orqali o\'tardi.'
    },
    
    solution: {
      ru: 'Внедрили Delever с полной интеграцией: 1) Двусторонняя синхронизация с iiko — заказы автоматически попадают в кассу, стоп-листы обновляются в реальном времени. 2) Запустили Telegram-бот и обновили сайт с онлайн-оплатой. 3) Настроили программу лояльности с кэшбэком. 4) Подключили собственных курьеров с приложением Delever.',
      en: 'Implemented Delever with full integration: 1) Two-way sync with iiko — orders automatically go to POS, stop-lists update in real-time. 2) Launched Telegram bot and updated website with online payment. 3) Set up loyalty program with cashback. 4) Connected own couriers with Delever app.',
      uz: 'Delever to\'liq integratsiya bilan joriy qilindi: 1) iiko bilan ikki tomonlama sinxronizatsiya. 2) Telegram-bot va saytni onlayn to\'lov bilan ishga tushirdik. 3) Keshbek bilan sodiqlik dasturini sozladik.'
    },
    
    results: [
      {
        metric: 'revenue',
        before: '$15K',
        after: '$21.7K',
        improvement: '+45%',
        label: { ru: 'Выручка с доставки/мес', en: 'Monthly Delivery Revenue', uz: 'Oylik yetkazib berish daromadi' }
      },
      {
        metric: 'own_orders',
        before: '20%',
        after: '55%',
        improvement: '+35%',
        label: { ru: 'Доля своих каналов', en: 'Own Channels Share', uz: 'O\'z kanallari ulushi' }
      },
      {
        metric: 'avg_check',
        before: '$6.50',
        after: '$8.60',
        improvement: '+32%',
        label: { ru: 'Средний чек', en: 'Average Check', uz: 'O\'rtacha chek' }
      },
      {
        metric: 'delivery_time',
        before: '45 мин',
        after: '32 мин',
        improvement: '-29%',
        label: { ru: 'Время доставки', en: 'Delivery Time', uz: 'Yetkazib berish vaqti' }
      }
    ],
    
    quote: {
      text: {
        ru: 'Delever помог нам вернуть контроль над доставкой. Раньше мы платили агрегаторам миллионы, теперь эти деньги остаются у нас. А главное — мы знаем своих клиентов и можем работать с ними напрямую.',
        en: 'Delever helped us regain control of delivery. We used to pay millions to aggregators, now that money stays with us. Most importantly — we know our customers and can work with them directly.',
        uz: 'Delever bizga yetkazib berish ustidan nazoratni qaytarishga yordam berdi. Ilgari agregatorlarga millionlar to\'lardik, endi bu pullar bizda qoladi.'
      },
      author: 'Бахтияр Утемуратов',
      role: { ru: 'Директор Grand Lavash', en: 'Grand Lavash Director', uz: 'Grand Lavash direktori' }
    },
    
    products: ['products/channels', 'products/operations', 'integrations/iiko', 'products/marketing'],
    
    timeline: [
      { date: '2024-01', event: { ru: 'Старт проекта, аудит текущих процессов', en: 'Project start, current process audit', uz: 'Loyiha boshlanishi' } },
      { date: '2024-02', event: { ru: 'Интеграция с iiko, запуск Telegram-бота', en: 'iiko integration, Telegram bot launch', uz: 'iiko integratsiyasi, Telegram-bot ishga tushirildi' } },
      { date: '2024-03', event: { ru: 'Запуск программы лояльности', en: 'Loyalty program launch', uz: 'Sodiqlik dasturi ishga tushirildi' } },
      { date: '2024-06', event: { ru: 'Достигнуты целевые показатели', en: 'Target metrics achieved', uz: 'Maqsadli ko\'rsatkichlarga erishildi' } }
    ]
  },
  
  // ============================================
  // YAPONAMAMA
  // ============================================
  {
    slug: 'yaponamama',
    company: 'Yaponamama',
    logo: '/logos/Yaponamama.webp',
    industry: 'Japanese & Sushi',
    country: 'Uzbekistan',
    city: 'Tashkent',
    
    title: {
      ru: 'Yaponamama: рост повторных заказов на 60% с CRM Delever',
      en: 'Yaponamama: 60% Repeat Order Growth with Delever CRM',
      uz: 'Yaponamama: Delever CRM bilan takroriy buyurtmalarning 60% o\'sishi'
    },
    description: {
      ru: 'Как сеть японской кухни построила программу лояльности и увеличила LTV клиента в 2 раза.',
      en: 'How a Japanese cuisine chain built a loyalty program and doubled customer LTV.',
      uz: 'Yapon oshxonasi tarmog\'i sodiqlik dasturini qanday qurdi va mijoz LTV ni 2 marta oshirdi.'
    },
    
    tagline: {
      ru: 'От разовых заказов к постоянным клиентам',
      en: 'From One-time Orders to Loyal Customers',
      uz: 'Bir martalik buyurtmalardan doimiy mijozlarga'
    },
    
    challenge: {
      ru: 'Yaponamama — популярная сеть японской кухни с 15 точками. Проблема: низкий процент повторных заказов (25%), нет данных о клиентах, маркетинг "вслепую". Клиенты заказывали один раз и уходили к конкурентам.',
      en: 'Yaponamama is a popular Japanese cuisine chain with 15 locations. Problem: low repeat order rate (25%), no customer data, "blind" marketing. Customers ordered once and left for competitors.',
      uz: 'Yaponamama — 15 ta filialga ega mashhur yapon oshxonasi tarmog\'i. Muammo: past takroriy buyurtma darajasi (25%), mijozlar haqida ma\'lumot yo\'q.'
    },
    
    solution: {
      ru: 'Запустили комплексное CRM-решение: 1) Единая база клиентов из всех каналов (сайт, Telegram, агрегаторы). 2) Программа лояльности: 5% кэшбэк на баланс, бонусы на день рождения. 3) Автоматические push-уведомления: "Вы давно не заказывали", персональные предложения. 4) RFM-сегментация для таргетированных акций.',
      en: 'Launched comprehensive CRM solution: 1) Unified customer database from all channels. 2) Loyalty program: 5% cashback, birthday bonuses. 3) Automated push notifications and personalized offers. 4) RFM segmentation for targeted promotions.',
      uz: 'Kompleks CRM yechimini ishga tushirdik: 1) Barcha kanallardan yagona mijozlar bazasi. 2) Sodiqlik dasturi: 5% keshbek. 3) Avtomatik push-bildirishnomalar.'
    },
    
    results: [
      {
        metric: 'repeat_rate',
        before: '25%',
        after: '40%',
        improvement: '+60%',
        label: { ru: 'Повторные заказы', en: 'Repeat Order Rate', uz: 'Takroriy buyurtmalar' }
      },
      {
        metric: 'ltv',
        before: '$45',
        after: '$92',
        improvement: '+104%',
        label: { ru: 'LTV клиента', en: 'Customer LTV', uz: 'Mijoz LTV' }
      },
      {
        metric: 'marketing_roi',
        before: '150%',
        after: '380%',
        improvement: '+153%',
        label: { ru: 'ROI маркетинга', en: 'Marketing ROI', uz: 'Marketing ROI' }
      },
      {
        metric: 'nps',
        before: '42',
        after: '67',
        improvement: '+25',
        label: { ru: 'NPS', en: 'NPS Score', uz: 'NPS ko\'rsatkichi' }
      }
    ],
    
    quote: {
      text: {
        ru: 'Раньше мы не знали, кто наши клиенты. Теперь у нас полная картина: кто, когда, что заказывает. Персонализированные акции работают в 3 раза лучше массовых.',
        en: 'Before, we didn\'t know who our customers were. Now we have the full picture: who orders what and when. Personalized promotions work 3x better than mass campaigns.',
        uz: 'Ilgari mijozlarimiz kim ekanligini bilmasdik. Endi bizda to\'liq rasm bor.'
      },
      author: 'Мария Ким',
      role: { ru: 'Маркетинг-директор Yaponamama', en: 'Yaponamama Marketing Director', uz: 'Yaponamama Marketing direktori' }
    },
    
    products: ['products/marketing', 'products/channels', 'products/analytics'],
    
    timeline: [
      { date: '2023-04', event: { ru: 'Запуск CRM и программы лояльности', en: 'CRM and loyalty program launch', uz: 'CRM va sodiqlik dasturi ishga tushirildi' } },
      { date: '2023-05', event: { ru: 'Интеграция push-уведомлений', en: 'Push notification integration', uz: 'Push-bildirishnomalar integratsiyasi' } },
      { date: '2023-07', event: { ru: 'RFM-сегментация и автоматизация', en: 'RFM segmentation and automation', uz: 'RFM-segmentatsiya va avtomatlashtirish' } },
      { date: '2023-10', event: { ru: 'Достигнут рост LTV в 2 раза', en: '2x LTV growth achieved', uz: 'LTV 2 marta oshdi' } }
    ]
  },
  
  // ============================================
  // MAXWAY
  // ============================================
  {
    slug: 'maxway',
    company: 'MAXWAY',
    logo: '/logos/maxway.png',
    industry: 'Fast Food',
    country: 'Uzbekistan',
    city: 'Tashkent',
    
    title: {
      ru: 'MAXWAY: оптимизация доставки — время сократилось на 35%',
      en: 'MAXWAY: Delivery Optimization — Time Reduced by 35%',
      uz: 'MAXWAY: Yetkazib berishni optimallashtirish — vaqt 35% ga qisqardi'
    },
    description: {
      ru: 'Как сеть фастфуда оптимизировала логистику и сократила время доставки с 50 до 32 минут.',
      en: 'How a fast food chain optimized logistics and reduced delivery time from 50 to 32 minutes.',
      uz: 'Fast food tarmog\'i logistikani qanday optimallashtirdi va yetkazish vaqtini 50 dan 32 daqiqaga qisqartirdi.'
    },
    
    tagline: {
      ru: 'Быстрее, точнее, выгоднее',
      en: 'Faster, More Accurate, More Profitable',
      uz: 'Tezroq, aniqroq, foydali'
    },
    
    challenge: {
      ru: 'MAXWAY — быстрорастущая сеть фастфуда с 30+ точками. Проблемы: долгое время доставки (50+ минут), высокий процент опозданий (18%), неэффективное распределение курьеров, много жалоб клиентов.',
      en: 'MAXWAY is a fast-growing fast food chain with 30+ locations. Problems: long delivery time (50+ minutes), high late delivery rate (18%), inefficient courier distribution, many customer complaints.',
      uz: 'MAXWAY — 30+ filialga ega tez rivojlanayotgan fast food tarmog\'i. Muammolar: uzoq yetkazish vaqti (50+ daqiqa), yuqori kechikish darajasi (18%).'
    },
    
    solution: {
      ru: 'Внедрили операционный модуль Delever: 1) Автоматическое распределение заказов по ближайшим точкам. 2) Оптимизация маршрутов курьеров (батчинг заказов). 3) Реал-тайм трекинг для клиентов и операторов. 4) Аналитика по зонам: выявили "проблемные" районы и добавили точки.',
      en: 'Implemented Delever operations module: 1) Automatic order distribution to nearest locations. 2) Courier route optimization (order batching). 3) Real-time tracking for customers and operators. 4) Zone analytics: identified "problem" areas and added locations.',
      uz: 'Delever operatsiyalar modulini joriy qildik: 1) Eng yaqin fillalarga buyurtmalarni avtomatik taqsimlash. 2) Kuryer marshrutlarini optimallashtirish. 3) Mijozlar va operatorlar uchun real-time tracking.'
    },
    
    results: [
      {
        metric: 'delivery_time',
        before: '50 мин',
        after: '32 мин',
        improvement: '-35%',
        label: { ru: 'Время доставки', en: 'Delivery Time', uz: 'Yetkazib berish vaqti' }
      },
      {
        metric: 'late_rate',
        before: '18%',
        after: '4%',
        improvement: '-78%',
        label: { ru: 'Опоздания', en: 'Late Deliveries', uz: 'Kechikishlar' }
      },
      {
        metric: 'orders_per_courier',
        before: '12',
        after: '18',
        improvement: '+50%',
        label: { ru: 'Заказов/курьер/смена', en: 'Orders/Courier/Shift', uz: 'Buyurtmalar/kuryer/smena' }
      },
      {
        metric: 'customer_rating',
        before: '3.8',
        after: '4.6',
        improvement: '+0.8',
        label: { ru: 'Рейтинг доставки', en: 'Delivery Rating', uz: 'Yetkazib berish reytingi' }
      }
    ],
    
    quote: {
      text: {
        ru: 'Delever превратил хаос в систему. Раньше диспетчеры вручную распределяли заказы, теперь всё автоматически. Курьеры успевают больше, клиенты довольны.',
        en: 'Delever turned chaos into a system. Before, dispatchers manually distributed orders, now everything is automatic. Couriers handle more, customers are happy.',
        uz: 'Delever tartibsizlikni tizimga aylantirdi. Ilgari dispetcherlar buyurtmalarni qo\'lda taqsimlardi, endi hamma narsa avtomatik.'
      },
      author: 'Бобур Рахимов',
      role: { ru: 'Операционный директор MAXWAY', en: 'MAXWAY Operations Director', uz: 'MAXWAY Operatsiyalar direktori' }
    },
    
    products: ['products/operations', 'products/analytics', 'integrations/iiko'],
    
    timeline: [
      { date: '2023-03', event: { ru: 'Аудит логистики и KPI', en: 'Logistics audit and KPI setup', uz: 'Logistika auditi va KPI' } },
      { date: '2023-04', event: { ru: 'Внедрение системы распределения', en: 'Distribution system implementation', uz: 'Taqsimlash tizimini joriy qilish' } },
      { date: '2023-05', event: { ru: 'Запуск курьерского приложения', en: 'Courier app launch', uz: 'Kuryer ilovasi ishga tushirildi' } },
      { date: '2023-08', event: { ru: 'Оптимизация зон доставки', en: 'Delivery zone optimization', uz: 'Yetkazib berish zonalarini optimallashtirish' } }
    ]
  },
  
  // ============================================
  // GIPPO
  // ============================================
  {
    slug: 'gippo',
    company: 'Gippo',
    logo: '/logos/gippo.png',
    industry: 'Hypermarket',
    country: 'Uzbekistan',
    city: 'Tashkent',
    
    title: {
      ru: 'Gippo: интеграция с Glovo сократила ошибки на 92%',
      en: 'Gippo: Glovo Integration Reduced Errors by 92%',
      uz: 'Gippo: Glovo integratsiyasi xatolarni 92% ga kamaytirdi'
    },
    description: {
      ru: 'Как гипермаркет Gippo интегрировал Glovo в единую систему: ошибки менее 1%, автоматизация процессов, ускорение сборки.',
      en: 'How Gippo hypermarket integrated Glovo into unified system: errors under 1%, process automation, faster assembly.',
      uz: 'Gippo gipermarketi Glovoni yagona tizimga qanday birlashtirdi: xatolar 1% dan kam.'
    },
    
    tagline: {
      ru: 'Интеграция с Glovo — ноль потерянных заказов',
      en: 'Glovo Integration — Zero Lost Orders',
      uz: 'Glovo integratsiyasi — yo\'qolgan buyurtmalar nol'
    },
    
    challenge: {
      ru: 'Gippo — крупный гипермаркет с доставкой продуктов через Glovo. До Delever операторы работали с планшетом Glovo отдельно от основной системы. Заказы терялись, время сборки было непредсказуемым, ручной ввод приводил к ошибкам в 12% заказов. Не было интеграции с учётной системой.',
      en: 'Gippo is a major hypermarket with grocery delivery via Glovo. Before Delever, operators worked with Glovo tablet separately from main system. Orders were lost, assembly time was unpredictable, manual entry led to errors in 12% of orders. No integration with accounting system.',
      uz: 'Gippo — Glovo orqali oziq-ovqat yetkazib beruvchi yirik gipermarket. Deleverdan oldin operatorlar Glovo planshetidan asosiy tizimdan alohida foydalanishardi.'
    },
    
    solution: {
      ru: 'Внедрили Delever с интеграцией Glovo: 1) Заказы с Glovo автоматически попадают в единую систему. 2) Автоматическая синхронизация меню и остатков с Glovo. 3) Умная очередь сборки с приоритизацией по времени. 4) Интеграция с учётной системой магазина.',
      en: 'Implemented Delever with Glovo integration: 1) Glovo orders automatically enter unified system. 2) Automatic menu and inventory sync with Glovo. 3) Smart assembly queue with time-based prioritization. 4) Integration with store accounting system.',
      uz: 'Glovo integratsiyasi bilan Delever joriy qilindi: 1) Glovo buyurtmalari avtomatik ravishda yagona tizimga tushadi. 2) Glovo bilan menyu va qoldiqlarni avtomatik sinxronlash.'
    },
    
    results: [
      {
        metric: 'errors',
        before: '12%',
        after: '<1%',
        improvement: '-92%',
        label: { ru: 'Ошибки в заказах', en: 'Order Errors', uz: 'Buyurtmalardagi xatolar' }
      },
      {
        metric: 'assembly_time',
        before: '25 мин',
        after: '14 мин',
        improvement: '-44%',
        label: { ru: 'Время сборки', en: 'Assembly Time', uz: 'Yig\'ish vaqti' }
      },
      {
        metric: 'lost_orders',
        before: '8%',
        after: '0.5%',
        improvement: '-94%',
        label: { ru: 'Потерянные заказы', en: 'Lost Orders', uz: 'Yo\'qolgan buyurtmalar' }
      }
    ],
    
    quote: {
      text: {
        ru: 'Раньше планшет Glovo стоял отдельно, заказы терялись, клиенты жаловались, операторы путались. Теперь всё в одной системе — заказы сразу видны сборщикам. Ошибки практически исчезли.',
        en: 'Glovo tablet used to be separate, orders were lost, customers complained, operators confused. Now everything is in one system — orders are immediately visible to pickers. Errors have virtually disappeared.',
        uz: 'Ilgari Glovo plansheti alohida turardi, buyurtmalar yo\'qolardi. Endi hammasi bitta tizimda — buyurtmalar darhol yig\'uvchilarga ko\'rinadi.'
      },
      author: 'Алишер Норматов',
      role: { ru: 'Директор по e-commerce Gippo', en: 'Gippo E-commerce Director', uz: 'Gippo E-commerce direktori' }
    },
    
    products: ['products/channels', 'products/operations', 'aggregators/glovo'],
    
    timeline: [
      { date: '2024-02', event: { ru: 'Аудит текущих процессов', en: 'Current process audit', uz: 'Joriy jarayonlar auditi' } },
      { date: '2024-03', event: { ru: 'Интеграция Glovo с Delever', en: 'Glovo integration with Delever', uz: 'Glovoni Deleverga ulash' } },
      { date: '2024-04', event: { ru: 'Запуск умной очереди сборки', en: 'Smart assembly queue launch', uz: 'Aqlli yig\'ish navbatini ishga tushirish' } },
      { date: '2024-06', event: { ru: 'Оптимизация процессов', en: 'Process optimization', uz: 'Jarayonlarni optimallashtirish' } }
    ]
  }
]

// Получить case study по slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug)
}

// Получить все case studies
export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies
}
