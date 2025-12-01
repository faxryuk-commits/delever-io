// Типы для Vercel Edge Functions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_EDIT_TOKEN?: string
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv
  }
}

export {}

