import projectsFile from '@data/projects.json'
import type { Project, ProjectsFile } from '@/types/project'

const file = projectsFile as ProjectsFile

export const projects: Project[] = [...file.projects].sort((a, b) => a.order - b.order)

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
