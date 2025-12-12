import { useParams } from 'react-router-dom'
import { CaseStudyPage } from '@/components/seo/CaseStudyPage'
import { getCaseStudyBySlug } from '@/data/case-studies'
import { NotFound } from '@/pages/NotFound'

export function CaseStudyRoute() {
  const { slug } = useParams<{ slug: string }>()
  
  const caseStudy = getCaseStudyBySlug(slug || '')
  
  if (!caseStudy) {
    return <NotFound />
  }

  return <CaseStudyPage caseStudy={caseStudy} />
}
