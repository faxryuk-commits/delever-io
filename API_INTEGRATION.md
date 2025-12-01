# Интеграция админ-панели с основным сайтом

## Вариант 1: Статический JSON файл (простой)

Админка может читать/писать в `public/api/content.json` через GitHub API или напрямую.

## Вариант 2: API Endpoints (рекомендуется)

Создайте API endpoints на основном сайте для синхронизации.

### Пример структуры API:

#### GET /api/content
Возвращает текущий контент сайта.

#### POST /api/content/sync
Принимает обновленный контент от админки.

```typescript
// Пример endpoint (нужно реализовать на бэкенде)
POST /api/content/sync
Headers: {
  Authorization: "Bearer <token>",
  Content-Type: "application/json"
}
Body: {
  pages: PageStructure[],
  content: ContentItem[],
  navigation: NavigationItem[],
  footerLinks: FooterLink[]
}
```

## Вариант 3: Headless CMS

Используйте готовое решение:
- Strapi
- Contentful
- Sanity
- Directus

## Вариант 4: Firebase/Supabase

Используйте Firebase Realtime Database или Supabase для синхронизации в реальном времени.

## Текущая реализация

Сейчас админка использует localStorage с возможностью синхронизации через API.

Для полной интеграции нужно:
1. Создать API endpoints на бэкенде
2. Обновить `src/lib/api.ts` в админке
3. Настроить CORS для разрешения запросов от админки

