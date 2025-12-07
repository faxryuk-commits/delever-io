export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1',
}

type MenuStructureItem = {
  category: string
  subcategory?: string
  items: {
    name: string
    description?: string
    price?: string
  }[]
}

type MenuDoctorReport = {
  score: number
  summary: string
  issues: string[]
  recommendations: string[]
  upsellIdeas: string[]
  menuStructure?: MenuStructureItem[]
}

type MenuDoctorRequest = {
  menuUrl: string
  averageBill?: string
  location?: string
  venueType?: string
  language?: 'ru' | 'uz' | 'en'
}

// Проверка на внутренние/локальные URL
function isInternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()
    
    // Локальные адреса
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return true
    }
    
    // Приватные диапазоны IP
    const ipParts = hostname.split('.')
    if (ipParts.length === 4) {
      const first = parseInt(ipParts[0])
      const second = parseInt(ipParts[1])
      
      // 10.x.x.x
      if (first === 10) return true
      // 192.168.x.x
      if (first === 192 && second === 168) return true
      // 172.16.x.x - 172.31.x.x
      if (first === 172 && second >= 16 && second <= 31) return true
    }
    
    return false
  } catch {
    return true
  }
}

// Формирование промпта для AI
function buildPrompt(
  html: string, 
  data: MenuDoctorRequest, 
  truncated: boolean
): string {
  const langMap = {
    ru: 'русский',
    uz: "o'zbek tili",
    en: 'English'
  }
  const reportLang = langMap[data.language || 'ru']
  
  return `Ты — эксперт по ресторанному меню и консультант по увеличению среднего чека.

У тебя есть HTML-код страницы меню ресторана по ссылке: ${data.menuUrl}
${truncated ? '\n⚠️ HTML был сокращён из-за большого размера.\n' : ''}

Дополнительная информация:
- Тип заведения: ${data.venueType || 'не указан'}
- Средний чек: ${data.averageBill || 'не указан'}
- Город / страна: ${data.location || 'не указаны'}

Меню на странице может быть на любом языке (английский, русский, узбекский, турецкий и т.д.).
Язык, на котором нужно вернуть ответ: ${reportLang}

Задача:
1. Выдели реальные позиции меню (названия, цены, описания) из HTML
2. Сгруппируй блюда по категориям и подкатегориям, если возможно
3. Оцени структуру по шкале 0–100: понятность, логичность, возможности для апсейла
4. Выдели проблемы, рекомендации, идеи для увеличения среднего чека

Верни строго JSON в формате:
{
  "score": number (0-100),
  "summary": "краткий вывод о меню",
  "issues": ["проблема 1", "проблема 2", ...],
  "recommendations": ["рекомендация 1", "рекомендация 2", ...],
  "upsellIdeas": ["идея 1", "идея 2", ...],
  "menuStructure": [
    {
      "category": "название категории",
      "subcategory": "подкатегория (опционально)",
      "items": [
        { "name": "название блюда", "description": "описание (опционально)", "price": "цена (опционально)" }
      ]
    }
  ]
}

Никаких комментариев, только валидный JSON.

HTML страницы:
${html}`
}

// Вызов AI модели (с fallback на несколько провайдеров)
async function callAiModel(prompt: string): Promise<MenuDoctorReport> {
  const openaiKey = process.env.OPENAI_API_KEY
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  
  // Попытка OpenAI
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: 'json_object' },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const content = data.choices?.[0]?.message?.content
        if (content) {
          const result = JSON.parse(content)
          console.log('Menu Doctor: ✅ Generated using OpenAI')
          return result
        }
      } else {
        const errText = await response.text()
        console.log('Menu Doctor: OpenAI failed:', response.status, errText)
      }
    } catch (error) {
      console.error('Menu Doctor: OpenAI error:', error)
    }
  }

  // Попытка Gemini
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4000,
              responseMimeType: 'application/json',
            },
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (content) {
          const result = JSON.parse(content)
          console.log('Menu Doctor: ✅ Generated using Gemini')
          return result
        }
      } else {
        const errText = await response.text()
        console.log('Menu Doctor: Gemini failed:', response.status, errText)
      }
    } catch (error) {
      console.error('Menu Doctor: Gemini error:', error)
    }
  }

  // Попытка Anthropic Claude
  if (anthropicKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 4000,
          messages: [
            { role: 'user', content: `${prompt}\n\nОтвет дай ТОЛЬКО в формате JSON, без markdown.` }
          ],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const content = data.content?.[0]?.text
        if (content) {
          let jsonStr = content
          const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                            content.match(/```\s*([\s\S]*?)\s*```/)
          if (jsonMatch) {
            jsonStr = jsonMatch[1]
          }
          const result = JSON.parse(jsonStr)
          console.log('Menu Doctor: ✅ Generated using Claude')
          return result
        }
      } else {
        const errText = await response.text()
        console.log('Menu Doctor: Claude failed:', response.status, errText)
      }
    } catch (error) {
      console.error('Menu Doctor: Claude error:', error)
    }
  }

  // Fallback мок-ответ
  console.log('Menu Doctor: Using fallback mock response')
  return getFallbackReport()
}

// Проверка наличия контента меню в HTML
function detectMenuContent(html: string): { hasMenu: boolean; reason?: string } {
  const lowerHtml = html.toLowerCase()
  
  // Признаки SPA/динамической загрузки
  const spaIndicators = [
    'window.__NUXT__',
    'window.__NEXT_DATA__',
    '__PRELOADED_STATE__',
    'root"></div><script',
    'id="app"></div>',
    'id="root"></div>',
  ]
  
  const isSPA = spaIndicators.some(ind => html.includes(ind))
  
  // Признаки меню
  const menuIndicators = [
    'price', 'цена', 'narx', 'сум', 'sum', 'uzs',
    'menu', 'меню', 'menyu',
    'блюдо', 'taom', 'dish',
    'добавить в корзину', 'add to cart', 'savatga'
  ]
  
  const hasMenuIndicators = menuIndicators.some(ind => lowerHtml.includes(ind))
  
  // Считаем числа (потенциальные цены)
  const pricePattern = /\d{1,3}[\s,.]?\d{3}/g
  const potentialPrices = html.match(pricePattern) || []
  
  if (isSPA && potentialPrices.length < 5) {
    return { 
      hasMenu: false, 
      reason: 'Этот сайт загружает меню динамически (JavaScript). Попробуйте страницу с текстовым меню или PDF.'
    }
  }
  
  if (!hasMenuIndicators && potentialPrices.length < 3) {
    return { 
      hasMenu: false, 
      reason: 'На странице не найдено меню с ценами. Убедитесь, что ссылка ведёт на страницу с меню.'
    }
  }
  
  return { hasMenu: true }
}

// Fallback ответ когда AI недоступен
function getFallbackReport(reason?: string): MenuDoctorReport {
  if (reason) {
    return {
      score: 0,
      summary: reason,
      issues: [
        'Не удалось извлечь меню со страницы',
        'Сайт использует динамическую загрузку контента',
        'Для анализа нужна страница с текстовым меню'
      ],
      recommendations: [
        'Попробуйте ссылку на страницу с HTML-меню (не SPA)',
        'Используйте прямую ссылку на меню ресторана',
        'Свяжитесь с нами для ручного анализа меню'
      ],
      upsellIdeas: [],
      menuStructure: []
    }
  }
  
  return {
    score: 65,
    summary: 'AI-анализ временно недоступен. Базовые рекомендации сформированы на основе лучших практик.',
    issues: [
      'Не удалось выполнить глубокий AI-анализ',
      'Сервис временно перегружен'
    ],
    recommendations: [
      'Добавьте описания к блюдам для лучшего понимания',
      'Разделите меню на чёткие категории',
      'Выделите хиты и популярные позиции',
      'Добавьте комбо-предложения для увеличения среднего чека'
    ],
    upsellIdeas: [
      'Создайте комбо-меню с напитком и десертом',
      'Предлагайте апсейл на большие порции',
      'Добавьте блок "С этим блюдом заказывают"'
    ],
    menuStructure: []
  }
}

export default async function handler(request: Request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body: MenuDoctorRequest = await request.json()
    const { menuUrl, averageBill, location, venueType, language } = body

    // Валидация URL
    if (!menuUrl) {
      return new Response(JSON.stringify({ error: 'menuUrl is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Проверка протокола
    let urlObj: URL
    try {
      urlObj = new URL(menuUrl)
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return new Response(JSON.stringify({ error: 'Only http/https URLs are allowed' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Проверка на внутренние URL
    if (isInternalUrl(menuUrl)) {
      return new Response(JSON.stringify({ error: 'This URL is not allowed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('Menu Doctor: Fetching URL:', menuUrl)

    // Получение HTML с таймаутом
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    let html: string
    try {
      const response = await fetch(menuUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uz;q=0.6',
        },
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        return new Response(JSON.stringify({ error: `Failed to fetch menu page: ${response.status}` }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      html = await response.text()
    } catch (error) {
      clearTimeout(timeoutId)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('Menu Doctor: Fetch error:', errorMsg)
      return new Response(JSON.stringify({ error: 'Failed to fetch menu page: timeout or network error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Ограничение длины HTML
    const MAX_HTML_LENGTH = 100000 // 100KB для промпта
    let truncated = false
    if (html.length > MAX_HTML_LENGTH) {
      html = html.slice(0, MAX_HTML_LENGTH)
      truncated = true
      console.log('Menu Doctor: HTML truncated to', MAX_HTML_LENGTH, 'chars')
    }

    console.log('Menu Doctor: HTML length:', html.length, 'truncated:', truncated)

    // Проверка наличия контента меню
    const menuCheck = detectMenuContent(html)
    if (!menuCheck.hasMenu) {
      console.log('Menu Doctor: No menu content detected:', menuCheck.reason)
      return new Response(JSON.stringify(getFallbackReport(menuCheck.reason)), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Формирование промпта
    const prompt = buildPrompt(html, { menuUrl, averageBill, location, venueType, language }, truncated)

    // Вызов AI
    const report = await callAiModel(prompt)

    return new Response(JSON.stringify(report), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Menu Doctor: Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}
