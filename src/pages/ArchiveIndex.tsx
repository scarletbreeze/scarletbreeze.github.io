import { Link, useSearchParams } from 'react-router-dom'
import { archivePosts, archiveSource, archiveYears } from '@/data/archive'
import PageHeader from '@/components/common/PageHeader'
import './Archive.css'

export default function ArchiveIndex() {
  const [params, setParams] = useSearchParams()
  const selectedYear = Number(params.get('year')) || archiveYears[0]
  const posts = archivePosts.filter((p) => p.year === selectedYear)

  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="이전 기록"
        description={`2017–2019년 개발 공부 블로그 ${archivePosts.length}편. 이 연구소가 세워진 바탕.`}
      />
      <nav className="archive__years" aria-label="연도">
        {archiveYears.map((y) => (
          <button
            key={y}
            type="button"
            className={'archive__year' + (y === selectedYear ? ' is-active' : '')}
            onClick={() => setParams({ year: String(y) })}
          >
            {y} <span className="muted mono">{archivePosts.filter((p) => p.year === y).length}</span>
          </button>
        ))}
      </nav>
      <ul className="archive__list">
        {posts.map((p) => (
          <li key={p.slug} className="archive__item">
            <span className="archive__date mono muted">{p.date}</span>
            <Link to={`/archive/${p.slug}`}>{p.title}</Link>
            {p.categories[0] && <span className="archive__cat muted">{p.categories[0]}</span>}
          </li>
        ))}
      </ul>
      <p className="muted archive__source mono">source: {archiveSource}</p>
    </>
  )
}
