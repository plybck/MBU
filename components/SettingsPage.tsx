import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, Info, HelpCircle, ExternalLink, Calculator, DollarSign, Music, Users } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const payoutRates = [
    { platform: 'Apple Music', rate: '$5.50-$7.00', icon: '🍎', color: 'bg-gray-800' },
    { platform: 'Deezer', rate: '$4.50-$6.00', icon: '🎶', color: 'bg-orange-500' },
    { platform: 'Amazon Music', rate: '$3.20-$4.00', icon: '🎵', color: 'bg-blue-600' },
    { platform: 'Spotify', rate: '$2.80-$3.50', icon: '♪', color: 'bg-green-500' },
    { platform: 'YouTube Music', rate: '$1.40-$2.00', icon: '▶️', color: 'bg-red-500' },
    { platform: 'TikTok', rate: '$0.35-$0.50', icon: '🎤', color: 'bg-black' }
  ];

  const faqItems = [
    {
      question: "How are streaming royalties calculated?",
      answer: "Streaming royalties are calculated based on the number of streams, the platform's payout rate per 1000 streams, your ownership percentage of the song, and any distribution cuts. The formula is: (Streams ÷ 1000) × Rate × Ownership% × (1 - Distribution Cut%)"
    },
    {
      question: "Why do payout rates vary by country?",
      answer: "Payout rates vary by country due to different subscription prices, advertising revenue, and local market conditions. Countries with higher subscription fees typically have higher payout rates."
    },
    {
      question: "What is the ownership percentage?",
      answer: "This represents your share of the song's ownership. If you wrote and performed the entire song yourself, it would be 100%. If you collaborated with others, your percentage would be lower based on your contribution."
    },
    {
      question: "What is the distribution cut?",
      answer: "This is the percentage your distributor (like CD Baby, DistroKid, TuneCore) takes from your earnings. Most distributors charge between 10-20% of your royalties."
    },
    {
      question: "How accurate are these calculations?",
      answer: "These are estimates based on industry averages. Actual payouts can vary based on factors like listener location, subscription type (premium vs. free), and the platform's current payout rates."
    },
    {
      question: "When do I get paid?",
      answer: "Payment timing depends on your distributor. Most pay quarterly (every 3 months), but some offer monthly payments. There's usually a 2-3 month delay from when streams occur to when you receive payment."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Settings &amp; Info</h2>
          <p className="text-gray-600 text-sm">Learn about streaming royalties</p>
        </div>
      </div>

      {/* Current Payout Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Current Payout Rates
          </CardTitle>
          <p className="text-sm text-gray-600">
            Estimated rates per 1,000 streams (varies by country)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payoutRates.map((rate, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${rate.color} rounded-full flex items-center justify-center text-white text-sm`}>
                    {rate.icon}
                  </div>
                  <span className="font-medium">{rate.platform}</span>
                </div>
                <Badge variant="outline" className="font-mono">
                  {rate.rate}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <Info className="w-4 h-4 inline mr-1" />
              Rates shown are estimates and can vary based on listener location, subscription type, and platform policies.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* How to Maximize Royalties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tips to Maximize Royalties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Music className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <p className="font-medium">Focus on High-Paying Platforms</p>
              <p className="text-sm text-gray-600">Apple Music and Deezer typically pay more per stream than Spotify</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Target Premium Subscribers</p>
              <p className="text-sm text-gray-600">Streams from premium subscribers pay more than free tier streams</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Choose the Right Distributor</p>
              <p className="text-sm text-gray-600">Compare distribution fees - some charge flat fees vs. percentage cuts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Learn More
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Spotify for Artists</p>
              <p className="text-sm text-gray-600">Official payout information</p>
            </div>
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Music Industry Research</p>
              <p className="text-sm text-gray-600">Streaming economics reports</p>
            </div>
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="p-4 text-center text-sm text-gray-600">
          <p>Royalty Calculator v1.0</p>
          <p>Estimates based on industry averages and public data</p>
          <p className="mt-2">
            This tool provides estimates only. Actual payouts may vary.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};