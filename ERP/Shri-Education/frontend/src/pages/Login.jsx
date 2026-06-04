import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const role = result.user?.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'teacher') navigate('/teacher/dashboard');
      else if (role === 'parent') navigate('/parent/dashboard');
      else navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white font-display">S</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to Shri Education ERP</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                icon={Lock}
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-base">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
