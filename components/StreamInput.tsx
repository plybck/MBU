import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Trash2, Plus, ArrowLeft, Calculator, Crown, AlertCircle } from 'lucide-react';
import { StreamData } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface StreamInputProps {
  streamData: StreamData[];
  onStreamDataChange: (data: StreamData[]) => void;
  onCalculate: (data: StreamData[]) => void;
  onBack: () => void;
  maxPlatforms?: number;
}

export const StreamInput: React.FC<StreamInputProps> = ({
  streamData,
  onStreamDataChange,
  onCalculate,
  onBack,
  maxPlatforms
}) => {
  const { user } = useAuth();
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentStreams, setCurrentStreams] = useState('');
  const [currentCountry, setCurrentCountry] = useState('US');
  const [ownershipPercentage, setOwnershipPercentage] = useState([100]);
  const [distributionCut, setDistributionCut] = useState([15]);

  const platforms = [
    { value: 'Spotify', label: 'Spotify', color: 'bg-green-500', icon: '♪' },
    { value: 'Apple Music', label: 'Apple Music', color: 'bg-gray-800', icon: '🍎' },
    { value: 'YouTube Music', label: 'YouTube Music', color: 'bg-red-500', icon: '▶️' },
    { value: 'Amazon Music', label: 'Amazon Music', color: 'bg-blue-600', icon: '🎵' },
    { value: 'Deezer', label: 'Deezer', color: 'bg-orange-500', icon: '🎶' },
    { value: 'TikTok', label: 'TikTok', color: 'bg-black', icon: '🎤' }
  ];

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Other', label: 'Other Countries' }
  ];

  const isAtLimit = maxPlatforms && streamData.length >= maxPlatforms;
  const canAddPlatform = !isAtLimit && currentPlatform && currentStreams && !streamData.some(data => data.platform === currentPlatform);

  const addPlatform = () => {
    if (!canAddPlatform) return;
    
    const newData: StreamData = {
      platform: currentPlatform,
      streams: parseInt(currentStreams),
      country: currentCountry,
      ownershipPercentage: ownershipPercentage[0],
      distributionCut: distributionCut[0]
    };

    onStreamDataChange([...streamData, newData]);
    setCurrentPlatform('');
    setCurrentStreams('');
  };

  const removePlatform = (index: number) => {
    const newData = streamData.filter((_, i) => i !== index);
    onStreamDataChange(newData);
  };

  const getPlatformInfo = (platformName: string) => {
    return platforms.find(p => p.value === platformName) || platforms[0];
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const handleCalculate = () => {
    if (streamData.length === 0) return;
    onCalculate(streamData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Enter Your Streams</h2>
          <p className="text-gray-600 text-sm">Add streams from each platform</p>
        </div>
        {user?.subscription === 'premium' && (
          <Crown className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      {/* Free tier limitation notice */}
      {maxPlatforms && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Free plan: {streamData.length}/{maxPlatforms} platforms used
            </span>
            {user?.subscription === 'free' && (
              <Badge variant="outline" className="ml-2">
                <Crown className="w-3 h-3 mr-1" />
                Upgrade for unlimited
              </Badge>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Add Platform Form */}
      <Card className={isAtLimit ? 'opacity-60' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Platform
            {isAtLimit && (
              <Badge variant="outline" className="ml-auto">
                Limit Reached
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select 
              value={currentPlatform} 
              onValueChange={setCurrentPlatform}
              disabled={isAtLimit}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => {
                  const isAlreadyAdded = streamData.some(data => data.platform === platform.value);
                  return (
                    <SelectItem 
                      key={platform.value} 
                      value={platform.value}
                      disabled={isAlreadyAdded}
                    >
                      <div className="flex items-center gap-2">
                        <span>{platform.icon}</span>
                        {platform.label}
                        {isAlreadyAdded && (
                          <Badge variant="outline" className="ml-auto text-xs">
                            Added
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Total Streams</Label>
            <Input
              type="number"
              placeholder="e.g., 50000"
              value={currentStreams}
              onChange={(e) => setCurrentStreams(e.target.value)}
              disabled={isAtLimit}
            />
          </div>

          <div className="space-y-2">
            <Label>Primary Country</Label>
            <Select 
              value={currentCountry} 
              onValueChange={setCurrentCountry}
              disabled={isAtLimit}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ownership Percentage: {ownershipPercentage[0]}%</Label>
            <Slider
              value={ownershipPercentage}
              onValueChange={setOwnershipPercentage}
              max={100}
              min={1}
              step={1}
              className="w-full"
              disabled={isAtLimit}
            />
          </div>

          <div className="space-y-2">
            <Label>Distribution Cut: {distributionCut[0]}%</Label>
            <Slider
              value={distributionCut}
              onValueChange={setDistributionCut}
              max={50}
              min={0}
              step={1}
              className="w-full"
              disabled={isAtLimit}
            />
          </div>

          <Button 
            onClick={addPlatform}
            disabled={!canAddPlatform}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isAtLimit ? 'Platform Limit Reached' : 'Add Platform'}
          </Button>

          {isAtLimit && user?.subscription === 'free' && (
            <p className="text-xs text-center text-gray-500">
              Upgrade to Premium for unlimited platforms
            </p>
          )}
        </CardContent>
      </Card>

      {/* Added Platforms */}
      {streamData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Platforms ({streamData.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {streamData.map((data, index) => {
              const platformInfo = getPlatformInfo(data.platform);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${platformInfo.color} rounded-full flex items-center justify-center text-white text-sm`}>
                      {platformInfo.icon}
                    </div>
                    <div>
                      <p className="font-medium">{data.platform}</p>
                      <p className="text-sm text-gray-600">
                        {formatNumber(data.streams)} streams • {data.country} • {data.ownershipPercentage}%
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlatform(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Calculate Button */}
      {streamData.length > 0 && (
        <Button 
          onClick={handleCalculate}
          className="w-full"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Royalties
        </Button>
      )}
    </div>
  );
};