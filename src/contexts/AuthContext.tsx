
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, AuthContextType } from '@/types';

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User' },
  { id: '2', email: 'user@example.com', password: 'password', name: 'Test User' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse stored user:', e);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${userWithoutPassword.name}`,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
