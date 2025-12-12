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
  email?: string
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
  content: string, 
  data: MenuDoctorRequest, 
  truncated: boolean,
  isRenderedText: boolean = false
): string {
  const langMap = {
    ru: 'русский',
    uz: "o'zbek tili",
    en: 'English'
  }
  const reportLang = langMap[data.language || 'ru']
  
  return `Ты — эксперт по ресторанному меню. Анализируй ТОЛЬКО то, что видишь в контенте (${isRenderedText ? 'текст' : 'HTML'}).

URL: ${data.menuUrl}
${truncated ? '⚠️ ВАЖНО: Показана только ЧАСТЬ меню. Укажи это в summary.\n' : ''}
Язык: ${reportLang}

СТРОГИЕ ПРАВИЛА:
1. СЧИТАЙ только блюда которые РЕАЛЬНО видишь в контенте
2. НЕ ВЫДУМЫВАЙ блюда, цены или категории
3. Если видишь мало данных — честно скажи об этом
4. Рекомендации давай ТОЛЬКО по тем блюдам что видишь
5. Определи тип заведения (фастфуд/ресторан/кофейня) по меню

ЗАДАЧА:
1. Подсчитай ВСЕ блюда и цены что видишь
2. Найди категории (Бургеры, Напитки, Комбо и т.д.)
3. Вычисли реальный ценовой диапазон
4. Дай рекомендации на основе ВИДИМЫХ данных

JSON ФОРМАТ:
{
  "score": 0-100,
  "metrics": {
    "totalItems": число_видимых_позиций,
    "categories": число_категорий,
    "priceRange": "мин - макс из видимых",
    "avgPrice": "средняя из видимых",
    "hasCombo": true/false,
    "comboCount": число_комбо
  },
  "summary": "Краткий вывод. Если данные неполные — указать это.",
  "issues": ["🔴 Реальная проблема с конкретным блюдом из контента"],
  "goalSales": {
    "title": "📈 Для роста продаж",
    "items": [{"action": "Действие с реальным блюдом", "why": "Причина", "how": "Как сделать", "result": "+X%"}]
  },
  "goalCheck": {
    "title": "💰 Для увеличения чека", 
    "items": [{"action": "Действие", "why": "Причина", "how": "Механика", "result": "+X%"}]
  },
  "quickWins": {
    "title": "⚡ Быстрые победы",
    "items": ["Конкретное действие 1", "Действие 2"]
  }
}

ТОЛЬКО JSON. НЕ выдумывай данных.

Контент:
${content}`
}

// Вызов AI модели (с fallback на несколько провайдеров)
async function callAiModel(prompt: string): Promise<MenuDoctorReport> {
  const openaiKey = process.env.OPENAI_API_KEY
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openrouterKey = process.env.OPENROUTER_API_KEY
  
  console.log('Menu Doctor: Available AI providers:', {
    openai: !!openaiKey,
    gemini: !!geminiKey,
    anthropic: !!anthropicKey,
    openrouter: !!openrouterKey
  })
  
  // Сначала пробуем OpenRouter с разными моделями
  if (openrouterKey) {
    // Модели OpenRouter - Mixtral первый (быстрее и надёжнее)
    const modelsToTry = [
      'google/gemma-2-9b-it:free',               // Gemma 2 - быстрая и бесплатная
      'mistralai/mistral-7b-instruct:free',      // Mistral 7B free
      'meta-llama/llama-3.2-3b-instruct:free',   // Llama 3.2 3B - очень быстрая
    ]
    
    for (const model of modelsToTry) {
      console.log(`Menu Doctor: Trying OpenRouter with ${model}...`)
      try {
        const openrouterController = new AbortController()
        const openrouterTimeout = setTimeout(() => openrouterController.abort(), 12000) // 12 сек на модель
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          signal: openrouterController.signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterKey}`,
            'HTTP-Referer': 'https://delever.io',
            'X-Title': 'Delever Menu Doctor',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'user', content: prompt + '\n\nВерни ответ СТРОГО в формате JSON без markdown.' }
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        })

        clearTimeout(openrouterTimeout)
        
        if (response.ok) {
          const data = await response.json()
          const content = data.choices?.[0]?.message?.content
          if (content) {
            try {
              let jsonStr = content.trim()
              
              // Пробуем разные способы извлечь JSON
              const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)\s*```/) || 
                                jsonStr.match(/```\s*([\s\S]*?)\s*```/)
              if (jsonMatch) {
                jsonStr = jsonMatch[1].trim()
              }
              
              // Если не нашли в блоке кода, ищем объект JSON
              if (!jsonStr.startsWith('{')) {
                const objectMatch = jsonStr.match(/\{[\s\S]*\}/)
                if (objectMatch) {
                  jsonStr = objectMatch[0]
                }
              }
              
              // Очищаем от возможных артефактов
              jsonStr = jsonStr.replace(/^[^{]*/, '').replace(/[^}]*$/, '')
              
              const result = JSON.parse(jsonStr)
              
              // Проверяем что результат имеет нужную структуру
              if (typeof result.score === 'number' && result.summary) {
                console.log(`Menu Doctor: ✅ Generated using OpenRouter (${model})`)
                return result
              } else {
                console.log(`Menu Doctor: ${model} returned invalid structure`)
                continue
              }
            } catch (parseErr) {
              console.log(`Menu Doctor: Failed to parse ${model}:`, content.slice(0, 100))
              continue
            }
          }
        } else {
          const errText = await response.text()
          console.log(`Menu Doctor: ${model} failed:`, response.status, errText.slice(0, 200))
          // Если модель не найдена или заблокирована - пробуем следующую
          continue
        }
      } catch (error) {
        console.log(`Menu Doctor: ${model} error:`, error instanceof Error ? error.message : 'Unknown')
        continue
      }
    }
    console.log('Menu Doctor: All OpenRouter models failed')
  }
  
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
    console.log('Menu Doctor: Trying Anthropic Claude...')
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
  } else {
    console.log('Menu Doctor: Anthropic API key not configured')
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
    const { menuUrl, email, language } = body

    // Логируем лид в Telegram (async, не ждём)
    if (email) {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_CHAT_ID
      if (telegramToken && chatId) {
        const message = `🍽 Menu Doctor Lead\n\n📧 ${email}\n🔗 ${menuUrl}\n🌐 ${language || 'ru'}`
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        }).catch(() => {}) // Игнорируем ошибки
      }
    }

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

    let html: string = ''
    let usedJina = false

    // Сначала пробуем Jina AI Reader (рендерит JavaScript)
    try {
      console.log('Menu Doctor: Trying Jina AI Reader for JS rendering...')
      const jinaUrl = `https://r.jina.ai/${menuUrl}`
      
      const jinaController = new AbortController()
      const jinaTimeout = setTimeout(() => jinaController.abort(), 4000) // 4 сек на Jina
      
      const jinaResponse = await fetch(jinaUrl, {
        method: 'GET',
        signal: jinaController.signal,
        headers: {
          'Accept': 'text/plain',
        },
      })
      clearTimeout(jinaTimeout)

      if (jinaResponse.ok) {
        html = await jinaResponse.text()
        usedJina = true
        console.log('Menu Doctor: ✅ Got rendered content via Jina AI Reader, length:', html.length)
      } else {
        console.log('Menu Doctor: Jina Reader failed:', jinaResponse.status)
      }
    } catch (jinaError) {
      clearTimeout(jinaTimeout) // Очищаем timeout при ошибке
      console.log('Menu Doctor: Jina Reader error, falling back to direct fetch')
    }

    // Fallback на прямой fetch
    if (!html) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

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
        console.log('Menu Doctor: Got HTML via direct fetch, length:', html.length)
      } catch (error) {
        clearTimeout(timeoutId)
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        console.error('Menu Doctor: Fetch error:', errorMsg)
        return new Response(JSON.stringify({ error: 'Failed to fetch menu page: timeout or network error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // Ограничение длины контента (меньше = быстрее ответ от AI)
    const MAX_CONTENT_LENGTH = 8000 // 8KB - баланс данных и скорости
    let truncated = false
    if (html.length > MAX_CONTENT_LENGTH) {
      html = html.slice(0, MAX_CONTENT_LENGTH)
      truncated = true
      console.log('Menu Doctor: Content truncated to', MAX_CONTENT_LENGTH, 'chars')
    }

    console.log('Menu Doctor: Content length:', html.length, 'truncated:', truncated, 'usedJina:', usedJina)

    // Проверка наличия контента меню (пропускаем SPA-проверку если использовали Jina)
    if (!usedJina) {
      const menuCheck = detectMenuContent(html)
      if (!menuCheck.hasMenu) {
        console.log('Menu Doctor: No menu content detected:', menuCheck.reason)
        return new Response(JSON.stringify(getFallbackReport(menuCheck.reason)), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // Формирование промпта
    const prompt = buildPrompt(html, { menuUrl, email, language }, truncated, usedJina)

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
