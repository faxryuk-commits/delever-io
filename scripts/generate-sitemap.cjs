/**
 * Автоматический генератор sitemap.xml
 * Запускается при каждом билде: npm run build
 */

const fs = require('fs');
const path = require('path');

// Текущая дата в формате YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Базовый URL сайта
const baseUrl = 'https://delever.io';

// Страницы сайта с приоритетами
const pages = [
  // Главная
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  
  // Продукты
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/products/channels', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/operations', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/analytics', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/marketing', priority: '0.8', changefreq: 'monthly' },
  
  // Интеграции (общие)
  { path: '/aggregators', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations', priority: '0.8', changefreq: 'monthly' },
  
  // POS Интеграции (SEO)
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
  
  // Агрегаторы (SEO)
  { path: '/aggregators/glovo', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/wolt', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/yandex-eats', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/uzum-tezkor', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/bolt-food', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/chocofood', priority: '0.7', changefreq: 'monthly' },
  { path: '/aggregators/foody', priority: '0.7', changefreq: 'monthly' },
  
  // Платежные системы (SEO)
  { path: '/integrations/payme', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/click', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/uzum-bank', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/kaspi', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/epay', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/tiptop-pay', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/atmos', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/anorbank', priority: '0.7', changefreq: 'monthly' },
  
  // Службы доставки (SEO)
  { path: '/delivery/yandex-delivery', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/wolt-drive', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/millennium', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/noor', priority: '0.7', changefreq: 'monthly' },
  
  // Решения по типу бизнеса (SEO)
  { path: '/solutions/pizzeria', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/sushi', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/burger', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/cafe', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/dark-kitchen', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/food-chain', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/confectionery', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions/coffee-shop', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions/grocery', priority: '0.7', changefreq: 'monthly' },
  
  // Страницы сравнения (SEO)
  { path: '/compare/delever-vs-pos', priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/own-delivery-vs-aggregators', priority: '0.8', changefreq: 'monthly' },
  
  // ============================================
  // GEO PAGES — PROGRAMMATIC SEO (204+ страниц)
  // ============================================
  
  // Узбекистан — открытие ресторана
  { path: '/geo/open-restaurant-in-tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-samarkand', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-bukhara', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-fergana', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-namangan', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-andijan', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-nukus', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-karshi', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-jizzakh', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-navoi', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-termez', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-urgench', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-khiva', priority: '0.6', changefreq: 'monthly' },
  
  // Казахстан — открытие ресторана
  { path: '/geo/open-restaurant-in-almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-astana', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-shymkent', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-karaganda', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-aktobe', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-atyrau', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-pavlodar', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-semey', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-taraz', priority: '0.6', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-kostanay', priority: '0.6', changefreq: 'monthly' },
  
  // ОАЭ — открытие ресторана
  { path: '/geo/open-restaurant-in-dubai', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-abu-dhabi', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-sharjah', priority: '0.7', changefreq: 'monthly' },
  
  // Катар
  { path: '/geo/open-restaurant-in-doha', priority: '0.8', changefreq: 'monthly' },
  
  // Азербайджан
  { path: '/geo/open-restaurant-in-baku', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-ganja', priority: '0.7', changefreq: 'monthly' },
  
  // Кыргызстан
  { path: '/geo/open-restaurant-in-bishkek', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-osh', priority: '0.7', changefreq: 'monthly' },
  
  // Таджикистан
  { path: '/geo/open-restaurant-in-dushanbe', priority: '0.8', changefreq: 'monthly' },
  
  // Грузия
  { path: '/geo/open-restaurant-in-tbilisi', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/open-restaurant-in-batumi', priority: '0.7', changefreq: 'monthly' },
  
  // ============================================
  // LAUNCH DELIVERY по городам
  // ============================================
  { path: '/geo/launch-delivery-in-tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-samarkand', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-bukhara', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-fergana', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-namangan', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-andijan', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-astana', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-shymkent', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-dubai', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-abu-dhabi', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-doha', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-baku', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-bishkek', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-dushanbe', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/launch-delivery-in-tbilisi', priority: '0.8', changefreq: 'monthly' },
  
  // ============================================
  // DARK KITCHEN по городам
  // ============================================
  { path: '/geo/dark-kitchen-in-tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-astana', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-dubai', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-doha', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-baku', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-bishkek', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/dark-kitchen-in-tbilisi', priority: '0.7', changefreq: 'monthly' },
  
  // ============================================
  // INCREASE SALES по городам
  // ============================================
  { path: '/geo/increase-sales-in-tashkent', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/increase-sales-in-almaty', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/increase-sales-in-dubai', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/increase-sales-in-baku', priority: '0.7', changefreq: 'monthly' },
  
  // ============================================
  // PIZZA DELIVERY по городам
  // ============================================
  { path: '/geo/pizza-delivery-in-tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/pizza-delivery-in-samarkand', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/pizza-delivery-in-almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/pizza-delivery-in-astana', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/pizza-delivery-in-dubai', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/pizza-delivery-in-baku', priority: '0.7', changefreq: 'monthly' },
  
  // ============================================
  // SUSHI DELIVERY по городам
  // ============================================
  { path: '/geo/sushi-delivery-in-tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/sushi-delivery-in-almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/sushi-delivery-in-dubai', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/sushi-delivery-in-tbilisi', priority: '0.7', changefreq: 'monthly' },
  
  // Тарифы и калькулятор
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  
  // Инструменты
  { path: '/ai-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/menu-doctor', priority: '0.8', changefreq: 'weekly' },
  
  // Knowledge Hub - Guides (6 статей)
  { path: '/guides', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/how-to-open-restaurant', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/how-to-choose-location', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-launch-delivery', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/how-to-hire-couriers', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-increase-restaurant-sales', priority: '0.85', changefreq: 'monthly' },
  { path: '/guides/reduce-aggregator-commissions', priority: '0.8', changefreq: 'monthly' },
  
  // Партнёры и компания
  { path: '/clients', priority: '0.8', changefreq: 'weekly' },
  { path: '/partners', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/white-label', priority: '0.8', changefreq: 'monthly' },
  { path: '/esg', priority: '0.7', changefreq: 'monthly' },
  { path: '/investors', priority: '0.8', changefreq: 'monthly' },
];

// Генерация URL записи
function generateUrlEntry(page) {
  const fullUrl = `${baseUrl}${page.path}`;
  const ruUrl = page.path === '/' ? `${baseUrl}/?lang=ru` : `${baseUrl}${page.path}?lang=ru`;
  const enUrl = page.path === '/' ? `${baseUrl}/?lang=en` : `${baseUrl}${page.path}?lang=en`;
  const uzUrl = page.path === '/' ? `${baseUrl}/?lang=uz` : `${baseUrl}${page.path}?lang=uz`;
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${ruUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="uz" href="${uzUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}"/>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

// Генерация полного sitemap
function generateSitemap() {
  const urlEntries = pages.map(generateUrlEntry).join('\n\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Auto-generated sitemap - Last updated: ${today} -->
  
${urlEntries}

</urlset>
`;
}

// Запись файла
const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`📅 Date: ${today}`);
console.log(`📄 Pages: ${pages.length}`);

