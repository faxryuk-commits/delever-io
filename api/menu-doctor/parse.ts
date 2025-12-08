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
    
    // Пропускаем служебные строки
    if (line.match(/^(Title:|URL:|Markdown|Source|---|^\*\*\*)/i)) continue
    if (line.length < 3) continue
    
    // Определяем категорию (заголовки секций)
    // "## Бургеры" или "БУРГЕРЫ" или "### Напитки" или "Роллы и суши\n======="
    const categoryMatch = line.match(/^#{1,3}\s*(.+)$/) || 
                          line.match(/^(.+)\s*\n*=+$/) ||
                          (line.length < 35 && line === line.toUpperCase() && !line.match(/\d/) ? [null, line] : null)
    if (categoryMatch && categoryMatch[1]) {
      currentCategory = categoryMatch[1].replace(/[#*=]/g, '').trim()
      continue
    }
    
    // Jina категории: [Роллы и суши](url) где url содержит /categories/
    const jinaCatMatch = line.match(/^\[([^\]]+)\]\([^)]*\/categories\/[^)]+\)$/)
    if (jinaCatMatch && jinaCatMatch[1].length < 40) {
      currentCategory = jinaCatMatch[1].trim()
      continue
    }
    
    // Delever категории: повторяющееся название категории (напр. "Бургеры\n\nБургеры\n\n32 000UZS...")
    // Или просто строка без цифр перед ценами
    if (line.length > 3 && line.length < 50 && !line.match(/\d/) && !line.match(/^[#\[\]*-]/) && !line.includes('http')) {
      const nextLine = lines[i + 1] || ''
      const nextNextLine = lines[i + 2] || ''
      // Если следующая строка такая же или содержит цену - это категория
      if (nextLine === line || nextLine.match(/^\d[\d\s]+(UZS|сум)/i) || nextNextLine.match(/^\d[\d\s]+(UZS|сум)/i)) {
        currentCategory = line.trim()
        continue
      }
    }
    
    // Формат 0: Delever/MaxWay "52 000UZSMaxi Box Традиция" (цена+валюта слитно с названием)
    const deleverMatch = line.match(/^(\d[\d\s]+)(UZS|сум)(.+)$/i)
    if (deleverMatch) {
      const name = deleverMatch[3].trim()
      const priceRaw = deleverMatch[1].replace(/\s/g, '') + ' ' + deleverMatch[2]
      if (name.length > 2 && name.length < 100) {
        items.push({
          name,
          price: parsePrice(deleverMatch[1]),
          priceRaw,
          category: currentCategory
        })
        continue
      }
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
    
    // Формат 4a: Delever/MaxWay markdown "[52 000 UZS Название Описание...](url)"
    const deleverLinkMatch = line.match(/^\[(\d[\d\s]+)\s*(UZS|сум)\s+(.+?)\s+[А-Яа-яA-Za-z].*\]\([^)]+\)$/i)
    if (deleverLinkMatch) {
      const priceRaw = deleverLinkMatch[1].replace(/\s/g, '') + ' ' + deleverLinkMatch[2]
      const name = deleverLinkMatch[3].trim()
      if (name.length > 2 && name.length < 80) {
        items.push({
          name,
          price: parsePrice(deleverLinkMatch[1]),
          priceRaw,
          category: currentCategory
        })
        continue
      }
    }
    
    // Формат 4b: Jina markdown link "[Название Описание...](url)" с ценой ниже
    const jinalinkMatch = line.match(/^\[([^\]]+)\]\([^)]+\)$/)
    if (jinalinkMatch) {
      const linkText = jinalinkMatch[1]
      
      // Проверяем если цена внутри ссылки: "52 000 UZS Название..."
      const priceInLinkMatch = linkText.match(/^(\d[\d\s]+)\s*(UZS|сум|so'm)\s+(.+)/i)
      if (priceInLinkMatch) {
        const priceRaw = priceInLinkMatch[1].replace(/\s/g, '') + ' ' + priceInLinkMatch[2]
        // Извлекаем название (первые слова до описания)
        const restText = priceInLinkMatch[3]
        const nameParts = restText.split(/\s{2,}|\.{3}|…/)
        const name = nameParts[0].trim()
        if (name.length > 2 && name.length < 80) {
          items.push({
            name,
            price: parsePrice(priceInLinkMatch[1]),
            priceRaw,
            category: currentCategory
          })
          continue
        }
      }
      
      // Иначе ищем цену в следующих 3 строках
      for (let j = 1; j <= 3; j++) {
        const priceLine = lines[i + j] || ''
        const priceMatch = priceLine.match(/^(\d[\d\s]+)\s*(сум|so'm|₽|руб|₸|тг)$/i)
        if (priceMatch) {
          // Извлекаем только название (до описания)
          const parts = linkText.split(/\s{2,}|\.{3}|…/)
          const name = parts[0].trim()
          if (name.length > 2 && name.length < 80) {
            items.push({
              name,
              price: parsePrice(priceMatch[1]),
              priceRaw: priceLine.trim(),
              category: currentCategory
            })
            i += j
            break
          }
        }
      }
      continue
    }
    
    // Формат 5: Цена на следующей строке
    const nextLine = lines[i + 1] || ''
    if (nextLine.match(/^\d[\d\s,.]*\s*(₸|тг|тенге|сум|so'm|₽|руб|usd|\$)?$/i)) {
      const name = line.replace(/[®™©\[\]]/g, '').trim()
      if (name.length > 2 && name.length < 100 && !name.match(/^\d/) && !name.match(/^[-*#\[]/) && !name.includes('](')) {
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
    const hostname = new URL(url).hostname.replace('www.', '')
    
    // Специальная обработка для im.kz (I'm restaurants Kazakhstan)
    if (hostname === 'im.kz') {
      console.log('Parse: Using im.kz API')
      try {
        // Параллельно загружаем категории и все продукты
        const [catResponse, prod1, prod2, prod3, prod4, prod5] = await Promise.all([
          fetch('https://api.im.kz/api/v1/categories', { headers: { 'Accept': 'application/json' } }),
          fetch('https://api.im.kz/api/v1/products?per_page=50&page=1', { headers: { 'Accept': 'application/json' } }),
          fetch('https://api.im.kz/api/v1/products?per_page=50&page=2', { headers: { 'Accept': 'application/json' } }),
          fetch('https://api.im.kz/api/v1/products?per_page=50&page=3', { headers: { 'Accept': 'application/json' } }),
          fetch('https://api.im.kz/api/v1/products?per_page=50&page=4', { headers: { 'Accept': 'application/json' } }),
          fetch('https://api.im.kz/api/v1/products?per_page=50&page=5', { headers: { 'Accept': 'application/json' } }),
        ])
        
        // Парсим категории
        const categoryNames: string[] = []
        if (catResponse.ok) {
          const catData = await catResponse.json()
          if (catData.success && catData.data?.data) {
            for (const cat of catData.data.data) {
              categoryNames.push(cat.title)
            }
            console.log('Parse: Found', categoryNames.length, 'categories:', categoryNames.slice(0, 5).join(', '))
          }
        }
        
        // Парсим продукты
        const allItems: MenuItem[] = []
        for (const resp of [prod1, prod2, prod3, prod4, prod5]) {
          if (resp.ok) {
            const data = await resp.json()
            if (data.success && data.data?.data) {
              for (const p of data.data.data) {
                allItems.push({
                  name: p.title || p.name || '',
                  price: p.price || null,
                  priceRaw: p.price ? `${p.price} ₸` : '',
                  category: categoryNames[0] || 'Меню' // Распределим позже
                })
              }
            }
          }
        }
        
        // Распределяем по категориям по ключевым словам
        const categoryKeywords: Record<string, string[]> = {
          'Бургеры': ['бургер', 'burger', 'чизбургер', 'гамбургер', 'тейсти'],
          'Combo': ['combo', 'комбо'],
          'Завтраки': ['брекфаст', 'breakfast', 'маффин с яйцом', 'тост с'],
          'Напитки': ['кола', 'cola', 'fanta', 'sprite', 'сок', 'чай', 'кофе', 'латте', 'капучино', 'американо', 'эспрессо'],
          'Десерты': ['мороженое', 'айс микс', 'пирожок', 'рожок', 'чизкейк', 'торт', 'синнабон', 'донат'],
          'Закуски': ['наггетс', 'картофель', 'фри', 'крылья', 'салат', 'креветки'],
          'Соусы': ['соус', 'кетчуп', 'сироп'],
          'I\'M Café': ['раф', 'какао', 'фраппе', 'панини', 'круассан'],
        }
        
        for (const item of allItems) {
          const nameLower = item.name.toLowerCase()
          for (const [cat, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(kw => nameLower.includes(kw))) {
              item.category = cat
              break
            }
          }
        }
        
        // Дедупликация
        const uniqueItems = allItems.reduce((acc, item) => {
          if (item.name && !acc.find(i => i.name === item.name)) {
            acc.push(item)
          }
          return acc
        }, [] as MenuItem[])
        
        if (uniqueItems.length > 0) {
          items = uniqueItems
          console.log('Parse: Got', items.length, 'items,', categoryNames.length, 'categories from im.kz')
        }
      } catch (e) {
        console.log('Parse: im.kz API failed:', e)
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
          const isSpa = content.includes('_nuxt') || content.includes('__NUXT__') || 
                        content.includes('__NEXT_DATA__') || content.includes('window.__INITIAL_STATE__')
          if (isSpa) {
            const hasPrices = content.match(/\d{3,}\s*(₸|тг|сум|₽)/g)
            if (!hasPrices || hasPrices.length < 3) {
              console.log('Parse: Detected SPA without rendered prices, trying Microlink...')
              content = '' // Сбрасываем, чтобы попробовать Microlink
            }
          }
        }
      } catch (e) {
        console.log('Parse: Jina failed, trying Microlink')
      }
    }
    
    // Если Jina не дал данных - пробуем Microlink (рендерит JS)
    if (items.length === 0 && !content) {
      try {
        console.log('Parse: Trying Microlink for JS rendering...')
        const microlinkController = new AbortController()
        const microlinkTimeout = setTimeout(() => microlinkController.abort(), 10000)
        
        const microlinkResponse = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=false&meta=false&scripts=false&styles=false`,
          { signal: microlinkController.signal }
        )
        
        clearTimeout(microlinkTimeout)
        
        if (microlinkResponse.ok) {
          const microlinkData = await microlinkResponse.json()
          if (microlinkData.status === 'success' && microlinkData.data?.html) {
            content = microlinkData.data.html
            isText = false
            console.log('Parse: Got HTML via Microlink, length:', content.length)
          }
        }
      } catch (e) {
        console.log('Parse: Microlink failed, trying direct fetch')
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
