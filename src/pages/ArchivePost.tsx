import { Suspense, use } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArchivePost, loadArchiveMarkdown } from '@/data/archive'
import type { ArchivePost as ArchivePostMeta } from '@/types/archive'
import PageHeader from '@/components/common/PageHeader'
import Markdown from '@/components/common/Markdown'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import Tag from '@/components/common/Tag'
import NotFound from './NotFound'
import './Archive.css'

export default function ArchivePost() {
  const { slug } = useParams()
  const post = getArchivePost(slug)
  if (!post) return <NotFound />

  return (
    <>
      <Link to={`/archive?year=${post.year}`} className="muted">← Archive {post.year}</Link>
      <PageHeader
        eyebrow={post.date}
        title={post.title}
        aside={<div className="archive__tags">{post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
      />
      <ErrorBoundary fallback={(e) => <p className="muted">불러오지 못했습니다: {e.message}</p>}>
        <Suspense fallback={<p className="muted">불러오는 중…</p>}>
          <ArchiveBody post={post} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

function ArchiveBody({ post }: { post: ArchivePostMeta }) {
  const markdown = use(loadArchiveMarkdown(post))
  return <Markdown source={markdown} />
}
