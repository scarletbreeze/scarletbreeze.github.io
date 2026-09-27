export type ContentSectionKey = 'research' | 'notes' | 'blog'

interface ContentSectionMeta {
  eyebrow: string
  title: string
  description: string
  emptyMessage: string
}

export const contentSections: Record<ContentSectionKey, ContentSectionMeta> = {
  research: {
    eyebrow: 'Research',
    title: '연구노트',
    description: '증권업·투자 생태계에 대한 조사와 분석. 프로젝트의 재료가 되는 글.',
    emptyMessage: '첫 연구노트를 준비 중입니다. content/research/에 Markdown으로 쌓입니다.',
  },
  notes: {
    eyebrow: 'Notes',
    title: '짧은 메모',
    description: '배운 것, 실험 결과, 아직 정리되지 않은 생각.',
    emptyMessage: '아직 메모가 없습니다. content/notes/에 쌓입니다.',
  },
  blog: {
    eyebrow: 'Blog',
    title: '개발 블로그',
    description: 'Hero Lab을 만들며 남기는 기록. 2017–2019년 글은 Archive에 있다.',
    emptyMessage: '첫 글을 준비 중입니다. content/posts/에 쌓입니다.',
  },
}
