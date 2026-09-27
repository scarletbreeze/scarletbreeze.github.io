import type { ProjectViewProps } from '../types'
import ProjectPlaceholder from '../ProjectPlaceholder'

const plannedFeatures = [
    '종목 · 시점 · 금액 입력',
    '현재 가치와 수익률, 벤치마크 비교',
    '공유용 결과 카드',
]

export default function View(props: ProjectViewProps) {
  return <ProjectPlaceholder {...props} plannedFeatures={plannedFeatures} />
}
