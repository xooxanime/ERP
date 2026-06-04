import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Bell, Search, Sun, Moon, ChevronDown, Settings, LogOut, User, Menu } from 'lucide-react';
import { Dropdown } from '../ui/Primitives';
import { Avatar } from '../ui/Avatar';

const BREADCRUMB_MAP = {
  '/student/dashboard': ['Dashboard'],
  '/student/my-courses': ['Dashboard', 'My Courses'],
  '/student/live-classes': ['Dashboard', 'Live Classes'],
  '/student/lectures': ['Dashboard', 'Recorded Lectures'],
  '/student/assignments': ['Dashboard', 'Assignments'],
  '/student/tests': ['Dashboard', 'Test Series'],
  '/student/progress': ['Dashboard', 'Progress'],
  '/student/payments': ['Dashboard', 'Fee & Payments'],
  '/student/notifications': ['Dashboard', 'Notifications'],
  '/student/profile': ['Dashboard', 'Profile'],
  '/teacher/dashboard': ['Dashboard'],
  '/teacher/batches': ['Dashboard', 'My Batches'],
  '/teacher/live-classes': ['Dashboard', 'Live Classes'],
  '/teacher/materials': ['Dashboard', 'Study Materials'],
  '/teacher/assignments': ['Dashboard', 'Assignments'],
  '/teacher/attendance': ['Dashboard', 'Attendance'],
  '/teacher/tests': ['Dashboard', 'Test & Results'],
  '/teacher/announcements': ['Dashboard', 'Announcements'],
  '/teacher/profile': ['Dashboard', 'Profile'],
  '/admin/dashboard': ['Admin', 'Dashboard'],
  '/admin/students': ['Admin', 'Students'],
  '/admin/faculty': ['Admin', 'Teachers'],
  '/admin/roles': ['Admin', 'Roles & Permissions'],
  '/admin/courses': ['Admin', 'Courses'],
  '/admin/batches': ['Admin', 'Batches'],
  '/admin/study-materials': ['Admin', 'Study Materials'],
  '/admin/payments': ['Admin', 'Payments'],
  '/admin/enrollments': ['Admin', 'Enrollments'],
  '/admin/analytics': ['Admin', 'Analytics'],
  '/admin/reports': ['Admin', 'Reports'],
  '/admin/announcements': ['Admin', 'Announcements'],
  '/admin/settings': ['Admin', 'Settings'],
};

export function Topbar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const { dark, toggleDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  const breadcrumbs = BREADCRUMB_MAP[location.pathname] || ['Dashboard'];

  const handleLogout = () => { logout(); navigate('/login'); };

  const profileItems = [
    { label: 'My Profile', icon: User, onClick: () => navigate(user?.role === 'admin' ? '/admin/settings' : user?.role === 'teacher' ? '/teacher/profile' : '/student/profile') },
    { label: 'Settings', icon: Settings, onClick: () => navigate(user?.role === 'admin' ? '/admin/settings' : '/student/profile') },
    { separator: true },
    { label: 'Logout', icon: LogOut, onClick: handleLogout, danger: true },
  ];

  const mockNotifications = [
    { id: 1, text: 'New assignment posted in CA Final', time: '2m ago', unread: true },
    { id: 2, text: 'Your fee payment was received', time: '1h ago', unread: true },
    { id: 3, text: 'Live class starts in 30 minutes', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-4 sticky top-0 z-30">
      {/* Mobile menu */}
      <button onClick={() => setMobileOpen(v => !v)}
        className="lg:hidden p-2 text-muted-foreground hover:bg-accent rounded-lg">
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop collapse button */}
      <button onClick={() => setCollapsed(v => !v)}
        className="hidden lg:flex p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs */}
      <nav className="hidden sm:flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/40">/</span>}
            <span className={cn(i === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground cursor-pointer')}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2 w-56 border border-border/50">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input placeholder="Search..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
      </div>

      {/* Dark mode */}
      <button onClick={toggleDark}
        className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button onClick={() => setNotifOpen(v => !v)}
          className="relative p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-12 z-50 w-80 bg-popover border border-border rounded-xl shadow-elevated animate-scale-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold">Notifications</p>
              <button className="text-xs text-primary hover:underline" onClick={() => setNotifOpen(false)}>Mark all read</button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {mockNotifications.map(n => (
                <div key={n.id} className={cn('flex items-start gap-3 px-4 py-3 border-b border-border/50 cursor-pointer hover:bg-accent/50 transition-colors', n.unread && 'bg-primary/5')}>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                  {!n.unread && <span className="w-2 h-2 mt-1.5 flex-shrink-0" />}
                  <div>
                    <p className="text-sm text-foreground">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5">
              <button className="text-sm text-primary hover:underline w-full text-center" onClick={() => setNotifOpen(false)}>View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Profile dropdown */}
      <Dropdown
        align="right"
        trigger={
          <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent rounded-lg transition-colors">
            <Avatar name={user?.name} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground leading-tight">{user?.name?.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
          </button>
        }
        items={profileItems}
      />
    </header>
  );
}

export default Topbar;
