import type { ProjectViewProps } from '../types'
import ProjectPlaceholder from '../ProjectPlaceholder'

const plannedFeatures = [
    'Mock 고객 문의 데이터셋',
    '키워드 빈도 · 카테고리 분포',
    '기간별 트렌드와 급증 키워드',
]

export default function View(props: ProjectViewProps) {
  return <ProjectPlaceholder {...props} plannedFeatures={plannedFeatures} />
}
