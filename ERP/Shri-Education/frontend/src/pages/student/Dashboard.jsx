import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, Video, ClipboardList, Award, CreditCard, Bell,
  ArrowRight, CheckCircle, Clock, PlayCircle, Calendar
} from 'lucide-react';
import {
  RadialBarChart, RadialBar, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/Primitives';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { formatDate } from '../../lib/utils';
import axios from 'axios';

const attendanceData = [
  { subject: 'Accounts', attendance: 88 },
  { subject: 'Law', attendance: 75 },
  { subject: 'Tax', attendance: 92 },
  { subject: 'Audit', attendance: 68 },
  { subject: 'FM', attendance: 80 },
];

const UPCOMING_CLASSES = [
  { id: 1, title: 'Advanced Auditing', instructor: 'Prof. Mehta', time: 'Today, 3:00 PM', type: 'live' },
  { id: 2, title: 'Corporate Law', instructor: 'Prof. Sharma', time: 'Tomorrow, 10:00 AM', type: 'live' },
  { id: 3, title: 'Income Tax Revision', instructor: 'Prof. Gupta', time: 'Mon, 2:00 PM', type: 'recorded' },
];

const PENDING_ASSIGNMENTS = [
  { id: 1, title: 'AS-15 Case Study', subject: 'Accounts', due: '2 days', status: 'pending' },
  { id: 2, title: 'SEBI Regulations Analysis', subject: 'Law', due: '5 days', status: 'pending' },
  { id: 3, title: 'Ratio Analysis', subject: 'FM', due: 'Submitted', status: 'submitted' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/student/my-courses');
        setCourses(res.data?.data?.enrollments || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="page-header">
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-primary-100 mt-1 text-sm">You have 2 upcoming classes and 2 pending assignments today.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'short' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Enrolled Courses" value={courses.length || 3} icon={BookOpen} color="blue" loading={loading} />
        <StatCard title="Avg Attendance" value="82%" icon={CheckCircle} color="green" trend="up" trendValue={4} />
        <StatCard title="Assignments Due" value="2" icon={ClipboardList} color="amber" subtitle="This week" />
        <StatCard title="Tests Completed" value="14" icon={Award} color="violet" trend="up" trendValue={2} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <Card>
          <CardHeader><CardTitle>Attendance Overview</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip formatter={(v) => [`${v}%`, 'Attendance']} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Classes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/live-classes')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {UPCOMING_CLASSES.map(cls => (
              <div key={cls.id} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-accent/50 transition-colors group">
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${cls.type === 'live' ? 'bg-primary/10 text-primary' : 'bg-violet-500/10 text-violet-500'}`}>
                  {cls.type === 'live' ? <Video className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{cls.title}</p>
                  <p className="text-xs text-muted-foreground">{cls.instructor} · {cls.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={cls.type === 'live' ? 'default' : 'secondary'}>{cls.type === 'live' ? 'Live' : 'Recorded'}</Badge>
                  {cls.type === 'live' && (
                    <Button size="sm" className="hidden group-hover:flex">Join</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assignments</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/assignments')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PENDING_ASSIGNMENTS.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium text-sm">{a.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{a.subject}</TableCell>
                    <TableCell className="text-sm">{a.due}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === 'submitted' ? 'success' : 'warning'} className="capitalize">{a.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader><CardTitle>Quick Access</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'My Courses', icon: BookOpen, color: 'text-primary bg-primary/10', path: '/student/my-courses' },
                { label: 'Test Series', icon: Award, color: 'text-violet-600 bg-violet-500/10', path: '/student/tests' },
                { label: 'Pay Fees', icon: CreditCard, color: 'text-emerald-600 bg-emerald-500/10', path: '/student/payments' },
                { label: 'Notifications', icon: Bell, color: 'text-amber-600 bg-amber-500/10', path: '/student/notifications' },
              ].map(item => (
                <button key={item.label} onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all group">
                  <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
