// Генератор PDF презентации Delever

interface PresentationData {
  language: 'ru' | 'en' | 'uz'
  brandName?: string
  customData?: {
    planName: string
    branches: number
    monthlyOrders: number
    avgCheck: string
    totalCost: string
    deposit: string
    roiSavings?: string
    roiYearlySavings?: string
    // Дополнительные данные о выбранных опциях
    selectedModules?: string[]
    kioskCount?: number
    couriersCount?: number
    modulesCost?: string
  }
}

// Примеры реализованных проектов с логотипами
const clientExamples = {
  websites: [
    { name: 'Yaponamama', url: 'yaponamama.uz', logo: 'https://yaponamama.uz/images/logo.jpg' },
    { name: 'Maxway', url: 'maxway.uz', logo: 'https://maxway.uz/favicon.ico' },
    { name: 'Kamolon Osh', url: 'kamolonosh.uz', logo: 'https://kamolonosh.uz/images/logo.svg' },
    { name: "Hardee's", url: 'hardees.delever.uz', logo: 'https://cdn.delever.uz/delever/hardees_logo.png' },
    { name: 'Pizza Hut', url: 'pizzahutuz.delever.uz', logo: 'https://cdn.delever.uz/delever/pizzahut_logo.png' },
    { name: 'Cheeseria', url: 'cheeseria.delever.kz', logo: 'https://cheeseria.delever.kz/favicon.ico' },
  ],
  apps: [
    { name: 'Yaponamama', platform: 'iOS & Android', logo: 'https://yaponamama.uz/images/logo.jpg' },
    { name: 'Maxway', platform: 'iOS & Android', logo: 'https://maxway.uz/favicon.ico' },
    { name: 'Chicago Pizza', platform: 'iOS', logo: 'https://cdn.delever.uz/delever/chicago_logo.png' },
    { name: 'Takumi Sushi', platform: 'iOS', logo: 'https://cdn.delever.uz/delever/takumi_logo.png' },
    { name: 'Zoo Planeta', platform: 'iOS', logo: 'https://zooplaneta.delever.uz/favicon.ico' },
  ],
}

export function generatePresentation(data: PresentationData): string {
  const { language, customData, brandName } = data
  const isRu = language === 'ru'
  const isUz = language === 'uz'
  
  // Функция выбора текста по языку
  const txt = <T>(ru: T, en: T, uz: T): T => {
    if (isRu) return ru
    if (isUz) return uz
    return en
  }
  
  const personalizedTitle = brandName ? `${brandName} × Delever` : 'Delever'

  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      
      * { margin: 0; padding: 0; box-sizing: border-box; }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f8fafc;
        color: #002A47;
        line-height: 1.5;
      }
      
      .slide {
        width: 100%;
        min-height: 100vh;
        padding: 50px 60px;
        page-break-after: always;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      .slide:last-child { page-break-after: auto; }
      
      /* Обложка */
      .slide-cover {
        background: linear-gradient(135deg, #002A47 0%, #004d7a 50%, #006494 100%);
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      
      .cover-badge {
        background: rgba(255,215,0,0.2);
        border: 1px solid rgba(255,215,0,0.5);
        padding: 8px 20px;
        border-radius: 30px;
        font-size: 14px;
        margin-bottom: 24px;
        display: inline-block;
      }
      
      .logo { font-size: 64px; font-weight: 800; margin-bottom: 16px; letter-spacing: -2px; }
      .tagline { font-size: 24px; font-weight: 600; color: #FFD700; margin-bottom: 12px; }
      .subtitle { font-size: 18px; opacity: 0.8; max-width: 500px; }
      
      .cover-stats {
        display: flex;
        gap: 40px;
        margin-top: 50px;
        padding-top: 30px;
        border-top: 1px solid rgba(255,255,255,0.2);
      }
      
      .cover-stat { text-align: center; }
      .cover-stat-value { font-size: 32px; font-weight: 800; color: #10B981; }
      .cover-stat-label { font-size: 12px; opacity: 0.7; margin-top: 4px; }
      
      /* Слайд с проблемами */
      .slide-problems { background: linear-gradient(180deg, #FEF2F2 0%, white 100%); }
      
      /* Заголовки */
      .slide-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
      }
      
      .slide-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      
      .slide-title {
        font-size: 32px;
        font-weight: 700;
        color: #002A47;
      }
      
      .slide-subtitle {
        font-size: 16px;
        color: #64748b;
        margin-bottom: 30px;
        max-width: 600px;
      }
      
      /* Сетки */
      .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
      
      /* Карточки */
      .card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      
      .card-gradient {
        background: linear-gradient(135deg, #002A47, #004d7a);
        color: white;
        border: none;
      }
      
      .card-icon { font-size: 28px; margin-bottom: 12px; }
      .card-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
      .card-desc { font-size: 13px; color: #64748b; line-height: 1.5; }
      .card-gradient .card-desc { color: rgba(255,255,255,0.8); }
      
      /* Проблемы */
      .problem-card {
        background: white;
        border-left: 4px solid #EF4444;
        padding: 16px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 2px 10px rgba(239,68,68,0.1);
      }
      
      .problem-icon { font-size: 24px; }
      .problem-text { font-size: 14px; color: #991B1B; font-weight: 500; }
      
      /* Метрики */
      .metric-card {
        background: linear-gradient(135deg, #002A47, #004d7a);
        color: white;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
      }
      
      .metric-value { font-size: 36px; font-weight: 800; color: #10B981; }
      .metric-label { font-size: 12px; opacity: 0.8; margin-top: 6px; }
      
      /* Решение - Feature Slide */
      .feature-slide {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        flex: 1;
        align-items: center;
      }
      
      .feature-content h2 { font-size: 28px; font-weight: 700; margin-bottom: 12px; color: #002A47; }
      .feature-content p { font-size: 15px; color: #64748b; margin-bottom: 24px; line-height: 1.6; }
      
      .feature-list { list-style: none; }
      .feature-list li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
      }
      .feature-list li:last-child { border-bottom: none; }
      
      .feature-check {
        width: 24px;
        height: 24px;
        background: #10B981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        flex-shrink: 0;
      }
      
      .feature-text { font-size: 14px; color: #334155; }
      .feature-text strong { color: #002A47; }
      
      .feature-visual {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 20px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .visual-stat {
        background: white;
        border-radius: 12px;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      
      .visual-stat-label { font-size: 13px; color: #64748b; }
      .visual-stat-value { font-size: 20px; font-weight: 700; color: #002A47; }
      .visual-stat-value.green { color: #10B981; }
      .visual-stat-value.red { color: #EF4444; }
      
      /* Тарифы */
      .plan-card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        border: 2px solid #e2e8f0;
        transition: all 0.3s;
      }
      
      .plan-card.popular {
        border-color: #002A47;
        background: linear-gradient(180deg, #f0f9ff 0%, white 100%);
        transform: scale(1.02);
      }
      
      .plan-badge {
        background: #10B981;
        color: white;
        font-size: 10px;
        padding: 4px 10px;
        border-radius: 20px;
        margin-bottom: 10px;
        display: inline-block;
        font-weight: 600;
      }
      
      .plan-name { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
      .plan-orders { font-size: 12px; color: #64748b; margin-bottom: 12px; }
      .plan-price { font-size: 24px; font-weight: 700; color: #002A47; }
      
      /* Интеграции */
      .integration-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      
      .integration-item {
        background: white;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        border: 1px solid #e2e8f0;
      }
      
      .integration-icon { font-size: 24px; margin-bottom: 8px; }
      .integration-name { font-size: 12px; font-weight: 600; color: #002A47; }
      
      /* Контакты */
      .slide-contacts {
        background: linear-gradient(135deg, #002A47 0%, #004d7a 100%);
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      
      .contacts-title { font-size: 36px; font-weight: 700; margin-bottom: 12px; }
      .contacts-subtitle { font-size: 18px; opacity: 0.8; margin-bottom: 40px; }
      
      .contact-info { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; }
      .contact-item { font-size: 16px; display: flex; align-items: center; gap: 8px; }
      
      /* Персональное предложение */
      .custom-slide { background: linear-gradient(180deg, #f0fdf4 0%, white 100%); }
      
      .custom-header {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        margin-bottom: 24px;
      }
      
      .custom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      
      .custom-section {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      }
      
      .custom-section-title {
        font-size: 14px;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .custom-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f1f5f9;
      }
      
      .custom-label { color: #64748b; font-size: 14px; }
      .custom-value { font-weight: 600; color: #002A47; font-size: 14px; }
      
      .savings-box {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        margin-top: 24px;
      }
      
      .savings-value { font-size: 36px; font-weight: 800; }
      .savings-label { font-size: 14px; opacity: 0.9; margin-top: 6px; }
      
      /* Footer */
      .slide-footer {
        position: absolute;
        bottom: 20px;
        left: 60px;
        right: 60px;
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #94a3b8;
      }
      
      @media print {
        .slide { min-height: 100vh; }
      }
    </style>
  `

  // Тексты
  const t = {
    // Обложка
    badge: txt('🏆 №1 Платформа для автоматизации доставки', '🏆 #1 Delivery Automation Platform', '🏆 №1 Yetkazib berish avtomatlashtirish platformasi'),
    tagline: txt('Единая платформа управления', 'Unified Management Platform', 'Yagona boshqaruv platformasi'),
    subtitle: brandName 
      ? txt(`Персональное предложение для ${brandName}`, `Personal offer for ${brandName}`, `${brandName} uchun shaxsiy taklif`)
      : txt('для ресторанов, кафе и магазинов', 'for restaurants, cafes and stores', 'restoranlar, kafelar va do\'konlar uchun'),
    coverStats: txt(
      [
        { value: '1000+', label: 'Бизнесов' },
        { value: '13M+', label: 'Заказов' },
        { value: '7', label: 'Стран' },
        { value: '+30%', label: 'Рост выручки' },
      ],
      [
        { value: '1000+', label: 'Businesses' },
        { value: '13M+', label: 'Orders' },
        { value: '7', label: 'Countries' },
        { value: '+30%', label: 'Revenue growth' },
      ],
      [
        { value: '1000+', label: 'Bizneslar' },
        { value: '13M+', label: 'Buyurtmalar' },
        { value: '7', label: 'Mamlakatlar' },
        { value: '+30%', label: 'Daromad o\'sishi' },
      ]
    ),
    
    // Проблемы
    problemsTitle: txt('Знакомые проблемы?', 'Familiar problems?', 'Tanish muammolar?'),
    problemsSubtitle: txt('С этими проблемами сталкивается каждый бизнес доставки', 'Every delivery business faces these challenges', 'Har bir yetkazib berish biznesi bu muammolarga duch keladi'),
    problems: txt(
      [
        { icon: '💸', text: 'Теряете 20-35% на комиссиях агрегаторов', stat: '-5 млн сум/мес' },
        { icon: '⏱️', text: '3 из 10 заказов доставляются с опозданием', stat: '30% опозданий' },
        { icon: '👋', text: '85% клиентов покупают один раз и уходят', stat: 'Нет лояльности' },
        { icon: '🔀', text: 'Хаос: заказы в 5 разных системах', stat: 'Потеря времени' },
        { icon: '📊', text: 'Нет данных для принятия решений', stat: 'Слепые решения' },
        { icon: '🚴', text: 'Курьеры без контроля и оптимизации', stat: 'Лишние расходы' },
      ],
      [
        { icon: '💸', text: 'Losing 20-35% on aggregator commissions', stat: '-$500/mo' },
        { icon: '⏱️', text: '3 out of 10 orders delivered late', stat: '30% delays' },
        { icon: '👋', text: '85% of customers buy once and leave', stat: 'No loyalty' },
        { icon: '🔀', text: 'Chaos: orders in 5 different systems', stat: 'Time waste' },
        { icon: '📊', text: 'No data for decision making', stat: 'Blind decisions' },
        { icon: '🚴', text: 'Couriers without control & optimization', stat: 'Extra costs' },
      ],
      [
        { icon: '💸', text: 'Agregator komissiyalarida 20-35% yo\'qotish', stat: '-5 mln so\'m/oy' },
        { icon: '⏱️', text: '10 ta buyurtmadan 3 tasi kechikib yetkaziladi', stat: '30% kechikish' },
        { icon: '👋', text: 'Mijozlarning 85% bir marta sotib olib ketadi', stat: 'Sodiqlik yo\'q' },
        { icon: '🔀', text: 'Xaos: 5 xil tizimda buyurtmalar', stat: 'Vaqt yo\'qotish' },
        { icon: '📊', text: 'Qaror qabul qilish uchun ma\'lumotlar yo\'q', stat: 'Ko\'r qarorlar' },
        { icon: '🚴', text: 'Kuryerlar nazorat va optimizatsiyasiz', stat: 'Qo\'shimcha xarajatlar' },
      ]
    ),
    
    // Решения - детальные слайды
    solutions: {
      // 1. Своя доставка
      ownDelivery: {
        title: txt('Своя доставка', 'Own Delivery', 'O\'z yetkazib berish'),
        subtitle: txt('Полный контроль над процессом доставки', 'Full control over delivery process', 'Yetkazib berish jarayoni ustidan to\'liq nazorat'),
        description: txt(
          'Создайте собственную службу доставки с современными инструментами управления курьерами, оптимизации маршрутов и контроля качества.',
          'Create your own delivery service with modern tools for courier management, route optimization, and quality control.',
          'Kuryerlarni boshqarish, marshrutlarni optimallashtirish va sifat nazorati uchun zamonaviy vositalar bilan o\'z yetkazib berish xizmatingizni yarating.'
        ),
        features: txt(
          [
            { title: 'Курьерское приложение', desc: 'GPS-трекинг, навигация, история заказов' },
            { title: 'Автораспределение', desc: 'Умное назначение курьеров на заказы' },
            { title: 'Оптимизация маршрутов', desc: 'Экономия времени и топлива' },
            { title: 'Зарплатный модуль', desc: 'Автоматический расчёт выплат курьерам' },
            { title: 'Контроль качества', desc: 'Фото доставки, рейтинги, отзывы' },
          ],
          [
            { title: 'Courier App', desc: 'GPS tracking, navigation, order history' },
            { title: 'Auto-assignment', desc: 'Smart courier assignment to orders' },
            { title: 'Route optimization', desc: 'Save time and fuel' },
            { title: 'Salary module', desc: 'Automatic courier payout calculation' },
            { title: 'Quality control', desc: 'Delivery photos, ratings, reviews' },
          ],
          [
            { title: 'Kuryer ilovasi', desc: 'GPS-kuzatuv, navigatsiya, buyurtmalar tarixi' },
            { title: 'Avtotaqsimlash', desc: 'Buyurtmalarga kuryerlarni aqlli tayinlash' },
            { title: 'Marshrutlarni optimallashtirish', desc: 'Vaqt va yoqilg\'ini tejash' },
            { title: 'Ish haqi moduli', desc: 'Kuryerlarga to\'lovlarni avtomatik hisoblash' },
            { title: 'Sifat nazorati', desc: 'Yetkazib berish fotolari, reytinglar, sharhlar' },
          ]
        ),
        stats: txt(
          [
            { label: 'Ускорение доставки', value: '+35%', type: 'green' },
            { label: 'Экономия на курьерах', value: '+20%', type: 'green' },
            { label: 'Опоздания', value: '-70%', type: 'red' },
          ],
          [
            { label: 'Delivery speed', value: '+35%', type: 'green' },
            { label: 'Courier savings', value: '+20%', type: 'green' },
            { label: 'Late deliveries', value: '-70%', type: 'red' },
          ],
          [
            { label: 'Yetkazib berish tezligi', value: '+35%', type: 'green' },
            { label: 'Kuryerlarda tejash', value: '+20%', type: 'green' },
            { label: 'Kechikishlar', value: '-70%', type: 'red' },
          ]
        ),
      },
      
      // 2. Агрегаторы
      aggregators: {
        title: txt('Интеграция с агрегаторами', 'Aggregator Integration', 'Agregatorlar bilan integratsiya'),
        subtitle: txt('Все заказы в одном месте', 'All orders in one place', 'Barcha buyurtmalar bir joyda'),
        description: txt(
          'Подключите Yandex Eats, Wolt, Glovo, Uzum Tezkor и других агрегаторов. Все заказы поступают в единый интерфейс, автоматически синхронизируется меню и цены.',
          'Connect Yandex Eats, Wolt, Glovo, Uzum Tezkor and other aggregators. All orders come to a single interface, menu and prices sync automatically.',
          'Yandex Eats, Wolt, Glovo, Uzum Tezkor va boshqa agregatorlarni ulang. Barcha buyurtmalar yagona interfeysga keladi, menyu va narxlar avtomatik sinxronlanadi.'
        ),
        features: txt(
          [
            { title: 'Единый интерфейс', desc: 'Все агрегаторы в одном окне' },
            { title: 'Синхронизация меню', desc: 'Одно изменение — везде обновлено' },
            { title: 'Управление стоп-листом', desc: 'Автоматическая остановка позиций' },
            { title: 'Аналитика по каналам', desc: 'Сравнение эффективности агрегаторов' },
            { title: 'Автоприём заказов', desc: 'Заказы принимаются автоматически' },
          ],
          [
            { title: 'Single interface', desc: 'All aggregators in one window' },
            { title: 'Menu sync', desc: 'One change — updated everywhere' },
            { title: 'Stop-list management', desc: 'Automatic item stopping' },
            { title: 'Channel analytics', desc: 'Compare aggregator performance' },
            { title: 'Auto-accept orders', desc: 'Orders accepted automatically' },
          ],
          [
            { title: 'Yagona interfeys', desc: 'Barcha agregatorlar bitta oynada' },
            { title: 'Menyu sinxronlash', desc: 'Bitta o\'zgartirish — hamma joyda yangilangan' },
            { title: 'Stop-listni boshqarish', desc: 'Pozitsiyalarni avtomatik to\'xtatish' },
            { title: 'Kanallar tahlili', desc: 'Agregatorlar samaradorligini solishtirish' },
            { title: 'Buyurtmalarni avto-qabul qilish', desc: 'Buyurtmalar avtomatik qabul qilinadi' },
          ]
        ),
        integrations: ['Yandex Eats', 'Wolt', 'Glovo', 'Uzum Tezkor', 'Bolt Food', 'Express 24'],
      },
      
      // 3. Каналы продаж
      salesChannels: {
        title: txt('Свои каналы продаж', 'Own Sales Channels', 'O\'z sotuv kanallari'),
        subtitle: txt('0% комиссии на собственных каналах', '0% commission on own channels', 'O\'z kanallarida 0% komissiya'),
        description: txt(
          'Запустите брендированный сайт, мобильное приложение и Telegram-бот. Принимайте заказы напрямую без комиссий агрегаторов.',
          'Launch a branded website, mobile app, and Telegram bot. Accept orders directly without aggregator commissions.',
          'Brendlangan sayt, mobil ilova va Telegram-botni ishga tushiring. Agregator komissiyalarisiz to\'g\'ridan-to\'g\'ri buyurtmalarni qabul qiling.'
        ),
        channels: txt(
          [
            { icon: '🌐', name: 'Веб-сайт', desc: 'Брендированный сайт с онлайн-меню, корзиной и оплатой', examples: 'yaponamama.uz, maxway.uz' },
            { icon: '📱', name: 'Мобильное приложение', desc: 'iOS и Android приложения под вашим брендом', examples: 'App Store, Google Play' },
            { icon: '💬', name: 'Telegram-бот', desc: 'Заказы прямо в мессенджере, уведомления о статусе', examples: '@yaponamama_bot' },
            { icon: '📋', name: 'QR-меню', desc: 'Заказ со столика в заведении без официанта', examples: 'QR на столах' },
          ],
          [
            { icon: '🌐', name: 'Website', desc: 'Branded website with online menu, cart and payment', examples: 'yaponamama.uz, maxway.uz' },
            { icon: '📱', name: 'Mobile App', desc: 'iOS and Android apps under your brand', examples: 'App Store, Google Play' },
            { icon: '💬', name: 'Telegram Bot', desc: 'Orders directly in messenger, status notifications', examples: '@yaponamama_bot' },
            { icon: '📋', name: 'QR Menu', desc: 'Order from table without waiter', examples: 'QR on tables' },
          ],
          [
            { icon: '🌐', name: 'Veb-sayt', desc: 'Onlayn menyu, savat va to\'lov bilan brendlangan sayt', examples: 'yaponamama.uz, maxway.uz' },
            { icon: '📱', name: 'Mobil ilova', desc: 'Sizning brendingiz ostida iOS va Android ilovalari', examples: 'App Store, Google Play' },
            { icon: '💬', name: 'Telegram-bot', desc: 'Messenjerda to\'g\'ridan-to\'g\'ri buyurtmalar, status xabarlari', examples: '@yaponamama_bot' },
            { icon: '📋', name: 'QR-menyu', desc: 'Ofitsiantsiz stoldan buyurtma berish', examples: 'Stollarda QR' },
          ]
        ),
        stats: txt(
          [
            { label: 'Экономия на комиссиях', value: '20-35%', type: 'green' },
            { label: 'Доля своих каналов', value: 'до 60%', type: 'green' },
            { label: 'Срок окупаемости', value: '1-2 мес', type: 'green' },
          ],
          [
            { label: 'Commission savings', value: '20-35%', type: 'green' },
            { label: 'Own channels share', value: 'up to 60%', type: 'green' },
            { label: 'Payback period', value: '1-2 mo', type: 'green' },
          ],
          [
            { label: 'Komissiyalarda tejash', value: '20-35%', type: 'green' },
            { label: 'O\'z kanallari ulushi', value: '60% gacha', type: 'green' },
            { label: 'Qoplash muddati', value: '1-2 oy', type: 'green' },
          ]
        ),
      },
      
      // 4. Внешние курьеры
      externalCouriers: {
        title: txt('Внешние курьерские службы', 'External Courier Services', 'Tashqi kuryer xizmatlari'),
        subtitle: txt('Подключите профессиональных курьеров', 'Connect professional couriers', 'Professional kuryerlarni ulang'),
        description: txt(
          'Интеграция с Yandex Delivery, Wolt Drive, Millennium Taxi и другими службами. Автоматический вызов курьера при оформлении заказа.',
          'Integration with Yandex Delivery, Wolt Drive, Millennium Taxi and other services. Automatic courier call when order is placed.',
          'Yandex Delivery, Wolt Drive, Millennium Taxi va boshqa xizmatlar bilan integratsiya. Buyurtma rasmiylashtirish paytida kuryerni avtomatik chaqirish.'
        ),
        features: txt(
          [
            { title: 'Автовызов курьера', desc: 'Курьер вызывается автоматически при готовности заказа' },
            { title: 'Сравнение цен', desc: 'Выбор оптимальной службы по цене и времени' },
            { title: 'Трекинг в реальном времени', desc: 'Отслеживание курьера на карте' },
            { title: 'Гибкие правила', desc: 'Настройка условий вызова для разных зон' },
          ],
          [
            { title: 'Auto courier call', desc: 'Courier is called automatically when order is ready' },
            { title: 'Price comparison', desc: 'Choose optimal service by price and time' },
            { title: 'Real-time tracking', desc: 'Track courier on map' },
            { title: 'Flexible rules', desc: 'Configure call conditions for different zones' },
          ],
          [
            { title: 'Kuryerni avto-chaqirish', desc: 'Buyurtma tayyor bo\'lganda kuryer avtomatik chaqiriladi' },
            { title: 'Narxlarni solishtirish', desc: 'Narx va vaqt bo\'yicha optimal xizmatni tanlash' },
            { title: 'Real vaqtda kuzatish', desc: 'Kuryerni xaritada kuzatish' },
            { title: 'Moslashuvchan qoidalar', desc: 'Turli zonalar uchun chaqirish shartlarini sozlash' },
          ]
        ),
        services: ['Yandex Delivery', 'Wolt Drive', 'Millennium Taxi', 'Noor Taxi'],
      },
      
      // 5. Курьерское приложение
      courierApp: {
        title: txt('Курьерское приложение', 'Courier App', 'Kuryer ilovasi'),
        subtitle: txt('Полный контроль над курьерами', 'Full control over couriers', 'Kuryerlar ustidan to\'liq nazorat'),
        description: txt(
          'Мобильное приложение для курьеров с GPS-трекингом, навигацией, историей заказов и расчётом зарплаты. Доступно для iOS и Android.',
          'Mobile app for couriers with GPS tracking, navigation, order history and salary calculation. Available for iOS and Android.',
          'GPS-kuzatuv, navigatsiya, buyurtmalar tarixi va ish haqi hisoblash bilan kuryerlar uchun mobil ilova. iOS va Android uchun mavjud.'
        ),
        features: txt(
          [
            { title: 'GPS-трекинг', desc: 'Отслеживание местоположения в реальном времени' },
            { title: 'Оптимальные маршруты', desc: 'Автоматическое построение маршрутов' },
            { title: 'Push-уведомления', desc: 'Мгновенные уведомления о новых заказах' },
            { title: 'Зарплатный кабинет', desc: 'Курьер видит свой заработок в приложении' },
            { title: 'Фото доставки', desc: 'Подтверждение доставки фотографией' },
            { title: 'Учёт посещений', desc: 'Отметка начала и конца смены' },
          ],
          [
            { title: 'GPS tracking', desc: 'Real-time location tracking' },
            { title: 'Optimal routes', desc: 'Automatic route building' },
            { title: 'Push notifications', desc: 'Instant notifications about new orders' },
            { title: 'Salary cabinet', desc: 'Courier sees earnings in app' },
            { title: 'Delivery photo', desc: 'Delivery confirmation with photo' },
            { title: 'Attendance tracking', desc: 'Shift start and end marking' },
          ],
          [
            { title: 'GPS-kuzatuv', desc: 'Real vaqtda joylashuvni kuzatish' },
            { title: 'Optimal marshrutlar', desc: 'Avtomatik marshrutlar yaratish' },
            { title: 'Push-bildirishnomalar', desc: 'Yangi buyurtmalar haqida tezkor xabarlar' },
            { title: 'Ish haqi kabineti', desc: 'Kuryer ilovada o\'z daromadini ko\'radi' },
            { title: 'Yetkazib berish fotosi', desc: 'Yetkazib berishni foto bilan tasdiqlash' },
            { title: 'Tashrif hisobi', desc: 'Smena boshlanishi va tugashini belgilash' },
          ]
        ),
      },
      
      // 6. Аналитика
      analytics: {
        title: txt('Аналитика и отчёты', 'Analytics & Reports', 'Tahlil va hisobotlar'),
        subtitle: txt('Данные для принятия решений', 'Data for decision making', 'Qaror qabul qilish uchun ma\'lumotlar'),
        description: txt(
          'Дашборды с ключевыми метриками бизнеса: продажи, популярные товары, эффективность курьеров, LTV клиентов и многое другое.',
          'Dashboards with key business metrics: sales, popular items, courier efficiency, customer LTV and much more.',
          'Asosiy biznes ko\'rsatkichlari bilan dashboardlar: sotuvlar, mashhur mahsulotlar, kuryerlar samaradorligi, mijozlar LTV va boshqalar.'
        ),
        features: txt(
          [
            { title: 'Продажи в реальном времени', desc: 'Выручка, заказы, средний чек' },
            { title: 'ABC-анализ меню', desc: 'Популярные и прибыльные позиции' },
            { title: 'RFM-анализ клиентов', desc: 'Сегментация по лояльности' },
            { title: 'Эффективность каналов', desc: 'Сравнение агрегаторов и своих каналов' },
            { title: 'KPI курьеров', desc: 'Скорость, качество, количество доставок' },
            { title: 'Экспорт отчётов', desc: 'Excel, PDF для бухгалтерии' },
          ],
          [
            { title: 'Real-time sales', desc: 'Revenue, orders, average check' },
            { title: 'ABC menu analysis', desc: 'Popular and profitable items' },
            { title: 'RFM customer analysis', desc: 'Segmentation by loyalty' },
            { title: 'Channel efficiency', desc: 'Compare aggregators and own channels' },
            { title: 'Courier KPIs', desc: 'Speed, quality, delivery count' },
            { title: 'Report export', desc: 'Excel, PDF for accounting' },
          ],
          [
            { title: 'Real vaqtda sotuvlar', desc: 'Daromad, buyurtmalar, o\'rtacha chek' },
            { title: 'Menyu ABC-tahlili', desc: 'Mashhur va foydali pozitsiyalar' },
            { title: 'Mijozlar RFM-tahlili', desc: 'Sodiqlik bo\'yicha segmentatsiya' },
            { title: 'Kanallar samaradorligi', desc: 'Agregatorlar va o\'z kanallarini solishtirish' },
            { title: 'Kuryerlar KPI', desc: 'Tezlik, sifat, yetkazib berishlar soni' },
            { title: 'Hisobotlarni eksport qilish', desc: 'Buxgalteriya uchun Excel, PDF' },
          ]
        ),
      },
      
      // 7. CRM и лояльность
      crm: {
        title: txt('CRM и программа лояльности', 'CRM & Loyalty Program', 'CRM va sodiqlik dasturi'),
        subtitle: txt('Превращайте разовых клиентов в постоянных', 'Turn one-time customers into regulars', 'Bir martalik mijozlarni doimiyga aylantiring'),
        description: txt(
          'База клиентов с историей заказов, система бонусов и кешбэка, автоматические рассылки и персонализированные предложения.',
          'Customer database with order history, bonus and cashback system, automated campaigns and personalized offers.',
          'Buyurtmalar tarixi bilan mijozlar bazasi, bonus va keshbek tizimi, avtomatik jo\'natmalar va shaxsiylashtirilgan takliflar.'
        ),
        features: txt(
          [
            { title: 'База клиентов', desc: 'История заказов, контакты, предпочтения' },
            { title: 'Кешбэк и бонусы', desc: 'Гибкие правила начисления' },
            { title: 'Push и SMS рассылки', desc: 'Автоматические и ручные кампании' },
            { title: 'Промокоды', desc: 'Создание и отслеживание промокодов' },
            { title: 'Сегментация', desc: 'Группировка клиентов по поведению' },
          ],
          [
            { title: 'Customer base', desc: 'Order history, contacts, preferences' },
            { title: 'Cashback & bonuses', desc: 'Flexible accrual rules' },
            { title: 'Push & SMS campaigns', desc: 'Automatic and manual campaigns' },
            { title: 'Promo codes', desc: 'Create and track promo codes' },
            { title: 'Segmentation', desc: 'Group customers by behavior' },
          ],
          [
            { title: 'Mijozlar bazasi', desc: 'Buyurtmalar tarixi, kontaktlar, afzalliklar' },
            { title: 'Keshbek va bonuslar', desc: 'Moslashuvchan hisoblash qoidalari' },
            { title: 'Push va SMS jo\'natmalar', desc: 'Avtomatik va qo\'lda kampaniyalar' },
            { title: 'Promokodlar', desc: 'Promokodlarni yaratish va kuzatish' },
            { title: 'Segmentatsiya', desc: 'Mijozlarni xatti-harakatlar bo\'yicha guruhlash' },
          ]
        ),
        stats: txt(
          [
            { label: 'Рост повторных заказов', value: '+300%', type: 'green' },
            { label: 'LTV клиента', value: '+150%', type: 'green' },
          ],
          [
            { label: 'Repeat orders growth', value: '+300%', type: 'green' },
            { label: 'Customer LTV', value: '+150%', type: 'green' },
          ],
          [
            { label: 'Takroriy buyurtmalar o\'sishi', value: '+300%', type: 'green' },
            { label: 'Mijoz LTV', value: '+150%', type: 'green' },
          ]
        ),
      },
    },
    
    // Тарифы
    pricingTitle: txt('Тарифы', 'Pricing', 'Tariflar'),
    pricingSubtitle: txt('Выберите подходящий тариф для вашего бизнеса', 'Choose the right plan for your business', 'Biznesingiz uchun mos tarifni tanlang'),
    plans: txt(
      [
        { name: 'Start', orders: 'до 1 000 заказов', price: '1,3 млн сум' },
        { name: 'Medium', orders: 'до 3 000 заказов', price: '3,25 млн сум', popular: true },
        { name: 'Big', orders: 'до 6 000 заказов', price: '6,5 млн сум' },
        { name: 'Enterprise', orders: 'до 10 000 заказов', price: '13 млн сум' },
      ],
      [
        { name: 'Start', orders: 'up to 1,000 orders', price: '$150' },
        { name: 'Medium', orders: 'up to 3,000 orders', price: '$280', popular: true },
        { name: 'Big', orders: 'up to 6,000 orders', price: '$580' },
        { name: 'Enterprise', orders: 'up to 10,000 orders', price: '$1,100' },
      ],
      [
        { name: 'Start', orders: '1 000 tagacha buyurtma', price: '1,3 mln so\'m' },
        { name: 'Medium', orders: '3 000 tagacha buyurtma', price: '3,25 mln so\'m', popular: true },
        { name: 'Big', orders: '6 000 tagacha buyurtma', price: '6,5 mln so\'m' },
        { name: 'Enterprise', orders: '10 000 tagacha buyurtma', price: '13 mln so\'m' },
      ]
    ),
    
    // Клиенты
    clientsTitle: txt('Наши клиенты', 'Our Clients', 'Bizning mijozlar'),
    clientsSubtitle: txt('Реализованные проекты на платформе Delever', 'Projects built on Delever platform', 'Delever platformasida amalga oshirilgan loyihalar'),
    websitesLabel: txt('Сайты', 'Websites', 'Saytlar'),
    appsLabel: txt('Приложения', 'Apps', 'Ilovalar'),
    
    // Контакты
    contactsTitle: txt('Готовы начать?', 'Ready to start?', 'Boshlashga tayyormisiz?'),
    contactsSubtitle: txt('Свяжитесь с нами для бесплатной консультации', 'Contact us for a free consultation', 'Bepul maslahat uchun biz bilan bog\'laning'),
    
    // Персональное
    customTitle: txt('Ваше персональное предложение', 'Your Personal Offer', 'Sizning shaxsiy taklifingiz'),
    customFor: txt('Специально для вашего бизнеса', 'Specially for your business', 'Biznesingiz uchun maxsus'),
    customPlan: txt('Выбранный тариф', 'Selected Plan', 'Tanlangan tarif'),
    customParams: txt('Параметры бизнеса', 'Business Parameters', 'Biznes parametrlari'),
    branches: txt('Филиалов', 'Branches', 'Filiallar'),
    orders: txt('Заказов/мес', 'Orders/mo', 'Buyurtmalar/oy'),
    avgCheck: txt('Средний чек', 'Avg Check', 'O\'rtacha chek'),
    monthly: txt('Ежемесячно', 'Monthly', 'Oylik'),
    deposit: txt('Депозит', 'Deposit', 'Depozit'),
    savings: txt('Ваша выгода', 'Your Savings', 'Sizning foydangiz'),
    yearly: txt('Годовая экономия', 'Yearly savings', 'Yillik tejash'),
    
    // Дополнительные опции
    selectedModulesTitle: txt('Выбранные модули', 'Selected Modules', 'Tanlangan modullar'),
    kiosks: txt('Киоски', 'Kiosks', 'Kiosklar'),
    couriers: txt('Курьеры', 'Couriers', 'Kuryerlar'),
    modulesCostLabel: txt('Стоимость модулей', 'Modules cost', 'Modullar narxi'),
    
    // Названия модулей
    moduleNames: {
      uzum: 'Uzum Tezkor',
      wolt: 'Wolt',
      yandex: 'Yandex Eats',
      glovo: 'Glovo',
      express24: 'Express 24',
      allAggregators: txt('Все агрегаторы', 'All aggregators', 'Barcha agregatorlar'),
      yandexDelivery: 'Yandex Delivery',
      woltDrive: 'Wolt Drive',
      millenniumTaxi: 'Millennium Taxi',
      noor: 'Noor Taxi',
      allDeliveryServices: txt('Все курьерские службы', 'All courier services', 'Barcha kuryer xizmatlari'),
      kiosk: txt('Киоск самообслуживания', 'Self-service kiosk', 'O\'z-o\'ziga xizmat kioski'),
      callCenter: txt('Колл-центр', 'Call center', 'Call-markaz'),
      marketing: txt('Маркетинг', 'Marketing', 'Marketing'),
      courierApp: txt('Курьерское приложение', 'Courier app', 'Kuryer ilovasi'),
    } as Record<string, string>,
  }

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalizedTitle} - ${t.tagline}</title>
  ${styles}
</head>
<body>
  <!-- 1. ОБЛОЖКА -->
  <div class="slide slide-cover">
    <div class="cover-badge">${t.badge}</div>
    <div class="logo">${personalizedTitle}</div>
    <div class="tagline">${t.tagline}</div>
    <div class="subtitle">${t.subtitle}</div>
    <div class="cover-stats">
      ${t.coverStats.map(s => `
        <div class="cover-stat">
          <div class="cover-stat-value">${s.value}</div>
          <div class="cover-stat-label">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- 2. ПРОБЛЕМЫ -->
  <div class="slide slide-problems">
    <div class="slide-header">
      <div class="slide-icon" style="background: #FEE2E2;">😰</div>
      <h1 class="slide-title">${t.problemsTitle}</h1>
    </div>
    <p class="slide-subtitle">${t.problemsSubtitle}</p>
    <div class="grid-2">
      ${t.problems.map(p => `
        <div class="problem-card">
          <span class="problem-icon">${p.icon}</span>
          <div>
            <div class="problem-text">${p.text}</div>
            <div style="font-size: 12px; color: #DC2626; margin-top: 4px; font-weight: 600;">${p.stat}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>2/17</span></div>
  </div>

  <!-- 3. СВОЯ ДОСТАВКА -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #DBEAFE;">🚴</div>
      <h1 class="slide-title">${t.solutions.ownDelivery.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.ownDelivery.subtitle}</p>
    <div class="feature-slide">
      <div class="feature-content">
        <p>${t.solutions.ownDelivery.description}</p>
        <ul class="feature-list">
          ${t.solutions.ownDelivery.features.map(f => `
            <li>
              <div class="feature-check">✓</div>
              <div class="feature-text"><strong>${f.title}</strong><br>${f.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="feature-visual">
        ${t.solutions.ownDelivery.stats.map(s => `
          <div class="visual-stat">
            <span class="visual-stat-label">${s.label}</span>
            <span class="visual-stat-value ${s.type}">${s.value}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>3/17</span></div>
  </div>

  <!-- 4. АГРЕГАТОРЫ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #F3E8FF;">🔗</div>
      <h1 class="slide-title">${t.solutions.aggregators.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.aggregators.subtitle}</p>
    <div class="feature-slide">
      <div class="feature-content">
        <p>${t.solutions.aggregators.description}</p>
        <ul class="feature-list">
          ${t.solutions.aggregators.features.map(f => `
            <li>
              <div class="feature-check">✓</div>
              <div class="feature-text"><strong>${f.title}</strong><br>${f.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="feature-visual">
        <div style="font-weight: 600; margin-bottom: 12px; color: #002A47;">${txt('Поддерживаемые агрегаторы', 'Supported aggregators', 'Qo\'llab-quvvatlanadigan agregatorlar')}</div>
        <div class="integration-grid" style="grid-template-columns: repeat(2, 1fr);">
          ${t.solutions.aggregators.integrations.map(name => `
            <div class="integration-item">
              <div class="integration-name">${name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>4/17</span></div>
  </div>

  <!-- 5. КАНАЛЫ ПРОДАЖ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #D1FAE5;">📱</div>
      <h1 class="slide-title">${t.solutions.salesChannels.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.salesChannels.subtitle}</p>
    <div class="grid-2" style="margin-bottom: 24px;">
      ${t.solutions.salesChannels.channels.map(ch => `
        <div class="card">
          <div class="card-icon">${ch.icon}</div>
          <div class="card-title">${ch.name}</div>
          <div class="card-desc">${ch.desc}</div>
          <div style="font-size: 11px; color: #10B981; margin-top: 8px;">${ch.examples}</div>
        </div>
      `).join('')}
    </div>
    <div class="grid-3">
      ${t.solutions.salesChannels.stats.map(s => `
        <div class="metric-card">
          <div class="metric-value">${s.value}</div>
          <div class="metric-label">${s.label}</div>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>5/17</span></div>
  </div>

  <!-- 6. ВНЕШНИЕ КУРЬЕРЫ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #FEF3C7;">🚕</div>
      <h1 class="slide-title">${t.solutions.externalCouriers.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.externalCouriers.subtitle}</p>
    <div class="feature-slide">
      <div class="feature-content">
        <p>${t.solutions.externalCouriers.description}</p>
        <ul class="feature-list">
          ${t.solutions.externalCouriers.features.map(f => `
            <li>
              <div class="feature-check">✓</div>
              <div class="feature-text"><strong>${f.title}</strong><br>${f.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="feature-visual">
        <div style="font-weight: 600; margin-bottom: 12px; color: #002A47;">${txt('Интегрированные службы', 'Integrated services', 'Integratsiyalangan xizmatlar')}</div>
        ${t.solutions.externalCouriers.services.map(name => `
          <div class="visual-stat">
            <span class="visual-stat-label">${name}</span>
            <span style="color: #10B981;">✓</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>6/17</span></div>
  </div>

  <!-- 7. КУРЬЕРСКОЕ ПРИЛОЖЕНИЕ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #CFFAFE;">📍</div>
      <h1 class="slide-title">${t.solutions.courierApp.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.courierApp.subtitle}</p>
    <div class="feature-slide">
      <div class="feature-content">
        <p>${t.solutions.courierApp.description}</p>
        <ul class="feature-list">
          ${t.solutions.courierApp.features.slice(0, 4).map(f => `
            <li>
              <div class="feature-check">✓</div>
              <div class="feature-text"><strong>${f.title}</strong><br>${f.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="feature-visual">
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 64px; margin-bottom: 16px;">📱</div>
          <div style="font-weight: 600; color: #002A47; margin-bottom: 8px;">iOS & Android</div>
          <div style="font-size: 13px; color: #64748b;">${txt('Доступно в App Store и Google Play', 'Available on App Store and Google Play', 'App Store va Google Play\'da mavjud')}</div>
        </div>
        ${t.solutions.courierApp.features.slice(4).map(f => `
          <div class="visual-stat">
            <span class="visual-stat-label">${f.title}</span>
            <span style="color: #10B981;">✓</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>7/17</span></div>
  </div>

  <!-- 8. АНАЛИТИКА -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #E0E7FF;">📊</div>
      <h1 class="slide-title">${t.solutions.analytics.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.analytics.subtitle}</p>
    <p style="color: #64748b; margin-bottom: 24px;">${t.solutions.analytics.description}</p>
    <div class="grid-3">
      ${t.solutions.analytics.features.map(f => `
        <div class="card">
          <div class="card-title">${f.title}</div>
          <div class="card-desc">${f.desc}</div>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>8/17</span></div>
  </div>

  <!-- 9. CRM И ЛОЯЛЬНОСТЬ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #FCE7F3;">💝</div>
      <h1 class="slide-title">${t.solutions.crm.title}</h1>
    </div>
    <p class="slide-subtitle">${t.solutions.crm.subtitle}</p>
    <div class="feature-slide">
      <div class="feature-content">
        <p>${t.solutions.crm.description}</p>
        <ul class="feature-list">
          ${t.solutions.crm.features.map(f => `
            <li>
              <div class="feature-check">✓</div>
              <div class="feature-text"><strong>${f.title}</strong><br>${f.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="feature-visual">
        ${t.solutions.crm.stats.map(s => `
          <div class="visual-stat">
            <span class="visual-stat-label">${s.label}</span>
            <span class="visual-stat-value ${s.type}">${s.value}</span>
          </div>
        `).join('')}
        <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 12px; text-align: center;">
          <div style="font-size: 48px;">🎁</div>
          <div style="font-weight: 600; color: #002A47; margin-top: 8px;">${txt('Кешбэк, бонусы, промокоды', 'Cashback, bonuses, promo codes', 'Keshbek, bonuslar, promokodlar')}</div>
        </div>
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>9/17</span></div>
  </div>

  <!-- 10. ВСЕ ИНТЕГРАЦИИ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #DBEAFE;">🔌</div>
      <h1 class="slide-title">${txt('Все интеграции', 'All Integrations', 'Barcha integratsiyalar')}</h1>
    </div>
    <p class="slide-subtitle">${txt('Работаем со всеми популярными сервисами', 'We work with all popular services', 'Barcha mashhur xizmatlar bilan ishlaymiz')}</p>
    <div class="grid-4" style="gap: 12px;">
      ${[
        { cat: txt('Агрегаторы', 'Aggregators', 'Agregatorlar'), items: ['Yandex Eats', 'Wolt', 'Glovo', 'Uzum Tezkor', 'Bolt Food', 'Express 24'] },
        { cat: txt('Курьерские службы', 'Courier services', 'Kuryer xizmatlari'), items: ['Yandex Delivery', 'Wolt Drive', 'Millennium', 'Noor Taxi'] },
        { cat: txt('Платёжные системы', 'Payment systems', 'To\'lov tizimlari'), items: ['Payme', 'Click', 'Uzum Pay', 'Visa', 'Mastercard'] },
        { cat: txt('POS системы', 'POS systems', 'POS tizimlar'), items: ['R-Keeper', 'iiko', 'Poster', 'Jowi', '1C'] },
      ].map(c => `
        <div class="card">
          <div style="font-weight: 600; color: #002A47; margin-bottom: 12px; font-size: 14px;">${c.cat}</div>
          ${c.items.map(i => `<div style="font-size: 12px; color: #64748b; padding: 4px 0;">${i}</div>`).join('')}
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>10/17</span></div>
  </div>

  <!-- 11. ДОПОЛНИТЕЛЬНЫЕ МОДУЛИ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #FEF3C7;">⚡</div>
      <h1 class="slide-title">${txt('Дополнительные модули', 'Additional Modules', 'Qo\'shimcha modullar')}</h1>
    </div>
    <p class="slide-subtitle">${txt('Расширьте возможности платформы', 'Extend platform capabilities', 'Platforma imkoniyatlarini kengaytiring')}</p>
    <div class="grid-3">
      ${[
        { icon: '🖥️', name: txt('Киоск самообслуживания', 'Self-service kiosk', 'O\'z-o\'ziga xizmat ko\'rsatish kioski'), desc: txt('Приём заказов в зале без официанта', 'Order taking in hall without waiter', 'Ofitsiantsiz zalda buyurtmalarni qabul qilish') },
        { icon: '📞', name: txt('Колл-центр', 'Call center', 'Call-markaz'), desc: txt('Модуль для операторов телефонных заказов', 'Module for phone order operators', 'Telefon buyurtmalari operatorlari uchun modul') },
        { icon: '🍳', name: txt('Кухонный дисплей (KDS)', 'Kitchen Display (KDS)', 'Oshxona displeyi (KDS)'), desc: txt('Экраны заказов для поваров', 'Order screens for chefs', 'Oshpazlar uchun buyurtma ekranlari') },
        { icon: '🏷️', name: txt('Управление меню', 'Menu management', 'Menyuni boshqarish'), desc: txt('Централизованное управление меню', 'Centralized menu control', 'Markazlashtirilgan menyu boshqaruvi') },
        { icon: '📦', name: txt('Складской учёт', 'Inventory', 'Ombor hisobi'), desc: txt('Контроль остатков и списаний', 'Stock and write-off control', 'Qoldiqlar va hisobdan chiqarishlarni nazorat qilish') },
        { icon: '📈', name: txt('Маркетинг', 'Marketing', 'Marketing'), desc: txt('Push, SMS, Email рассылки', 'Push, SMS, Email campaigns', 'Push, SMS, Email jo\'natmalar') },
      ].map(m => `
        <div class="card">
          <div class="card-icon">${m.icon}</div>
          <div class="card-title">${m.name}</div>
          <div class="card-desc">${m.desc}</div>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>11/17</span></div>
  </div>

  <!-- 12. РЕЗУЛЬТАТЫ КЛИЕНТОВ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #D1FAE5;">📈</div>
      <h1 class="slide-title">${txt('Результаты клиентов', 'Client Results', 'Mijozlar natijalari')}</h1>
    </div>
    <p class="slide-subtitle">${txt('Проверено на 1000+ бизнесов', 'Proven on 1000+ businesses', '1000+ biznesda tasdiqlangan')}</p>
    <div class="grid-4" style="margin-bottom: 30px;">
      ${[
        { value: '1000+', label: txt('Бизнесов', 'Businesses', 'Bizneslar') },
        { value: '13M+', label: txt('Заказов', 'Orders', 'Buyurtmalar') },
        { value: '7', label: txt('Стран', 'Countries', 'Mamlakatlar') },
        { value: '+30%', label: txt('Рост выручки', 'Revenue growth', 'Daromad o\'sishi') },
      ].map(s => `
        <div class="metric-card">
          <div class="metric-value">${s.value}</div>
          <div class="metric-label">${s.label}</div>
        </div>
      `).join('')}
    </div>
    <div class="grid-2">
      ${[
        { name: 'Yaponamama', result: txt('+45% повторных заказов', '+45% repeat orders', '+45% takroriy buyurtmalar'), logo: 'https://yaponamama.uz/images/logo.jpg' },
        { name: 'Maxway', result: txt('60% заказов через свои каналы', '60% orders via own channels', '60% buyurtmalar o\'z kanallar orqali'), logo: 'https://maxway.uz/favicon.ico' },
        { name: 'Chicago Pizza', result: txt('+35% средний чек', '+35% average check', '+35% o\'rtacha chek'), logo: 'https://cdn.delever.uz/delever/chicago_logo.png' },
        { name: 'Kamolon Osh', result: txt('Экономия 8 млн сум/мес', '$700/mo savings', '8 mln so\'m/oy tejash'), logo: 'https://kamolonosh.uz/images/logo.svg' },
      ].map(c => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${c.logo}" alt="${c.name}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" onerror="this.style.display='none'">
            <span style="font-weight: 600;">${c.name}</span>
          </div>
          <span style="color: #10B981; font-weight: 600; font-size: 14px;">${c.result}</span>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>12/17</span></div>
  </div>

  <!-- 13. ПРИМЕРЫ ПРОЕКТОВ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #E0E7FF;">🌟</div>
      <h1 class="slide-title">${t.clientsTitle}</h1>
    </div>
    <p class="slide-subtitle">${t.clientsSubtitle}</p>
    <div class="grid-2" style="gap: 30px;">
      <div class="card">
        <div style="font-weight: 600; margin-bottom: 16px;">🌐 ${t.websitesLabel}</div>
        <div class="grid-2" style="gap: 10px;">
          ${clientExamples.websites.map(c => `
            <div style="padding: 12px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; gap: 12px;">
              <img src="${c.logo}" alt="${c.name}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" onerror="this.style.display='none'">
              <div>
                <div style="font-weight: 600; color: #002A47; font-size: 13px;">${c.name}</div>
                <div style="font-size: 11px; color: #64748b;">${c.url}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div style="font-weight: 600; margin-bottom: 16px;">📱 ${t.appsLabel}</div>
        <div class="grid-2" style="gap: 10px;">
          ${clientExamples.apps.map(c => `
            <div style="padding: 12px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; gap: 12px;">
              <img src="${c.logo}" alt="${c.name}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" onerror="this.style.display='none'">
              <div>
                <div style="font-weight: 600; color: #002A47; font-size: 13px;">${c.name}</div>
                <div style="font-size: 11px; color: #64748b;">${c.platform}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>13/17</span></div>
  </div>

  <!-- 14. ТАРИФЫ -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #FEF3C7;">💰</div>
      <h1 class="slide-title">${t.pricingTitle}</h1>
    </div>
    <p class="slide-subtitle">${t.pricingSubtitle}</p>
    <div class="grid-4">
      ${t.plans.map(p => `
        <div class="plan-card ${p.popular ? 'popular' : ''}">
          ${p.popular ? `<div class="plan-badge">${txt('Популярный', 'Popular', 'Mashhur')}</div>` : '<div style="height: 22px;"></div>'}
          <div class="plan-name">${p.name}</div>
          <div class="plan-orders">${p.orders}</div>
          <div class="plan-price">${p.price}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 12px; text-align: center;">
      <div style="font-size: 14px; color: #64748b;">${txt('Все тарифы включают: веб-сайт, Telegram-бот, курьерское приложение, CRM, аналитику', 'All plans include: website, Telegram bot, courier app, CRM, analytics', 'Barcha tariflar quyidagilarni o\'z ichiga oladi: veb-sayt, Telegram-bot, kuryer ilovasi, CRM, tahlil')}</div>
    </div>
    <div class="slide-footer"><span>delever.io</span><span>14/17</span></div>
  </div>

  <!-- 15. ПРОЦЕСС ЗАПУСКА -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-icon" style="background: #CFFAFE;">🚀</div>
      <h1 class="slide-title">${txt('Как мы работаем', 'How we work', 'Qanday ishlaymiz')}</h1>
    </div>
    <p class="slide-subtitle">${txt('Запуск за 3-7 дней', 'Launch in 3-7 days', '3-7 kunda ishga tushirish')}</p>
    <div class="grid-4">
      ${[
        { step: '1', title: txt('Консультация', 'Consultation', 'Maslahat'), desc: txt('Анализ бизнеса и потребностей', 'Business & needs analysis', 'Biznes va ehtiyojlar tahlili'), time: txt('1 день', '1 day', '1 kun') },
        { step: '2', title: txt('Настройка', 'Setup', 'Sozlash'), desc: txt('Меню, интеграции, дизайн', 'Menu, integrations, design', 'Menyu, integratsiyalar, dizayn'), time: txt('2-3 дня', '2-3 days', '2-3 kun') },
        { step: '3', title: txt('Обучение', 'Training', 'O\'qitish'), desc: txt('Обучение команды работе', 'Team training', 'Jamoa o\'qitish'), time: txt('1 день', '1 day', '1 kun') },
        { step: '4', title: txt('Запуск', 'Launch', 'Ishga tushirish'), desc: txt('Старт и поддержка', 'Start & support', 'Start va qo\'llab-quvvatlash'), time: '∞' },
      ].map(s => `
        <div class="card" style="text-align: center;">
          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #002A47, #004d7a); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-weight: 700;">${s.step}</div>
          <div style="font-weight: 600; color: #002A47; margin-bottom: 6px;">${s.title}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">${s.desc}</div>
          <div style="font-size: 11px; color: #10B981; font-weight: 600;">${s.time}</div>
        </div>
      `).join('')}
    </div>
    <div class="slide-footer"><span>delever.io</span><span>15/17</span></div>
  </div>

  <!-- 16. КОНТАКТЫ -->
  <div class="slide slide-contacts">
    <div class="contacts-title">${t.contactsTitle}</div>
    <div class="contacts-subtitle">${t.contactsSubtitle}</div>
    <div class="contact-info">
      <div class="contact-item">🌐 delever.io</div>
      <div class="contact-item">📧 support@delever.uz</div>
      <div class="contact-item">📞 +998 78 113 98 13</div>
      <div class="contact-item">💬 @deleverme</div>
    </div>
  </div>

  ${customData ? `
  <!-- 17. ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ -->
  <div class="slide custom-slide">
    <div class="custom-header">
      <h1 style="font-size: 28px; margin-bottom: 6px;">${t.customTitle}</h1>
      <p style="opacity: 0.9; font-size: 14px;">${brandName ? `${txt('Для', 'For', '')} ${brandName}${txt('', '', ' uchun')}` : t.customFor}</p>
    </div>
    <div class="custom-grid">
      <div class="custom-section">
        <div class="custom-section-title">${t.customPlan}</div>
        <div style="font-size: 28px; font-weight: 700; color: #002A47; margin-bottom: 12px;">${customData.planName}</div>
        <div class="custom-row">
          <span class="custom-label">${t.monthly}</span>
          <span class="custom-value">${customData.totalCost}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${t.deposit}</span>
          <span class="custom-value">${customData.deposit}</span>
        </div>
        ${customData.modulesCost && customData.modulesCost !== '0' ? `
        <div class="custom-row">
          <span class="custom-label">${t.modulesCostLabel}</span>
          <span class="custom-value">${customData.modulesCost}</span>
        </div>
        ` : ''}
      </div>
      <div class="custom-section">
        <div class="custom-section-title">${t.customParams}</div>
        <div class="custom-row">
          <span class="custom-label">${t.branches}</span>
          <span class="custom-value">${customData.branches}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${t.orders}</span>
          <span class="custom-value">${customData.monthlyOrders.toLocaleString()}</span>
        </div>
        <div class="custom-row">
          <span class="custom-label">${t.avgCheck}</span>
          <span class="custom-value">${customData.avgCheck}</span>
        </div>
        ${customData.kioskCount && customData.kioskCount > 0 ? `
        <div class="custom-row">
          <span class="custom-label">${t.kiosks}</span>
          <span class="custom-value">${customData.kioskCount}</span>
        </div>
        ` : ''}
        ${customData.couriersCount && customData.couriersCount > 0 ? `
        <div class="custom-row">
          <span class="custom-label">${t.couriers}</span>
          <span class="custom-value">${customData.couriersCount}</span>
        </div>
        ` : ''}
      </div>
    </div>
    ${customData.selectedModules && customData.selectedModules.length > 0 ? `
    <div class="custom-section" style="margin-top: 16px;">
      <div class="custom-section-title">${t.selectedModulesTitle}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
        ${customData.selectedModules.map(m => `
          <span style="background: linear-gradient(135deg, #002A47, #004d7a); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
            ${t.moduleNames[m] || m}
          </span>
        `).join('')}
      </div>
    </div>
    ` : ''}
    ${customData.roiSavings ? `
    <div class="savings-box">
      <div class="savings-value">+${customData.roiSavings}/${txt('мес', 'mo', 'oy')}</div>
      <div class="savings-label">${t.savings}</div>
      ${customData.roiYearlySavings ? `<div style="margin-top: 8px; opacity: 0.9; font-size: 13px;">${t.yearly}: ${customData.roiYearlySavings}</div>` : ''}
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
