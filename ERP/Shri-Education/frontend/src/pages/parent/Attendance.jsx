import { useEffect, useState } from 'react';
import { parentAPI } from '../../services/api';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/Card';

import { CalendarDays } from 'lucide-react';

export default function ParentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await parentAPI.getAttendance();
        setAttendance(res.data.data.attendance || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance Overview</h1>

        <p className="text-muted-foreground">
          Track your child's attendance and activity.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Attendance</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : attendance.length === 0 ? (
            <p className="text-muted-foreground">
              No attendance records found.
            </p>
          ) : (
            <div className="space-y-4">
              {attendance.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-primary" />

                    <div>
                      <h3 className="font-semibold">
                        {item.course}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Last Access:
                        {' '}
                        {item.lastAccessedDate
                          ? new Date(item.lastAccessedDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium">
                      {item.progress}%
                    </div>

                    <div
                      className={`text-xs ${
                        item.status === 'completed'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}