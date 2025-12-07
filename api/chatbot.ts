// Принудительно запускаем из США (для OpenAI)
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // Washington DC, USA
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

// Offline ответы когда OpenAI недоступен
function getOfflineResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('тариф') || lowerMessage.includes('цен') || lowerMessage.includes('стои')) {
    return `💰 Тарифы Delever:

• Start — от 1.3 млн сум/мес (до 1000 заказов)
• Medium — от 2.4 млн сум/мес (до 3000 заказов)
• Big — от 4.3 млн сум/мес (до 6000 заказов)
• Enterprise — от 6.5 млн сум/мес (10,000+ заказов)

Хотите узнать точную стоимость? Свяжитесь с нами: +998 78 113 98 13`
  }
  
  if (lowerMessage.includes('интеграц') || lowerMessage.includes('pos') || lowerMessage.includes('iiko')) {
    return `🔗 Delever интегрируется с:

• POS: iiko, R-Keeper, Poster, Jowi
• Агрегаторы: Wolt, Glovo, Uzum Tezkor
• Оплата: Payme, Click, Uzum

Для подробностей: +998 78 113 98 13`
  }
  
  if (lowerMessage.includes('привет') || lowerMessage.includes('здравств') || lowerMessage.includes('добр')) {
    return `Привет! 👋

Я могу рассказать о:
• Тарифах и ценах
• Интеграциях (iiko, R-Keeper, агрегаторы)
• Возможностях платформы

Что вас интересует?`
  }
  
  return `Спасибо за вопрос! 

Для подробной консультации свяжитесь с нами:
📞 +998 78 113 98 13
📧 support@delever.uz

Или напишите "тарифы", "интеграции" для быстрой информации.`
}

// Используем KNOWLEDGE_BASE чтобы TypeScript не ругался
void KNOWLEDGE_BASE

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
  
  // Диагностика — временно возвращаем info о ключе
  if (!openaiKey) {
    return new Response(JSON.stringify({ 
      error: 'OPENAI_API_KEY not found',
      debug: {
        hasKey: !!openaiKey,
        envKeys: Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('AMO')).join(', ')
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  
  console.log('Chatbot: Key found, prefix:', openaiKey.substring(0, 10))

  try {
    const body = await req.json()
    const { message, conversationHistory = [], source = 'website' } = body

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Простой промпт для AI
    const simplePrompt = `Ты — AI-ассистент компании Delever. Delever — это платформа автоматизации доставки для ресторанов и магазинов.

Отвечай кратко, дружелюбно, на русском языке. Информация о Delever:
- Тарифы: Start (1.3 млн сум/мес), Medium (2.4 млн), Big (4.3 млн), Enterprise (6.5 млн+)
- Интеграции: iiko, R-Keeper, Poster, Wolt, Glovo, Uzum Tezkor
- Возможности: сайт, приложение, Telegram-бот, курьерское приложение, CRM, аналитика
- 1000+ клиентов в 7 странах

Если не знаешь ответ — предложи связаться: +998 78 113 98 13`

    const chatMessages = [
      { role: 'system', content: simplePrompt },
      ...conversationHistory.slice(-6).map((m: {role: string, content: string}) => ({
        role: m.role,
        content: m.content
      })),
      { role: 'user', content: message }
    ]

    console.log('Chatbot: Calling OpenAI from USA region')
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 300,
      })
    })

    console.log('Chatbot: OpenAI status:', openaiResponse.status)

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI ERROR:', openaiResponse.status, errorText)
      
      // Проверяем, является ли это ошибкой блокировки региона
      let isRegionBlocked = false
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.error?.code === 'unsupported_country_region_territory' || 
            errorJson.error?.message?.includes('unsupported_country') ||
            errorJson.error?.message?.includes('region') ||
            errorJson.error?.message?.includes('territory')) {
          isRegionBlocked = true
        }
      } catch {
        // Если не удалось распарсить, проверяем текст напрямую
        if (errorText.includes('unsupported_country') || 
            errorText.includes('region') || 
            errorText.includes('territory')) {
          isRegionBlocked = true
        }
      }
      
      // Используем fallback ответ
      const fallbackMessage = getOfflineResponse(message)
      
      return new Response(JSON.stringify({
        success: true, // Возвращаем success: true, чтобы фронтенд показал сообщение
        message: fallbackMessage,
        fallback: true,
        intent: 'info',
        leadScore: 20,
        requestContact: false,
        source,
        ...(isRegionBlocked ? { 
          note: 'AI временно недоступен в вашем регионе, используется базовый ответ' 
        } : {
          debug: {
            status: openaiResponse.status,
            error: errorText.substring(0, 200)
          }
        })
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const aiData = await openaiResponse.json()
    const aiContent = aiData.choices?.[0]?.message?.content || ''
    
    console.log('Chatbot: AI response:', aiContent.substring(0, 100))

    // Определяем намерение по ключевым словам
    const lowerMsg = message.toLowerCase()
    let leadScore = 20
    let requestContact = false
    
    if (lowerMsg.includes('цен') || lowerMsg.includes('стои') || lowerMsg.includes('тариф')) {
      leadScore = 50
    }
    if (lowerMsg.includes('подключ') || lowerMsg.includes('демо') || lowerMsg.includes('хочу')) {
      leadScore = 70
      requestContact = true
    }
    if (lowerMsg.includes('мой ресторан') || lowerMsg.includes('мой магазин') || lowerMsg.includes('у меня')) {
      leadScore = 60
    }

    return new Response(JSON.stringify({
      success: true,
      message: aiContent,
      intent: 'info',
      leadScore,
      requestContact,
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

