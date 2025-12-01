export const config = {
  runtime: 'edge',
}

interface InvoiceData {
  connectionType: 'platform' | 'aggregators' | 'kiosks'
  plan?: string
  branches: number
  brands: number
  kiosks: number
  modules: string[]
  monthlyTotal: string
  oneTimeTotal: string
  deposit: string
  scenario?: string
  timestamp: string
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || '@delever_sales_bot'

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN not configured')
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body: InvoiceData = await req.json()
    const { 
      connectionType, 
      plan, 
      branches, 
      brands, 
      kiosks, 
      modules, 
      monthlyTotal, 
      oneTimeTotal, 
      deposit,
      scenario,
      timestamp 
    } = body

    // Определяем эмодзи и тип подключения
    const typeEmoji = {
      platform: '🚀',
      aggregators: '🔗',
      kiosks: '🖥️'
    }

    const typeName = {
      platform: 'Полная платформа',
      aggregators: 'Только агрегаторы',
      kiosks: 'Только киоски'
    }

    const scenarioName: Record<string, string> = {
      own: 'Своя доставка',
      integrate: 'Интеграция с агрегаторами',
      switch: 'Переход с агрегаторов'
    }

    let telegramMessage = `📄 *Скачано КП*

${typeEmoji[connectionType]} *Тип:* ${typeName[connectionType]}
${plan ? `📊 *Тариф:* ${plan}\n` : ''}${scenario ? `🎯 *Сценарий:* ${scenarioName[scenario]}\n` : ''}`

    // Добавляем параметры бизнеса
    if (connectionType === 'platform') {
      telegramMessage += `
📍 *Филиалов:* ${branches}
🏷️ *Брендов:* ${brands}
${kiosks > 0 ? `🖥️ *Киосков:* ${kiosks}\n` : ''}`
    } else if (connectionType === 'aggregators') {
      telegramMessage += `
📍 *Филиалов:* ${branches}`
    } else if (connectionType === 'kiosks') {
      telegramMessage += `
🖥️ *Киосков:* ${kiosks}`
    }

    // Добавляем модули
    if (modules && modules.length > 0) {
      telegramMessage += `
➕ *Модули:* ${modules.join(', ')}`
    }

    // Добавляем стоимость
    telegramMessage += `

💰 *Ежемесячно:* ${monthlyTotal}
${oneTimeTotal !== '$0' ? `💎 *Единоразово:* ${oneTimeTotal}\n` : ''}🔐 *Депозит:* ${deposit}

⏰ ${timestamp}`

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      return new Response(JSON.stringify({ error: error.description || 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error logging invoice:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

