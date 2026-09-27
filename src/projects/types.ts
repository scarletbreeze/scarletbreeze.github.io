import type { ComponentType } from 'react'
import type { Project } from '@/types/project'

export interface ProjectViewProps {
  project: Project
}

export type ProjectView = ComponentType<ProjectViewProps>
