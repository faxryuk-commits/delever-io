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
    const phoneDigits = phone.replace(/\D/g, '')
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
            text: '💬 WhatsApp',
            url: `https://wa.me/${phoneDigits}`
          },
          {
            text: '📱 Telegram',
            url: `https://t.me/+${phoneDigits}`
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
  const baseUrl = `https://${subdomain}.amocrm.ru/api/v4`
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  console.log('amoCRM: Starting integration...')
  console.log('amoCRM: Subdomain:', subdomain)

  try {
    // Шаг 1: Создаём сделку (лид) с неразобранным статусом
    const leadPayload = [{
      name: lead.name,
      created_at: Math.floor(Date.now() / 1000),
      _embedded: {
        tags: lead.tag ? [{ name: lead.tag }, { name: 'Сайт' }] : [{ name: 'Сайт' }]
      }
    }]

    console.log('amoCRM: Creating lead...', JSON.stringify(leadPayload))

    const leadResponse = await fetch(`${baseUrl}/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(leadPayload)
    })

    const leadResult = await leadResponse.json()
    console.log('amoCRM: Lead response:', JSON.stringify(leadResult))

    if (!leadResponse.ok) {
      console.error('amoCRM: Lead creation failed:', leadResult)
      return { error: 'Lead creation failed', details: leadResult }
    }

    const leadId = leadResult?._embedded?.leads?.[0]?.id
    console.log('amoCRM: Lead created with ID:', leadId)

    // Шаг 2: Создаём контакт
    const contactPayload = [{
      name: lead.name.replace('Заявка с сайта: ', ''),
      custom_fields_values: [
        {
          field_code: 'PHONE',
          values: [{ 
            value: lead.phone,
            enum_code: 'WORK'
          }]
        },
        ...(lead.email ? [{
          field_code: 'EMAIL', 
          values: [{ 
            value: lead.email,
            enum_code: 'WORK'
          }]
        }] : [])
      ]
    }]

    console.log('amoCRM: Creating contact...', JSON.stringify(contactPayload))

    const contactResponse = await fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contactPayload)
    })

    const contactResult = await contactResponse.json()
    console.log('amoCRM: Contact response:', JSON.stringify(contactResult))

    const contactId = contactResult?._embedded?.contacts?.[0]?.id
    console.log('amoCRM: Contact created with ID:', contactId)

    // Шаг 3: Связываем контакт со сделкой
    if (leadId && contactId) {
      console.log('amoCRM: Linking contact to lead...')
      
      const linkResponse = await fetch(`${baseUrl}/leads/${leadId}/link`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          to_entity_id: contactId,
          to_entity_type: 'contacts'
        }])
      })

      const linkResult = await linkResponse.json()
      console.log('amoCRM: Link response:', JSON.stringify(linkResult))
    }

    // Шаг 4: Добавляем примечание с деталями
    if (leadId) {
      const noteText = `📌 ID заявки: ${lead.leadId}
${lead.company ? `🏢 Компания: ${lead.company}` : ''}
${lead.message ? `💬 Сообщение: ${lead.message}` : ''}
📞 Телефон: ${lead.phone}
${lead.email ? `📧 Email: ${lead.email}` : ''}`

      await fetch(`${baseUrl}/leads/${leadId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          note_type: 'common',
          params: {
            text: noteText
          }
        }])
      })
    }

    return { 
      success: true, 
      leadId, 
      contactId,
      message: 'Lead and contact created successfully'
    }

  } catch (error) {
    console.error('amoCRM: Error:', error)
    return { error: String(error) }
  }
}
