import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, { password: formData.password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white font-display">S</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">Reset Password</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your new password below</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="New Password" icon={Lock} type="password" placeholder="Min. 6 characters" value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} required />
            <Input label="Confirm Password" icon={Lock} type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))} required />
            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
