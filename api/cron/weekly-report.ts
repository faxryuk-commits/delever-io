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
    // Получаем заявки за последние 7 дней
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    startDate.setHours(0, 0, 0, 0)

    const leads = await getLeadsByDateRange(startDate, endDate)
    const stats = await getLeadStats(leads)
    const expiredLeads = await getExpiredLeads(leads)

    // Группируем по дням для графика
    const dailyStats: Record<string, number> = {}
    for (const lead of leads) {
      const day = new Date(lead.createdAt).toLocaleDateString('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        timeZone: 'Asia/Tashkent'
      })
      dailyStats[day] = (dailyStats[day] || 0) + 1
    }

    // Формируем мини-график
    const maxLeads = Math.max(...Object.values(dailyStats), 1)
    const chartLines = Object.entries(dailyStats).map(([day, count]) => {
      const bars = '█'.repeat(Math.round((count / maxLeads) * 10))
      return `${day}: ${bars} ${count}`
    }).join('\n')

    // Форматируем даты
    const startStr = startDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Tashkent'
    })
    const endStr = endDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Tashkent'
    })

    // Топ менеджеров
    const managerStats: Record<string, { completed: number, total: number }> = {}
    for (const lead of leads) {
      if (lead.acceptedBy) {
        if (!managerStats[lead.acceptedBy]) {
          managerStats[lead.acceptedBy] = { completed: 0, total: 0 }
        }
        managerStats[lead.acceptedBy].total++
        if (lead.status === 'completed') {
          managerStats[lead.acceptedBy].completed++
        }
      }
    }

    const topManagers = Object.entries(managerStats)
      .sort((a, b) => b[1].completed - a[1].completed)
      .slice(0, 5)
      .map((entry, i) => {
        const [name, s] = entry
        const rate = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0
        return `${i + 1}. ${name}: ${s.completed}/${s.total} (${rate}%)`
      })
      .join('\n')

    let expiredLinks = ''
    if (expiredLeads.length > 0) {
      expiredLinks = '\n\n⚠️ *Просроченные заявки:*\n' + 
        expiredLeads.slice(0, 10).map((l, i) => `${i + 1}. \`${l.id}\` — ${l.name}`).join('\n')
      if (expiredLeads.length > 10) {
        expiredLinks += `\n_...и ещё ${expiredLeads.length - 10}_`
      }
    }

    const conversionRate = stats.total > 0 
      ? Math.round((stats.completed / stats.total) * 100) 
      : 0

    const message = `📊 *Недельный отчёт*
━━━━━━━━━━━━━━━━━━━━━
📅 *${startStr} — ${endStr}*

📈 *Общая статистика:*
• Всего заявок: *${stats.total}*
• ✅ Завершены: *${stats.completed}*
• ❌ Отклонены: *${stats.rejected}*
• ⏰ Просрочены: *${stats.expired}*
• 📵 Не дозвонились: *${stats.noAnswer}*
• 🔄 В работе: *${stats.inProgress}*

⏱ *Среднее время обработки:* ${stats.avgProcessingTime} мин
✨ *Конверсия:* ${conversionRate}%

📊 *Динамика по дням:*
\`\`\`
${chartLines}
\`\`\`

${topManagers ? `🏆 *Топ менеджеров:*\n${topManagers}` : ''}${expiredLinks}

━━━━━━━━━━━━━━━━━━━━━
🤖 _Еженедельный отчёт Delever_`

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
      period: { start: startDate.toISOString(), end: endDate.toISOString() },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Weekly report error:', error)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
