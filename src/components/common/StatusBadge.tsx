import type { ProjectStatus } from '@/types/project'
import './StatusBadge.css'

const label: Record<ProjectStatus, string> = {
  planned: '계획',
  'in-progress': '진행 중',
  live: '공개',
}

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`status-badge status-badge--${status}`}>{label[status]}</span>
}
