export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1',
}

import type { MenuItem, ParsedMenu } from './parse'

export type CategoryMetrics = {
  name: string
  count: number
  avgPrice: number | null
  minPrice: number | null
  maxPrice: number | null
}

export type MenuMetrics = {
  totalItems: number
  itemsWithPrice: number
  categories: number
  avgPrice: number | null
  minPrice: number | null
  maxPrice: number | null
  priceRange: string
  hasCombo: boolean
  comboCount: number
  comboPercentage: number
  categoryBreakdown: CategoryMetrics[]
  topExpensive: MenuItem[]
  topCheap: MenuItem[]
  venueType: string
}

// Определение типа заведения по ключевым словам
function detectVenueType(items: MenuItem[], categories: string[]): string {
  const allText = [
    ...items.map(i => i.name.toLowerCase()),
    ...categories.map(c => c.toLowerCase())
  ].join(' ')
  
  // Фастфуд
  if (allText.match(/бургер|burger|фри|fries|наггетс|nugget|комбо|combo|хот-дог|hot.?dog/)) {
    return 'fastfood'
  }
  
  // Пиццерия
  if (allText.match(/пицца|pizza|маргарита|пепперони|pepperoni/)) {
    return 'pizzeria'
  }
  
  // Кофейня
  if (allText.match(/латте|latte|капучино|cappuccino|эспрессо|espresso|раф|americano/)) {
    if (!allText.match(/бургер|пицца|суши/)) {
      return 'coffee'
    }
  }
  
  // Суши
  if (allText.match(/суши|sushi|ролл|roll|сашими|sashimi|васаби|wasabi/)) {
    return 'sushi'
  }
  
  // Ресторан (по умолчанию если есть разнообразие)
  if (categories.length > 5) {
    return 'restaurant'
  }
  
  return 'other'
}

// Подсчёт комбо-наборов
function countCombos(items: MenuItem[]): number {
  return items.filter(item => 
    item.name.toLowerCase().match(/комбо|combo|набор|сет|set|meal/)
  ).length
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
    const parsed: ParsedMenu = await request.json()
    
    if (!parsed.items || !Array.isArray(parsed.items)) {
      return new Response(JSON.stringify({ error: 'Invalid parsed data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { items, categories } = parsed
    
    // Фильтруем позиции с ценами
    const itemsWithPrice = items.filter(i => i.price !== null && i.price > 0)
    const prices = itemsWithPrice.map(i => i.price as number)
    
    // Базовые метрики
    const totalItems = items.length
    const avgPrice = prices.length > 0 
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : null
    const minPrice = prices.length > 0 ? Math.min(...prices) : null
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null
    
    // Метрики по категориям
    const categoryBreakdown: CategoryMetrics[] = categories.map(cat => {
      const catItems = items.filter(i => i.category === cat)
      const catPrices = catItems.filter(i => i.price !== null).map(i => i.price as number)
      
      return {
        name: cat,
        count: catItems.length,
        avgPrice: catPrices.length > 0 
          ? Math.round(catPrices.reduce((a, b) => a + b, 0) / catPrices.length)
          : null,
        minPrice: catPrices.length > 0 ? Math.min(...catPrices) : null,
        maxPrice: catPrices.length > 0 ? Math.max(...catPrices) : null,
      }
    }).sort((a, b) => b.count - a.count)
    
    // Комбо
    const comboCount = countCombos(items)
    const comboPercentage = totalItems > 0 ? Math.round((comboCount / totalItems) * 100) : 0
    
    // Топ дорогих и дешёвых
    const sortedByPrice = [...itemsWithPrice].sort((a, b) => (b.price || 0) - (a.price || 0))
    const topExpensive = sortedByPrice.slice(0, 5)
    const topCheap = sortedByPrice.slice(-5).reverse()
    
    // Тип заведения
    const venueType = detectVenueType(items, categories)
    
    const metrics: MenuMetrics = {
      totalItems,
      itemsWithPrice: itemsWithPrice.length,
      categories: categories.length,
      avgPrice,
      minPrice,
      maxPrice,
      priceRange: minPrice && maxPrice ? `${minPrice} - ${maxPrice}` : 'Н/Д',
      hasCombo: comboCount > 0,
      comboCount,
      comboPercentage,
      categoryBreakdown,
      topExpensive,
      topCheap,
      venueType,
    }
    
    console.log('Metrics:', {
      totalItems,
      categories: categories.length,
      avgPrice,
      comboCount,
      venueType
    })
    
    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Metrics error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to calculate metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}
