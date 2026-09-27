export interface ArchivePost {
  slug: string
  title: string
  date: string
  year: number
  tags: string[]
  categories: string[]
  file: string
}

export interface ArchiveIndexFile {
  source: string
  count: number
  posts: ArchivePost[]
}
