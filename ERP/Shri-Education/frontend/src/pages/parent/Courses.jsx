import { useEffect, useState } from 'react';
import { parentAPI } from '../../services/api';

import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { BookOpen } from 'lucide-react';

export default function ParentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await parentAPI.getCourses();
        setCourses(res.data.data.enrollments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Child Courses</h1>
        <p className="text-muted-foreground">
          View all enrolled courses of your child.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-muted-foreground">
              No courses found.
            </p>
          ) : (
            <div className="space-y-4">
              {courses.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />

                    <div>
                      <h3 className="font-semibold">
                        {enrollment.courseId?.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Progress: {enrollment.progress}%
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      enrollment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {enrollment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}