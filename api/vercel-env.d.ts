// Типы для Vercel Edge Functions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_EDIT_TOKEN?: string
      TELEGRAM_BOT_TOKEN?: string
      TELEGRAM_CHAT_ID?: string
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv
  }
}

export {}

