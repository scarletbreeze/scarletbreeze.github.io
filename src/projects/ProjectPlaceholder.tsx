import type { ProjectViewProps } from './types'
import './ProjectPlaceholder.css'

interface PlaceholderProps extends ProjectViewProps {
  plannedFeatures: string[]
}

// 골격 단계 공용 Placeholder. 각 프로젝트가 실제 UI를 갖추면 교체한다.
export default function ProjectPlaceholder({ project, plannedFeatures }: PlaceholderProps) {
  return (
    <section className="placeholder">
      <h2>준비 중</h2>
      <p className="muted">{project.name}의 첫 버전을 설계하고 있습니다. 계획된 기능:</p>
      <ul className="placeholder__list">
        {plannedFeatures.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </section>
  )
}
