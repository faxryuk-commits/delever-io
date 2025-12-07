// AI Marketing Posts Generator API
// Uses OpenAI to generate marketing content for restaurants

export const config = {
  runtime: 'edge',
  preferredRegion: 'iad1', // Washington DC, USA - bypass OpenAI regional blocks
}

interface MarketingRequest {
  brandName: string
  cuisine: string
  promoDescription: string
  goal: string
  productUrl?: string
  channels: string[] // "instagram" | "telegram" | "stories"
  language: 'ru' | 'uz' | 'en'
}

interface ParsedProductData {
  title?: string
  description?: string
  image?: string
  price?: string
  components?: string[]
  extracted: boolean
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

// Функция для парсинга URL товара и извлечения данных
async function parseProductUrl(url: string): Promise<ParsedProductData> {
  try {
    console.log('Parsing product URL:', url)
    
    // Проверяем валидность URL
    if (!url || !url.startsWith('http')) {
      return { extracted: false }
    }

    // Загружаем HTML страницы
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch URL:', response.status)
      return { extracted: false }
    }

    const html = await response.text()
    
    // Извлекаем данные с помощью регулярных выражений
    const result: ParsedProductData = {
      extracted: true
    }

    // Извлекаем title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i) || 
                       html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+name=["']title["']\s+content=["']([^"']+)["']/i)
    if (titleMatch) {
      result.title = titleMatch[1].trim().replace(/&[^;]+;/g, '')
    }

    // Извлекаем description
    const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    if (descMatch) {
      result.description = descMatch[1].trim().replace(/&[^;]+;/g, '')
    }

    // Извлекаем изображение
    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+name=["']og:image["']\s+content=["']([^"']+)["']/i)
    if (imageMatch) {
      result.image = imageMatch[1].trim()
    }

    // Извлекаем цену
    const priceMatch = html.match(/<meta\s+property=["']product:price:amount["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<span[^>]*class=["'][^"']*price[^"']*["'][^>]*>([^<]+)<\/span>/i) ||
                       html.match(/<div[^>]*class=["'][^"']*price[^"']*["'][^>]*>([^<]+)<\/div>/i)
    if (priceMatch) {
      result.price = priceMatch[1].trim().replace(/[^\d.,]/g, '')
    }

    // Извлекаем компоненты/ингредиенты (ищем в структурированных данных)
    const components: string[] = []
    const componentMatches = html.matchAll(/<li[^>]*>([^<]+(?:ингредиент|компонент|состав)[^<]*)<\/li>/gi)
    for (const match of componentMatches) {
      components.push(match[1].trim())
    }

    // Также ищем в JSON-LD
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1])
        if (jsonLd.recipe?.recipeIngredient) {
          components.push(...jsonLd.recipe.recipeIngredient)
        }
        if (jsonLd.offers?.price) {
          result.price = jsonLd.offers.price
        }
      } catch (e) {
        // Игнорируем ошибки парсинга JSON-LD
      }
    }

    if (components.length > 0) {
      result.components = components
    }

    console.log('Parsed product data:', result)
    return result
  } catch (error) {
    console.error('Error parsing product URL:', error)
    return { extracted: false }
  }
}

// Fallback ответы когда OpenAI недоступен
function getFallbackMarketingResponse(data: MarketingRequest, productData?: ParsedProductData): MarketingResponse {
  const lang = data.language
  const brand = data.brandName || 'Ваш ресторан'
  const cuisine = data.cuisine || 'вкусная кухня'
  
  // Используем данные из URL, если они есть
  let promo = data.promoDescription || 'Специальное предложение'
  if (productData?.extracted) {
    if (productData.title && !data.promoDescription) {
      promo = productData.title
    }
    if (productData.description) {
      promo += `\n\n${productData.description}`
    }
    if (productData.price) {
      promo += `\n💰 Цена: ${productData.price}`
    }
    if (productData.components && productData.components.length > 0) {
      promo += `\n\nСостав: ${productData.components.slice(0, 5).join(', ')}`
    }
  }
  
  const hashtags = lang === 'ru' 
    ? ['#ресторан', '#доставка', '#еда', '#акция', '#спешите', '#вкусно', '#свежее', '#горячее', '#заказ', '#деливери', '#ташкент', '#узбекистан', '#кухня', '#меню', '#скидка']
    : lang === 'uz'
    ? ['#restoran', '#yetkazib_berish', '#ovqat', '#aksiya', '#shoshiling', '#mazali', '#yangi', '#issiq', '#buyurtma', '#delivery', '#toshkent', '#o\'zbekiston', '#oshxona', '#menyu', '#chegirma']
    : ['#restaurant', '#delivery', '#food', '#promo', '#hurry', '#delicious', '#fresh', '#hot', '#order', '#delivery', '#tashkent', '#uzbekistan', '#cuisine', '#menu', '#discount']
  
  const instagramPosts = lang === 'ru'
    ? [
        `🍽️ ${brand} — ${cuisine} на любой вкус!\n\n${promo}\n\n✨ Заказывайте прямо сейчас!\n📞 +998 78 113 98 13`,
        `🔥 Горячее предложение от ${brand}!\n\n${promo}\n\nНе упустите возможность! Закажите доставку 🚀`,
        `👨‍🍳 ${brand} — качество и вкус в каждом блюде!\n\n${promo}\n\nДоставка по всему городу! 📦`
      ]
    : lang === 'uz'
    ? [
        `🍽️ ${brand} — ${cuisine} har xil ta'mga!\n\n${promo}\n\n✨ Hozir buyurtma bering!\n📞 +998 78 113 98 13`,
        `🔥 ${brand} dan issiq taklif!\n\n${promo}\n\nImkoniyatni qo'ldan bermang! Yetkazib berishni buyurtma qiling 🚀`,
        `👨‍🍳 ${brand} — har bir taomda sifat va ta'm!\n\n${promo}\n\nButun shahar bo'ylab yetkazib berish! 📦`
      ]
    : [
        `🍽️ ${brand} — ${cuisine} for every taste!\n\n${promo}\n\n✨ Order now!\n📞 +998 78 113 98 13`,
        `🔥 Hot offer from ${brand}!\n\n${promo}\n\nDon't miss out! Order delivery 🚀`,
        `👨‍🍳 ${brand} — quality and taste in every dish!\n\n${promo}\n\nDelivery throughout the city! 📦`
      ]
  
  const telegramPosts = lang === 'ru'
    ? [
        `🍽️ ${brand}\n\n${promo}\n\nМы готовим ${cuisine} с любовью и вниманием к деталям. Каждое блюдо — это произведение кулинарного искусства.\n\n📞 Заказ: +998 78 113 98 13\n🚚 Быстрая доставка\n💳 Удобная оплата`,
        `🔥 Специальное предложение!\n\n${promo}\n\n${brand} радует своих клиентов качественной ${cuisine} и быстрой доставкой. Попробуйте уже сегодня!`,
        `👨‍🍳 ${brand} — ваш выбор для ${cuisine}!\n\n${promo}\n\nМы используем только свежие ингредиенты и готовим с душой. Заказывайте прямо сейчас!`
      ]
    : lang === 'uz'
    ? [
        `🍽️ ${brand}\n\n${promo}\n\nBiz ${cuisine} ni sevgi va e'tibor bilan tayyorlaymiz. Har bir taom — oshpazlik san'ati asari.\n\n📞 Buyurtma: +998 78 113 98 13\n🚚 Tez yetkazib berish\n💳 Qulay to'lov`,
        `🔥 Maxsus taklif!\n\n${promo}\n\n${brand} mijozlarini sifatli ${cuisine} va tez yetkazib berish bilan xursand qiladi. Bugun sinab ko'ring!`,
        `👨‍🍳 ${brand} — ${cuisine} uchun sizning tanlovingiz!\n\n${promo}\n\nBiz faqat yangi ingredientlardan foydalanamiz va qalbdan tayyorlaymiz. Hozir buyurtma bering!`
      ]
    : [
        `🍽️ ${brand}\n\n${promo}\n\nWe prepare ${cuisine} with love and attention to detail. Every dish is a culinary masterpiece.\n\n📞 Order: +998 78 113 98 13\n🚚 Fast delivery\n💳 Convenient payment`,
        `🔥 Special offer!\n\n${promo}\n\n${brand} delights customers with quality ${cuisine} and fast delivery. Try it today!`,
        `👨‍🍳 ${brand} — your choice for ${cuisine}!\n\n${promo}\n\nWe use only fresh ingredients and cook with soul. Order now!`
      ]
  
  const storiesIdeas = lang === 'ru'
    ? [
        `🔥 ${promo} — только сегодня!`,
        `🍽️ ${brand} — ${cuisine} с доставкой`,
        `📞 Заказ: +998 78 113 98 13`
      ]
    : lang === 'uz'
    ? [
        `🔥 ${promo} — faqat bugun!`,
        `🍽️ ${brand} — ${cuisine} yetkazib berish bilan`,
        `📞 Buyurtma: +998 78 113 98 13`
      ]
    : [
        `🔥 ${promo} — today only!`,
        `🍽️ ${brand} — ${cuisine} with delivery`,
        `📞 Order: +998 78 113 98 13`
      ]
  
  return {
    instagram_posts: instagramPosts,
    telegram_posts: telegramPosts,
    stories_ideas: storiesIdeas,
    hashtags: hashtags
  }
}

function getUserPrompt(data: MarketingRequest, productData?: ParsedProductData): string {
  const langName = data.language === 'ru' ? 'русском' : data.language === 'uz' ? 'узбекском' : 'английском'
  
  // Маппинг целей на описания
  const goalDescriptions: Record<string, { ru: string; uz: string; en: string }> = {
    increase_sales: {
      ru: 'увеличить продажи и количество заказов',
      uz: 'sotuvlarni va buyurtmalar sonini oshirish',
      en: 'increase sales and number of orders'
    },
    increase_average_check: {
      ru: 'увеличить средний чек заказа',
      uz: 'o\'rtacha buyurtma chekini oshirish',
      en: 'increase average order value'
    },
    return_customers: {
      ru: 'вернуть ушедших клиентов, предложить специальное предложение',
      uz: 'ketgan mijozlarni qaytarish, maxsus taklif',
      en: 'return lost customers with special offer'
    },
    promo_discount: {
      ru: 'предложить скидку или промокод',
      uz: 'chegirma yoki promokod taklif qilish',
      en: 'offer discount or promo code'
    },
    holiday_promo: {
      ru: 'праздничная акция, создать праздничное настроение',
      uz: 'bayram aksiyasi, bayram kayfiyatini yaratish',
      en: 'holiday promotion, create festive mood'
    },
    new_product: {
      ru: 'продвижение нового товара/блюда',
      uz: 'yangi mahsulot/taomni targ\'ib qilish',
      en: 'promote new product/dish'
    },
    weekday_boost: {
      ru: 'увеличить заказы в будние дни',
      uz: 'ish kunlarida buyurtmalarni oshirish',
      en: 'increase weekday orders'
    },
    loyalty_program: {
      ru: 'продвижение программы лояльности, бонусы',
      uz: 'sadoqat dasturini targ\'ib qilish, bonuslar',
      en: 'promote loyalty program, bonuses'
    }
  }
  
  const goalDesc = goalDescriptions[data.goal]?.[data.language] || data.goal
  
  let productInfo = ''
  if (productData?.extracted) {
    productInfo = `\n\nДАННЫЕ ИЗ ССЫЛКИ НА ТОВАР:\n`
    if (productData.title) productInfo += `- Название товара: ${productData.title}\n`
    if (productData.description) productInfo += `- Описание: ${productData.description}\n`
    if (productData.price) productInfo += `- Цена: ${productData.price}\n`
    if (productData.components && productData.components.length > 0) {
      productInfo += `- Компоненты/ингредиенты: ${productData.components.join(', ')}\n`
    }
    if (productData.image) productInfo += `- Изображение доступно: ${productData.image}\n`
    productInfo += `\nИСПОЛЬЗУЙ ЭТИ ДАННЫЕ для создания более точных и детальных постов. Упоминай конкретные компоненты, цену, особенности товара.`
  }
  
  return `Сгенерируй маркетинговые тексты для ресторана.

Данные:
- Название: ${data.brandName}
- Тип кухни: ${data.cuisine}
- Описание акции/блюда: ${data.promoDescription}
- Цель продвижения: ${goalDesc}
- Каналы: ${data.channels.join(', ')}
- Язык текстов: ${langName}${productInfo}

Верни JSON в формате:
{
  "instagram_posts": ["пост 1", "пост 2", "пост 3"],
  "telegram_posts": ["пост 1", "пост 2", "пост 3"],
  "stories_ideas": ["идея 1", "идея 2", "идея 3"],
  "hashtags": ["#хэштег1", "#хэштег2", "...до 15 хэштегов"]
}

Если канал не выбран, всё равно сгенерируй для него контент.
Пиши на ${langName} языке. Только JSON, ничего больше.
${productData?.extracted ? 'ВАЖНО: Используй конкретные данные из ссылки (название, компоненты, цену) для создания более убедительных постов.' : ''}`
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

  let body: MarketingRequest | undefined
  
  try {
    body = await request.json()

    // Validate required fields
    if (!body || !body.brandName || !body.promoDescription) {
      return new Response(JSON.stringify({ error: 'brandName and promoDescription are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // После проверки body точно определен
    const requestBody: MarketingRequest = body

    // Парсим URL товара, если он предоставлен
    let productData: ParsedProductData | undefined
    if (requestBody.productUrl && requestBody.productUrl.trim()) {
      console.log('AI Marketing: Parsing product URL...')
      productData = await parseProductUrl(requestBody.productUrl.trim())
      if (productData.extracted) {
        console.log('AI Marketing: Successfully extracted product data:', {
          hasTitle: !!productData.title,
          hasDescription: !!productData.description,
          hasPrice: !!productData.price,
          hasComponents: !!productData.components?.length,
          hasImage: !!productData.image
        })
      } else {
        console.log('AI Marketing: Could not extract product data from URL')
      }
    }

    // Попытка использовать альтернативный AI сервис, если OpenAI недоступен
    // Проверяем наличие ключей альтернативных сервисов
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
    
    // Call OpenAI (или альтернативный сервис)
    console.log('AI Marketing: Calling AI API...', {
      brandName: requestBody.brandName,
      language: requestBody.language,
      channels: requestBody.channels,
      hasProductData: !!productData?.extracted,
      hasAnthropic: !!anthropicKey,
      hasGemini: !!geminiKey
    })
    
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
          { role: 'user', content: getUserPrompt(requestBody, productData) },
        ],
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    })

    console.log('AI Marketing: OpenAI response status:', response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('AI Marketing: OpenAI API error:', response.status)
      console.error('AI Marketing: Error data:', errorData.substring(0, 500))
      
      // Проверяем, является ли это ошибкой блокировки региона
      // Сначала проверяем строку напрямую (на случай вложенного JSON)
      const lowerError = errorData.toLowerCase()
      let isRegionBlocked = false
      let errorMessage = ''
      
      // Проверяем строку напрямую на наличие ключевых слов
      if (lowerError.includes('unsupported_country_region_territory') || 
          lowerError.includes('unsupported_country') ||
          lowerError.includes('country, region, or territory not supported') ||
          lowerError.includes('request_forbidden') ||
          (lowerError.includes('region') && lowerError.includes('not supported')) ||
          (lowerError.includes('territory') && lowerError.includes('not supported'))) {
        isRegionBlocked = true
        console.log('Detected region block from error string')
      }
      
      // Также пытаемся распарсить JSON для более точной проверки
      if (!isRegionBlocked) {
        try {
          const errorJson = JSON.parse(errorData)
          errorMessage = errorJson.error?.message || JSON.stringify(errorJson)
          
          // Проверяем код ошибки и сообщение
          if (errorJson.error?.code === 'unsupported_country_region_territory' || 
              errorJson.error?.code === 'request_forbidden' ||
              errorMessage.toLowerCase().includes('unsupported_country') ||
              errorMessage.toLowerCase().includes('country, region, or territory not supported')) {
            isRegionBlocked = true
            console.log('Detected region block from parsed JSON')
          }
        } catch {
          // Если не удалось распарсить, используем строку как есть
          errorMessage = errorData
        }
      } else {
        errorMessage = errorData
      }
      
      // Если регион заблокирован, пробуем использовать альтернативный AI сервис
      if (isRegionBlocked) {
        console.log('AI Marketing: Region blocked detected, trying alternative AI service...')
        
        // Пробуем Google Gemini, если доступен
        if (geminiKey) {
          console.log('AI Marketing: Trying Google Gemini API...', { hasKey: !!geminiKey, keyPrefix: geminiKey.substring(0, 10) })
          try {
            const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${geminiKey}`,
              },
              body: JSON.stringify({
                model: 'gemini-1.5-flash',
                messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  { role: 'user', content: getUserPrompt(requestBody, productData) },
                ],
                temperature: 0.8,
                max_tokens: 2000,
                response_format: { type: 'json_object' },
              }),
            })

            console.log('AI Marketing: Gemini response status:', geminiResponse.status)

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json()
              console.log('AI Marketing: Gemini response structure:', {
                hasChoices: !!geminiData.choices,
                choicesLength: geminiData.choices?.length,
                hasContent: !!geminiData.choices?.[0]?.message?.content
              })
              
              const geminiContent = geminiData.choices?.[0]?.message?.content
              
              if (geminiContent) {
                console.log('AI Marketing: Gemini content length:', geminiContent.length)
                try {
                  const result = JSON.parse(geminiContent)
                  console.log('AI Marketing: Parsed Gemini result:', {
                    hasInstagram: !!result.instagram_posts,
                    hasTelegram: !!result.telegram_posts,
                    hasStories: !!result.stories_ideas,
                    hasHashtags: !!result.hashtags
                  })
                  
                  if (result.instagram_posts && result.telegram_posts && result.stories_ideas && result.hashtags) {
                    console.log('AI Marketing: ✅ Successfully generated content using Google Gemini')
                    return new Response(JSON.stringify(result), {
                      status: 200,
                      headers: { 'Content-Type': 'application/json' },
                    })
                  } else {
                    console.error('AI Marketing: Gemini result missing required fields:', result)
                  }
                } catch (parseError) {
                  console.error('AI Marketing: Failed to parse Gemini response:', parseError)
                  console.error('AI Marketing: Raw Gemini content:', geminiContent.substring(0, 500))
                }
              } else {
                console.error('AI Marketing: Gemini response has no content')
                console.error('AI Marketing: Full Gemini response:', JSON.stringify(geminiData).substring(0, 500))
              }
            } else {
              const geminiErrorText = await geminiResponse.text()
              console.error('AI Marketing: Gemini API error:', geminiResponse.status, geminiErrorText.substring(0, 500))
            }
          } catch (geminiError) {
            console.error('AI Marketing: Gemini API request failed:', geminiError)
            if (geminiError instanceof Error) {
              console.error('AI Marketing: Gemini error message:', geminiError.message)
            }
          }
        } else {
          console.log('AI Marketing: Gemini key not found in environment variables')
        }
        
        // Если Gemini не сработал, используем fallback
        console.log('AI Marketing: Using fallback response')
        const fallbackResponse = getFallbackMarketingResponse(requestBody, productData)
        return new Response(JSON.stringify({
          ...fallbackResponse,
          fallback: true,
          note: 'AI временно недоступен в вашем регионе, используется базовый шаблон'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      // Для других ошибок возвращаем ошибку
      return new Response(JSON.stringify({ 
        error: 'OpenAI API error', 
        details: errorMessage || errorData 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Парсим ответ от OpenAI
    let data: any
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError)
      // Если не удалось распарсить, возможно это ошибка региона
      const fallbackResponse = getFallbackMarketingResponse(body, productData)
      return new Response(JSON.stringify({
        ...fallbackResponse,
        fallback: true,
        note: 'AI временно недоступен, используется базовый шаблон'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Проверяем, есть ли ошибка в успешном ответе
    if (data.error) {
      console.error('OpenAI returned error in response:', data.error)
      const errorCode = data.error.code || ''
      const errorMessage = data.error.message || JSON.stringify(data.error)
      const errorString = JSON.stringify(data.error).toLowerCase()
      
      // Проверяем, является ли это ошибкой блокировки региона
      // Проверяем код, сообщение и всю строку ошибки
      if (errorCode === 'unsupported_country_region_territory' || 
          errorCode === 'request_forbidden' ||
          errorMessage.toLowerCase().includes('unsupported_country') ||
          errorMessage.toLowerCase().includes('country, region, or territory not supported') ||
          errorString.includes('unsupported_country_region_territory') ||
          errorString.includes('country, region, or territory not supported')) {
        console.log('Using fallback marketing response due to region block in response')
        
        // Пробуем Google Gemini, если доступен
        if (geminiKey) {
          console.log('AI Marketing: Trying Google Gemini API as fallback...', { hasKey: !!geminiKey })
          try {
            const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${geminiKey}`,
              },
              body: JSON.stringify({
                model: 'gemini-1.5-flash',
                messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  { role: 'user', content: getUserPrompt(requestBody, productData) },
                ],
                temperature: 0.8,
                max_tokens: 2000,
                response_format: { type: 'json_object' },
              }),
            })

            console.log('AI Marketing: Gemini response status:', geminiResponse.status)

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json()
              const geminiContent = geminiData.choices?.[0]?.message?.content
              
              if (geminiContent) {
                try {
                  const result = JSON.parse(geminiContent)
                  if (result.instagram_posts && result.telegram_posts && result.stories_ideas && result.hashtags) {
                    console.log('AI Marketing: ✅ Successfully generated content using Google Gemini')
                    return new Response(JSON.stringify(result), {
                      status: 200,
                      headers: { 'Content-Type': 'application/json' },
                    })
                  }
                } catch (parseError) {
                  console.error('AI Marketing: Failed to parse Gemini response:', parseError)
                }
              } else {
                console.error('AI Marketing: Gemini response has no content')
              }
            } else {
              const geminiErrorText = await geminiResponse.text()
              console.error('AI Marketing: Gemini API error:', geminiResponse.status, geminiErrorText.substring(0, 500))
            }
          } catch (geminiError) {
            console.error('AI Marketing: Gemini API request failed:', geminiError)
          }
        } else {
          console.log('AI Marketing: Gemini key not found')
        }
        
        const fallbackResponse = getFallbackMarketingResponse(requestBody, productData)
        return new Response(JSON.stringify({
          ...fallbackResponse,
          fallback: true,
          note: 'AI временно недоступен в вашем регионе, используется базовый шаблон'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
    
    // Также проверяем content на наличие ошибок (на случай, если ошибка в тексте ответа)
    const contentString = JSON.stringify(data).toLowerCase()
    if (contentString.includes('unsupported_country_region_territory') ||
        contentString.includes('country, region, or territory not supported')) {
      console.log('Detected region block in response content, trying Gemini...')
      
      // Пробуем Google Gemini, если доступен
      if (geminiKey) {
        console.log('AI Marketing: Trying Google Gemini API as fallback...')
        try {
          const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authorization': `Bearer ${geminiKey}`,
            },
            body: JSON.stringify({
              model: 'gemini-1.5-flash',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: getUserPrompt(requestBody, productData) },
              ],
              temperature: 0.8,
              max_tokens: 2000,
              response_format: { type: 'json_object' },
            }),
          })

          if (geminiResponse.ok) {
            const geminiData = await geminiResponse.json()
            const geminiContent = geminiData.choices?.[0]?.message?.content
            
            if (geminiContent) {
              try {
                const result = JSON.parse(geminiContent)
                if (result.instagram_posts && result.telegram_posts && result.stories_ideas && result.hashtags) {
                  console.log('AI Marketing: Successfully generated content using Google Gemini')
                  return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                  })
                }
              } catch (parseError) {
                console.error('AI Marketing: Failed to parse Gemini response:', parseError)
              }
            }
          }
        } catch (geminiError) {
          console.error('AI Marketing: Gemini API request failed:', geminiError)
        }
      }
      
      const fallbackResponse = getFallbackMarketingResponse(requestBody, productData)
      return new Response(JSON.stringify({
        ...fallbackResponse,
        fallback: true,
        note: 'AI временно недоступен в вашем регионе, используется базовый шаблон'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in OpenAI response:', data)
      // Используем fallback вместо ошибки
      const fallbackResponse = getFallbackMarketingResponse(body, productData)
      return new Response(JSON.stringify({
        ...fallbackResponse,
        fallback: true,
        note: 'AI вернул пустой ответ, используется базовый шаблон'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Parse JSON response
    let result: MarketingResponse
    try {
      result = JSON.parse(content)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response content as JSON:', content)
      // Используем fallback вместо ошибки
      const fallbackResponse = getFallbackMarketingResponse(body, productData)
      return new Response(JSON.stringify({
        ...fallbackResponse,
        fallback: true,
        note: 'Не удалось распарсить ответ AI, используется базовый шаблон'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate response structure
    if (!result.instagram_posts || !result.telegram_posts || !result.stories_ideas || !result.hashtags) {
      console.error('AI Marketing: Invalid response structure:', result)
      // Используем fallback вместо ошибки
      const fallbackResponse = getFallbackMarketingResponse(body, productData)
      return new Response(JSON.stringify({
        ...fallbackResponse,
        fallback: true,
        note: 'AI вернул неполный ответ, используется базовый шаблон'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('AI Marketing: Successfully generated content')
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('AI Marketing API error:', error)
    // В случае любой ошибки используем fallback вместо возврата ошибки
    // Используем body, если он был прочитан, иначе используем значения по умолчанию
    const fallbackBody: MarketingRequest = (body as MarketingRequest) || {
      brandName: '',
      cuisine: '',
      promoDescription: '',
      goal: '',
      channels: ['instagram', 'telegram', 'stories'],
      language: 'ru' as const
    }
    
    const fallbackResponse = getFallbackMarketingResponse(fallbackBody, undefined)
    return new Response(JSON.stringify({
      ...fallbackResponse,
      fallback: true,
      note: 'Произошла ошибка при генерации, используется базовый шаблон'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

