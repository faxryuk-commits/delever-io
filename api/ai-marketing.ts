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

const SYSTEM_PROMPT = `Ты — гениальный SMM-маркетолог с 10-летним опытом продвижения ресторанов. Твои тексты вызывают аппетит, эмоции и желание купить прямо сейчас.

ТВОЯ ЗАДАЧА:
Создать контент-план для ресторана на основе вводных данных. Тексты должны быть "живыми", без клише, с юмором (где уместно) и четкой структурой.

ПРАВИЛА ДЛЯ INSTAGRAM:
- Используй формулу AIDA (Attention, Interest, Desire, Action).
- Заголовок должен цеплять с первых 3 слов.
- Разбивай текст на абзацы для легкого чтения.
- Добавляй "вкусные" описания (хрустящий, сочный, ароматный).
- В конце ВСЕГДА призыв к действию (CTA).

ПРАВИЛА ДЛЯ TELEGRAM:
- Более личный, дружеский тон.
- Можно использовать буллиты и списки.
- Четкий оффер.

ПРАВИЛА ДЛЯ STORIES:
- Сценарии должны быть вовлекающими.
- Предлагай интерактив (опросы, реакции).
- Визуальные описания.

ЯЗЫК:
- Пиши строго на языке, указанном в параметре language.
- Для узбекского языка используй живой, разговорный стиль, а не официальный.

ФОРМАТ ОТВЕТА:
Верни ТОЛЬКО валидный JSON без markdown.`

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
  
  // Используем данные из URL, если они есть
  let promo = data.promoDescription || 'Специальное предложение'
  let productDetails = ''
  
  if (productData?.extracted) {
    if (productData.title && !data.promoDescription) {
      promo = productData.title
    }
    if (productData.description) {
      productDetails += `\n\n${productData.description}`
    }
    if (productData.price) {
      productDetails += `\n💰 Цена: ${productData.price}`
    }
    if (productData.components && productData.components.length > 0) {
      productDetails += `\n\nСостав: ${productData.components.slice(0, 5).join(', ')}`
    }
  }
  
  const hashtags = lang === 'ru' 
    ? ['#ресторан', '#доставка', '#еда', '#акция', '#вкусно', '#ташкент', '#узбекистан', '#food', '#instafood']
    : lang === 'uz'
    ? ['#restoran', '#yetkazib_berish', '#ovqat', '#aksiya', '#mazali', '#toshkent', '#uzbekiston', '#food', '#instafood']
    : ['#restaurant', '#delivery', '#food', '#promo', '#delicious', '#tashkent', '#uzbekistan', '#food', '#instafood']
  
  const instagramPosts = lang === 'ru'
    ? [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} представляет новинку, которая покорит ваше сердце (и желудок 😉). ${productDetails}\n\nПочему стоит попробовать:\n✅ Невероятный вкус\n✅ Свежие ингредиенты\n✅ Быстрая доставка\n\n👇 Заказывайте прямо сейчас по ссылке в шапке профиля или звоните!`,
        `Когда хочется чего-то особенного... 🤔\n\n${promo} от ${brand} — идеальный выбор! ${productDetails}\n\nУстройте себе праздник вкуса уже сегодня. 🚀\n\n📞 +998 78 113 98 13`,
        `🍽️ ${brand} — это не просто еда, это эмоции!\n\n${promo}\n${productDetails}\n\nПопробуйте и убедитесь сами! Ждем ваших отзывов в комментариях 👇`
      ]
    : lang === 'uz'
    ? [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} sizning yuragingizni (va qorningizni 😉) zabt etadigan yangilikni taqdim etadi. ${productDetails}\n\nNima uchun tatib ko'rish kerak:\n✅ Betakror ta'm\n✅ Yangi masalliqlar\n✅ Tez yetkazib berish\n\n👇 Hoziroq profil sarlavhasidagi havola orqali buyurtma bering yoki qo'ng'iroq qiling!`,
        `O'zgacha bir narsa xohlaganda... 🤔\n\n${brand} dan ${promo} — ajoyib tanlov! ${productDetails}\n\nBugunoq o'zingizga ta'm bayramini uyushtiring. 🚀\n\n📞 +998 78 113 98 13`,
        `🍽️ ${brand} — bu shunchaki ovqat emas, bu hissiyotlar!\n\n${promo}\n${productDetails}\n\nTatib ko'ring va o'zingiz ishonch hosil qiling! Izohlarda fikrlaringizni kutamiz 👇`
      ]
    : [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} presents a novelty that will win your heart (and stomach 😉). ${productDetails}\n\nWhy you should try it:\n✅ Incredible taste\n✅ Fresh ingredients\n✅ Fast delivery\n\n👇 Order right now via the link in bio or call us!`,
        `When you want something special... 🤔\n\n${promo} from ${brand} is the perfect choice! ${productDetails}\n\nTreat yourself to a feast of taste today. 🚀\n\n📞 +998 78 113 98 13`,
        `🍽️ ${brand} — it's not just food, it's emotions!\n\n${promo}\n${productDetails}\n\nTry it and see for yourself! We are waiting for your feedback in the comments 👇`
      ]
  
  const telegramPosts = lang === 'ru'
    ? [
        `⚡️ **${promo}** уже здесь!\n\nДрузья, ${brand} радует вас новинкой! ${productDetails}\n\nЗаказывайте доставку и наслаждайтесь вкусом, не выходя из дома. \n\n👉 [Заказать онлайн](https://delever.io)\n📞 +998 78 113 98 13`,
        `🍔 **Голод не тетка, а повод заказать ${promo}!**\n\n${brand} знает толк во вкусной еде. ${productDetails}\n\n🚀 Доставим горячим за 45 минут!\n\nЖмите кнопку ниже 👇`,
        `👋 Всем привет! У нас для вас кое-что вкусненькое.\n\n**${promo}** — то, что нужно для отличного дня. ${productDetails}\n\nЗаходите в гости или заказывайте доставку! 📦`
      ]
    : lang === 'uz'
    ? [
        `⚡️ **${promo}** endi shu yerda!\n\nDo'stlar, ${brand} sizni yangilik bilan xursand qiladi! ${productDetails}\n\nYetkazib berishni buyurtma qiling va uydan chiqmasdan ta'mdan bahramand bo'ling.\n\n👉 [Onlayn buyurtma](https://delever.io)\n📞 +998 78 113 98 13`,
        `🍔 **Qorin ochligi — ${promo} buyurtma qilish uchun sabab!**\n\n${brand} mazali ovqatni yaxshi biladi. ${productDetails}\n\n🚀 45 daqiqada issiq holda yetkazamiz!\n\nQuyidagi tugmani bosing 👇`,
        `👋 Hammaga salom! Bizda siz uchun mazali narsa bor.\n\n**${promo}** — ajoyib kun uchun aynan kerakli narsa. ${productDetails}\n\nMehmonga keling yoki yetkazib berishni buyurtma qiling! 📦`
      ]
    : [
        `⚡️ **${promo}** is here!\n\nFriends, ${brand} pleases you with a novelty! ${productDetails}\n\nOrder delivery and enjoy the taste without leaving home.\n\n👉 [Order online](https://delever.io)\n📞 +998 78 113 98 13`,
        `🍔 **Hunger is a reason to order ${promo}!**\n\n${brand} knows good food. ${productDetails}\n\n🚀 Delivered hot in 45 minutes!\n\nClick the button below 👇`,
        `👋 Hello everyone! We have something tasty for you.\n\n**${promo}** — just what you need for a great day. ${productDetails}\n\nCome visit us or order delivery! 📦`
      ]
  
  const storiesIdeas = lang === 'ru'
    ? [
        `🎥 **Сценарий 1:** Покажите крупным планом ${promo}, затем реакцию довольного клиента. Текст: "Тот самый момент..."`,
        `🎥 **Сценарий 2:** Опрос: "А вы уже пробовали ${promo}?" (Да/Хочу). На фоне аппетитное фото.`,
        `🎥 **Сценарий 3:** "Закулисье": как готовится ${promo}. Звуки жарки/нарезки (ASMR).`
      ]
    : lang === 'uz'
    ? [
        `🎥 **Ssenariy 1:** ${promo} ni yaqindan ko'rsating, so'ngra mamnun mijoz reaksiyasini. Matn: "O'sha lahza..."`,
        `🎥 **Ssenariy 2:** So'rovnoma: "Siz ${promo} ni tatib ko'rdingizmi?" (Ha/Xohlayman). Orqa fonda ishtaha ochuvchi rasm.`,
        `🎥 **Ssenariy 3:** "Parda ortida": ${promo} qanday tayyorlanishi. Qovurish/kesish tovushlari (ASMR).`
      ]
    : [
        `🎥 **Scenario 1:** Show a close-up of ${promo}, then a happy customer's reaction. Text: "That moment..."`,
        `🎥 **Scenario 2:** Poll: "Have you tried ${promo} yet?" (Yes/Want to). Appetizing photo in background.`,
        `🎥 **Scenario 3:** "Behind the scenes": how ${promo} is prepared. Frying/cutting sounds (ASMR).`
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
    productInfo = `\n\nДАННЫЕ ИЗ ССЫЛКИ НА ТОВАР (ИСПОЛЬЗУЙ ОБЯЗАТЕЛЬНО):\n`
    if (productData.title) productInfo += `- Название товара: ${productData.title}\n`
    if (productData.description) productInfo += `- Описание: ${productData.description}\n`
    if (productData.price) productInfo += `- Цена: ${productData.price}\n`
    if (productData.components && productData.components.length > 0) {
      productInfo += `- Состав/Ингредиенты: ${productData.components.join(', ')}\n`
    }
    productInfo += `\nВАЖНО: Опиши этот товар максимально "вкусно" и подробно, используя данные выше.`
  }
  
  return `Сгенерируй контент-план для ресторана.

ВВОДНЫЕ ДАННЫЕ:
- Название бренда: ${data.brandName}
- Тип кухни: ${data.cuisine}
- Основной оффер/блюдо: ${data.promoDescription}
- Цель: ${goalDesc}
- Каналы: ${data.channels.join(', ')}
- Язык: ${langName}${productInfo}

ФОРМАТ JSON:
{
  "instagram_posts": ["Пост 1 (яркий, продающий)", "Пост 2 (сторителлинг)", "Пост 3 (короткий, с юмором)"],
  "telegram_posts": ["Пост 1 (дружеский)", "Пост 2 (новостной)", "Пост 3 (продающий)"],
  "stories_ideas": ["Идея 1", "Идея 2", "Идея 3"],
  "hashtags": ["#хэштег1", "#хэштег2", "...до 15 хэштегов"]
}`
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
        console.log('AI Marketing: Successfully extracted product data')
      } else {
        console.log('AI Marketing: Could not extract product data from URL')
      }
    }

    // Попытка использовать альтернативный AI сервис (Gemini), если OpenAI недоступен
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
    
    // Call OpenAI (или альтернативный сервис)
    console.log('AI Marketing: Calling AI API...', {
      brandName: requestBody.brandName,
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
      
      // Проверяем блокировку региона
      const lowerError = errorData.toLowerCase()
      const isRegionBlocked = lowerError.includes('unsupported_country') || 
                              lowerError.includes('region') || 
                              lowerError.includes('forbidden') ||
                              response.status === 403
      
      // Если регион заблокирован, пробуем Gemini
      if (isRegionBlocked && geminiKey) {
        console.log('AI Marketing: Region blocked, trying Google Gemini 2.0 Flash...')
        
        try {
          // 1. Пробуем нативный Gemini API endpoint (generateContent)
          // Используем gemini-2.0-flash - актуальная стабильная модель
          const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${SYSTEM_PROMPT}\n\n${getUserPrompt(requestBody, productData)}`
                }]
              }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 2000,
                responseMimeType: 'application/json',
              },
            }),
          })

          console.log('AI Marketing: Gemini response status:', geminiResponse.status)

          if (geminiResponse.ok) {
            const geminiData = await geminiResponse.json()
            const geminiContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
            
            if (geminiContent) {
              try {
                const result = JSON.parse(geminiContent)
                console.log('AI Marketing: ✅ Generated content using Gemini 1.5 Flash')
                return new Response(JSON.stringify(result), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                })
              } catch (parseError) {
                console.error('AI Marketing: Failed to parse Gemini response')
              }
            }
          } else {
            const errText = await geminiResponse.text()
            console.error('AI Marketing: Gemini API error:', errText)
          }
        } catch (geminiError) {
          console.error('AI Marketing: Gemini request failed:', geminiError)
        }
      }
      
      // Fallback если ничего не сработало
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

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Empty response from OpenAI')
    }

    const result = JSON.parse(content)
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('AI Marketing API error:', error)
    
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
