// Генератор PDF презентации Delever

interface PresentationData {
  language: 'ru' | 'en'
  brandName?: string // Название бренда клиента
  // Персональные данные (если есть)
  customData?: {
    planName: string
    branches: number
    monthlyOrders: number
    avgCheck: string
    totalCost: string
    deposit: string
    roiSavings?: string
    roiYearlySavings?: string
  }
}

// Примеры реализованных проектов
const clientExamples = {
  websites: [
    { name: 'Yaponamama', url: 'yaponamama.uz' },
    { name: 'Maxway', url: 'maxway.uz' },
    { name: 'Kamolon Osh', url: 'kamolonosh.uz' },
    { name: "Hardee's", url: 'hardees.delever.uz' },
    { name: 'Pizza Hut', url: 'pizzahutuz.delever.uz' },
    { name: 'Cheeseria (KZ)', url: 'cheeseria.delever.kz' },
  ],
  apps: [
    { name: 'Yaponamama', platform: 'iOS & Android' },
    { name: 'Maxway', platform: 'iOS & Android' },
    { name: 'Chicago Pizza', platform: 'iOS' },
    { name: 'Takumi Sushi', platform: 'iOS' },
    { name: 'Zoo Planeta', platform: 'iOS' },
  ],
}

export function generatePresentation(data: PresentationData): string {
  const { language, customData, brandName } = data
  const isRu = language === 'ru'
  
  // Если есть brandName, показываем персонализированный заголовок
  const personalizedTitle = brandName 
    ? `${brandName} × Delever` 
    : 'Delever'
  
  const text = {
    // Слайд 1 - Обложка
    title: personalizedTitle,
    tagline: isRu ? '№1 Платформа для автоматизации доставки' : '#1 Delivery Automation Platform',
    subtitle: brandName 
      ? (isRu ? `Персональное предложение для ${brandName}` : `Personal offer for ${brandName}`)
      : (isRu ? 'Единая система управления для ресторанов, кафе и магазинов' : 'Unified management system for restaurants, cafes and stores'),
    
    // Слайд 2 - Проблемы
    problemsTitle: isRu ? 'Знакомые проблемы?' : 'Familiar problems?',
    problems: isRu ? [
      { icon: '💸', text: 'Теряете 20-35% на комиссиях агрегаторов' },
      { icon: '⏱️', text: '3 из 10 заказов доставляются с опозданием' },
      { icon: '👋', text: '85% клиентов покупают один раз и уходят' },
      { icon: '🔀', text: 'Хаос: заказы в 5 разных системах' },
      { icon: '📊', text: 'Нет данных для принятия решений' },
      { icon: '⭐', text: 'Низкий рейтинг = меньше заказов' },
    ] : [
      { icon: '💸', text: 'Losing 20-35% on aggregator commissions' },
      { icon: '⏱️', text: '3 out of 10 orders delivered late' },
      { icon: '👋', text: '85% of customers buy once and leave' },
      { icon: '🔀', text: 'Chaos: orders in 5 different systems' },
      { icon: '📊', text: 'No data for decision making' },
      { icon: '⭐', text: 'Low rating = fewer orders' },
    ],
    
    // Слайд 3 - Решение
    solutionTitle: isRu ? 'Delever решает все эти проблемы' : 'Delever solves all these problems',
    solutionSubtitle: isRu ? 'Единая платформа для управления всем бизнесом доставки' : 'Single platform to manage your entire delivery business',
    solutions: isRu ? [
      { metric: '0%', label: 'Комиссия на своих каналах' },
      { metric: '35%', label: 'Быстрее доставка' },
      { metric: '3x', label: 'Рост повторных заказов' },
      { metric: '1', label: 'Система вместо 5+' },
    ] : [
      { metric: '0%', label: 'Commission on own channels' },
      { metric: '35%', label: 'Faster delivery' },
      { metric: '3x', label: 'Repeat orders growth' },
      { metric: '1', label: 'System instead of 5+' },
    ],
    
    // Слайд 4 - Каналы продаж
    channelsTitle: isRu ? 'Свои каналы продаж' : 'Own Sales Channels',
    channels: isRu ? [
      { name: 'Веб-сайт', desc: 'Брендированный сайт с онлайн-заказами' },
      { name: 'Telegram бот', desc: 'Заказы прямо в мессенджере' },
      { name: 'Мобильное приложение', desc: 'iOS и Android под вашим брендом' },
      { name: 'QR-меню', desc: 'Заказ со стола в заведении' },
    ] : [
      { name: 'Website', desc: 'Branded website with online orders' },
      { name: 'Telegram bot', desc: 'Orders directly in messenger' },
      { name: 'Mobile app', desc: 'iOS and Android under your brand' },
      { name: 'QR menu', desc: 'Order from table in venue' },
    ],
    
    // Слайд 5 - Интеграции
    integrationsTitle: isRu ? 'Интеграции' : 'Integrations',
    integrations: isRu ? [
      { category: 'Агрегаторы', items: 'Yandex Eats, Wolt, Glovo, Uzum, Bolt' },
      { category: 'Курьерские службы', items: 'Yandex Delivery, Wolt Drive, Millennium' },
      { category: 'Оплата', items: 'Payme, Click, Uzum, Visa, Mastercard' },
      { category: 'POS системы', items: 'R-Keeper, iiko, Poster, Jowi' },
    ] : [
      { category: 'Aggregators', items: 'Yandex Eats, Wolt, Glovo, Uzum, Bolt' },
      { category: 'Courier services', items: 'Yandex Delivery, Wolt Drive, Millennium' },
      { category: 'Payments', items: 'Payme, Click, Uzum, Visa, Mastercard' },
      { category: 'POS systems', items: 'R-Keeper, iiko, Poster, Jowi' },
    ],
    
    // Слайд 6 - Функционал
    featuresTitle: isRu ? 'Полный функционал' : 'Full Functionality',
    features: isRu ? [
      { icon: '📦', name: 'Управление заказами', desc: 'Все заказы в одном месте' },
      { icon: '🚴', name: 'Курьерское приложение', desc: 'GPS-трекинг и маршруты' },
      { icon: '👥', name: 'CRM и лояльность', desc: 'Кешбэк, бонусы, сегментация' },
      { icon: '📊', name: 'Аналитика', desc: 'Дашборды и отчёты' },
      { icon: '📱', name: 'Маркетинг', desc: 'Push, SMS, email рассылки' },
      { icon: '🍳', name: 'Кухня (KDS)', desc: 'Экраны для поваров' },
    ] : [
      { icon: '📦', name: 'Order Management', desc: 'All orders in one place' },
      { icon: '🚴', name: 'Courier App', desc: 'GPS tracking and routes' },
      { icon: '👥', name: 'CRM & Loyalty', desc: 'Cashback, bonuses, segmentation' },
      { icon: '📊', name: 'Analytics', desc: 'Dashboards and reports' },
      { icon: '📱', name: 'Marketing', desc: 'Push, SMS, email campaigns' },
      { icon: '🍳', name: 'Kitchen (KDS)', desc: 'Screens for chefs' },
    ],
    
    // Слайд 7 - Результаты
    resultsTitle: isRu ? 'Результаты клиентов' : 'Client Results',
    results: isRu ? [
      { metric: '1000+', label: 'Бизнесов используют Delever' },
      { metric: '7', label: 'Стран присутствия' },
      { metric: '+30%', label: 'Средний рост выручки' },
      { metric: '13M+', label: 'Обработано заказов' },
    ] : [
      { metric: '1000+', label: 'Businesses use Delever' },
      { metric: '7', label: 'Countries presence' },
      { metric: '+30%', label: 'Average revenue growth' },
      { metric: '13M+', label: 'Orders processed' },
    ],
    
    // Слайд 8 - Тарифы
    pricingTitle: isRu ? 'Тарифы' : 'Pricing',
    plans: isRu ? [
      { name: 'Start', orders: 'до 1 000 заказов', price: '1 300 000 сум' },
      { name: 'Medium', orders: 'до 3 000 заказов', price: '3 250 000 сум', popular: true },
      { name: 'Big', orders: 'до 6 000 заказов', price: '6 500 000 сум' },
      { name: 'Enterprise', orders: 'до 10 000 заказов', price: '13 000 000 сум' },
    ] : [
      { name: 'Start', orders: 'up to 1,000 orders', price: '$150' },
      { name: 'Medium', orders: 'up to 3,000 orders', price: '$280', popular: true },
      { name: 'Big', orders: 'up to 6,000 orders', price: '$580' },
      { name: 'Enterprise', orders: 'up to 10,000 orders', price: '$1,100' },
    ],
    
    // Слайд 9 - Примеры клиентов
    examplesTitle: isRu ? 'Наши клиенты' : 'Our Clients',
    examplesSubtitle: isRu ? 'Реализованные проекты на платформе Delever' : 'Projects built on Delever platform',
    websitesLabel: isRu ? 'Сайты' : 'Websites',
    appsLabel: isRu ? 'Мобильные приложения' : 'Mobile Apps',
    
    // Слайд 10 - Контакты
    contactsTitle: isRu ? 'Начните сегодня' : 'Start Today',
    contactsSubtitle: isRu ? 'Свяжитесь с нами для демонстрации' : 'Contact us for a demo',
    
    // Персональный слайд
    customTitle: isRu ? 'Ваше персональное предложение' : 'Your Personal Offer',
    customPlan: isRu ? 'Выбранный тариф' : 'Selected Plan',
    customParams: isRu ? 'Параметры бизнеса' : 'Business Parameters',
    customRoi: isRu ? 'Расчёт выгоды' : 'ROI Calculation',
    branches: isRu ? 'Филиалов' : 'Branches',
    orders: isRu ? 'Заказов/мес' : 'Orders/mo',
    avgCheck: isRu ? 'Средний чек' : 'Avg Check',
    monthlyCost: isRu ? 'Ежемесячно' : 'Monthly',
    deposit: isRu ? 'Депозит' : 'Deposit',
    savings: isRu ? 'Экономия' : 'Savings',
    yearlySavings: isRu ? 'Годовая экономия' : 'Yearly savings',
  }

  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      
      * { margin: 0; padding: 0; box-sizing: border-box; }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f8fafc;
        color: #002A47;
      }
      
      .slide {
        width: 100%;
        min-height: 100vh;
        padding: 60px 80px;
        page-break-after: always;
        display: flex;
        flex-direction: column;
      }
      
      .slide:last-child { page-break-after: auto; }
      
      /* Слайд 1 - Обложка */
      .slide-cover {
        background: linear-gradient(135deg, #002A47 0%, #004d7a 100%);
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      
      .logo { font-size: 72px; font-weight: 800; margin-bottom: 20px; }
      .tagline { font-size: 28px; font-weight: 600; color: #FFD700; margin-bottom: 16px; }
      .subtitle { font-size: 20px; opacity: 0.8; max-width: 600px; }
      
      /* Общие стили слайдов */
      .slide-title {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 12px;
        color: #002A47;
      }
      
      .slide-subtitle {
        font-size: 18px;
        color: #64748b;
        margin-bottom: 40px;
      }
      
      /* Сетки */
      .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
      .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .grid-6 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      
      /* Карточки */
      .card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      }
      
      .card-icon {
        font-size: 32px;
        margin-bottom: 12px;
      }
      
      .card-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .card-desc {
        font-size: 14px;
        color: #64748b;
      }
      
      /* Проблемы */
      .problem-card {
        background: #FFF5F5;
        border-left: 4px solid #EF4444;
        padding: 20px;
        border-radius: 12px;
      }
      
      .problem-icon { font-size: 24px; margin-right: 12px; }
      .problem-text { font-size: 15px; color: #991B1B; }
      
      /* Метрики */
      .metric-card {
        background: linear-gradient(135deg, #002A47, #004d7a);
        color: white;
        border-radius: 16px;
        padding: 30px;
        text-align: center;
      }
      
      .metric-value {
        font-size: 48px;
        font-weight: 800;
        color: #10B981;
      }
      
      .metric-label {
        font-size: 14px;
        opacity: 0.8;
        margin-top: 8px;
      }
      
      /* Тарифы */
      .plan-card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        border: 2px solid #e2e8f0;
      }
      
      .plan-card.popular {
        border-color: #002A47;
        background: linear-gradient(180deg, #f0f9ff 0%, white 100%);
      }
      
      .plan-badge {
        background: #10B981;
        color: white;
        font-size: 11px;
        padding: 4px 12px;
        border-radius: 20px;
        margin-bottom: 12px;
        display: inline-block;
      }
      
      .plan-name { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
      .plan-orders { font-size: 14px; color: #64748b; margin-bottom: 16px; }
      .plan-price { font-size: 28px; font-weight: 700; color: #002A47; }
      
      /* Интеграции */
      .integration-row {
        display: flex;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .integration-category {
        font-weight: 600;
        width: 180px;
        color: #002A47;
      }
      
      .integration-items { color: #64748b; }
      
      /* Контакты */
      .slide-contacts {
        background: linear-gradient(135deg, #002A47 0%, #004d7a 100%);
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      
      .contacts-title { font-size: 42px; font-weight: 700; margin-bottom: 16px; }
      .contacts-subtitle { font-size: 20px; opacity: 0.8; margin-bottom: 40px; }
      
      .contact-info {
        display: flex;
        gap: 40px;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .contact-item {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      /* Персональное предложение */
      .custom-slide {
        background: linear-gradient(180deg, #f0fdf4 0%, white 100%);
      }
      
      .custom-header {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        margin-bottom: 30px;
      }
      
      .custom-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }
      
      .custom-section {
        background: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      }
      
      .custom-section-title {
        font-size: 16px;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .custom-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
      }
      
      .custom-label { color: #64748b; }
      .custom-value { font-weight: 600; color: #002A47; }
      
      .savings-box {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        border-radius: 16px;
        padding: 30px;
        text-align: center;
        margin-top: 30px;
      }
      
      .savings-value { font-size: 42px; font-weight: 800; }
      .savings-label { font-size: 16px; opacity: 0.9; margin-top: 8px; }
      
      @media print {
        .slide { min-height: 100vh; }
      }
    </style>
  `

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Delever - ${text.tagline}</title>
  ${styles}
</head>
<body>
  <!-- Слайд 1: Обложка -->
  <div class="slide slide-cover">
    <div class="logo">🚀 ${text.title}</div>
    <div class="tagline">${text.tagline}</div>
    <div class="subtitle">${text.subtitle}</div>
  </div>
  
  <!-- Слайд 2: Проблемы -->
  <div class="slide">
    <h1 class="slide-title">${text.problemsTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'С этими проблемами сталкивается каждый бизнес доставки' : 'Every delivery business faces these problems'}</div>
    <div class="grid-2">
      ${text.problems.map(p => `
        <div class="problem-card">
          <span class="problem-icon">${p.icon}</span>
          <span class="problem-text">${p.text}</span>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 3: Решение -->
  <div class="slide">
    <h1 class="slide-title">${text.solutionTitle}</h1>
    <div class="slide-subtitle">${text.solutionSubtitle}</div>
    <div class="grid-4">
      ${text.solutions.map(s => `
        <div class="metric-card">
          <div class="metric-value">${s.metric}</div>
          <div class="metric-label">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 4: Каналы продаж -->
  <div class="slide">
    <h1 class="slide-title">${text.channelsTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'Принимайте заказы без комиссий' : 'Accept orders without commissions'}</div>
    <div class="grid-4">
      ${text.channels.map(c => `
        <div class="card">
          <div class="card-title">${c.name}</div>
          <div class="card-desc">${c.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 5: Интеграции -->
  <div class="slide">
    <h1 class="slide-title">${text.integrationsTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'Работаем со всеми популярными сервисами' : 'We work with all popular services'}</div>
    <div class="card" style="flex: 1;">
      ${text.integrations.map(i => `
        <div class="integration-row">
          <div class="integration-category">${i.category}</div>
          <div class="integration-items">${i.items}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 6: Функционал -->
  <div class="slide">
    <h1 class="slide-title">${text.featuresTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'Всё необходимое для управления бизнесом' : 'Everything you need to manage your business'}</div>
    <div class="grid-3">
      ${text.features.map(f => `
        <div class="card">
          <div class="card-icon">${f.icon}</div>
          <div class="card-title">${f.name}</div>
          <div class="card-desc">${f.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 7: Результаты -->
  <div class="slide">
    <h1 class="slide-title">${text.resultsTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'Проверено на 1000+ бизнесов' : 'Proven on 1000+ businesses'}</div>
    <div class="grid-4">
      ${text.results.map(r => `
        <div class="metric-card">
          <div class="metric-value">${r.metric}</div>
          <div class="metric-label">${r.label}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 8: Тарифы -->
  <div class="slide">
    <h1 class="slide-title">${text.pricingTitle}</h1>
    <div class="slide-subtitle">${isRu ? 'Выберите подходящий тариф' : 'Choose the right plan'}</div>
    <div class="grid-4">
      ${text.plans.map(p => `
        <div class="plan-card ${p.popular ? 'popular' : ''}">
          ${p.popular ? `<div class="plan-badge">${isRu ? 'Популярный' : 'Popular'}</div>` : ''}
          <div class="plan-name">${p.name}</div>
          <div class="plan-orders">${p.orders}</div>
          <div class="plan-price">${p.price}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- Слайд 9: Примеры клиентов -->
  <div class="slide">
    <h1 class="slide-title">${text.examplesTitle}</h1>
    <div class="slide-subtitle">${text.examplesSubtitle}</div>
    <div class="grid-2" style="gap: 40px;">
      <div class="card">
        <div class="card-title" style="font-size: 20px; margin-bottom: 20px;">🌐 ${text.websitesLabel}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${clientExamples.websites.map(c => `
            <div style="padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="font-weight: 600; color: #002A47;">${c.name}</div>
              <div style="font-size: 12px; color: #64748b;">${c.url}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title" style="font-size: 20px; margin-bottom: 20px;">📱 ${text.appsLabel}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${clientExamples.apps.map(c => `
            <div style="padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="font-weight: 600; color: #002A47;">${c.name}</div>
              <div style="font-size: 12px; color: #64748b;">${c.platform}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Слайд 10: Контакты -->
  <div class="slide slide-contacts">
    <div class="contacts-title">${text.contactsTitle}</div>
    <div class="contacts-subtitle">${text.contactsSubtitle}</div>
    <div class="contact-info">
      <div class="contact-item">🌐 delever.io</div>
      <div class="contact-item">📧 info@delever.uz</div>
      <div class="contact-item">📞 +998 78 113 98 13</div>
    </div>
  </div>
  
  ${customData ? `
  <!-- Слайд 11: Персональное предложение -->
  <div class="slide custom-slide">
    <div class="custom-header">
      <h1 style="font-size: 32px; margin-bottom: 8px;">${text.customTitle}</h1>
      <p style="opacity: 0.9;">${isRu ? 'Специально для вашего бизнеса' : 'Specially for your business'}</p>
    </div>
    
    <div class="custom-grid">
      <div class="custom-section">
        <div class="custom-section-title">${text.customPlan}</div>
        <div style="font-size: 32px; font-weight: 700; color: #002A47; margin-bottom: 16px;">${customData.planName}</div>
        <div class="custom-row">
          <span class="custom-label">${text.monthlyCost}</span>
          <span class="custom-value">${customData.totalCost}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${text.deposit}</span>
          <span class="custom-value">${customData.deposit}</span>
        </div>
      </div>
      
      <div class="custom-section">
        <div class="custom-section-title">${text.customParams}</div>
        <div class="custom-row">
          <span class="custom-label">${text.branches}</span>
          <span class="custom-value">${customData.branches}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${text.orders}</span>
          <span class="custom-value">${customData.monthlyOrders.toLocaleString()}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${text.avgCheck}</span>
          <span class="custom-value">${customData.avgCheck}</span>
        </div>
      </div>
    </div>
    
    ${customData.roiSavings ? `
    <div class="savings-box">
      <div class="savings-value">+${customData.roiSavings}/${isRu ? 'мес' : 'mo'}</div>
      <div class="savings-label">${text.savings}</div>
      ${customData.roiYearlySavings ? `<div style="margin-top: 12px; opacity: 0.9;">${text.yearlySavings}: ${customData.roiYearlySavings}</div>` : ''}
    </div>
    ` : ''}
  </div>
  ` : ''}
</body>
</html>
  `

  return html
}

// Функция скачивания презентации
export function downloadPresentation(data: PresentationData, filename = 'Delever_Presentation') {
  const html = generatePresentation(data)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

