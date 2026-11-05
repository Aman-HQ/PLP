import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { LoginView } from './LoginView';
import { RegisterView } from './RegisterView';
import { ForgotPasswordView } from './ForgotPasswordView';
import { LearningConsoleApp } from '../learning-console/LearningConsoleApp';
import { CircleNotch } from '../icons';
import Logo from '../Logo';

const DashboardContent = () => {
  const { user, loading, signOut } = useAuth();
  const [guestMode, setGuestMode] = useState(false);
  const [authView, setAuthView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const h = window.location.hash.toLowerCase();
      if (h.includes('register') || h.includes('signup')) return 'register';
      if (h.includes('forgot') || h.includes('reset')) return 'forgot-password';
    }
    return 'login';
  });

  // Keep authView in sync when browser navigation occurs (back/forward or hash change)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashSync = () => {
      const h = window.location.hash.toLowerCase();
      if (h.includes('register') || h.includes('signup')) {
        setAuthView('register');
      } else if (h.includes('forgot') || h.includes('reset')) {
        setAuthView('forgot-password');
      } else {
        setAuthView('login');
      }
    };

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f0f2f5] text-zinc-900 flex flex-col items-center justify-center p-6 relative select-none">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e6ebf2] shadow-[6px_6px_14px_#c2c9d4,-6px_-6px_14px_#ffffff] mb-1">
            <Logo dark className="w-14 h-14 !rounded-full shadow-sm" />
          </div>
          <div className="flex items-center gap-2.5 text-sm text-zinc-600 font-medium">
            <CircleNotch size={18} className="animate-spin text-zinc-900" />
            <span>Connecting to AI Tutor...</span>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated and not exploring demo, render the Auth views (Login / Register / Forgot Password)
  if (!user && !guestMode) {
    if (authView === 'register') {
      return (
        <RegisterView
          onNavigateToLogin={() => {
            window.location.hash = '#login';
            setAuthView('login');
          }}
          onExploreDemo={() => setGuestMode(true)}
        />
      );
    }
    if (authView === 'forgot-password') {
      return (
        <ForgotPasswordView
          onNavigateToLogin={() => {
            window.location.hash = '#login';
            setAuthView('login');
          }}
          onExploreDemo={() => setGuestMode(true)}
        />
      );
    }
    return (
      <LoginView
        onNavigateToRegister={() => {
          window.location.hash = '#signup';
          setAuthView('register');
        }}
        onNavigateToForgotPassword={() => {
          window.location.hash = '#forgot-password';
          setAuthView('forgot-password');
        }}
        onExploreDemo={() => setGuestMode(true)}
      />
    );
  }

  // Primary Learning App Console
  return (
    <LearningConsoleApp
      onSignOut={async () => {
        setGuestMode(false);
        if (user && signOut) {
          try {
            await signOut();
          } catch (e) {
            console.error('Sign out error:', e);
          }
        }
      }}
    />
  );
};

export default function DashboardApp() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
