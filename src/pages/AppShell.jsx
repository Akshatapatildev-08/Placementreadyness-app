import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Code,
  ClipboardCheck,
  BookOpen,
  User,
} from 'lucide-react';
import './AppShell.css';

const NAV_ITEMS = [
  { to: '/dashboard',    label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/practice',     label: 'Practice',    icon: Code },
  { to: '/assessments',  label: 'Assessments', icon: ClipboardCheck },
  { to: '/resources',    label: 'Resources',   icon: BookOpen },
  { to: '/profile',      label: 'Profile',     icon: User },
];

export default function AppShell() {
  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="app-shell__sidebar">
        <div className="app-shell__logo">Placement Prep</div>
        <nav className="app-shell__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `app-shell__link${isActive ? ' app-shell__link--active' : ''}`
              }
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Main Area ── */}
      <div className="app-shell__main">
        {/* Header */}
        <header className="app-shell__header">
          <span className="app-shell__header-title">Placement Prep</span>
          <div className="app-shell__avatar" aria-label="User avatar">
            <User size={18} strokeWidth={1.5} />
          </div>
        </header>

        {/* Content */}
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
