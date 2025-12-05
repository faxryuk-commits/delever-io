// Генератор презентации для Aggregators
import type { Language } from '@/i18n/translations'

// Delever logo SVG - White version
const LOGO_WHITE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1930 521" style="height: 50px; width: auto;">
  <defs>
    <linearGradient id="agg-grad" x1="-278.91" y1="759.37" x2="-278.91" y2="249.6" gradientTransform="translate(539.04 765.27) scale(1 -1)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#afdbd9"/><stop offset="1" stop-color="#f3e9dd"/>
    </linearGradient>
  </defs>
  <path fill="url(#agg-grad)" d="M348.26,5.89h-176.26C80.31,5.89,5.97,80.44,5.97,172.4v176.76c0,91.96,74.34,166.51,166.03,166.51h176.26c91.7,0,166.03-74.55,166.03-166.51v-176.76c0-91.96-74.34-166.51-166.03-166.51Z"/>
  <path fill="#152b45" d="M306.57,149.72h-164.65l-7.54,42.97h172.56l7.18,29.45h-184.88l-4.13,23.56h152.98l7.18,29.45H120.02l-4.13,23.56h131.45l7.18,29.45H110.74l-7.54,42.97h203.37c60.9,0,110.42-49.66,110.42-110.74s-49.52-110.74-110.42-110.74v.07Z"/>
  <path fill="#fff" d="M852.26,187.43c-6.45-7.68-14.47-13.91-23.93-18.58-11.02-5.34-23.93-8.01-38.39-8.01-17.92,0-34.28,4.23-48.52,12.79-14.36,8.46-25.71,20.58-33.94,36.05-8.12,15.47-12.35,33.49-12.35,53.74s4.12,39.05,12.13,54.41c8.01,15.47,19.36,27.48,33.72,35.71,14.25,8.23,30.72,12.35,48.97,12.35,26.38,0,47.63-10.01,63.43-29.71l4.67,27.37h39.17V90.75h-44.74v96.69h-.22ZM837.23,217.14c10.24,11.91,15.47,27.59,15.47,46.95s-5.23,34.27-15.36,45.95c-10.13,11.68-23.82,17.58-40.4,17.58s-30.27-6.01-40.4-17.8c-10.24-11.79-15.36-27.48-15.36-46.51s5.23-34.27,15.36-46.17c10.13-11.79,23.82-17.8,40.4-17.8s30.27,6.01,40.4,17.8h-.11Z"/>
  <path fill="#fff" d="M1068.26,172.63c-14.69-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.63,12.68c-14.69,8.46-26.26,20.58-34.5,36.05-8.23,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.59,27.37,36.06,35.83,15.47,8.46,33.72,12.68,54.53,12.68,23.93,0,44.07-6.56,60.09-19.58,16.02-13.02,26.04-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.69,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.69,0-28.38-4.9-37.73-14.57-9.46-9.68-14.69-23.03-15.69-39.72v-.78h148.45l.22-1.34c.78-5.45,1.12-10.79,1.12-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.26-25.48-34.95-33.38l.11.22ZM966.33,241.73c1.56-13.91,7.23-24.92,17.14-33.27,9.9-8.34,21.59-12.57,35.28-12.57,14.69,0,26.82,4.01,36.39,12.13,9.68,8.12,15.36,19.36,17.14,33.71h-105.94Z"/>
  <path fill="#fff" d="M1183.67,90.75h-44.74v272.81h44.74V90.75Z"/>
  <path fill="#fff" d="M1354.82,172.63c-14.68-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.64,12.68c-14.68,8.46-26.26,20.58-34.5,36.05-8.23,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.59,27.37,36.06,35.83,15.47,8.46,33.72,12.68,54.53,12.68,23.92,0,44.07-6.56,60.09-19.58,16.03-13.02,26.05-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.7,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.7,0-28.38-4.9-37.72-14.57-9.46-9.68-14.69-23.14-15.7-39.72v-.78h148.45l.23-1.34c.77-5.45,1.11-10.79,1.11-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.25-25.48-34.94-33.38l.11.22ZM1253,241.73c1.56-13.91,7.24-24.92,17.13-33.27,9.91-8.34,21.59-12.57,35.28-12.57,14.69,0,26.82,4.01,36.39,12.13,9.68,8.12,15.36,19.36,17.13,33.71h-105.94Z"/>
  <path fill="#fff" d="M1598.54,163.18h-47.3l-52.42,149.31-52.86-148.31-.44-1h-47.97l73.56,199.27.34,1.11h53.08l74.01-200.38Z"/>
  <path fill="#fff" d="M1741.65,172.63c-14.69-7.79-31.83-11.68-50.97-11.68s-35.95,4.23-50.64,12.68c-14.69,8.46-26.27,20.58-34.5,36.05-8.24,15.47-12.35,33.6-12.35,54.07s4.23,38.16,12.69,53.52c8.46,15.35,20.58,27.37,36.06,35.83,15.47,8.46,33.71,12.68,54.53,12.68,23.92,0,44.07-6.56,60.09-19.58,16.02-13.02,26.04-29.93,29.6-50.29l.34-1.89h-44.74l-.33,1.22c-2.67,10.57-8.35,18.91-16.7,24.7-8.46,5.79-19.03,8.79-31.49,8.79-15.7,0-28.38-4.9-37.73-14.57-9.46-9.68-14.68-23.03-15.68-39.72v-.78h148.45l.23-1.34c.77-5.45,1.22-10.9,1.22-16.02-.23-19.14-4.68-36.16-13.13-50.51-8.46-14.35-20.14-25.48-34.94-33.38v.22ZM1639.83,241.73c1.56-13.91,7.23-24.92,17.13-33.27,9.91-8.34,21.59-12.57,35.28-12.57,14.68,0,26.81,4.01,36.38,12.13,9.58,8.12,15.36,19.36,17.14,33.71h-105.94Z"/>
  <path fill="#fff" d="M1913.7,163.18c-15.36,0-27.82,2.78-37.06,8.12-8.01,4.67-14.8,11.01-20.25,18.8l-4.01-25.59-.22-1.34h-39.96v200.38h44.74v-100.58c0-16.8,3.78-30.82,11.24-41.61,7.35-10.68,19.48-16.02,36.06-16.02h20.03v-42.06h-10.79l.22-.11Z"/>
</svg>`

interface Translations {
  title: string
  subtitle: string
  tagline: string
  
  // Problems
  problemsTitle: string
  problems: { title: string; desc: string }[]
  
  // Solution
  solutionTitle: string
  solutionSubtitle: string
  features: { title: string; desc: string }[]
  
  // Aggregators
  aggregatorsTitle: string
  aggregators: string[]
  
  // Results
  resultsTitle: string
  results: { value: string; label: string }[]
  
  // How it works
  howTitle: string
  steps: { title: string; desc: string }[]
  
  // CTA
  ctaTitle: string
  ctaSubtitle: string
  contact: string
  
  // Footer
  website: string
  email: string
}

const translations: Record<Language, Translations> = {
  ru: {
    title: 'Все агрегаторы в одном окне',
    subtitle: 'Wolt, Glovo, Yandex Eats, Uzum Tezkor — без хаоса и ручной работы',
    tagline: 'Интеграция с агрегаторами',
    
    problemsTitle: 'Знакомо?',
    problems: [
      { title: 'На кассе 5 планшетов', desc: 'Каждый агрегатор требует свой планшет, операторы путаются' },
      { title: 'Ручной ввод в кассу', desc: 'Операторы переписывают заказы — человеческие ошибки' },
      { title: 'Везде разное меню', desc: 'Обновлять цены и наличие в 5 местах — кошмар' },
      { title: 'Нет единой аналитики', desc: 'Непонятно какой агрегатор приносит больше дохода' },
    ],
    
    solutionTitle: 'Решение: единая платформа',
    solutionSubtitle: 'Все заказы → один экран → автоматическая синхронизация с кассой',
    features: [
      { title: 'Единое окно для заказов', desc: 'Все агрегаторы в одном интерфейсе' },
      { title: 'Авто-синхронизация с кассой', desc: 'Заказы автоматически попадают в iiko, R-Keeper, Poster' },
      { title: 'Единое меню', desc: 'Редактируйте один раз — изменения везде' },
      { title: 'Управление стоп-листами', desc: 'Блюдо закончилось? Один клик — и оно исчезает везде' },
      { title: 'Единая аналитика', desc: 'Сравнивайте доход и эффективность каждого агрегатора' },
      { title: 'Управление зонами', desc: 'Разные цены и меню для разных зон' },
    ],
    
    aggregatorsTitle: 'Поддерживаемые агрегаторы',
    aggregators: ['Wolt', 'Glovo', 'Yandex Eats', 'Uzum Tezkor', 'Chocofood', 'Foody'],
    
    resultsTitle: 'Результаты клиентов',
    results: [
      { value: '-90%', label: 'Ручной работы' },
      { value: '-70%', label: 'Ошибок в заказах' },
      { value: '+25%', label: 'Скорость обработки' },
      { value: '+15%', label: 'Рост выручки' },
    ],
    
    howTitle: 'Как это работает',
    steps: [
      { title: '1. Подключение', desc: 'Подключаем аккаунты агрегаторов за 1-2 дня' },
      { title: '2. Синхронизация', desc: 'Настраиваем связь с кассой и меню' },
      { title: '3. Запуск', desc: 'Заказы начинают приходить в единое окно' },
      { title: '4. Рост', desc: 'Экономите время и увеличиваете доход' },
    ],
    
    ctaTitle: 'Избавьтесь от хаоса',
    ctaSubtitle: 'Подключите все агрегаторы к единой платформе за 1-2 дня',
    contact: 'Получить демо',
    
    website: 'delever.io',
    email: 'support@delever.uz',
  },
  en: {
    title: 'All Aggregators in One Window',
    subtitle: 'Wolt, Glovo, Yandex Eats, Uzum Tezkor — no chaos, no manual work',
    tagline: 'Aggregator Integration',
    
    problemsTitle: 'Sound Familiar?',
    problems: [
      { title: '5 tablets at checkout', desc: 'Each aggregator needs its own tablet, operators get confused' },
      { title: 'Manual entry to POS', desc: 'Operators rewrite orders — human errors' },
      { title: 'Different menus everywhere', desc: 'Updating prices in 5 places is a nightmare' },
      { title: 'No unified analytics', desc: 'Unclear which aggregator brings more revenue' },
    ],
    
    solutionTitle: 'Solution: Unified Platform',
    solutionSubtitle: 'All orders → one screen → automatic POS sync',
    features: [
      { title: 'Single order window', desc: 'All aggregators in one interface' },
      { title: 'Auto POS sync', desc: 'Orders automatically go to iiko, R-Keeper, Poster' },
      { title: 'Unified menu', desc: 'Edit once — changes apply everywhere' },
      { title: 'Stop-list management', desc: 'Item sold out? One click — gone everywhere' },
      { title: 'Unified analytics', desc: 'Compare revenue and efficiency of each aggregator' },
      { title: 'Zone management', desc: 'Different prices and menus for different zones' },
    ],
    
    aggregatorsTitle: 'Supported Aggregators',
    aggregators: ['Wolt', 'Glovo', 'Yandex Eats', 'Uzum Tezkor', 'Chocofood', 'Foody'],
    
    resultsTitle: 'Client Results',
    results: [
      { value: '-90%', label: 'Manual work' },
      { value: '-70%', label: 'Order errors' },
      { value: '+25%', label: 'Processing speed' },
      { value: '+15%', label: 'Revenue growth' },
    ],
    
    howTitle: 'How It Works',
    steps: [
      { title: '1. Connect', desc: 'Connect aggregator accounts in 1-2 days' },
      { title: '2. Sync', desc: 'Set up POS and menu sync' },
      { title: '3. Launch', desc: 'Orders start coming to single window' },
      { title: '4. Grow', desc: 'Save time and increase revenue' },
    ],
    
    ctaTitle: 'End the Chaos',
    ctaSubtitle: 'Connect all aggregators to a unified platform in 1-2 days',
    contact: 'Get Demo',
    
    website: 'delever.io',
    email: 'support@delever.uz',
  },
  uz: {
    title: "Barcha agregatorlar bitta oynada",
    subtitle: "Wolt, Glovo, Yandex Eats, Uzum Tezkor — tartibsizliksiz va qo'lda ishlamasdan",
    tagline: 'Agregatorlar integratsiyasi',
    
    problemsTitle: 'Tanish vaziyatmi?',
    problems: [
      { title: 'Kassada 5 ta planshet', desc: "Har bir agregator uchun o'z planshet, operatorlar adashadi" },
      { title: "Kassaga qo'lda kiritish", desc: 'Operatorlar buyurtmalarni qayta yozadi — inson xatolari' },
      { title: 'Har joyda turli menyu', desc: "Narxlarni 5 joyda yangilash — dahshat" },
      { title: "Yagona tahlil yo'q", desc: "Qaysi agregator ko'proq daromad keltiradi aniq emas" },
    ],
    
    solutionTitle: 'Yechim: yagona platforma',
    solutionSubtitle: 'Barcha buyurtmalar → bitta ekran → kassa bilan avto-sinxronizatsiya',
    features: [
      { title: 'Buyurtmalar uchun yagona oyna', desc: 'Barcha agregatorlar bitta interfeysda' },
      { title: 'Kassa bilan avto-sinxronizatsiya', desc: "Buyurtmalar avtomatik ravishda iiko, R-Keeper, Poster'ga tushadi" },
      { title: 'Yagona menyu', desc: "Bir marta tuzatasiz — o'zgarishlar hamma joyda" },
      { title: "Stop-ro'yxatlarni boshqarish", desc: "Ovqat tugadimi? Bir klik — u barcha agregatorlarda yo'qoladi" },
      { title: 'Yagona tahlil', desc: 'Har bir agregator daromadi va samaradorligini solishtiring' },
      { title: "Zonalarni boshqarish", desc: "Turli zonalar uchun turli narx va menyu" },
    ],
    
    aggregatorsTitle: "Qo'llab-quvvatlanadigan agregatorlar",
    aggregators: ['Wolt', 'Glovo', 'Yandex Eats', 'Uzum Tezkor', 'Chocofood', 'Foody'],
    
    resultsTitle: 'Mijozlar natijalari',
    results: [
      { value: '-90%', label: "Qo'lda ish" },
      { value: '-70%', label: 'Buyurtma xatolari' },
      { value: '+25%', label: "Qayta ishlash tezligi" },
      { value: '+15%', label: "Daromad o'sishi" },
    ],
    
    howTitle: 'Bu qanday ishlaydi',
    steps: [
      { title: '1. Ulanish', desc: 'Agregator hisoblarini 1-2 kunda ulang' },
      { title: '2. Sinxronizatsiya', desc: 'Kassa va menyuni sozlang' },
      { title: '3. Ishga tushirish', desc: 'Buyurtmalar yagona oynaga kela boshlaydi' },
      { title: "4. O'sish", desc: "Vaqtni tejang va daromadni oshiring" },
    ],
    
    ctaTitle: "Tartibsizlikdan qutiling",
    ctaSubtitle: "Barcha agregatorlarni 1-2 kun ichida yagona platformaga ulang",
    contact: 'Demo olish',
    
    website: 'delever.io',
    email: 'support@delever.uz',
  },
}

function generateHTML(lang: Language): string {
  const t = translations[lang]
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} — Delever</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; }
    
    .slide {
      width: 100%;
      min-height: 100vh;
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      page-break-after: always;
    }
    
    /* Cover */
    .cover {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
      color: white;
      text-align: center;
      align-items: center;
    }
    .logo { margin-bottom: 40px; }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      padding: 8px 24px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .cover h1 {
      font-size: 52px;
      font-weight: 800;
      margin-bottom: 20px;
      line-height: 1.1;
    }
    .cover .subtitle {
      font-size: 22px;
      color: rgba(255,255,255,0.7);
      max-width: 700px;
    }
    
    /* Sections */
    h2 {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #0f172a;
    }
    
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .grid-6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
    
    /* Problem cards */
    .problem-card {
      background: #fff1f2;
      border-left: 4px solid #ef4444;
      padding: 24px;
      border-radius: 12px;
    }
    .problem-card h3 {
      color: #dc2626;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .problem-card p { color: #7f1d1d; font-size: 14px; }
    
    /* Feature cards */
    .feature-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    .feature-card h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #0f172a;
    }
    .feature-card p { color: #64748b; font-size: 14px; }
    .feature-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-size: 24px;
    }
    
    /* Aggregator logos */
    .aggregator-card {
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      padding: 24px;
      border-radius: 16px;
      text-align: center;
      font-weight: 700;
      font-size: 18px;
      color: #0369a1;
    }
    
    /* Results */
    .result-card {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    .result-value {
      font-size: 48px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .result-label { color: #64748b; font-size: 16px; }
    .green { color: #10b981; }
    .blue { color: #3b82f6; }
    .purple { color: #8b5cf6; }
    .orange { color: #f97316; }
    
    /* Steps */
    .step-card {
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      position: relative;
    }
    .step-number {
      position: absolute;
      top: -15px;
      left: 20px;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }
    .step-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .step-card p { color: #64748b; font-size: 14px; }
    
    /* CTA */
    .cta {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      color: white;
      text-align: center;
      align-items: center;
    }
    .cta h2 { color: white; margin-bottom: 16px; }
    .cta .subtitle { color: rgba(255,255,255,0.7); font-size: 20px; margin-bottom: 40px; }
    .cta-button {
      display: inline-block;
      background: white;
      color: #0f172a;
      padding: 16px 48px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 18px;
      text-decoration: none;
    }
    .cta-footer {
      margin-top: 60px;
      color: rgba(255,255,255,0.5);
      font-size: 14px;
    }
    
    @media print {
      .slide { page-break-after: always; }
    }
  </style>
</head>
<body>

<!-- Slide 1: Cover -->
<div class="slide cover">
  <div class="logo">${LOGO_WHITE_SVG}</div>
  <div class="badge">🔗 ${t.tagline}</div>
  <h1>${t.title}</h1>
  <p class="subtitle">${t.subtitle}</p>
</div>

<!-- Slide 2: Problems -->
<div class="slide">
  <h2>❌ ${t.problemsTitle}</h2>
  <div class="grid-2">
    ${t.problems.map(p => `
      <div class="problem-card">
        <h3>⚠️ ${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `).join('')}
  </div>
</div>

<!-- Slide 3: Solution -->
<div class="slide">
  <h2>✅ ${t.solutionTitle}</h2>
  <p style="font-size: 20px; color: #64748b; margin-bottom: 40px;">${t.solutionSubtitle}</p>
  <div class="grid-3">
    ${t.features.map((f, i) => `
      <div class="feature-card">
        <div class="feature-icon" style="background: linear-gradient(135deg, ${['#3b82f6','#10b981','#8b5cf6','#f97316','#6366f1','#ec4899'][i]}, ${['#2563eb','#059669','#7c3aed','#ea580c','#4f46e5','#db2777'][i]});">
          ${['📱','⚡','📋','🛑','📊','🗺️'][i]}
        </div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join('')}
  </div>
</div>

<!-- Slide 4: Aggregators -->
<div class="slide">
  <h2>🔌 ${t.aggregatorsTitle}</h2>
  <p style="font-size: 18px; color: #64748b; margin-bottom: 40px;">${lang === 'ru' ? 'Интеграция за 1-2 дня без остановки работы' : lang === 'uz' ? "1-2 kun ichida ishni to'xtatmasdan integratsiya" : 'Integration in 1-2 days without stopping operations'}</p>
  <div class="grid-6">
    ${t.aggregators.map(a => `
      <div class="aggregator-card">${a}</div>
    `).join('')}
  </div>
</div>

<!-- Slide 5: Results -->
<div class="slide">
  <h2>📈 ${t.resultsTitle}</h2>
  <div class="grid-4">
    ${t.results.map((r, i) => `
      <div class="result-card">
        <div class="result-value ${['green','blue','purple','orange'][i]}">${r.value}</div>
        <div class="result-label">${r.label}</div>
      </div>
    `).join('')}
  </div>
</div>

<!-- Slide 6: How it works -->
<div class="slide">
  <h2>🚀 ${t.howTitle}</h2>
  <div class="grid-4">
    ${t.steps.map((s, i) => `
      <div class="step-card">
        <div class="step-number">${i + 1}</div>
        <h3 style="margin-top: 10px;">${s.title.replace(/^\d+\.\s*/, '')}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('')}
  </div>
</div>

<!-- Slide 7: CTA -->
<div class="slide cta">
  <div class="logo">${LOGO_WHITE_SVG}</div>
  <h2>${t.ctaTitle}</h2>
  <p class="subtitle">${t.ctaSubtitle}</p>
  <a href="https://delever.io" class="cta-button">${t.contact}</a>
  <div class="cta-footer">
    ${t.website} • ${t.email}
  </div>
</div>

</body>
</html>`
}

export async function downloadAggregatorsPresentation(language: Language): Promise<void> {
  const html = generateHTML(language)
  
  // Create blob and download
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `Delever_Aggregators_${language.toUpperCase()}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

