import { getExpiredTimerLeads, updateLeadStatus, type Lead } from '../lib/redis'

export const config = {
  runtime: 'edge',
}

export default async function handler(_req: Request): Promise<Response> {
  console.log('Cron: Running timer check...')

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Получаем заявки с истёкшим таймером
    const expiredLeads = await getExpiredTimerLeads()
    console.log(`Cron: Found ${expiredLeads.length} expired timers`)

    let processed = 0
    let errors = 0

    for (const lead of expiredLeads) {
      try {
        await sendReminder(botToken, chatId, lead)
        
        // Помечаем как просроченную если это уже третий раз
        if (lead.status === 'no_answer') {
          // Можно добавить счётчик попыток
        }
        
        processed++
      } catch (e) {
        console.error(`Cron: Error processing lead ${lead.id}:`, e)
        errors++
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      processed,
      errors,
      total: expiredLeads.length,
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Cron error:', error)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Отправка напоминания менеджеру
async function sendReminder(botToken: string, chatId: string, lead: Lead) {
  const phoneDigits = lead.phone.replace(/\D/g, '')
  
  const statusEmoji: Record<string, string> = {
    accepted: '⏰',
    in_progress: '🔔',
    no_answer: '📵',
  }

  const message = `${statusEmoji[lead.status] || '⏰'} *Напоминание: время истекло!*
━━━━━━━━━━━━━━━━━━━━━

🆔 *ID:* \`${lead.id}\`
👤 *Имя:* ${lead.name}
📞 *Телефон:* ${lead.phone}
${lead.company ? `🏢 *Компания:* ${lead.company}\n` : ''}
👷 *Менеджер:* ${lead.acceptedBy || 'Не указан'} ${lead.acceptedByUsername || ''}
⏱ *Таймер был:* ${lead.timerMinutes} мин

━━━━━━━━━━━━━━━━━━━━━
⚠️ *Требуется обновить статус заявки!*`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '💬 WhatsApp', url: `https://wa.me/${phoneDigits}` },
        { text: '📱 Telegram', url: `https://t.me/+${phoneDigits}` },
      ],
      [
        { text: '✅ Завершить', callback_data: `complete:${lead.id}` },
        { text: '📵 Не дозвонился', callback_data: `no_answer:${lead.id}` },
      ],
      [
        { text: '⏰ +30 мин', callback_data: `extend:${lead.id}:30` },
        { text: '⏰ +60 мин', callback_data: `extend:${lead.id}:60` },
      ],
      [
        { text: '❌ Отклонить', callback_data: `reject:${lead.id}` },
      ],
    ]
  }

  // Если есть username менеджера, упоминаем его
  let mentionText = ''
  if (lead.acceptedByUsername) {
    mentionText = `\n\n${lead.acceptedByUsername} 👆`
  }

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message + mentionText,
      parse_mode: 'Markdown',
      reply_markup: keyboard,
    }),
  })

  // Обновляем таймер чтобы не спамить (добавляем 30 минут)
  await updateLeadStatus(lead.id, lead.status, {
    timerExpiresAt: Date.now() + 30 * 60 * 1000,
  })
}
