import { useParams } from 'react-router-dom'
import { KnowledgeArticlePage } from '@/components/seo/KnowledgeArticle'
import { HubPage } from '@/components/seo/HubPage'
import { getKnowledgeArticle, knowledgeHubs } from '@/data/knowledge-hub'
import { NotFound } from '@/pages/NotFound'

export function GuidePage() {
  const { '*': fullSlug } = useParams()
  const slug = fullSlug || ''
  
  // 1. Сначала проверяем — это hub (категория)?
  const hub = Object.values(knowledgeHubs).find(h => h.slug === slug)
  if (hub) {
    return <HubPage hub={hub} />
  }
  
  // 2. Если не hub — ищем статью
  const article = getKnowledgeArticle(slug)
  if (article) {
    return <KnowledgeArticlePage article={article} />
  }

  // 3. Если ничего не найдено — 404
  return <NotFound />
}
