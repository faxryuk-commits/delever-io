export type MenuStructureItem = {
  category: string
  subcategory?: string
  items: {
    name: string
    description?: string
    price?: string
  }[]
}

export type MenuDoctorReport = {
  score: number // 0–100
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
