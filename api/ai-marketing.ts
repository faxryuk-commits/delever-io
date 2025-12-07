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

const SYSTEM_PROMPT = `Ты — гениальный SMM-маркетолог с 10-летним опытом. Твои тексты вызывают эмоции и желание купить прямо сейчас.

ТВОЯ ЗАДАЧА:
Создать контент-план для бизнеса на основе вводных данных. Тексты должны быть "живыми", без клише, с юмором (где уместно) и четкой структурой.

ВАЖНО: Адаптируй контент под ТИП БИЗНЕСА (cuisine):
- Ресторан/кафе → вкусные описания (хрустящий, сочный, ароматный)
- Магазин электроники → выгода, характеристики, сравнение
- Салон красоты → результат, трансформация, уверенность
- Фитнес → мотивация, результат, энергия
- Одежда/обувь → стиль, тренды, образ
- Любой другой → подбери подходящий стиль

ПРАВИЛА ДЛЯ INSTAGRAM:
- Используй формулу AIDA (Attention, Interest, Desire, Action).
- Заголовок должен цеплять с первых 3 слов.
- Разбивай текст на абзацы для легкого чтения.
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
  const brand = data.brandName || 'Ваш бизнес'
  const businessType = data.cuisine?.toLowerCase() || ''
  
  // Определяем тип бизнеса для адаптации контента
  const isFood = businessType.includes('ресторан') || businessType.includes('кафе') || businessType.includes('еда') || 
                 businessType.includes('restoran') || businessType.includes('food') || businessType.includes('fastfud')
  const isBeauty = businessType.includes('салон') || businessType.includes('красот') || businessType.includes('маникюр') ||
                   businessType.includes('salon') || businessType.includes('beauty')
  const isFitness = businessType.includes('фитнес') || businessType.includes('спорт') || businessType.includes('gym') ||
                    businessType.includes('fitness') || businessType.includes('sport')
  const isShop = businessType.includes('магазин') || businessType.includes('shop') || businessType.includes('store') ||
                 businessType.includes("do'kon") || businessType.includes('электроник') || businessType.includes('одежд')
  
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
  
  // Адаптивные хештеги по типу бизнеса
  const getHashtags = () => {
    if (isFood) {
      return lang === 'ru' ? ['#ресторан', '#доставка', '#еда', '#акция', '#вкусно', '#ташкент', '#food', '#instafood']
        : lang === 'uz' ? ['#restoran', '#yetkazib_berish', '#ovqat', '#aksiya', '#mazali', '#toshkent', '#food']
        : ['#restaurant', '#delivery', '#food', '#promo', '#delicious', '#tashkent', '#instafood']
    }
    if (isBeauty) {
      return lang === 'ru' ? ['#салонкрасоты', '#маникюр', '#красота', '#уход', '#ташкент', '#beauty', '#nails', '#spa']
        : lang === 'uz' ? ['#salon', '#manikur', '#goʻzallik', '#toshkent', '#beauty', '#nails', '#spa']
        : ['#beautysalon', '#manicure', '#beauty', '#skincare', '#tashkent', '#nails', '#spa']
    }
    if (isFitness) {
      return lang === 'ru' ? ['#фитнес', '#спорт', '#тренировка', '#зож', '#ташкент', '#fitness', '#gym', '#workout']
        : lang === 'uz' ? ['#fitnes', '#sport', '#mashq', '#toshkent', '#fitness', '#gym', '#workout']
        : ['#fitness', '#gym', '#workout', '#healthy', '#tashkent', '#sport', '#training']
    }
    if (isShop) {
      return lang === 'ru' ? ['#магазин', '#скидки', '#акция', '#шоппинг', '#ташкент', '#sale', '#shopping', '#store']
        : lang === 'uz' ? ['#dokon', '#chegirma', '#aksiya', '#toshkent', '#sale', '#shopping', '#store']
        : ['#shop', '#sale', '#discount', '#shopping', '#tashkent', '#store', '#deals']
    }
    return lang === 'ru' ? ['#бизнес', '#акция', '#скидки', '#ташкент', '#узбекистан', '#promo', '#sale']
      : lang === 'uz' ? ['#biznes', '#aksiya', '#chegirma', '#toshkent', '#uzbekiston', '#promo', '#sale']
      : ['#business', '#promo', '#sale', '#discount', '#tashkent', '#uzbekistan', '#deals']
  }
  
  // Адаптивные тексты по типу бизнеса
  const instagramPosts = lang === 'ru'
    ? [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} представляет то, что вы искали! ${productDetails}\n\nПочему выбирают нас:\n✅ Лучшее качество\n✅ Выгодные цены\n✅ Быстрый сервис\n\n👇 Успейте воспользоваться предложением — ссылка в шапке профиля!`,
        `Ищете что-то особенное? 🤔\n\n${promo} от ${brand} — ваш лучший выбор! ${productDetails}\n\nПорадуйте себя уже сегодня! 🚀\n\n📞 +998 78 113 98 13`,
        `✨ ${brand} — качество, которому доверяют!\n\n${promo}\n${productDetails}\n\nУбедитесь сами! Ждем ваших отзывов в комментариях 👇`
      ]
    : lang === 'uz'
    ? [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} dan zo'r taklif! ${productDetails}\n\nNega bizni tanlashadi:\n✅ Eng yaxshi sifat\n✅ Qulay narx\n✅ Tez xizmat\n\n👇 Hoziroq foydalaning — bio'dagi link!`,
        `Maxsus narsa qidiryapsizmi? 🤔\n\n${brand} dan ${promo} — eng yaxshi tanlov! ${productDetails}\n\nBugun o'zingizni siylab qo'ying! 🚀\n\n📞 +998 78 113 98 13`,
        `✨ ${brand} — ishonchli sifat!\n\n${promo}\n${productDetails}\n\nO'zingiz ko'ring! Fikringizni yozing 👇`
      ]
    : [
        `🔥 ${promo.toUpperCase()}!\n\n${brand} presents exactly what you've been looking for! ${productDetails}\n\nWhy choose us:\n✅ Best quality\n✅ Great prices\n✅ Fast service\n\n👇 Don't miss out — link in bio!`,
        `Looking for something special? 🤔\n\n${promo} from ${brand} is your best choice! ${productDetails}\n\nTreat yourself today! 🚀\n\n📞 +998 78 113 98 13`,
        `✨ ${brand} — quality you can trust!\n\n${promo}\n${productDetails}\n\nSee for yourself! Leave your feedback below 👇`
      ]
  
  const telegramPosts = lang === 'ru'
    ? [
        `⚡️ **${promo}** уже доступно!\n\nДрузья, ${brand} радует вас новинкой! ${productDetails}\n\nНе упустите возможность!\n\n👉 [Подробнее](https://delever.io)\n📞 +998 78 113 98 13`,
        `🎯 **${promo} — то, что вам нужно!**\n\n${brand} знает, что вы ищете. ${productDetails}\n\n🚀 Быстро, качественно, выгодно!\n\nЖмите кнопку ниже 👇`,
        `👋 Всем привет! У нас отличная новость!\n\n**${promo}** — именно то, что нужно. ${productDetails}\n\nПриходите к нам или заказывайте онлайн! 📦`
      ]
    : lang === 'uz'
    ? [
        `⚡️ **${promo}** tayyor!\n\nDo'stlar, ${brand} dan yangilik! ${productDetails}\n\nImkoniyatni qo'ldan bermang!\n\n👉 [Batafsil](https://delever.io)\n📞 +998 78 113 98 13`,
        `🎯 **${promo} — sizga kerak narsa!**\n\n${brand} nimani qidirayotganingizni biladi. ${productDetails}\n\n🚀 Tez, sifatli, qulay!\n\nPastdagi tugmani bosing 👇`,
        `👋 Salom hammaga! Ajoyib yangilik!\n\n**${promo}** — aynan kerakli narsa. ${productDetails}\n\nBizga keling yoki onlayn buyurtma qiling! 📦`
      ]
    : [
        `⚡️ **${promo}** is now available!\n\nFriends, ${brand} has great news! ${productDetails}\n\nDon't miss this opportunity!\n\n👉 [Learn more](https://delever.io)\n📞 +998 78 113 98 13`,
        `🎯 **${promo} — exactly what you need!**\n\n${brand} knows what you're looking for. ${productDetails}\n\n🚀 Fast, quality, affordable!\n\nClick the button below 👇`,
        `👋 Hello everyone! Great news!\n\n**${promo}** — just what you need. ${productDetails}\n\nVisit us or order online! 📦`
      ]
  
  const storiesIdeas = lang === 'ru'
    ? [
        `🎥 **Сценарий 1:** Покажите ${promo} крупным планом, затем довольного клиента. Текст: "Тот самый момент..."`,
        `🎥 **Сценарий 2:** Опрос: "Уже знакомы с ${promo}?" (Да/Хочу попробовать). Красивое фото на фоне.`,
        `🎥 **Сценарий 3:** Закулисье: покажите процесс работы. Живая атмосфера.`
      ]
    : lang === 'uz'
    ? [
        `🎥 **G'oya 1:** ${promo} ni yaqindan ko'rsating, keyin mamnun mijozni. Matn: "Mana shu lahza..."`,
        `🎥 **G'oya 2:** So'rovnoma: "${promo} bilan tanishmisiz?" (Ha/Sinab ko'rmoqchiman). Chiroyli fon rasmi.`,
        `🎥 **G'oya 3:** Parda ortidan: ish jarayonini ko'rsating. Jonli muhit.`
      ]
    : [
        `🎥 **Scenario 1:** Show ${promo} up close, then a happy customer. Text: "That moment..."`,
        `🎥 **Scenario 2:** Poll: "Do you know ${promo}?" (Yes/Want to try). Beautiful background photo.`,
        `🎥 **Scenario 3:** Behind the scenes: show the work process. Live atmosphere.`
      ]
  
  return {
    instagram_posts: instagramPosts,
    telegram_posts: telegramPosts,
    stories_ideas: storiesIdeas,
    hashtags: getHashtags()
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
