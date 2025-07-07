import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Calculator, 
  Settings, 
  BarChart3, 
  TrendingUp, 
  User, 
  Crown, 
  LogOut,
  Menu,
  X,
  Music
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationHeaderProps {
  user: any;
  onNavigate: (screen: string) => void;
  currentScreen: string;
  onLogout?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ 
  user, 
  onNavigate, 
  currentScreen,
  onLogout,
  onLogin,
  onSignup
}) => {
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'input', label: 'Calculate', icon: Calculator },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'settings', label: 'Resources', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 border border-red-400/20 shadow-lg flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-colors">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-gray-100 leading-none">Music Business</h1>
              <h1 className="font-semibold text-red-400 leading-none">Unlocked</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          )}

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-200">
                      {user.name.split(' ')[0]}
                    </p>
                    <Badge 
                      variant={user.subscription === 'premium' ? 'default' : 'outline'}
                      className={`text-xs ${
                        user.subscription === 'premium' 
                          ? 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white border-0' 
                          : 'border-gray-600 text-gray-400 bg-gray-800/50'
                      }`}
                    >
                      {user.subscription === 'premium' && <Crown className="w-3 h-3 mr-1" />}
                      {user.subscription}
                    </Badge>
                  </div>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-800/50">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white border border-red-400/20">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-200">{user.name}</p>
                        <p className="text-xs leading-none text-gray-400">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate('profile')} className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('settings')} className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={onLogin}
                  className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                >
                  Login
                </Button>
                <Button 
                  onClick={onSignup}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 justify-start ${
                      isActive 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};