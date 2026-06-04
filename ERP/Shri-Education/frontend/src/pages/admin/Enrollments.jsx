import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Loading from '../../components/Loading';
import AdminLayout from '../../components/AdminLayout';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await adminAPI.getEnrollments();
      setEnrollments(response.data.data.enrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><Loading /></AdminLayout>;

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Enrollments
        </h1>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4">Student</th>
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Progress</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {enrollment.studentId.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {enrollment.studentId.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {enrollment.courseId.title}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {formatDate(enrollment.enrollmentDate)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {enrollment.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        enrollment.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Enrollments;
