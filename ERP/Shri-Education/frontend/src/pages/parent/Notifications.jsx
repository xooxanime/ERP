import { Bell } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/Card';

export default function ParentNotifications() {
  const notifications = [
    {
      id: 1,
      title: 'New Course Enrolled',
      message: 'Your child has been enrolled in a new course.',
      date: 'Today'
    },
    {
      id: 2,
      title: 'Progress Updated',
      message: 'Course progress has been updated.',
      date: 'Yesterday'
    },
    {
      id: 3,
      title: 'Assignment Completed',
      message: 'An assignment was marked as completed.',
      date: '2 days ago'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>

        <p className="text-muted-foreground">
          Important updates related to your child.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border rounded-xl p-4 flex gap-3"
              >
                <Bell className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold">
                    {notification.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}