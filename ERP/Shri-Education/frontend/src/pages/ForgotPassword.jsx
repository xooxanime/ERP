import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
      toast.success('Password reset email sent');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
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
          <p className="text-muted-foreground text-sm mt-1">Enter your email to receive a reset link</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Check your email</h2>
              <p className="text-muted-foreground text-sm mb-6">We sent a password reset link to <strong>{email}</strong>. Check your inbox and click the link to reset your password.</p>
              <Link to="/login"><Button variant="outline" className="w-full"><ArrowLeft className="w-4 h-4" />Back to Login</Button></Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email Address" icon={Mail} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <Button type="submit" disabled={loading} className="w-full h-11">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
