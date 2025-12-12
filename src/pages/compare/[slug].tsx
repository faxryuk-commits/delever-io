import { useParams } from 'react-router-dom'
import { SEOPage } from '@/components/seo/SEOPage'
import { getSEOPageBySlug } from '@/data/seo-pages'
import { NotFound } from '@/pages/NotFound'

export function ComparePage() {
  const { slug } = useParams<{ slug: string }>()
  const pageData = getSEOPageBySlug(`compare/${slug}`)

  if (!pageData) {
    return <NotFound />
  }

  return <SEOPage data={pageData} />
}
