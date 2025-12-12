// Knowledge Hub — Problem-Driven SEO для владельцев ресторанов
// Каждая статья отвечает на конкретный вопрос бизнеса → генерирует лиды

export interface KnowledgeArticle {
  slug: string
  hub: string // категория хаба
  
  // SEO
  title: { ru: string; en: string; uz: string }
  h1: { ru: string; en: string; uz: string }
  description: { ru: string; en: string; uz: string }
  keywords: { ru: string; en: string; uz: string }
  
  // Контент
  intro: { ru: string; en: string; uz: string }
  sections: {
    title: { ru: string; en: string; uz: string }
    content: { ru: string; en: string; uz: string }
  }[]
  
  // CTA внутри статьи
  cta: {
    text: { ru: string; en: string; uz: string }
    link: string
  }
  
  // FAQ для GEO (ChatGPT/Perplexity)
  faq: {
    q: { ru: string; en: string; uz: string }
    a: { ru: string; en: string; uz: string }
  }[]
  
  // Internal linking
  relatedArticles: string[]
  relatedProducts: string[]
  
  // Гео (если null — глобальная статья)
  geo?: string
}

// ============================================
// KNOWLEDGE HUBS (ТЕМАТИЧЕСКИЕ РАЗДЕЛЫ)
// ============================================
export const knowledgeHubs = {
  'open-restaurant': {
    slug: 'open-restaurant',
    title: { ru: 'Открытие ресторана', en: 'Open a Restaurant', uz: 'Restoran ochish' },
    description: { ru: 'Гайды по открытию ресторана, кафе, пиццерии', en: 'Guides for opening a restaurant, cafe, pizzeria', uz: 'Restoran, kafe, pizzeriya ochish bo\'yicha qo\'llanmalar' },
    icon: '🏪',
    color: 'from-emerald-500 to-emerald-600'
  },
  'launch-delivery': {
    slug: 'launch-delivery',
    title: { ru: 'Запуск доставки', en: 'Launch Delivery', uz: 'Yetkazib berishni ishga tushirish' },
    description: { ru: 'Как запустить доставку еды в ресторане', en: 'How to launch food delivery in a restaurant', uz: 'Restoranda ovqat yetkazib berishni qanday boshlash' },
    icon: '🚀',
    color: 'from-blue-500 to-blue-600'
  },
  'grow-sales': {
    slug: 'grow-sales',
    title: { ru: 'Рост продаж', en: 'Grow Sales', uz: 'Sotuvni oshirish' },
    description: { ru: 'Как увеличить продажи и средний чек', en: 'How to increase sales and average check', uz: 'Savdo va o\'rtacha chekni qanday oshirish' },
    icon: '📈',
    color: 'from-green-500 to-green-600'
  },
  'restaurant-finance': {
    slug: 'restaurant-finance',
    title: { ru: 'Финансы ресторана', en: 'Restaurant Finance', uz: 'Restoran moliyasi' },
    description: { ru: 'Unit economics, food cost, маржинальность', en: 'Unit economics, food cost, margins', uz: 'Unit economics, food cost, foyda' },
    icon: '💰',
    color: 'from-yellow-500 to-yellow-600'
  },
  'operations': {
    slug: 'operations',
    title: { ru: 'Операции и автоматизация', en: 'Operations & Automation', uz: 'Operatsiyalar va avtomatlashtirish' },
    description: { ru: 'Как автоматизировать ресторан и оптимизировать процессы', en: 'How to automate restaurant and optimize processes', uz: 'Restoranni avtomatlashtirish va jarayonlarni optimallashtirish' },
    icon: '⚙️',
    color: 'from-gray-500 to-gray-600'
  },
  'aggregators': {
    slug: 'aggregators',
    title: { ru: 'Работа с агрегаторами', en: 'Aggregator Strategy', uz: 'Agregatorlar bilan ishlash' },
    description: { ru: 'Glovo, Wolt, Uzum — как работать и экономить', en: 'Glovo, Wolt, Uzum — how to work and save', uz: 'Glovo, Wolt, Uzum — qanday ishlash va tejash' },
    icon: '🛵',
    color: 'from-orange-500 to-orange-600'
  },
  'pos-integrations': {
    slug: 'pos-integrations',
    title: { ru: 'POS интеграции', en: 'POS Integrations', uz: 'POS integratsiyalar' },
    description: { ru: 'Как выбрать и интегрировать POS-систему', en: 'How to choose and integrate POS system', uz: 'POS tizimini qanday tanlash va integratsiya qilish' },
    icon: '🖥️',
    color: 'from-purple-500 to-purple-600'
  },
  'courier-logistics': {
    slug: 'courier-logistics',
    title: { ru: 'Курьерская логистика', en: 'Courier Logistics', uz: 'Kuryer logistikasi' },
    description: { ru: 'Как нанимать, управлять и оптимизировать курьеров', en: 'How to hire, manage and optimize couriers', uz: 'Kuryerlarni qanday yollash, boshqarish va optimallashtirish' },
    icon: '🚗',
    color: 'from-rose-500 to-rose-600'
  },
  'dark-kitchen': {
    slug: 'dark-kitchen',
    title: { ru: 'Dark Kitchen', en: 'Dark Kitchen', uz: 'Dark Kitchen' },
    description: { ru: 'Как открыть и управлять облачной кухней', en: 'How to open and manage a cloud kitchen', uz: 'Bulutli oshxonani qanday ochish va boshqarish' },
    icon: '🏭',
    color: 'from-slate-600 to-slate-700'
  },
  'hr-restaurant': {
    slug: 'hr-restaurant',
    title: { ru: 'HR для ресторанов', en: 'Restaurant HR', uz: 'Restoranlar uchun HR' },
    description: { ru: 'Найм, обучение, мотивация персонала', en: 'Hiring, training, staff motivation', uz: 'Xodimlarni yollash, o\'qitish, rag\'batlantirish' },
    icon: '👥',
    color: 'from-indigo-500 to-indigo-600'
  }
}

// ============================================
// СТАТЬИ — ОТКРЫТИЕ РЕСТОРАНА
// ============================================
export const openRestaurantArticles: KnowledgeArticle[] = [
  {
    slug: 'how-to-open-restaurant',
    hub: 'open-restaurant',
    title: {
      ru: 'Как открыть ресторан в 2025 году — пошаговый гайд',
      en: 'How to Open a Restaurant in 2025 — Step-by-Step Guide',
      uz: '2025 yilda restoran qanday ochish — bosqichma-bosqich qo\'llanma'
    },
    h1: {
      ru: 'Как открыть ресторан: полный гайд от экспертов',
      en: 'How to Open a Restaurant: Complete Expert Guide',
      uz: 'Restoran qanday ochish: ekspertlarning to\'liq qo\'llanmasi'
    },
    description: {
      ru: 'Пошаговая инструкция по открытию ресторана: от бизнес-плана до первого заказа. Документы, оборудование, персонал, запуск доставки.',
      en: 'Step-by-step guide to opening a restaurant: from business plan to first order. Documents, equipment, staff, delivery launch.',
      uz: 'Restoran ochish bo\'yicha bosqichma-bosqich qo\'llanma: biznes-rejadan birinchi buyurtmagacha. Hujjatlar, uskunalar, xodimlar, yetkazib berishni ishga tushirish.'
    },
    keywords: {
      ru: 'как открыть ресторан, открыть кафе, бизнес-план ресторана, открытие ресторана с нуля',
      en: 'how to open restaurant, open cafe, restaurant business plan, start restaurant from scratch',
      uz: 'restoran qanday ochish, kafe ochish, restoran biznes-rejasi'
    },
    intro: {
      ru: 'Открытие ресторана — это не просто аренда помещения и закупка оборудования. Это бизнес-процесс, который требует планирования, юридической подготовки и понимания рынка. В этом гайде мы разберём все этапы: от идеи до первого заказа.',
      en: 'Opening a restaurant is not just about renting a space and buying equipment. It\'s a business process that requires planning, legal preparation, and market understanding. In this guide, we\'ll cover all stages: from idea to first order.',
      uz: 'Restoran ochish — bu shunchaki joy ijarasi va uskuna sotib olish emas. Bu rejalashtirish, huquqiy tayyorgarlik va bozorni tushunishni talab qiladigan biznes jarayoni. Ushbu qo\'llanmada biz barcha bosqichlarni ko\'rib chiqamiz: g\'oyadan birinchi buyurtmagacha.'
    },
    sections: [
      {
        title: { ru: 'Шаг 1: Бизнес-план', en: 'Step 1: Business Plan', uz: '1-qadam: Biznes-reja' },
        content: {
          ru: 'Перед открытием составьте детальный бизнес-план: концепция, целевая аудитория, меню, локация, бюджет, прогноз выручки. Без плана 80% ресторанов закрываются в первый год.',
          en: 'Before opening, create a detailed business plan: concept, target audience, menu, location, budget, revenue forecast. Without a plan, 80% of restaurants close in the first year.',
          uz: 'Ochishdan oldin batafsil biznes-reja tuzing: kontseptsiya, maqsadli auditoriya, menyu, joylashuv, byudjet, daromad prognozi. Rejasiz restoranlarning 80% birinchi yilda yopiladi.'
        }
      },
      {
        title: { ru: 'Шаг 2: Документы и лицензии', en: 'Step 2: Documents & Licenses', uz: '2-qadam: Hujjatlar va litsenziyalar' },
        content: {
          ru: 'Зарегистрируйте юридическое лицо, получите разрешения СЭС, пожарной инспекции. В Узбекистане нужна лицензия на общественное питание.',
          en: 'Register a legal entity, obtain permits from health inspection, fire department. In Uzbekistan, you need a public catering license.',
          uz: 'Yuridik shaxsni ro\'yxatdan o\'tkazing, SES, yong\'in inspeksiyasidan ruxsatnomalar oling. O\'zbekistonda ommaviy ovqatlanish litsenziyasi kerak.'
        }
      },
      {
        title: { ru: 'Шаг 3: Локация и помещение', en: 'Step 3: Location & Space', uz: '3-qadam: Joylashuv va bino' },
        content: {
          ru: 'Выбор локации — ключевой фактор успеха. Анализируйте трафик, конкурентов, парковку. Для доставки локация менее важна — можно открыть dark kitchen.',
          en: 'Location choice is a key success factor. Analyze traffic, competitors, parking. For delivery, location is less important — you can open a dark kitchen.',
          uz: 'Joylashuvni tanlash — muvaffaqiyatning asosiy omili. Trafikni, raqobatchilarni, parkovkani tahlil qiling. Yetkazib berish uchun joylashuv unchalik muhim emas — dark kitchen ochishingiz mumkin.'
        }
      },
      {
        title: { ru: 'Шаг 4: Запуск доставки', en: 'Step 4: Launch Delivery', uz: '4-qadam: Yetkazib berishni ishga tushirish' },
        content: {
          ru: 'Сегодня 40%+ выручки ресторанов — это доставка. Запустите собственные каналы (сайт, Telegram) и подключитесь к агрегаторам. С Delever это занимает 1 день.',
          en: 'Today 40%+ of restaurant revenue is delivery. Launch your own channels (website, Telegram) and connect to aggregators. With Delever, this takes 1 day.',
          uz: 'Bugun restoran daromadining 40%+ qismi yetkazib berish. O\'z kanallaringizni (sayt, Telegram) ishga tushiring va agregatorlarga ulaning. Delever bilan bu 1 kun davom etadi.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку за 1 день', en: 'Launch Delivery in 1 Day', uz: '1 kunda yetkazib berishni ishga tushirish' },
      link: '/pricing'
    },
    faq: [
      {
        q: { ru: 'Сколько стоит открыть ресторан?', en: 'How much does it cost to open a restaurant?', uz: 'Restoran ochish qancha turadi?' },
        a: { ru: 'В Узбекистане небольшое кафе можно открыть от $15,000-30,000. Полноценный ресторан — от $50,000-100,000. Dark kitchen — от $10,000.', en: 'In Uzbekistan, a small cafe can be opened for $15,000-30,000. A full restaurant — from $50,000-100,000. Dark kitchen — from $10,000.', uz: 'O\'zbekistonda kichik kafeni $15,000-30,000 ga ochish mumkin. To\'liq restoran — $50,000-100,000 dan. Dark kitchen — $10,000 dan.' }
      },
      {
        q: { ru: 'Какие документы нужны для открытия ресторана?', en: 'What documents are needed to open a restaurant?', uz: 'Restoran ochish uchun qanday hujjatlar kerak?' },
        a: { ru: 'Регистрация юрлица, санитарное разрешение СЭС, заключение пожарной инспекции, лицензия на общепит (для алкоголя — дополнительная).', en: 'Legal entity registration, sanitary permit, fire inspection certificate, public catering license (additional for alcohol).', uz: 'Yuridik shaxsni ro\'yxatdan o\'tkazish, sanitariya ruxsatnomasi, yong\'in inspeksiyasi xulosasi, ommaviy ovqatlanish litsenziyasi (alkogol uchun — qo\'shimcha).' }
      }
    ],
    relatedArticles: ['how-to-choose-location', 'how-to-launch-delivery'],
    relatedProducts: ['products/channels', 'solutions/cafe', 'solutions/pizzeria']
  },
  {
    slug: 'how-to-choose-location',
    hub: 'open-restaurant',
    title: {
      ru: 'Как выбрать локацию для ресторана — 7 критериев',
      en: 'How to Choose Restaurant Location — 7 Criteria',
      uz: 'Restoran uchun joylashuvni qanday tanlash — 7 mezon'
    },
    h1: {
      ru: 'Как выбрать идеальную локацию для ресторана',
      en: 'How to Choose the Perfect Restaurant Location',
      uz: 'Restoran uchun ideal joylashuvni qanday tanlash'
    },
    description: {
      ru: 'Как выбрать место для кафе или ресторана: анализ трафика, конкурентов, аренды. Чек-лист для выбора локации.',
      en: 'How to choose a location for cafe or restaurant: traffic analysis, competitors, rent. Location checklist.',
      uz: 'Kafe yoki restoran uchun joyni qanday tanlash: trafik tahlili, raqobatchilar, ijara. Joylashuvni tanlash uchun nazorat ro\'yxati.'
    },
    keywords: {
      ru: 'локация для ресторана, как выбрать место для кафе, аренда помещения для ресторана',
      en: 'restaurant location, how to choose cafe location, rent space for restaurant',
      uz: 'restoran uchun joylashuv, kafe uchun joy qanday tanlash'
    },
    intro: {
      ru: 'Локация — это 50% успеха ресторана с залом. Но для доставки правила другие. Разберём оба сценария и дадим чек-лист выбора.',
      en: 'Location is 50% of success for a dine-in restaurant. But for delivery, the rules are different. Let\'s cover both scenarios and provide a selection checklist.',
      uz: 'Joylashuv — zalli restoran muvaffaqiyatining 50% qismi. Ammo yetkazib berish uchun qoidalar boshqacha. Ikkala stsenariyni ko\'rib chiqamiz va tanlash uchun nazorat ro\'yxatini beramiz.'
    },
    sections: [
      {
        title: { ru: '1. Анализ пешеходного трафика', en: '1. Foot Traffic Analysis', uz: '1. Piyodalar trafigini tahlil qilish' },
        content: {
          ru: 'Посчитайте количество прохожих в разное время суток. Для кафе нужно минимум 1000 человек в час в пиковое время.',
          en: 'Count the number of passersby at different times of day. For a cafe, you need at least 1000 people per hour at peak time.',
          uz: 'Kunning turli vaqtlarida o\'tuvchilar sonini hisoblang. Kafe uchun eng ko\'p vaqtda soatiga kamida 1000 kishi kerak.'
        }
      },
      {
        title: { ru: '2. Для доставки: зоны покрытия', en: '2. For Delivery: Coverage Zones', uz: '2. Yetkazib berish uchun: qamrov zonalari' },
        content: {
          ru: 'Если ваш фокус — доставка, важнее не проходимость, а близость к жилым массивам и офисам. Dark kitchen можно открыть в промзоне с низкой арендой.',
          en: 'If your focus is delivery, proximity to residential areas and offices is more important than foot traffic. A dark kitchen can be opened in an industrial zone with low rent.',
          uz: 'Agar fokuslaringiz yetkazib berish bo\'lsa, turar-joy massivlari va ofislarga yaqinlik piyodalar trafigidan muhimroq. Dark kitchen ni kam ijarali sanoat zonasida ochish mumkin.'
        }
      }
    ],
    cta: {
      text: { ru: 'Открыть dark kitchen с Delever', en: 'Open Dark Kitchen with Delever', uz: 'Delever bilan dark kitchen ochish' },
      link: '/solutions/dark-kitchen'
    },
    faq: [],
    relatedArticles: ['how-to-open-restaurant'],
    relatedProducts: ['solutions/dark-kitchen', 'products/channels']
  }
]

// ============================================
// СТАТЬИ — ЗАПУСК ДОСТАВКИ
// ============================================
export const launchDeliveryArticles: KnowledgeArticle[] = [
  {
    slug: 'how-to-launch-delivery',
    hub: 'launch-delivery',
    title: {
      ru: 'Как запустить доставку в ресторане — полный гайд 2025',
      en: 'How to Launch Restaurant Delivery — Complete Guide 2025',
      uz: 'Restoranda yetkazib berishni qanday boshlash — 2025 to\'liq qo\'llanma'
    },
    h1: {
      ru: 'Как запустить доставку еды: пошаговая инструкция',
      en: 'How to Launch Food Delivery: Step-by-Step Guide',
      uz: 'Ovqat yetkazib berishni qanday boshlash: bosqichma-bosqich qo\'llanma'
    },
    description: {
      ru: 'Как запустить доставку в ресторане или кафе: выбор каналов, найм курьеров, интеграция с POS, подключение оплаты. Запуск за 1 день с Delever.',
      en: 'How to launch delivery in restaurant or cafe: channel selection, courier hiring, POS integration, payment setup. Launch in 1 day with Delever.',
      uz: 'Restoran yoki kafeda yetkazib berishni qanday boshlash: kanal tanlash, kuryer yollash, POS integratsiyasi, to\'lovni sozlash. Delever bilan 1 kunda ishga tushirish.'
    },
    keywords: {
      ru: 'запуск доставки, как начать доставку еды, доставка для ресторана, подключить доставку',
      en: 'launch delivery, how to start food delivery, delivery for restaurant, connect delivery',
      uz: 'yetkazib berishni boshlash, ovqat yetkazib berishni qanday boshlash'
    },
    intro: {
      ru: 'Доставка — это уже не опция, а необходимость. 40-60% выручки современных ресторанов приходится на онлайн-заказы. В этом гайде покажем, как запустить доставку за 1 день.',
      en: 'Delivery is no longer an option, it\'s a necessity. 40-60% of modern restaurant revenue comes from online orders. In this guide, we\'ll show you how to launch delivery in 1 day.',
      uz: 'Yetkazib berish endi tanlov emas, bu zaruratdir. Zamonaviy restoran daromadining 40-60% onlayn buyurtmalardan keladi. Ushbu qo\'llanmada 1 kunda yetkazib berishni qanday ishga tushirishni ko\'rsatamiz.'
    },
    sections: [
      {
        title: { ru: 'Способ 1: Собственные каналы', en: 'Method 1: Own Channels', uz: '1-usul: O\'z kanallari' },
        content: {
          ru: 'Создайте сайт доставки и Telegram-бот. 0% комиссии, полный контроль клиентской базы. С Delever запуск занимает 1 день.',
          en: 'Create a delivery website and Telegram bot. 0% commission, full control of customer base. With Delever, launch takes 1 day.',
          uz: 'Yetkazib berish sayti va Telegram-bot yarating. 0% komissiya, mijozlar bazasini to\'liq nazorat qilish. Delever bilan ishga tushirish 1 kun davom etadi.'
        }
      },
      {
        title: { ru: 'Способ 2: Агрегаторы', en: 'Method 2: Aggregators', uz: '2-usul: Agregatorlar' },
        content: {
          ru: 'Подключите Glovo, Wolt, Uzum Tezkor. Готовый трафик, но 15-35% комиссия. Delever автоматизирует приём заказов — без планшетов агрегаторов.',
          en: 'Connect Glovo, Wolt, Uzum Tezkor. Ready traffic, but 15-35% commission. Delever automates order intake — no aggregator tablets.',
          uz: 'Glovo, Wolt, Uzum Tezkor ni ulang. Tayyor trafik, lekin 15-35% komissiya. Delever buyurtma qabul qilishni avtomatlashtiradi — agregator planshetlarisiz.'
        }
      },
      {
        title: { ru: 'Способ 3: Гибридный (рекомендуем)', en: 'Method 3: Hybrid (Recommended)', uz: '3-usul: Gibrid (tavsiya etiladi)' },
        content: {
          ru: 'Используйте оба канала: агрегаторы для привлечения новых клиентов, свои каналы — для удержания. Переводите клиентов с агрегаторов на свои через бонусы.',
          en: 'Use both channels: aggregators to attract new customers, own channels for retention. Transfer customers from aggregators to your own through bonuses.',
          uz: 'Ikkala kanalni ishlating: yangi mijozlarni jalb qilish uchun agregatorlar, ushlab turish uchun o\'z kanallaringiz. Mijozlarni agregatorlardan o\'zingiznikiga bonuslar orqali o\'tkazing.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить доставку за 1 день', en: 'Launch Delivery in 1 Day', uz: '1 kunda yetkazib berishni ishga tushirish' },
      link: '/pricing'
    },
    faq: [
      {
        q: { ru: 'Сколько стоит запустить доставку?', en: 'How much does it cost to launch delivery?', uz: 'Yetkazib berishni ishga tushirish qancha turadi?' },
        a: { ru: 'С Delever — от $99/месяц. Включает сайт, Telegram-бот, админ-панель, курьерское приложение. Интеграция с агрегаторами — дополнительно.', en: 'With Delever — from $99/month. Includes website, Telegram bot, admin panel, courier app. Aggregator integration — additional.', uz: 'Delever bilan — oyiga $99 dan. Sayt, Telegram-bot, admin-panel, kuryer ilovasini o\'z ichiga oladi. Agregator integratsiyasi — qo\'shimcha.' }
      },
      {
        q: { ru: 'Нужны ли свои курьеры?', en: 'Do I need my own couriers?', uz: 'O\'z kuryerlarim kerakmi?' },
        a: { ru: 'Не обязательно. Можно использовать курьеров Яндекс Доставки или Wolt Drive. Delever интегрирован с ними.', en: 'Not necessarily. You can use Yandex Delivery or Wolt Drive couriers. Delever is integrated with them.', uz: 'Majburiy emas. Yandex Delivery yoki Wolt Drive kuryerlaridan foydalanishingiz mumkin. Delever ular bilan integratsiyalangan.' }
      }
    ],
    relatedArticles: ['guides/how-to-hire-couriers', 'guides/reduce-aggregator-commissions'],
    relatedProducts: ['products/channels', 'products/operations', 'delivery/yandex-delivery']
  },
  {
    slug: 'how-to-hire-couriers',
    hub: 'courier-logistics',
    title: {
      ru: 'Как нанять курьеров для доставки еды — гайд для ресторанов',
      en: 'How to Hire Couriers for Food Delivery — Restaurant Guide',
      uz: 'Ovqat yetkazib berish uchun kuryerlarni qanday yollash — restoranlar uchun qo\'llanma'
    },
    h1: {
      ru: 'Как нанять и управлять курьерами',
      en: 'How to Hire and Manage Couriers',
      uz: 'Kuryerlarni qanday yollash va boshqarish'
    },
    description: {
      ru: 'Как найти, нанять и мотивировать курьеров для доставки. Варианты: свои курьеры vs аутсорс. Системы оплаты и контроля.',
      en: 'How to find, hire and motivate couriers for delivery. Options: own couriers vs outsource. Payment and control systems.',
      uz: 'Yetkazib berish uchun kuryerlarni qanday topish, yollash va rag\'batlantirish. Variantlar: o\'z kuryerlari vs autsorsing. To\'lov va nazorat tizimlari.'
    },
    keywords: {
      ru: 'найм курьеров, курьеры для доставки, зарплата курьера, управление курьерами',
      en: 'hire couriers, couriers for delivery, courier salary, courier management',
      uz: 'kuryerlarni yollash, yetkazib berish uchun kuryerlar, kuryer maoshi'
    },
    intro: {
      ru: 'Курьеры — это лицо вашей доставки. От их работы зависит удовлетворённость клиентов. Разберём, как нанимать, платить и контролировать.',
      en: 'Couriers are the face of your delivery. Customer satisfaction depends on their work. Let\'s cover how to hire, pay and control.',
      uz: 'Kuryerlar — bu yetkazib berishingizning yuzi. Mijozlar mamnuniyati ularning ishiga bog\'liq. Qanday yollash, to\'lash va nazorat qilishni ko\'rib chiqamiz.'
    },
    sections: [
      {
        title: { ru: 'Вариант 1: Свои курьеры', en: 'Option 1: Own Couriers', uz: '1-variant: O\'z kuryerlari' },
        content: {
          ru: 'Плюсы: контроль, брендированная форма, стабильность. Минусы: расходы на зарплату, транспорт, управление. Подходит для 50+ заказов в день.',
          en: 'Pros: control, branded uniform, stability. Cons: salary costs, transport, management. Suitable for 50+ orders per day.',
          uz: 'Pluslar: nazorat, brendli forma, barqarorlik. Minuslar: maosh xarajatlari, transport, boshqaruv. Kuniga 50+ buyurtma uchun mos.'
        }
      },
      {
        title: { ru: 'Вариант 2: Аутсорс (Яндекс, Wolt Drive)', en: 'Option 2: Outsource (Yandex, Wolt Drive)', uz: '2-variant: Autsorsing (Yandex, Wolt Drive)' },
        content: {
          ru: 'Плюсы: не нужно управлять, гибкость, оплата за заказ. Минусы: дороже на больших объёмах. Delever интегрирован с Яндекс Доставкой и Wolt Drive.',
          en: 'Pros: no management needed, flexibility, pay per order. Cons: more expensive at high volumes. Delever is integrated with Yandex Delivery and Wolt Drive.',
          uz: 'Pluslar: boshqarish kerak emas, moslashuvchanlik, har bir buyurtma uchun to\'lov. Minuslar: katta hajmlarda qimmatroq. Delever Yandex Delivery va Wolt Drive bilan integratsiyalangan.'
        }
      }
    ],
    cta: {
      text: { ru: 'Подключить Яндекс Доставку', en: 'Connect Yandex Delivery', uz: 'Yandex Delivery ni ulash' },
      link: '/delivery/yandex-delivery'
    },
    faq: [],
    relatedArticles: ['how-to-launch-delivery'],
    relatedProducts: ['products/operations', 'delivery/yandex-delivery', 'delivery/wolt-drive']
  }
]

// ============================================
// СТАТЬИ — РОСТ ПРОДАЖ
// ============================================
export const growSalesArticles: KnowledgeArticle[] = [
  {
    slug: 'how-to-increase-restaurant-sales',
    hub: 'grow-sales',
    title: {
      ru: 'Как увеличить продажи ресторана — 15 проверенных способов',
      en: 'How to Increase Restaurant Sales — 15 Proven Methods',
      uz: 'Restoran sotuvini qanday oshirish — 15 ta tasdiqlangan usul'
    },
    h1: {
      ru: 'Как увеличить продажи ресторана в 2025 году',
      en: 'How to Increase Restaurant Sales in 2025',
      uz: '2025 yilda restoran sotuvini qanday oshirish'
    },
    description: {
      ru: 'Проверенные способы увеличения продаж: upsell, программа лояльности, акции, доставка, маркетинг. Кейсы от Delever.',
      en: 'Proven ways to increase sales: upsell, loyalty program, promotions, delivery, marketing. Case studies from Delever.',
      uz: 'Sotuvni oshirishning tasdiqlangan usullari: upsell, sodiqlik dasturi, aksiyalar, yetkazib berish, marketing. Delever dan keyslar.'
    },
    keywords: {
      ru: 'увеличить продажи ресторана, повысить выручку кафе, как привлечь клиентов в ресторан',
      en: 'increase restaurant sales, boost cafe revenue, how to attract customers to restaurant',
      uz: 'restoran sotuvini oshirish, kafe daromadini oshirish'
    },
    intro: {
      ru: 'Рост продаж — главная цель любого ресторанного бизнеса. Мы собрали 15 работающих способов, которые используют клиенты Delever: от upsell до программ лояльности.',
      en: 'Sales growth is the main goal of any restaurant business. We\'ve collected 15 working methods used by Delever clients: from upsell to loyalty programs.',
      uz: 'Savdo o\'sishi — har qanday restoran biznesining asosiy maqsadi. Biz Delever mijozlari foydalanadigan 15 ta ishlaydigan usulni to\'pladik: upsell dan sodiqlik dasturlarigacha.'
    },
    sections: [
      {
        title: { ru: '1. Запустите онлайн-заказы', en: '1. Launch Online Orders', uz: '1. Onlayn buyurtmalarni ishga tushiring' },
        content: {
          ru: 'Если у вас ещё нет сайта доставки — вы теряете 30-50% потенциальной выручки. С Delever запуск занимает 1 день.',
          en: 'If you don\'t have a delivery website yet — you\'re losing 30-50% of potential revenue. With Delever, launch takes 1 day.',
          uz: 'Agar sizda hali yetkazib berish sayti bo\'lmasa — siz potentsial daromadning 30-50% ni yo\'qotyapsiz. Delever bilan ishga tushirish 1 kun davom etadi.'
        }
      },
      {
        title: { ru: '2. Upsell и cross-sell', en: '2. Upsell & Cross-sell', uz: '2. Upsell va cross-sell' },
        content: {
          ru: 'Предлагайте добавки, напитки, десерты при оформлении заказа. Это увеличивает средний чек на 15-25%.',
          en: 'Offer add-ons, drinks, desserts at checkout. This increases average check by 15-25%.',
          uz: 'Buyurtma rasmiylashtirish vaqtida qo\'shimchalar, ichimliklar, desertlar taklif qiling. Bu o\'rtacha chekni 15-25% ga oshiradi.'
        }
      },
      {
        title: { ru: '3. Программа лояльности', en: '3. Loyalty Program', uz: '3. Sodiqlik dasturi' },
        content: {
          ru: 'Кешбэк, бонусы, скидки для постоянных клиентов. Повышает повторные заказы на 30-40%. В Delever есть встроенная программа лояльности.',
          en: 'Cashback, bonuses, discounts for regular customers. Increases repeat orders by 30-40%. Delever has a built-in loyalty program.',
          uz: 'Doimiy mijozlar uchun keshbek, bonuslar, chegirmalar. Takroriy buyurtmalarni 30-40% ga oshiradi. Delever da o\'rnatilgan sodiqlik dasturi bor.'
        }
      }
    ],
    cta: {
      text: { ru: 'Увеличить продажи с Delever', en: 'Increase Sales with Delever', uz: 'Delever bilan sotuvni oshirish' },
      link: '/products/marketing'
    },
    faq: [],
    relatedArticles: ['how-to-launch-delivery'],
    relatedProducts: ['products/marketing', 'products/channels']
  }
]

// ============================================
// СТАТЬИ — АГРЕГАТОРЫ
// ============================================
export const aggregatorArticles: KnowledgeArticle[] = [
  {
    slug: 'reduce-aggregator-commissions',
    hub: 'aggregators',
    title: {
      ru: 'Как снизить комиссию агрегаторов — стратегия для ресторанов',
      en: 'How to Reduce Aggregator Commissions — Strategy for Restaurants',
      uz: 'Agregator komissiyasini qanday kamaytirish — restoranlar uchun strategiya'
    },
    h1: {
      ru: 'Как снизить комиссию Glovo, Wolt, Uzum',
      en: 'How to Reduce Glovo, Wolt, Uzum Commissions',
      uz: 'Glovo, Wolt, Uzum komissiyasini qanday kamaytirish'
    },
    description: {
      ru: 'Агрегаторы берут 15-35% комиссию. Как её снизить? Переводите клиентов на свои каналы, договаривайтесь об условиях, используйте Delever.',
      en: 'Aggregators charge 15-35% commission. How to reduce it? Transfer customers to your channels, negotiate terms, use Delever.',
      uz: 'Agregatorlar 15-35% komissiya oladi. Uni qanday kamaytirish? Mijozlarni o\'z kanallaringizga o\'tkazing, shartlarni muzokara qiling, Delever dan foydalaning.'
    },
    keywords: {
      ru: 'комиссия Glovo, комиссия Wolt, снизить комиссию агрегаторов, уйти от агрегаторов',
      en: 'Glovo commission, Wolt commission, reduce aggregator commission, leave aggregators',
      uz: 'Glovo komissiyasi, Wolt komissiyasi, agregator komissiyasini kamaytirish'
    },
    intro: {
      ru: 'Агрегаторы дают трафик, но забирают 15-35% от каждого заказа. При марже 20-30% это съедает всю прибыль. Разберём, как снизить зависимость от агрегаторов.',
      en: 'Aggregators provide traffic but take 15-35% of each order. At 20-30% margin, this eats all profit. Let\'s cover how to reduce dependence on aggregators.',
      uz: 'Agregatorlar trafik beradi, lekin har bir buyurtmaning 15-35% ni oladi. 20-30% foyda bilan bu barcha foydani yeb qo\'yadi. Agregatorlarga bog\'liqlikni qanday kamaytirishni ko\'rib chiqamiz.'
    },
    sections: [
      {
        title: { ru: 'Стратегия 1: Свои каналы + агрегаторы', en: 'Strategy 1: Own Channels + Aggregators', uz: '1-strategiya: O\'z kanallar + agregatorlar' },
        content: {
          ru: 'Используйте агрегаторы для привлечения новых клиентов. Но переводите их на свой сайт и Telegram через бонусы: "Скидка 10% на следующий заказ на нашем сайте".',
          en: 'Use aggregators to attract new customers. But transfer them to your website and Telegram through bonuses: "10% discount on next order on our website".',
          uz: 'Yangi mijozlarni jalb qilish uchun agregatorlardan foydalaning. Lekin ularni bonuslar orqali o\'z saytingiz va Telegram ga o\'tkazing: "Saytimizda keyingi buyurtmaga 10% chegirma".'
        }
      },
      {
        title: { ru: 'Стратегия 2: Договаривайтесь об условиях', en: 'Strategy 2: Negotiate Terms', uz: '2-strategiya: Shartlarni muzokara qiling' },
        content: {
          ru: 'Если у вас большие объёмы (100+ заказов/день), агрегаторы готовы снижать комиссию до 10-15%. Просите менеджера.',
          en: 'If you have high volumes (100+ orders/day), aggregators are ready to reduce commission to 10-15%. Ask your manager.',
          uz: 'Agar sizda katta hajmlar bo\'lsa (kuniga 100+ buyurtma), agregatorlar komissiyani 10-15% ga kamaytirishga tayyor. Menejeringizdan so\'rang.'
        }
      }
    ],
    cta: {
      text: { ru: 'Запустить свои каналы с Delever', en: 'Launch Own Channels with Delever', uz: 'Delever bilan o\'z kanallarni ishga tushirish' },
      link: '/products/channels'
    },
    faq: [
      {
        q: { ru: 'Какая комиссия у агрегаторов?', en: 'What is the aggregator commission?', uz: 'Agregator komissiyasi qancha?' },
        a: { ru: 'Glovo: 25-30%, Wolt: 20-30%, Uzum Tezkor: 15-25%, Yandex Еда: 20-35%. Зависит от объёмов и договорённостей.', en: 'Glovo: 25-30%, Wolt: 20-30%, Uzum Tezkor: 15-25%, Yandex Eats: 20-35%. Depends on volumes and agreements.', uz: 'Glovo: 25-30%, Wolt: 20-30%, Uzum Tezkor: 15-25%, Yandex Eda: 20-35%. Hajmlar va kelishuvlarga bog\'liq.' }
      }
    ],
    relatedArticles: ['how-to-launch-delivery'],
    relatedProducts: ['products/channels', 'aggregators/glovo', 'aggregators/wolt']
  }
]

// ============================================
// СТАТЬИ — ФИНАНСЫ РЕСТОРАНА
// ============================================
export const financeArticles: KnowledgeArticle[] = [
  {
    slug: 'food-cost-calculation',
    hub: 'restaurant-finance',
    title: {
      ru: 'Как рассчитать фудкост ресторана — формулы и примеры',
      en: 'How to Calculate Restaurant Food Cost — Formulas & Examples',
      uz: 'Restoran food cost qanday hisoblash — formulalar va misollar'
    },
    h1: {
      ru: 'Расчёт фудкоста: контролируйте себестоимость блюд',
      en: 'Food Cost Calculation: Control Your Dish Costs',
      uz: 'Food cost hisobi: taomlar tannarxini nazorat qiling'
    },
    description: {
      ru: 'Пошаговый гайд по расчёту фудкоста ресторана. Формулы, нормы, примеры. Как снизить себестоимость без потери качества.',
      en: 'Step-by-step guide to restaurant food cost calculation. Formulas, norms, examples. How to reduce costs without losing quality.',
      uz: 'Restoran food cost hisoblash bo\'yicha bosqichma-bosqich qo\'llanma. Formulalar, me\'yorlar, misollar.'
    },
    keywords: {
      ru: 'фудкост ресторана, себестоимость блюд, расчёт food cost, маржинальность меню',
      en: 'restaurant food cost, dish cost, food cost calculation, menu margin',
      uz: 'restoran food cost, taom tannarxi, food cost hisoblash'
    },
    intro: {
      ru: 'Фудкост (Food Cost) — это процент себестоимости продуктов от цены продажи блюда. Оптимальный показатель: 25-35%. Если выше — ресторан теряет деньги. В этом гайде разберём, как считать и контролировать фудкост.',
      en: 'Food Cost is the percentage of ingredient costs relative to the dish selling price. Optimal range: 25-35%. Higher means losing money. This guide covers how to calculate and control food cost.',
      uz: 'Food Cost — bu taom sotish narxiga nisbatan mahsulotlar tannarxining foizi. Optimal ko\'rsatkich: 25-35%. Yuqori bo\'lsa — restoran pul yo\'qotadi.'
    },
    sections: [
      {
        title: { ru: 'Формула фудкоста', en: 'Food Cost Formula', uz: 'Food cost formulasi' },
        content: {
          ru: 'Food Cost (%) = (Себестоимость ингредиентов / Цена продажи) × 100. Например: блюдо стоит 50,000 сум, ингредиенты — 15,000 сум. Фудкост = 30%.',
          en: 'Food Cost (%) = (Ingredient Cost / Selling Price) × 100. Example: dish costs $5, ingredients cost $1.50. Food cost = 30%.',
          uz: 'Food Cost (%) = (Ingredientlar tannarxi / Sotish narxi) × 100. Masalan: taom 50,000 so\'m, ingredientlar — 15,000 so\'m. Food cost = 30%.'
        }
      },
      {
        title: { ru: 'Как снизить фудкост', en: 'How to Reduce Food Cost', uz: 'Food cost qanday kamaytirish' },
        content: {
          ru: 'Способы снижения: 1) Оптимизация порций, 2) Работа с поставщиками, 3) Контроль списаний, 4) Сезонное меню, 5) Использование полуфабрикатов. С Delever Analytics вы видите фудкост в реальном времени.',
          en: 'Ways to reduce: 1) Portion optimization, 2) Supplier negotiations, 3) Waste control, 4) Seasonal menu, 5) Using semi-finished products. With Delever Analytics you see food cost in real-time.',
          uz: 'Kamaytirish usullari: 1) Porsiyalarni optimallashtirish, 2) Yetkazib beruvchilar bilan ishlash, 3) Chiqindilarni nazorat qilish, 4) Mavsumiy menyu.'
        }
      }
    ],
    cta: { text: { ru: 'Контролировать фудкост с Delever', en: 'Control Food Cost with Delever', uz: 'Delever bilan food cost nazorati' }, link: '/products/analytics' },
    faq: [
      {
        q: { ru: 'Какой фудкост считается нормальным?', en: 'What food cost is considered normal?', uz: 'Qanday food cost normal hisoblanadi?' },
        a: { ru: '25-35% — норма для большинства ресторанов. Fast food: 25-30%, Fine dining: 30-40%.', en: '25-35% is normal for most restaurants. Fast food: 25-30%, Fine dining: 30-40%.', uz: '25-35% — ko\'pchilik restoranlar uchun norma.' }
      }
    ],
    relatedArticles: ['how-to-open-restaurant'],
    relatedProducts: ['products/analytics']
  },
  {
    slug: 'restaurant-unit-economics',
    hub: 'restaurant-finance',
    title: {
      ru: 'Unit-экономика ресторана — как считать и улучшать',
      en: 'Restaurant Unit Economics — How to Calculate and Improve',
      uz: 'Restoran unit-ekonomikasi — qanday hisoblash va yaxshilash'
    },
    h1: {
      ru: 'Unit-экономика ресторана: считаем прибыль правильно',
      en: 'Restaurant Unit Economics: Calculate Profit Correctly',
      uz: 'Restoran unit-ekonomikasi: foydani to\'g\'ri hisoblash'
    },
    description: {
      ru: 'Как рассчитать unit-экономику ресторана: LTV, CAC, средний чек, маржинальность. Примеры и формулы.',
      en: 'How to calculate restaurant unit economics: LTV, CAC, average check, margin. Examples and formulas.',
      uz: 'Restoran unit-ekonomikasini qanday hisoblash: LTV, CAC, o\'rtacha chek, marjinallik.'
    },
    keywords: {
      ru: 'unit экономика ресторана, LTV ресторан, CAC ресторан, средний чек',
      en: 'restaurant unit economics, restaurant LTV, restaurant CAC, average check',
      uz: 'restoran unit ekonomikasi, LTV, CAC, o\'rtacha chek'
    },
    intro: {
      ru: 'Unit-экономика показывает, сколько вы зарабатываете на одном клиенте. Ключевые метрики: LTV (пожизненная ценность клиента), CAC (стоимость привлечения), средний чек, частота заказов.',
      en: 'Unit economics shows how much you earn per customer. Key metrics: LTV (lifetime value), CAC (acquisition cost), average check, order frequency.',
      uz: 'Unit-ekonomika bitta mijozdan qancha topishingizni ko\'rsatadi. Asosiy metrikalar: LTV, CAC, o\'rtacha chek, buyurtma chastotasi.'
    },
    sections: [
      {
        title: { ru: 'LTV — пожизненная ценность клиента', en: 'LTV — Customer Lifetime Value', uz: 'LTV — mijozning umrbod qiymati' },
        content: {
          ru: 'LTV = Средний чек × Частота заказов × Срок жизни клиента. Пример: чек 100,000 сум × 2 заказа/месяц × 12 месяцев = 2,400,000 сум LTV.',
          en: 'LTV = Average Check × Order Frequency × Customer Lifespan. Example: $10 check × 2 orders/month × 12 months = $240 LTV.',
          uz: 'LTV = O\'rtacha chek × Buyurtma chastotasi × Mijoz umri. Misol: 100,000 so\'m × 2 buyurtma/oy × 12 oy = 2,400,000 so\'m LTV.'
        }
      },
      {
        title: { ru: 'CAC и окупаемость', en: 'CAC and Payback', uz: 'CAC va o\'zini oqlash' },
        content: {
          ru: 'CAC = Затраты на маркетинг / Количество новых клиентов. Здоровое соотношение: LTV/CAC > 3. То есть на 1 сум привлечения вы зарабатываете минимум 3 сум.',
          en: 'CAC = Marketing Costs / New Customers. Healthy ratio: LTV/CAC > 3. Meaning for every $1 spent on acquisition, you earn at least $3.',
          uz: 'CAC = Marketing xarajatlari / Yangi mijozlar soni. Sog\'lom nisbat: LTV/CAC > 3.'
        }
      }
    ],
    cta: { text: { ru: 'Отслеживать метрики в Delever', en: 'Track Metrics in Delever', uz: 'Deleverda metrikalarni kuzatish' }, link: '/products/analytics' },
    faq: [],
    relatedArticles: ['food-cost-calculation'],
    relatedProducts: ['products/analytics', 'products/marketing']
  }
]

// ============================================
// СТАТЬИ — ОПЕРАЦИИ И АВТОМАТИЗАЦИЯ
// ============================================
export const operationsArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-automation-guide',
    hub: 'operations',
    title: {
      ru: 'Автоматизация ресторана — с чего начать в 2025',
      en: 'Restaurant Automation — Where to Start in 2025',
      uz: 'Restoran avtomatizatsiyasi — 2025 da nimadan boshlash'
    },
    h1: {
      ru: 'Автоматизация ресторана: полный гайд',
      en: 'Restaurant Automation: Complete Guide',
      uz: 'Restoran avtomatizatsiyasi: to\'liq qo\'llanma'
    },
    description: {
      ru: 'Как автоматизировать ресторан: приём заказов, кухня, склад, доставка. Какие системы выбрать и как интегрировать.',
      en: 'How to automate a restaurant: order taking, kitchen, inventory, delivery. Which systems to choose and how to integrate.',
      uz: 'Restoranni qanday avtomatlashtirish: buyurtmalar, oshxona, ombor, yetkazib berish.'
    },
    keywords: {
      ru: 'автоматизация ресторана, POS система ресторан, автоматизация кухни, автоматизация доставки',
      en: 'restaurant automation, restaurant POS system, kitchen automation, delivery automation',
      uz: 'restoran avtomatizatsiyasi, POS sistema, oshxona avtomatizatsiyasi'
    },
    intro: {
      ru: 'Автоматизация ресторана — это не просто касса. Это экосистема: POS-система, управление кухней, склад, доставка, CRM, аналитика. Правильная автоматизация экономит 20-30% операционных расходов.',
      en: 'Restaurant automation is not just a cash register. It\'s an ecosystem: POS system, kitchen management, inventory, delivery, CRM, analytics. Proper automation saves 20-30% of operational costs.',
      uz: 'Restoran avtomatizatsiyasi — bu shunchaki kassa emas. Bu ekotizim: POS-sistema, oshxona boshqaruvi, ombor, yetkazib berish, CRM, analitika.'
    },
    sections: [
      {
        title: { ru: 'Уровни автоматизации', en: 'Automation Levels', uz: 'Avtomatizatsiya darajalari' },
        content: {
          ru: 'Базовый: POS + принтеры. Средний: + управление складом + онлайн-заказы. Продвинутый: + CRM + аналитика + автоматический маркетинг. Delever закрывает все уровни.',
          en: 'Basic: POS + printers. Medium: + inventory management + online orders. Advanced: + CRM + analytics + automated marketing. Delever covers all levels.',
          uz: 'Asosiy: POS + printerlar. O\'rta: + ombor boshqaruvi + onlayn buyurtmalar. Ilg\'or: + CRM + analitika + avtomatik marketing.'
        }
      },
      {
        title: { ru: 'Интеграция систем', en: 'System Integration', uz: 'Tizimlar integratsiyasi' },
        content: {
          ru: 'Главная ошибка — разрозненные системы. Когда POS не связан с доставкой, данные теряются. Delever интегрируется с iiko, R-Keeper, Poster, Jowi — все данные в одном месте.',
          en: 'The main mistake is disconnected systems. When POS isn\'t linked to delivery, data is lost. Delever integrates with iiko, R-Keeper, Poster, Jowi — all data in one place.',
          uz: 'Asosiy xato — bog\'lanmagan tizimlar. POS yetkazib berish bilan bog\'lanmaganda, ma\'lumotlar yo\'qoladi. Delever iiko, R-Keeper, Poster, Jowi bilan integratsiyalanadi.'
        }
      }
    ],
    cta: { text: { ru: 'Автоматизировать ресторан', en: 'Automate Your Restaurant', uz: 'Restoranni avtomatlashtirish' }, link: '/integrations' },
    faq: [
      {
        q: { ru: 'Сколько стоит автоматизация ресторана?', en: 'How much does restaurant automation cost?', uz: 'Restoran avtomatizatsiyasi qancha turadi?' },
        a: { ru: 'Базовая: $500-2000 единоразово + $50-200/мес. С Delever: от $99/мес включая все модули.', en: 'Basic: $500-2000 one-time + $50-200/month. With Delever: from $99/month including all modules.', uz: 'Asosiy: $500-2000 bir martalik + $50-200/oy. Delever bilan: $99/oy dan barcha modullar bilan.' }
      }
    ],
    relatedArticles: ['how-to-launch-delivery'],
    relatedProducts: ['integrations/iiko', 'integrations/rkeeper', 'products/operations']
  }
]

// ============================================
// СТАТЬИ — POS ИНТЕГРАЦИИ
// ============================================
export const posArticles: KnowledgeArticle[] = [
  {
    slug: 'choose-pos-system',
    hub: 'pos-integrations',
    title: {
      ru: 'Как выбрать POS-систему для ресторана — сравнение 2025',
      en: 'How to Choose a POS System for Restaurant — 2025 Comparison',
      uz: 'Restoran uchun POS-sistemani qanday tanlash — 2025 taqqoslash'
    },
    h1: {
      ru: 'Выбор POS-системы для ресторана: полное сравнение',
      en: 'Choosing a POS System for Restaurant: Complete Comparison',
      uz: 'Restoran uchun POS-sistema tanlash: to\'liq taqqoslash'
    },
    description: {
      ru: 'Сравнение POS-систем для ресторанов: iiko, R-Keeper, Poster, Jowi, Syrve. Функции, цены, плюсы и минусы.',
      en: 'Comparison of restaurant POS systems: iiko, R-Keeper, Poster, Jowi, Syrve. Features, prices, pros and cons.',
      uz: 'Restoran POS-sistemalarini taqqoslash: iiko, R-Keeper, Poster, Jowi, Syrve. Funksiyalar, narxlar, afzalliklar.'
    },
    keywords: {
      ru: 'POS система ресторан, iiko vs R-Keeper, выбор кассы ресторан, сравнение POS',
      en: 'restaurant POS system, iiko vs R-Keeper, choose restaurant cash register, POS comparison',
      uz: 'restoran POS sistema, iiko vs R-Keeper, kassa tanlash'
    },
    intro: {
      ru: 'POS-система — сердце ресторана. От выбора зависит скорость работы, аналитика, возможности роста. Разберём топ-5 систем на рынке СНГ.',
      en: 'POS system is the heart of a restaurant. Your choice affects work speed, analytics, growth opportunities. Let\'s review top-5 systems in the CIS market.',
      uz: 'POS-sistema — restoranning yuragi. Tanlovdan ish tezligi, analitika, o\'sish imkoniyatlari bog\'liq.'
    },
    sections: [
      {
        title: { ru: 'iiko — лидер рынка', en: 'iiko — Market Leader', uz: 'iiko — bozor yetakchisi' },
        content: {
          ru: 'Плюсы: мощная аналитика, много интеграций, надёжность. Минусы: высокая цена, сложное внедрение. Цена: от $150/мес. Идеально для сетей 5+ точек.',
          en: 'Pros: powerful analytics, many integrations, reliability. Cons: high price, complex implementation. Price: from $150/month. Ideal for chains with 5+ locations.',
          uz: 'Afzalliklari: kuchli analitika, ko\'p integratsiyalar, ishonchlilik. Kamchiliklari: yuqori narx, murakkab joriy qilish. Narx: $150/oy dan.'
        }
      },
      {
        title: { ru: 'Poster — для малого бизнеса', en: 'Poster — for Small Business', uz: 'Poster — kichik biznes uchun' },
        content: {
          ru: 'Плюсы: простой интерфейс, облачное решение, доступная цена. Минусы: меньше функций для сетей. Цена: от $50/мес. Идеально для 1-3 точек.',
          en: 'Pros: simple interface, cloud solution, affordable price. Cons: fewer features for chains. Price: from $50/month. Ideal for 1-3 locations.',
          uz: 'Afzalliklari: oddiy interfeys, bulutli yechim, arzon narx. Kamchiliklari: tarmoqlar uchun kam funksiyalar. Narx: $50/oy dan.'
        }
      },
      {
        title: { ru: 'Интеграция с доставкой', en: 'Delivery Integration', uz: 'Yetkazib berish integratsiyasi' },
        content: {
          ru: 'Любую POS можно связать с Delever: заказы с сайта, Telegram, агрегаторов автоматически попадают в кассу. Без ручного ввода.',
          en: 'Any POS can be connected to Delever: orders from website, Telegram, aggregators automatically go to the cash register. No manual entry.',
          uz: 'Har qanday POS Delever bilan bog\'lanishi mumkin: sayt, Telegram, agregatorlardan buyurtmalar avtomatik kassaga tushadi.'
        }
      }
    ],
    cta: { text: { ru: 'Интегрировать POS с Delever', en: 'Integrate POS with Delever', uz: 'POS ni Delever bilan integratsiyalash' }, link: '/integrations' },
    faq: [
      {
        q: { ru: 'Какую POS выбрать для кафе?', en: 'Which POS to choose for a cafe?', uz: 'Kafe uchun qaysi POS tanlash kerak?' },
        a: { ru: 'Для небольшого кафе: Poster или Jowi. Для сети: iiko или R-Keeper. Все интегрируются с Delever.', en: 'For a small cafe: Poster or Jowi. For a chain: iiko or R-Keeper. All integrate with Delever.', uz: 'Kichik kafe uchun: Poster yoki Jowi. Tarmoq uchun: iiko yoki R-Keeper.' }
      }
    ],
    relatedArticles: ['restaurant-automation-guide'],
    relatedProducts: ['integrations/iiko', 'integrations/rkeeper', 'integrations/poster']
  }
]

// ============================================
// СТАТЬИ — DARK KITCHEN
// ============================================
export const darkKitchenArticles: KnowledgeArticle[] = [
  {
    slug: 'dark-kitchen-guide',
    hub: 'dark-kitchen',
    title: {
      ru: 'Как открыть Dark Kitchen — полный гайд 2025',
      en: 'How to Open a Dark Kitchen — Complete Guide 2025',
      uz: 'Dark Kitchen qanday ochish — 2025 to\'liq qo\'llanma'
    },
    h1: {
      ru: 'Dark Kitchen: как открыть облачную кухню',
      en: 'Dark Kitchen: How to Open a Ghost Kitchen',
      uz: 'Dark Kitchen: bulutli oshxona qanday ochish'
    },
    description: {
      ru: 'Пошаговый гайд по открытию dark kitchen: локация, оборудование, меню, доставка. Плюсы и минусы формата.',
      en: 'Step-by-step guide to opening a dark kitchen: location, equipment, menu, delivery. Pros and cons of the format.',
      uz: 'Dark kitchen ochish bo\'yicha bosqichma-bosqich qo\'llanma: joylashuv, uskunalar, menyu, yetkazib berish.'
    },
    keywords: {
      ru: 'dark kitchen, облачная кухня, ghost kitchen, виртуальный ресторан, кухня на доставку',
      en: 'dark kitchen, cloud kitchen, ghost kitchen, virtual restaurant, delivery kitchen',
      uz: 'dark kitchen, bulutli oshxona, ghost kitchen, virtual restoran'
    },
    intro: {
      ru: 'Dark Kitchen (облачная кухня) — это ресторан без зала, только на доставку. Экономия на аренде 50-70%, быстрый запуск, фокус на онлайн-продажах. Формат растёт на 25% ежегодно.',
      en: 'Dark Kitchen (cloud kitchen) is a restaurant without a dining room, delivery only. 50-70% savings on rent, quick launch, focus on online sales. The format grows 25% annually.',
      uz: 'Dark Kitchen (bulutli oshxona) — bu zalsiz restoran, faqat yetkazib berish uchun. Ijara bo\'yicha 50-70% tejash, tez ishga tushirish, onlayn sotuvlarga e\'tibor.'
    },
    sections: [
      {
        title: { ru: 'Преимущества Dark Kitchen', en: 'Dark Kitchen Advantages', uz: 'Dark Kitchen afzalliklari' },
        content: {
          ru: '1) Аренда дешевле в 3-5 раз (промзона вместо центра). 2) Нет расходов на зал, официантов. 3) Можно запустить несколько брендов с одной кухни. 4) Быстрый тест новых концепций.',
          en: '1) Rent 3-5x cheaper (industrial area instead of center). 2) No dining room or waiter costs. 3) Can launch multiple brands from one kitchen. 4) Quick testing of new concepts.',
          uz: '1) Ijara 3-5 marta arzonroq. 2) Zal va ofitsiant xarajatlari yo\'q. 3) Bitta oshxonadan bir nechta brend ishga tushirish mumkin. 4) Yangi konseptsiyalarni tez sinash.'
        }
      },
      {
        title: { ru: 'Как запустить за 2 недели', en: 'How to Launch in 2 Weeks', uz: '2 haftada qanday ishga tushirish' },
        content: {
          ru: 'Неделя 1: найти помещение, закупить оборудование, зарегистрировать бизнес. Неделя 2: создать меню, настроить Delever (сайт + Telegram + агрегаторы), запустить рекламу. Готово!',
          en: 'Week 1: find location, buy equipment, register business. Week 2: create menu, set up Delever (website + Telegram + aggregators), launch ads. Done!',
          uz: '1-hafta: joy topish, uskunalar sotib olish, biznesni ro\'yxatdan o\'tkazish. 2-hafta: menyu yaratish, Delever sozlash, reklama ishga tushirish. Tayyor!'
        }
      }
    ],
    cta: { text: { ru: 'Запустить Dark Kitchen с Delever', en: 'Launch Dark Kitchen with Delever', uz: 'Delever bilan Dark Kitchen ishga tushirish' }, link: '/solutions/dark-kitchen' },
    faq: [
      {
        q: { ru: 'Сколько стоит открыть dark kitchen?', en: 'How much does it cost to open a dark kitchen?', uz: 'Dark kitchen ochish qancha turadi?' },
        a: { ru: 'От $5,000-15,000: аренда, базовое оборудование, первая закупка. В 3-5 раз дешевле классического ресторана.', en: 'From $5,000-15,000: rent, basic equipment, first purchase. 3-5x cheaper than a classic restaurant.', uz: '$5,000-15,000 dan: ijara, asosiy uskunalar, birinchi xarid. Klassik restorandan 3-5 marta arzon.' }
      }
    ],
    relatedArticles: ['how-to-launch-delivery', 'how-to-open-restaurant'],
    relatedProducts: ['solutions/dark-kitchen', 'products/channels']
  }
]

// ============================================
// СТАТЬИ — HR ДЛЯ РЕСТОРАНОВ
// ============================================
export const hrArticles: KnowledgeArticle[] = [
  {
    slug: 'hire-restaurant-staff',
    hub: 'hr-restaurant',
    title: {
      ru: 'Как нанять персонал в ресторан — гайд для владельцев',
      en: 'How to Hire Restaurant Staff — Guide for Owners',
      uz: 'Restoranga xodimlarni qanday yollash — egalar uchun qo\'llanma'
    },
    h1: {
      ru: 'Найм персонала в ресторан: от поиска до адаптации',
      en: 'Restaurant Staff Hiring: From Search to Onboarding',
      uz: 'Restoranga xodimlar yollash: qidirishdan moslashishgacha'
    },
    description: {
      ru: 'Как найти и нанять персонал в ресторан: повара, официанты, курьеры. Где искать, как собеседовать, как удержать.',
      en: 'How to find and hire restaurant staff: chefs, waiters, couriers. Where to search, how to interview, how to retain.',
      uz: 'Restoranga xodimlarni qanday topish va yollash: oshpazlar, ofitsiantlar, kuryerlar.'
    },
    keywords: {
      ru: 'найм персонала ресторан, как найти повара, найти официанта, персонал доставки',
      en: 'restaurant staff hiring, find chef, find waiter, delivery staff',
      uz: 'restoran xodimlari yollash, oshpaz topish, ofitsiant topish'
    },
    intro: {
      ru: 'Текучка в ресторанах — 60-100% в год. Это нормально для индустрии, но дорого. Правильный найм и адаптация снижают текучку до 30-40% и экономят сотни тысяч на обучении.',
      en: 'Restaurant turnover is 60-100% per year. It\'s normal for the industry but expensive. Proper hiring and onboarding reduce turnover to 30-40% and save thousands on training.',
      uz: 'Restoranlarda kadrlar almashinuvi — yiliga 60-100%. Bu sanoat uchun oddiy, lekin qimmat.'
    },
    sections: [
      {
        title: { ru: 'Где искать персонал', en: 'Where to Find Staff', uz: 'Xodimlarni qayerdan topish' },
        content: {
          ru: 'Каналы поиска: 1) OLX, HeadHunter — массовые позиции. 2) Telegram-группы рестораторов. 3) Рекомендации сотрудников (бонус за приведённого). 4) Кулинарные школы — для поваров.',
          en: 'Search channels: 1) Job boards — mass positions. 2) Restaurateur Telegram groups. 3) Employee referrals (bonus for referral). 4) Culinary schools — for chefs.',
          uz: 'Qidirish kanallari: 1) OLX, HeadHunter — ommaviy lavozimlar. 2) Restoratorlar Telegram guruhlari. 3) Xodimlar tavsiyalari. 4) Pazandachilik maktablari.'
        }
      },
      {
        title: { ru: 'Курьеры и доставка', en: 'Couriers and Delivery', uz: 'Kuryerlar va yetkazib berish' },
        content: {
          ru: 'Для курьеров важно: прозрачная оплата, удобный график, понятное приложение. С Delever курьеры видят заказы, маршруты, заработок в приложении. Это снижает текучку на 25%.',
          en: 'For couriers important: transparent pay, flexible schedule, clear app. With Delever couriers see orders, routes, earnings in the app. This reduces turnover by 25%.',
          uz: 'Kuryerlar uchun muhim: shaffof to\'lov, qulay jadval, tushunarli ilova. Delever bilan kuryerlar buyurtmalar, marshrutlar, daromadni ilovada ko\'radi.'
        }
      }
    ],
    cta: { text: { ru: 'Управление курьерами в Delever', en: 'Courier Management in Delever', uz: 'Deleverda kuryerlarni boshqarish' }, link: '/products/operations' },
    faq: [
      {
        q: { ru: 'Сколько платить курьеру?', en: 'How much to pay a courier?', uz: 'Kuryerga qancha to\'lash kerak?' },
        a: { ru: 'Узбекистан: 15,000-25,000 сум/доставка или 3-5 млн/мес фикс + бонусы. Казахстан: 500-1000 тенге/доставка.', en: 'Uzbekistan: 15,000-25,000 UZS/delivery or 3-5M/month fixed + bonuses. Kazakhstan: 500-1000 KZT/delivery.', uz: 'O\'zbekiston: 15,000-25,000 so\'m/yetkazish yoki 3-5 mln/oy + bonuslar.' }
      }
    ],
    relatedArticles: ['how-to-hire-couriers'],
    relatedProducts: ['products/operations']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — ОТКРЫТИЕ РЕСТОРАНА
// ============================================
export const moreOpenRestaurantArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-business-plan',
    hub: 'open-restaurant',
    title: { ru: 'Бизнес-план ресторана — шаблон и пример 2025', en: 'Restaurant Business Plan — Template & Example 2025', uz: 'Restoran biznes-rejasi — shablon va misol 2025' },
    h1: { ru: 'Как составить бизнес-план ресторана', en: 'How to Write a Restaurant Business Plan', uz: 'Restoran biznes-rejasini qanday tuzish' },
    description: { ru: 'Готовый шаблон бизнес-плана ресторана. Финансовая модель, расчёт окупаемости, анализ рынка.', en: 'Ready restaurant business plan template. Financial model, ROI calculation, market analysis.', uz: 'Tayyor restoran biznes-reja shabloni. Moliyaviy model, rentabellik hisobi.' },
    keywords: { ru: 'бизнес план ресторана, шаблон бизнес плана, финансовая модель ресторана', en: 'restaurant business plan, business plan template, restaurant financial model', uz: 'restoran biznes rejasi, shablon' },
    intro: { ru: 'Бизнес-план — фундамент успешного ресторана. Он помогает привлечь инвестиции, получить кредит и системно подойти к запуску. В этом гайде — готовый шаблон с примерами.', en: 'A business plan is the foundation of a successful restaurant. It helps attract investments, get loans, and systematically approach the launch.', uz: 'Biznes-reja — muvaffaqiyatli restoranning asosi.' },
    sections: [
      { title: { ru: 'Структура бизнес-плана', en: 'Business Plan Structure', uz: 'Biznes-reja tuzilishi' }, content: { ru: '1) Резюме проекта, 2) Анализ рынка, 3) Маркетинговая стратегия, 4) Операционный план, 5) Финансовый план, 6) Анализ рисков.', en: '1) Executive summary, 2) Market analysis, 3) Marketing strategy, 4) Operations plan, 5) Financial plan, 6) Risk analysis.', uz: '1) Loyiha rezyumesi, 2) Bozor tahlili, 3) Marketing strategiyasi, 4) Operatsion reja, 5) Moliyaviy reja.' } },
      { title: { ru: 'Финансовая модель', en: 'Financial Model', uz: 'Moliyaviy model' }, content: { ru: 'Включите: стартовые инвестиции, операционные расходы, прогноз выручки на 3 года, точку безубыточности, ROI. Средняя окупаемость ресторана: 18-36 месяцев.', en: 'Include: startup investments, operating costs, 3-year revenue forecast, break-even point, ROI. Average restaurant payback: 18-36 months.', uz: 'Kiritish kerak: boshlang\'ich investitsiyalar, operatsion xarajatlar, 3 yillik daromad prognozi.' } }
    ],
    cta: { text: { ru: 'Рассчитать окупаемость с Delever', en: 'Calculate ROI with Delever', uz: 'Delever bilan rentabellikni hisoblash' }, link: '/pricing' },
    faq: [{ q: { ru: 'Сколько денег нужно для открытия ресторана?', en: 'How much money do you need to open a restaurant?', uz: 'Restoran ochish uchun qancha pul kerak?' }, a: { ru: 'Минимум $30,000-50,000 для небольшого кафе, $100,000-300,000 для полноценного ресторана в Ташкенте.', en: 'Minimum $30,000-50,000 for a small cafe, $100,000-300,000 for a full restaurant in Tashkent.', uz: 'Kichik kafe uchun kamida $30,000-50,000.' } }],
    relatedArticles: ['how-to-open-restaurant', 'how-to-choose-location'],
    relatedProducts: ['products/analytics']
  },
  {
    slug: 'restaurant-concept-development',
    hub: 'open-restaurant',
    title: { ru: 'Как разработать концепцию ресторана — от идеи до меню', en: 'How to Develop a Restaurant Concept — From Idea to Menu', uz: 'Restoran kontseptsiyasini qanday ishlab chiqish' },
    h1: { ru: 'Разработка концепции ресторана: полный гайд', en: 'Restaurant Concept Development: Complete Guide', uz: 'Restoran kontseptsiyasini ishlab chiqish' },
    description: { ru: 'Как создать уникальную концепцию ресторана: позиционирование, целевая аудитория, меню, дизайн, название.', en: 'How to create a unique restaurant concept: positioning, target audience, menu, design, name.', uz: 'Noyob restoran kontseptsiyasini qanday yaratish.' },
    keywords: { ru: 'концепция ресторана, позиционирование ресторана, целевая аудитория ресторана', en: 'restaurant concept, restaurant positioning, restaurant target audience', uz: 'restoran kontseptsiyasi' },
    intro: { ru: 'Концепция — это ДНК вашего ресторана. Она определяет всё: от дизайна до цен. Без чёткой концепции ресторан теряется среди конкурентов.', en: 'Concept is the DNA of your restaurant. It defines everything: from design to prices.', uz: 'Kontseptsiya — bu restoraningizning DNKsi.' },
    sections: [
      { title: { ru: 'Определите целевую аудиторию', en: 'Define Target Audience', uz: 'Maqsadli auditoriyani aniqlang' }, content: { ru: 'Кто ваш гость? Студенты, семьи, бизнесмены? Их доход, привычки, что они ищут. Пример: "Работающие мамы 28-40 лет, которые хотят быструю здоровую еду для семьи".', en: 'Who is your guest? Students, families, businesspeople? Their income, habits, what they seek.', uz: 'Mehmoningiz kim? Talabalar, oilalar, biznesmenlar?' } },
      { title: { ru: 'Уникальное торговое предложение', en: 'Unique Selling Proposition', uz: 'Noyob savdo taklifi' }, content: { ru: 'Почему клиент выберет вас, а не конкурента? Цена, скорость, качество, атмосфера, доставка? Найдите свою "фишку" и стройте всё вокруг неё.', en: 'Why will the customer choose you over competitors? Price, speed, quality, atmosphere, delivery?', uz: 'Mijoz sizni nega raqibdan emas tanlaydi?' } }
    ],
    cta: { text: { ru: 'Запустить доставку для вашей концепции', en: 'Launch Delivery for Your Concept', uz: 'Kontseptsiyangiz uchun yetkazib berishni ishga tushiring' }, link: '/products/channels' },
    faq: [],
    relatedArticles: ['how-to-open-restaurant', 'restaurant-business-plan'],
    relatedProducts: ['products/channels']
  },
  {
    slug: 'restaurant-equipment-guide',
    hub: 'open-restaurant',
    title: { ru: 'Оборудование для ресторана — полный список 2025', en: 'Restaurant Equipment — Complete List 2025', uz: 'Restoran uchun uskunalar — to\'liq ro\'yxat 2025' },
    h1: { ru: 'Какое оборудование нужно для ресторана', en: 'What Equipment Do You Need for a Restaurant', uz: 'Restoran uchun qanday uskunalar kerak' },
    description: { ru: 'Полный чек-лист оборудования для ресторана: кухня, зал, бар, доставка. Где покупать, сколько стоит.', en: 'Complete restaurant equipment checklist: kitchen, dining, bar, delivery. Where to buy, how much it costs.', uz: 'Restoran uskunalarining to\'liq nazorat ro\'yxati.' },
    keywords: { ru: 'оборудование для ресторана, кухонное оборудование, оборудование для кафе', en: 'restaurant equipment, kitchen equipment, cafe equipment', uz: 'restoran uskunalari' },
    intro: { ru: 'Оборудование — одна из главных статей расходов при открытии. Правильный выбор экономит деньги и нервы. Вот полный чек-лист.', en: 'Equipment is one of the main expenses when opening. The right choice saves money and nerves.', uz: 'Uskunalar — ochilishda asosiy xarajat moddalaridan biri.' },
    sections: [
      { title: { ru: 'Кухонное оборудование', en: 'Kitchen Equipment', uz: 'Oshxona uskunalari' }, content: { ru: 'Обязательно: плита, духовка, холодильники, морозильники, рабочие столы, вытяжка, мойки. Для пиццерии: печь для пиццы, тестомес. Для фастфуда: фритюрницы, грили.', en: 'Essential: stove, oven, refrigerators, freezers, work tables, hood, sinks. For pizzeria: pizza oven, dough mixer.', uz: 'Majburiy: plita, pech, muzlatgichlar, ish stollari, so\'rg\'ich, yuvish joylari.' } },
      { title: { ru: 'Оборудование для доставки', en: 'Delivery Equipment', uz: 'Yetkazib berish uskunalari' }, content: { ru: 'Термосумки, термобоксы для мотоциклов, упаковка (контейнеры, пакеты, наклейки), принтер для чеков/наклеек. Delever автоматически печатает наклейки с адресом.', en: 'Thermal bags, thermal boxes for motorcycles, packaging (containers, bags, stickers), receipt/label printer.', uz: 'Termo sumkalar, mototsikllar uchun termo qutilari, qadoqlash.' } }
    ],
    cta: { text: { ru: 'Автоматизировать печать заказов', en: 'Automate Order Printing', uz: 'Buyurtmalarni chop etishni avtomatlashtirish' }, link: '/integrations' },
    faq: [],
    relatedArticles: ['how-to-open-restaurant', 'dark-kitchen-guide'],
    relatedProducts: ['products/operations']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — ЗАПУСК ДОСТАВКИ
// ============================================
export const moreLaunchDeliveryArticles: KnowledgeArticle[] = [
  {
    slug: 'delivery-zones-setup',
    hub: 'launch-delivery',
    title: { ru: 'Как настроить зоны доставки — радиус, тарифы, время', en: 'How to Set Up Delivery Zones — Radius, Rates, Time', uz: 'Yetkazib berish zonalarini qanday sozlash' },
    h1: { ru: 'Настройка зон доставки для ресторана', en: 'Setting Up Delivery Zones for Restaurant', uz: 'Restoran uchun yetkazib berish zonalarini sozlash' },
    description: { ru: 'Как правильно настроить зоны доставки: радиус, минимальный заказ, стоимость доставки, время. Примеры для Ташкента.', en: 'How to properly set up delivery zones: radius, minimum order, delivery cost, time.', uz: 'Yetkazib berish zonalarini to\'g\'ri sozlash.' },
    keywords: { ru: 'зоны доставки, радиус доставки, стоимость доставки ресторан', en: 'delivery zones, delivery radius, restaurant delivery cost', uz: 'yetkazib berish zonalari' },
    intro: { ru: 'Зоны доставки влияют на скорость, стоимость и удовлетворённость клиентов. Неправильные зоны = убытки или потеря клиентов.', en: 'Delivery zones affect speed, cost, and customer satisfaction. Wrong zones = losses or customer loss.', uz: 'Yetkazib berish zonalari tezlik, narx va mijozlar mamnuniyatiga ta\'sir qiladi.' },
    sections: [
      { title: { ru: 'Принципы зонирования', en: 'Zoning Principles', uz: 'Zonalash tamoyillari' }, content: { ru: 'Зона 1 (0-3 км): бесплатная доставка или минимум, время 20-30 мин. Зона 2 (3-7 км): платная доставка 10-20k сум, время 30-45 мин. Зона 3 (7-15 км): высокая плата или минимальный заказ.', en: 'Zone 1 (0-3 km): free delivery or minimum, 20-30 min. Zone 2 (3-7 km): paid delivery, 30-45 min. Zone 3 (7-15 km): high fee or minimum order.', uz: '1-zona (0-3 km): bepul yetkazish, 20-30 daqiqa. 2-zona (3-7 km): pullik yetkazish, 30-45 daqiqa.' } },
      { title: { ru: 'Динамическое ценообразование', en: 'Dynamic Pricing', uz: 'Dinamik narxlash' }, content: { ru: 'В час-пик или плохую погоду можно увеличивать стоимость доставки на 20-50%. Delever позволяет настроить это автоматически.', en: 'During rush hour or bad weather, you can increase delivery cost by 20-50%. Delever allows automatic setup.', uz: 'Pik soatlarda yoki yomon ob-havoda yetkazish narxini 20-50% ga oshirish mumkin.' } }
    ],
    cta: { text: { ru: 'Настроить зоны в Delever', en: 'Set Up Zones in Delever', uz: 'Deleverda zonalarni sozlash' }, link: '/products/operations' },
    faq: [],
    relatedArticles: ['how-to-launch-delivery', 'how-to-hire-couriers'],
    relatedProducts: ['products/operations']
  },
  {
    slug: 'delivery-packaging-guide',
    hub: 'launch-delivery',
    title: { ru: 'Упаковка для доставки еды — как выбрать и брендировать', en: 'Food Delivery Packaging — How to Choose and Brand', uz: 'Ovqat yetkazish uchun qadoqlash' },
    h1: { ru: 'Упаковка для доставки: гайд по выбору', en: 'Delivery Packaging: Selection Guide', uz: 'Yetkazib berish uchun qadoqlash' },
    description: { ru: 'Какую упаковку выбрать для доставки еды: материалы, размеры, брендирование. Эко-упаковка vs пластик.', en: 'What packaging to choose for food delivery: materials, sizes, branding. Eco-packaging vs plastic.', uz: 'Ovqat yetkazish uchun qanday qadoqlash tanlash.' },
    keywords: { ru: 'упаковка для доставки, контейнеры для еды, эко упаковка ресторан', en: 'delivery packaging, food containers, eco packaging restaurant', uz: 'yetkazish uchun qadoqlash' },
    intro: { ru: 'Упаковка — это первое, что видит клиент. Она влияет на восприятие качества, сохранность еды и экологичность бренда.', en: 'Packaging is the first thing the customer sees. It affects quality perception, food safety, and brand eco-friendliness.', uz: 'Qadoqlash — mijoz ko\'radigan birinchi narsa.' },
    sections: [
      { title: { ru: 'Виды упаковки', en: 'Types of Packaging', uz: 'Qadoqlash turlari' }, content: { ru: 'Пластик PP5: дешёвый, для горячего. Крафт-бумага: эко, для сухих блюд. Алюминий: сохраняет тепло, для hot-блюд. Вакуум: для премиум-доставки.', en: 'PP5 plastic: cheap, for hot food. Kraft paper: eco, for dry dishes. Aluminum: retains heat. Vacuum: for premium delivery.', uz: 'PP5 plastik: arzon, issiq ovqat uchun. Kraft qog\'oz: eko, quruq taomlar uchun.' } },
      { title: { ru: 'Брендирование упаковки', en: 'Packaging Branding', uz: 'Qadoqlashni brendlash' }, content: { ru: 'Логотип на контейнере, наклейки, брендированные пакеты. Стоимость: +5-15% к упаковке, но увеличивает узнаваемость и повторные заказы на 20%.', en: 'Logo on container, stickers, branded bags. Cost: +5-15% to packaging, but increases recognition and repeat orders by 20%.', uz: 'Konteynerda logotip, stikerlar, brendli paketlar.' } }
    ],
    cta: { text: { ru: 'Печатать брендированные наклейки', en: 'Print Branded Stickers', uz: 'Brendli stikerlarni chop etish' }, link: '/products/operations' },
    faq: [],
    relatedArticles: ['how-to-launch-delivery', 'delivery-zones-setup'],
    relatedProducts: ['products/channels']
  },
  {
    slug: 'telegram-bot-for-restaurant',
    hub: 'launch-delivery',
    title: { ru: 'Telegram-бот для ресторана — как создать и продвигать', en: 'Telegram Bot for Restaurant — How to Create and Promote', uz: 'Restoran uchun Telegram-bot' },
    h1: { ru: 'Telegram-бот для заказов: полный гайд', en: 'Telegram Order Bot: Complete Guide', uz: 'Buyurtmalar uchun Telegram-bot' },
    description: { ru: 'Как создать Telegram-бот для приёма заказов в ресторане. Функции, интеграции, продвижение.', en: 'How to create a Telegram bot for restaurant orders. Features, integrations, promotion.', uz: 'Restoranda buyurtmalar qabul qilish uchun Telegram-bot yaratish.' },
    keywords: { ru: 'telegram бот ресторан, бот для заказов, telegram доставка еды', en: 'telegram bot restaurant, order bot, telegram food delivery', uz: 'telegram bot restoran' },
    intro: { ru: 'Telegram — самый популярный мессенджер в Узбекистане (20+ млн пользователей). Бот для заказов — обязательный канал продаж.', en: 'Telegram is the most popular messenger in Uzbekistan (20M+ users). An order bot is an essential sales channel.', uz: 'Telegram — O\'zbekistondagi eng mashhur messenjer (20+ mln foydalanuvchi).' },
    sections: [
      { title: { ru: 'Функции Telegram-бота', en: 'Telegram Bot Features', uz: 'Telegram-bot funksiyalari' }, content: { ru: 'Меню с фото и ценами, корзина, оформление заказа, онлайн-оплата (Payme, Click), отслеживание статуса, история заказов, акции и push-уведомления.', en: 'Menu with photos and prices, cart, order placement, online payment, status tracking, order history, promotions and push notifications.', uz: 'Foto va narxlar bilan menyu, savat, buyurtma berish, onlayn to\'lov, status kuzatuv.' } },
      { title: { ru: 'Как продвигать бот', en: 'How to Promote Bot', uz: 'Botni qanday targ\'ib qilish' }, content: { ru: 'QR-код на упаковке и в зале, ссылка в Instagram bio, реклама в Telegram-каналах, бонус за первый заказ через бот (скидка 10%).', en: 'QR code on packaging and in hall, link in Instagram bio, ads in Telegram channels, bonus for first bot order (10% discount).', uz: 'Qadoqlash va zalda QR-kod, Instagram bio da havola, Telegram kanallarda reklama.' } }
    ],
    cta: { text: { ru: 'Создать Telegram-бот с Delever', en: 'Create Telegram Bot with Delever', uz: 'Delever bilan Telegram-bot yaratish' }, link: '/products/channels' },
    faq: [{ q: { ru: 'Сколько стоит Telegram-бот?', en: 'How much does a Telegram bot cost?', uz: 'Telegram-bot qancha turadi?' }, a: { ru: 'С Delever бот включён в тариф. Отдельная разработка: $500-2000.', en: 'With Delever, the bot is included. Separate development: $500-2000.', uz: 'Delever bilan bot tarifga kiritilgan. Alohida ishlab chiqish: $500-2000.' } }],
    relatedArticles: ['how-to-launch-delivery', 'how-to-increase-restaurant-sales'],
    relatedProducts: ['products/channels']
  },
  {
    slug: 'restaurant-website-guide',
    hub: 'launch-delivery',
    title: { ru: 'Сайт для ресторана — как создать продающий сайт', en: 'Restaurant Website — How to Create a Converting Site', uz: 'Restoran uchun sayt' },
    h1: { ru: 'Создание сайта для ресторана с онлайн-заказами', en: 'Creating a Restaurant Website with Online Orders', uz: 'Onlayn buyurtmalar bilan restoran sayti yaratish' },
    description: { ru: 'Как создать сайт для ресторана с онлайн-заказами: структура, дизайн, SEO, интеграции с оплатой и доставкой.', en: 'How to create a restaurant website with online orders: structure, design, SEO, payment and delivery integrations.', uz: 'Onlayn buyurtmalar bilan restoran saytini qanday yaratish.' },
    keywords: { ru: 'сайт для ресторана, создать сайт ресторана, онлайн заказы ресторан', en: 'restaurant website, create restaurant site, online orders restaurant', uz: 'restoran sayti' },
    intro: { ru: 'Собственный сайт — это 0% комиссии и полный контроль над клиентской базой. В отличие от агрегаторов, клиенты становятся вашими навсегда.', en: 'Your own website means 0% commission and full control over customer base. Unlike aggregators, customers become yours forever.', uz: 'O\'z saytingiz — 0% komissiya va mijozlar bazasi ustidan to\'liq nazorat.' },
    sections: [
      { title: { ru: 'Структура сайта', en: 'Site Structure', uz: 'Sayt tuzilishi' }, content: { ru: 'Главная (hero + акции), Меню (категории, фото, цены), Доставка (зоны, условия), О нас, Контакты. Корзина и оформление заказа — на каждой странице.', en: 'Home (hero + promotions), Menu (categories, photos, prices), Delivery (zones, terms), About, Contacts. Cart and checkout on every page.', uz: 'Bosh sahifa, Menyu, Yetkazib berish, Biz haqimizda, Kontaktlar.' } },
      { title: { ru: 'Интеграции', en: 'Integrations', uz: 'Integratsiyalar' }, content: { ru: 'Оплата: Payme, Click, карты. Доставка: своя логистика или Yandex Delivery. POS: iiko, R-Keeper для автоматической передачи заказов. Delever объединяет всё в одном.', en: 'Payment: Payme, Click, cards. Delivery: own logistics or Yandex Delivery. POS: iiko, R-Keeper for automatic order transfer.', uz: 'To\'lov: Payme, Click, kartalar. Yetkazib berish: o\'z logistikasi yoki Yandex Delivery.' } }
    ],
    cta: { text: { ru: 'Запустить сайт за 1 день', en: 'Launch Site in 1 Day', uz: '1 kunda saytni ishga tushirish' }, link: '/products/channels' },
    faq: [],
    relatedArticles: ['telegram-bot-for-restaurant', 'how-to-launch-delivery'],
    relatedProducts: ['products/channels']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — РОСТ ПРОДАЖ
// ============================================
export const moreGrowSalesArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-loyalty-program',
    hub: 'grow-sales',
    title: { ru: 'Программа лояльности для ресторана — как увеличить повторные заказы', en: 'Restaurant Loyalty Program — How to Increase Repeat Orders', uz: 'Restoran uchun sodiqlik dasturi' },
    h1: { ru: 'Программа лояльности: возвращаем клиентов', en: 'Loyalty Program: Bringing Customers Back', uz: 'Sodiqlik dasturi: mijozlarni qaytarish' },
    description: { ru: 'Как создать программу лояльности для ресторана: кэшбэк, баллы, скидки для постоянных клиентов.', en: 'How to create a restaurant loyalty program: cashback, points, discounts for regular customers.', uz: 'Restoran uchun sodiqlik dasturini qanday yaratish.' },
    keywords: { ru: 'программа лояльности ресторан, кэшбэк ресторан, бонусы клиентам', en: 'restaurant loyalty program, restaurant cashback, customer bonuses', uz: 'restoran sodiqlik dasturi' },
    intro: { ru: 'Привлечь нового клиента стоит в 5-7 раз дороже, чем удержать существующего. Программа лояльности увеличивает повторные заказы на 30-50%.', en: 'Acquiring a new customer costs 5-7x more than retaining an existing one. Loyalty programs increase repeat orders by 30-50%.', uz: 'Yangi mijozni jalb qilish mavjud mijozni ushlab turishdan 5-7 marta qimmat.' },
    sections: [
      { title: { ru: 'Виды программ лояльности', en: 'Types of Loyalty Programs', uz: 'Sodiqlik dasturlari turlari' }, content: { ru: 'Кэшбэк (5-10% на баланс), накопительные баллы (1 сум = 1 балл), уровни (бронза/серебро/золото), бесплатная доставка после N заказов.', en: 'Cashback (5-10% to balance), accumulative points (1 currency = 1 point), tiers (bronze/silver/gold), free delivery after N orders.', uz: 'Keshbek (5-10% balansga), to\'plangan ballar, darajalar (bronza/kumush/oltin).' } },
      { title: { ru: 'Как запустить', en: 'How to Launch', uz: 'Qanday ishga tushirish' }, content: { ru: 'В Delever CRM уже встроена программа лояльности: автоматическое начисление баллов, push-уведомления о бонусах, аналитика по клиентам.', en: 'Delever CRM has a built-in loyalty program: automatic point accrual, push notifications about bonuses, customer analytics.', uz: 'Delever CRM da o\'rnatilgan sodiqlik dasturi bor.' } }
    ],
    cta: { text: { ru: 'Запустить программу лояльности', en: 'Launch Loyalty Program', uz: 'Sodiqlik dasturini ishga tushirish' }, link: '/products/marketing' },
    faq: [],
    relatedArticles: ['how-to-increase-restaurant-sales', 'restaurant-promotions-guide'],
    relatedProducts: ['products/marketing']
  },
  {
    slug: 'restaurant-promotions-guide',
    hub: 'grow-sales',
    title: { ru: 'Акции для ресторана — 20 идей для роста продаж', en: 'Restaurant Promotions — 20 Ideas for Sales Growth', uz: 'Restoran uchun aksiyalar' },
    h1: { ru: '20 работающих акций для ресторана', en: '20 Working Promotions for Restaurant', uz: 'Restoran uchun 20 ta ishlaydigan aksiya' },
    description: { ru: 'Лучшие идеи акций для ресторана: happy hour, комбо, бесплатная доставка, дни рождения, сезонные предложения.', en: 'Best restaurant promotion ideas: happy hour, combos, free delivery, birthdays, seasonal offers.', uz: 'Restoran uchun eng yaxshi aksiya g\'oyalari.' },
    keywords: { ru: 'акции для ресторана, промо ресторан, скидки ресторан', en: 'restaurant promotions, restaurant promo, restaurant discounts', uz: 'restoran aksiyalari' },
    intro: { ru: 'Правильные акции увеличивают средний чек на 15-30% и привлекают новых клиентов. Неправильные — съедают маржу. Вот проверенные идеи.', en: 'Right promotions increase average check by 15-30% and attract new customers. Wrong ones eat into margin.', uz: 'To\'g\'ri aksiyalar o\'rtacha chekni 15-30% ga oshiradi.' },
    sections: [
      { title: { ru: 'Акции для привлечения', en: 'Acquisition Promotions', uz: 'Jalb qilish aksiyalari' }, content: { ru: '1) Первый заказ -20%, 2) Приведи друга — оба получают бонус, 3) Бесплатная доставка на первый заказ, 4) Подарок при заказе от X сум.', en: '1) First order -20%, 2) Refer a friend — both get bonus, 3) Free delivery on first order, 4) Gift with order over X.', uz: '1) Birinchi buyurtma -20%, 2) Do\'stingizni olib keling, 3) Birinchi buyurtmada bepul yetkazish.' } },
      { title: { ru: 'Акции для удержания', en: 'Retention Promotions', uz: 'Ushlab turish aksiyalari' }, content: { ru: '5) Happy Hour 14:00-17:00 -15%, 6) Комбо дешевле на 20%, 7) День рождения — десерт в подарок, 8) 10-й заказ бесплатно, 9) Кэшбэк на баланс.', en: '5) Happy Hour 14:00-17:00 -15%, 6) Combo 20% cheaper, 7) Birthday — free dessert, 8) 10th order free, 9) Cashback to balance.', uz: '5) Happy Hour 14:00-17:00 -15%, 6) Kombo 20% arzonroq, 7) Tug\'ilgan kun — sovg\'a desert.' } }
    ],
    cta: { text: { ru: 'Настроить акции в Delever', en: 'Set Up Promotions in Delever', uz: 'Deleverda aksiyalarni sozlash' }, link: '/products/marketing' },
    faq: [],
    relatedArticles: ['restaurant-loyalty-program', 'how-to-increase-restaurant-sales'],
    relatedProducts: ['products/marketing']
  },
  {
    slug: 'upselling-cross-selling-restaurant',
    hub: 'grow-sales',
    title: { ru: 'Апселл и кросс-селл в ресторане — как увеличить чек', en: 'Upselling and Cross-selling in Restaurant — How to Increase Check', uz: 'Restoranda upsell va cross-sell' },
    h1: { ru: 'Апселл и кросс-селл: увеличиваем средний чек', en: 'Upselling and Cross-selling: Increasing Average Check', uz: 'Upsell va cross-sell: o\'rtacha chekni oshirish' },
    description: { ru: 'Как увеличить средний чек в ресторане с помощью апселла и кросс-селла. Примеры и скрипты.', en: 'How to increase restaurant average check with upselling and cross-selling. Examples and scripts.', uz: 'Upsell va cross-sell yordamida restoranda o\'rtacha chekni qanday oshirish.' },
    keywords: { ru: 'апселл ресторан, кросс селл ресторан, увеличить средний чек', en: 'restaurant upselling, restaurant cross-selling, increase average check', uz: 'restoran upsell' },
    intro: { ru: 'Апселл (предложить дороже) и кросс-селл (предложить дополнительно) увеличивают средний чек на 20-40% без дополнительных расходов на маркетинг.', en: 'Upselling (offer more expensive) and cross-selling (offer additional) increase average check by 20-40% without extra marketing costs.', uz: 'Upsell va cross-sell o\'rtacha chekni 20-40% ga oshiradi.' },
    sections: [
      { title: { ru: 'Примеры апселла', en: 'Upselling Examples', uz: 'Upsell misollari' }, content: { ru: '"Хотите большую порцию за +30%?", "Возьмите сет вместо одного блюда", "Добавить двойной сыр?". В онлайн-заказах: показывать рекомендации при добавлении в корзину.', en: '"Want a large portion for +30%?", "Take a set instead of one dish", "Add double cheese?". Online: show recommendations when adding to cart.', uz: '"Katta porsiya olasizmi +30%?", "Bitta taom o\'rniga set oling".' } },
      { title: { ru: 'Автоматизация в Delever', en: 'Automation in Delever', uz: 'Deleverda avtomatlashtirish' }, content: { ru: 'Delever автоматически показывает "С этим блюдом заказывают" и "Добавьте к заказу" на сайте и в Telegram-боте. Увеличение среднего чека: +18% в среднем.', en: 'Delever automatically shows "Ordered with this dish" and "Add to order" on website and Telegram bot. Average check increase: +18% on average.', uz: 'Delever avtomatik "Bu taom bilan buyurtma beriladi" va "Buyurtmaga qo\'shing" ni ko\'rsatadi.' } }
    ],
    cta: { text: { ru: 'Включить рекомендации', en: 'Enable Recommendations', uz: 'Tavsiyalarni yoqish' }, link: '/products/channels' },
    faq: [],
    relatedArticles: ['how-to-increase-restaurant-sales', 'restaurant-promotions-guide'],
    relatedProducts: ['products/channels', 'products/marketing']
  },
  {
    slug: 'restaurant-marketing-channels',
    hub: 'grow-sales',
    title: { ru: 'Каналы маркетинга для ресторана — где рекламировать в 2025', en: 'Restaurant Marketing Channels — Where to Advertise in 2025', uz: 'Restoran uchun marketing kanallari' },
    h1: { ru: 'Маркетинг ресторана: какие каналы работают', en: 'Restaurant Marketing: Which Channels Work', uz: 'Restoran marketingi: qaysi kanallar ishlaydi' },
    description: { ru: 'Эффективные каналы маркетинга для ресторана: Instagram, Telegram, Google, агрегаторы. ROI каждого канала.', en: 'Effective restaurant marketing channels: Instagram, Telegram, Google, aggregators. ROI of each channel.', uz: 'Restoran uchun samarali marketing kanallari.' },
    keywords: { ru: 'маркетинг ресторана, реклама ресторана, продвижение ресторана', en: 'restaurant marketing, restaurant advertising, restaurant promotion', uz: 'restoran marketingi' },
    intro: { ru: 'Не все каналы одинаково эффективны. В Узбекистане лучше работают Telegram и Instagram, в Казахстане — Instagram и Google. Разберём ROI каждого.', en: 'Not all channels are equally effective. In Uzbekistan, Telegram and Instagram work better, in Kazakhstan — Instagram and Google.', uz: 'Barcha kanallar bir xil samarali emas.' },
    sections: [
      { title: { ru: 'Telegram-маркетинг', en: 'Telegram Marketing', uz: 'Telegram marketing' }, content: { ru: 'Свой канал с акциями, реклама в городских каналах, рассылка в боте. CAC: $0.5-2 за клиента. Лучший канал для Узбекистана.', en: 'Your own channel with promotions, ads in city channels, bot mailing. CAC: $0.5-2 per customer. Best channel for Uzbekistan.', uz: 'Aksiyalar bilan o\'z kanalingiz, shahar kanallarida reklama, bot orqali jo\'natmalar.' } },
      { title: { ru: 'Instagram', en: 'Instagram', uz: 'Instagram' }, content: { ru: 'Красивые фото блюд, Stories с закулисьем, Reels, таргетированная реклама. CAC: $1-5 за клиента. Хорошо работает для премиум-сегмента.', en: 'Beautiful food photos, behind-the-scenes Stories, Reels, targeted ads. CAC: $1-5 per customer. Works well for premium segment.', uz: 'Taomlarning chiroyli suratlari, Stories, Reels, maqsadli reklama.' } },
      { title: { ru: 'Google и SEO', en: 'Google and SEO', uz: 'Google va SEO' }, content: { ru: 'Google Maps (обязательно!), SEO по запросам "доставка пиццы Ташкент", контекстная реклама. CAC: $2-7. Долгосрочные инвестиции.', en: 'Google Maps (must have!), SEO for queries "pizza delivery Tashkent", contextual ads. CAC: $2-7. Long-term investments.', uz: 'Google Maps (majburiy!), SEO, kontekstli reklama.' } }
    ],
    cta: { text: { ru: 'AI-маркетинг от Delever', en: 'AI Marketing from Delever', uz: 'Delever dan AI-marketing' }, link: '/ai-marketing' },
    faq: [],
    relatedArticles: ['how-to-increase-restaurant-sales', 'restaurant-promotions-guide'],
    relatedProducts: ['ai-marketing', 'products/marketing']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — АГРЕГАТОРЫ
// ============================================
export const moreAggregatorArticles: KnowledgeArticle[] = [
  {
    slug: 'glovo-for-restaurants',
    hub: 'aggregators',
    title: { ru: 'Подключение к Glovo — как начать работать с агрегатором', en: 'Connecting to Glovo — How to Start Working with Aggregator', uz: 'Glovo ga ulanish' },
    h1: { ru: 'Glovo для ресторанов: как подключиться и зарабатывать', en: 'Glovo for Restaurants: How to Connect and Earn', uz: 'Restoranlar uchun Glovo' },
    description: { ru: 'Как подключить ресторан к Glovo: условия, комиссия, требования. Плюсы и минусы работы с Glovo.', en: 'How to connect restaurant to Glovo: terms, commission, requirements. Pros and cons of working with Glovo.', uz: 'Restoranni Glovo ga qanday ulash.' },
    keywords: { ru: 'glovo для ресторанов, подключить glovo, комиссия glovo', en: 'glovo for restaurants, connect glovo, glovo commission', uz: 'restoranlar uchun glovo' },
    intro: { ru: 'Glovo — крупнейший агрегатор доставки в Узбекистане. Подключение даёт доступ к миллионам клиентов, но комиссия 25-30% съедает прибыль.', en: 'Glovo is the largest delivery aggregator in Uzbekistan. Connection gives access to millions of customers, but 25-30% commission eats into profit.', uz: 'Glovo — O\'zbekistondagi eng yirik yetkazib berish agregatori.' },
    sections: [
      { title: { ru: 'Условия подключения', en: 'Connection Terms', uz: 'Ulanish shartlari' }, content: { ru: 'Комиссия: 25-30% от заказа. Требования: юрлицо, санитарные документы, фото меню. Срок подключения: 1-2 недели. Выплаты: еженедельно.', en: 'Commission: 25-30% of order. Requirements: legal entity, sanitary documents, menu photos. Connection time: 1-2 weeks. Payouts: weekly.', uz: 'Komissiya: buyurtmadan 25-30%. Talablar: yuridik shaxs, sanitariya hujjatlari.' } },
      { title: { ru: 'Как снизить комиссию', en: 'How to Reduce Commission', uz: 'Komissiyani qanday kamaytirish' }, content: { ru: 'Гибридная модель: Glovo для привлечения + свои каналы для удержания. При заказе через Glovo — вкладывайте визитку со скидкой на прямой заказ.', en: 'Hybrid model: Glovo for acquisition + own channels for retention. With Glovo order — include a card with discount for direct order.', uz: 'Gibrid model: Glovo jalb qilish uchun + o\'z kanallari ushlab turish uchun.' } }
    ],
    cta: { text: { ru: 'Интегрировать Glovo с Delever', en: 'Integrate Glovo with Delever', uz: 'Glovo ni Delever bilan integratsiyalash' }, link: '/aggregators/glovo' },
    faq: [],
    relatedArticles: ['reduce-aggregator-commissions', 'wolt-for-restaurants'],
    relatedProducts: ['aggregators/glovo']
  },
  {
    slug: 'wolt-for-restaurants',
    hub: 'aggregators',
    title: { ru: 'Работа с Wolt — подключение и оптимизация', en: 'Working with Wolt — Connection and Optimization', uz: 'Wolt bilan ishlash' },
    h1: { ru: 'Wolt для ресторанов: полный гайд', en: 'Wolt for Restaurants: Complete Guide', uz: 'Restoranlar uchun Wolt' },
    description: { ru: 'Как подключиться к Wolt, оптимизировать меню и увеличить продажи на платформе.', en: 'How to connect to Wolt, optimize menu and increase sales on the platform.', uz: 'Wolt ga qanday ulanish va menyuni optimallashtirish.' },
    keywords: { ru: 'wolt ресторан, подключить wolt, wolt комиссия', en: 'wolt restaurant, connect wolt, wolt commission', uz: 'wolt restoran' },
    intro: { ru: 'Wolt — премиум-агрегатор с высоким средним чеком. Комиссия 20-30%, но аудитория более платёжеспособная.', en: 'Wolt is a premium aggregator with high average check. Commission 20-30%, but audience is more solvent.', uz: 'Wolt — yuqori o\'rtacha chekka ega premium agregator.' },
    sections: [
      { title: { ru: 'Особенности Wolt', en: 'Wolt Features', uz: 'Wolt xususiyatlari' }, content: { ru: 'Премиум аудитория, красивое приложение, быстрая доставка (своя логистика). Средний чек на 20-30% выше Glovo. Строгие требования к качеству фото.', en: 'Premium audience, beautiful app, fast delivery (own logistics). Average check 20-30% higher than Glovo. Strict photo quality requirements.', uz: 'Premium auditoriya, chiroyli ilova, tez yetkazib berish. O\'rtacha chek Glovo dan 20-30% yuqori.' } },
      { title: { ru: 'Оптимизация меню', en: 'Menu Optimization', uz: 'Menyuni optimallashtirish' }, content: { ru: 'Профессиональные фото (Wolt помогает бесплатно), хорошие описания, правильные категории, комбо-предложения. Рейтинг влияет на позицию в выдаче.', en: 'Professional photos (Wolt helps for free), good descriptions, correct categories, combo offers. Rating affects position in search.', uz: 'Professional suratlar, yaxshi tavsiflar, to\'g\'ri kategoriyalar, kombo takliflar.' } }
    ],
    cta: { text: { ru: 'Интегрировать Wolt с Delever', en: 'Integrate Wolt with Delever', uz: 'Wolt ni Delever bilan integratsiyalash' }, link: '/aggregators/wolt' },
    faq: [],
    relatedArticles: ['reduce-aggregator-commissions', 'glovo-for-restaurants'],
    relatedProducts: ['aggregators/wolt']
  },
  {
    slug: 'own-delivery-vs-aggregators',
    hub: 'aggregators',
    title: { ru: 'Агрегаторы + свои каналы = максимум продаж', en: 'Aggregators + Own Channels = Maximum Sales', uz: 'Agregatorlar + o\'z kanallar = maksimal savdo' },
    h1: { ru: 'Как использовать все каналы вместе', en: 'How to Use All Channels Together', uz: 'Barcha kanallarni birga qanday ishlatish' },
    description: { ru: 'Как объединить агрегаторы и свои каналы для максимума продаж. Delever помогает управлять всем из одного места.', en: 'How to combine aggregators and own channels for maximum sales. Delever helps manage everything from one place.', uz: 'Maksimal savdo uchun agregatorlar va o\'z kanallarni qanday birlashtirish.' },
    keywords: { ru: 'агрегаторы и свой сайт, омниканальность, все каналы доставки, Delever интеграция', en: 'aggregators and own website, omnichannel, all delivery channels, Delever integration', uz: 'agregatorlar va o\'z sayt, omnikanallik' },
    intro: { ru: 'Агрегаторы — отличный источник новых клиентов. Свои каналы — способ построить лояльность. Вместе они дают максимум продаж. Delever объединяет всё в одной системе.', en: 'Aggregators are a great source of new customers. Own channels help build loyalty. Together they give maximum sales. Delever unifies everything in one system.', uz: 'Agregatorlar — yangi mijozlarning ajoyib manbai. O\'z kanallar sodiqlik qurishga yordam beradi. Birga ular maksimal savdoni beradi.' },
    sections: [
      { title: { ru: 'Агрегаторы — ваш источник новых клиентов', en: 'Aggregators — Your Source of New Customers', uz: 'Agregatorlar — yangi mijozlar manbai' }, content: { ru: 'Glovo, Wolt, Uzum приводят тысячи голодных клиентов. Это готовая аудитория, которая ищет еду прямо сейчас. Используйте это!', en: 'Glovo, Wolt, Uzum bring thousands of hungry customers. This is a ready audience looking for food right now. Use it!', uz: 'Glovo, Wolt, Uzum minglab och mijozlarni keltiradi. Bu hozir ovqat qidirayotgan tayyor auditoriya.' } },
      { title: { ru: 'Свои каналы — строим лояльность', en: 'Own Channels — Building Loyalty', uz: 'O\'z kanallar — sodiqlik qurish' }, content: { ru: 'Свой сайт и Telegram-бот помогают строить прямые отношения с клиентом: программа лояльности, персональные акции, push-уведомления.', en: 'Own website and Telegram bot help build direct customer relationships: loyalty program, personalized offers, push notifications.', uz: 'O\'z sayt va Telegram-bot mijoz bilan to\'g\'ridan-to\'g\'ri aloqalar qurishga yordam beradi: sodiqlik dasturi, shaxsiy takliflar.' } },
      { title: { ru: 'Delever объединяет всё', en: 'Delever Unifies Everything', uz: 'Delever hammasini birlashtiradi' }, content: { ru: 'Все заказы — с Glovo, Wolt, Uzum, сайта, Telegram — приходят в одно окно. Единое меню синхронизируется со всеми каналами. Одна аналитика показывает полную картину.', en: 'All orders — from Glovo, Wolt, Uzum, website, Telegram — come to one window. Unified menu syncs with all channels. One analytics shows full picture.', uz: 'Barcha buyurtmalar — Glovo, Wolt, Uzum, sayt, Telegram dan — bitta oynaga keladi. Yagona menyu barcha kanallar bilan sinxronlanadi.' } }
    ],
    cta: { text: { ru: 'Объединить все каналы', en: 'Unify All Channels', uz: 'Barcha kanallarni birlashtirish' }, link: '/aggregators' },
    faq: [],
    relatedArticles: ['reduce-aggregator-commissions', 'glovo-for-restaurants'],
    relatedProducts: ['products/channels', 'aggregators/glovo']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — КУРЬЕРЫ
// ============================================
export const moreCourierArticles: KnowledgeArticle[] = [
  {
    slug: 'courier-salary-models',
    hub: 'courier-logistics',
    title: { ru: 'Модели оплаты курьеров — фикс, сделка или гибрид', en: 'Courier Payment Models — Fixed, Per-delivery or Hybrid', uz: 'Kuryerlar to\'lov modellari' },
    h1: { ru: 'Как платить курьерам: сравнение моделей', en: 'How to Pay Couriers: Model Comparison', uz: 'Kuryerlarga qanday to\'lash' },
    description: { ru: 'Сравнение моделей оплаты курьеров: фиксированная зарплата, оплата за доставку, гибридная модель. Что выгоднее.', en: 'Comparison of courier payment models: fixed salary, per-delivery payment, hybrid model. What\'s more profitable.', uz: 'Kuryer to\'lov modellarini taqqoslash.' },
    keywords: { ru: 'зарплата курьера, оплата курьеров, сколько платить курьеру', en: 'courier salary, courier payment, how much to pay courier', uz: 'kuryer maoshi' },
    intro: { ru: 'Правильная модель оплаты мотивирует курьеров работать быстрее и снижает текучку. Неправильная — увеличивает расходы или теряет людей.', en: 'Right payment model motivates couriers to work faster and reduces turnover. Wrong one increases costs or loses people.', uz: 'To\'g\'ri to\'lov modeli kuryerlarni tezroq ishlashga rag\'batlantiradi.' },
    sections: [
      { title: { ru: 'Фиксированная зарплата', en: 'Fixed Salary', uz: 'Qat\'iy maosh' }, content: { ru: 'Плюсы: стабильность, лояльность курьеров. Минусы: нет мотивации работать быстрее. Подходит для небольших объёмов (до 30 заказов/день).', en: 'Pros: stability, courier loyalty. Cons: no motivation to work faster. Suitable for small volumes (up to 30 orders/day).', uz: 'Afzalliklari: barqarorlik, kuryer sodiqligi. Kamchiliklari: tezroq ishlashga motivatsiya yo\'q.' } },
      { title: { ru: 'Оплата за доставку', en: 'Per-delivery Payment', uz: 'Yetkazish uchun to\'lov' }, content: { ru: 'Плюсы: курьеры мотивированы, расходы = доходам. Минусы: текучка выше, качество может страдать. Ставки: 15-25k сум/доставка.', en: 'Pros: couriers motivated, costs = revenue. Cons: higher turnover, quality may suffer. Rates: 15-25k UZS/delivery.', uz: 'Afzalliklari: kuryerlar motivatsiyalangan. Kamchiliklari: yuqori kadrlar almashinuvi.' } },
      { title: { ru: 'Гибридная модель', en: 'Hybrid Model', uz: 'Gibrid model' }, content: { ru: 'Минимальный оклад + бонус за каждую доставку. Пример: 2.5 млн/мес + 10k/доставка. Баланс стабильности и мотивации. Рекомендуем.', en: 'Minimum salary + bonus per delivery. Example: 2.5M/month + 10k/delivery. Balance of stability and motivation. Recommended.', uz: 'Minimal maosh + har bir yetkazish uchun bonus. Misol: 2.5 mln/oy + 10k/yetkazish.' } }
    ],
    cta: { text: { ru: 'Управление курьерами в Delever', en: 'Courier Management in Delever', uz: 'Deleverda kuryerlarni boshqarish' }, link: '/products/operations' },
    faq: [],
    relatedArticles: ['how-to-hire-couriers', 'delivery-zones-setup'],
    relatedProducts: ['products/operations']
  },
  {
    slug: 'courier-app-features',
    hub: 'courier-logistics',
    title: { ru: 'Приложение для курьеров — какие функции нужны', en: 'Courier App — What Features Are Needed', uz: 'Kuryerlar uchun ilova' },
    h1: { ru: 'Функции приложения для курьеров', en: 'Courier App Features', uz: 'Kuryer ilovasi funksiyalari' },
    description: { ru: 'Какие функции должны быть в приложении для курьеров: заказы, навигация, статусы, заработок.', en: 'What features should be in courier app: orders, navigation, statuses, earnings.', uz: 'Kuryer ilovasida qanday funksiyalar bo\'lishi kerak.' },
    keywords: { ru: 'приложение для курьеров, курьерское приложение, управление курьерами', en: 'courier app, courier application, courier management', uz: 'kuryerlar uchun ilova' },
    intro: { ru: 'Хорошее приложение для курьеров = быстрая доставка + довольные курьеры + меньше ошибок. Вот что должно быть обязательно.', en: 'Good courier app = fast delivery + happy couriers + fewer errors. Here\'s what must be included.', uz: 'Yaxshi kuryer ilovasi = tez yetkazish + xursand kuryerlar + kamroq xatolar.' },
    sections: [
      { title: { ru: 'Базовые функции', en: 'Basic Features', uz: 'Asosiy funksiyalar' }, content: { ru: 'Список заказов, детали заказа (адрес, телефон, комментарий), навигация (встроенная или ссылка на карты), смена статусов (принял, забрал, доставил).', en: 'Order list, order details (address, phone, comment), navigation (built-in or link to maps), status changes (accepted, picked up, delivered).', uz: 'Buyurtmalar ro\'yxati, buyurtma tafsilotlari, navigatsiya, statuslarni o\'zgartirish.' } },
      { title: { ru: 'Продвинутые функции', en: 'Advanced Features', uz: 'Ilg\'or funksiyalar' }, content: { ru: 'Статистика заработка в реальном времени, оптимизация маршрута (несколько заказов), чат с оператором/клиентом, фото подтверждение доставки.', en: 'Real-time earnings stats, route optimization (multiple orders), chat with operator/customer, delivery photo confirmation.', uz: 'Real vaqtda daromad statistikasi, marshrutni optimallashtirish, operator/mijoz bilan chat.' } }
    ],
    cta: { text: { ru: 'Приложение Delever для курьеров', en: 'Delever Courier App', uz: 'Kuryerlar uchun Delever ilovasi' }, link: '/products/operations' },
    faq: [],
    relatedArticles: ['how-to-hire-couriers', 'courier-salary-models'],
    relatedProducts: ['products/operations']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — ФИНАНСЫ
// ============================================
export const moreFinanceArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-profit-margins',
    hub: 'restaurant-finance',
    title: { ru: 'Маржинальность ресторана — какая норма и как увеличить', en: 'Restaurant Profit Margins — What\'s Normal and How to Increase', uz: 'Restoran marjinalligi' },
    h1: { ru: 'Маржинальность ресторана: нормы и оптимизация', en: 'Restaurant Margins: Norms and Optimization', uz: 'Restoran marjinalligi: me\'yorlar va optimallashtirish' },
    description: { ru: 'Какая маржинальность считается нормальной для ресторана и как её увеличить. Gross margin, net margin, EBITDA.', en: 'What profit margin is normal for restaurants and how to increase it. Gross margin, net margin, EBITDA.', uz: 'Restoran uchun qanday marjinallik normal hisoblanadi.' },
    keywords: { ru: 'маржинальность ресторана, прибыль ресторана, рентабельность ресторана', en: 'restaurant profit margin, restaurant profit, restaurant profitability', uz: 'restoran marjinalligi' },
    intro: { ru: 'Средняя чистая маржа ресторана: 3-9%. Кажется мало, но при правильном управлении можно достичь 15-20%. Разберём все метрики.', en: 'Average restaurant net margin: 3-9%. Seems low, but with proper management you can reach 15-20%.', uz: 'Restoranning o\'rtacha sof marjasi: 3-9%.' },
    sections: [
      { title: { ru: 'Типы маржинальности', en: 'Types of Margins', uz: 'Marjinallik turlari' }, content: { ru: 'Валовая (Gross): выручка - себестоимость продуктов = 65-75%. Операционная: после зарплат и аренды = 10-20%. Чистая: после всех расходов = 3-9%.', en: 'Gross: revenue - product cost = 65-75%. Operating: after salaries and rent = 10-20%. Net: after all expenses = 3-9%.', uz: 'Yalpi: daromad - mahsulot tannarxi = 65-75%. Operatsion: maosh va ijaradan keyin = 10-20%.' } },
      { title: { ru: 'Как увеличить маржу', en: 'How to Increase Margin', uz: 'Marjani qanday oshirish' }, content: { ru: '1) Оптимизировать фудкост (до 25-30%), 2) Увеличить средний чек (апселл), 3) Снизить потери (списания, воровство), 4) Автоматизация = экономия на персонале.', en: '1) Optimize food cost (to 25-30%), 2) Increase average check (upselling), 3) Reduce losses (waste, theft), 4) Automation = staff savings.', uz: '1) Food cost ni optimallashtirish, 2) O\'rtacha chekni oshirish, 3) Yo\'qotishlarni kamaytirish.' } }
    ],
    cta: { text: { ru: 'Аналитика прибыльности в Delever', en: 'Profitability Analytics in Delever', uz: 'Deleverda rentabellik analitikasi' }, link: '/products/analytics' },
    faq: [],
    relatedArticles: ['food-cost-calculation', 'restaurant-unit-economics'],
    relatedProducts: ['products/analytics']
  },
  {
    slug: 'restaurant-kpis',
    hub: 'restaurant-finance',
    title: { ru: 'KPI ресторана — какие метрики отслеживать', en: 'Restaurant KPIs — What Metrics to Track', uz: 'Restoran KPI lari' },
    h1: { ru: 'KPI ресторана: главные метрики успеха', en: 'Restaurant KPIs: Key Success Metrics', uz: 'Restoran KPI lari: muvaffaqiyatning asosiy metrikalari' },
    description: { ru: 'Ключевые KPI для ресторана: выручка, средний чек, конверсия, LTV, NPS. Как измерять и улучшать.', en: 'Key restaurant KPIs: revenue, average check, conversion, LTV, NPS. How to measure and improve.', uz: 'Restoran uchun asosiy KPI lar.' },
    keywords: { ru: 'kpi ресторана, метрики ресторана, аналитика ресторана', en: 'restaurant kpis, restaurant metrics, restaurant analytics', uz: 'restoran kpi' },
    intro: { ru: 'Что измеряем — тем управляем. Без KPI невозможно понять, растёт бизнес или падает. Вот главные метрики для ресторана.', en: 'What we measure — we manage. Without KPIs, it\'s impossible to understand if business is growing or falling.', uz: 'Nimani o\'lchaymiz — shuni boshqaramiz.' },
    sections: [
      { title: { ru: 'Финансовые KPI', en: 'Financial KPIs', uz: 'Moliyaviy KPI lar' }, content: { ru: 'Выручка (дневная/недельная/месячная), средний чек, food cost %, labor cost %, чистая прибыль. Норма food cost: 25-35%, labor cost: 25-35%.', en: 'Revenue (daily/weekly/monthly), average check, food cost %, labor cost %, net profit. Food cost norm: 25-35%, labor cost: 25-35%.', uz: 'Daromad, o\'rtacha chek, food cost %, labor cost %, sof foyda.' } },
      { title: { ru: 'Клиентские KPI', en: 'Customer KPIs', uz: 'Mijoz KPI lari' }, content: { ru: 'LTV (пожизненная ценность), CAC (стоимость привлечения), Retention Rate (% повторных), NPS (готовность рекомендовать), конверсия сайта/бота.', en: 'LTV (lifetime value), CAC (acquisition cost), Retention Rate, NPS (willingness to recommend), site/bot conversion.', uz: 'LTV, CAC, Retention Rate, NPS, sayt/bot konversiyasi.' } }
    ],
    cta: { text: { ru: 'Дашборд KPI в Delever', en: 'KPI Dashboard in Delever', uz: 'Deleverda KPI dashboard' }, link: '/products/analytics' },
    faq: [],
    relatedArticles: ['restaurant-profit-margins', 'restaurant-unit-economics'],
    relatedProducts: ['products/analytics']
  }
]

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СТАТЬИ — ОПЕРАЦИИ
// ============================================
export const moreOperationsArticles: KnowledgeArticle[] = [
  {
    slug: 'kitchen-display-system',
    hub: 'operations',
    title: { ru: 'KDS (Kitchen Display System) — экран для кухни', en: 'KDS (Kitchen Display System) — Kitchen Screen', uz: 'KDS — oshxona uchun ekran' },
    h1: { ru: 'KDS: как работает экран заказов на кухне', en: 'KDS: How Kitchen Order Screen Works', uz: 'KDS: oshxonada buyurtmalar ekrani qanday ishlaydi' },
    description: { ru: 'Что такое KDS, как он ускоряет работу кухни и снижает ошибки. Выбор и внедрение KDS в ресторане.', en: 'What is KDS, how it speeds up kitchen work and reduces errors. Choosing and implementing KDS.', uz: 'KDS nima, u oshxona ishini qanday tezlashtiradi.' },
    keywords: { ru: 'kds ресторан, экран для кухни, kitchen display system', en: 'kds restaurant, kitchen screen, kitchen display system', uz: 'kds restoran' },
    intro: { ru: 'KDS заменяет бумажные чеки на кухне. Заказы отображаются на экране, повара отмечают готовность. Ускоряет работу на 20-30% и убирает ошибки.', en: 'KDS replaces paper receipts in kitchen. Orders display on screen, cooks mark readiness. Speeds up work by 20-30% and eliminates errors.', uz: 'KDS oshxonada qog\'oz cheklarni almashtiradi.' },
    sections: [
      { title: { ru: 'Как работает KDS', en: 'How KDS Works', uz: 'KDS qanday ishlaydi' }, content: { ru: 'Заказ поступает → появляется на экране → повар нажимает "Готово" → заказ уходит курьеру/официанту. Цветовая кодировка: новый (синий), в работе (жёлтый), просрочен (красный).', en: 'Order comes in → appears on screen → cook clicks "Ready" → order goes to courier/waiter. Color coding: new (blue), in progress (yellow), overdue (red).', uz: 'Buyurtma keladi → ekranda paydo bo\'ladi → oshpaz "Tayyor" bosadi.' } },
      { title: { ru: 'Интеграция с Delever', en: 'Integration with Delever', uz: 'Delever bilan integratsiya' }, content: { ru: 'Delever передаёт заказы с сайта, Telegram, агрегаторов сразу на KDS (через iiko/R-Keeper или напрямую). Без ручного ввода.', en: 'Delever sends orders from website, Telegram, aggregators directly to KDS (via iiko/R-Keeper or directly). No manual entry.', uz: 'Delever sayt, Telegram, agregatorlardan buyurtmalarni to\'g\'ridan-to\'g\'ri KDS ga yuboradi.' } }
    ],
    cta: { text: { ru: 'Настроить KDS с Delever', en: 'Set Up KDS with Delever', uz: 'Delever bilan KDS sozlash' }, link: '/integrations' },
    faq: [],
    relatedArticles: ['restaurant-automation-guide', 'choose-pos-system'],
    relatedProducts: ['products/operations', 'integrations/iiko']
  },
  {
    slug: 'inventory-management-restaurant',
    hub: 'operations',
    title: { ru: 'Управление складом ресторана — контроль продуктов', en: 'Restaurant Inventory Management — Product Control', uz: 'Restoran omborini boshqarish' },
    h1: { ru: 'Управление складом: контролируйте запасы', en: 'Inventory Management: Control Your Stock', uz: 'Ombor boshqaruvi: zaxiralarni nazorat qiling' },
    description: { ru: 'Как управлять складом ресторана: учёт продуктов, списания, инвентаризация. Снижение потерь.', en: 'How to manage restaurant inventory: product accounting, write-offs, inventory. Reducing losses.', uz: 'Restoran omborini qanday boshqarish.' },
    keywords: { ru: 'склад ресторана, учёт продуктов, инвентаризация ресторан', en: 'restaurant inventory, product accounting, restaurant stocktaking', uz: 'restoran ombori' },
    intro: { ru: 'Потери на складе съедают 2-5% выручки. Правильный учёт и автоматизация снижают потери до 0.5-1%.', en: 'Inventory losses eat 2-5% of revenue. Proper accounting and automation reduce losses to 0.5-1%.', uz: 'Ombordagi yo\'qotishlar daromadning 2-5% ini yeydi.' },
    sections: [
      { title: { ru: 'Виды потерь', en: 'Types of Losses', uz: 'Yo\'qotish turlari' }, content: { ru: 'Порча (неправильное хранение), воровство (персонал), ошибки учёта (не списали), пересортица. Регулярная инвентаризация выявляет проблемы.', en: 'Spoilage (improper storage), theft (staff), accounting errors (not written off), grading issues. Regular inventory reveals problems.', uz: 'Buzilish, o\'g\'irlik, hisobdagi xatolar.' } },
      { title: { ru: 'Автоматизация учёта', en: 'Accounting Automation', uz: 'Hisobni avtomatlashtirish' }, content: { ru: 'POS-система (iiko, R-Keeper) автоматически списывает продукты при продаже. Интеграция с Delever = списание по всем каналам. Отчёты по остаткам и расходу.', en: 'POS system (iiko, R-Keeper) automatically writes off products on sale. Delever integration = write-off across all channels.', uz: 'POS-sistema sotishda mahsulotlarni avtomatik hisobdan chiqaradi.' } }
    ],
    cta: { text: { ru: 'Синхронизировать склад с Delever', en: 'Sync Inventory with Delever', uz: 'Delever bilan omborni sinxronlashtirish' }, link: '/integrations' },
    faq: [],
    relatedArticles: ['restaurant-automation-guide', 'food-cost-calculation'],
    relatedProducts: ['integrations/iiko', 'integrations/rkeeper']
  }
]

// ============================================
// СТАТЬИ ПРО МАРКЕТИНГ
// ============================================
export const marketingArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-marketing-strategy',
    hub: 'grow-sales',
    title: { ru: 'Маркетинг для ресторана: полный гайд', en: 'Restaurant Marketing Strategy: Complete Guide', uz: 'Restoran marketingi: to\'liq qo\'llanma' },
    h1: { ru: 'Как построить маркетинг ресторана с нуля', en: 'How to Build Restaurant Marketing from Scratch', uz: 'Restoran marketingini qanday boshlash' },
    description: { ru: 'Digital-маркетинг для ресторанов: социальные сети, email-рассылки, таргетинг, ретаргетинг. Увеличьте поток клиентов в 2 раза.', en: 'Digital marketing for restaurants: social media, email, targeting. Double your customer flow.', uz: 'Restoranlar uchun digital marketing: ijtimoiy tarmoqlar, email, targeting.' },
    keywords: { ru: 'маркетинг ресторана, реклама ресторана, продвижение ресторана', en: 'restaurant marketing, restaurant advertising, restaurant promotion', uz: 'restoran marketingi, restoran reklamasi' },
    intro: { ru: 'В 2024 году более 70% решений о заказе еды принимаются онлайн. Без грамотного digital-маркетинга ваш ресторан теряет 60-80% потенциальных клиентов.', en: 'In 2024, over 70% of food ordering decisions are made online. Without proper digital marketing, your restaurant loses 60-80% of potential customers.', uz: '2024 yilda ovqat buyurtma berish qarorlarining 70% dan ortig\'i onlayn qabul qilinadi.' },
    sections: [
      { title: { ru: 'Социальные сети', en: 'Social Media', uz: 'Ijtimoiy tarmoqlar' }, content: { ru: 'Instagram, TikTok, Facebook — какой контент работает. Food-съёмка, Reels, Stories. Оптимальная частота постинга: 5-7 раз в неделю.', en: 'Instagram, TikTok, Facebook — what content works. Food photography, Reels, Stories. Optimal posting frequency: 5-7 times per week.', uz: 'Instagram, TikTok, Facebook — qanday kontent ishlaydi.' } },
      { title: { ru: 'Email и Push', en: 'Email & Push', uz: 'Email va Push' }, content: { ru: 'Сегментация базы, триггерные рассылки, персонализация. Open rate хороших рассылок — 25%+.', en: 'Database segmentation, trigger campaigns, personalization. Good email open rate — 25%+.', uz: 'Bazani segmentatsiya qilish, trigger kampaniyalar, personalizatsiya.' } },
      { title: { ru: 'Таргетированная реклама', en: 'Targeted Ads', uz: 'Maqsadli reklama' }, content: { ru: 'Геотаргетинг по районам доставки, Look-alike аудитории, ретаргетинг по посетителям сайта.', en: 'Geo-targeting by delivery zones, Look-alike audiences, website visitor retargeting.', uz: 'Yetkazib berish zonalari bo\'yicha geo-targeting.' } }
    ],
    cta: { text: { ru: 'Запустить маркетинг с Delever', en: 'Launch Marketing with Delever', uz: 'Delever bilan marketingni boshlang' }, link: '/products/marketing' },
    faq: [
      { q: { ru: 'Сколько стоит маркетинг для ресторана?', en: 'How much does restaurant marketing cost?', uz: 'Restoran marketingi qancha turadi?' }, a: { ru: 'Минимальный бюджет — $500/месяц на рекламу + инструменты автоматизации. ROI при правильной настройке — 300-500%.', en: 'Minimum budget — $500/month for ads + automation tools. ROI with proper setup — 300-500%.', uz: 'Minimal byudjet — $500/oy reklama uchun + avtomatlashtirish vositalari.' } }
    ],
    relatedArticles: ['increase-average-check', 'loyalty-program-restaurant'],
    relatedProducts: ['products/marketing', 'products/analytics']
  },
  {
    slug: 'loyalty-program-restaurant',
    hub: 'grow-sales',
    title: { ru: 'Программа лояльности для ресторана', en: 'Restaurant Loyalty Program', uz: 'Restoran uchun sodiqlik dasturi' },
    h1: { ru: 'Как создать программу лояльности, которая работает', en: 'How to Create a Loyalty Program That Works', uz: 'Ishlayotgan sodiqlik dasturini qanday yaratish' },
    description: { ru: 'Кэшбэк, бонусы, уровни — какая программа лояльности лучше для вашего ресторана. Кейсы роста LTV на 100%.', en: 'Cashback, bonuses, tiers — which loyalty program is best for your restaurant. Cases of 100% LTV growth.', uz: 'Keshbek, bonuslar, darajalar — qaysi sodiqlik dasturi sizning restoraningiz uchun eng yaxshisi.' },
    keywords: { ru: 'программа лояльности ресторан, бонусы ресторан, кэшбэк ресторан', en: 'restaurant loyalty program, restaurant bonuses, restaurant cashback', uz: 'restoran sodiqlik dasturi, restoran bonuslari' },
    intro: { ru: 'Удержание клиента в 5 раз дешевле привлечения нового. Программа лояльности увеличивает частоту заказов на 30-50% и средний чек на 15-20%.', en: 'Retaining a customer is 5x cheaper than acquiring a new one. A loyalty program increases order frequency by 30-50% and average check by 15-20%.', uz: 'Mijozni saqlab qolish yangi mijozni jalb qilishdan 5 barobar arzon.' },
    sections: [
      { title: { ru: 'Типы программ лояльности', en: 'Types of Loyalty Programs', uz: 'Sodiqlik dasturlari turlari' }, content: { ru: 'Кэшбэк (5-10% на баланс) — самый популярный. Накопительные баллы — мотивируют больше тратить. Уровневая система — создаёт VIP-ощущение.', en: 'Cashback (5-10% to balance) — most popular. Points accumulation — motivates spending more. Tier system — creates VIP feeling.', uz: 'Keshbek (5-10% balansga) — eng mashhur.' } },
      { title: { ru: 'Бонусы на день рождения', en: 'Birthday Bonuses', uz: 'Tug\'ilgan kun bonuslari' }, content: { ru: 'Персональные акции на день рождения увеличивают конверсию в 10 раз. Оптимально: скидка 20% или бесплатное блюдо.', en: 'Personalized birthday offers increase conversion 10x. Optimal: 20% discount or free dish.', uz: 'Shaxsiylashtirilgan tug\'ilgan kun takliflari konversiyani 10 marta oshiradi.' } },
      { title: { ru: 'Автоматизация', en: 'Automation', uz: 'Avtomatlashtirish' }, content: { ru: 'Delever автоматически начисляет кэшбэк, отправляет push-уведомления и сегментирует клиентов по RFM.', en: 'Delever automatically awards cashback, sends push notifications and segments customers by RFM.', uz: 'Delever avtomatik ravishda keshbek beradi, push-bildirishnomalar yuboradi.' } }
    ],
    cta: { text: { ru: 'Запустить программу лояльности', en: 'Launch Loyalty Program', uz: 'Sodiqlik dasturini ishga tushiring' }, link: '/products/marketing' },
    faq: [
      { q: { ru: 'Какой процент кэшбэка оптимален?', en: 'What cashback percentage is optimal?', uz: 'Qanday keshbek foizi optimal?' }, a: { ru: '5% для большинства ресторанов. 7-10% для суши и пиццы с высокой маржой.', en: '5% for most restaurants. 7-10% for sushi and pizza with high margins.', uz: 'Ko\'pchilik restoranlar uchun 5%.' } }
    ],
    relatedArticles: ['increase-average-check', 'restaurant-marketing-strategy'],
    relatedProducts: ['products/marketing', 'products/channels']
  }
]

// ============================================
// СТАТЬИ ПРО ТЕХНОЛОГИИ
// ============================================
export const techArticles: KnowledgeArticle[] = [
  {
    slug: 'restaurant-website-development',
    hub: 'launch-delivery',
    title: { ru: 'Создание сайта для ресторана', en: 'Restaurant Website Development', uz: 'Restoran uchun sayt yaratish' },
    h1: { ru: 'Как создать продающий сайт ресторана', en: 'How to Create a Converting Restaurant Website', uz: 'Sotuvchi restoran saytini qanday yaratish' },
    description: { ru: 'Что должен включать сайт ресторана: меню, корзина, онлайн-оплата. Стоимость разработки и готовые решения.', en: 'What a restaurant website should include: menu, cart, online payment. Development cost and ready solutions.', uz: 'Restoran sayti nimalarni o\'z ichiga olishi kerak: menyu, savatcha, onlayn to\'lov.' },
    keywords: { ru: 'сайт ресторана, разработка сайта доставки, заказать сайт ресторана', en: 'restaurant website, delivery website development, order restaurant website', uz: 'restoran sayti, yetkazib berish sayti ishlab chiqish' },
    intro: { ru: 'Собственный сайт — это 0% комиссии (против 25-30% у агрегаторов). При среднем чеке $15 и 1000 заказов/месяц экономия составит $3750-4500.', en: 'Your own website means 0% commission (vs 25-30% from aggregators). With $15 average check and 1000 orders/month, savings are $3750-4500.', uz: 'O\'z saytingiz — 0% komissiya (agregatorlardagi 25-30% o\'rniga).' },
    sections: [
      { title: { ru: 'Обязательные элементы', en: 'Must-Have Elements', uz: 'Majburiy elementlar' }, content: { ru: 'Меню с фото, корзина, онлайн-оплата (Payme, Click), интеграция с POS, отслеживание заказа, адаптивный дизайн.', en: 'Menu with photos, cart, online payment, POS integration, order tracking, responsive design.', uz: 'Rasmli menyu, savatcha, onlayn to\'lov, POS integratsiyasi.' } },
      { title: { ru: 'Стоимость разработки', en: 'Development Cost', uz: 'Ishlab chiqish narxi' }, content: { ru: 'Разработка с нуля: $3000-10000. Готовое решение от Delever: от $0 (включено в тариф).', en: 'Custom development: $3000-10000. Ready solution from Delever: from $0 (included in plan).', uz: 'Noldan ishlab chiqish: $3000-10000. Deleverdan tayyor yechim: $0 dan (tarifga kiritilgan).' } },
      { title: { ru: 'SEO для ресторана', en: 'Restaurant SEO', uz: 'Restoran SEO' }, content: { ru: 'Локальное SEO: Google Maps, Яндекс.Карты. Ключевые слова: "доставка суши [город]", "пицца на дом [район]".', en: 'Local SEO: Google Maps. Keywords: "sushi delivery [city]", "pizza delivery [district]".', uz: 'Mahalliy SEO: Google Maps. Kalit so\'zlar: "sushi yetkazib berish [shahar]".' } }
    ],
    cta: { text: { ru: 'Получить сайт бесплатно', en: 'Get Website Free', uz: 'Saytni bepul oling' }, link: '/products/channels' },
    faq: [
      { q: { ru: 'Сколько времени занимает создание сайта?', en: 'How long does website creation take?', uz: 'Sayt yaratish qancha vaqt oladi?' }, a: { ru: 'С Delever — 1-2 дня. Кастомная разработка — 2-4 недели.', en: 'With Delever — 1-2 days. Custom development — 2-4 weeks.', uz: 'Delever bilan — 1-2 kun. Maxsus ishlab chiqish — 2-4 hafta.' } }
    ],
    relatedArticles: ['telegram-bot-restaurant', 'mobile-app-restaurant'],
    relatedProducts: ['products/channels', 'integrations/payme']
  },
  {
    slug: 'telegram-bot-restaurant',
    hub: 'launch-delivery',
    title: { ru: 'Telegram-бот для ресторана', en: 'Telegram Bot for Restaurant', uz: 'Restoran uchun Telegram-bot' },
    h1: { ru: 'Как создать Telegram-бот для заказа еды', en: 'How to Create a Telegram Bot for Food Ordering', uz: 'Ovqat buyurtma berish uchun Telegram-bot qanday yaratish' },
    description: { ru: 'Telegram-бот для ресторана: меню, корзина, оплата, отслеживание. 40% заказов в СНГ идут через Telegram.', en: 'Telegram bot for restaurant: menu, cart, payment, tracking. 40% of orders in CIS go through Telegram.', uz: 'Restoran uchun Telegram-bot: menyu, savatcha, to\'lov, kuzatish.' },
    keywords: { ru: 'телеграм бот ресторан, бот доставки еды, заказ еды телеграм', en: 'telegram bot restaurant, food delivery bot, order food telegram', uz: 'restoran telegram bot, ovqat yetkazib berish bot' },
    intro: { ru: 'В Узбекистане 15+ млн пользователей Telegram. Бот позволяет принимать заказы прямо в мессенджере без комиссий агрегаторов.', en: 'Uzbekistan has 15+ million Telegram users. Bot allows taking orders directly in messenger without aggregator commissions.', uz: 'O\'zbekistonda 15+ million Telegram foydalanuvchilari bor.' },
    sections: [
      { title: { ru: 'Функции бота', en: 'Bot Features', uz: 'Bot funksiyalari' }, content: { ru: 'Интерактивное меню, модификаторы (без лука, соус), корзина, онлайн-оплата, реферальная программа, push-уведомления.', en: 'Interactive menu, modifiers (no onion, sauce), cart, online payment, referral program, push notifications.', uz: 'Interaktiv menyu, modifikatorlar, savatcha, onlayn to\'lov.' } },
      { title: { ru: 'Преимущества', en: 'Advantages', uz: 'Afzalliklar' }, content: { ru: 'Нет нужды устанавливать приложение. Мгновенные push-уведомления. Легко делиться с друзьями. Open rate — 90%+.', en: 'No need to install app. Instant push notifications. Easy to share with friends. Open rate — 90%+.', uz: 'Ilova o\'rnatish shart emas. Tezkor push-bildirishnomalar.' } },
      { title: { ru: 'Интеграция', en: 'Integration', uz: 'Integratsiya' }, content: { ru: 'Бот синхронизируется с POS, CRM и курьерским приложением. Заказы автоматически попадают на кухню.', en: 'Bot syncs with POS, CRM and courier app. Orders automatically go to kitchen.', uz: 'Bot POS, CRM va kuryer ilovasi bilan sinxronlashadi.' } }
    ],
    cta: { text: { ru: 'Получить Telegram-бот', en: 'Get Telegram Bot', uz: 'Telegram-bot oling' }, link: '/products/channels' },
    faq: [
      { q: { ru: 'Сколько стоит Telegram-бот для ресторана?', en: 'How much does a Telegram bot for restaurant cost?', uz: 'Restoran uchun Telegram-bot qancha turadi?' }, a: { ru: 'От $0 — включен в тариф Delever. Кастомная разработка — $1000-3000.', en: 'From $0 — included in Delever plan. Custom development — $1000-3000.', uz: '$0 dan — Delever tarifiga kiritilgan.' } }
    ],
    relatedArticles: ['restaurant-website-development', 'mobile-app-restaurant'],
    relatedProducts: ['products/channels', 'integrations/telegram']
  },
  {
    slug: 'mobile-app-restaurant',
    hub: 'launch-delivery',
    title: { ru: 'Мобильное приложение для ресторана', en: 'Mobile App for Restaurant', uz: 'Restoran uchun mobil ilova' },
    h1: { ru: 'Нужно ли ресторану своё мобильное приложение?', en: 'Does Your Restaurant Need Its Own Mobile App?', uz: 'Restoraningizga o\'z mobil ilovasi kerakmi?' },
    description: { ru: 'Когда ресторану нужно приложение: критерии выбора, стоимость, альтернативы. ROI мобильного приложения.', en: 'When restaurant needs an app: selection criteria, cost, alternatives. Mobile app ROI.', uz: 'Restoranga ilova qachon kerak: tanlov mezonlari, narxi, alternativalar.' },
    keywords: { ru: 'мобильное приложение ресторан, приложение доставки еды, разработка приложения ресторан', en: 'restaurant mobile app, food delivery app, restaurant app development', uz: 'restoran mobil ilovasi, ovqat yetkazib berish ilovasi' },
    intro: { ru: 'Мобильное приложение стоит $10000-50000. Но есть альтернативы: Telegram-бот и PWA дают 80% функций при нулевых затратах.', en: 'Mobile app costs $10000-50000. But there are alternatives: Telegram bot and PWA give 80% functionality at zero cost.', uz: 'Mobil ilova $10000-50000 turadi. Lekin alternativalar bor.' },
    sections: [
      { title: { ru: 'Когда нужно приложение', en: 'When You Need an App', uz: 'Ilova qachon kerak' }, content: { ru: 'Более 3000 заказов/месяц. Сеть из 5+ точек. Бюджет на маркетинг $5000+/месяц. Развитая программа лояльности.', en: 'More than 3000 orders/month. Chain of 5+ locations. Marketing budget $5000+/month. Developed loyalty program.', uz: 'Oyiga 3000 dan ortiq buyurtma. 5+ filialdan iborat tarmoq.' } },
      { title: { ru: 'Альтернативы', en: 'Alternatives', uz: 'Alternativalar' }, content: { ru: 'Telegram-бот: 90% функций, 0 затрат. PWA: работает как приложение, не требует установки. White Label: готовое брендированное приложение.', en: 'Telegram bot: 90% features, 0 cost. PWA: works like app, no installation. White Label: ready branded app.', uz: 'Telegram-bot: 90% funksiyalar, 0 xarajat. PWA: ilova kabi ishlaydi.' } },
      { title: { ru: 'White Label от Delever', en: 'White Label from Delever', uz: 'Deleverdan White Label' }, content: { ru: 'Готовое приложение в App Store и Google Play с вашим брендингом. Срок: 2 недели. Стоимость: от $2000.', en: 'Ready app in App Store and Google Play with your branding. Timeline: 2 weeks. Cost: from $2000.', uz: 'App Store va Google Playda sizning brendingiz bilan tayyor ilova.' } }
    ],
    cta: { text: { ru: 'Заказать White Label', en: 'Order White Label', uz: 'White Label buyurtma qiling' }, link: '/white-label' },
    faq: [
      { q: { ru: 'Сколько стоит разработка приложения?', en: 'How much does app development cost?', uz: 'Ilova ishlab chiqish qancha turadi?' }, a: { ru: 'Кастомная разработка: $15000-50000. White Label: от $2000. Telegram-бот: бесплатно.', en: 'Custom development: $15000-50000. White Label: from $2000. Telegram bot: free.', uz: 'Maxsus ishlab chiqish: $15000-50000. White Label: $2000 dan.' } }
    ],
    relatedArticles: ['telegram-bot-restaurant', 'restaurant-website-development'],
    relatedProducts: ['white-label', 'products/channels']
  }
]

// ============================================
// СТАТЬИ ПРО ПРОДУКТЫ
// ============================================
export const productArticles: KnowledgeArticle[] = [
  {
    slug: 'how-to-choose-delivery-platform',
    hub: 'launch-delivery',
    title: { ru: 'Как выбрать платформу для доставки', en: 'How to Choose a Delivery Platform', uz: 'Yetkazib berish platformasini qanday tanlash' },
    h1: { ru: 'Сравнение платформ для управления доставкой', en: 'Comparison of Delivery Management Platforms', uz: 'Yetkazib berish boshqaruv platformalarini taqqoslash' },
    description: { ru: 'Delever vs iiko vs R-Keeper — что выбрать? Критерии выбора платформы: интеграции, функции, цены.', en: 'Delever vs iiko vs R-Keeper — what to choose? Platform selection criteria: integrations, features, prices.', uz: 'Delever vs iiko vs R-Keeper — nimani tanlash kerak?' },
    keywords: { ru: 'платформа доставки, управление доставкой, delever vs iiko', en: 'delivery platform, delivery management, delever vs iiko', uz: 'yetkazib berish platformasi, yetkazib berishni boshqarish' },
    intro: { ru: 'iiko и R-Keeper — это POS-системы (учёт, касса). Delever — это слой доставки поверх POS: принимает заказы, управляет курьерами, интегрирует агрегаторы.', en: 'iiko and R-Keeper are POS systems (accounting, cash register). Delever is a delivery layer on top of POS: takes orders, manages couriers, integrates aggregators.', uz: 'iiko va R-Keeper — POS tizimlari. Delever — POS ustidagi yetkazib berish qatlami.' },
    sections: [
      { title: { ru: 'Что делает POS', en: 'What POS Does', uz: 'POS nima qiladi' }, content: { ru: 'Касса, учёт товаров, склад, себестоимость, финансовая отчётность. Не предназначена для онлайн-заказов и доставки.', en: 'Cash register, inventory, warehouse, cost calculation, financial reporting. Not designed for online orders and delivery.', uz: 'Kassa, tovarlar hisobi, ombor, tannarx, moliyaviy hisobot.' } },
      { title: { ru: 'Что делает Delever', en: 'What Delever Does', uz: 'Delever nima qiladi' }, content: { ru: 'Сайт, Telegram-бот, приложение, интеграция с Glovo/Wolt/Uzum, CRM, программа лояльности, курьерское приложение, аналитика.', en: 'Website, Telegram bot, app, Glovo/Wolt/Uzum integration, CRM, loyalty program, courier app, analytics.', uz: 'Sayt, Telegram-bot, ilova, Glovo/Wolt/Uzum integratsiyasi, CRM.' } },
      { title: { ru: 'Как это работает вместе', en: 'How It Works Together', uz: 'Bu qanday birga ishlaydi' }, content: { ru: 'Delever принимает заказ → отправляет в iiko/R-Keeper → кухня готовит → Delever распределяет курьера → клиент получает заказ.', en: 'Delever takes order → sends to iiko/R-Keeper → kitchen prepares → Delever assigns courier → customer receives order.', uz: 'Delever buyurtma qabul qiladi → iiko/R-Keeperga yuboradi → oshxona tayyorlaydi.' } }
    ],
    cta: { text: { ru: 'Подключить Delever к POS', en: 'Connect Delever to POS', uz: 'Delever ni POS ga ulang' }, link: '/integrations' },
    faq: [
      { q: { ru: 'Можно ли использовать Delever без POS?', en: 'Can Delever be used without POS?', uz: 'Deleverdan POS siz foydalanish mumkinmi?' }, a: { ru: 'Да, Delever может работать автономно для небольших заведений.', en: 'Yes, Delever can work standalone for small establishments.', uz: 'Ha, Delever kichik korxonalar uchun mustaqil ishlashi mumkin.' } }
    ],
    relatedArticles: ['iiko-integration-guide', 'rkeeper-vs-iiko'],
    relatedProducts: ['integrations/iiko', 'integrations/rkeeper']
  },
  {
    slug: 'restaurant-analytics-guide',
    hub: 'operations',
    title: { ru: 'Аналитика для ресторана', en: 'Restaurant Analytics', uz: 'Restoran tahlili' },
    h1: { ru: 'Какие метрики отслеживать ресторану', en: 'What Metrics Should Restaurant Track', uz: 'Restoran qanday ko\'rsatkichlarni kuzatishi kerak' },
    description: { ru: 'Ключевые KPI ресторанного бизнеса: выручка, средний чек, food cost, время доставки. Как анализировать и улучшать.', en: 'Key restaurant business KPIs: revenue, average check, food cost, delivery time. How to analyze and improve.', uz: 'Restoran biznesining asosiy KPI lari: daromad, o\'rtacha chek, food cost.' },
    keywords: { ru: 'аналитика ресторана, KPI ресторана, метрики доставки', en: 'restaurant analytics, restaurant KPI, delivery metrics', uz: 'restoran tahlili, restoran KPI' },
    intro: { ru: 'Без аналитики вы управляете вслепую. 73% успешных ресторанов используют data-driven подход к принятию решений.', en: 'Without analytics you\'re managing blind. 73% of successful restaurants use data-driven decision making.', uz: 'Tahlilsiz siz ko\'r-ko\'rona boshqarasiz.' },
    sections: [
      { title: { ru: 'Финансовые метрики', en: 'Financial Metrics', uz: 'Moliyaviy ko\'rsatkichlar' }, content: { ru: 'Выручка (общая, по каналам), средний чек, food cost (цель: 25-30%), labor cost (цель: 20-25%), чистая прибыль (цель: 10-15%).', en: 'Revenue (total, by channel), average check, food cost (target: 25-30%), labor cost (target: 20-25%), net profit (target: 10-15%).', uz: 'Daromad, o\'rtacha chek, food cost (maqsad: 25-30%), labor cost (maqsad: 20-25%).' } },
      { title: { ru: 'Операционные метрики', en: 'Operational Metrics', uz: 'Operatsion ko\'rsatkichlar' }, content: { ru: 'Время доставки (цель: <40 мин), время приготовления (<15 мин), % опозданий (<5%), отмены заказов (<3%).', en: 'Delivery time (target: <40 min), prep time (<15 min), late delivery rate (<5%), order cancellations (<3%).', uz: 'Yetkazib berish vaqti (maqsad: <40 daq), tayyorlash vaqti (<15 daq).' } },
      { title: { ru: 'Клиентские метрики', en: 'Customer Metrics', uz: 'Mijoz ko\'rsatkichlari' }, content: { ru: 'LTV клиента, частота заказов, % повторных заказов, NPS, retention rate, CAC.', en: 'Customer LTV, order frequency, repeat order rate, NPS, retention rate, CAC.', uz: 'Mijoz LTV, buyurtma chastotasi, takroriy buyurtmalar foizi.' } }
    ],
    cta: { text: { ru: 'Подключить аналитику', en: 'Connect Analytics', uz: 'Tahlilni ulang' }, link: '/products/analytics' },
    faq: [
      { q: { ru: 'Как часто смотреть аналитику?', en: 'How often to check analytics?', uz: 'Tahlilni qanchalik tez-tez tekshirish kerak?' }, a: { ru: 'Ежедневно: выручка, заказы. Еженедельно: каналы, курьеры. Ежемесячно: food cost, LTV, unit-экономика.', en: 'Daily: revenue, orders. Weekly: channels, couriers. Monthly: food cost, LTV, unit economics.', uz: 'Kundalik: daromad, buyurtmalar. Haftalik: kanallar, kuryerlar.' } }
    ],
    relatedArticles: ['unit-economics-restaurant', 'food-cost-optimization'],
    relatedProducts: ['products/analytics', 'products/operations']
  }
]

// ============================================
// СТАТЬИ ПРО СПЕЦИАЛИЗАЦИИ
// ============================================
export const specialtyArticles: KnowledgeArticle[] = [
  {
    slug: 'coffee-shop-delivery',
    hub: 'open-restaurant',
    title: { ru: 'Доставка из кофейни', en: 'Coffee Shop Delivery', uz: 'Kofe do\'konidan yetkazib berish' },
    h1: { ru: 'Как запустить доставку из кофейни', en: 'How to Launch Coffee Shop Delivery', uz: 'Kofe do\'konidan yetkazib berishni qanday boshlash' },
    description: { ru: 'Особенности доставки кофе и десертов: упаковка, температура, скорость. Как сохранить качество продукта.', en: 'Coffee and dessert delivery specifics: packaging, temperature, speed. How to maintain product quality.', uz: 'Qahva va desertlarni yetkazib berishning o\'ziga xos xususiyatlari.' },
    keywords: { ru: 'доставка кофе, доставка кофейня, кофе на дом', en: 'coffee delivery, coffee shop delivery, coffee at home', uz: 'qahva yetkazib berish, kofe do\'konidan yetkazib berish' },
    intro: { ru: 'Рынок доставки кофе вырос на 180% за 2023 год. Средний чек доставки из кофейни на 40% выше чем в зале.', en: 'Coffee delivery market grew 180% in 2023. Average delivery check from coffee shop is 40% higher than in-store.', uz: '2023 yilda qahva yetkazib berish bozori 180% ga o\'sdi.' },
    sections: [
      { title: { ru: 'Упаковка', en: 'Packaging', uz: 'Qadoqlash' }, content: { ru: 'Термостаканы с двойной стенкой. Герметичные крышки. Отдельная сумка-термос для курьера. Время доставки кофе: максимум 20 минут.', en: 'Double-wall thermal cups. Leak-proof lids. Separate thermal bag for courier. Coffee delivery time: max 20 minutes.', uz: 'Ikki devorli termo stakanlar. Germetik qopqoqlar.' } },
      { title: { ru: 'Ассортимент', en: 'Assortment', uz: 'Assortiment' }, content: { ru: 'Добавьте десерты и выпечку: увеличивают средний чек на 60%. Cold brew и Ice Latte — лучшие позиции для доставки (не требуют температуры).', en: 'Add desserts and pastries: increase average check by 60%. Cold brew and Ice Latte — best delivery items (no temperature required).', uz: 'Desertlar va pishiriqlar qo\'shing: o\'rtacha chekni 60% ga oshiradi.' } },
      { title: { ru: 'Зона доставки', en: 'Delivery Zone', uz: 'Yetkazib berish zonasi' }, content: { ru: 'Оптимальный радиус для кофе: 2-3 км. Время от заказа до получения: 15-20 минут. Бесплатная доставка от 200 000 сум.', en: 'Optimal radius for coffee: 2-3 km. Time from order to receipt: 15-20 minutes. Free delivery from 200,000 sum.', uz: 'Qahva uchun optimal radius: 2-3 km.' } }
    ],
    cta: { text: { ru: 'Запустить доставку кофе', en: 'Launch Coffee Delivery', uz: 'Qahva yetkazib berishni boshlang' }, link: '/solutions/coffee-shop' },
    faq: [
      { q: { ru: 'Как сохранить кофе горячим?', en: 'How to keep coffee hot?', uz: 'Qahvani issiq saqlash qanday?' }, a: { ru: 'Термостаканы + сумка-термос + доставка до 20 минут. Предупреждайте клиента о температуре.', en: 'Thermal cups + thermal bag + delivery under 20 minutes. Warn customer about temperature.', uz: 'Termo stakanlar + termo sumka + 20 daqiqagacha yetkazib berish.' } }
    ],
    relatedArticles: ['bakery-delivery', 'dessert-shop-delivery'],
    relatedProducts: ['solutions/coffee-shop', 'products/channels']
  },
  {
    slug: 'grocery-delivery',
    hub: 'open-restaurant',
    title: { ru: 'Доставка продуктов', en: 'Grocery Delivery', uz: 'Oziq-ovqat yetkazib berish' },
    h1: { ru: 'Как запустить доставку продуктов', en: 'How to Launch Grocery Delivery', uz: 'Oziq-ovqat yetkazib berishni qanday boshlash' },
    description: { ru: 'Grocery delivery для магазинов: особенности логистики, температурный режим, управление запасами.', en: 'Grocery delivery for stores: logistics specifics, temperature control, inventory management.', uz: 'Do\'konlar uchun oziq-ovqat yetkazib berish: logistika xususiyatlari.' },
    keywords: { ru: 'доставка продуктов, grocery delivery, доставка из магазина', en: 'grocery delivery, store delivery, product delivery', uz: 'oziq-ovqat yetkazib berish, do\'kondan yetkazib berish' },
    intro: { ru: 'Рынок grocery delivery в СНГ растёт на 35% ежегодно. Средний чек: $25-40. Маржинальность: 15-25%.', en: 'Grocery delivery market in CIS grows 35% annually. Average check: $25-40. Margin: 15-25%.', uz: 'MDHda oziq-ovqat yetkazib berish bozori yiliga 35% o\'smoqda.' },
    sections: [
      { title: { ru: 'Температурный режим', en: 'Temperature Control', uz: 'Harorat rejimi' }, content: { ru: 'Три зоны: охлаждённые (молочка, мясо), замороженные (мороженое, полуфабрикаты), сухие (консервы, напитки). Сумки-термосы обязательны.', en: 'Three zones: chilled (dairy, meat), frozen (ice cream, semi-finished), dry (canned, drinks). Thermal bags required.', uz: 'Uch zona: sovutilgan (sut, go\'sht), muzlatilgan, quruq.' } },
      { title: { ru: 'Сборка заказа', en: 'Order Picking', uz: 'Buyurtma yig\'ish' }, content: { ru: 'Пикер собирает заказ за 10-15 минут. WMS-система с местоположением товаров. Проверка сроков годности обязательна.', en: 'Picker collects order in 10-15 minutes. WMS system with product locations. Expiry date check required.', uz: 'Pikker buyurtmani 10-15 daqiqada yig\'adi.' } },
      { title: { ru: 'Интеграция', en: 'Integration', uz: 'Integratsiya' }, content: { ru: 'Delever синхронизирует остатки с 1С, автоматически обновляет стоп-листы, управляет курьерами.', en: 'Delever syncs inventory with 1C, automatically updates stop-lists, manages couriers.', uz: 'Delever qoldiqlarni 1C bilan sinxronlaydi.' } }
    ],
    cta: { text: { ru: 'Запустить grocery delivery', en: 'Launch Grocery Delivery', uz: 'Oziq-ovqat yetkazib berishni boshlang' }, link: '/solutions/grocery' },
    faq: [
      { q: { ru: 'Какой минимальный заказ для доставки продуктов?', en: 'What is minimum order for grocery delivery?', uz: 'Oziq-ovqat yetkazib berish uchun minimal buyurtma qancha?' }, a: { ru: 'Рекомендуем от $15-20 или бесплатная доставка от $30.', en: 'Recommend from $15-20 or free delivery from $30.', uz: '$15-20 dan yoki $30 dan bepul yetkazib berishni tavsiya qilamiz.' } }
    ],
    relatedArticles: ['pharmacy-delivery', 'marketplace-delivery'],
    relatedProducts: ['solutions/grocery', 'products/operations']
  }
]

// ============================================
// ВСЕ СТАТЬИ
// ============================================
export const allKnowledgeArticles: KnowledgeArticle[] = [
  ...openRestaurantArticles,
  ...moreOpenRestaurantArticles,
  ...launchDeliveryArticles,
  ...moreLaunchDeliveryArticles,
  ...growSalesArticles,
  ...moreGrowSalesArticles,
  ...aggregatorArticles,
  ...moreAggregatorArticles,
  ...financeArticles,
  ...moreFinanceArticles,
  ...operationsArticles,
  ...moreOperationsArticles,
  ...posArticles,
  ...darkKitchenArticles,
  ...hrArticles,
  ...moreCourierArticles,
  ...marketingArticles,
  ...techArticles,
  ...productArticles,
  ...specialtyArticles
]

// Получить статью по slug
export function getKnowledgeArticle(slug: string): KnowledgeArticle | undefined {
  return allKnowledgeArticles.find(a => a.slug === slug)
}

// Получить статьи по хабу
export function getArticlesByHub(hub: string): KnowledgeArticle[] {
  return allKnowledgeArticles.filter(a => a.hub === hub)
}

// Получить все хабы
export function getAllHubs() {
  return Object.values(knowledgeHubs)
}
