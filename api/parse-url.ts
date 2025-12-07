export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1',
}

interface ParsedResult {
  title?: string
  description?: string
  image?: string
  price?: string
  businessType?: string
  brandName?: string
  components?: string[]
}

// Определение типа бизнеса по контенту страницы
function detectBusinessType(html: string, url: string): string {
  const lowerHtml = html.toLowerCase()
  const lowerUrl = url.toLowerCase()
  
  // Еда/рестораны
  if (lowerHtml.includes('доставка еды') || lowerHtml.includes('ресторан') || 
      lowerHtml.includes('меню') || lowerHtml.includes('блюдо') ||
      lowerHtml.includes('yetkazib berish') || lowerHtml.includes('taom') ||
      lowerUrl.includes('food') || lowerUrl.includes('resto') ||
      lowerUrl.includes('cafe') || lowerUrl.includes('pizza') ||
      lowerHtml.includes('pizza') || lowerHtml.includes('burger') ||
      lowerHtml.includes('sushi') || lowerHtml.includes('lavash')) {
    return 'ресторан/кафе'
  }
  
  // Электроника
  if (lowerHtml.includes('электроник') || lowerHtml.includes('смартфон') ||
      lowerHtml.includes('ноутбук') || lowerHtml.includes('телефон') ||
      lowerHtml.includes('техника') || lowerHtml.includes('гаджет') ||
      lowerUrl.includes('tech') || lowerUrl.includes('electron') ||
      lowerUrl.includes('mobile') || lowerUrl.includes('phone')) {
    return 'магазин электроники'
  }
  
  // Одежда/мода
  if (lowerHtml.includes('одежда') || lowerHtml.includes('мода') ||
      lowerHtml.includes('размер') || lowerHtml.includes('коллекция') ||
      lowerHtml.includes('kiyim') || lowerHtml.includes('fashion') ||
      lowerUrl.includes('fashion') || lowerUrl.includes('cloth') ||
      lowerUrl.includes('wear') || lowerUrl.includes('style')) {
    return 'магазин одежды'
  }
  
  // Красота
  if (lowerHtml.includes('салон') || lowerHtml.includes('красот') ||
      lowerHtml.includes('маникюр') || lowerHtml.includes('косметик') ||
      lowerHtml.includes('spa') || lowerHtml.includes('массаж') ||
      lowerUrl.includes('beauty') || lowerUrl.includes('salon') ||
      lowerUrl.includes('spa') || lowerUrl.includes('nail')) {
    return 'салон красоты'
  }
  
  // Фитнес
  if (lowerHtml.includes('фитнес') || lowerHtml.includes('тренажер') ||
      lowerHtml.includes('спорт') || lowerHtml.includes('тренировк') ||
      lowerUrl.includes('fitness') || lowerUrl.includes('gym') ||
      lowerUrl.includes('sport') || lowerUrl.includes('workout')) {
    return 'фитнес'
  }
  
  // Супермаркет/продукты
  if (lowerHtml.includes('супермаркет') || lowerHtml.includes('продукт') ||
      lowerHtml.includes('магазин') || lowerHtml.includes('grocery') ||
      lowerUrl.includes('market') || lowerUrl.includes('shop') ||
      lowerUrl.includes('store') || lowerUrl.includes('korzinka') ||
      lowerUrl.includes('makro')) {
    return 'магазин/супермаркет'
  }
  
  return 'бизнес'
}

// Извлечение бренда из URL или title
function extractBrandName(url: string, title?: string): string {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    const domain = hostname.split('.')[0]
    
    // Известные бренды
    const knownBrands: Record<string, string> = {
      'korzinka': 'Korzinka',
      'makro': 'Makro',
      'uzum': 'Uzum Market',
      'oqtepalavash': 'Oqtepa Lavash',
      'evos': 'Evos',
      'maxway': 'Max Way',
      'technomart': 'Technomart',
      'mediapark': 'Mediapark',
      'zood': 'Zood',
    }
    
    if (knownBrands[domain.toLowerCase()]) {
      return knownBrands[domain.toLowerCase()]
    }
    
    // Capitalize first letter
    return domain.charAt(0).toUpperCase() + domain.slice(1)
  } catch {
    if (title) {
      return title.split(' ')[0]
    }
    return ''
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
    const { url } = await request.json()
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('Parsing URL:', url)

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const result: ParsedResult = {}

    // Extract OG tags
    const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
                         html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i)
    const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
                        html.match(/<meta\s+content="([^"]+)"\s+property="og:description"/i)
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
                         html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i)

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    result.title = ogTitleMatch?.[1] || titleMatch?.[1] || undefined

    // Extract description
    const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                          html.match(/<meta\s+content="([^"]+)"\s+name="description"/i)
    result.description = ogDescMatch?.[1] || metaDescMatch?.[1] || undefined

    // Extract image
    result.image = ogImageMatch?.[1] || undefined

    // Extract price - various formats
    const pricePatterns = [
      /(?:цена|price|narx|стоимость)[:\s]*([0-9\s,.]+)\s*(?:сум|sum|uzs|usd|\$|₽)?/i,
      /([0-9\s,.]+)\s*(?:сум|sum|uzs)/i,
      /"price"[:\s]*"?([0-9\s,.]+)"?/i,
      /class="[^"]*price[^"]*"[^>]*>([^<]*[0-9][^<]*)</i,
      /itemprop="price"[^>]*content="([^"]+)"/i,
    ]

    for (const pattern of pricePatterns) {
      const match = html.match(pattern)
      if (match?.[1]) {
        const priceNum = match[1].replace(/\s/g, '').replace(',', '.')
        if (parseFloat(priceNum) > 0) {
          result.price = match[1].trim() + ' сум'
          break
        }
      }
    }

    // Try JSON-LD
    const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)
    if (jsonLdMatch) {
      for (const jsonLd of jsonLdMatch) {
        try {
          const jsonContent = jsonLd.replace(/<script[^>]*>|<\/script>/gi, '')
          const data = JSON.parse(jsonContent)
          
          if (data.name && !result.title) {
            result.title = data.name
          }
          if (data.description && !result.description) {
            result.description = data.description
          }
          if (data.offers?.price && !result.price) {
            result.price = `${data.offers.price} ${data.offers.priceCurrency || 'сум'}`
          }
          if (data.image && !result.image) {
            result.image = Array.isArray(data.image) ? data.image[0] : data.image
          }
          if (data.recipeIngredient) {
            result.components = data.recipeIngredient.slice(0, 10)
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
    }

    // Detect business type
    result.businessType = detectBusinessType(html, url)
    
    // Extract brand name
    result.brandName = extractBrandName(url, result.title)

    console.log('Parsed result:', result)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Parse URL error:', error)
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to parse URL' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}
