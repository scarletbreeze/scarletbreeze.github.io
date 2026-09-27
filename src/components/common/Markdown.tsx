import { useMemo } from 'react'
import { marked } from 'marked'
import './Markdown.css'

// 신뢰할 수 있는 저장소 내부 Markdown만 렌더링한다. 외부 입력에는 사용하지 않는다.
export default function Markdown({ source }: { source: string }) {
  const html = useMemo(() => marked.parse(source, { async: false, gfm: true, breaks: true }), [source])
  return <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}
