import type { ProjectViewProps } from '../types'
import ProjectPlaceholder from '../ProjectPlaceholder'

const plannedFeatures = [
    '사업부별 자본 배분 UI',
    '매출 · 비용 · ROE · Risk 계산 모델',
    '턴 진행과 결과 요약',
]

export default function View(props: ProjectViewProps) {
  return <ProjectPlaceholder {...props} plannedFeatures={plannedFeatures} />
}
