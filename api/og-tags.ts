// Edge function to serve proper OG tags for social media bots
// This solves the problem of SPA not having proper meta tags for link previews

export const config = {
  runtime: 'edge',
}

interface PageMeta {
  title: string
  description: string
  image?: string
}

// Define meta tags for each page
const pageMeta: Record<string, Record<string, PageMeta>> = {
  '/': {
    ru: {
      title: 'Delever — Единая платформа для управления доставкой',
      description: 'Управляйте всеми каналами продаж, операциями доставки и аналитикой из одного места. 1000+ ресторанов в 7 странах. Запуск за 1 день.',
    },
    en: {
      title: 'Delever — The Operating System for Delivery',
      description: 'Manage all sales channels, delivery operations and analytics from one place. 1000+ restaurants in 7 countries. Launch in 1 day.',
    },
    uz: {
      title: "Delever — Yetkazib berishni boshqarish uchun yagona platforma",
      description: "Barcha savdo kanallari, yetkazib berish operatsiyalari va tahlillarni bir joydan boshqaring. 7 ta mamlakatda 1000+ restoranlar.",
    },
  },
  '/investors': {
    ru: {
      title: 'Инвесторам — Delever | Операционная система для ресторанов',
      description: 'Delever строит цифровую инфраструктуру для food-tech в развивающихся рынках. $100M+ GMV, 1000+ ресторанов, 7 стран. TAM $250B+.',
    },
    en: {
      title: 'For Investors — Delever | Restaurant Operating System',
      description: 'Delever is building the digital backbone for food-tech in emerging markets. $100M+ GMV, 1000+ restaurants, 7 countries. TAM $250B+.',
    },
    uz: {
      title: "Investorlar uchun — Delever | Restoranlar uchun operatsion tizim",
      description: "Delever rivojlanayotgan bozorlarda food-tech uchun raqamli infratuzilma yaratmoqda. $100M+ GMV, 1000+ restoranlar, 7 mamlakat.",
    },
  },
  '/esg': {
    ru: {
      title: 'ESG & Устойчивое развитие — Delever',
      description: 'Delever снижает углеродный след городской доставки, улучшает условия труда и поддерживает малый бизнес. Устойчивое развитие food-tech.',
    },
    en: {
      title: 'ESG & Sustainability — Delever',
      description: 'Delever reduces the environmental impact of last-mile logistics, improves working conditions, and supports small businesses.',
    },
    uz: {
      title: "ESG & Barqaror rivojlanish — Delever",
      description: "Delever shahardagi yetkazib berishning ekologik ta'sirini kamaytiradi, mehnat sharoitlarini yaxshilaydi va kichik biznesni qo'llab-quvvatlaydi.",
    },
  },
  '/products': {
    ru: {
      title: 'Все продукты — Delever | Единая платформа для доставки',
      description: 'Каналы продаж, операции, курьеры, CRM, аналитика — всё в одной системе. 40+ интеграций, 99.9% uptime, поддержка 24/7.',
    },
    en: {
      title: 'All Products — Delever | Unified Delivery Platform',
      description: 'Sales channels, operations, couriers, CRM, analytics — all in one system. 40+ integrations, 99.9% uptime, 24/7 support.',
    },
    uz: {
      title: "Barcha mahsulotlar — Delever | Yagona yetkazib berish platformasi",
      description: "Savdo kanallari, operatsiyalar, kuryerlar, CRM, tahlil — hammasi bitta tizimda. 40+ integratsiyalar, 99.9% uptime.",
    },
  },
  '/products/channels': {
    ru: {
      title: 'Каналы продаж — Delever | Сайт, приложение, Telegram-бот',
      description: 'Запустите собственные каналы продаж без комиссий агрегаторов. Сайт, мобильное приложение, Telegram mini-app, QR-меню.',
    },
    en: {
      title: 'Sales Channels — Delever | Website, App, Telegram Bot',
      description: 'Launch your own sales channels without aggregator fees. Website, mobile app, Telegram mini-app, QR menu.',
    },
    uz: {
      title: "Savdo kanallari — Delever | Sayt, ilova, Telegram-bot",
      description: "Agregator komissiyalarisiz o'z savdo kanallaringizni ishga tushiring. Sayt, mobil ilova, Telegram mini-app, QR-menyu.",
    },
  },
  '/products/operations': {
    ru: {
      title: 'Операции — Delever | Управление заказами и кухней',
      description: 'Единый экран для всех заказов. Диспетчеризация, KDS для кухни, интеграция с POS. Снижение ошибок на 30%.',
    },
    en: {
      title: 'Operations — Delever | Order & Kitchen Management',
      description: 'Single screen for all orders. Dispatch, KDS for kitchen, POS integration. Reduce errors by 30%.',
    },
    uz: {
      title: "Operatsiyalar — Delever | Buyurtmalar va oshxona boshqaruvi",
      description: "Barcha buyurtmalar uchun yagona ekran. Dispetcherlik, oshxona uchun KDS, POS integratsiyasi. Xatolarni 30% ga kamaytirish.",
    },
  },
  '/products/analytics': {
    ru: {
      title: 'Аналитика — Delever | Дашборды и отчёты в реальном времени',
      description: 'CEO-дашборд, отчёты по продажам, курьерам, клиентам. AI-прогнозы спроса. Принимайте решения на основе данных.',
    },
    en: {
      title: 'Analytics — Delever | Real-time Dashboards & Reports',
      description: 'CEO dashboard, sales reports, courier analytics, customer insights. AI demand forecasting. Data-driven decisions.',
    },
    uz: {
      title: "Tahlil — Delever | Real vaqtda dashboardlar va hisobotlar",
      description: "CEO dashboardi, sotuv hisobotlari, kuryer tahlili, mijoz ma'lumotlari. AI talab prognozi. Ma'lumotlarga asoslangan qarorlar.",
    },
  },
  '/products/marketing': {
    ru: {
      title: 'Маркетинг и CRM — Delever | Лояльность и рассылки',
      description: 'RFM-анализ, Push/SMS рассылки, программа лояльности, промокоды. Рост повторных заказов на 40%.',
    },
    en: {
      title: 'Marketing & CRM — Delever | Loyalty & Campaigns',
      description: 'RFM analysis, Push/SMS campaigns, loyalty program, promo codes. Increase repeat orders by 40%.',
    },
    uz: {
      title: "Marketing va CRM — Delever | Sadoqat va jo'natmalar",
      description: "RFM-tahlil, Push/SMS jo'natmalar, sadoqat dasturi, promokodlar. Takroriy buyurtmalarni 40% ga oshirish.",
    },
  },
  '/pricing': {
    ru: {
      title: 'Тарифы — Delever | Калькулятор стоимости доставки',
      description: 'Прозрачные тарифы без скрытых платежей. От 990,000 сум/мес. Бесплатный пробный период. ROI-калькулятор.',
    },
    en: {
      title: 'Pricing — Delever | Delivery Cost Calculator',
      description: 'Transparent pricing with no hidden fees. Free trial period. ROI calculator included.',
    },
    uz: {
      title: "Tariflar — Delever | Yetkazib berish narxi kalkulyatori",
      description: "Yashirin to'lovlarsiz shaffof tariflar. 990,000 so'm/oydan. Bepul sinov davri. ROI-kalkulyator.",
    },
  },
  '/about': {
    ru: {
      title: 'О компании — Delever | Лидер автоматизации доставки',
      description: 'Delever — платформа управления доставкой с 2020 года. 1000+ бизнесов, 7 стран, 13M+ обработанных заказов.',
    },
    en: {
      title: 'About Us — Delever | Delivery Automation Leader',
      description: 'Delever is a delivery management platform since 2020. 1000+ businesses, 7 countries, 13M+ orders processed.',
    },
    uz: {
      title: "Kompaniya haqida — Delever | Yetkazib berishni avtomatlashtirish yetakchisi",
      description: "Delever — 2020-yildan beri yetkazib berishni boshqarish platformasi. 1000+ bizneslar, 7 mamlakat, 13M+ qayta ishlangan buyurtmalar.",
    },
  },
  '/partners': {
    ru: {
      title: 'Партнёрская программа — Delever | До 30% комиссии',
      description: 'Зарабатывайте с Delever. До 30% комиссии за привлечённых клиентов. Маркетинговые материалы и поддержка.',
    },
    en: {
      title: 'Partner Program — Delever | Up to 30% Commission',
      description: 'Earn with Delever. Up to 30% commission for referred clients. Marketing materials and support provided.',
    },
    uz: {
      title: "Hamkorlik dasturi — Delever | 30% gacha komissiya",
      description: "Delever bilan pul ishlang. Jalb qilingan mijozlar uchun 30% gacha komissiya. Marketing materiallari va qo'llab-quvvatlash.",
    },
  },
  '/aggregators': {
    ru: {
      title: 'Интеграция с агрегаторами — Delever | Wolt, Glovo, Yandex Eats',
      description: 'Все агрегаторы в одном окне. Wolt, Glovo, Yandex Eats, Uzum Tezkor — без хаоса и ручной работы.',
    },
    en: {
      title: 'Aggregator Integration — Delever | Wolt, Glovo, Yandex Eats',
      description: 'All aggregators in one window. Wolt, Glovo, Yandex Eats, Uzum Tezkor — no chaos, no manual work.',
    },
    uz: {
      title: "Agregatorlar bilan integratsiya — Delever | Wolt, Glovo, Yandex Eats",
      description: "Barcha agregatorlar bitta oynada. Wolt, Glovo, Yandex Eats, Uzum Tezkor — tartibsizliksiz va qo'lda ishlamasdan.",
    },
  },
  '/white-label': {
    ru: {
      title: 'White Label решения — Delever | Своё приложение за 2 недели',
      description: 'Запустите брендированное приложение и сайт под своим именем. Полная кастомизация, без комиссий агрегаторов.',
    },
    en: {
      title: 'White Label Solutions — Delever | Your App in 2 Weeks',
      description: 'Launch a branded app and website under your name. Full customization, no aggregator fees.',
    },
    uz: {
      title: "White Label yechimlar — Delever | O'z ilovangiz 2 haftada",
      description: "O'z nomingiz ostida brendlangan ilova va saytni ishga tushiring. To'liq moslashtirish, agregator komissiyalarisiz.",
    },
  },
  '/integrations': {
    ru: {
      title: 'Интеграции — Delever | 40+ систем: iiko, R-Keeper, Poster',
      description: 'Готовые интеграции с POS-системами, платёжными сервисами, агрегаторами и курьерскими службами.',
    },
    en: {
      title: 'Integrations — Delever | 40+ Systems: iiko, R-Keeper, Poster',
      description: 'Ready integrations with POS systems, payment services, aggregators and courier services.',
    },
    uz: {
      title: "Integratsiyalar — Delever | 40+ tizimlar: iiko, R-Keeper, Poster",
      description: "POS-tizimlar, to'lov xizmatlari, agregatorlar va kuryer xizmatlari bilan tayyor integratsiyalar.",
    },
  },
}

// Detect language from Accept-Language header or URL
function detectLanguage(request: Request): string {
  const url = new URL(request.url)
  const langParam = url.searchParams.get('lang')
  if (langParam && ['ru', 'en', 'uz'].includes(langParam)) {
    return langParam
  }
  
  const acceptLang = request.headers.get('Accept-Language') || ''
  if (acceptLang.includes('uz')) return 'uz'
  if (acceptLang.includes('en')) return 'en'
  return 'ru'
}

export default async function handler(request: Request) {
  const url = new URL(request.url)
  let path = url.searchParams.get('path') || '/'
  
  // Clean up path
  if (path && !path.startsWith('/')) {
    path = '/' + path
  }
  // Remove trailing slash except for root
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1)
  }
  
  const lang = detectLanguage(request)
  const meta = pageMeta[path]?.[lang] || pageMeta[path]?.['ru'] || pageMeta['/']?.['ru']
  
  if (!meta) {
    return new Response('Page not found', { status: 404 })
  }
  
  const baseUrl = 'https://delever.io'
  const fullUrl = `${baseUrl}${path}`
  const imageUrl = meta.image || `${baseUrl}/og-image.png`
  
  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:site_name" content="Delever">
  <meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : lang === 'uz' ? 'uz_UZ' : 'en_US'}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Canonical -->
  <link rel="canonical" href="${fullUrl}">
  
  <!-- Redirect for non-bots -->
  <meta http-equiv="refresh" content="0;url=${fullUrl}">
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <a href="${fullUrl}">Visit Delever</a>
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

