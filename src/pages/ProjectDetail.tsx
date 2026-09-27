import { Link, useParams } from 'react-router-dom'
import { getProject } from '@/data/projects'
import { projectComponents } from '@/projects/registry'
import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import Tag from '@/components/common/Tag'
import NotFound from './NotFound'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const ProjectView = slug ? projectComponents[slug] : undefined

  if (!project || !ProjectView) return <NotFound />

  return (
    <>
      <Link to="/projects" className="muted">← Projects</Link>
      <PageHeader
        eyebrow={`Project 0${project.order}`}
        title={project.name}
        description={project.description}
        aside={<StatusBadge status={project.status} />}
      />
      <div className="project-detail__meta">
        <p className="project-detail__question">“{project.question}”</p>
        <div className="project-detail__tags">{project.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </div>
      <ProjectView project={project} />
    </>
  )
}
