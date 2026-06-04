import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingPage } from './ui/Primitives';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <LoadingPage />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'student') {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/teacher/dashboard'} replace />;
  }
  return children;
};

export default PrivateRoute;
