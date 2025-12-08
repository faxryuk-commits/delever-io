export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1',
}

import type { MenuMetrics } from './metrics'
import type { ParsedMenu } from './parse'

type AnalyzeRequest = {
  parsed: ParsedMenu
  metrics: MenuMetrics
  email?: string
  language?: 'ru' | 'uz' | 'en'
}

type GoalItem = {
  action: string
  why: string
  how: string
  result: string
}

type AnalysisResult = {
  score: number
  summary: string
  issues: string[]
  goalSales: {
    title: string
    items: GoalItem[]
  }
  goalCheck: {
    title: string
    items: GoalItem[]
  }
  quickWins: {
    title: string
    items: string[]
  }
}

// Бенчмарки по типам заведений
const BENCHMARKS = {
  fastfood: { comboPercent: 35, avgCategories: 8, minItems: 50 },
  pizzeria: { comboPercent: 25, avgCategories: 6, minItems: 30 },
  coffee: { comboPercent: 15, avgCategories: 5, minItems: 25 },
  sushi: { comboPercent: 20, avgCategories: 7, minItems: 40 },
  restaurant: { comboPercent: 10, avgCategories: 10, minItems: 60 },
  other: { comboPercent: 15, avgCategories: 5, minItems: 20 },
}

// Расчёт скора на основе метрик
function calculateScore(metrics: MenuMetrics): number {
  let score = 50 // Базовый скор
  
  const benchmark = BENCHMARKS[metrics.venueType as keyof typeof BENCHMARKS] || BENCHMARKS.other
  
  // +/- за количество позиций
  if (metrics.totalItems >= benchmark.minItems) score += 10
  else score -= 10
  
  // +/- за комбо
  if (metrics.comboPercentage >= benchmark.comboPercent) score += 15
  else if (metrics.comboPercentage > 0) score += 5
  else score -= 10
  
  // +/- за категории
  if (metrics.categories >= benchmark.avgCategories) score += 10
  else if (metrics.categories >= 3) score += 5
  
  // +/- за наличие цен
  const pricePercent = metrics.totalItems > 0 
    ? (metrics.itemsWithPrice / metrics.totalItems) * 100 
    : 0
  if (pricePercent >= 90) score += 10
  else if (pricePercent >= 50) score += 5
  else score -= 10
  
  // Ограничиваем 0-100
  return Math.max(0, Math.min(100, score))
}

// Генерация промпта для AI
function buildPrompt(metrics: MenuMetrics, parsed: ParsedMenu, language: string): string {
  const benchmark = BENCHMARKS[metrics.venueType as keyof typeof BENCHMARKS] || BENCHMARKS.other
  
  // Топ-10 позиций для примеров
  const sampleItems = parsed.items.slice(0, 10).map(i => 
    `${i.name}: ${i.price || 'цена не указана'}`
  ).join('\n')
  
  return `Ты — эксперт по ресторанному бизнесу. Дай рекомендации на основе РЕАЛЬНЫХ данных.

ДАННЫЕ МЕНЮ:
- Тип заведения: ${metrics.venueType}
- Всего позиций: ${metrics.totalItems}
- Категорий: ${metrics.categories}
- Средняя цена: ${metrics.avgPrice || 'Н/Д'}
- Диапазон цен: ${metrics.priceRange}
- Комбо-наборов: ${metrics.comboCount} (${metrics.comboPercentage}%)
- Бенчмарк по комбо для ${metrics.venueType}: ${benchmark.comboPercent}%

ТОП КАТЕГОРИЙ:
${metrics.categoryBreakdown.slice(0, 5).map(c => `- ${c.name}: ${c.count} позиций, средняя ${c.avgPrice || 'Н/Д'}`).join('\n')}

ПРИМЕРЫ ПОЗИЦИЙ:
${sampleItems}

Язык ответа: ${language === 'uz' ? "o'zbek" : language === 'en' ? 'English' : 'русский'}

ЗАДАЧА: Дай 2-3 конкретных рекомендации для каждой цели, используя РЕАЛЬНЫЕ названия блюд и цены из данных выше.

JSON ФОРМАТ:
{
  "summary": "Краткий вывод о меню (2 предложения)",
  "issues": ["Проблема 1 с конкретным примером", "Проблема 2"],
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
    "items": ["Действие 1", "Действие 2"]
  }
}

ТОЛЬКО JSON без markdown.`
}

export default async function handler(request: Request) {
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
    const { parsed, metrics, email, language = 'ru' }: AnalyzeRequest = await request.json()
    
    if (!parsed || !metrics) {
      return new Response(JSON.stringify({ error: 'Parsed data and metrics are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Отправляем лид в Telegram (async)
    if (email) {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_CHAT_ID
      if (telegramToken && chatId) {
        const message = `🍽 Menu Doctor Lead\n\n📧 ${email}\n🔗 ${parsed.url}\n📊 ${metrics.totalItems} позиций\n💰 Средняя: ${metrics.avgPrice}`
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        }).catch(() => {})
      }
    }

    // Рассчитываем скор
    const score = calculateScore(metrics)
    
    console.log('Analyze: Score:', score, 'Venue:', metrics.venueType)
    
    // Генерируем промпт
    const prompt = buildPrompt(metrics, parsed, language)
    
    // Вызываем AI
    const openrouterKey = process.env.OPENROUTER_API_KEY
    
    if (!openrouterKey) {
      // Fallback без AI
      const fallback: AnalysisResult = {
        score,
        summary: `Меню содержит ${metrics.totalItems} позиций в ${metrics.categories} категориях. ${metrics.comboCount > 0 ? `Есть ${metrics.comboCount} комбо-наборов.` : 'Комбо-наборы отсутствуют.'}`,
        issues: metrics.comboCount === 0 ? ['Отсутствуют комбо-наборы для увеличения среднего чека'] : [],
        goalSales: {
          title: '📈 Для роста продаж',
          items: [{
            action: 'Добавить акции на популярные позиции',
            why: 'Акции привлекают новых клиентов',
            how: 'Выбрать топ-3 позиции и сделать скидку 10-15%',
            result: '+10-15% к продажам'
          }]
        },
        goalCheck: {
          title: '💰 Для увеличения чека',
          items: [{
            action: metrics.comboCount === 0 ? 'Добавить комбо-наборы' : 'Расширить линейку комбо',
            why: '67% клиентов выбирают комбо если они есть',
            how: 'Объединить популярное блюдо + напиток со скидкой 10%',
            result: '+15-20% к чеку'
          }]
        },
        quickWins: {
          title: '⚡ Быстрые победы',
          items: [
            'Добавить описания к блюдам без них',
            'Выделить хиты продаж в меню'
          ]
        }
      }
      
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    // Вызов OpenRouter
    const modelsToTry = [
      'google/gemma-2-9b-it:free',
      'mistralai/mistral-7b-instruct:free',
      'meta-llama/llama-3.2-3b-instruct:free',
    ]
    
    for (const model of modelsToTry) {
      console.log(`Analyze: Trying ${model}...`)
      
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 15000)
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterKey}`,
            'HTTP-Referer': 'https://delever.uz',
            'X-Title': 'Menu Doctor',
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        })
        
        clearTimeout(timeout)
        
        if (response.ok) {
          const data = await response.json()
          const content = data.choices?.[0]?.message?.content
          
          if (content) {
            try {
              // Извлекаем JSON
              let jsonStr = content.trim()
              const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)\s*```/) ||
                                jsonStr.match(/```\s*([\s\S]*?)\s*```/)
              if (jsonMatch) jsonStr = jsonMatch[1].trim()
              
              if (!jsonStr.startsWith('{')) {
                const objectMatch = jsonStr.match(/\{[\s\S]*\}/)
                if (objectMatch) jsonStr = objectMatch[0]
              }
              
              const result = JSON.parse(jsonStr)
              
              // Добавляем рассчитанный скор
              result.score = score
              
              // Добавляем метрики
              result.metrics = {
                totalItems: metrics.totalItems,
                categories: metrics.categories,
                avgPrice: metrics.avgPrice,
                priceRange: metrics.priceRange,
                hasCombo: metrics.hasCombo,
                comboCount: metrics.comboCount,
              }
              
              console.log(`Analyze: ✅ Success with ${model}`)
              
              return new Response(JSON.stringify(result), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              })
              
            } catch (parseErr) {
              console.log(`Analyze: Failed to parse ${model} response`)
              continue
            }
          }
        }
      } catch (err) {
        console.log(`Analyze: ${model} error`)
        continue
      }
    }
    
    // Если все модели не сработали - возвращаем fallback
    console.log('Analyze: All models failed, using fallback')
    
    const fallback: AnalysisResult = {
      score,
      summary: `Меню содержит ${metrics.totalItems} позиций. Средняя цена: ${metrics.avgPrice || 'Н/Д'}.`,
      issues: [],
      goalSales: {
        title: '📈 Для роста продаж',
        items: [{
          action: 'Добавить сезонные предложения',
          why: 'Сезонность увеличивает интерес',
          how: 'Создать 2-3 лимитированных блюда',
          result: '+10% к продажам'
        }]
      },
      goalCheck: {
        title: '💰 Для увеличения чека',
        items: [{
          action: 'Внедрить апсейл при заказе',
          why: 'Предложение доп. позиций увеличивает чек',
          how: 'К каждому основному блюду предлагать напиток/десерт',
          result: '+15% к чеку'
        }]
      },
      quickWins: {
        title: '⚡ Быстрые победы',
        items: ['Добавить фото к позициям', 'Выделить популярные блюда']
      }
    }
    
    // Добавляем метрики
    ;(fallback as any).metrics = {
      totalItems: metrics.totalItems,
      categories: metrics.categories,
      avgPrice: metrics.avgPrice,
      priceRange: metrics.priceRange,
      hasCombo: metrics.hasCombo,
      comboCount: metrics.comboCount,
    }
    
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Analyze error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze menu',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}
