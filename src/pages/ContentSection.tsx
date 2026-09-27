import PageHeader from '@/components/common/PageHeader'
import { contentSections, type ContentSectionKey } from '@/data/contentSections'
import EmptyState from '@/components/common/EmptyState'

export default function ContentSection({ section }: { section: ContentSectionKey }) {
  const meta = contentSections[section]
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
      <EmptyState message={meta.emptyMessage} />
    </>
  )
}
