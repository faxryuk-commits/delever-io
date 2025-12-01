export const config = {
  runtime: 'edge',
}

const SYSTEM_PROMPT = `Ты — AI-помощник компании Delever. Delever — это операционная система для доставки еды.

## О компании Delever:
- Единая платформа для управления доставкой
- Более 1000+ ресторанов в 5 странах
- 13M+ обработанных заказов
- $100M+ продаж через платформу

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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { messages } = body as { messages: Message[] }

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Добавляем системный промпт
    const fullMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10), // Ограничиваем историю последними 10 сообщениями
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'Извините, не могу ответить. Свяжитесь с менеджером: @deleverme'

    return new Response(JSON.stringify({ 
      message: assistantMessage,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

