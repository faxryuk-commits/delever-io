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
  
  // Валюты: тенге ₸, рубли ₽, сумы, доллары
  const currencyPattern = /(\d[\d\s,.]*)\s*(₸|тг|тенге|сум|so'm|₽|руб|rub|usd|\$|€)/i
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Пропускаем служебные строки
    if (line.match(/^(Title:|URL:|Markdown|Source|---|^\*\*\*)/i)) continue
    if (line.length < 3) continue
    
    // Определяем категорию (заголовки секций)
    // "## Бургеры" или "БУРГЕРЫ" или "### Напитки"
    const categoryMatch = line.match(/^#{1,3}\s*(.+)$/) || 
                          (line.length < 35 && line === line.toUpperCase() && !line.match(/\d/) ? [null, line] : null)
    if (categoryMatch && categoryMatch[1]) {
      currentCategory = categoryMatch[1].replace(/[#*]/g, '').trim()
      continue
    }
    
    // Формат 1: "Биг Мак® 2 050 ₸" или "Биг Мак - 2500 тг"
    const priceMatch = line.match(/^(.+?)\s*[-–—:]?\s*(\d[\d\s,.]+)\s*(₸|тг|тенге|сум|so'm|₽|руб|usd|\$|€)?$/i)
    if (priceMatch) {
      const name = priceMatch[1].replace(/[®™©]/g, '').trim()
      const priceRaw = priceMatch[2].replace(/\s/g, '') + (priceMatch[3] || '')
      if (name.length > 2 && name.length < 100 && !name.match(/^[\d\s-]+$/)) {
        items.push({
          name,
          price: parsePrice(priceRaw),
          priceRaw,
          category: currentCategory
        })
        continue
      }
    }
    
    // Формат 2: Цена в начале "2050 ₸ Биг Мак"
    const priceFirstMatch = line.match(/^(\d[\d\s,.]+)\s*(₸|тг|тенге|сум|₽|руб)?\s+(.+)$/i)
    if (priceFirstMatch) {
      const name = priceFirstMatch[3].replace(/[®™©]/g, '').trim()
      const priceRaw = priceFirstMatch[1].replace(/\s/g, '') + (priceFirstMatch[2] || '')
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
    
    // Формат 3: Markdown список "- Биг Мак - 2050"
    const listMatch = line.match(/^[-*•]\s*(.+?)\s*[-–—:]\s*(\d[\d\s,.]+)\s*(₸|тг|тенге|сум|₽|руб)?$/i)
    if (listMatch) {
      const name = listMatch[1].replace(/[®™©\[\]]/g, '').trim()
      const priceRaw = listMatch[2].replace(/\s/g, '') + (listMatch[3] || '')
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
    
    // Формат 4: Цена на следующей строке
    const nextLine = lines[i + 1] || ''
    if (nextLine.match(/^\d[\d\s,.]*\s*(₸|тг|тенге|сум|₽|руб|usd|\$)?$/i)) {
      const name = line.replace(/[®™©]/g, '').trim()
      if (name.length > 2 && name.length < 100 && !name.match(/^\d/) && !name.match(/^[-*#]/)) {
        items.push({
          name,
          price: parsePrice(nextLine),
          priceRaw: nextLine.trim(),
          category: currentCategory
        })
        i++
        continue
      }
    }
    
    // Формат 5: Ищем цену в любом месте строки
    const anyPriceMatch = line.match(/(.{3,50}?)\s+(\d[\d\s]{0,6})\s*(₸|тг|тенге)/i)
    if (anyPriceMatch && !items.find(it => it.name === anyPriceMatch[1].trim())) {
      const name = anyPriceMatch[1].replace(/[®™©\[\]|]/g, '').trim()
      const priceRaw = anyPriceMatch[2].replace(/\s/g, '') + anyPriceMatch[3]
      if (name.length > 2 && name.length < 80 && !name.match(/^[\d\s-]+$/) && !name.match(/^(от|до|цена|price)/i)) {
        items.push({
          name,
          price: parsePrice(priceRaw),
          priceRaw,
          category: currentCategory
        })
      }
    }
  }
  
  // Дедупликация по имени
  const unique = items.reduce((acc, item) => {
    if (!acc.find(i => i.name.toLowerCase() === item.name.toLowerCase())) {
      acc.push(item)
    }
    return acc
  }, [] as MenuItem[])
  
  return unique
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
    let items: MenuItem[] = []
    
    // Определяем известные SPA сайты с их API
    const knownApis: Record<string, string> = {
      'im.kz': 'https://api.im.kz/api/v1/products?per_page=100',
      'maxway.uz': '', // Delever-based, will try direct
    }
    
    const hostname = new URL(url).hostname.replace('www.', '')
    const apiUrl = knownApis[hostname]
    
    // Попробуем получить данные через известный API
    if (apiUrl) {
      console.log('Parse: Trying known API for', hostname)
      try {
        const apiResponse = await fetch(apiUrl, {
          headers: { 'Accept': 'application/json' }
        })
        if (apiResponse.ok) {
          const data = await apiResponse.json()
          // Парсим API ответ
          if (Array.isArray(data)) {
            items = data.map((p: any) => ({
              name: p.name || p.title || '',
              price: p.price || p.prices?.[0]?.price || null,
              priceRaw: String(p.price || ''),
              category: p.category?.name || p.category_name || 'Без категории'
            })).filter((i: MenuItem) => i.name)
          } else if (data.data && Array.isArray(data.data)) {
            items = data.data.map((p: any) => ({
              name: p.name || p.title || '',
              price: p.price || p.prices?.[0]?.price || null,
              priceRaw: String(p.price || ''),
              category: p.category?.name || p.category_name || 'Без категории'
            })).filter((i: MenuItem) => i.name)
          }
          if (items.length > 0) {
            console.log('Parse: Got', items.length, 'items from API')
          }
        }
      } catch (e) {
        console.log('Parse: API failed for', hostname)
      }
    }
    
    // Если API не дал данных - пробуем Jina
    if (items.length === 0) {
      try {
        const jinaController = new AbortController()
        const jinaTimeout = setTimeout(() => jinaController.abort(), 6000)
        
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
          console.log('Parse: First 300 chars:', content.slice(0, 300).replace(/\n/g, '\\n'))
          
          // Проверяем что это SPA без данных
          if (content.includes('_nuxt') || content.includes('__NUXT__')) {
            const hasPrices = content.match(/\d{3,}\s*(₸|тг|сум|₽)/g)
            if (!hasPrices || hasPrices.length < 3) {
              console.log('Parse: Detected SPA without rendered prices')
              // Вернём ошибку с понятным сообщением
              return new Response(JSON.stringify({ 
                error: 'SPA_NOT_SUPPORTED',
                message: 'Этот сайт (SPA) загружает данные динамически. Попробуйте ссылку на конкретную страницу продукта или меню в PDF формате.'
              }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              })
            }
          }
        }
      } catch (e) {
        console.log('Parse: Jina failed, trying direct fetch')
      }
    }
    
    // Fallback на прямой fetch
    if (items.length === 0 && !content) {
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
    
    // Парсим контент если ещё не распарсили через API
    if (items.length === 0 && content) {
      items = isText ? parseTextContent(content) : parseHtmlContent(content)
    }
    
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
