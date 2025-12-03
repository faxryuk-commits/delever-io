export const config = {
  runtime: 'edge',
}

// Хранилище сессий (в реальном проекте использовать Redis/DB)
const sessions = new Map<number, {
  history: { role: 'user' | 'assistant', content: string }[]
  leadScore: number
  waitingFor?: 'name' | 'phone'
  userName?: string
}>()

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('OK', { status: 200 })
  }

  const clientBotToken = process.env.TELEGRAM_CLIENT_BOT_TOKEN
  const salesChatId = process.env.TELEGRAM_CHAT_ID
  const openaiKey = process.env.OPENAI_API_KEY
  const amoSubdomain = process.env.AMOCRM_SUBDOMAIN
  const amoAccessToken = process.env.AMOCRM_ACCESS_TOKEN

  if (!clientBotToken) {
    console.error('TELEGRAM_CLIENT_BOT_TOKEN not configured')
    return new Response('OK', { status: 200 })
  }

  try {
    const update = await req.json()
    
    // Обработка сообщений
    if (update.message) {
      const chatId = update.message.chat.id
      const userId = update.message.from.id
      const text = update.message.text || ''
      const userName = update.message.from.first_name || 'Пользователь'

      // Получаем или создаём сессию
      let session = sessions.get(userId) || {
        history: [],
        leadScore: 0
      }

      // Команда /start
      if (text === '/start') {
        session = { history: [], leadScore: 0 }
        sessions.set(userId, session)
        
        await sendTelegramMessage(clientBotToken, chatId, 
          `Привет, ${userName}! 👋\n\nЯ — виртуальный ассистент Delever. Могу рассказать о:\n\n` +
          `📱 Каналах продаж (сайт, приложение, Telegram-бот)\n` +
          `🔗 Интеграции с агрегаторами (Wolt, Glovo, Uzum)\n` +
          `📊 Аналитике и CRM\n` +
          `💰 Тарифах и стоимости\n\n` +
          `Задайте любой вопрос!`,
          getMainKeyboard()
        )
        return new Response('OK', { status: 200 })
      }

      // Быстрые кнопки
      if (text === '💰 Тарифы') {
        await sendTelegramMessage(clientBotToken, chatId,
          `💰 *Тарифы Delever*\n\n` +
          `*Start* — от 1.3 млн сум/мес\n` +
          `• До 1000 заказов\n• 1 филиал\n\n` +
          `*Medium* — от 2.4 млн сум/мес\n` +
          `• До 3000 заказов\n• До 3 филиалов\n\n` +
          `*Big* — от 4.3 млн сум/мес\n` +
          `• До 6000 заказов\n• До 7 филиалов\n\n` +
          `*Enterprise* — от 6.5 млн сум/мес\n` +
          `• 10,000+ заказов\n• Безлимит филиалов\n\n` +
          `Хотите узнать точную стоимость для вашего бизнеса?`,
          getMainKeyboard()
        )
        session.leadScore = Math.max(session.leadScore, 50)
        sessions.set(userId, session)
        return new Response('OK', { status: 200 })
      }

      if (text === '📞 Связаться с менеджером') {
        session.waitingFor = 'name'
        session.leadScore = 80
        sessions.set(userId, session)
        
        await sendTelegramMessage(clientBotToken, chatId,
          `Отлично! Наш менеджер свяжется с вами в ближайшее время.\n\nКак вас зовут?`
        )
        return new Response('OK', { status: 200 })
      }

      // Ожидаем имя
      if (session.waitingFor === 'name') {
        session.userName = text
        session.waitingFor = 'phone'
        sessions.set(userId, session)
        
        await sendTelegramMessage(clientBotToken, chatId,
          `Приятно познакомиться, ${text}! 😊\n\nТеперь укажите ваш номер телефона:`,
          { 
            keyboard: [[{ text: '📱 Отправить номер', request_contact: true }]],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        )
        return new Response('OK', { status: 200 })
      }

      // Ожидаем телефон
      if (session.waitingFor === 'phone') {
        let phone = text
        
        // Если отправили контакт
        if (update.message.contact) {
          phone = update.message.contact.phone_number
        }

        // Отправляем лид в amoCRM и Telegram
        const leadData = {
          name: session.userName || userName,
          phone: phone,
          source: 'telegram_bot',
          leadScore: session.leadScore,
          telegramId: userId,
          telegramUsername: update.message.from.username
        }

        // Отправка в Telegram менеджерам
        if (salesChatId) {
          const leadMessage = `🤖 *Новый лид из Telegram-бота*\n\n` +
            `👤 *Имя:* ${leadData.name}\n` +
            `📞 *Телефон:* ${leadData.phone}\n` +
            `${leadData.telegramUsername ? `📱 *Telegram:* @${leadData.telegramUsername}\n` : ''}` +
            `🎯 *Lead Score:* ${leadData.leadScore}/100\n` +
            `📊 *Источник:* Чат-бот Telegram\n\n` +
            `💬 *История диалога:*\n${session.history.slice(-6).map(m => 
              `${m.role === 'user' ? '👤' : '🤖'} ${m.content.substring(0, 100)}...`
            ).join('\n')}`

          await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: salesChatId,
              text: leadMessage,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: [[
                  { text: '💬 WhatsApp', url: `https://wa.me/${phone.replace(/\D/g, '')}` },
                  { text: '📱 Telegram', url: `https://t.me/${leadData.telegramUsername || '+' + phone.replace(/\D/g, '')}` }
                ]]
              }
            })
          })
        }

        // Отправка в amoCRM
        if (amoSubdomain && amoAccessToken) {
          try {
            await sendLeadToAmoCRM(amoSubdomain, amoAccessToken, leadData)
          } catch (e) {
            console.error('amoCRM error:', e)
          }
        }

        // Сброс сессии
        session.waitingFor = undefined
        session.history = []
        sessions.set(userId, session)

        await sendTelegramMessage(clientBotToken, chatId,
          `✅ Спасибо, ${session.userName}!\n\n` +
          `Ваша заявка принята. Наш менеджер свяжется с вами в ближайшее время по номеру ${phone}.\n\n` +
          `А пока можете изучить наш сайт: delever.io`,
          getMainKeyboard()
        )
        return new Response('OK', { status: 200 })
      }

      // Обычный вопрос — отправляем в AI
      if (openaiKey) {
        // Добавляем сообщение в историю
        session.history.push({ role: 'user', content: text })

        // Запрос к chatbot API
        const chatbotResponse = await fetch(new URL('/api/chatbot', req.url).toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationHistory: session.history,
            source: 'telegram'
          })
        })

        const aiResult = await chatbotResponse.json()
        
        // Обновляем lead score
        if (aiResult.leadScore) {
          session.leadScore = Math.max(session.leadScore, aiResult.leadScore)
        }

        // Добавляем ответ в историю
        session.history.push({ role: 'assistant', content: aiResult.message })
        sessions.set(userId, session)

        // Если AI предлагает запросить контакт
        let keyboard = getMainKeyboard()
        if (aiResult.requestContact || session.leadScore > 60) {
          keyboard = {
            keyboard: [
              [{ text: '📞 Связаться с менеджером' }],
              [{ text: '💰 Тарифы' }, { text: '❓ Ещё вопрос' }]
            ],
            resize_keyboard: true
          }
        }

        await sendTelegramMessage(clientBotToken, chatId, aiResult.message, keyboard)
      } else {
        await sendTelegramMessage(clientBotToken, chatId,
          `Спасибо за вопрос! К сожалению, я сейчас не могу ответить.\n\n` +
          `Свяжитесь с нами:\n📞 +998 78 113 98 13\n📧 support@delever.uz`,
          getMainKeyboard()
        )
      }

      return new Response('OK', { status: 200 })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Client bot error:', error)
    return new Response('OK', { status: 200 })
  }
}

// Отправка сообщения в Telegram
async function sendTelegramMessage(
  token: string, 
  chatId: number, 
  text: string, 
  keyboard?: any
) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
      reply_markup: keyboard
    })
  })
}

// Клавиатура по умолчанию
function getMainKeyboard() {
  return {
    keyboard: [
      [{ text: '💰 Тарифы' }, { text: '📱 Возможности' }],
      [{ text: '🔗 Интеграции' }, { text: '📞 Связаться с менеджером' }]
    ],
    resize_keyboard: true
  }
}

// Отправка лида в amoCRM
async function sendLeadToAmoCRM(subdomain: string, accessToken: string, lead: any) {
  const baseUrl = `https://${subdomain}.amocrm.ru/api/v4`
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  // Создаём сделку
  const leadResponse = await fetch(`${baseUrl}/leads`, {
    method: 'POST',
    headers,
    body: JSON.stringify([{
      name: `Telegram-бот: ${lead.name}`,
      _embedded: {
        tags: [{ name: 'Telegram-бот' }, { name: 'Чат-бот' }]
      }
    }])
  })

  const leadResult = await leadResponse.json()
  const leadId = leadResult?._embedded?.leads?.[0]?.id

  // Создаём контакт
  const contactResponse = await fetch(`${baseUrl}/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify([{
      name: lead.name,
      custom_fields_values: [{
        field_code: 'PHONE',
        values: [{ value: lead.phone, enum_code: 'WORK' }]
      }]
    }])
  })

  const contactResult = await contactResponse.json()
  const contactId = contactResult?._embedded?.contacts?.[0]?.id

  // Связываем
  if (leadId && contactId) {
    await fetch(`${baseUrl}/leads/${leadId}/link`, {
      method: 'POST',
      headers,
      body: JSON.stringify([{
        to_entity_id: contactId,
        to_entity_type: 'contacts'
      }])
    })
  }

  // Добавляем примечание
  if (leadId) {
    await fetch(`${baseUrl}/leads/${leadId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify([{
        note_type: 'common',
        params: {
          text: `🤖 Лид из Telegram чат-бота\n\n` +
            `Lead Score: ${lead.leadScore}/100\n` +
            `Telegram: ${lead.telegramUsername ? '@' + lead.telegramUsername : lead.telegramId}`
        }
      }])
    })
  }

  return { leadId, contactId }
}

