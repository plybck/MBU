import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Crown, 
  Users,
  Zap,
  DollarSign,
  Music,
  Play,
  Check,
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  const features = [
    {
      icon: Calculator,
      title: 'Accurate Calculations',
      description: 'Get precise royalty calculations across all major streaming platforms.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Visualize your streaming performance with comprehensive charts and insights.'
    },
    {
      icon: DollarSign,
      title: 'Real-time Rates',
      description: 'Always up-to-date payout rates for accurate earnings projections.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and encryption.'
    }
  ];

  const platforms = [
    { name: 'Spotify', color: 'from-green-500 to-green-400' },
    { name: 'Apple Music', color: 'from-gray-600 to-gray-500' },
    { name: 'YouTube Music', color: 'from-red-500 to-red-400' },
    { name: 'Amazon Music', color: 'from-blue-600 to-blue-500' },
    { name: 'Deezer', color: 'from-purple-600 to-purple-500' },
    { name: 'TikTok', color: 'from-gray-900 to-gray-800' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 border border-red-400/20 shadow-2xl flex items-center justify-center">
              <Music className="w-12 h-12 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-100 leading-tight">Music Business</h1>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent leading-tight">Unlocked</h1>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 leading-tight">
            Calculate Your Music
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-purple-500 bg-clip-text text-transparent block">Streaming Royalties</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get accurate royalty calculations from Spotify, Apple Music, YouTube, and more. 
            Track your earnings, understand your revenue, and grow your music business with professional-grade analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => {
                console.log('Start Calculating Free clicked');
                onSignup();
              }}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-red-500/25 active:scale-95 transition-all duration-200"
            >
              Start Calculating Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                console.log('Sign In clicked');
                onLogin();
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-gray-200 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
            >
              Sign In
            </Button>
          </div>

          {/* Platform Icons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {platforms.map((platform) => (
              <Badge 
                key={platform.name}
                variant="outline" 
                className="px-4 py-2 text-sm border-gray-700 bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:border-gray-600 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${platform.color} mr-2`}></div>
                {platform.name}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-gray-400">
            Trusted by thousands of independent artists and music professionals
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">
              Everything You Need to Track Your Music Revenue
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Professional-grade tools designed specifically for the modern music industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/50 transition-all duration-200">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <CardTitle className="text-lg text-gray-200">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">
              Simple, Transparent Pricing
            </h3>
            <p className="text-lg text-gray-400">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="bg-gray-800/30 backdrop-blur-sm border-2 border-gray-700/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-200">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-100 mb-4">$0</div>
                <p className="text-gray-400">Perfect to get started</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Up to 3 platforms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Basic calculations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Country-specific rates</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-gray-200"
                  onClick={onSignup}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-gray-800/30 backdrop-blur-sm border-2 border-red-500/50 shadow-lg shadow-red-500/25 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-200">Premium</CardTitle>
                <div className="text-4xl font-bold text-gray-100 mb-4">$9.99</div>
                <p className="text-gray-400">For serious music professionals</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Unlimited platforms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Export reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25"
                  onClick={onSignup}
                >
                  Start Premium Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Unlock Your Music Business?
          </h3>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of artists already tracking their streaming revenue
          </p>
          <Button 
            size="lg"
            variant="outline"
            onClick={onSignup}
            className="bg-white/95 text-red-600 hover:bg-white border-white px-8 py-4 text-lg rounded-xl shadow-lg active:scale-95 transition-all duration-200"
          >
            Start Your Free Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-950 text-white border-t border-gray-800/50">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 border border-red-400/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-200">Music Business Unlocked</span>
          </div>
          <p className="text-gray-400 mb-4">
            Professional streaming royalty calculations for the modern music industry
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Music Business Unlocked. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};