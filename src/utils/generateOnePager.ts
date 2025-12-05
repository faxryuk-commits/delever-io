import type { Language } from '@/i18n/translations'

// Delever logo SVG - Original version (for light backgrounds)
const LOGO_ORIGINAL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1930 521" style="height: 40px; width: auto;">
  <defs>
    <linearGradient id="onepager-grad" x1="-279.57" y1="615.69" x2="-279.57" y2="394.02" gradientTransform="translate(539.04 765.27) scale(1 -1)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#afdbd9"/><stop offset="1" stop-color="#f3e9dd"/>
    </linearGradient>
  </defs>
  <path fill="#152b45" d="M347.71,5.67h-176.41C79.52,5.67,5.12,80.28,5.12,172.32v176.92c0,92.04,74.4,166.66,166.18,166.66h176.41c91.78,0,166.18-74.61,166.18-166.66v-176.92c0-92.04-74.4-166.66-166.18-166.66Z"/>
  <path fill="url(#onepager-grad)" d="M305.99,149.65h-164.8l-7.55,43.01h172.71l7.18,29.47h-185.05l-4.14,23.58h153.12l7.18,29.47H119.27l-4.14,23.58h131.57l7.18,29.47H109.98l-7.55,43.01h203.55c60.96,0,110.52-49.71,110.52-110.84s-49.56-110.84-110.52-110.84v.07Z"/>
  <path fill="#152b45" d="M852.16,187.37c-6.46-7.68-14.48-13.92-23.95-18.6-11.03-5.35-23.95-8.02-38.43-8.02-17.93,0-34.3,4.23-48.56,12.81-14.37,8.46-25.73,20.6-33.97,36.08-8.13,15.48-12.37,33.52-12.37,53.79s4.12,39.09,12.14,54.45c8.02,15.48,19.38,27.51,33.75,35.75,14.26,8.24,30.74,12.36,49.01,12.36,26.4,0,47.67-10.02,63.49-29.73l4.68,27.39h39.21V90.6h-44.78v96.77h-.22ZM837.12,217.1c10.25,11.92,15.49,27.62,15.49,46.99s-5.24,34.3-15.37,45.99c-10.13,11.69-23.84,17.59-40.43,17.59s-30.29-6.01-40.43-17.82c-10.24-11.8-15.37-27.51-15.37-46.55s5.24-34.3,15.37-46.21c10.14-11.8,23.84-17.82,40.43-17.82s30.3,6.01,40.43,17.82h-.11Z"/>
  <path fill="#152b45" d="M1068.35,172.56c-14.7-7.79-31.85-11.69-51.01-11.69s-35.98,4.23-50.68,12.69c-14.7,8.46-26.29,20.6-34.53,36.08-8.24,15.48-12.37,33.63-12.37,54.12s4.23,38.2,12.7,53.56c8.46,15.37,20.61,27.39,36.09,35.86,15.49,8.46,33.75,12.7,54.58,12.7,23.95,0,44.11-6.57,60.14-19.6,16.04-13.03,26.07-29.96,29.63-50.33l.33-1.89h-44.78l-.33,1.22c-2.67,10.58-8.35,18.93-16.71,24.72-8.46,5.79-19.05,8.8-31.52,8.8-15.7,0-28.4-4.9-37.76-14.59-9.47-9.69-14.7-23.05-15.71-39.75v-.78h148.59l.22-1.34c.78-5.46,1.11-10.8,1.11-16.04-.22-19.15-4.68-36.19-13.14-50.56-8.46-14.37-20.27-25.5-34.98-33.41l.11.22ZM966.33,241.71c1.56-13.92,7.24-24.94,17.15-33.3,9.92-8.35,21.61-12.58,35.31-12.58,14.7,0,26.84,4.01,36.42,12.14,9.69,8.13,15.37,19.38,17.16,33.74h-106.04Z"/>
  <path fill="#152b45" d="M1183.86,90.6h-44.78v273.05h44.78V90.6Z"/>
  <path fill="#152b45" d="M1355.17,172.56c-14.7-7.79-31.86-11.69-51.02-11.69s-35.97,4.23-50.68,12.69c-14.7,8.46-26.29,20.6-34.53,36.08-8.24,15.48-12.37,33.63-12.37,54.12s4.24,38.2,12.7,53.56c8.47,15.37,20.61,27.39,36.09,35.86,15.48,8.46,33.75,12.7,54.58,12.7,23.95,0,44.11-6.57,60.15-19.6,16.04-13.03,26.06-29.96,29.63-50.33l.33-1.89h-44.78l-.33,1.22c-2.68,10.58-8.36,18.93-16.71,24.72-8.47,5.79-19.05,8.8-31.53,8.8-15.7,0-28.4-4.9-37.76-14.59-9.47-9.69-14.7-23.16-15.7-39.75v-.78h148.58l.22-1.34c.78-5.46,1.12-10.8,1.12-16.04-.22-19.15-4.68-36.19-13.14-50.56-8.47-14.37-20.27-25.5-34.98-33.41l.11.22ZM1253.25,241.71c1.56-13.92,7.24-24.94,17.15-33.3,9.91-8.35,21.61-12.58,35.31-12.58,14.7,0,26.84,4.01,36.42,12.14,9.69,8.13,15.37,19.38,17.15,33.74h-106.04Z"/>
  <path fill="#152b45" d="M1599.1,163.09h-47.34l-52.46,149.44-52.91-148.44-.44-1h-48.01l73.63,199.44.33,1.11h53.13l74.07-200.56Z"/>
  <path fill="#152b45" d="M1742.34,172.56c-14.7-7.79-31.85-11.69-51.01-11.69s-35.98,4.23-50.68,12.69c-14.7,8.46-26.29,20.6-34.53,36.08-8.24,15.48-12.37,33.63-12.37,54.12s4.23,38.2,12.7,53.56c8.46,15.37,20.61,27.39,36.09,35.86,15.49,8.46,33.75,12.7,54.58,12.7,23.95,0,44.11-6.57,60.15-19.6,16.04-13.03,26.06-29.96,29.63-50.33l.33-1.89h-44.78l-.34,1.22c-2.67,10.58-8.35,18.93-16.71,24.72-8.46,5.79-19.05,8.8-31.52,8.8-15.7,0-28.4-4.9-37.76-14.59-9.47-9.69-14.7-23.05-15.71-39.75v-.78h148.59l.22-1.34c.78-5.46,1.23-10.91,1.23-16.04-.23-19.15-4.68-36.19-13.15-50.56-8.46-14.37-20.16-25.5-34.97-33.41v.22ZM1640.42,241.71c1.56-13.92,7.24-24.94,17.16-33.3,9.91-8.35,21.61-12.58,35.31-12.58,14.7,0,26.84,4.01,36.42,12.14,9.58,8.13,15.37,19.38,17.16,33.74h-106.04Z"/>
  <path fill="#152b45" d="M1914.54,163.09c-15.37,0-27.85,2.78-37.09,8.13-8.02,4.68-14.81,11.02-20.27,18.82l-4.01-25.61-.22-1.34h-39.98v200.56h44.78v-100.67c0-16.82,3.79-30.85,11.25-41.65,7.35-10.69,19.49-16.04,36.09-16.04h20.05v-42.09h-10.8l.22-.11Z"/>
</svg>`

const translations = {
  en: {
    tagline: 'The Operating System for Restaurants & Urban Commerce',
    description: 'Delever unifies all channels, operations, couriers, payments and customer interactions into a single platform — powering thousands of restaurants and millions of orders across Central Asia and GCC.',
    
    // What we do
    whatWeDo: 'What We Do',
    whatWeDoItems: [
      'Unified platform: POS, delivery, website, app, couriers, payments, marketing & analytics',
      'Reduce aggregator dependency (25-40% commission savings)',
      'Full control over customer data and direct channels',
    ],
    
    // Market
    market: 'Market Opportunity',
    tam: '$250B+',
    tamLabel: 'TAM Food-Tech Infrastructure',
    
    // Traction
    traction: 'Traction',
    metrics: [
      { value: '1,000+', label: 'Restaurants' },
      { value: '25K+', label: 'Daily Orders' },
      { value: '$50M+', label: 'Annual GMV' },
      { value: '7', label: 'Countries' },
    ],
    
    // Value Props
    valueProps: 'Key Metrics',
    values: [
      { value: '+35%', label: 'Direct Orders' },
      { value: '-30%', label: 'Delivery Costs' },
      { value: '+40%', label: 'Retention' },
      { value: '<1%', label: 'Churn' },
    ],
    
    // Geography
    geography: 'Geography',
    currentMarkets: 'Live: Uzbekistan, Kazakhstan, UAE, Azerbaijan, Kyrgyzstan, Georgia, Cyprus',
    expansion: 'Expansion: Saudi Arabia, Kuwait, Qatar, Oman, Turkey',
    
    // Roadmap
    roadmap: 'Roadmap',
    roadmapItems: [
      '2026: AI Suite Launch, 500+ UAE restaurants',
      '2027: 1,500 UAE restaurants, KSA team setup',
      '2028: 5,000 restaurants, GCC leadership',
    ],
    
    // Team
    team: 'Team',
    teamLine: '7+ years building restaurant delivery infrastructure',
    founders: 'Fakhriddin Yusupov (CEO), Azizbek Bakhodirov (COO), Abdullo Khidoyatov (CTO)',
    background: 'From: Express24, Chocofood, MaxWay, Oson, UDEVS',
    
    // Investors
    backedBy: 'Backed by AloqaVentures (Pre-seed)',
    
    // Contact
    contact: 'Contact',
    email: 'support@delever.uz',
    website: 'delever.io/investors',
  },
  ru: {
    tagline: 'Операционная система для ресторанов и городской коммерции',
    description: 'Delever объединяет все каналы, операции, курьеров, платежи и взаимодействие с клиентами в единую платформу — обеспечивая работу тысяч ресторанов и миллионов заказов в Центральной Азии и GCC.',
    
    whatWeDo: 'Что мы делаем',
    whatWeDoItems: [
      'Единая платформа: POS, доставка, сайт, приложение, курьеры, платежи, маркетинг и аналитика',
      'Снижение зависимости от агрегаторов (экономия 25-40% комиссии)',
      'Полный контроль над данными клиентов и прямыми каналами',
    ],
    
    market: 'Рынок',
    tam: '$250B+',
    tamLabel: 'TAM Food-Tech инфраструктура',
    
    traction: 'Показатели',
    metrics: [
      { value: '1 000+', label: 'Ресторанов' },
      { value: '25K+', label: 'Заказов/день' },
      { value: '$50M+', label: 'GMV/год' },
      { value: '7', label: 'Стран' },
    ],
    
    valueProps: 'Ключевые метрики',
    values: [
      { value: '+35%', label: 'Прямые заказы' },
      { value: '-30%', label: 'Затраты на доставку' },
      { value: '+40%', label: 'Удержание' },
      { value: '<1%', label: 'Отток' },
    ],
    
    geography: 'География',
    currentMarkets: 'Работаем: Узбекистан, Казахстан, ОАЭ, Азербайджан, Кыргызстан, Грузия, Кипр',
    expansion: 'Расширение: Саудовская Аравия, Кувейт, Катар, Оман, Турция',
    
    roadmap: 'Дорожная карта',
    roadmapItems: [
      '2026: AI Suite, 500+ ресторанов ОАЭ',
      '2027: 1 500 ресторанов ОАЭ, команда в KSA',
      '2028: 5 000 ресторанов, лидерство GCC',
    ],
    
    team: 'Команда',
    teamLine: '7+ лет создания инфраструктуры доставки',
    founders: 'Фахриддин Юсупов (CEO), Азизбек Баходиров (COO), Абдулло Хидоятов (CTO)',
    background: 'Из: Express24, Chocofood, MaxWay, Oson, UDEVS',
    
    backedBy: 'При поддержке AloqaVentures (Pre-seed)',
    
    contact: 'Контакты',
    email: 'support@delever.uz',
    website: 'delever.io/investors',
  },
  uz: {
    tagline: 'Restoranlar va shahar tijorati uchun operatsion tizim',
    description: 'Delever barcha kanallar, operatsiyalar, kuryerlar, to\'lovlar va mijozlar bilan munosabatlarni yagona platformaga birlashtiradi — Markaziy Osiyo va GCC bo\'ylab minglab restoranlar va millionlab buyurtmalarga xizmat ko\'rsatadi.',
    
    whatWeDo: 'Biz nima qilamiz',
    whatWeDoItems: [
      'Yagona platforma: POS, yetkazib berish, sayt, ilova, kuryerlar, to\'lovlar, marketing va tahlil',
      'Agregatorlarga bog\'liqlikni kamaytirish (25-40% komissiya tejash)',
      'Mijoz ma\'lumotlari va to\'g\'ridan-to\'g\'ri kanallar ustidan to\'liq nazorat',
    ],
    
    market: 'Bozor',
    tam: '$250B+',
    tamLabel: 'TAM Food-Tech infratuzilma',
    
    traction: 'Ko\'rsatkichlar',
    metrics: [
      { value: '1 000+', label: 'Restoranlar' },
      { value: '25K+', label: 'Kunlik buyurtmalar' },
      { value: '$50M+', label: 'Yillik GMV' },
      { value: '7', label: 'Mamlakatlar' },
    ],
    
    valueProps: 'Asosiy metrikalar',
    values: [
      { value: '+35%', label: 'To\'g\'ri buyurtmalar' },
      { value: '-30%', label: 'Yetkazib berish xarajatlari' },
      { value: '+40%', label: 'Ushlab qolish' },
      { value: '<1%', label: 'Ketish' },
    ],
    
    geography: 'Geografiya',
    currentMarkets: 'Ishlayapmiz: O\'zbekiston, Qozog\'iston, BAA, Ozarbayjon, Qirg\'iziston, Gruziya, Kipr',
    expansion: 'Kengayish: Saudiya Arabistoni, Kuvayt, Qatar, Ummon, Turkiya',
    
    roadmap: 'Yo\'l xaritasi',
    roadmapItems: [
      '2026: AI Suite, 500+ BAA restoranlari',
      '2027: 1 500 BAA restoranlari, KSA jamoasi',
      '2028: 5 000 restoran, GCC yetakchiligi',
    ],
    
    team: 'Jamoa',
    teamLine: '7+ yil yetkazib berish infratuzilmasini yaratish',
    founders: 'Faxriddin Yusupov (CEO), Azizbek Baxodirov (COO), Abdullo Xidoyatov (CTO)',
    background: 'Quyerdan: Express24, Chocofood, MaxWay, Oson, UDEVS',
    
    backedBy: 'AloqaVentures qo\'llab-quvvatlaydi (Pre-seed)',
    
    contact: 'Aloqa',
    email: 'support@delever.uz',
    website: 'delever.io/investors',
  },
}

function generateOnePagerHTML(language: Language): string {
  const t = translations[language] || translations.en

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Delever - One Pager</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: white;
      color: #0f172a;
      line-height: 1.4;
      font-size: 11px;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 15mm;
      margin: 0 auto;
      background: white;
      position: relative;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid #0f172a;
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo svg {
      height: 40px;
      width: auto;
    }
    
    .tagline {
      font-size: 13px;
      color: #64748b;
      max-width: 280px;
      text-align: right;
    }
    
    /* Description */
    .description {
      font-size: 12px;
      color: #334155;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    
    /* Grid layout */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    
    /* Sections */
    .section {
      margin-bottom: 12px;
    }
    
    .section-title {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .section-title::before {
      content: '';
      width: 3px;
      height: 12px;
      background: linear-gradient(180deg, #10b981, #3b82f6);
      border-radius: 2px;
    }
    
    /* Cards */
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
    }
    
    .card-dark {
      background: #0f172a;
      color: white;
      border: none;
    }
    
    .card-gradient {
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
      color: white;
      border: none;
    }
    
    /* Metrics */
    .metric {
      text-align: center;
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    
    .metric-value {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }
    
    .metric-label {
      font-size: 9px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    
    .metric-green .metric-value {
      color: #10b981;
    }
    
    /* Value props */
    .value-item {
      background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
      border: 1px solid #a7f3d0;
      border-radius: 6px;
      padding: 8px;
      text-align: center;
    }
    
    .value-item .value {
      font-size: 16px;
      font-weight: 700;
      color: #059669;
    }
    
    .value-item .label {
      font-size: 8px;
      color: #047857;
      text-transform: uppercase;
    }
    
    /* TAM box */
    .tam-box {
      background: linear-gradient(135deg, #0f172a, #1e3a5f);
      color: white;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
    }
    
    .tam-value {
      font-size: 36px;
      font-weight: 800;
      color: #10b981;
    }
    
    .tam-label {
      font-size: 11px;
      color: rgba(255,255,255,0.8);
    }
    
    /* List */
    .list {
      list-style: none;
    }
    
    .list li {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
      font-size: 10px;
      color: #334155;
    }
    
    .list li::before {
      content: '→';
      color: #10b981;
      font-weight: 700;
      flex-shrink: 0;
    }
    
    /* Roadmap */
    .roadmap-item {
      font-size: 9px;
      color: #334155;
      padding: 6px 8px;
      background: #f1f5f9;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    
    /* Team */
    .team-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
    }
    
    .team-founders {
      font-size: 11px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 4px;
    }
    
    .team-background {
      font-size: 9px;
      color: #64748b;
      margin-bottom: 6px;
    }
    
    .team-backed {
      font-size: 10px;
      color: #3b82f6;
      font-weight: 600;
    }
    
    /* Geography */
    .geo-text {
      font-size: 9px;
      color: #334155;
      margin-bottom: 3px;
    }
    
    /* Contact */
    .contact-box {
      background: linear-gradient(135deg, #0f172a, #1e3a5f);
      color: white;
      padding: 12px 15px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    
    .contact-info {
      font-size: 11px;
    }
    
    .contact-info strong {
      color: #10b981;
    }
    
    .contact-cta {
      font-size: 10px;
      background: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
    }
    
    /* Footer */
    .footer {
      position: absolute;
      bottom: 15mm;
      left: 15mm;
      right: 15mm;
      text-align: center;
      font-size: 8px;
      color: #94a3b8;
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }
    
    @media screen {
      .page {
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        margin: 20px auto;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="logo">${LOGO_ORIGINAL_SVG}</div>
      <div class="tagline">${t.tagline}</div>
    </div>
    
    <!-- Description -->
    <p class="description">${t.description}</p>
    
    <!-- Main Grid -->
    <div class="grid-2">
      <!-- Left Column -->
      <div>
        <!-- What We Do -->
        <div class="section">
          <div class="section-title">${t.whatWeDo}</div>
          <ul class="list">
            ${t.whatWeDoItems.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        
        <!-- Traction -->
        <div class="section">
          <div class="section-title">${t.traction}</div>
          <div class="grid-4">
            ${t.metrics.map(m => `
              <div class="metric">
                <div class="metric-value">${m.value}</div>
                <div class="metric-label">${m.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Value Props -->
        <div class="section">
          <div class="section-title">${t.valueProps}</div>
          <div class="grid-4">
            ${t.values.map(v => `
              <div class="value-item">
                <div class="value">${v.value}</div>
                <div class="label">${v.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Geography -->
        <div class="section">
          <div class="section-title">${t.geography}</div>
          <p class="geo-text"><strong>✓</strong> ${t.currentMarkets}</p>
          <p class="geo-text"><strong>→</strong> ${t.expansion}</p>
        </div>
      </div>
      
      <!-- Right Column -->
      <div>
        <!-- TAM -->
        <div class="section">
          <div class="section-title">${t.market}</div>
          <div class="tam-box">
            <div class="tam-value">${t.tam}</div>
            <div class="tam-label">${t.tamLabel}</div>
          </div>
        </div>
        
        <!-- Roadmap -->
        <div class="section">
          <div class="section-title">${t.roadmap}</div>
          ${t.roadmapItems.map(item => `<div class="roadmap-item">${item}</div>`).join('')}
        </div>
        
        <!-- Team -->
        <div class="section">
          <div class="section-title">${t.team}</div>
          <div class="team-box">
            <div class="team-founders">${t.founders}</div>
            <div class="team-background">${t.background}</div>
            <div class="team-background">${t.teamLine}</div>
            <div class="team-backed">${t.backedBy}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact -->
    <div class="contact-box">
      <div class="contact-info">
        <strong>${t.email}</strong> · ${t.website}
      </div>
      <div class="contact-cta">${t.contact}</div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      © 2025 Delever. All rights reserved.
    </div>
  </div>
</body>
</html>`
}

export function downloadOnePager(language: Language): void {
  const html = generateOnePagerHTML(language)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `Delever_One_Pager_${language.toUpperCase()}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

