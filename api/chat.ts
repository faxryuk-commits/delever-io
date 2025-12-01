export const config = {
  runtime: 'edge',
  regions: ['iad1'], // Washington D.C. - поддерживается OpenAI
}

const SYSTEM_PROMPT = `Ты — AI-помощник компании Delever. Delever — это операционная система для доставки любых товаров.

## О компании Delever:
- Единая платформа для управления доставкой
- Более 1000+ бизнесов в 5 странах
- 13M+ обработанных заказов
- $100M+ продаж через платформу

## Сегменты клиентов:
- Рестораны и кафе
- Продуктовые магазины
- Аптеки
- Цветочные магазины
- Магазины одежды
- Производители молочных продуктов
- Доставка воды
- Сети и франшизы
- Любой бизнес с доставкой

## Продукты Delever:

### Каналы продаж:
- Мобильное приложение (White Label) — 13,000,000 soʼm единоразово
- Telegram-бот для заказов
- Веб-сайт для онлайн-заказов
- QR-меню для ресторанов

### Операции:
- Диспетчеризация заказов
- Курьерский модуль с отслеживанием
- Интеграция с POS-системами (iiko, R-Keeper, Jowi, Poster, Paloma, Syrve и др.)
- KDS (Kitchen Display System)

### Интеграции:
- Агрегаторы: Uzum Tezkor, Glovo, Яндекс Еда, Wolt, Chocofood, Foody
- Платёжные системы: Payme, Click, Uzum Bank, Kaspi
- Курьерские службы: Яндекс Доставка, Wolt Drive, Noor

### Аналитика и маркетинг:
- RFM-анализ клиентов
- ABC-XYZ анализ меню
- Push-уведомления и SMS-рассылки
- Программа лояльности

## Тарифы:
- Start: 1,300,000 soʼm/месяц (до 1000 заказов)
- Medium: 3,250,000 soʼm/месяц (до 3000 заказов) — популярный
- Big: 6,500,000 soʼm/месяц (до 6000 заказов)
- Enterprise: 13,000,000 soʼm/месяц (до 10000 заказов)
- Депозит: 6,500,000 soʼm
- Скидки: 10% за 6 месяцев, 15% за 12 месяцев

## Контакты:
- Телефон: +998 78 113 98 13
- Email: support@delever.uz
- Telegram: @deleverme
- Адрес: Ташкент, Проспект Амира Темура 129Б, БЦ Анор Плаза

## Твои задачи:
1. Отвечай на вопросы о продуктах и услугах Delever
2. Помогай выбрать подходящий тариф
3. Объясняй преимущества собственной доставки vs агрегаторов
4. Предлагай записаться на демо или консультацию
5. При сложных вопросах предлагай связаться с менеджером

## Правила:
- Отвечай кратко и по делу (2-4 предложения)
- Будь дружелюбным и профессиональным
- Используй эмодзи умеренно
- Если не знаешь ответ — предложи связаться с менеджером
- Периодически предлагай записаться на демо
- Отвечай на русском языке`

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req: Request): Promise<Response> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  
  // Debug: проверяем наличие ключа
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set')
    return new Response(JSON.stringify({ 
      error: 'API key not configured',
      debug: 'OPENAI_API_KEY environment variable is missing'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  // Debug: проверяем формат ключа
  if (!apiKey.startsWith('sk-')) {
    console.error('OPENAI_API_KEY has invalid format')
    return new Response(JSON.stringify({ 
      error: 'Invalid API key format',
      debug: 'API key should start with sk-'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  try {
    const body = await req.json()
    const { messages } = body as { messages: Message[] }

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Добавляем системный промпт
    const fullMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10), // Ограничиваем историю последними 10 сообщениями
    ]

    console.log('Sending request to OpenAI...')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    console.log('OpenAI response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      
      // Парсим ошибку для более понятного сообщения
      let errorMessage = 'Ошибка API'
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error?.message || errorText
      } catch {
        errorMessage = errorText
      }
      
      return new Response(JSON.stringify({ 
        error: 'OpenAI API error',
        details: errorMessage,
        status: response.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content

    if (!assistantMessage) {
      console.error('No message in response:', data)
      return new Response(JSON.stringify({ 
        error: 'Empty response from AI',
        debug: 'No choices in response'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    console.log('Success! Message length:', assistantMessage.length)

    return new Response(JSON.stringify({ 
      message: assistantMessage,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}
