import { getLead, updateLeadStatus, isRedisConfigured } from './lib/redis'

export const config = {
  runtime: 'edge',
}

// Хранилище сессий для AI чата (в памяти, сбрасывается при рестарте)
const chatSessions = new Map<number, {
  history: { role: 'user' | 'assistant', content: string }[]
  leadScore: number
  waitingFor?: 'name' | 'phone'
  userName?: string
}>()

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const salesChatId = process.env.TELEGRAM_CHAT_ID
  const openaiKey = process.env.OPENAI_API_KEY
  const amoSubdomain = process.env.AMOCRM_SUBDOMAIN
  const amoAccessToken = process.env.AMOCRM_ACCESS_TOKEN

  if (!botToken) {
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const update = await req.json()
    
    // ============================================
    // ЛИЧНЫЕ СООБЩЕНИЯ ОТ КЛИЕНТОВ (AI чат-бот)
    // ============================================
    if (update.message && update.message.chat.type === 'private') {
      const chatId = update.message.chat.id
      const userId = update.message.from.id
      const text = update.message.text || ''
      const userName = update.message.from.first_name || 'Пользователь'

      // Получаем или создаём сессию
      let session = chatSessions.get(userId) || {
        history: [],
        leadScore: 0
      }

      // Команда /start
      if (text === '/start') {
        session = { history: [], leadScore: 0 }
        chatSessions.set(userId, session)
        
        await sendTelegramMessage(botToken, chatId, 
          `Привет, ${userName}! 👋\n\n` +
          `Я — виртуальный ассистент Delever. Могу рассказать о:\n\n` +
          `📱 Каналах продаж (сайт, приложение, Telegram-бот)\n` +
          `🔗 Интеграции с агрегаторами (Wolt, Glovo, Uzum)\n` +
          `📊 Аналитике и CRM\n` +
          `💰 Тарифах и стоимости\n\n` +
          `Задайте любой вопрос!`,
          getClientKeyboard()
        )
        return new Response('OK', { status: 200 })
      }

      // Быстрые кнопки
      if (text === '💰 Тарифы') {
        await sendTelegramMessage(botToken, chatId,
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
          getClientKeyboard()
        )
        session.leadScore = Math.max(session.leadScore, 50)
        chatSessions.set(userId, session)
        return new Response('OK', { status: 200 })
      }

      if (text === '📱 Возможности') {
        await sendTelegramMessage(botToken, chatId,
          `📱 *Возможности Delever*\n\n` +
          `*Каналы продаж:*\n` +
          `• Брендированный сайт\n` +
          `• Мобильное приложение (iOS/Android)\n` +
          `• Telegram-бот\n` +
          `• QR-меню\n\n` +
          `*Интеграции:*\n` +
          `• POS: iiko, R-Keeper, Poster\n` +
          `• Агрегаторы: Wolt, Glovo, Uzum\n\n` +
          `*Операции:*\n` +
          `• Управление курьерами\n` +
          `• GPS-трекинг\n` +
          `• Аналитика\n` +
          `• CRM и маркетинг\n\n` +
          `Хотите узнать подробнее?`,
          getClientKeyboard()
        )
        session.leadScore = Math.max(session.leadScore, 40)
        chatSessions.set(userId, session)
        return new Response('OK', { status: 200 })
      }

      if (text === '🔗 Интеграции') {
        await sendTelegramMessage(botToken, chatId,
          `🔗 *Интеграции Delever*\n\n` +
          `*POS-системы:*\n` +
          `iiko, R-Keeper, Poster, Jowi, Paloma, Syrve\n\n` +
          `*Агрегаторы:*\n` +
          `Wolt, Glovo, Yandex Eats, Uzum Tezkor, Chocofood\n\n` +
          `*Оплата:*\n` +
          `Payme, Click, Uzum\n\n` +
          `Все заказы из агрегаторов — в одном окне!`,
          getClientKeyboard()
        )
        session.leadScore = Math.max(session.leadScore, 45)
        chatSessions.set(userId, session)
        return new Response('OK', { status: 200 })
      }

      if (text === '📞 Связаться с менеджером') {
        session.waitingFor = 'name'
        session.leadScore = 80
        chatSessions.set(userId, session)
        
        await sendTelegramMessage(botToken, chatId,
          `Отлично! Наш менеджер свяжется с вами в ближайшее время.\n\nКак вас зовут?`
        )
        return new Response('OK', { status: 200 })
      }

      // Ожидаем имя
      if (session.waitingFor === 'name') {
        session.userName = text
        session.waitingFor = 'phone'
        chatSessions.set(userId, session)
        
        await sendTelegramMessage(botToken, chatId,
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

        // Отправляем лид менеджерам в Telegram
        if (salesChatId) {
          const leadMessage = `🤖 *Новый лид из Telegram-бота*\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👤 *Имя:* ${session.userName || userName}\n` +
            `📞 *Телефон:* ${phone}\n` +
            `${update.message.from.username ? `📱 *Telegram:* @${update.message.from.username}\n` : ''}` +
            `🎯 *Lead Score:* ${session.leadScore}/100\n` +
            `📊 *Источник:* Чат-бот Telegram\n\n` +
            `💬 *История диалога (последние сообщения):*\n` +
            `${session.history.slice(-4).map(m => 
              `${m.role === 'user' ? '👤' : '🤖'} ${m.content.substring(0, 80)}${m.content.length > 80 ? '...' : ''}`
            ).join('\n') || 'Быстрый контакт'}`

          const phoneDigits = phone.replace(/\D/g, '')
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: salesChatId,
              text: leadMessage,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: [[
                  { text: '💬 WhatsApp', url: `https://wa.me/${phoneDigits}` },
                  { text: '📱 Telegram', url: `https://t.me/${update.message.from.username || '+' + phoneDigits}` }
                ]]
              }
            })
          })
        }

        // Отправляем в amoCRM
        if (amoSubdomain && amoAccessToken) {
          try {
            await sendLeadToAmoCRM(amoSubdomain, amoAccessToken, {
              name: session.userName || userName,
              phone: phone,
              source: 'telegram_bot',
              leadScore: session.leadScore,
              telegramUsername: update.message.from.username
            })
          } catch (e) {
            console.error('amoCRM error:', e)
          }
        }

        // Сброс сессии
        session.waitingFor = undefined
        session.history = []
        chatSessions.set(userId, session)

        await sendTelegramMessage(botToken, chatId,
          `✅ Спасибо, ${session.userName || userName}!\n\n` +
          `Ваша заявка принята. Наш менеджер свяжется с вами в ближайшее время.\n\n` +
          `А пока можете изучить наш сайт: delever.io`,
          getClientKeyboard()
        )
        return new Response('OK', { status: 200 })
      }

      // Обычный вопрос — отправляем в AI
      if (openaiKey) {
        session.history.push({ role: 'user', content: text })

        try {
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
          
          if (aiResult.leadScore) {
            session.leadScore = Math.max(session.leadScore, aiResult.leadScore)
          }

          session.history.push({ role: 'assistant', content: aiResult.message || '' })
          chatSessions.set(userId, session)

          // Если AI предлагает запросить контакт
          let keyboard = getClientKeyboard()
          if (aiResult.requestContact || session.leadScore > 60) {
            keyboard = {
              keyboard: [
                [{ text: '📞 Связаться с менеджером' }],
                [{ text: '💰 Тарифы' }, { text: '❓ Ещё вопрос' }]
              ],
              resize_keyboard: true
            }
          }

          await sendTelegramMessage(botToken, chatId, aiResult.message || 'Извините, не могу ответить.', keyboard)
        } catch (e) {
          console.error('AI error:', e)
          await sendTelegramMessage(botToken, chatId,
            `Извините, возникла ошибка. Свяжитесь с нами:\n📞 +998 78 113 98 13`,
            getClientKeyboard()
          )
        }
      } else {
        await sendTelegramMessage(botToken, chatId,
          `Спасибо за вопрос! Свяжитесь с нами:\n📞 +998 78 113 98 13\n📧 support@delever.uz`,
          getClientKeyboard()
        )
      }

      return new Response('OK', { status: 200 })
    }

    // ============================================
    // CALLBACK_QUERY (кнопки в группе менеджеров)
    // ============================================
    if (update.callback_query) {
      const callbackQuery = update.callback_query
      const data = callbackQuery.data
      const messageId = callbackQuery.message?.message_id
      const chatId = callbackQuery.message?.chat?.id
      const originalText = callbackQuery.message?.text || ''
      const user = callbackQuery.from

      // Логирование для отладки
      console.log('Callback query received:', {
        data,
        userId: user.id,
        userName: user.first_name,
        chatId,
        messageId,
        chatType: callbackQuery.message?.chat?.type
      })

      // Проверяем что есть все нужные данные
      if (!messageId || !chatId) {
        console.error('Missing messageId or chatId in callback_query')
        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: '❌ Ошибка: сообщение недоступно',
            show_alert: true,
          }),
        })
        return new Response('OK', { status: 200 })
      }

      const managerName = user.first_name + (user.last_name ? ` ${user.last_name}` : '')
      const managerUsername = user.username ? `@${user.username}` : ''
      const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })
      const phoneDigits = extractPhone(originalText).replace(/\D/g, '')

      // ========== ПРИНЯТЬ ЗАЯВКУ → Показать выбор времени ==========
      if (data.startsWith('accept_lead:')) {
        const leadId = data.replace('accept_lead:', '')
        
        // Показываем кнопки выбора времени
        const timeKeyboard = {
          inline_keyboard: [
            [
              { text: '⏰ 10 мин', callback_data: `timer:${leadId}:10` },
              { text: '⏰ 20 мин', callback_data: `timer:${leadId}:20` },
              { text: '⏰ 60 мин', callback_data: `timer:${leadId}:60` },
            ],
            [
              { text: '📅 Завтра', callback_data: `timer:${leadId}:1440` },
              { text: '❌ Отмена', callback_data: `cancel_accept:${leadId}` },
            ],
          ]
        }

        const updatedText = originalText
          .replace('🟡 Ожидает обработки', '⏳ Выбор времени')
          + `\n\n━━━━━━━━━━━━━━━━━━━━━\n👤 *Принимает:* ${managerName}\n⏰ *Выберите время на обработку:*`

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: timeKeyboard,
          }),
        })

        await answerCallback(botToken, callbackQuery.id, '⏰ Выберите время')
      }

      // ========== ВЫБОР ВРЕМЕНИ ==========
      if (data.startsWith('timer:')) {
        const parts = data.split(':')
        const leadId = parts[1]
        const minutes = parseInt(parts[2])
        
        const timeLabels: Record<number, string> = {
          10: '10 минут',
          20: '20 минут', 
          60: '1 час',
          1440: 'до завтра',
        }

        // Обновляем в Redis
        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'accepted', {
            acceptedAt: Date.now(),
            acceptedBy: managerName,
            acceptedByUsername: managerUsername,
            timerMinutes: minutes,
            timerExpiresAt: Date.now() + minutes * 60 * 1000,
          })
        }

        const updatedText = originalText
          .replace('⏳ Выбор времени', '🟢 В работе')
          .replace(/\n\n━━━━━━━━━━━━━━━━━━━━━\n👤 \*Принимает:[\s\S]*$/, '')
          + `\n\n━━━━━━━━━━━━━━━━━━━━━\n✅ *Принято:* ${managerName} ${managerUsername}\n⏰ *Таймер:* ${timeLabels[minutes]}\n🕐 *Когда:* ${timestamp}`

        const workKeyboard = {
          inline_keyboard: [
            [
              { text: '💬 WhatsApp', url: `https://wa.me/${phoneDigits}` },
              { text: '📱 Telegram', url: `https://t.me/+${phoneDigits}` },
            ],
            [
              { text: '✅ Завершить', callback_data: `complete:${leadId}` },
              { text: '📵 Не дозвонился', callback_data: `no_answer:${leadId}` },
            ],
            [
              { text: '❌ Отклонить', callback_data: `reject:${leadId}` },
              { text: '⏰ +30 мин', callback_data: `extend:${leadId}:30` },
            ],
          ]
        }

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: workKeyboard,
          }),
        })

        await answerCallback(botToken, callbackQuery.id, `✅ Таймер установлен: ${timeLabels[minutes]}`, true)
      }

      // ========== ОТМЕНА ПРИНЯТИЯ ==========
      if (data.startsWith('cancel_accept:')) {
        const leadId = data.replace('cancel_accept:', '')
        
        const updatedText = originalText
          .replace('⏳ Выбор времени', '🟡 Ожидает обработки')
          .replace(/\n\n━━━━━━━━━━━━━━━━━━━━━\n👤 \*Принимает:[\s\S]*$/, '')

        const pendingKeyboard = {
          inline_keyboard: [
            [{ text: '✅ Принять заявку', callback_data: `accept_lead:${leadId}` }],
            [
              { text: '💬 WhatsApp', url: `https://wa.me/${phoneDigits}` },
              { text: '📱 Telegram', url: `https://t.me/+${phoneDigits}` },
            ],
          ]
        }

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: pendingKeyboard,
          }),
        })

        await answerCallback(botToken, callbackQuery.id, '↩️ Отменено')
      }

      // ========== НЕ ДОЗВОНИЛСЯ ==========
      if (data.startsWith('no_answer:')) {
        const leadId = data.replace('no_answer:', '')

        // Показываем выбор нового времени
        const retryKeyboard = {
          inline_keyboard: [
            [
              { text: '⏰ 30 мин', callback_data: `retry:${leadId}:30` },
              { text: '⏰ 60 мин', callback_data: `retry:${leadId}:60` },
              { text: '📅 Завтра', callback_data: `retry:${leadId}:1440` },
            ],
            [
              { text: '❌ Отклонить заявку', callback_data: `reject:${leadId}` },
            ],
          ]
        }

        const updatedText = originalText
          .replace('🟢 В работе', '📵 Не дозвонился')
          + `\n📵 *Не дозвонился:* ${managerName}\n⏰ *Выберите время для повторного звонка:*`

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: retryKeyboard,
          }),
        })

        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'no_answer')
        }

        await answerCallback(botToken, callbackQuery.id, '📵 Выберите время повторного звонка')
      }

      // ========== ПОВТОРНЫЙ ЗВОНОК (после "Не дозвонился") ==========
      if (data.startsWith('retry:')) {
        const parts = data.split(':')
        const leadId = parts[1]
        const minutes = parseInt(parts[2])

        const timeLabels: Record<number, string> = { 30: '30 минут', 60: '1 час', 1440: 'завтра' }

        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'in_progress', {
            timerMinutes: minutes,
            timerExpiresAt: Date.now() + minutes * 60 * 1000,
          })
        }

        const updatedText = originalText
          .replace('📵 Не дозвонился', '🔄 Повторный звонок')
          .replace(/📵 \*Не дозвонился:[\s\S]*$/, '')
          + `\n🔄 *Повторный звонок через:* ${timeLabels[minutes]}\n👤 *Ответственный:* ${managerName}`

        const workKeyboard = {
          inline_keyboard: [
            [
              { text: '💬 WhatsApp', url: `https://wa.me/${phoneDigits}` },
              { text: '📱 Telegram', url: `https://t.me/+${phoneDigits}` },
            ],
            [
              { text: '✅ Завершить', callback_data: `complete:${leadId}` },
              { text: '📵 Не дозвонился', callback_data: `no_answer:${leadId}` },
            ],
            [
              { text: '❌ Отклонить', callback_data: `reject:${leadId}` },
            ],
          ]
        }

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: workKeyboard,
          }),
        })

        await answerCallback(botToken, callbackQuery.id, `⏰ Напомню через ${timeLabels[minutes]}`, true)
      }

      // ========== ПРОДЛИТЬ ТАЙМЕР ==========
      if (data.startsWith('extend:')) {
        const parts = data.split(':')
        const leadId = parts[1]
        const minutes = parseInt(parts[2])

        if (isRedisConfigured()) {
          const lead = await getLead(leadId)
          if (lead) {
            await updateLeadStatus(leadId, lead.status, {
              timerExpiresAt: Date.now() + minutes * 60 * 1000,
            })
          }
        }

        await answerCallback(botToken, callbackQuery.id, `⏰ Таймер продлён на ${minutes} минут`, true)
      }

      // ========== ЗАВЕРШИТЬ ==========
      if (data.startsWith('complete:')) {
        const leadId = data.replace('complete:', '')

        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'completed', {
            completedAt: Date.now(),
            comment: `Завершено: ${managerName}`,
          })
        }

        const updatedText = originalText
          .replace(/🟢 В работе|🔄 Повторный звонок|📵 Не дозвонился/, '✅ Завершена')
          .replace(/\n🔄 \*Повторный звонок[\s\S]*$/, '')
          + `\n\n🏁 *Завершено:* ${managerName}\n🕐 *Когда:* ${timestamp}`

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
          }),
        })

        await answerCallback(botToken, callbackQuery.id, `✅ Заявка ${leadId} завершена!`, true)
      }

      // ========== ОТКЛОНИТЬ ==========
      if (data.startsWith('reject:')) {
        const leadId = data.replace('reject:', '')

        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'rejected', {
            completedAt: Date.now(),
            comment: `Отклонено: ${managerName}`,
          })
        }

        const updatedText = originalText
          .replace(/🟢 В работе|🔄 Повторный звонок|📵 Не дозвонился|⏳ Выбор времени/, '❌ Отклонена')
          .replace(/\n🔄 \*Повторный звонок[\s\S]*$/, '')
          .replace(/\n📵 \*Не дозвонился:[\s\S]*$/, '')
          .replace(/\n👤 \*Принимает:[\s\S]*$/, '')
          + `\n\n🚫 *Отклонено:* ${managerName}\n🕐 *Когда:* ${timestamp}`

        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
          }),
        })

        await answerCallback(botToken, callbackQuery.id, `❌ Заявка ${leadId} отклонена`, true)
      }

      // ========== Старые callback для обратной совместимости ==========
      if (data.startsWith('complete_lead:')) {
        const leadId = data.replace('complete_lead:', '')
        // Перенаправляем на новый формат
        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'completed', { completedAt: Date.now() })
        }
        await answerCallback(botToken, callbackQuery.id, `✅ Заявка завершена!`, true)
      }

      if (data.startsWith('reject_lead:')) {
        const leadId = data.replace('reject_lead:', '')
        if (isRedisConfigured()) {
          await updateLeadStatus(leadId, 'rejected', { completedAt: Date.now() })
        }
        await answerCallback(botToken, callbackQuery.id, `❌ Заявка отклонена`, true)
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Извлекаем телефон из текста сообщения
function extractPhone(text: string): string {
  const phoneMatch = text.match(/📞\s*\*?Телефон:\*?\s*([+\d\s\-()]+)/i)
  return phoneMatch ? phoneMatch[1].trim() : ''
}

// Ответ на callback query
async function answerCallback(token: string, callbackId: string, text: string, showAlert = false) {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackId,
      text,
      show_alert: showAlert,
    }),
  })
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

// Клавиатура для клиентов
function getClientKeyboard() {
  return {
    keyboard: [
      [{ text: '💰 Тарифы' }, { text: '📱 Возможности' }],
      [{ text: '🔗 Интеграции' }, { text: '📞 Связаться с менеджером' }]
    ],
    resize_keyboard: true
  }
}

// Отправка лида в amoCRM
async function sendLeadToAmoCRM(
  subdomain: string, 
  accessToken: string, 
  lead: {
    name: string
    phone: string
    source: string
    leadScore: number
    telegramUsername?: string
  }
) {
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
            `Telegram: ${lead.telegramUsername ? '@' + lead.telegramUsername : 'не указан'}`
        }
      }])
    })
  }

  return { leadId, contactId }
}

