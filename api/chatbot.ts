export const config = {
  runtime: 'edge',
}

// База знаний Delever (из контента сайта)
const KNOWLEDGE_BASE = `
# О компании Delever

Delever — единая платформа для управления доставкой. Основана в 2020 году в Ташкенте, Узбекистан.

## Ключевые показатели:
- 1000+ подключённых бизнесов
- 7 стран присутствия (Узбекистан, Казахстан, Кыргызстан, Азербайджан, Грузия, Кипр, ОАЭ)
- 13+ миллионов обработанных заказов
- 40+ интеграций
- 99.9% uptime

## Клиенты:
Yaponamama, EVOS, Maxway, Les Ailes, Brasserie, Pizza Hut, Hardee's, GIPPO и другие.

# Продукты и функции

## Каналы продаж:
- Брендированный сайт для заказов (без комиссий)
- Мобильное приложение iOS/Android (White Label)
- Telegram-бот для приёма заказов
- QR-меню для ресторанов
- Интеграция с колл-центром

## Интеграция с агрегаторами:
Все заказы из агрегаторов в одном окне:
- Wolt
- Glovo  
- Yandex Eats
- Uzum Tezkor
- Chocofood
- Foody

Преимущества:
- Единый экран для всех заказов
- Автосинхронизация с кассой (iiko, R-Keeper, Poster)
- Единое меню на все агрегаторы
- Управление стоп-листами
- Сравнительная аналитика

## Операции и логистика:
- Диспетчеризация заказов
- Управление курьерами с GPS-трекингом
- Автоназначение заказов курьерам
- Оптимизация маршрутов
- Приложение для курьеров

## Интеграции с POS-системами:
- iiko
- R-Keeper
- Jowi
- Poster
- Paloma
- Syrve
- Yaros
- Clopos

## Аналитика:
- Дашборды в реальном времени
- ABC/XYZ анализ меню
- Отчёты по продажам
- Эффективность курьеров
- AI-прогнозы спроса

## CRM и маркетинг:
- RFM-сегментация клиентов
- Push-уведомления и SMS-рассылки
- Программа лояльности (бонусы, кэшбэк)
- Промокоды и акции
- История заказов клиентов

# Тарифы

## Start — от 1,300,000 сум/мес (~$99)
- До 1000 заказов/мес
- 1 филиал
- Базовые функции

## Medium — от 2,400,000 сум/мес (~$185)  
- До 3000 заказов/мес
- До 3 филиалов
- Расширенная аналитика

## Big — от 4,300,000 сум/мес (~$330)
- До 6000 заказов/мес
- До 7 филиалов
- CRM и маркетинг

## Enterprise — от 6,500,000 сум/мес (~$500)
- 10,000+ заказов/мес
- Неограниченно филиалов
- Выделенный менеджер
- SLA 99.9%

## Дополнительно:
- White Label приложение: от $2,000 единоразово
- Интеграция с агрегаторами: от $50/мес за агрегатор
- Киоск самообслуживания: от $30/мес за устройство

# Запуск и поддержка

- Запуск за 1 день
- Бесплатная настройка меню
- Обучение персонала
- Техподдержка 24/7 на русском языке
- Персональный менеджер

# Контакты

- Телефон: +998 78 113 98 13
- Email: support@delever.uz
- Telegram: @deleverme
- Офис: Ташкент, проспект Амира Темура 129Б

# Результаты клиентов

- Снижение времени доставки на 35%
- Рост среднего чека на 25%
- Увеличение повторных заказов на 40%
- Экономия на комиссиях агрегаторов до 15 млн сум/мес
`

// Определение намерения пользователя (для типизации ответа AI)
type UserIntent = 'info' | 'pricing' | 'demo' | 'support' | 'hot_lead' | 'unknown'
void ('' as UserIntent) // Используется в SYSTEM_PROMPT

// Системный промпт для AI
const SYSTEM_PROMPT = `Ты — умный ассистент компании Delever. Твоя задача:

1. Отвечать на вопросы о продуктах, тарифах и возможностях Delever
2. Быть дружелюбным и профессиональным
3. Давать краткие, но информативные ответы
4. Определять "горячих" клиентов, готовых к покупке

БАЗА ЗНАНИЙ:
${KNOWLEDGE_BASE}

ПРАВИЛА КВАЛИФИКАЦИИ:
Если пользователь:
- Спрашивает конкретные цены → это тёплый лид
- Говорит "хочу подключить", "сколько стоит для моего бизнеса", "можно демо" → горячий лид
- Упоминает свой бизнес (ресторан, кафе, магазин) → тёплый лид
- Сравнивает с конкурентами → тёплый лид
- Жалуется на текущее решение → горячий лид

Когда определишь горячего лида, вежливо предложи:
"Отлично! Чтобы подобрать оптимальное решение для вашего бизнеса, давайте организуем короткий звонок с нашим менеджером. Как вас зовут и по какому номеру с вами связаться?"

ФОРМАТ ОТВЕТА:
Отвечай в формате JSON:
{
  "response": "твой ответ пользователю",
  "intent": "info|pricing|demo|support|hot_lead|unknown",
  "leadScore": 0-100,
  "requestContact": true/false
}

leadScore:
- 0-30: просто интересуется
- 31-60: тёплый лид
- 61-100: горячий лид

requestContact = true, если leadScore > 60 или пользователь явно просит связаться.
`

export default async function handler(req: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    return new Response(JSON.stringify({ error: 'AI not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { message, conversationHistory = [], source = 'website' } = body

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Формируем историю для OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Последние 10 сообщений
      { role: 'user', content: message }
    ]

    // Запрос к OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json()
      console.error('OpenAI error:', error)
      throw new Error('AI request failed')
    }

    const aiData = await openaiResponse.json()
    const aiContent = aiData.choices[0]?.message?.content || ''

    // Парсим JSON ответ от AI
    let parsedResponse
    try {
      // Ищем JSON в ответе
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        // Если AI не вернул JSON, используем текст как есть
        parsedResponse = {
          response: aiContent,
          intent: 'info',
          leadScore: 20,
          requestContact: false
        }
      }
    } catch {
      parsedResponse = {
        response: aiContent,
        intent: 'info',
        leadScore: 20,
        requestContact: false
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: parsedResponse.response,
      intent: parsedResponse.intent,
      leadScore: parsedResponse.leadScore,
      requestContact: parsedResponse.requestContact,
      source
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Chatbot error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal error',
      message: 'Извините, произошла ошибка. Попробуйте позже или свяжитесь с нами: +998 78 113 98 13'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

