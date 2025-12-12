export const config = {
  runtime: 'edge',
}

export default async function handler(_req: Request): Promise<Response> {
  // Только GET для простоты настройки
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  
  if (!botToken) {
    return new Response(JSON.stringify({ error: 'TELEGRAM_BOT_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const webhookUrl = 'https://delever.io/api/telegram-webhook'
  
  try {
    // Устанавливаем webhook
    const setWebhookResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message', 'callback_query'],
          drop_pending_updates: true,
        }),
      }
    )

    const setWebhookResult = await setWebhookResponse.json()

    // Получаем информацию о webhook
    const getInfoResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getWebhookInfo`
    )
    const webhookInfo = await getInfoResponse.json()

    return new Response(JSON.stringify({
      success: true,
      setWebhook: setWebhookResult,
      webhookInfo: webhookInfo,
      message: 'Webhook configured successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to setup webhook',
      details: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
