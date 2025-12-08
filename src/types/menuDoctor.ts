export type MenuStructureItem = {
  category: string
  subcategory?: string
  items: {
    name: string
    description?: string
    price?: string
  }[]
}

export type MenuMetrics = {
  totalItems?: number
  categories?: number
  priceRange?: string
  avgPrice?: string
  hasCombo?: boolean
  comboCount?: number
}

export type GoalItem = {
  action: string
  why: string
  how: string
  result: string
}

export type GoalSection = {
  title: string
  items: GoalItem[]
}

export type QuickWins = {
  title: string
  items: string[]
}

export type MenuDoctorReport = {
  score: number
  metrics?: MenuMetrics
  summary: string
  issues: string[]
  // Старые поля (для обратной совместимости)
  recommendations?: string[]
  upsellIdeas?: string[]
  // Новые поля по целям
  goalSales?: GoalSection
  goalCheck?: GoalSection
  goalRetention?: GoalSection
  quickWins?: QuickWins
  menuStructure?: MenuStructureItem[]
}

export type MenuDoctorRequest = {
  menuUrl: string
  email?: string
  language?: 'ru' | 'uz' | 'en'
}
