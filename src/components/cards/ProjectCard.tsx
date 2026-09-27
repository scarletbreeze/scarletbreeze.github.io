import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'
import StatusBadge from '@/components/common/StatusBadge'
import Tag from '@/components/common/Tag'
import './ProjectCard.css'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card__top">
        <span className="project-card__index mono">0{project.order}</span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__tagline">{project.tagline}</p>
      <p className="project-card__question muted">“{project.question}”</p>
      <div className="project-card__tags">
        {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </Link>
  )
}
