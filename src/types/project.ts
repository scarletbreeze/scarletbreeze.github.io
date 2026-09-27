export type ProjectStatus = 'planned' | 'in-progress' | 'live'

export interface Project {
  slug: string
  name: string
  tagline: string
  question: string
  description: string
  status: ProjectStatus
  tags: string[]
  order: number
}

export interface ProjectsFile {
  source: string
  projects: Project[]
}
