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
  
  // Интеграции
  { path: '/aggregators', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations', priority: '0.8', changefreq: 'monthly' },
  
  // Тарифы и калькулятор
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  
  // Инструменты
  { path: '/ai-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/menu-doctor', priority: '0.8', changefreq: 'weekly' },
  
  // Партнёры и компания
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

