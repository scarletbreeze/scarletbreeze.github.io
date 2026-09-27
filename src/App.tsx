import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ProjectsIndex from '@/pages/ProjectsIndex'
import ProjectDetail from '@/pages/ProjectDetail'
import ContentSection from '@/pages/ContentSection'
import ArchiveIndex from '@/pages/ArchiveIndex'
import ArchivePost from '@/pages/ArchivePost'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

// 모든 라우트는 이 파일에서만 정의한다 (AGENTS.md).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectsIndex />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="research" element={<ContentSection section="research" />} />
        <Route path="notes" element={<ContentSection section="notes" />} />
        <Route path="blog" element={<ContentSection section="blog" />} />
        <Route path="archive" element={<ArchiveIndex />} />
        <Route path="archive/:slug" element={<ArchivePost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
