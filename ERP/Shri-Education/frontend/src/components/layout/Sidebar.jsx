import { useState, createContext, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, FileText, ClipboardList,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Bell, CreditCard,
  Video, BookMarked, ListChecks, UserCog, Shield, Megaphone, PieChart,
  School, FolderOpen, CalendarDays, Award, HelpCircle, Home
} from 'lucide-react';

const SidebarContext = createContext({});
export const useSidebar = () => useContext(SidebarContext);

const STUDENT_NAV = [
  { label: 'Overview', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'My Courses', icon: BookOpen, path: '/student/my-courses' },
  { label: 'Live Classes', icon: Video, path: '/student/live-classes' },
  { label: 'Recorded Lectures', icon: BookMarked, path: '/student/lectures' },
  { label: 'Assignments', icon: ClipboardList, path: '/student/assignments' },
  { label: 'Test Series', icon: ListChecks, path: '/student/tests' },
  { label: 'Progress', icon: BarChart3, path: '/student/progress' },
  { label: 'Fee & Payments', icon: CreditCard, path: '/student/payments' },
  { label: 'Notifications', icon: Bell, path: '/student/notifications' },
  { label: 'Profile', icon: Settings, path: '/student/profile' },
];

const TEACHER_NAV = [
  { label: 'Overview', icon: LayoutDashboard, path: '/teacher/dashboard' },
  { label: 'My Batches', icon: School, path: '/teacher/batches' },
  { label: 'Live Classes', icon: Video, path: '/teacher/live-classes' },
  { label: 'Study Materials', icon: FolderOpen, path: '/teacher/materials' },
  { label: 'Assignments', icon: ClipboardList, path: '/teacher/assignments' },
  { label: 'Attendance', icon: CalendarDays, path: '/teacher/attendance' },
  { label: 'Test & Results', icon: Award, path: '/teacher/tests' },
  { label: 'Announcements', icon: Megaphone, path: '/teacher/announcements' },
  { label: 'Profile', icon: Settings, path: '/teacher/profile' },
];

const ADMIN_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { group: 'User Management' },
  { label: 'Students', icon: GraduationCap, path: '/admin/students' },
  { label: 'Teachers', icon: Users, path: '/admin/faculty' },
  { label: 'Staff & Roles', icon: Shield, path: '/admin/roles' },
  { group: 'Academic' },
  { label: 'Courses', icon: BookOpen, path: '/admin/courses' },
  { label: 'Batches', icon: School, path: '/admin/batches' },
  { label: 'Study Materials', icon: FolderOpen, path: '/admin/study-materials' },
  { group: 'Finance' },
  { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { label: 'Enrollments', icon: FileText, path: '/admin/enrollments' },
  { group: 'Reports' },
  { label: 'Analytics', icon: PieChart, path: '/admin/analytics' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { group: 'System' },
  { label: 'Announcements', icon: Megaphone, path: '/admin/announcements' },
  { label: 'Hero Section', icon: Home, path: '/admin/hero-section' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

function NavGroup({ label }) {
  return (
    <div className="px-3 pt-4 pb-1">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">{label}</p>
    </div>
  );
}

function SidebarNavItem({ item, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && item.path !== '/student/dashboard' && item.path !== '/teacher/dashboard' && location.pathname.startsWith(item.path));

  return (
    <NavLink to={item.path}
      className={cn('sidebar-link', isActive && 'active')}
    >
      <item.icon className="link-icon" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

export function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = user?.role === 'admin' ? ADMIN_NAV : user?.role === 'teacher' ? TEACHER_NAV : STUDENT_NAV;
  const roleLabel = user?.role === 'admin' ? 'Admin Panel' : user?.role === 'teacher' ? 'Teacher Portal' : 'Student Portal';
  const roleColor = user?.role === 'admin' ? 'bg-violet-500' : user?.role === 'teacher' ? 'bg-emerald-500' : 'bg-primary';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className={cn(
      'fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-40 transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border flex-shrink-0">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white text-sm', roleColor)}>
          S
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sidebar-foreground font-bold text-sm leading-tight font-display">Shri Education</p>
            <p className="text-sidebar-foreground/50 text-xs">{roleLabel}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 no-scrollbar space-y-0.5">
        {navItems.map((item, i) =>
          item.group
            ? (!collapsed && <NavGroup key={i} label={item.group} />)
            : <SidebarNavItem key={item.path} item={item} collapsed={collapsed} />
        )}
      </nav>

      {/* User + Collapse */}
      <div className="flex-shrink-0 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sidebar-foreground text-sm font-medium truncate">{user?.name}</p>
              <p className="text-sidebar-foreground/50 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <div className={cn('flex items-center px-2 pb-3 gap-1', collapsed ? 'flex-col' : '')}>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && 'Logout'}
          </button>
          <button onClick={() => setCollapsed(v => !v)}
            className="flex items-center justify-center p-2 text-sidebar-foreground/50 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
