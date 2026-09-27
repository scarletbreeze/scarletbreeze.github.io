import type { ProjectViewProps } from '../types'
import ProjectPlaceholder from '../ProjectPlaceholder'

const plannedFeatures = [
    '증권사 수익구조 데이터 (공개 사업보고서 기반)',
    '사업부별 수익 비중 인터랙티브 차트',
    '증권사 간 비교',
]

export default function View(props: ProjectViewProps) {
  return <ProjectPlaceholder {...props} plannedFeatures={plannedFeatures} />
}
