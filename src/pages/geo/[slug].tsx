import { useParams } from 'react-router-dom'
import { GeoArticlePage } from '@/components/seo/GeoArticle'
import { getGeoArticleBySlug } from '@/data/geo-articles'
import { NotFound } from '@/pages/NotFound'

export function DynamicGeoPage() {
  const { '*': fullSlug } = useParams()
  
  // Получаем гео-статью по slug
  const article = getGeoArticleBySlug(fullSlug || '')

  if (!article) {
    return <NotFound />
  }

  return <GeoArticlePage article={article} />
}
