import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Shield, Smartphone, ArrowLeft, AlertCircle, CheckCircle, Copy, Unlock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TwoFactorAuthProps {
  mode: 'verify' | 'setup';
  onBack: () => void;
  onComplete?: () => void;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ mode, onBack, onComplete }) => {
  const { verifyTwoFactor, enableTwoFactor, confirmTwoFactor, isLoading } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'generate' | 'confirm'>(mode === 'setup' ? 'generate' : 'confirm');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (mode === 'setup' && step === 'generate') {
      handleGenerateSecret();
    }
  }, [mode, step]);

  const handleGenerateSecret = async () => {
    try {
      const result = await enableTwoFactor();
      setSecret(result.secret);
      setQrCode(result.qrCode);
      setStep('confirm');
    } catch (err) {
      setError('Failed to generate secret');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    let result;
    if (mode === 'verify') {
      result = await verifyTwoFactor(code);
    } else {
      result = await confirmTwoFactor(code, secret);
    }

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onComplete?.();
      }, 1500);
    } else {
      setError(result.error || 'Invalid code');
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = secret;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl border-0 shadow-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'setup' ? 'Security Unlocked!' : 'Access Granted'}
              </h2>
            </div>
            <p className="text-gray-600">
              {mode === 'setup' 
                ? 'Two-factor authentication has been successfully enabled'
                : 'Welcome back to Music Business Unlocked'
              }
            </p>
          </CardHeader>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-gray-500">
                {mode === 'setup' ? 'Secure your account' : 'Enter your verification code'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === 'setup' && step === 'confirm' && (
            <div className="space-y-4">
              <Alert className="rounded-xl border-red-200 bg-red-50">
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </AlertDescription>
              </Alert>

              {qrCode && (
                <div className="text-center space-y-3">
                  <div className="p-4 bg-white border-2 border-red-200 rounded-xl inline-block">
                    <div className="w-32 h-32 bg-red-50 rounded-xl flex items-center justify-center">
                      <p className="text-xs text-red-600 text-center">
                        QR Code<br />
                        (Mock Display)
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Manual Entry Key:</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-red-50 border border-red-200 rounded-xl text-sm font-mono">
                        {secret}
                      </code>
                      <Button variant="outline" size="sm" onClick={copySecret} className="border-red-200 hover:bg-red-50">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="code" className="text-sm font-medium text-gray-700">Authentication Code</Label>
                <Badge variant="outline" className="text-xs border-red-200 text-red-600">6 digits</Badge>
              </div>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-wider font-mono h-12"
                disabled={isLoading}
                maxLength={6}
              />
              <p className="text-xs text-gray-500 text-center">
                {mode === 'setup' 
                  ? 'Enter the 6-digit code from your authenticator app'
                  : 'Open your authenticator app and enter the current code'
                }
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold active:scale-95 transition-all duration-200" 
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? 'Verifying...' : (mode === 'setup' ? 'Enable 2FA' : 'Verify Code')}
            </Button>
          </form>

          {mode === 'verify' && (
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Demo code:</span> <strong>123456</strong>
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};