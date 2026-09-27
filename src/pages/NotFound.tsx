import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="페이지를 찾을 수 없습니다" />
      <Link to="/">← 홈으로</Link>
    </>
  )
}
