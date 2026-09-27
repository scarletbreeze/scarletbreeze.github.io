import { NavLink } from 'react-router-dom'
import { navItems } from '@/data/nav'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__brand">
          <span className="header__mark">H</span>
          <span>Hero Lab</span>
        </NavLink>
        <nav className="header__nav" aria-label="주 메뉴">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'header__link' + (isActive ? ' is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
