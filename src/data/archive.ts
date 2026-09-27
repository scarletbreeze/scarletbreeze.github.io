import indexFile from '@data/archive/index.json'
import type { ArchiveIndexFile, ArchivePost } from '@/types/archive'

const file = indexFile as ArchiveIndexFile

export const archivePosts: ArchivePost[] = file.posts
export const archiveSource = file.source

export const archiveYears: number[] = [...new Set(archivePosts.map((p) => p.year))].sort((a, b) => b - a)

export function getArchivePost(slug: string | undefined): ArchivePost | undefined {
  return archivePosts.find((p) => p.slug === slug)
}

// Markdown 본문은 필요할 때만 로드한다 (글마다 별도 청크).
const markdownModules = import.meta.glob('/content/archive/**/*.md', { query: '?raw', import: 'default' })

export async function loadArchiveMarkdown(post: ArchivePost): Promise<string> {
  const loader = markdownModules[`/content/archive/${post.file}`]
  if (!loader) throw new Error(`archive file not found: ${post.file}`)
  const raw = (await loader()) as string
  return stripFrontMatter(raw)
}

function stripFrontMatter(raw: string): string {
  if (!raw.startsWith('---')) return raw
  const end = raw.indexOf('\n---', 3)
  return end === -1 ? raw : raw.slice(end + 4).replace(/^\s*\n/, '')
}
