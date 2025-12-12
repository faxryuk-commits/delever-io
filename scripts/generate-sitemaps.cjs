/**
 * Генератор многоуровневой sitemap структуры
 * Создаёт:
 * - sitemap.xml (index)
 * - sitemap-static.xml
 * - sitemap-products.xml
 * - sitemap-integrations.xml
 * - sitemap-solutions.xml
 * - sitemap-guides.xml
 * - sitemap-geo.xml
 */

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const baseUrl = 'https://delever.io';
const publicDir = path.join(__dirname, '../public');

// ============================================
// ДАННЫЕ ДЛЯ SITEMAP
// ============================================

// Статические страницы
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/products/channels', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/operations', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/analytics', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/marketing', priority: '0.8', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { path: '/aggregators', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations', priority: '0.8', changefreq: 'monthly' },
  { path: '/white-label', priority: '0.8', changefreq: 'monthly' },
  { path: '/clients', priority: '0.8', changefreq: 'weekly' },
  { path: '/partners', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/esg', priority: '0.6', changefreq: 'monthly' },
  { path: '/investors', priority: '0.7', changefreq: 'monthly' },
  { path: '/ai-marketing', priority: '0.7', changefreq: 'monthly' },
  { path: '/menu-doctor', priority: '0.7', changefreq: 'monthly' },
];

// POS Интеграции
const posIntegrations = [
  { path: '/integrations/iiko', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations/rkeeper', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations/poster', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations/jowi', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations/syrve', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations/paloma', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/clopos', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/loook', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/alipos', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/neon-alisa', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/yaros', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/dodo-pizza', priority: '0.7', changefreq: 'monthly' },
];

// Агрегаторы
const aggregators = [
  { path: '/aggregators/glovo', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/wolt', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/yandex-eats', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/uzum-tezkor', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/bolt-food', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/chocofood', priority: '0.7', changefreq: 'monthly' },
  { path: '/aggregators/foody', priority: '0.7', changefreq: 'monthly' },
];

// Платежи
const payments = [
  { path: '/integrations/payme', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/click', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/uzum-bank', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/kaspi', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/epay', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/tiptop-pay', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/atmos', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/anorbank', priority: '0.7', changefreq: 'monthly' },
];

// Доставка
const delivery = [
  { path: '/delivery/yandex-delivery', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/wolt-drive', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/millenium', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/noor', priority: '0.7', changefreq: 'monthly' },
];

// Бизнес решения
const solutions = [
  { path: '/solutions/cafe', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/pizzeria', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/restaurant-chain', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/dark-kitchen', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/coffee-shop', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions/grocery', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions/bakery', priority: '0.7', changefreq: 'monthly' },
];

// Сравнения
const comparisons = [
  { path: '/compare/own-delivery-vs-aggregators', priority: '0.7', changefreq: 'monthly' },
  { path: '/compare/delever-vs-iiko', priority: '0.7', changefreq: 'monthly' },
  { path: '/compare/delever-vs-rkeeper', priority: '0.7', changefreq: 'monthly' },
];

// Case Studies
const caseStudies = [
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/case-studies/grand-lavash', priority: '0.85', changefreq: 'monthly' },
  { path: '/case-studies/yaponamama', priority: '0.85', changefreq: 'monthly' },
  { path: '/case-studies/maxway', priority: '0.85', changefreq: 'monthly' },
  { path: '/case-studies/gippo', priority: '0.85', changefreq: 'monthly' },
  { path: '/case-studies/okadzaki', priority: '0.85', changefreq: 'monthly' },
];

// Knowledge Hub (Guides) - Hubs
const guideHubs = [
  { path: '/guides', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/open-restaurant', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/launch-delivery', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/grow-sales', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/restaurant-finance', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/operations', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/aggregators', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/pos-integrations', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/courier-logistics', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/dark-kitchen', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides/hr-restaurant', priority: '0.8', changefreq: 'weekly' },
];

// Knowledge Hub - Все 40+ статей
const guideArticles = [
  // Открытие ресторана (7)
  { path: '/guides/how-to-open-restaurant', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/how-to-choose-location', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-business-plan', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/restaurant-concept-development', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-equipment-guide', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/coffee-shop-delivery', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/grocery-delivery', priority: '0.8', changefreq: 'monthly' },
  // Запуск доставки (8)
  { path: '/guides/how-to-launch-delivery', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/how-to-hire-couriers', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/delivery-zones-setup', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/delivery-packaging-guide', priority: '0.75', changefreq: 'monthly' },
  { path: '/guides/telegram-bot-for-restaurant', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/restaurant-website-guide', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/restaurant-website-development', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/telegram-bot-restaurant', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/mobile-app-restaurant', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-choose-delivery-platform', priority: '0.85', changefreq: 'monthly' },
  // Рост продаж (7)
  { path: '/guides/how-to-increase-restaurant-sales', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/restaurant-loyalty-program', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-promotions-guide', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/upselling-cross-selling-restaurant', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-marketing-channels', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-marketing-strategy', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/loyalty-program-restaurant', priority: '0.85', changefreq: 'monthly' },
  // Агрегаторы (4)
  { path: '/guides/reduce-aggregator-commissions', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/glovo-for-restaurants', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/wolt-for-restaurants', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/own-delivery-vs-aggregators', priority: '0.85', changefreq: 'monthly' },
  // Финансы (4)
  { path: '/guides/food-cost-calculation', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/restaurant-unit-economics', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-profit-margins', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/restaurant-kpis', priority: '0.8', changefreq: 'monthly' },
  // Операции (4)
  { path: '/guides/restaurant-automation-guide', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/kitchen-display-system', priority: '0.75', changefreq: 'monthly' },
  { path: '/guides/inventory-management-restaurant', priority: '0.75', changefreq: 'monthly' },
  { path: '/guides/restaurant-analytics-guide', priority: '0.85', changefreq: 'monthly' },
  // Курьеры (3)
  { path: '/guides/courier-salary-models', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/courier-app-features', priority: '0.75', changefreq: 'monthly' },
  // POS (1)
  { path: '/guides/choose-pos-system', priority: '0.85', changefreq: 'monthly' },
  // Dark Kitchen (1)
  { path: '/guides/dark-kitchen-guide', priority: '0.85', changefreq: 'monthly' },
  // HR (1)
  { path: '/guides/hire-restaurant-staff', priority: '0.8', changefreq: 'monthly' },
];

// GEO страницы — все города × все шаблоны
// Шаблоны: open-restaurant, launch-delivery, dark-kitchen, increase-sales, pizza-delivery, sushi-delivery
const geoTemplates = ['open-restaurant-in', 'launch-delivery-in', 'dark-kitchen-in', 'increase-sales-in', 'pizza-delivery-in', 'sushi-delivery-in'];

// Города по странам
const cities = {
  uzbekistan: ['tashkent', 'samarkand', 'bukhara', 'fergana', 'namangan', 'andijan', 'nukus', 'karshi', 'jizzakh', 'navoi', 'termez', 'urgench', 'khiva'],
  kazakhstan: ['almaty', 'astana', 'shymkent', 'karaganda', 'aktobe', 'atyrau', 'pavlodar', 'semey', 'taraz', 'kostanay'],
  uae: ['dubai', 'abu-dhabi', 'sharjah'],
  qatar: ['doha'],
  azerbaijan: ['baku', 'ganja'],
  kyrgyzstan: ['bishkek', 'osh'],
  tajikistan: ['dushanbe'],
  georgia: ['tbilisi']
};

// Приоритеты для городов
const cityPriority = {
  'tashkent': '0.85', 'almaty': '0.85', 'dubai': '0.85', 'astana': '0.8',
  'samarkand': '0.75', 'bukhara': '0.75', 'shymkent': '0.75', 'baku': '0.75',
  'doha': '0.75', 'bishkek': '0.75', 'tbilisi': '0.75', 'dushanbe': '0.7'
};

// Генерация GEO страниц
const geoPages = [];
Object.values(cities).flat().forEach(city => {
  geoTemplates.forEach(template => {
    geoPages.push({
      path: `/geo/${template}-${city}`,
      priority: cityPriority[city] || '0.7',
      changefreq: 'monthly'
    });
  });
});

// ============================================
// ГЕНЕРАЦИЯ SITEMAP
// ============================================

function generateSitemapXML(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  return xml;
}

function generateSitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>\n';
  return xml;
}

// ============================================
// СОЗДАНИЕ ФАЙЛОВ
// ============================================

// 1. Static pages
const staticXML = generateSitemapXML(staticPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-static.xml'), staticXML);
console.log(`✅ sitemap-static.xml (${staticPages.length} pages)`);

// 2. Integrations (POS + Aggregators + Payments + Delivery)
const integrationsPages = [...posIntegrations, ...aggregators, ...payments, ...delivery];
const integrationsXML = generateSitemapXML(integrationsPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-integrations.xml'), integrationsXML);
console.log(`✅ sitemap-integrations.xml (${integrationsPages.length} pages)`);

// 3. Solutions
const solutionsPages = [...solutions, ...comparisons];
const solutionsXML = generateSitemapXML(solutionsPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-solutions.xml'), solutionsXML);
console.log(`✅ sitemap-solutions.xml (${solutionsPages.length} pages)`);

// 4. Guides (Knowledge Hub)
const guidesPages = [...guideHubs, ...guideArticles];
const guidesXML = generateSitemapXML(guidesPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-guides.xml'), guidesXML);
console.log(`✅ sitemap-guides.xml (${guidesPages.length} pages)`);

// 5. GEO pages
const geoXML = generateSitemapXML(geoPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-geo.xml'), geoXML);
console.log(`✅ sitemap-geo.xml (${geoPages.length} pages)`);

// 6. Case Studies
const caseStudiesXML = generateSitemapXML(caseStudies);
fs.writeFileSync(path.join(publicDir, 'sitemap-cases.xml'), caseStudiesXML);
console.log(`✅ sitemap-cases.xml (${caseStudies.length} pages)`);

// 7. Sitemap Index
const sitemapIndex = generateSitemapIndex([
  'sitemap-static.xml',
  'sitemap-integrations.xml',
  'sitemap-solutions.xml',
  'sitemap-guides.xml',
  'sitemap-geo.xml',
  'sitemap-cases.xml'
]);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
console.log(`✅ sitemap.xml (index)`);

// Total count
const totalPages = staticPages.length + integrationsPages.length + solutionsPages.length + guidesPages.length + geoPages.length + caseStudies.length;
console.log(`\n📊 Всего: ${totalPages} страниц в ${6} sitemap файлах`);
