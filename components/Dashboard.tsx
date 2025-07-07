import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, DollarSign, Calculator, Unlock, ArrowRight, Music2, Zap } from 'lucide-react';
import { getPlatformLogo, platformColors, platformAccents } from './DSPLogos';

interface DashboardProps {
  onStartCalculation: () => void;
  totalStreams: number;
  totalEarnings: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onStartCalculation, 
  totalStreams, 
  totalEarnings 
}) => {
  const platforms = [
    { name: 'Spotify', gradient: platformColors['spotify'] || 'from-green-500 to-green-400' },
    { name: 'Apple Music', gradient: platformColors['apple music'] || 'from-gray-600 to-gray-500' },
    { name: 'YouTube Music', gradient: platformColors['youtube music'] || 'from-red-500 to-red-400' },
    { name: 'Amazon Music', gradient: platformColors['amazon music'] || 'from-blue-600 to-blue-500' },
    { name: 'Deezer', gradient: platformColors['deezer'] || 'from-purple-600 to-purple-500' },
    { name: 'TikTok', gradient: platformColors['tiktok'] || 'from-gray-900 to-gray-800' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Hero Card */}
        <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/10">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/25">
              <Zap className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">
                Unlock Your Music Business
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Calculate your streaming royalties and understand your music revenue across all major platforms. 
                Get insights that help you make informed decisions about your music career.
              </p>
              <Button 
                onClick={onStartCalculation}
                className="px-8 py-4 text-lg font-medium group active:scale-95 transition-all duration-200 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Start New Calculation
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {totalStreams > 0 && (
          <div className="space-y-4">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 mb-4">
                <Play className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-100 mb-1">
                {formatNumber(totalStreams)}
              </div>
              <p className="font-medium text-gray-400">Total Streams</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 text-green-400 mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-100 mb-1">
                ${totalEarnings.toFixed(2)}
              </div>
              <p className="font-medium text-gray-400">Estimated Earnings</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Supported Platforms */}
        <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Music2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100">Supported Platforms</h3>
                <p className="text-gray-400">Calculate royalties from all major streaming services</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const LogoComponent = getPlatformLogo(platform.name);
                const accentColor = platformAccents[platform.name.toLowerCase() as keyof typeof platformAccents] || 'text-gray-300';
                
                return (
                  <div 
                    key={platform.name} 
                    className="group flex items-center gap-3 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${platform.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <LogoComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-200 group-hover:text-gray-100 transition-colors">{platform.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">How It Works</h3>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Enter Your Streams', desc: 'Add streaming numbers from each platform' },
                { step: '2', title: 'Set Ownership %', desc: 'Adjust your song ownership percentage' },
                { step: '3', title: 'View Results', desc: 'See detailed earnings breakdown and insights' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center font-semibold shadow-lg shadow-red-500/25">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-gray-200 mb-1">{item.title}</p>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Insight - Full Width */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/10">
        <div className="p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/25">
              <Unlock className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-gray-100 mb-3">Music Business Insight</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                Understanding your streaming royalties is crucial for building a sustainable music career. 
                Our professional-grade calculator helps you make informed decisions about your music distribution strategy, 
                track performance across platforms, and optimize your revenue streams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};