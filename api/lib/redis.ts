// Утилита для работы с Upstash Redis

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

interface RedisResponse {
  result: any
}

// Базовая функция для Redis команд
async function redisCommand(command: string[]): Promise<any> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    console.error('Redis not configured')
    return null
  }

  const response = await fetch(`${UPSTASH_URL}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })

  if (!response.ok) {
    console.error('Redis error:', await response.text())
    return null
  }

  const data: RedisResponse = await response.json()
  return data.result
}

// Типы для заявок
export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  company?: string
  message?: string
  tag?: string
  
  // Статусы и таймеры
  status: 'pending' | 'accepted' | 'in_progress' | 'no_answer' | 'completed' | 'rejected' | 'expired'
  createdAt: number // timestamp
  acceptedAt?: number
  acceptedBy?: string // manager name
  acceptedByUsername?: string
  timerMinutes?: number // 10, 20, 60, 1440 (завтра)
  timerExpiresAt?: number
  completedAt?: number
  comment?: string
  
  // Telegram
  telegramMessageId?: number
  telegramChatId?: number
}

export interface LeadStats {
  total: number
  pending: number
  inProgress: number
  completed: number
  rejected: number
  expired: number
  noAnswer: number
  avgProcessingTime: number // в минутах
}

// ============================================
// CRUD операции для заявок
// ============================================

// Сохранить заявку
export async function saveLead(lead: Lead): Promise<boolean> {
  const key = `lead:${lead.id}`
  const result = await redisCommand(['SET', key, JSON.stringify(lead)])
  
  // Добавляем в индексы
  await redisCommand(['SADD', 'leads:all', lead.id])
  await redisCommand(['SADD', `leads:status:${lead.status}`, lead.id])
  
  // Индекс по дате (для отчётов)
  const dateKey = new Date(lead.createdAt).toISOString().split('T')[0] // YYYY-MM-DD
  await redisCommand(['SADD', `leads:date:${dateKey}`, lead.id])
  
  return result === 'OK'
}

// Получить заявку
export async function getLead(leadId: string): Promise<Lead | null> {
  const result = await redisCommand(['GET', `lead:${leadId}`])
  if (!result) return null
  try {
    return JSON.parse(result)
  } catch {
    return null
  }
}

// Обновить статус заявки
export async function updateLeadStatus(
  leadId: string, 
  newStatus: Lead['status'],
  updates: Partial<Lead> = {}
): Promise<Lead | null> {
  const lead = await getLead(leadId)
  if (!lead) return null
  
  const oldStatus = lead.status
  
  // Обновляем заявку
  const updatedLead: Lead = {
    ...lead,
    ...updates,
    status: newStatus,
  }
  
  await saveLead(updatedLead)
  
  // Обновляем индексы статусов
  await redisCommand(['SREM', `leads:status:${oldStatus}`, leadId])
  await redisCommand(['SADD', `leads:status:${newStatus}`, leadId])
  
  return updatedLead
}

// Получить заявки с истёкшим таймером
export async function getExpiredTimerLeads(): Promise<Lead[]> {
  const now = Date.now()
  const expiredLeads: Lead[] = []
  
  // Проверяем заявки в статусе "accepted" и "in_progress" и "no_answer"
  const statusesToCheck = ['accepted', 'in_progress', 'no_answer']
  
  for (const status of statusesToCheck) {
    const leadIds = await redisCommand(['SMEMBERS', `leads:status:${status}`])
    if (!leadIds || !Array.isArray(leadIds)) continue
    
    for (const leadId of leadIds) {
      const lead = await getLead(leadId)
      if (lead && lead.timerExpiresAt && lead.timerExpiresAt <= now) {
        expiredLeads.push(lead)
      }
    }
  }
  
  return expiredLeads
}

// Получить заявки за период
export async function getLeadsByDateRange(startDate: Date, endDate: Date): Promise<Lead[]> {
  const leads: Lead[] = []
  const current = new Date(startDate)
  
  while (current <= endDate) {
    const dateKey = current.toISOString().split('T')[0]
    const leadIds = await redisCommand(['SMEMBERS', `leads:date:${dateKey}`])
    
    if (leadIds && Array.isArray(leadIds)) {
      for (const leadId of leadIds) {
        const lead = await getLead(leadId)
        if (lead) leads.push(lead)
      }
    }
    
    current.setDate(current.getDate() + 1)
  }
  
  return leads
}

// Получить статистику
export async function getLeadStats(leads: Lead[]): Promise<LeadStats> {
  const stats: LeadStats = {
    total: leads.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
    expired: 0,
    noAnswer: 0,
    avgProcessingTime: 0,
  }
  
  let totalProcessingTime = 0
  let processedCount = 0
  
  for (const lead of leads) {
    switch (lead.status) {
      case 'pending': stats.pending++; break
      case 'accepted':
      case 'in_progress': stats.inProgress++; break
      case 'completed': stats.completed++; break
      case 'rejected': stats.rejected++; break
      case 'expired': stats.expired++; break
      case 'no_answer': stats.noAnswer++; break
    }
    
    // Считаем среднее время обработки для завершённых
    if (lead.status === 'completed' && lead.completedAt && lead.createdAt) {
      totalProcessingTime += (lead.completedAt - lead.createdAt) / 60000 // в минутах
      processedCount++
    }
  }
  
  stats.avgProcessingTime = processedCount > 0 
    ? Math.round(totalProcessingTime / processedCount) 
    : 0
  
  return stats
}

// Получить просроченные заявки (для отчёта)
export async function getExpiredLeads(leads: Lead[]): Promise<Lead[]> {
  return leads.filter(l => l.status === 'expired')
}

// Проверка конфигурации Redis
export function isRedisConfigured(): boolean {
  return !!(UPSTASH_URL && UPSTASH_TOKEN)
}
