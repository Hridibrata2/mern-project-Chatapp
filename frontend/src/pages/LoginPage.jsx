import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Log in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pb-2">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value.trim() })
                }
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label flex justify-between items-center">
                <span className="label-text font-medium pb-2">Password</span>
                <button
                  type="button"
                  className="text-sm text-primary cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-error text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Log In'}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with like-minded individuals and share your thoughts."
      />
    </div>
  );
};

export default LoginPage;
