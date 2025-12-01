# Delever Site

Сайт для платформы Delever - операционной системы для доставки.

## Технологии

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI
- Framer Motion
- Sonner (Toaster)

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Структура проекта

```
src/
├── components/        # Компоненты
│   ├── home/         # Компоненты для главной страницы
│   └── ui/           # UI компоненты
├── contexts/         # React контексты (Theme, Language, Region)
├── lib/              # Утилиты
├── pages/            # Страницы
│   └── products/     # Страницы продуктов
└── App.tsx           # Главный компонент с роутингом
```

## Роуты

- `/` - Главная страница
- `/products/channels` - Каналы продаж
- `/products/operations` - Операции
- `/products/analytics` - Аналитика
- `/products/marketing` - Маркетинг
- `/integrations` - Интеграции
- `/partners` - Партнёрам
- `/about` - О компании
- `*` - 404 страница

