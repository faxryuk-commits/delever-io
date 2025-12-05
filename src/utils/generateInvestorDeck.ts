import type { Language } from '@/i18n/translations'

// Delever logo SVG - White version (for dark backgrounds)
const LOGO_WHITE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1930 521" style="height: 60px; width: auto;">
  <defs>
    <linearGradient id="grad1" x1="-278.91" y1="759.37" x2="-278.91" y2="249.6" gradientTransform="translate(539.04 765.27) scale(1 -1)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#afdbd9"/><stop offset="1" stop-color="#f3e9dd"/>
    </linearGradient>
  </defs>
  <path fill="url(#grad1)" d="M348.26,5.89h-176.26C80.31,5.89,5.97,80.44,5.97,172.4v176.76c0,91.96,74.34,166.51,166.03,166.51h176.26c91.7,0,166.03-74.55,166.03-166.51v-176.76c0-91.96-74.34-166.51-166.03-166.51Z"/>
  <path fill="#152b45" d="M306.57,149.72h-164.65l-7.54,42.97h172.56l7.18,29.45h-184.88l-4.13,23.56h152.98l7.18,29.45H120.02l-4.13,23.56h131.45l7.18,29.45H110.74l-7.54,42.97h203.37c60.9,0,110.42-49.66,110.42-110.74s-49.52-110.74-110.42-110.74v.07Z"/>
  <path fill="#fff" d="M852.26,187.43c-6.45-7.68-14.47-13.91-23.93-18.58-11.02-5.34-23.93-8.01-38.39-8.01-17.92,0-34.28,4.23-48.52,12.79-14.36,8.46-25.71,20.58-33.94,36.05-8.12,15.47-12.35,33.49-12.35,53.74s4.12,39.05,12.13,54.41c8.01,15.47,19.36,27.48,33.72,35.71,14.25,8.23,30.72,12.35,48.97,12.35,26.38,0,47.63-10.01,63.43-29.71l4.67,27.37h39.17V90.75h-44.74v96.69h-.22ZM837.23,217.14c10.24,11.91,15.47,27.59,15.47,46.95s-5.23,34.27-15.36,45.95c-10.13,11.68-23.82,17.58-40.4,17.58s-30.27-6.01-40.4-17.8c-10.24-11.79-15.36-27.48-15.36-46.51s5.23-34.27,15.36-46.17c10.13-11.79,23.82-17.8,40.4-17.8s30.27,6.01,40.4,17.8h-.11Z"/>
  <path fill="#fff" d="M1068.26,172.63c-14.69-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.63,12.68c-14.69,8.46-26.26,20.58-34.5,36.05-8.23,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.59,27.37,36.06,35.83,15.47,8.46,33.72,12.68,54.53,12.68,23.93,0,44.07-6.56,60.09-19.58,16.02-13.02,26.04-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.69,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.69,0-28.38-4.9-37.73-14.57-9.46-9.68-14.69-23.03-15.69-39.72v-.78h148.45l.22-1.34c.78-5.45,1.12-10.79,1.12-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.26-25.48-34.95-33.38l.11.22ZM966.33,241.73c1.56-13.91,7.23-24.92,17.14-33.27,9.9-8.34,21.59-12.57,35.28-12.57,14.69,0,26.82,4.01,36.39,12.13,9.68,8.12,15.36,19.36,17.14,33.71h-105.94Z"/>
  <path fill="#fff" d="M1183.67,90.75h-44.74v272.81h44.74V90.75Z"/>
  <path fill="#fff" d="M1354.82,172.63c-14.68-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.64,12.68c-14.68,8.46-26.26,20.58-34.5,36.05-8.23,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.59,27.37,36.06,35.83,15.47,8.46,33.72,12.68,54.53,12.68,23.92,0,44.07-6.56,60.09-19.58,16.03-13.02,26.05-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.7,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.7,0-28.38-4.9-37.72-14.57-9.46-9.68-14.69-23.14-15.7-39.72v-.78h148.45l.23-1.34c.77-5.45,1.11-10.79,1.11-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.25-25.48-34.94-33.38l.11.22ZM1253,241.73c1.56-13.91,7.24-24.92,17.13-33.27,9.91-8.34,21.59-12.57,35.28-12.57,14.69,0,26.82,4.01,36.39,12.13,9.68,8.12,15.36,19.36,17.13,33.71h-105.94Z"/>
  <path fill="#fff" d="M1598.54,163.18h-47.3l-52.42,149.31-52.86-148.31-.44-1h-47.97l73.56,199.27.34,1.11h53.08l74.01-200.38Z"/>
  <path fill="#fff" d="M1741.65,172.63c-14.69-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.64,12.68c-14.69,8.46-26.27,20.58-34.5,36.05-8.24,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.58,27.37,36.06,35.83,15.47,8.46,33.71,12.68,54.53,12.68,23.92,0,44.07-6.56,60.09-19.58,16.02-13.02,26.04-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.7,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.7,0-28.38-4.9-37.73-14.57-9.46-9.68-14.68-23.03-15.68-39.72v-.78h148.45l.23-1.34c.77-5.45,1.22-10.9,1.22-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.14-25.48-34.94-33.38v.22ZM1639.83,241.73c1.56-13.91,7.23-24.92,17.13-33.27,9.91-8.34,21.59-12.57,35.28-12.57,14.68,0,26.81,4.01,36.38,12.13,9.58,8.12,15.36,19.36,17.14,33.71h-105.94Z"/>
  <path fill="#fff" d="M1913.7,163.18c-15.36,0-27.82,2.78-37.06,8.12-8.01,4.67-14.8,11.01-20.25,18.8l-4.01-25.59-.22-1.34h-39.96v200.38h44.74v-100.58c0-16.8,3.78-30.82,11.24-41.61,7.35-10.68,19.48-16.02,36.06-16.02h20.03v-42.06h-10.79l.22-.11Z"/>
</svg>`

const currentMarkets = [
  { name: 'Uzbekistan', flag: '🇺🇿' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Kyrgyzstan', flag: '🇰🇬' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Georgia', flag: '🇬🇪' },
  { name: 'Cyprus', flag: '🇨🇾' },
]

const expansionMarkets = [
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Egypt', flag: '🇪🇬' },
]

interface DeckTranslations {
  badge: string
  cover: { title: string; subtitle: string; date: string }
  vision: { 
    title: string; quote: string; points: string[]
    longTerm: string; lt1: string; lt2: string; lt3: string 
  }
  problem: { 
    title: string; subtitle: string
    problems: { title: string; desc: string }[] 
  }
  solution: {
    title: string; subtitle: string
    features: { title: string; desc: string }[]
    value: { metric: string; label: string }[]
  }
  market: { title: string; tam: string; current: string; expansion: string }
  traction: {
    title: string
    metrics: { value: string; label: string }[]
    additional: { value: string; label: string }[]
  }
  model: {
    title: string; subtitle: string
    saas: { title: string; items: string[] }
    additional: { title: string; items: string[] }
    platform: { title: string; items: string[] }
  }
  competitive: { title: string; quote: string; advantages: string[] }
  roadmap: { title: string; phases: { phase: string; items: string[] }[] }
  team: {
    title: string; subtitle: string; backedBy: string; wecome: string
    members: { name: string; role: string; highlights: string[]; linkedin: string }[]
    investor: { name: string; type: string; description: string }
  }
  contact: { 
    title: string; subtitle: string
    cta1: string; cta2: string; email: string; website: string 
  }
}

const translations: Record<Language, DeckTranslations> = {
  en: {
    badge: 'Investor Deck',
    cover: {
      title: 'Building the Operating System for Restaurants & Urban Commerce',
      subtitle: 'Delever is creating the digital backbone for food-tech, delivery and retail in emerging markets.',
      date: 'December 2025',
    },
    vision: {
      title: 'Vision: What We Are Building',
      quote: 'One infrastructure for all restaurant operations.',
      points: [
        'Unify POS, delivery, website, app, mini-apps, couriers, payments, marketing & analytics',
        'Transform chaos into a single digital flow',
        'Reduce restaurant dependency on aggregators',
        'Create new last-mile standard in high-growth markets',
      ],
      longTerm: 'Long-term Vision',
      lt1: 'Become the infrastructure for online sales & delivery in MENA + Central Asia',
      lt2: 'Build marketplace on top of infrastructure (superapp integrations)',
      lt3: 'Launch Delever API Platform for startups',
    },
    problem: {
      title: 'The Problem',
      subtitle: 'Restaurants in emerging markets face systemic fragmentation',
      problems: [
        { title: 'Everything is fragmented', desc: 'POS ≠ website ≠ delivery ≠ aggregators ≠ couriers ≠ CRM' },
        { title: 'Aggregator dependency', desc: 'Aggregators take 25-40% of revenue, making business unprofitable' },
        { title: 'Operational chaos', desc: 'Errors, lost orders, slow delivery times' },
        { title: 'No customer control', desc: 'No customer management → low repeat orders' },
        { title: 'No technology access', desc: 'Restaurants lack tech to build their own direct channels' },
      ],
    },
    solution: {
      title: 'Solution: Why Delever Wins',
      subtitle: 'The All-in-One Operating System for Restaurants',
      features: [
        { title: 'Sales Channels', desc: 'Website, mini-app, mobile app, QR, call-center' },
        { title: 'Order Management', desc: 'KDS, kitchen flow, real-time tracking' },
        { title: 'Courier & Routing', desc: 'Auto-assignment, GPS tracking, zone management' },
        { title: 'CRM & Retention', desc: 'RFM, segmentation, automation campaigns' },
        { title: 'Analytics', desc: 'CEO dashboards, forecasting, insights' },
        { title: 'Integrations', desc: 'POS, aggregators, payments, 40+ connections' },
      ],
      value: [
        { metric: '+35%', label: 'Direct order growth' },
        { metric: '-30%', label: 'Delivery cost reduction' },
        { metric: '+40%', label: 'Retention increase' },
        { metric: '100%', label: 'Business transparency' },
      ],
    },
    market: {
      title: 'Market Opportunity',
      tam: 'TAM: $250B+ Food-Tech & Delivery Infrastructure',
      current: 'Current Markets',
      expansion: 'Expansion Targets',
    },
    traction: {
      title: 'Traction & Growth',
      metrics: [
        { value: '1,000+', label: 'Restaurants on platform' },
        { value: '25,000+', label: 'Daily orders processed' },
        { value: '$100M+', label: 'Annual GMV' },
        { value: '7', label: 'Countries' },
      ],
      additional: [
        { value: '<1%', label: 'Churn rate' },
        { value: '35%', label: 'Orders via direct channels' },
        { value: '3x', label: 'YoY growth' },
      ],
    },
    model: {
      title: 'Business Model',
      subtitle: 'SaaS + Transaction Layer + Infrastructure Layer',
      saas: {
        title: 'SaaS Revenue',
        items: ['Monthly subscriptions (Light → Enterprise)', 'Payment & delivery transaction fees', 'White-label apps'],
      },
      additional: {
        title: 'Additional Revenue',
        items: ['Marketplace integrations', 'Superapp & bank commissions', 'API Platform revenue share'],
      },
      platform: {
        title: 'Platform Value',
        items: ['Data monetization potential', 'Network effects across markets'],
      },
    },
    competitive: {
      title: 'Competitive Advantages',
      quote: 'Unlike aggregators, Delever does NOT sell customers to restaurants. We give restaurants full control.',
      advantages: [
        'End-to-end infrastructure (full cycle)',
        'Most integrations in the region (40+)',
        'More flexible than Toast / Square / Olo',
        'Strong presence in undervalued markets',
        'Unique data that aggregators don\'t have',
        'Deep localization for Central Asia & GCC',
      ],
    },
    roadmap: {
      title: 'Roadmap',
      phases: [
        { phase: '2026', items: ['AI CRM Marketing & Lead Generator', '500+ UAE restaurants', 'Deep integrations & support expansion'] },
        { phase: '2027', items: ['1,500 restaurants UAE', 'Talabat, Careem partnerships', 'Full KSA localization, Riyadh team'] },
        { phase: '2028', items: ['Riyadh → Jeddah launch', '5,000 restaurants UAE + KSA', 'GCC Delivery OS leadership'] },
      ],
    },
    team: {
      title: 'The Team',
      subtitle: '7+ years building restaurant delivery infrastructure. Backed by Aloqa Ventures.',
      members: [
        { name: 'Fakhriddin Yusupov', role: 'CEO & Co-founder', highlights: ['Ex-CEO MaxWay', 'MBA/DBA', '10+ years Food-Tech'], linkedin: 'linkedin.com/in/fakhriddin-yusupov-821086b3' },
        { name: 'Azizbek Bakhodirov', role: 'COO & Co-founder', highlights: ['Ex-Express24', 'Operations Expert'], linkedin: '' },
        { name: 'Abdullo Khidoyatov', role: 'CTO & Co-founder', highlights: ['Tech Architecture', 'Scale-up Specialist'], linkedin: 'linkedin.com/in/abdullokh-khidoyatov-9b456b7b' },
        { name: 'Madiyar Bakbergenov', role: 'Adviser', highlights: ['Strategic Advisor'], linkedin: '' },
      ],
      wecome: 'We come from: Express24, Chocofood, MaxWay, Oson, UDEVS',
      backedBy: 'Backed By',
      investor: { name: 'AloqaVentures', type: 'Pre-seed Investor', description: 'Leading VC in Central Asia with 6x exits' },
    },
    contact: {
      title: 'Let\'s Build Together',
      subtitle: 'Ready to discuss how Delever is shaping the future of food-tech?',
      cta1: 'Request Data Room', cta2: 'Schedule a Call',
      email: 'support@delever.uz', website: 'delever.io',
    },
  },
  ru: {
    badge: 'Презентация для инвесторов',
    cover: {
      title: 'Создаём операционную систему для ресторанов и городской коммерции',
      subtitle: 'Delever — цифровая основа для food-tech, доставки и ритейла на развивающихся рынках.',
      date: 'Декабрь 2025',
    },
    vision: {
      title: 'Видение: Что мы строим',
      quote: 'Единая инфраструктура для всех операций ресторана.',
      points: [
        'Объединяем POS, доставку, сайт, приложение, мини-приложения, курьеров, платежи, маркетинг и аналитику',
        'Превращаем хаос в единый цифровой поток',
        'Снижаем зависимость ресторанов от агрегаторов',
        'Создаём новый стандарт последней мили на растущих рынках',
      ],
      longTerm: 'Долгосрочное видение',
      lt1: 'Стать инфраструктурой онлайн-продаж и доставки для MENA + Центральная Азия',
      lt2: 'Создать маркетплейс поверх инфраструктуры',
      lt3: 'Запустить Delever API Platform для стартапов',
    },
    problem: {
      title: 'Проблема',
      subtitle: 'Рестораны на развивающихся рынках сталкиваются с системной фрагментацией',
      problems: [
        { title: 'Всё разрознено', desc: 'POS ≠ сайт ≠ доставка ≠ агрегаторы ≠ курьеры ≠ CRM' },
        { title: 'Зависимость от агрегаторов', desc: 'Агрегаторы забирают 25-40% оборота' },
        { title: 'Операционный хаос', desc: 'Ошибки, потерянные заказы, медленная доставка' },
        { title: 'Нет контроля над клиентами', desc: 'Нет управления клиентами → мало повторных заказов' },
        { title: 'Нет доступа к технологиям', desc: 'У ресторанов нет технологий для своих каналов' },
      ],
    },
    solution: {
      title: 'Решение: Почему Delever побеждает',
      subtitle: 'Операционная система «всё в одном» для ресторанов',
      features: [
        { title: 'Каналы продаж', desc: 'Сайт, мини-приложение, мобильное приложение, QR, колл-центр' },
        { title: 'Управление заказами', desc: 'KDS, кухня, отслеживание в реальном времени' },
        { title: 'Курьеры и маршрутизация', desc: 'Авто-назначение, GPS-трекинг, управление зонами' },
        { title: 'CRM и удержание', desc: 'RFM, сегментация, автоматические кампании' },
        { title: 'Аналитика', desc: 'CEO-дашборды, прогнозирование, инсайты' },
        { title: 'Интеграции', desc: 'POS, агрегаторы, платежи, 40+ подключений' },
      ],
      value: [
        { metric: '+35%', label: 'Рост прямых заказов' },
        { metric: '-30%', label: 'Снижение затрат на доставку' },
        { metric: '+40%', label: 'Рост удержания клиентов' },
        { metric: '100%', label: 'Прозрачность бизнеса' },
      ],
    },
    market: {
      title: 'Рыночная возможность',
      tam: 'TAM: $250B+ Food-Tech & Delivery Infrastructure',
      current: 'Текущие рынки',
      expansion: 'Цели расширения',
    },
    traction: {
      title: 'Показатели роста',
      metrics: [
        { value: '1,000+', label: 'Ресторанов на платформе' },
        { value: '25,000+', label: 'Заказов в день' },
        { value: '$100M+', label: 'GMV в год' },
        { value: '7', label: 'Стран' },
      ],
      additional: [
        { value: '<1%', label: 'Отток клиентов' },
        { value: '35%', label: 'Заказов через прямые каналы' },
        { value: '3x', label: 'Рост год к году' },
      ],
    },
    model: {
      title: 'Бизнес-модель',
      subtitle: 'SaaS + Transaction Layer + Infrastructure Layer',
      saas: {
        title: 'SaaS-выручка',
        items: ['Месячные подписки (Light → Enterprise)', 'Комиссии за транзакции и доставку', 'White-label приложения'],
      },
      additional: {
        title: 'Дополнительная выручка',
        items: ['Интеграции с маркетплейсами', 'Комиссии от суперприложений', 'Revenue-share с API Platform'],
      },
      platform: {
        title: 'Ценность платформы',
        items: ['Потенциал монетизации данных', 'Сетевые эффекты на рынках'],
      },
    },
    competitive: {
      title: 'Конкурентные преимущества',
      quote: 'В отличие от агрегаторов, Delever НЕ продаёт клиентов ресторанам. Мы даём ресторанам полный контроль.',
      advantages: [
        'Полный цикл инфраструктуры (end-to-end)',
        'Больше всего интеграций в регионе (40+)',
        'Гибче, чем Toast / Square / Olo',
        'Сильное присутствие на недооценённых рынках',
        'Уникальные данные, которых нет у агрегаторов',
        'Глубокая локализация для Центральной Азии и GCC',
      ],
    },
    roadmap: {
      title: 'Дорожная карта',
      phases: [
        { phase: '2026', items: ['AI CRM Marketing & Lead Generator', '500+ ресторанов в ОАЭ', 'Глубокие интеграции, расширение поддержки'] },
        { phase: '2027', items: ['1 500 ресторанов в ОАЭ', 'Партнёрства Talabat, Careem', 'Полная локализация KSA, команда в Эр-Рияде'] },
        { phase: '2028', items: ['Запуск Эр-Рияд → Джидда', '5 000 ресторанов ОАЭ + KSA', 'Лидерство GCC Delivery OS'] },
      ],
    },
    team: {
      title: 'Команда',
      subtitle: '7+ лет создания инфраструктуры доставки ресторанов. При поддержке Aloqa Ventures.',
      members: [
        { name: 'Фахриддин Юсупов', role: 'CEO & Сооснователь', highlights: ['Ex-CEO MaxWay', 'MBA/DBA', '10+ лет Food-Tech'], linkedin: 'linkedin.com/in/fakhriddin-yusupov-821086b3' },
        { name: 'Азизбек Баходиров', role: 'COO & Сооснователь', highlights: ['Ex-Express24', 'Эксперт по операциям'], linkedin: '' },
        { name: 'Абдулло Хидоятов', role: 'CTO & Сооснователь', highlights: ['Архитектура', 'Масштабирование'], linkedin: 'linkedin.com/in/abdullokh-khidoyatov-9b456b7b' },
        { name: 'Мадияр Бакбергенов', role: 'Советник', highlights: ['Стратегический советник'], linkedin: '' },
      ],
      wecome: 'Мы из: Express24, Chocofood, MaxWay, Oson, UDEVS',
      backedBy: 'При поддержке',
      investor: { name: 'AloqaVentures', type: 'Pre-seed инвестор', description: 'Ведущий VC в Центральной Азии с 6x выходами' },
    },
    contact: {
      title: 'Давайте строить вместе',
      subtitle: 'Готовы обсудить, как Delever формирует будущее food-tech?',
      cta1: 'Запросить Data Room', cta2: 'Назначить звонок',
      email: 'support@delever.uz', website: 'delever.io',
    },
  },
  uz: {
    badge: 'Investorlar uchun taqdimot',
    cover: {
      title: 'Restoranlar va shahar tijorati uchun operatsion tizim yaratamiz',
      subtitle: 'Delever — rivojlanayotgan bozorlarda food-tech, yetkazib berish va retail uchun raqamli asos.',
      date: 'Dekabr 2025',
    },
    vision: {
      title: 'Vizyon: Biz nima qurayapmiz',
      quote: 'Restoran barcha operatsiyalari uchun yagona infratuzilma.',
      points: [
        'POS, yetkazib berish, sayt, ilova, mini-ilovalar, kuryerlar, to\'lovlar, marketing va tahlilni birlashtiramiz',
        'Tartibsizlikni yagona raqamli oqimga aylantiramiz',
        'Restoranlarning agregatorlarga bog\'liqligini kamaytiramiz',
        'O\'sib borayotgan bozorlarda yangi standart yaratamiz',
      ],
      longTerm: 'Uzoq muddatli vizyon',
      lt1: 'MENA + Markaziy Osiyo uchun onlayn savdo infratuzilmasiga aylanish',
      lt2: 'Infratuzilma ustida marketplace yaratish',
      lt3: 'Startaplar uchun Delever API Platform ishga tushirish',
    },
    problem: {
      title: 'Muammo',
      subtitle: 'Rivojlanayotgan bozorlardagi restoranlar tizimli parchalanishga duch kelmoqda',
      problems: [
        { title: 'Hammasi parchalangan', desc: 'POS ≠ sayt ≠ yetkazib berish ≠ agregatorlar ≠ kuryerlar ≠ CRM' },
        { title: 'Agregatorlarga bog\'liqlik', desc: 'Agregatorlar aylanmaning 25-40% ini oladi' },
        { title: 'Operatsion tartibsizlik', desc: 'Xatolar, yo\'qolgan buyurtmalar, sekin yetkazib berish' },
        { title: 'Mijozlar ustidan nazorat yo\'q', desc: 'Mijozlarni boshqarish yo\'q → kam takroriy buyurtmalar' },
        { title: 'Texnologiyalarga kirish yo\'q', desc: 'Restoranlar o\'z kanallarini yaratish uchun texnologiyalarga ega emas' },
      ],
    },
    solution: {
      title: 'Yechim: Nima uchun Delever g\'olib',
      subtitle: 'Restoranlar uchun «hammasini birlashtirgan» operatsion tizim',
      features: [
        { title: 'Savdo kanallari', desc: 'Sayt, mini-ilova, mobil ilova, QR, call-center' },
        { title: 'Buyurtmalarni boshqarish', desc: 'KDS, oshxona, real vaqtda kuzatish' },
        { title: 'Kuryerlar va marshrut', desc: 'Avto-tayinlash, GPS-kuzatuv, hududlarni boshqarish' },
        { title: 'CRM va ushlab qolish', desc: 'RFM, segmentatsiya, avtomatik kampaniyalar' },
        { title: 'Tahlil', desc: 'CEO-dashboardlar, bashorat, tushunchalar' },
        { title: 'Integratsiyalar', desc: 'POS, agregatorlar, to\'lovlar, 40+ ulanish' },
      ],
      value: [
        { metric: '+35%', label: 'To\'g\'ridan-to\'g\'ri buyurtmalar o\'sishi' },
        { metric: '-30%', label: 'Yetkazib berish xarajatlarini kamaytirish' },
        { metric: '+40%', label: 'Mijozlarni ushlab qolish o\'sishi' },
        { metric: '100%', label: 'Biznes shaffofligi' },
      ],
    },
    market: {
      title: 'Bozor imkoniyati',
      tam: 'TAM: $250B+ Food-Tech & Delivery Infrastructure',
      current: 'Joriy bozorlar',
      expansion: 'Kengayish maqsadlari',
    },
    traction: {
      title: 'O\'sish ko\'rsatkichlari',
      metrics: [
        { value: '1,000+', label: 'Platformadagi restoranlar' },
        { value: '25,000+', label: 'Kunlik buyurtmalar' },
        { value: '$100M+', label: 'Yillik GMV' },
        { value: '7', label: 'Mamlakatlar' },
      ],
      additional: [
        { value: '<1%', label: 'Mijoz ketishi' },
        { value: '35%', label: 'To\'g\'ridan-to\'g\'ri kanallar orqali buyurtmalar' },
        { value: '3x', label: 'Yillik o\'sish' },
      ],
    },
    model: {
      title: 'Biznes-model',
      subtitle: 'SaaS + Transaction Layer + Infrastructure Layer',
      saas: {
        title: 'SaaS-daromad',
        items: ['Oylik obunalar (Light → Enterprise)', 'Tranzaksiya va yetkazib berish komissiyalari', 'White-label ilovalar'],
      },
      additional: {
        title: 'Qo\'shimcha daromad',
        items: ['Marketplace integratsiyalari', 'Superilovalar va banklardan komissiyalar', 'API Platform revenue-share'],
      },
      platform: {
        title: 'Platforma qiymati',
        items: ['Ma\'lumotlarni monetizatsiya qilish potensiali', 'Bozorlar bo\'ylab tarmoq effektlari'],
      },
    },
    competitive: {
      title: 'Raqobat afzalliklari',
      quote: 'Agregatorlardan farqli o\'laroq, Delever mijozlarni restoranlarga SOTMAYDI. Biz to\'liq nazorat beramiz.',
      advantages: [
        'To\'liq sikl infratuzilmasi (end-to-end)',
        'Mintaqada eng ko\'p integratsiyalar (40+)',
        'Toast / Square / Olo dan moslashuvchanroq',
        'Kam baholangan bozorlarda kuchli mavjudlik',
        'Agregatorlarda bo\'lmagan noyob ma\'lumotlar',
        'Markaziy Osiyo va GCC uchun chuqur lokalizatsiya',
      ],
    },
    roadmap: {
      title: 'Yo\'l xaritasi',
      phases: [
        { phase: '2026', items: ['AI CRM Marketing & Lead Generator', '500+ BAA restoranlari', 'Chuqur integratsiyalar, qo\'llab-quvvatlashni kengaytirish'] },
        { phase: '2027', items: ['1 500 BAA restoranlari', 'Talabat, Careem hamkorliklari', 'To\'liq KSA lokalizatsiyasi, Riyadda jamoa'] },
        { phase: '2028', items: ['Riyad → Jidda ishga tushirish', '5 000 restoran BAA + KSA', 'GCC Delivery OS yetakchiligi'] },
      ],
    },
    team: {
      title: 'Jamoa',
      subtitle: '7+ yil restoran yetkazib berish infratuzilmasini yaratish. Aloqa Ventures qo\'llab-quvvatlaydi.',
      members: [
        { name: 'Faxriddin Yusupov', role: 'CEO & Hammuassis', highlights: ['Ex-CEO MaxWay', 'MBA/DBA', '10+ yil Food-Tech'], linkedin: 'linkedin.com/in/fakhriddin-yusupov-821086b3' },
        { name: 'Azizbek Baxodirov', role: 'COO & Hammuassis', highlights: ['Ex-Express24', 'Operatsiyalar eksperti'], linkedin: '' },
        { name: 'Abdullo Xidoyatov', role: 'CTO & Hammuassis', highlights: ['Texnik arxitektura', 'Masshtablash'], linkedin: 'linkedin.com/in/abdullokh-khidoyatov-9b456b7b' },
        { name: 'Madiyar Bakbergenov', role: 'Maslahatchi', highlights: ['Strategik maslahatchi'], linkedin: '' },
      ],
      wecome: 'Biz quyerdan: Express24, Chocofood, MaxWay, Oson, UDEVS',
      backedBy: 'Qo\'llab-quvvatlaydi',
      investor: { name: 'AloqaVentures', type: 'Pre-seed investor', description: 'Markaziy Osiyodagi yetakchi VC 6x exitlar bilan' },
    },
    contact: {
      title: 'Keling birga quramiz',
      subtitle: 'Delever food-tech kelajagini qanday shakllantirayotganini muhokama qilishga tayyormisiz?',
      cta1: 'Data Room so\'rash', cta2: 'Qo\'ng\'iroq rejalashtirish',
      email: 'support@delever.uz', website: 'delever.io',
    },
  },
}

function getStyles(): string {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: white; color: #0f172a; line-height: 1.6; }
    .slide { min-height: 100vh; padding: 60px; display: flex; flex-direction: column; justify-content: center; page-break-after: always; position: relative; }
    .slide-number { position: absolute; bottom: 30px; right: 60px; color: #94a3b8; font-size: 14px; }
    .cover { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); color: white; text-align: center; }
    .logo { margin-bottom: 30px; display: flex; justify-content: center; align-items: center; }
    .logo svg { height: 60px; width: auto; }
    .cover h1 { font-size: 48px; font-weight: 700; margin-bottom: 24px; line-height: 1.2; max-width: 900px; margin: 0 auto 24px; }
    .cover .subtitle { font-size: 20px; color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto 40px; }
    .badge { display: inline-block; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 8px 24px; border-radius: 30px; font-size: 14px; font-weight: 600; margin-bottom: 30px; }
    .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .section-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
    h2 { font-size: 40px; font-weight: 700; margin-bottom: 30px; color: #0f172a; }
    .quote { font-size: 28px; font-style: italic; margin-bottom: 30px; padding-left: 20px; border-left: 4px solid #10b981; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; }
    .card.highlight { background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border-color: #a7f3d0; }
    .card h4 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .card p { font-size: 14px; color: #64748b; }
    .metric-card { background: #0f172a; border-radius: 16px; padding: 30px; text-align: center; color: white; }
    .metric-value { font-size: 42px; font-weight: 800; color: #10b981; margin-bottom: 8px; }
    .metric-label { font-size: 14px; color: rgba(255,255,255,0.7); }
    .value-card { background: #10b981; border-radius: 16px; padding: 24px; text-align: center; color: white; }
    .value-card .value { font-size: 32px; font-weight: 700; margin-bottom: 4px; }
    .value-card .label { font-size: 13px; opacity: 0.9; }
    .problem-card { display: flex; gap: 16px; padding: 20px; background: white; border: 1px solid #fecaca; border-radius: 12px; margin-bottom: 12px; }
    .problem-num { width: 32px; height: 32px; background: #fef2f2; color: #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
    .check-list { list-style: none; }
    .check-list li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 16px; }
    .check-list li::before { content: '✓'; color: #10b981; font-weight: 700; }
    .market-badge { display: inline-flex; align-items: center; gap: 8px; background: #f0fdf4; padding: 8px 16px; border-radius: 8px; margin: 4px; font-size: 14px; }
    .market-badge.expansion { background: #fffbeb; }
    .timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .timeline-item { border-radius: 16px; padding: 24px; }
    .timeline-item.q1 { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid #a7f3d0; }
    .timeline-item.q2 { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #93c5fd; }
    .timeline-item.q3 { background: linear-gradient(135deg, #f5f3ff, #ede9fe); border: 2px solid #c4b5fd; }
    .timeline-phase { font-size: 14px; font-weight: 700; margin-bottom: 16px; padding: 6px 14px; border-radius: 20px; display: inline-block; }
    .q1 .timeline-phase { background: #10b981; color: white; }
    .q2 .timeline-phase { background: #3b82f6; color: white; }
    .q3 .timeline-phase { background: #8b5cf6; color: white; }
    .timeline-item ul { list-style: none; }
    .timeline-item li { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 10px; font-size: 14px; }
    .timeline-item li::before { content: '→'; }
    .team-card { display: flex; gap: 20px; padding: 24px; background: white; border: 1px solid #e2e8f0; border-radius: 16px; }
    .team-avatar { width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #10b981); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: 700; flex-shrink: 0; }
    .team-info h4 { font-size: 20px; margin-bottom: 4px; }
    .team-role { color: #3b82f6; font-weight: 500; margin-bottom: 12px; }
    .team-highlights { display: flex; flex-wrap: wrap; gap: 6px; }
    .team-highlights span { background: #f1f5f9; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
    .investor-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 16px; }
    .investor-icon { width: 60px; height: 60px; background: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; }
    .cta-slide { background: linear-gradient(135deg, #0f172a, #1e3a5f); color: white; text-align: center; }
    .cta-slide h2 { color: white; }
    .cta-buttons { display: flex; justify-content: center; gap: 16px; margin-top: 40px; }
    .cta-btn { display: inline-block; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; }
    .cta-btn.primary { background: white; color: #0f172a; }
    .cta-btn.secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); }
    .dark-section { background: #0f172a; color: white; }
    .dark-section h2 { color: white; }
    .dark-section .section-label { color: #10b981; }
    @media (max-width: 768px) { .slide { padding: 30px; } .cover h1 { font-size: 32px; } h2 { font-size: 28px; } .grid-2, .grid-3, .grid-4, .timeline { grid-template-columns: 1fr; } }
    @media print { .slide { page-break-after: always; } }
  `
}

function generateInvestorDeckHTML(language: Language): string {
  const t = translations[language] || translations.en

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Delever - ${t.badge}</title>
  <style>${getStyles()}</style>
</head>
<body>
  <div class="slide cover">
    <div class="badge">🚀 ${t.badge}</div>
    <div class="logo">${LOGO_WHITE_SVG}</div>
    <h1>${t.cover.title}</h1>
    <p class="subtitle">${t.cover.subtitle}</p>
    <p style="color: rgba(255,255,255,0.5); font-size: 14px;">${t.cover.date}</p>
    <div class="slide-number">1</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #dbeafe;">🎯</div>
      <span class="section-label" style="color: #3b82f6;">01 — Vision</span>
    </div>
    <h2>${t.vision.title}</h2>
    <p class="quote">"${t.vision.quote}"</p>
    <div class="grid-2" style="margin-bottom: 30px;">
      ${t.vision.points.map(point => `<div class="card"><p>${point}</p></div>`).join('')}
    </div>
    <div class="card highlight">
      <h4>${t.vision.longTerm}</h4>
      <ul class="check-list">
        <li>${t.vision.lt1}</li>
        <li>${t.vision.lt2}</li>
        <li>${t.vision.lt3}</li>
      </ul>
    </div>
    <div class="slide-number">2</div>
  </div>

  <div class="slide" style="background: linear-gradient(180deg, #fff, #fef2f2);">
    <div class="section-header">
      <div class="section-icon" style="background: #fee2e2;">⚠️</div>
      <span class="section-label" style="color: #ef4444;">02 — Problem</span>
    </div>
    <h2>${t.problem.title}</h2>
    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">${t.problem.subtitle}</p>
    ${t.problem.problems.map((p, i) => `
      <div class="problem-card">
        <div class="problem-num">${i + 1}</div>
        <div><h4 style="font-size: 16px; margin-bottom: 4px;">${p.title}</h4><p style="font-size: 14px; color: #64748b; margin: 0;">${p.desc}</p></div>
      </div>
    `).join('')}
    <div class="slide-number">3</div>
  </div>

  <div class="slide" style="background: linear-gradient(180deg, #fff, #ecfdf5);">
    <div class="section-header">
      <div class="section-icon" style="background: #d1fae5;">⚡</div>
      <span class="section-label" style="color: #10b981;">03 — Solution</span>
    </div>
    <h2>${t.solution.title}</h2>
    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">${t.solution.subtitle}</p>
    <div class="grid-3" style="margin-bottom: 30px;">
      ${t.solution.features.map(f => `<div class="card"><h4>${f.title}</h4><p>${f.desc}</p></div>`).join('')}
    </div>
    <div class="grid-4">
      ${t.solution.value.map(v => `<div class="value-card"><div class="value">${v.metric}</div><div class="label">${v.label}</div></div>`).join('')}
    </div>
    <div class="slide-number">4</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #dbeafe;">🌍</div>
      <span class="section-label" style="color: #3b82f6;">04 — Market</span>
    </div>
    <h2>${t.market.title}</h2>
    <div style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 10px 24px; border-radius: 30px; font-weight: 700; font-size: 18px; margin-bottom: 30px;">${t.market.tam}</div>
    <div class="grid-2">
      <div class="card">
        <h4 style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span>${t.market.current}
        </h4>
        <div>${currentMarkets.map(m => `<span class="market-badge">${m.flag} ${m.name}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h4 style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%;"></span>${t.market.expansion}
        </h4>
        <div>${expansionMarkets.map(m => `<span class="market-badge expansion">${m.flag} ${m.name}</span>`).join('')}</div>
      </div>
    </div>
    <div class="slide-number">5</div>
  </div>

  <div class="slide dark-section">
    <div class="section-header">
      <div class="section-icon" style="background: rgba(16,185,129,0.2);">📈</div>
      <span class="section-label">05 — Traction</span>
    </div>
    <h2>${t.traction.title}</h2>
    <div class="grid-4" style="margin-bottom: 30px;">
      ${t.traction.metrics.map(m => `<div class="metric-card"><div class="metric-value">${m.value}</div><div class="metric-label">${m.label}</div></div>`).join('')}
    </div>
    <div class="grid-3">
      ${t.traction.additional.map(m => `<div style="display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.05); padding: 16px 20px; border-radius: 12px;"><span style="font-size: 24px; font-weight: 700; color: #10b981;">${m.value}</span><span style="font-size: 14px; color: rgba(255,255,255,0.7);">${m.label}</span></div>`).join('')}
    </div>
    <div class="slide-number">6</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #fef3c7;">💰</div>
      <span class="section-label" style="color: #d97706;">06 — Business Model</span>
    </div>
    <h2>${t.model.title}</h2>
    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">${t.model.subtitle}</p>
    <div class="grid-3">
      <div class="card" style="border-color: #93c5fd; background: #eff6ff;">
        <h4 style="color: #1e40af;">${t.model.saas.title}</h4>
        <ul class="check-list">${t.model.saas.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="card" style="border-color: #86efac; background: #f0fdf4;">
        <h4 style="color: #166534;">${t.model.additional.title}</h4>
        <ul class="check-list">${t.model.additional.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="card" style="border-color: #c4b5fd; background: #f5f3ff;">
        <h4 style="color: #5b21b6;">${t.model.platform.title}</h4>
        <ul class="check-list">${t.model.platform.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="slide-number">7</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #ede9fe;">🛡️</div>
      <span class="section-label" style="color: #7c3aed;">07 — Competitive Moat</span>
    </div>
    <h2>${t.competitive.title}</h2>
    <div style="background: #0f172a; color: white; padding: 24px; border-radius: 16px; margin-bottom: 30px;">
      <p style="font-size: 18px; font-style: italic;">"${t.competitive.quote}"</p>
    </div>
    <div class="grid-2">
      ${t.competitive.advantages.map(a => `<div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: #f8fafc; border-radius: 12px;"><span style="width: 24px; height: 24px; background: #ede9fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #7c3aed; font-size: 12px;">✓</span><span style="font-size: 14px;">${a}</span></div>`).join('')}
    </div>
    <div class="slide-number">8</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #e0e7ff;">📅</div>
      <span class="section-label" style="color: #4f46e5;">08 — Roadmap</span>
    </div>
    <h2>${t.roadmap.title}</h2>
    <div class="timeline">
      ${t.roadmap.phases.map((p, i) => `
        <div class="timeline-item ${i === 0 ? 'q1' : i === 1 ? 'q2' : 'q3'}">
          <span class="timeline-phase">${p.phase}</span>
          <ul>${p.items.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      `).join('')}
    </div>
    <div class="slide-number">9</div>
  </div>

  <div class="slide">
    <div class="section-header">
      <div class="section-icon" style="background: #fce7f3;">👥</div>
      <span class="section-label" style="color: #db2777;">09 — Team</span>
    </div>
    <h2>${t.team.title}</h2>
    <div class="grid-2" style="margin-bottom: 30px;">
      ${t.team.members.map(m => `
        <div class="team-card">
          <div class="team-avatar">${m.name.split(' ').map(n => n[0]).join('')}</div>
          <div class="team-info">
            <h4>${m.name}</h4>
            <p class="team-role">${m.role}</p>
            <div class="team-highlights">${m.highlights.map(h => `<span>${h}</span>`).join('')}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="investor-card">
      <div class="investor-icon">💼</div>
      <div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 4px;">${t.team.backedBy}</p>
        <h4 style="margin-bottom: 4px;">${t.team.investor.name}</h4>
        <p style="font-size: 14px; color: #64748b; margin: 0;">${t.team.investor.description}</p>
      </div>
    </div>
    <div class="slide-number">10</div>
  </div>

  <div class="slide cta-slide">
    <h2>${t.contact.title}</h2>
    <p style="font-size: 20px; color: rgba(255,255,255,0.8); max-width: 600px; margin: 0 auto;">${t.contact.subtitle}</p>
    <div class="cta-buttons">
      <span class="cta-btn primary">📊 ${t.contact.cta1}</span>
      <span class="cta-btn secondary">📞 ${t.contact.cta2}</span>
    </div>
    <div style="margin-top: 40px; color: rgba(255,255,255,0.6); font-size: 14px;">
      <p>${t.contact.email} • ${t.contact.website}</p>
    </div>
    <div class="slide-number">11</div>
  </div>
</body>
</html>`
}

export function downloadInvestorDeck(language: Language): void {
  const html = generateInvestorDeckHTML(language)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `Delever_Investor_Deck_${language.toUpperCase()}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

