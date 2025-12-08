export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1',
}

export type MenuItem = {
  name: string
  price: number | null
  priceRaw: string
  category: string
}

export type ParsedMenu = {
  items: MenuItem[]
  categories: string[]
  rawItemsCount: number
  url: string
  parsedAt: string
}

// Парсинг цены из строки
function parsePrice(priceStr: string): number | null {
  if (!priceStr) return null
  // Убираем всё кроме цифр и точки/запятой
  const cleaned = priceStr.replace(/[^\d.,]/g, '').replace(',', '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

// Извлечение блюд из текста (Jina Reader format)
function parseTextContent(text: string): MenuItem[] {
  const items: MenuItem[] = []
  const lines = text.split('\n').map(l => l.trim()).filter(l => l)
  
  let currentCategory = 'Без категории'
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Определяем категорию (обычно короткие строки без цен)
    if (line.length < 30 && !line.match(/\d{2,}/) && line.match(/^[A-ZА-ЯЁ]/)) {
      // Проверяем что это не блюдо (следующая строка не цена)
      const nextLine = lines[i + 1] || ''
      if (!nextLine.match(/^\d/) && !nextLine.match(/тг|сум|₽|\$/i)) {
        currentCategory = line
        continue
      }
    }
    
    // Ищем паттерн: название + цена
    // Формат 1: "Биг Мак 2500 тг" или "Биг Мак - 2500"
    const priceMatch = line.match(/^(.+?)\s*[-–—]?\s*(\d[\d\s,.]*)\s*(тг|тенге|сум|₽|руб|usd|\$)?$/i)
    if (priceMatch) {
      const name = priceMatch[1].trim()
      const priceRaw = priceMatch[2].replace(/\s/g, '') + (priceMatch[3] || '')
      if (name.length > 2 && name.length < 100) {
        items.push({
          name,
          price: parsePrice(priceRaw),
          priceRaw,
          category: currentCategory
        })
        continue
      }
    }
    
    // Формат 2: Цена на следующей строке
    // "Биг Мак"
    // "2500 тг"
    const nextLine = lines[i + 1] || ''
    if (nextLine.match(/^\d[\d\s,.]*\s*(тг|тенге|сум|₽|руб|usd|\$)?$/i)) {
      const name = line
      if (name.length > 2 && name.length < 100 && !name.match(/^\d/)) {
        items.push({
          name,
          price: parsePrice(nextLine),
          priceRaw: nextLine.trim(),
          category: currentCategory
        })
        i++ // Пропускаем строку с ценой
        continue
      }
    }
  }
  
  return items
}

// Извлечение блюд из HTML
function parseHtmlContent(html: string): MenuItem[] {
  const items: MenuItem[] = []
  
  // Паттерн 1: JSON-LD Schema.org
  const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)
  if (jsonLdMatch) {
    for (const match of jsonLdMatch) {
      try {
        const jsonStr = match.replace(/<\/?script[^>]*>/gi, '')
        const data = JSON.parse(jsonStr)
        
        // Menu items в Schema.org
        if (data['@type'] === 'Menu' && data.hasMenuSection) {
          for (const section of data.hasMenuSection) {
            const category = section.name || 'Без категории'
            for (const item of section.hasMenuItem || []) {
              items.push({
                name: item.name,
                price: item.offers?.price || null,
                priceRaw: item.offers?.price?.toString() || '',
                category
              })
            }
          }
        }
        
        // Product items
        if (data['@type'] === 'Product') {
          items.push({
            name: data.name,
            price: data.offers?.price || null,
            priceRaw: data.offers?.price?.toString() || '',
            category: data.category || 'Без категории'
          })
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
  }
  
  // Паттерн 2: Типичные CSS классы для меню
  const productPatterns = [
    // Delever pattern
    /<div[^>]*class="[^"]*product[^"]*"[^>]*>[\s\S]*?<[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<[\s\S]*?(\d[\d\s,.]+)\s*(тг|сум|₽)?/gi,
    // Generic patterns
    /<[^>]*class="[^"]*item-name[^"]*"[^>]*>([^<]+)<[\s\S]*?<[^>]*class="[^"]*price[^"]*"[^>]*>([^<]+)</gi,
    /<h[2-4][^>]*>([^<]+)<\/h[2-4]>[\s\S]*?<[^>]*class="[^"]*price[^"]*"[^>]*>([^<]+)</gi,
  ]
  
  for (const pattern of productPatterns) {
    let match
    while ((match = pattern.exec(html)) !== null) {
      const name = match[1].trim().replace(/<[^>]+>/g, '')
      const priceRaw = match[2].trim()
      if (name.length > 2 && name.length < 100) {
        items.push({
          name,
          price: parsePrice(priceRaw),
          priceRaw,
          category: 'Без категории'
        })
      }
    }
  }
  
  // Если ничего не нашли - извлекаем текст и парсим его
  if (items.length === 0) {
    const textContent = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
    
    return parseTextContent(textContent)
  }
  
  return items
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
    const { url } = await request.json()
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('Parse: Fetching URL:', url)
    
    let content = ''
    let isText = false
    
    // Сначала пробуем Jina AI Reader (рендерит JS)
    try {
      const jinaController = new AbortController()
      const jinaTimeout = setTimeout(() => jinaController.abort(), 5000)
      
      const jinaResponse = await fetch(`https://r.jina.ai/${url}`, {
        method: 'GET',
        signal: jinaController.signal,
        headers: { 'Accept': 'text/plain' },
      })
      
      clearTimeout(jinaTimeout)
      
      if (jinaResponse.ok) {
        content = await jinaResponse.text()
        isText = true
        console.log('Parse: Got content via Jina, length:', content.length)
      }
    } catch (e) {
      console.log('Parse: Jina failed, trying direct fetch')
    }
    
    // Fallback на прямой fetch
    if (!content) {
      const fetchController = new AbortController()
      const fetchTimeout = setTimeout(() => fetchController.abort(), 8000)
      
      const response = await fetch(url, {
        signal: fetchController.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MenuDoctor/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
      })
      
      clearTimeout(fetchTimeout)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      content = await response.text()
      isText = false
      console.log('Parse: Got HTML via direct fetch, length:', content.length)
    }
    
    // Парсим контент
    const items = isText ? parseTextContent(content) : parseHtmlContent(content)
    
    // Извлекаем уникальные категории
    const categories = [...new Set(items.map(i => i.category))].filter(c => c !== 'Без категории')
    
    console.log('Parse: Found items:', items.length, 'categories:', categories.length)
    
    const result: ParsedMenu = {
      items,
      categories,
      rawItemsCount: items.length,
      url,
      parsedAt: new Date().toISOString(),
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Parse error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to parse menu',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}
