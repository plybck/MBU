import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Crown, Unlock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, feature }) => {
  const { user, upgradeSubscription } = useAuth();

  const handleUpgrade = async () => {
    const result = await upgradeSubscription();
    if (result.success) {
      onClose();
    }
  };

  const freeFeatures = [
    'Basic royalty calculations',
    'Up to 3 platforms per calculation',
    'Basic earnings breakdown',
    'Country selection'
  ];

  const premiumFeatures = [
    'Everything in Free',
    'Unlimited platforms',
    'Detailed analytics & charts',
    'Export to PDF/CSV',
    'Historical data tracking',
    'Advanced country comparisons',
    'Priority customer support',
    'Early access to new features'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Unlock className="w-5 h-5 text-red-600" />
            Unlock Premium Features
          </DialogTitle>
          <DialogDescription>
            Upgrade to Premium to access {feature} and unlock all powerful features for your music business.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card className="relative border-red-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Free Plan
                    {user?.subscription === 'free' && (
                      <Badge variant="outline" className="border-red-200 text-red-600">Current</Badge>
                    )}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$0</div>
                    <div className="text-sm text-gray-600">Forever</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-red-200 bg-gradient-to-br from-red-50 to-white">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Unlock Everything
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Premium Plan
                    {user?.subscription === 'premium' && (
                      <Badge className="bg-red-600">Active</Badge>
                    )}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$9.99</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-red-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {user?.subscription !== 'premium' && (
                  <Button 
                    onClick={handleUpgrade}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Unlock Premium Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              🔒 Secure payment processing • Cancel anytime • 30-day money-back guarantee
            </p>
            <p className="text-xs text-gray-500">
              Demo: Click "Unlock Premium Now" to simulate premium access
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};