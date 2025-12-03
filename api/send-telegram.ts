export const config = {
  runtime: 'edge',
}

// Генерация уникального ID для заявки
const generateLeadId = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return `DLV-${timestamp}-${random}`.toUpperCase()
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Токены из переменных окружения Vercel
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || '@delever_sales_bot'
  
  // amoCRM credentials (опционально)
  const amoSubdomain = process.env.AMOCRM_SUBDOMAIN
  const amoAccessToken = process.env.AMOCRM_ACCESS_TOKEN

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN not configured')
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { name, phone, email, company, message, tag, language, detectedCountry, formFillTime } = body

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const leadId = generateLeadId()
    const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })

    // Формируем сообщение для Telegram
    const telegramMessage = `🎯 *Новая заявка с сайта Delever*
━━━━━━━━━━━━━━━━━━━━━
🆔 *ID:* \`${leadId}\`
${tag ? `📌 *Источник:* ${tag}\n` : ''}
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
${email ? `📧 *Email:* ${email}\n` : ''}${company ? `🏢 *Компания:* ${company}\n` : ''}${message ? `\n💬 *Сообщение:*\n${message}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━
${detectedCountry ? `🌍 Страна: ${detectedCountry}\n` : ''}${language ? `🗣 Язык сайта: ${language}\n` : ''}${formFillTime ? `⏱ Время заполнения: ${formFillTime} сек\n` : ''}⏰ ${timestamp}

📊 *Статус:* 🟡 Ожидает обработки`

    // Inline-кнопка "Принять заявку"
    const inlineKeyboard = {
      inline_keyboard: [
        [
          {
            text: '✅ Принять заявку',
            callback_data: `accept_lead:${leadId}`
          }
        ],
        [
          {
            text: '📞 Позвонить',
            url: `tel:${phone.replace(/\s/g, '')}`
          },
          {
            text: '💬 WhatsApp',
            url: `https://wa.me/${phone.replace(/\D/g, '')}`
          }
        ]
      ]
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard,
      }),
    })

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json()
      console.error('Telegram API error:', error)
      return new Response(JSON.stringify({ error: error.description || 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Отправка в amoCRM (если настроено)
    let amoResult = null
    if (amoSubdomain && amoAccessToken) {
      try {
        amoResult = await sendToAmoCRM({
          subdomain: amoSubdomain,
          accessToken: amoAccessToken,
          lead: {
            name: `Заявка с сайта: ${name}`,
            phone,
            email,
            company,
            message,
            tag,
            leadId,
          }
        })
      } catch (amoError) {
        console.error('amoCRM error:', amoError)
        // Не блокируем основной процесс
      }
    }

    const data = await telegramResponse.json()
    return new Response(JSON.stringify({ 
      success: true, 
      leadId,
      telegram: data,
      amocrm: amoResult 
    }), {
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

// Функция отправки в amoCRM
async function sendToAmoCRM(params: {
  subdomain: string
  accessToken: string
  lead: {
    name: string
    phone: string
    email?: string
    company?: string
    message?: string
    tag?: string
    leadId: string
  }
}) {
  const { subdomain, accessToken, lead } = params
  
  // Создаём контакт
  const contactResponse = await fetch(`https://${subdomain}.amocrm.ru/api/v4/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      name: lead.name.replace('Заявка с сайта: ', ''),
      custom_fields_values: [
        {
          field_code: 'PHONE',
          values: [{ value: lead.phone, enum_code: 'WORK' }]
        },
        ...(lead.email ? [{
          field_code: 'EMAIL',
          values: [{ value: lead.email, enum_code: 'WORK' }]
        }] : []),
        ...(lead.company ? [{
          field_code: 'COMPANY',
          values: [{ value: lead.company }]
        }] : [])
      ]
    }])
  })

  const contactData = await contactResponse.json()
  const contactId = contactData?._embedded?.contacts?.[0]?.id

  // Создаём сделку
  const leadData = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      name: lead.name,
      _embedded: {
        contacts: contactId ? [{ id: contactId }] : undefined
      },
      custom_fields_values: [
        {
          field_id: 0, // Замените на реальный ID поля для ID заявки
          values: [{ value: lead.leadId }]
        }
      ],
      _tags: lead.tag ? [{ name: lead.tag }] : undefined
    }])
  })

  return await leadData.json()
}
