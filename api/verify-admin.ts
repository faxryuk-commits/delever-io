// Edge Function для проверки токена админки
// Этот endpoint проверяет токен и возвращает разрешение на загрузку в iframe

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const adminToken = url.searchParams.get('admin_token')
  const editMode = url.searchParams.get('edit_mode')

  // Получаем токен из переменной окружения
  // В Vercel Edge Functions переменные окружения доступны через process.env
  const validToken = process.env.ADMIN_EDIT_TOKEN

  if (!validToken) {
    return new Response(JSON.stringify({ 
      authorized: false,
      message: 'ADMIN_EDIT_TOKEN not configured'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Проверяем токен
  if (adminToken && editMode === 'true' && adminToken === validToken) {
    // Токен валидный - разрешаем доступ
    return new Response(JSON.stringify({ 
      authorized: true,
      message: 'Access granted'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self' https://siteadmin-*.vercel.app https://*.vercel.app",
      },
    })
  }

  // Токен невалидный
  return new Response(JSON.stringify({ 
    authorized: false,
    message: 'Invalid token',
    received: adminToken ? 'token provided' : 'no token',
    expected: validToken ? 'token configured' : 'no token configured'
  }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

