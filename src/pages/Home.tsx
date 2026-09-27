import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/cards/ProjectCard'
import './Home.css'

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow mono">Personal Research Lab · 2026</p>
        <h1 className="hero__title">
          증권업과 투자 생태계는<br />어떻게 작동하는가?
        </h1>
        <p className="hero__lead muted">
          공개 데이터로 만드는 시각화·인터랙션·게임.
          개발 블로그이자 연구노트이자 실험실.
        </p>
        <div className="hero__actions">
          <Link to="/projects" className="button button--primary">프로젝트 보기</Link>
          <Link to="/about" className="button">이 연구소에 대해</Link>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Projects</h2>
          <Link to="/projects" className="muted">전체 보기 →</Link>
        </div>
        <div className="grid grid-3">
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
    </>
  )
}
