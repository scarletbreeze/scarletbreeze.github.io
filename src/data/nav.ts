export interface NavItem {
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { to: '/projects', label: 'Projects' },
  { to: '/research', label: 'Research' },
  { to: '/notes', label: 'Notes' },
  { to: '/blog', label: 'Blog' },
  { to: '/archive', label: 'Archive' },
  { to: '/about', label: 'About' },
]
