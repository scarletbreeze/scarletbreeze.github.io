import type { ReactNode } from 'react'
import './PageHeader.css'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  aside?: ReactNode
}

export default function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <p className="page-header__eyebrow mono">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-header__desc muted">{description}</p>}
      </div>
      {aside && <div className="page-header__aside">{aside}</div>}
    </div>
  )
}
