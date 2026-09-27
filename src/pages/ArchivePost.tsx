import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArchivePost, loadArchiveMarkdown } from '@/data/archive'
import PageHeader from '@/components/common/PageHeader'
import Markdown from '@/components/common/Markdown'
import Tag from '@/components/common/Tag'
import NotFound from './NotFound'
import './Archive.css'

export default function ArchivePost() {
  const { slug } = useParams()
  const post = getArchivePost(slug)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!post) return
    setMarkdown(null)
    setError(null)
    loadArchiveMarkdown(post).then(setMarkdown).catch((e: Error) => setError(e.message))
  }, [post])

  if (!post) return <NotFound />

  return (
    <>
      <Link to={`/archive?year=${post.year}`} className="muted">← Archive {post.year}</Link>
      <PageHeader
        eyebrow={post.date}
        title={post.title}
        aside={<div className="archive__tags">{post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
      />
      {error && <p className="muted">불러오지 못했습니다: {error}</p>}
      {markdown === null && !error && <p className="muted">불러오는 중…</p>}
      {markdown !== null && <Markdown source={markdown} />}
    </>
  )
}
