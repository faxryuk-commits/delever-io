export const config = {
  runtime: 'edge',
}

// Callback для OAuth авторизации amoCRM
export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const referer = url.searchParams.get('referer') // subdomain
  
  if (!code) {
    // Показываем форму для авторизации
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>amoCRM Integration</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
    h1 { color: #002A47; }
    .step { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
    code { background: #e0e0e0; padding: 2px 8px; border-radius: 4px; }
    .btn { background: #002A47; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; }
    .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; }
    pre { background: #1e1e1e; color: #9cdcfe; padding: 15px; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>🔗 Подключение amoCRM</h1>
  
  <div class="step">
    <h3>Шаг 1: Создайте интеграцию в amoCRM</h3>
    <ol>
      <li>Перейдите в <a href="https://delever.amocrm.ru/settings/widgets" target="_blank">amoCRM → Настройки → Интеграции</a></li>
      <li>Нажмите "+" → "Создать интеграцию"</li>
      <li>Заполните поля:
        <ul>
          <li>Название: <code>Delever Website</code></li>
          <li>Redirect URI: <code>https://delever.io/api/amocrm-callback</code></li>
        </ul>
      </li>
      <li>Сохраните интеграцию</li>
    </ol>
  </div>
  
  <div class="step">
    <h3>Шаг 2: Введите данные интеграции</h3>
    <form method="GET" action="https://www.amocrm.ru/oauth" id="authForm">
      <input type="hidden" name="mode" value="post_message">
      <p>
        <label>Client ID (ID интеграции):</label><br>
        <input type="text" name="client_id" style="width: 100%; padding: 10px; margin-top: 5px;" required>
      </p>
      <p>
        <label>Субдомен amoCRM:</label><br>
        <input type="text" name="state" value="delever" style="width: 100%; padding: 10px; margin-top: 5px;" required>
        <small>.amocrm.ru</small>
      </p>
      <button type="submit" class="btn">Авторизоваться в amoCRM</button>
    </form>
  </div>
  
  <script>
    document.getElementById('authForm').onsubmit = function(e) {
      e.preventDefault();
      const clientId = this.client_id.value;
      const subdomain = this.state.value;
      const redirectUri = encodeURIComponent('https://delever.io/api/amocrm-callback');
      window.location.href = 'https://www.amocrm.ru/oauth?client_id=' + clientId + '&state=' + subdomain + '&mode=popup&redirect_uri=' + redirectUri;
    };
  </script>
</body>
</html>
    `
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // Получили code, обмениваем на access_token
  const clientId = process.env.AMOCRM_CLIENT_ID
  const clientSecret = process.env.AMOCRM_CLIENT_SECRET
  const subdomain = referer || 'delever'

  if (!clientId || !clientSecret) {
    // Показываем код для ручного обмена
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>amoCRM - Код авторизации</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #002A47; }
    .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; }
    pre { background: #1e1e1e; color: #9cdcfe; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px; }
    code { background: #e0e0e0; padding: 2px 8px; border-radius: 4px; word-break: break-all; }
    .step { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>✅ Авторизация успешна!</h1>
  
  <div class="success">
    <h3>Код авторизации получен:</h3>
    <code>${code}</code>
  </div>
  
  <div class="step">
    <h3>Следующий шаг: Получите Access Token</h3>
    <p>Выполните этот запрос в терминале (замените YOUR_CLIENT_ID и YOUR_CLIENT_SECRET на ваши данные):</p>
    <pre>
curl -X POST https://${subdomain}.amocrm.ru/oauth2/access_token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "authorization_code",
    "code": "${code}",
    "redirect_uri": "https://delever.io/api/amocrm-callback"
  }'
    </pre>
    
    <p>Или используйте форму ниже:</p>
    <form id="tokenForm">
      <p>
        <label>Client ID:</label><br>
        <input type="text" id="clientId" style="width: 100%; padding: 10px;" required>
      </p>
      <p>
        <label>Client Secret:</label><br>
        <input type="text" id="clientSecret" style="width: 100%; padding: 10px;" required>
      </p>
      <button type="submit" style="background: #002A47; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;">
        Получить Access Token
      </button>
    </form>
    <div id="result" style="margin-top: 20px;"></div>
  </div>
  
  <script>
    document.getElementById('tokenForm').onsubmit = async function(e) {
      e.preventDefault();
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = 'Загрузка...';
      
      try {
        const response = await fetch('https://${subdomain}.amocrm.ru/oauth2/access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: document.getElementById('clientId').value,
            client_secret: document.getElementById('clientSecret').value,
            grant_type: 'authorization_code',
            code: '${code}',
            redirect_uri: 'https://delever.io/api/amocrm-callback'
          })
        });
        
        const data = await response.json();
        
        if (data.access_token) {
          resultDiv.innerHTML = '<div class="success"><h3>🎉 Успех!</h3><p><b>Access Token:</b></p><code>' + data.access_token + '</code><p style="margin-top:15px"><b>Refresh Token:</b></p><code>' + data.refresh_token + '</code><p style="margin-top:15px;color:#666">Добавьте эти токены в Vercel Environment Variables</p></div>';
        } else {
          resultDiv.innerHTML = '<div style="background:#f8d7da;padding:20px;border-radius:10px"><b>Ошибка:</b> ' + JSON.stringify(data) + '</div>';
        }
      } catch (err) {
        resultDiv.innerHTML = '<div style="background:#f8d7da;padding:20px;border-radius:10px"><b>Ошибка:</b> ' + err.message + '</div>';
      }
    };
  </script>
</body>
</html>
    `
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // Автоматический обмен кода на токен
  try {
    const tokenResponse = await fetch(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://delever.io/api/amocrm-callback'
      })
    })

    const tokens = await tokenResponse.json()

    if (tokens.access_token) {
      const html = `
<!DOCTYPE html>
<html>
<head><title>amoCRM - Успех!</title>
<style>
  body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
  .success { background: #d4edda; padding: 40px; border-radius: 20px; }
  h1 { color: #155724; }
</style>
</head>
<body>
  <div class="success">
    <h1>🎉 amoCRM подключен!</h1>
    <p>Интеграция настроена успешно.</p>
    <p>Заявки с сайта теперь будут автоматически создаваться в amoCRM.</p>
  </div>
</body>
</html>
      `
      // TODO: Сохранить токены в базу или отправить в Telegram
      console.log('amoCRM tokens:', tokens)
      
      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    throw new Error(JSON.stringify(tokens))
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 })
  }
}

