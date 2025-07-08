import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { TwoFactorAuth } from '../components/auth/TwoFactorAuth';
import { UserProfile } from '../components/auth/UserProfile';
import { PaywallModal } from '../components/subscription/PaywallModal';
import { Dashboard } from '../components/Dashboard';
import { StreamInput } from '../components/StreamInput';
import { Results } from '../components/Results';
import { SettingsPage } from '../components/SettingsPage';
import { NavigationHeader } from '../components/NavigationHeader';
import { LandingPage } from '../components/LandingPage';

export interface StreamData {
  platform: string;
  streams: number;
  country: string;
  ownershipPercentage: number;
  distributionCut: number;
}

export interface CalculationResult {
  platform: string;
  streams: number;
  payoutRate: number;
  grossEarnings: number;
  netEarnings: number;
  country: string;
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | '2fa'>('login');
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'signup' | '2fa' | 'dashboard' | 'input' | 'results' | 'settings' | 'profile'>('landing');
  const [streamData, setStreamData] = useState<StreamData[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [paywallFeature, setPaywallFeature] = useState<string>('');
  const [showPaywall, setShowPaywall] = useState(false);

  const checkPremiumFeature = (feature: string) => {
    if (!user || user.subscription === 'free') {
      setPaywallFeature(feature);
      setShowPaywall(true);
      return false;
    }
    return true;
  };

  const calculateRoyalties = (data: StreamData[]) => {
    if (user?.subscription === 'free' && data.length > 3) {
      setPaywallFeature('Unlimited Platforms');
      setShowPaywall(true);
      return;
    }

    const payoutRates: { [key: string]: { [country: string]: number } } = {
      'Spotify': { 'US': 3.50, 'UK': 3.20, 'Germany': 3.00, 'Other': 2.80 },
      'Apple Music': { 'US': 7.00, 'UK': 6.50, 'Germany': 6.00, 'Other': 5.50 },
      'YouTube Music': { 'US': 2.00, 'UK': 1.80, 'Germany': 1.60, 'Other': 1.40 },
      'Amazon Music': { 'US': 4.00, 'UK': 3.80, 'Germany': 3.60, 'Other': 3.20 },
      'Deezer': { 'US': 6.00, 'UK': 5.50, 'Germany': 5.00, 'Other': 4.50 },
      'TikTok': { 'US': 0.50, 'UK': 0.45, 'Germany': 0.40, 'Other': 0.35 }
    };

    const calculatedResults: CalculationResult[] = data.map(item => {
      const rate = payoutRates[item.platform]?.[item.country] || payoutRates[item.platform]?.['Other'] || 1.00;
      const grossEarnings = (item.streams / 1000) * rate;
      const afterDistribution = grossEarnings * (1 - item.distributionCut / 100);
      const netEarnings = afterDistribution * (item.ownershipPercentage / 100);

      return {
        platform: item.platform,
        streams: item.streams,
        payoutRate: rate,
        grossEarnings,
        netEarnings,
        country: item.country
      };
    });

    setResults(calculatedResults);
    setCurrentScreen('results');
  };

  const resetCalculation = () => {
    setStreamData([]);
    setResults([]);
    setCurrentScreen('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl animate-pulse">
              MBU
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-600/30 to-red-500/30 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-300 font-medium">Loading Music Business Unlocked...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show landing page if user is not logged in
  if (!user) {
    if (currentScreen === 'landing') {
      return (
        <LandingPage 
          onLogin={() => {
            console.log('LandingPage onLogin called');
            setAuthMode('login');
            setCurrentScreen('login');
          }}
          onSignup={() => {
            console.log('LandingPage onSignup called');
            setAuthMode('signup');
            setCurrentScreen('signup');
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-950">
        <NavigationHeader 
          user={null}
          onNavigate={(screen) => {
            if (screen === 'landing') {
              setCurrentScreen('landing');
            } else {
              setCurrentScreen(screen as any);
            }
          }}
          currentScreen={currentScreen}
          onLogin={() => {
            setAuthMode('login');
            setCurrentScreen('login');
          }}
          onSignup={() => {
            setAuthMode('signup');
            setCurrentScreen('signup');
          }}
        />
        <div className="flex items-center justify-center p-8 pt-24">
          <div className="w-full max-w-md">
            {(currentScreen === 'login' || authMode === 'login') && (
              <LoginForm
                onSwitchToSignup={() => {
                  setAuthMode('signup');
                  setCurrentScreen('signup');
                }}
                onTwoFactorRequired={() => {
                  setAuthMode('2fa');
                  setCurrentScreen('2fa');
                }}
                onSuccess={() => setCurrentScreen('dashboard')}
              />
            )}
            {(currentScreen === 'signup' || authMode === 'signup') && (
              <SignupForm 
                onSwitchToLogin={() => {
                  setAuthMode('login');
                  setCurrentScreen('login');
                }}
                onSuccess={() => setCurrentScreen('dashboard')}
              />
            )}
            {(currentScreen === '2fa' || authMode === '2fa') && (
              <TwoFactorAuth
                mode="verify"
                onBack={() => {
                  setAuthMode('login');
                  setCurrentScreen('login');
                }}
                onComplete={() => setCurrentScreen('dashboard')}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <NavigationHeader 
        user={user}
        onNavigate={(screen) => setCurrentScreen(screen as any)}
        currentScreen={currentScreen}
        onLogout={() => setCurrentScreen('landing')}
      />
      
      <main className="container mx-auto px-4 py-8 pt-24 max-w-7xl">
        <div className="space-y-8">
          {currentScreen === 'dashboard' && (
            <Dashboard 
              onStartCalculation={() => setCurrentScreen('input')}
              totalStreams={streamData.reduce((sum, item) => sum + item.streams, 0)}
              totalEarnings={results.reduce((sum, result) => sum + result.netEarnings, 0)}
            />
          )}
          
          {currentScreen === 'input' && (
            <StreamInput
              streamData={streamData}
              onStreamDataChange={setStreamData}
              onCalculate={calculateRoyalties}
              onBack={() => setCurrentScreen('dashboard')}
              maxPlatforms={user.subscription === 'free' ? 3 : undefined}
            />
          )}
          
          {currentScreen === 'results' && (
            <Results
              results={results}
              onNewCalculation={resetCalculation}
              onBack={() => setCurrentScreen('input')}
              onExport={() => {
                if (!checkPremiumFeature('Export Reports')) return;
              }}
              canExport={user.subscription === 'premium'}
            />
          )}
          
          {currentScreen === 'settings' && (
            <SettingsPage onBack={() => setCurrentScreen('dashboard')} />
          )}

          {currentScreen === 'profile' && (
            <UserProfile onBack={() => setCurrentScreen('dashboard')} />
          )}
        </div>

        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          feature={paywallFeature}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}