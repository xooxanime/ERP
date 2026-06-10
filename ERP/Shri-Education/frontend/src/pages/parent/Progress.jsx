import { useEffect, useState } from 'react';
import { parentAPI } from '../../services/api';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/Card';

export default function ParentProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await parentAPI.getProgress();
        setProgress(res.data.data.progress || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Child Progress</h1>

        <p className="text-muted-foreground">
          Monitor course completion and performance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : progress.length === 0 ? (
            <p className="text-muted-foreground">
              No progress records found.
            </p>
          ) : (
            <div className="space-y-4">
              {progress.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">
                      {item.course?.title}
                    </h3>

                    <span className="font-medium">
                      {item.completionPercentage}%
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${item.completionPercentage}%`
                      }}
                    />
                  </div>

                  <div className="mt-3 text-sm text-muted-foreground">
                    Time Spent: {item.timeSpent || 0} mins
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