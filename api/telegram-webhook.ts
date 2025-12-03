export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN

  if (!botToken) {
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const update = await req.json()

    // Обработка callback_query (нажатия inline-кнопок)
    if (update.callback_query) {
      const callbackQuery = update.callback_query
      const data = callbackQuery.data
      const messageId = callbackQuery.message.message_id
      const chatId = callbackQuery.message.chat.id
      const originalText = callbackQuery.message.text
      const user = callbackQuery.from

      // Обработка нажатия "Принять заявку"
      if (data.startsWith('accept_lead:')) {
        const leadId = data.replace('accept_lead:', '')
        const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })
        
        // Формируем имя менеджера
        const managerName = user.first_name + (user.last_name ? ` ${user.last_name}` : '')
        const managerUsername = user.username ? `@${user.username}` : ''

        // Обновляем текст сообщения - меняем статус
        const updatedText = originalText
          .replace('🟡 Ожидает обработки', '🟢 В работе')
          + `\n\n━━━━━━━━━━━━━━━━━━━━━\n✅ *Принято:* ${managerName} ${managerUsername}\n🕐 *Когда:* ${timestamp}`

        // Обновляем кнопки - убираем "Принять", добавляем другие действия
        const phoneDigits = extractPhone(originalText).replace(/\D/g, '')
        const updatedKeyboard = {
          inline_keyboard: [
            [
              {
                text: '💬 WhatsApp',
                url: `https://wa.me/${phoneDigits}`
              },
              {
                text: '📱 Telegram',
                url: `https://t.me/+${phoneDigits}`
              }
            ],
            [
              {
                text: '✔️ Завершить',
                callback_data: `complete_lead:${leadId}`
              },
              {
                text: '❌ Отклонить',
                callback_data: `reject_lead:${leadId}`
              }
            ]
          ]
        }

        // Редактируем сообщение
        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: updatedText,
            parse_mode: 'Markdown',
            reply_markup: updatedKeyboard,
          }),
        })

        // Отвечаем на callback чтобы убрать "часики"
        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: `✅ Заявка ${leadId} принята!`,
            show_alert: false,
          }),
        })
      }

      // Обработка "Завершить"
      if (data.startsWith('complete_lead:')) {
        const leadId = data.replace('complete_lead:', '')
        const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })
        const managerName = user.first_name + (user.last_name ? ` ${user.last_name}` : '')

        const updatedText = originalText
          .replace('🟢 В работе', '✅ Завершена')
          + `\n🏁 *Завершено:* ${managerName}\n🕐 *Когда:* ${timestamp}`

        // Убираем кнопки
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

        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: `✅ Заявка ${leadId} успешно завершена!`,
            show_alert: true,
          }),
        })
      }

      // Обработка "Отклонить"
      if (data.startsWith('reject_lead:')) {
        const leadId = data.replace('reject_lead:', '')
        const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })
        const managerName = user.first_name + (user.last_name ? ` ${user.last_name}` : '')

        const updatedText = originalText
          .replace('🟢 В работе', '❌ Отклонена')
          + `\n🚫 *Отклонено:* ${managerName}\n🕐 *Когда:* ${timestamp}`

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

        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: `❌ Заявка ${leadId} отклонена`,
            show_alert: true,
          }),
        })
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

