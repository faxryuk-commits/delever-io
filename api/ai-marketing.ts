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

const SYSTEM_PROMPT = `Ты — гениальный SMM-маркетолог с 10-летним опытом. Твои тексты вызывают эмоции и желание действовать прямо сейчас.

ТВОЯ ЗАДАЧА:
Создать контент-план для бизнеса на основе вводных данных. Тексты должны быть "живыми", без клише, с юмором (где уместно) и четкой структурой.

АДАПТИРУЙ ПОД ТИП БИЗНЕСА (cuisine):
- Ресторан/кафе → вкусные описания (хрустящий, сочный, ароматный)
- Магазин электроники → выгода, характеристики, сравнение
- Салон красоты → результат, трансформация, уверенность
- Фитнес → мотивация, результат, энергия
- Одежда/обувь → стиль, тренды, образ
- Любой другой → подбери подходящий стиль

АДАПТИРУЙ ПОД ЦЕЛЬ (goal):
- delivery_promo → акцент на быструю доставку, удобство, "не выходя из дома"
- pickup_promo → акцент на самовывоз, скидку за самовывоз, "забери сам — сэкономь"
- new_product → интрига, "наконец-то", эксклюзивность, первые покупатели
- news_announcement → информационный стиль, "важная новость", четкие факты
- grand_opening → праздник, приглашение, подарки первым гостям
- event → дата, время, место, что будет интересного
- promo_discount → срочность, ограниченное время, экономия
- holiday_promo → праздничное настроение, подарки, поздравления
- return_customers → "мы скучали", персональное предложение, эксклюзив
- loyalty_program → накопление бонусов, привилегии, VIP-статус
- weekday_boost → "не жди выходных", специальные цены в будни
- review_request → благодарность, просьба поделиться мнением, бонус за отзыв

ПРАВИЛА ДЛЯ INSTAGRAM:
- Формула AIDA (Attention, Interest, Desire, Action)
- Заголовок цепляет с первых 3 слов
- Разбивай на абзацы
- В конце ВСЕГДА призыв к действию (CTA)

ПРАВИЛА ДЛЯ TELEGRAM:
- Личный, дружеский тон
- Буллиты и списки
- Четкий оффер

ПРАВИЛА ДЛЯ STORIES:
- Вовлекающие сценарии
- Интерактив (опросы, реакции)
- Визуальные описания

ЯЗЫК:
- Пиши строго на языке из параметра language
- Узбекский — живой, разговорный стиль

ФОРМАТ: Верни ТОЛЬКО валидный JSON без markdown.`

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
  
  // Получаем цель для адаптации контента
  const goal = data.goal || ''
  
  // Генерация контента в зависимости от цели
  const getInstagramPosts = () => {
    // Самовывоз
    if (goal === 'pickup_promo') {
      return lang === 'ru' ? [
        `🏃 САМОВЫВОЗ = ВЫГОДА!\n\n${brand} дарит скидку тем, кто забирает заказ сам!\n\n${promo}\n${productDetails}\n\n💰 Экономьте на доставке\n⏱️ Без ожидания курьера\n🎁 +бонусы за самовывоз\n\n📍 Ждем вас по адресу!`,
        `Забери сам — сэкономь! 💪\n\n${brand} ценит ваше время. ${promo}\n${productDetails}\n\nСамовывоз — это:\n✅ Быстрее\n✅ Дешевле\n✅ Всегда свежее\n\n📍 Адрес в шапке профиля`,
        `🎯 Лайфхак от ${brand}!\n\nСамовывоз = скидка + бонусы. ${promo}\n${productDetails}\n\nЗачем переплачивать за доставку? 😉\n\n👇 Оформляй заказ и забирай!`
      ] : lang === 'uz' ? [
        `🏃 O'ZI OLIB KETISH = TEJASH!\n\n${brand} o'zi olib ketuvchilarga chegirma beradi!\n\n${promo}\n${productDetails}\n\n💰 Yetkazib berishga pul to'lamaysiz\n⏱️ Kuryerni kutmaysiz\n🎁 +bonuslar\n\n📍 Manzilda kutamiz!`,
        `O'zing ol — teja! 💪\n\n${brand} vaqtingizni qadrlaydi. ${promo}\n${productDetails}\n\nO'zi olib ketish:\n✅ Tezroq\n✅ Arzonroq\n✅ Yangi\n\n📍 Manzil bio'da`,
        `🎯 ${brand} dan maslahat!\n\nO'zi olib ketish = chegirma + bonus. ${promo}\n${productDetails}\n\nNega ortiqcha pul to'laysiz? 😉\n\n👇 Buyurtma bering!`
      ] : [
        `🏃 PICKUP = SAVINGS!\n\n${brand} rewards those who pick up their orders!\n\n${promo}\n${productDetails}\n\n💰 Save on delivery\n⏱️ No waiting for courier\n🎁 +bonuses for pickup\n\n📍 Visit us!`,
        `Pick up & save! 💪\n\n${brand} values your time. ${promo}\n${productDetails}\n\nPickup means:\n✅ Faster\n✅ Cheaper\n✅ Always fresh\n\n📍 Address in bio`,
        `🎯 Life hack from ${brand}!\n\nPickup = discount + bonuses. ${promo}\n${productDetails}\n\nWhy pay extra for delivery? 😉\n\n👇 Order and pick up!`
      ]
    }
    
    // Доставка
    if (goal === 'delivery_promo') {
      return lang === 'ru' ? [
        `🚚 ДОСТАВКА на дом!\n\n${brand} привезет прямо к двери. ${promo}\n${productDetails}\n\n✅ Бесплатно от 50 000 сум\n✅ 30-45 минут\n✅ Горячее и свежее\n\n👇 Заказывай — не выходи из дома!`,
        `Лень выходить? Не надо! 😎\n\n${brand} доставит ${promo} прямо к вам!\n${productDetails}\n\n🚀 Быстрая доставка\n📦 Надежная упаковка\n\n📞 +998 78 113 98 13`,
        `🏠 Оставайся дома — мы везем!\n\n${brand} заботится о вашем комфорте. ${promo}\n${productDetails}\n\nДоставка работает ежедневно!\n\n👇 Ссылка в шапке профиля`
      ] : lang === 'uz' ? [
        `🚚 UYGA YETKAZIB BERAMIZ!\n\n${brand} eshigingizgacha olib keladi. ${promo}\n${productDetails}\n\n✅ 50 000 so'mdan bepul\n✅ 30-45 daqiqa\n✅ Issiq va yangi\n\n👇 Buyurtma bering — uydan chiqmang!`,
        `Chiqishga dangasa? Kerak emas! 😎\n\n${brand} ${promo} ni sizga yetkazadi!\n${productDetails}\n\n🚀 Tez yetkazib berish\n📦 Ishonchli qadoqlash\n\n📞 +998 78 113 98 13`,
        `🏠 Uyda qoling — biz olib kelamiz!\n\n${brand} qulayligingiz haqida o'ylaydi. ${promo}\n${productDetails}\n\nYetkazib berish har kuni ishlaydi!\n\n👇 Bio'dagi link`
      ] : [
        `🚚 HOME DELIVERY!\n\n${brand} delivers right to your door. ${promo}\n${productDetails}\n\n✅ Free from 50,000 sum\n✅ 30-45 minutes\n✅ Hot and fresh\n\n👇 Order now — stay home!`,
        `Too lazy to go out? Don't! 😎\n\n${brand} will deliver ${promo} to you!\n${productDetails}\n\n🚀 Fast delivery\n📦 Reliable packaging\n\n📞 +998 78 113 98 13`,
        `🏠 Stay home — we deliver!\n\n${brand} cares about your comfort. ${promo}\n${productDetails}\n\nDelivery works daily!\n\n👇 Link in bio`
      ]
    }
    
    // Новость / объявление
    if (goal === 'news_announcement') {
      return lang === 'ru' ? [
        `📢 ВАЖНАЯ НОВОСТЬ!\n\n${brand} сообщает: ${promo}\n${productDetails}\n\nЭто важно знать каждому нашему клиенту!\n\n💬 Вопросы? Пишите в директ!`,
        `🔔 Внимание, новость!\n\n${brand} рад сообщить: ${promo}\n${productDetails}\n\nСледите за обновлениями!\n\n👇 Сохраняйте пост, чтобы не потерять`,
        `📣 ${brand} объявляет!\n\n${promo}\n${productDetails}\n\nБудьте в курсе — подписывайтесь! 🔔`
      ] : lang === 'uz' ? [
        `📢 MUHIM YANGILIK!\n\n${brand} xabar beradi: ${promo}\n${productDetails}\n\nHar bir mijozimiz bilishi kerak!\n\n💬 Savollar? DMga yozing!`,
        `🔔 Diqqat, yangilik!\n\n${brand} xabar beradi: ${promo}\n${productDetails}\n\nYangilanishlarni kuzating!\n\n👇 Postni saqlang`,
        `📣 ${brand} e'lon qiladi!\n\n${promo}\n${productDetails}\n\nXabardor bo'ling — obuna bo'ling! 🔔`
      ] : [
        `📢 IMPORTANT NEWS!\n\n${brand} announces: ${promo}\n${productDetails}\n\nEvery customer should know this!\n\n💬 Questions? DM us!`,
        `🔔 Attention, news!\n\n${brand} is happy to announce: ${promo}\n${productDetails}\n\nStay tuned for updates!\n\n👇 Save this post`,
        `📣 ${brand} announces!\n\n${promo}\n${productDetails}\n\nStay informed — follow us! 🔔`
      ]
    }
    
    // Открытие
    if (goal === 'grand_opening') {
      return lang === 'ru' ? [
        `🎊 МЫ ОТКРЫЛИСЬ!\n\n${brand} приглашает на открытие! ${promo}\n${productDetails}\n\n🎁 Подарки первым гостям\n🎉 Праздничная атмосфера\n📍 Новый адрес в шапке!\n\n👇 Ждем вас!`,
        `🚀 GRAND OPENING!\n\n${brand} открывает двери! ${promo}\n${productDetails}\n\nПервые 100 гостей получат подарок! 🎁\n\n📅 Приходите сегодня!`,
        `✨ Новая точка ${brand}!\n\n${promo}\n${productDetails}\n\nМы стали ближе к вам!\n\n🎉 Праздничные скидки в честь открытия!\n\n👇 Адрес в шапке`
      ] : lang === 'uz' ? [
        `🎊 BIZ OCHILDIK!\n\n${brand} ochilishga taklif qiladi! ${promo}\n${productDetails}\n\n🎁 Birinchi mehmonlarga sovg'a\n🎉 Bayram muhiti\n📍 Yangi manzil bio'da!\n\n👇 Kutamiz!`,
        `🚀 GRAND OPENING!\n\n${brand} eshiklarini ochadi! ${promo}\n${productDetails}\n\nBirinchi 100 mehmon sovg'a oladi! 🎁\n\n📅 Bugun keling!`,
        `✨ ${brand} ning yangi filiali!\n\n${promo}\n${productDetails}\n\nSizga yaqinroq bo'ldik!\n\n🎉 Ochilish sharafiga chegirmalar!\n\n👇 Manzil bio'da`
      ] : [
        `🎊 WE'RE OPEN!\n\n${brand} invites you to the opening! ${promo}\n${productDetails}\n\n🎁 Gifts for first guests\n🎉 Festive atmosphere\n📍 New address in bio!\n\n👇 See you there!`,
        `🚀 GRAND OPENING!\n\n${brand} opens its doors! ${promo}\n${productDetails}\n\nFirst 100 guests get a gift! 🎁\n\n📅 Come today!`,
        `✨ New ${brand} location!\n\n${promo}\n${productDetails}\n\nWe're closer to you now!\n\n🎉 Opening discounts!\n\n👇 Address in bio`
      ]
    }
    
    // Мероприятие
    if (goal === 'event') {
      return lang === 'ru' ? [
        `🎤 ПРИГЛАШАЕМ НА МЕРОПРИЯТИЕ!\n\n${brand} проводит: ${promo}\n${productDetails}\n\n📅 Дата: [уточните]\n⏰ Время: [уточните]\n📍 Место: [уточните]\n\n👇 Регистрация по ссылке!`,
        `🎉 Не пропустите!\n\n${brand} приглашает на ${promo}!\n${productDetails}\n\nБудет интересно:\n✨ [Что будет]\n🎁 Призы и подарки\n\n👇 Записывайтесь!`,
        `📣 Событие от ${brand}!\n\n${promo}\n${productDetails}\n\nВход свободный / по регистрации\n\n👇 Отмечайте друзей, кто хочет пойти!`
      ] : lang === 'uz' ? [
        `🎤 TADBIRGA TAKLIF!\n\n${brand} o'tkazadi: ${promo}\n${productDetails}\n\n📅 Sana: [aniqlanadi]\n⏰ Vaqt: [aniqlanadi]\n📍 Joy: [aniqlanadi]\n\n👇 Ro'yxatdan o'ting!`,
        `🎉 O'tkazib yubormang!\n\n${brand} ${promo} ga taklif qiladi!\n${productDetails}\n\nQiziqarli bo'ladi:\n✨ [Nima bo'ladi]\n🎁 Sovrinlar va sovg'alar\n\n👇 Yoziling!`,
        `📣 ${brand} dan tadbir!\n\n${promo}\n${productDetails}\n\nKirish bepul / ro'yxatdan o'tish bilan\n\n👇 Bormoqchi do'stlarni belgilang!`
      ] : [
        `🎤 JOIN OUR EVENT!\n\n${brand} presents: ${promo}\n${productDetails}\n\n📅 Date: [TBD]\n⏰ Time: [TBD]\n📍 Location: [TBD]\n\n👇 Register via link!`,
        `🎉 Don't miss it!\n\n${brand} invites you to ${promo}!\n${productDetails}\n\nIt will be exciting:\n✨ [What's happening]\n🎁 Prizes and gifts\n\n👇 Sign up!`,
        `📣 Event by ${brand}!\n\n${promo}\n${productDetails}\n\nFree entry / registration required\n\n👇 Tag friends who want to come!`
      ]
    }
    
    // Запрос отзыва
    if (goal === 'review_request') {
      return lang === 'ru' ? [
        `⭐ Ваше мнение важно!\n\n${brand} хочет стать лучше для вас.\n\n${promo}\n${productDetails}\n\nОставьте отзыв и получите бонус! 🎁\n\n👇 Ссылка в шапке профиля`,
        `💬 Поделитесь впечатлениями!\n\n${brand} благодарит вас за выбор!\n\n${promo}\n${productDetails}\n\nНапишите честный отзыв — это помогает нам расти! ❤️`,
        `🙏 Спасибо, что выбираете ${brand}!\n\n${promo}\n${productDetails}\n\nБудем рады вашему отзыву!\n\n⭐⭐⭐⭐⭐\n\n👇 Оставить отзыв`
      ] : lang === 'uz' ? [
        `⭐ Fikringiz muhim!\n\n${brand} siz uchun yaxshiroq bo'lishni xohlaydi.\n\n${promo}\n${productDetails}\n\nFikr qoldiring va bonus oling! 🎁\n\n👇 Bio'dagi link`,
        `💬 Taassurotlaringizni ulashing!\n\n${brand} tanlaganingiz uchun rahmat!\n\n${promo}\n${productDetails}\n\nHalol fikr yozing — bu bizga o'sishga yordam beradi! ❤️`,
        `🙏 ${brand} ni tanlaganingiz uchun rahmat!\n\n${promo}\n${productDetails}\n\nFikringizni kutamiz!\n\n⭐⭐⭐⭐⭐\n\n👇 Fikr qoldirish`
      ] : [
        `⭐ Your opinion matters!\n\n${brand} wants to be better for you.\n\n${promo}\n${productDetails}\n\nLeave a review and get a bonus! 🎁\n\n👇 Link in bio`,
        `💬 Share your experience!\n\n${brand} thanks you for choosing us!\n\n${promo}\n${productDetails}\n\nWrite an honest review — it helps us grow! ❤️`,
        `🙏 Thank you for choosing ${brand}!\n\n${promo}\n${productDetails}\n\nWe'd love your feedback!\n\n⭐⭐⭐⭐⭐\n\n👇 Leave a review`
      ]
    }
    
    // По умолчанию — универсальный контент
    return lang === 'ru' ? [
      `🔥 ${promo.toUpperCase()}!\n\n${brand} представляет то, что вы искали! ${productDetails}\n\nПочему выбирают нас:\n✅ Лучшее качество\n✅ Выгодные цены\n✅ Быстрый сервис\n\n👇 Успейте — ссылка в шапке!`,
      `Ищете что-то особенное? 🤔\n\n${promo} от ${brand} — ваш лучший выбор! ${productDetails}\n\nПорадуйте себя уже сегодня! 🚀\n\n📞 +998 78 113 98 13`,
      `✨ ${brand} — качество, которому доверяют!\n\n${promo}\n${productDetails}\n\nУбедитесь сами! 👇`
    ] : lang === 'uz' ? [
      `🔥 ${promo.toUpperCase()}!\n\n${brand} dan zo'r taklif! ${productDetails}\n\nNega bizni tanlashadi:\n✅ Eng yaxshi sifat\n✅ Qulay narx\n✅ Tez xizmat\n\n👇 Bio'dagi link!`,
      `Maxsus narsa qidiryapsizmi? 🤔\n\n${brand} dan ${promo} — eng yaxshi tanlov! ${productDetails}\n\nBugun o'zingizni siylab qo'ying! 🚀\n\n📞 +998 78 113 98 13`,
      `✨ ${brand} — ishonchli sifat!\n\n${promo}\n${productDetails}\n\nO'zingiz ko'ring! 👇`
    ] : [
      `🔥 ${promo.toUpperCase()}!\n\n${brand} presents what you've been looking for! ${productDetails}\n\nWhy choose us:\n✅ Best quality\n✅ Great prices\n✅ Fast service\n\n👇 Don't miss out — link in bio!`,
      `Looking for something special? 🤔\n\n${promo} from ${brand} is your best choice! ${productDetails}\n\nTreat yourself today! 🚀\n\n📞 +998 78 113 98 13`,
      `✨ ${brand} — quality you can trust!\n\n${promo}\n${productDetails}\n\nSee for yourself! 👇`
    ]
  }
  
  const instagramPosts = getInstagramPosts()
  
  // Telegram посты адаптируем под цель
  const telegramPosts = lang === 'ru'
    ? [
        `⚡️ **${promo}**\n\n${brand} ${goal === 'pickup_promo' ? 'ждет вас на самовывоз!' : goal === 'delivery_promo' ? 'доставит к вам!' : 'радует вас!'}\n${productDetails}\n\n${goal === 'pickup_promo' ? '🏃 Забери сам — получи скидку!' : goal === 'delivery_promo' ? '🚚 Доставка 30-45 мин!' : '👉 Подробнее по ссылке'}\n\n📞 +998 78 113 98 13`,
        `🎯 **${promo}**\n\n${brand} ${goal === 'news_announcement' ? 'сообщает важную новость!' : goal === 'grand_opening' ? 'открывает новую точку!' : 'знает, что вам нужно!'}\n${productDetails}\n\n${goal === 'event' ? '📅 Дата и время в посте' : '🚀 Не упустите возможность!'}\n\n👇 Жмите кнопку`,
        `👋 Привет от ${brand}!\n\n**${promo}**\n${productDetails}\n\n${goal === 'review_request' ? '⭐ Оставьте отзыв — получите бонус!' : 'Приходите к нам или заказывайте!'} 📦`
      ]
    : lang === 'uz'
    ? [
        `⚡️ **${promo}**\n\n${brand} ${goal === 'pickup_promo' ? 'sizni kutadi!' : goal === 'delivery_promo' ? 'yetkazib beradi!' : 'xursand qiladi!'}\n${productDetails}\n\n${goal === 'pickup_promo' ? '🏃 O\'zing ol — chegirma ol!' : goal === 'delivery_promo' ? '🚚 Yetkazish 30-45 daq!' : '👉 Batafsil link orqali'}\n\n📞 +998 78 113 98 13`,
        `🎯 **${promo}**\n\n${brand} ${goal === 'news_announcement' ? 'muhim yangilik xabar beradi!' : goal === 'grand_opening' ? 'yangi filial ochadi!' : 'sizga kerak narsani biladi!'}\n${productDetails}\n\n${goal === 'event' ? '📅 Sana va vaqt postda' : '🚀 Imkoniyatni qo\'ldan bermang!'}\n\n👇 Tugmani bosing`,
        `👋 ${brand} dan salom!\n\n**${promo}**\n${productDetails}\n\n${goal === 'review_request' ? '⭐ Fikr qoldiring — bonus oling!' : 'Bizga keling yoki buyurtma qiling!'} 📦`
      ]
    : [
        `⚡️ **${promo}**\n\n${brand} ${goal === 'pickup_promo' ? 'awaits you for pickup!' : goal === 'delivery_promo' ? 'will deliver to you!' : 'has great news!'}\n${productDetails}\n\n${goal === 'pickup_promo' ? '🏃 Pick up & save!' : goal === 'delivery_promo' ? '🚚 Delivery 30-45 min!' : '👉 Learn more via link'}\n\n📞 +998 78 113 98 13`,
        `🎯 **${promo}**\n\n${brand} ${goal === 'news_announcement' ? 'has important news!' : goal === 'grand_opening' ? 'opens a new location!' : 'knows what you need!'}\n${productDetails}\n\n${goal === 'event' ? '📅 Date and time in post' : '🚀 Don\'t miss out!'}\n\n👇 Click the button`,
        `👋 Hello from ${brand}!\n\n**${promo}**\n${productDetails}\n\n${goal === 'review_request' ? '⭐ Leave a review — get a bonus!' : 'Visit us or order!'} 📦`
      ]
  
  const storiesIdeas = lang === 'ru'
    ? [
        `🎥 **Сценарий 1:** ${goal === 'pickup_promo' ? 'Покажите очередь на самовывоз и довольных клиентов' : goal === 'grand_opening' ? 'Торжественное открытие: лента, шарики, первые гости' : `Покажите ${promo} крупным планом`}. Текст: "${goal === 'pickup_promo' ? 'Забрал сам — сэкономил!' : 'Тот самый момент...'}"`,
        `🎥 **Сценарий 2:** Опрос: "${goal === 'pickup_promo' ? 'Как вам удобнее: доставка или самовывоз?' : goal === 'delivery_promo' ? 'Любите заказывать домой?' : `Уже пробовали ${promo}?`}" Варианты ответов.`,
        `🎥 **Сценарий 3:** ${goal === 'event' ? 'Обратный отсчет до мероприятия' : goal === 'news_announcement' ? 'Серия сторис с раскрытием новости' : 'Закулисье: покажите процесс работы'}.`
      ]
    : lang === 'uz'
    ? [
        `🎥 **G'oya 1:** ${goal === 'pickup_promo' ? 'O\'zi olib ketuvchilar navbatini va mamnun mijozlarni ko\'rsating' : goal === 'grand_opening' ? 'Tantanali ochilish: lenta, sharlar, birinchi mehmonlar' : `${promo} ni yaqindan ko'rsating`}. Matn: "${goal === 'pickup_promo' ? 'O\'zim oldim — tejadim!' : 'Mana shu lahza...'}"`,
        `🎥 **G'oya 2:** So'rovnoma: "${goal === 'pickup_promo' ? 'Qanday qulay: yetkazish yoki o\'zi olib ketish?' : goal === 'delivery_promo' ? 'Uyga buyurtma qilishni yoqtirasizmi?' : `${promo} sinab ko'rdingizmi?`}" Javob variantlari.`,
        `🎥 **G'oya 3:** ${goal === 'event' ? 'Tadbirgacha teskari hisob' : goal === 'news_announcement' ? 'Yangilikni ochish bilan seriya stories' : 'Parda ortidan: ish jarayonini ko\'rsating'}.`
      ]
    : [
        `🎥 **Scenario 1:** ${goal === 'pickup_promo' ? 'Show pickup queue and happy customers' : goal === 'grand_opening' ? 'Grand opening: ribbon cutting, balloons, first guests' : `Show ${promo} up close`}. Text: "${goal === 'pickup_promo' ? 'Picked up — saved!' : 'That moment...'}"`,
        `🎥 **Scenario 2:** Poll: "${goal === 'pickup_promo' ? 'What\'s better: delivery or pickup?' : goal === 'delivery_promo' ? 'Love ordering home?' : `Tried ${promo} yet?`}" Answer options.`,
        `🎥 **Scenario 3:** ${goal === 'event' ? 'Countdown to event' : goal === 'news_announcement' ? 'Series of stories revealing the news' : 'Behind the scenes: show the work process'}.`
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

ФОРМАТ JSON (КРАТКИЙ):
{
  "instagram_posts": ["Пост 1 (короткий, яркий)", "Пост 2 (продающий)"],
  "telegram_posts": ["Пост 1 (дружеский)", "Пост 2 (новостной)"],
  "stories_ideas": ["Идея 1", "Идея 2"],
  "hashtags": ["#тег1", "#тег2", "...до 10"]
}

ВАЖНО: Отвечай ТОЛЬКО JSON, без markdown. Посты должны быть короткими (2-3 предложения).`
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

    // Попытка использовать альтернативные AI сервисы
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    const openrouterKey = process.env.OPENROUTER_API_KEY
    
    // Call OpenAI (или альтернативный сервис)
    console.log('AI Marketing: Calling AI API...', {
      brandName: requestBody.brandName,
      hasGemini: !!geminiKey,
      hasAnthropic: !!anthropicKey,
      hasOpenRouter: !!openrouterKey
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
                console.log('AI Marketing: ✅ Generated content using Gemini 2.0 Flash')
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
      
      // Пробуем Anthropic Claude если Gemini не сработал
      if (isRegionBlocked && anthropicKey) {
        console.log('AI Marketing: Trying Anthropic Claude...')
        
        try {
          const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: 'claude-3-haiku-20240307',
              max_tokens: 2000,
              messages: [
                {
                  role: 'user',
                  content: `${SYSTEM_PROMPT}\n\n${getUserPrompt(requestBody, productData)}\n\nОтвет дай ТОЛЬКО в формате JSON, без markdown.`
                }
              ],
            }),
          })

          console.log('AI Marketing: Claude response status:', claudeResponse.status)

          if (claudeResponse.ok) {
            const claudeData = await claudeResponse.json()
            const claudeContent = claudeData.content?.[0]?.text
            
            if (claudeContent) {
              try {
                // Извлекаем JSON из ответа (может быть обёрнут в markdown)
                let jsonStr = claudeContent
                const jsonMatch = claudeContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                                  claudeContent.match(/```\s*([\s\S]*?)\s*```/)
                if (jsonMatch) {
                  jsonStr = jsonMatch[1]
                }
                
                const result = JSON.parse(jsonStr)
                console.log('AI Marketing: ✅ Generated content using Claude')
                return new Response(JSON.stringify(result), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                })
              } catch (parseError) {
                console.error('AI Marketing: Failed to parse Claude response:', parseError)
              }
            }
          } else {
            const errText = await claudeResponse.text()
            console.error('AI Marketing: Claude API error:', errText)
          }
        } catch (claudeError) {
          console.error('AI Marketing: Claude request failed:', claudeError)
        }
      }
      
      // Пробуем OpenRouter с разными моделями
      if (isRegionBlocked && openrouterKey) {
        // Модели OpenRouter - быстрые модели первыми
        const modelsToTry = [
          'mistralai/mistral-7b-instruct',           // Mistral 7B - быстрый
          'meta-llama/llama-3.1-8b-instruct',        // Llama 3.1 8B
        ]
        
        for (const model of modelsToTry) {
          console.log(`AI Marketing: Trying OpenRouter with ${model}...`)
          try {
            // Таймаут 18 секунд - даём модели завершить генерацию
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 18000)
            
            const openrouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openrouterKey}`,
                'HTTP-Referer': 'https://delever.io',
                'X-Title': 'Delever AI Marketing',
              },
              body: JSON.stringify({
                model: model,
                messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  { role: 'user', content: getUserPrompt(requestBody, productData) + '\n\nВерни ответ СТРОГО в формате JSON без markdown.' },
                ],
                temperature: 0.7,
                max_tokens: 3500,
              }),
            })

            clearTimeout(timeout)
            
            if (openrouterResponse.ok) {
              const openrouterData = await openrouterResponse.json()
              const openrouterContent = openrouterData.choices?.[0]?.message?.content
              
              if (openrouterContent) {
                try {
                  let jsonStr = openrouterContent.trim()
                  
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
                  if (result.instagram_posts || result.telegram_posts) {
                    console.log(`AI Marketing: ✅ Generated using OpenRouter (${model})`)
                    return new Response(JSON.stringify(result), {
                      status: 200,
                      headers: { 'Content-Type': 'application/json' },
                    })
                  } else {
                    console.log(`AI Marketing: ${model} returned invalid structure`)
                    continue
                  }
                } catch (parseError) {
                  console.log(`AI Marketing: Failed to parse ${model} response:`, openrouterContent.slice(0, 100))
                  continue
                }
              }
            } else {
              const errText = await openrouterResponse.text()
              console.log(`AI Marketing: ${model} failed:`, errText.slice(0, 200))
              continue
            }
          } catch (openrouterError) {
            console.log(`AI Marketing: ${model} error`)
            continue
          }
        }
        console.log('AI Marketing: All OpenRouter models failed')
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
