import { useParams } from 'react-router-dom'
import { KnowledgeArticlePage } from '@/components/seo/KnowledgeArticle'
import { getKnowledgeArticle } from '@/data/knowledge-hub'
import { NotFound } from '@/pages/NotFound'

export function GuidePage() {
  const { '*': fullSlug } = useParams()
  
  // Ищем статью по slug (без префикса guides/)
  const article = getKnowledgeArticle(fullSlug || '')

  if (!article) {
    return <NotFound />
  }

  return <KnowledgeArticlePage article={article} />
}
