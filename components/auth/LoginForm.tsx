import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, AlertCircle, Unlock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import mbuLogo from 'figma:asset/54e611d199978444ebe0704c09ec1b1879ccbdd0.png';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onTwoFactorRequired: () => void;
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onTwoFactorRequired, onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    } else if (result.requiresTwoFactor) {
      onTwoFactorRequired();
    } else {
      // Login successful
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-700/50 shadow-lg flex items-center justify-center">
              <img src={mbuLogo} alt="Music Business Unlocked" className="w-10 h-auto" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-gray-200 leading-tight">Music Business</h1>
              <h1 className="text-lg font-semibold text-red-400 leading-tight">Unlocked</h1>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-100">Welcome Back</h2>
            <p className="text-gray-400 font-medium">Sign in to unlock your music business potential</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base bg-gray-900/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base pr-12 bg-gray-900/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="rounded-xl border-red-500/50 bg-red-500/10 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold active:scale-95 transition-all duration-200 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800/30 text-gray-400 font-medium">or</span>
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                Sign up
              </button>
            </p>

          </div>

          <div className="p-4 bg-gray-900/50 border border-gray-700/50 rounded-xl">
            <p className="text-xs font-medium text-gray-300 mb-2">Demo accounts:</p>
            <div className="space-y-1 text-xs text-gray-400">
              <p><span className="font-medium text-gray-300">Free:</span> demo@example.com / password</p>
              <p><span className="font-medium text-gray-300">Premium:</span> premium@example.com / password</p>
              <p><span className="font-medium text-gray-300">2FA:</span> 2fa@example.com / password</p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};