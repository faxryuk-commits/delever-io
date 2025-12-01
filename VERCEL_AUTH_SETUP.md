# Настройка Vercel Authentication для работы с админкой

## Проблема

Vercel Authentication блокирует все запросы, включая запросы от админки с параметрами `admin_token` и `edit_mode`.

## Решение

### Вариант 1: Отключить Vercel Authentication (самый простой)

1. Зайдите на https://vercel.com
2. Выберите проект `delever-site`
3. Перейдите в **Settings** → **Authentication**
4. Отключите **Vercel Authentication** или удалите защиту проекта

### Вариант 2: Настроить исключения (если нужно оставить защиту)

К сожалению, Vercel Authentication не поддерживает исключения по query параметрам напрямую.

Альтернативные варианты:

#### A. Создать отдельный проект без защиты

1. Создайте новый проект на Vercel для админки
2. Используйте тот же код, но без Vercel Authentication
3. Обновите URL в админке

#### B. Использовать поддомен без защиты

1. Создайте поддомен `preview.delever.io`
2. Настройте его без Vercel Authentication
3. Обновите `VITE_SITE_URL` в админке

### Вариант 3: Использовать API Route для обхода

Создайте API route, который будет возвращать HTML без проверки авторизации:

```typescript
// api/preview.ts
export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const adminToken = searchParams.get('admin_token')
  
  if (adminToken !== 'admin-access') {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Возвращаем HTML страницы
  // ... загрузка и возврат HTML
}
```

Но это сложнее, так как нужно рендерить React на сервере.

## Рекомендация

**Самый простой способ**: Отключить Vercel Authentication для проекта, так как:
- Сайт публичный и не требует авторизации для просмотра
- Админка имеет свою систему авторизации
- Vercel Authentication нужен только для защиты админ-панелей

## После отключения

После отключения Vercel Authentication:
1. Сайт будет доступен без авторизации
2. Админка сможет загружать его в iframe
3. Заголовки из `vercel.json` будут работать корректно

## Проверка

После настройки проверьте:
```
https://delever-site-plh9d7t0b-fakhriddins-projects-e76e6079.vercel.app/?admin_token=admin-access&edit_mode=true
```

Должно работать без 401 ошибки.

