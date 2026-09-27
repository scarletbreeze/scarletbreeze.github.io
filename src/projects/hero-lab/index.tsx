import type { ProjectViewProps } from '../types'
import ProjectPlaceholder from '../ProjectPlaceholder'

const plannedFeatures = [
    '사용자 유형 선택 (초보 / ETF / 미국주식 / 단타 / 선물옵션)',
    '유형별 추천 화면·기능 목록',
    '화면 설명과 사용 시나리오',
]

export default function View(props: ProjectViewProps) {
  return <ProjectPlaceholder {...props} plannedFeatures={plannedFeatures} />
}
