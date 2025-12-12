import { getLeadsByDateRange, getLeadStats, getExpiredLeads } from '../lib/redis'

export const config = {
  runtime: 'edge',
}

export default async function handler(_req: Request): Promise<Response> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Получаем заявки за сегодня
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endOfDay = new Date(today)
    endOfDay.setHours(23, 59, 59, 999)

    const leads = await getLeadsByDateRange(today, endOfDay)
    const stats = await getLeadStats(leads)
    const expiredLeads = await getExpiredLeads(leads)

    // Формируем отчёт
    const dateStr = today.toLocaleDateString('ru-RU', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      timeZone: 'Asia/Tashkent'
    })

    let expiredLinks = ''
    if (expiredLeads.length > 0) {
      expiredLinks = '\n\n*Просроченные заявки:*\n' + 
        expiredLeads.map((l, i) => `${i + 1}. \`${l.id}\` — ${l.name}`).join('\n')
    }

    const message = `📊 *Дневной отчёт*
━━━━━━━━━━━━━━━━━━━━━
📅 *${dateStr}*

📈 *Статистика:*
• Всего заявок: *${stats.total}*
• ⏳ Ожидают: *${stats.pending}*
• 🔄 В работе: *${stats.inProgress}*
• ✅ Завершены: *${stats.completed}*
• ❌ Отклонены: *${stats.rejected}*
• ⏰ Просрочены: *${stats.expired}*
• 📵 Не дозвонились: *${stats.noAnswer}*

⏱ *Среднее время обработки:* ${stats.avgProcessingTime} мин
${stats.completed > 0 ? `\n✨ *Конверсия:* ${Math.round((stats.completed / stats.total) * 100)}%` : ''}${expiredLinks}

━━━━━━━━━━━━━━━━━━━━━
🤖 _Автоматический отчёт Delever_`

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    return new Response(JSON.stringify({ 
      success: true,
      stats,
      date: today.toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Daily report error:', error)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
