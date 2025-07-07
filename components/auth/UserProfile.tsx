import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { 
  User, 
  Mail, 
  Shield, 
  Crown, 
  Settings, 
  LogOut, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { TwoFactorAuth } from './TwoFactorAuth';
import { PaywallModal } from '../subscription/PaywallModal';

interface UserProfileProps {
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  if (!user) return null;

  if (showTwoFactor) {
    return (
      <TwoFactorAuth
        mode="setup"
        onBack={() => setShowTwoFactor(false)}
        onComplete={() => setShowTwoFactor(false)}
      />
    );
  }

  const handleLogout = () => {
    logout();
  };

  const handleUpgradeClick = () => {
    if (user.subscription === 'free') {
      setShowPaywall(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <p className="text-gray-600 text-sm">Manage your profile and subscription</p>
        </div>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Crown className={`w-6 h-6 mx-auto mb-1 ${
                user.subscription === 'premium' ? 'text-yellow-500' : 'text-gray-400'
              }`} />
              <p className="text-sm font-medium">Subscription</p>
              <Badge variant={user.subscription === 'premium' ? 'default' : 'outline'}>
                {user.subscription === 'premium' ? 'Premium' : 'Free'}
              </Badge>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Shield className={`w-6 h-6 mx-auto mb-1 ${
                user.twoFactorEnabled ? 'text-green-500' : 'text-gray-400'
              }`} />
              <p className="text-sm font-medium">Two-Factor Auth</p>
              <Badge variant={user.twoFactorEnabled ? 'default' : 'outline'}>
                {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Verification */}
      {!user.emailVerified && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Please verify your email address to access all features.</span>
            <Button variant="outline" size="sm">
              Verify Email
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Subscription Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Subscription Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.subscription === 'free' ? (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Upgrade to Premium to unlock advanced features like detailed analytics, 
                export capabilities, and unlimited platform calculations.
              </p>
              <Button onClick={handleUpgradeClick} className="w-full">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  You have full access to all Premium features. Thank you for your support!
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Manage Billing
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            {user.twoFactorEnabled ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enabled
              </Badge>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTwoFactor(true)}
              >
                Enable 2FA
              </Button>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-600">
                Last updated 30 days ago
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Premium Subscription"
      />
    </div>
  );
};