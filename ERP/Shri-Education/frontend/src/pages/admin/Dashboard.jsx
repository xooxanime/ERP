import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, GraduationCap, BookOpen, CreditCard, TrendingUp, AlertCircle,
  UserCheck, Clock, ArrowRight, CheckCircle, XCircle, MoreVertical
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/Primitives';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from '../../components/ui/Table';
import { Avatar } from '../../components/ui/Avatar';
import { formatCurrency, formatDate } from '../../lib/utils';
import axios from 'axios';

const revenueData = [
  { month: 'Jan', revenue: 145000, enrollments: 28 },
  { month: 'Feb', revenue: 162000, enrollments: 32 },
  { month: 'Mar', revenue: 189000, enrollments: 41 },
  { month: 'Apr', revenue: 175000, enrollments: 38 },
  { month: 'May', revenue: 210000, enrollments: 47 },
  { month: 'Jun', revenue: 198000, enrollments: 44 },
];

const courseDistribution = [
  { name: 'CA Foundation', value: 38, color: '#3b82f6' },
  { name: 'CA Inter', value: 32, color: '#8b5cf6' },
  { name: 'CA Final', value: 22, color: '#10b981' },
  { name: 'Other', value: 8, color: '#f59e0b' },
];

const RECENT_PAYMENTS = [
  { id: 1, student: 'Ravi Kumar', course: 'CA Final', amount: 25000, status: 'paid', date: new Date() },
  { id: 2, student: 'Priya Sharma', course: 'CA Inter', amount: 18000, status: 'pending', date: new Date() },
  { id: 3, student: 'Arjun Singh', course: 'CA Foundation', amount: 12000, status: 'paid', date: new Date() },
  { id: 4, student: 'Neha Patel', course: 'CA Final', amount: 25000, status: 'pending', date: new Date() },
  { id: 5, student: 'Mohit Gupta', course: 'CA Inter', amount: 18000, status: 'failed', date: new Date() },
];

const statusVariant = { paid: 'success', pending: 'warning', failed: 'destructive' };

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{p.name === 'Revenue' ? formatCurrency(p.value) : p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, revenue: 0 });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.allSettled([
          axios.get('/api/admin/students'),
          axios.get('/api/courses'),
        ]);

        const students = studentsRes.status === 'fulfilled' ? studentsRes.value.data?.data?.students || [] : [];
        const courses = coursesRes.status === 'fulfilled' ? coursesRes.value.data?.data?.courses || [] : [];

        setStats({
          students: students.length,
          teachers: Math.floor(students.length * 0.1) + 4,
          courses: courses.length,
          revenue: 892000,
        });
        setRecentStudents(students.slice(0, 5));
      } catch (e) {
        // use mock data
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/reports')}>View Reports</Button>
          <Button size="sm" onClick={() => navigate('/admin/students')}>Add Student</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={loading ? '...' : stats.students || '247'} icon={GraduationCap} color="blue" trend="up" trendValue={12} subtitle="Active learners" loading={loading} />
        <StatCard title="Faculty Members" value={loading ? '...' : stats.teachers || '18'} icon={Users} color="violet" trend="up" trendValue={5} subtitle="Across all batches" loading={loading} />
        <StatCard title="Active Courses" value={loading ? '...' : stats.courses || '12'} icon={BookOpen} color="green" trend="up" trendValue={8} subtitle="Running this semester" loading={loading} />
        <StatCard title="Total Revenue" value={formatCurrency(stats.revenue || 892000)} icon={CreditCard} color="amber" trend="up" trendValue={18} subtitle="This academic year" loading={loading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue & Enrollments</CardTitle>
              <Badge variant="success">↑ 18% this month</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution */}
        <Card>
          <CardHeader><CardTitle>Course Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {courseDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {courseDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/payments')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_PAYMENTS.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.student}</TableCell>
                    <TableCell className="text-muted-foreground">{p.course}</TableCell>
                    <TableCell>{formatCurrency(p.amount)}</TableCell>
                    <TableCell><Badge variant={statusVariant[p.status]} className="capitalize">{p.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Registrations</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/students')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.length > 0 ? recentStudents.map(s => (
                  <TableRow key={s._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar name={s.name} size="sm" />
                        <div>
                          <p className="font-medium text-sm">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.enrolledCourses?.length || 0}</TableCell>
                    <TableCell><Badge variant={s.isActive ? 'success' : 'destructive'}>{s.isActive ? 'Active' : 'Inactive'}</Badge></TableCell>
                  </TableRow>
                )) : (
                  [
                    { name: 'Ravi Kumar', email: 'ravi@example.com', courses: 2, active: true },
                    { name: 'Priya Sharma', email: 'priya@example.com', courses: 1, active: true },
                    { name: 'Amit Patel', email: 'amit@example.com', courses: 3, active: false },
                  ].map((s, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar name={s.name} size="sm" />
                          <div>
                            <p className="font-medium text-sm">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{s.courses}</TableCell>
                      <TableCell><Badge variant={s.active ? 'success' : 'destructive'}>{s.active ? 'Active' : 'Inactive'}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Add Student', icon: GraduationCap, color: 'text-primary bg-primary/10', path: '/admin/students' },
              { label: 'Add Course', icon: BookOpen, color: 'text-violet-600 bg-violet-500/10', path: '/admin/courses' },
              { label: 'Pending Payments', icon: CreditCard, color: 'text-amber-600 bg-amber-500/10', path: '/admin/payments' },
              { label: 'View Reports', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-500/10', path: '/admin/analytics' },
            ].map(action => (
              <button key={action.label} onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all duration-150 group">
                <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
