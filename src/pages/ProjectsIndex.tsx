import { projects } from '@/data/projects'
import PageHeader from '@/components/common/PageHeader'
import ProjectCard from '@/components/cards/ProjectCard'

export default function ProjectsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="5개의 실험"
        description="각 프로젝트는 하나의 질문에서 출발한다. 정적 데이터로 먼저 만들고, 필요할 때만 서버와 AI를 더한다."
      />
      <div className="grid grid-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </>
  )
}
