import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'premium';
  twoFactorEnabled: boolean;
  emailVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ requiresTwoFactor?: boolean; success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<{ success: boolean; error?: string }>;
  enableTwoFactor: () => Promise<{ secret: string; qrCode: string }>;
  confirmTwoFactor: (code: string, secret: string) => Promise<{ success: boolean; error?: string }>;
  upgradeSubscription: () => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (code: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mbu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password === 'wrong') {
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }

    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      subscription: email.includes('premium') ? 'premium' : 'free',
      twoFactorEnabled: email.includes('2fa'),
      emailVerified: true
    };

    if (mockUser.twoFactorEnabled) {
      setPendingUser(mockUser);
      setIsLoading(false);
      return { success: true, requiresTwoFactor: true };
    }

    setUser(mockUser);
    localStorage.setItem('mbu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      subscription: 'free',
      twoFactorEnabled: false,
      emailVerified: false
    };

    setUser(mockUser);
    localStorage.setItem('mbu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('mbu_user');
  };

  const verifyTwoFactor = async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code === '123456' && pendingUser) {
      setUser(pendingUser);
      localStorage.setItem('mbu_user', JSON.stringify(pendingUser));
      setPendingUser(null);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid verification code' };
  };

  const enableTwoFactor = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const secret = 'JBSWY3DPEHPK3PXP'; // Mock secret
    const qrCode = `otpauth://totp/MusicBusinessUnlocked:${user?.email}?secret=${secret}&issuer=MusicBusinessUnlocked`;
    
    return { secret, qrCode };
  };

  const confirmTwoFactor = async (code: string, secret: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code === '123456' && user) {
      const updatedUser = { ...user, twoFactorEnabled: true };
      setUser(updatedUser);
      localStorage.setItem('mbu_user', JSON.stringify(updatedUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid verification code' };
  };

  const upgradeSubscription = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, subscription: 'premium' as const };
      setUser(updatedUser);
      localStorage.setItem('mbu_user', JSON.stringify(updatedUser));
      return { success: true };
    }
    
    return { success: false, error: 'User not found' };
  };

  const verifyEmail = async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code === '123456' && user) {
      const updatedUser = { ...user, emailVerified: true };
      setUser(updatedUser);
      localStorage.setItem('mbu_user', JSON.stringify(updatedUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid verification code' };
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    verifyTwoFactor,
    enableTwoFactor,
    confirmTwoFactor,
    upgradeSubscription,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};