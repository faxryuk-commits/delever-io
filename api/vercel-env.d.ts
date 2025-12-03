// Типы для Vercel Edge Functions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_EDIT_TOKEN?: string
      TELEGRAM_BOT_TOKEN?: string
      TELEGRAM_CHAT_ID?: string
      TELEGRAM_CLIENT_BOT_TOKEN?: string
      OPENAI_API_KEY?: string
      AMOCRM_SUBDOMAIN?: string
      AMOCRM_CLIENT_ID?: string
      AMOCRM_CLIENT_SECRET?: string
      AMOCRM_ACCESS_TOKEN?: string
      AMOCRM_REFRESH_TOKEN?: string
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv
  }
}

export {}

