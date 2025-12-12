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
  
  // Агрегаторы (SEO)
  { path: '/aggregators/glovo', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/wolt', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/yandex-eats', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/uzum-tezkor', priority: '0.8', changefreq: 'monthly' },
  { path: '/aggregators/bolt-food', priority: '0.8', changefreq: 'monthly' },
  
  // Платежные системы (SEO)
  { path: '/integrations/payme', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/click', priority: '0.7', changefreq: 'monthly' },
  
  // Службы доставки (SEO)
  { path: '/delivery/yandex-delivery', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/wolt-drive', priority: '0.7', changefreq: 'monthly' },
  { path: '/delivery/millennium', priority: '0.7', changefreq: 'monthly' },
  
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
  
  // Гео-страницы (SEO) - страны
  { path: '/geo/uzbekistan', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/kazakhstan', priority: '0.8', changefreq: 'monthly' },
  
  // Гео-страницы (SEO) - города
  { path: '/geo/tashkent', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/samarkand', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/bukhara', priority: '0.7', changefreq: 'monthly' },
  { path: '/geo/almaty', priority: '0.8', changefreq: 'monthly' },
  { path: '/geo/astana', priority: '0.8', changefreq: 'monthly' },
  
  // Тарифы и калькулятор
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  
  // Инструменты
  { path: '/ai-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/menu-doctor', priority: '0.8', changefreq: 'weekly' },
  
  // Knowledge Hub - Guides
  { path: '/guides', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/how-to-open-restaurant', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-choose-location', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-launch-delivery', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-hire-couriers', priority: '0.8', changefreq: 'monthly' },
  { path: '/guides/how-to-increase-restaurant-sales', priority: '0.8', changefreq: 'monthly' },
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

