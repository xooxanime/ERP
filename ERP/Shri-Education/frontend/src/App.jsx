import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth & Layout
import { DashboardLayout } from './components/layout/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import TeacherRoute from './components/TeacherRoute';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Shared
import ComingSoon from './pages/shared/ComingSoon';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import CourseContent from './pages/student/CourseContent';
import ProgressTracking from './pages/student/ProgressTracking';
import StudentProfile from './pages/student/Profile';

//Parent Dashboar
import ParentDashboard from './pages/parent/Dashboard';
import ParentCourses from './pages/parent/Courses';
import ParentProgress from './pages/parent/Progress';
import ParentAttendance from './pages/parent/Attendance';
import ParentNotifications from './pages/parent/Notifications';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import ManageCourseContent from './pages/admin/ManageCourseContent';
import AdminFaculty from './pages/admin/Faculty';
import AdminStudyMaterials from './pages/admin/StudyMaterials';
import AdminPayments from './pages/admin/PendingPayments';
import AdminEnrollments from './pages/admin/Enrollments';
import AdminStudents from './pages/admin/Students';
import AdminHeroSection from './pages/admin/HeroSection';
import AdminAnalytics from './pages/admin/Analytics';
import AdminApprovals from './components/AdminApprovals';
import AdminPermissions from './components/AdminPermissions';

// Wrapped route with DashboardLayout
function DashboardRoute({ children, Guard }) {
  return (
    <Guard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </Guard>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ── Student Routes ── */}
        <Route path="/student/dashboard" element={<DashboardRoute Guard={PrivateRoute}><StudentDashboard /></DashboardRoute>} />
        <Route path="/student/my-courses" element={<DashboardRoute Guard={PrivateRoute}><MyCourses /></DashboardRoute>} />
        <Route path="/student/course/:id" element={<DashboardRoute Guard={PrivateRoute}><CourseContent /></DashboardRoute>} />
        <Route path="/student/live-classes" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Live Classes" description="Join live interactive sessions with your instructors." /></DashboardRoute>} />
        <Route path="/student/lectures" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Recorded Lectures" description="Access all recorded class sessions at your convenience." /></DashboardRoute>} />
        <Route path="/student/assignments" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Assignments" description="Submit and track all your assignments here." /></DashboardRoute>} />
        <Route path="/student/tests" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Test Series" description="Practice tests and mock exams to sharpen your skills." /></DashboardRoute>} />
        <Route path="/student/progress" element={<DashboardRoute Guard={PrivateRoute}><ProgressTracking /></DashboardRoute>} />
        <Route path="/student/payments" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Fee & Payments" description="View invoices and payment history." /></DashboardRoute>} />
        <Route path="/student/notifications" element={<DashboardRoute Guard={PrivateRoute}><ComingSoon title="Notifications" description="Stay updated with the latest announcements and alerts." /></DashboardRoute>} />
        <Route path="/student/profile" element={<DashboardRoute Guard={PrivateRoute}><StudentProfile /></DashboardRoute>} />

        {/* ── Teacher Routes ── */}
        <Route path="/teacher/dashboard" element={<DashboardRoute Guard={TeacherRoute}><TeacherDashboard /></DashboardRoute>} />
        <Route path="/teacher/batches" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="My Batches" description="Manage your student batches and class groups." /></DashboardRoute>} />
        <Route path="/teacher/live-classes" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Live Classes" description="Create and manage live interactive class sessions." /></DashboardRoute>} />
        <Route path="/teacher/materials" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Study Materials" description="Upload and organise study materials for your batches." /></DashboardRoute>} />
        <Route path="/teacher/assignments" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Assignments" description="Create assignments and evaluate student submissions." /></DashboardRoute>} />
        <Route path="/teacher/attendance" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Attendance" description="Mark and manage student attendance records." /></DashboardRoute>} />
        <Route path="/teacher/tests" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Test & Results" description="Create tests and publish results." /></DashboardRoute>} />
        <Route path="/teacher/announcements" element={<DashboardRoute Guard={TeacherRoute}><ComingSoon title="Announcements" description="Post announcements for your students." /></DashboardRoute>} />
        <Route path="/teacher/profile" element={<DashboardRoute Guard={TeacherRoute}><StudentProfile /></DashboardRoute>} />


        {/* ── Parent Routes ── */}
<Route
  path="/parent/dashboard"
  element={
    <DashboardRoute Guard={PrivateRoute}>
      <ParentDashboard />
    </DashboardRoute>
  }
/>
<Route
  path="/parent/courses"
  element={
    <DashboardRoute Guard={PrivateRoute}>
      <ParentCourses />
    </DashboardRoute>
  }
/>

<Route
  path="/parent/progress"
  element={
    <DashboardRoute Guard={PrivateRoute}>
      <ParentProgress />
    </DashboardRoute>
  }
/>

<Route
  path="/parent/attendance"
  element={
    <DashboardRoute Guard={PrivateRoute}>
      <ParentAttendance />
    </DashboardRoute>
  }
/>

<Route
  path="/parent/notifications"
  element={
    <DashboardRoute Guard={PrivateRoute}>
      <ParentNotifications />
    </DashboardRoute>
  }
/>

        {/* ── Admin Routes ── */}
        <Route path="/admin/dashboard" element={<DashboardRoute Guard={AdminRoute}><AdminDashboard /></DashboardRoute>} />
        <Route path="/admin/students" element={<DashboardRoute Guard={AdminRoute}><AdminStudents /></DashboardRoute>} />
        <Route path="/admin/faculty" element={<DashboardRoute Guard={AdminRoute}><AdminFaculty /></DashboardRoute>} />
        <Route path="/admin/roles" element={<DashboardRoute Guard={AdminRoute}><ComingSoon title="Roles & Permissions" description="Manage user roles and access control." /></DashboardRoute>} />
        <Route path="/admin/courses" element={<DashboardRoute Guard={AdminRoute}><AdminCourses /></DashboardRoute>} />
        <Route path="/admin/courses/:id/content" element={<DashboardRoute Guard={AdminRoute}><ManageCourseContent /></DashboardRoute>} />
        <Route path="/admin/batches" element={<DashboardRoute Guard={AdminRoute}><ComingSoon title="Batch Management" description="Create and manage student batch groups." /></DashboardRoute>} />
        <Route path="/admin/study-materials" element={<DashboardRoute Guard={AdminRoute}><AdminStudyMaterials /></DashboardRoute>} />
        <Route path="/admin/payments" element={<DashboardRoute Guard={AdminRoute}><AdminPayments /></DashboardRoute>} />
        <Route path="/admin/enrollments" element={<DashboardRoute Guard={AdminRoute}><AdminEnrollments /></DashboardRoute>} />
        <Route path="/admin/approvals" element={<DashboardRoute Guard={AdminRoute}><AdminApprovals /></DashboardRoute>} />
        <Route path="/admin/permissions" element={<DashboardRoute Guard={AdminRoute}><AdminPermissions /></DashboardRoute>} />
        <Route path="/admin/analytics" element={<DashboardRoute Guard={AdminRoute}><AdminAnalytics /></DashboardRoute>} />
        <Route path="/admin/reports" element={<DashboardRoute Guard={AdminRoute}><ComingSoon title="Reports" description="Download detailed reports on students, revenue, and performance." /></DashboardRoute>} />
        <Route path="/admin/announcements" element={<DashboardRoute Guard={AdminRoute}><ComingSoon title="Announcements" description="Post announcements to students and teachers." /></DashboardRoute>} />
        <Route path="/admin/hero-section" element={<DashboardRoute Guard={AdminRoute}><AdminHeroSection /></DashboardRoute>} />
        <Route path="/admin/settings" element={<DashboardRoute Guard={AdminRoute}><ComingSoon title="System Settings" description="Configure system-wide settings and preferences." /></DashboardRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))', borderRadius: '10px', fontSize: '14px' },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </Router>
  );
}

export default App;
