import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Download, RefreshCw, DollarSign, TrendingUp, PieChart, Crown, Lock } from 'lucide-react';
import { CalculationResult } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface ResultsProps {
  results: CalculationResult[];
  onNewCalculation: () => void;
  onBack: () => void;
  onExport?: () => void;
  canExport?: boolean;
}

export const Results: React.FC<ResultsProps> = ({ 
  results, 
  onNewCalculation, 
  onBack, 
  onExport,
  canExport = false 
}) => {
  const { user } = useAuth();
  const totalEarnings = results.reduce((sum, result) => sum + result.netEarnings, 0);
  const totalStreams = results.reduce((sum, result) => sum + result.streams, 0);
  const averageRate = totalEarnings / (totalStreams / 1000);

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Spotify': 'bg-green-500',
      'Apple Music': 'bg-gray-800',
      'YouTube Music': 'bg-red-500',
      'Amazon Music': 'bg-blue-600',
      'Deezer': 'bg-orange-500',
      'TikTok': 'bg-black'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      'Spotify': '♪',
      'Apple Music': '🍎',
      'YouTube Music': '▶️',
      'Amazon Music': '🎵',
      'Deezer': '🎶',
      'TikTok': '🎤'
    };
    return icons[platform] || '🎵';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const exportReport = () => {
    if (!canExport) {
      onExport?.();
      return;
    }

    const reportData = {
      totalEarnings: totalEarnings.toFixed(2),
      totalStreams: totalStreams.toLocaleString(),
      averageRate: averageRate.toFixed(3),
      platformBreakdown: results.map(r => ({
        platform: r.platform,
        streams: r.streams.toLocaleString(),
        earnings: r.netEarnings.toFixed(2),
        country: r.country
      })),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `royalty-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Estimated Earnings</h2>
          <p className="text-gray-600 text-sm">Your royalty breakdown</p>
        </div>
        {user?.subscription === 'premium' && (
          <Crown className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      {/* Premium Feature Notice */}
      {!canExport && (
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Detailed analytics and export features require Premium</span>
            <Badge variant="outline">
              <Crown className="w-3 h-3 mr-1" />
              Upgrade
            </Badge>
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm opacity-90">Total Net Earnings</span>
            </div>
            <div className="text-3xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-sm opacity-90 mt-1">
              From {formatNumber(totalStreams)} total streams
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Avg. Rate</span>
              </div>
              <div className="text-xl font-bold">${averageRate.toFixed(3)}</div>
              <p className="text-xs text-gray-500">per 1K streams</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PieChart className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">Platforms</span>
              </div>
              <div className="text-xl font-bold">{results.length}</div>
              <p className="text-xs text-gray-500">active platforms</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Platform Breakdown
            {!canExport && (
              <Badge variant="outline" className="ml-auto">
                <Lock className="w-3 h-3 mr-1" />
                Basic View
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results
            .sort((a, b) => b.netEarnings - a.netEarnings)
            .map((result, index) => {
              const percentage = (result.netEarnings / totalEarnings) * 100;
              const platformColor = getPlatformColor(result.platform);
              const platformIcon = getPlatformIcon(result.platform);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${platformColor} rounded-full flex items-center justify-center text-white text-sm`}>
                        {platformIcon}
                      </div>
                      <div>
                        <p className="font-medium">{result.platform}</p>
                        <p className="text-sm text-gray-600">
                          {formatNumber(result.streams)} streams • {result.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${result.netEarnings.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
        </CardContent>
      </Card>

      {/* Detailed Breakdown - Premium Only */}
      {canExport ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Detailed Breakdown
              <Badge className="bg-yellow-500">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 ${getPlatformColor(result.platform)} rounded-full flex items-center justify-center text-white text-xs`}>
                        {getPlatformIcon(result.platform)}
                      </div>
                      <span className="font-medium">{result.platform}</span>
                      <Badge variant="outline" className="text-xs">
                        {result.country}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Streams:</span>
                      <span className="ml-2 font-medium">{result.streams.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Rate:</span>
                      <span className="ml-2 font-medium">${result.payoutRate.toFixed(3)}/1K</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Gross:</span>
                      <span className="ml-2 font-medium">${result.grossEarnings.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Net:</span>
                      <span className="ml-2 font-medium text-green-600">${result.netEarnings.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6 text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Detailed Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get in-depth breakdowns, export capabilities, and advanced analytics with Premium
            </p>
            <Button variant="outline" onClick={onExport}>
              <Crown className="w-4 h-4 mr-2" />
              Unlock Premium Features
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={exportReport} 
          variant="outline" 
          className="flex-1"
          disabled={!canExport}
        >
          {canExport ? (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Export (Premium)
            </>
          )}
        </Button>
        <Button onClick={onNewCalculation} className="flex-1">
          <RefreshCw className="w-4 h-4 mr-2" />
          New Calculation
        </Button>
      </div>
    </div>
  );
};