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
// ВСЕ СТАТЬИ
// ============================================
export const allKnowledgeArticles: KnowledgeArticle[] = [
  ...openRestaurantArticles,
  ...launchDeliveryArticles,
  ...growSalesArticles,
  ...aggregatorArticles,
  ...financeArticles,
  ...operationsArticles,
  ...posArticles,
  ...darkKitchenArticles,
  ...hrArticles
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
