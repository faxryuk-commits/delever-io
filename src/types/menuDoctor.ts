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

export type MenuDoctorReport = {
  score: number // 0–100
  metrics?: MenuMetrics
  summary: string
  issues: string[]
  recommendations: string[]
  upsellIdeas: string[]
  menuStructure?: MenuStructureItem[]
}

export type MenuDoctorRequest = {
  menuUrl: string
  averageBill?: string
  location?: string
  venueType?: string
  language?: 'ru' | 'uz' | 'en'
}
