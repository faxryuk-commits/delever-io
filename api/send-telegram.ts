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

  const botToken = '7075566258:AAFFkcTeUEvUWtE6hHQv30e7_HpSJB450gs'
  const chatId = '@delever_sales_bot'

  try {
    const body = await req.json()
    const { name, phone, email, company, message, tag } = body

    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const telegramMessage = `🎯 *Новая заявка с сайта Delever*

${tag ? `📌 Тег: ${tag}\n` : ''}👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📧 *Email:* ${email}
${company ? `🏢 *Компания:* ${company}\n` : ''}${message ? `💬 *Сообщение:*\n${message}` : ''}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}`

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
    console.error('Error sending to Telegram:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

