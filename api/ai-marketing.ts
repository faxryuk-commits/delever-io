// AI Marketing Posts Generator API
// Uses OpenAI to generate marketing content for restaurants

export const config = {
  runtime: 'edge',
}

interface MarketingRequest {
  brandName: string
  cuisine: string
  promoDescription: string
  goal: string
  channels: string[] // "instagram" | "telegram" | "stories"
  language: 'ru' | 'uz' | 'en'
}

interface MarketingResponse {
  instagram_posts: string[]
  telegram_posts: string[]
  stories_ideas: string[]
  hashtags: string[]
}

const SYSTEM_PROMPT = `Ты — опытный маркетолог для ресторанов и кафе. Ты создаёшь вовлекающие, продающие тексты для социальных сетей.

Правила:
- Пиши живо, с эмоциями, используй эмодзи уместно
- Для Instagram: короткие, цепляющие тексты с призывом к действию
- Для Telegram: можно чуть подробнее, информативнее
- Для Stories: краткие тезисы, идеи для визуала
- Хэштеги должны быть релевантными и популярными
- Пиши строго на языке, указанном в параметре language

Верни ТОЛЬКО валидный JSON без markdown, без комментариев, без пояснений.`

function getUserPrompt(data: MarketingRequest): string {
  const langName = data.language === 'ru' ? 'русском' : data.language === 'uz' ? 'узбекском' : 'английском'
  
  return `Сгенерируй маркетинговые тексты для ресторана.

Данные:
- Название: ${data.brandName}
- Тип кухни: ${data.cuisine}
- Описание акции/блюда: ${data.promoDescription}
- Цель продвижения: ${data.goal}
- Каналы: ${data.channels.join(', ')}
- Язык текстов: ${langName}

Верни JSON в формате:
{
  "instagram_posts": ["пост 1", "пост 2", "пост 3"],
  "telegram_posts": ["пост 1", "пост 2", "пост 3"],
  "stories_ideas": ["идея 1", "идея 2", "идея 3"],
  "hashtags": ["#хэштег1", "#хэштег2", "...до 15 хэштегов"]
}

Если канал не выбран, всё равно сгенерируй для него контент.
Пиши на ${langName} языке. Только JSON, ничего больше.`
}

export default async function handler(request: Request) {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body: MarketingRequest = await request.json()

    // Validate required fields
    if (!body.brandName || !body.promoDescription) {
      return new Response(JSON.stringify({ error: 'brandName and promoDescription are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: getUserPrompt(body) },
        ],
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return new Response(JSON.stringify({ error: 'OpenAI API error', details: errorData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return new Response(JSON.stringify({ error: 'Empty response from OpenAI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Parse JSON response
    let result: MarketingResponse
    try {
      result = JSON.parse(content)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      return new Response(JSON.stringify({ error: 'Failed to parse model response', raw: content }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate response structure
    if (!result.instagram_posts || !result.telegram_posts || !result.stories_ideas || !result.hashtags) {
      return new Response(JSON.stringify({ 
        error: 'Invalid response structure', 
        result 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('AI Marketing API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

