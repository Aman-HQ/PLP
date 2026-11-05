import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './components/dashboard/AuthContext';
import { LoginView } from './components/dashboard/LoginView';
import { RegisterView } from './components/dashboard/RegisterView';
import { ForgotPasswordView } from './components/dashboard/ForgotPasswordView';
import { LearningConsoleApp } from './components/learning-console/LearningConsoleApp';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Resolves current page route and section from window location with clean URLs (no hashes)
function resolveRoute() {
  if (typeof window === 'undefined') return { page: 'home', section: null };

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash;

  // 1. Immediately clean up and normalize hash-based or alias auth URLs:
  if (hash === '#signup' || hash === '#register' || pathname === '/signup') {
    if (window.location.hash || pathname !== '/register') {
      window.history.replaceState(null, '', '/register');
    }
    return { page: 'register', section: null };
  }

  if (hash === '#login') {
    if (window.location.hash) {
      window.history.replaceState(null, '', '/login');
    }
    return { page: 'login', section: null };
  }

  if (hash === '#forgot-password' || hash === '#reset-password' || pathname === '/reset-password') {
    if (window.location.hash || pathname !== '/forgot-password') {
      window.history.replaceState(null, '', '/forgot-password');
    }
    return { page: 'forgot-password', section: null };
  }

  if (hash === '#dashboard' || hash.startsWith('#dashboard')) {
    if (window.location.hash) {
      window.history.replaceState(null, '', '/dashboard');
    }
    return { page: 'dashboard', section: null };
  }

  // 2. Direct clean path matching:
  if (pathname === '/login') {
    return { page: 'login', section: null };
  }

  if (pathname === '/register') {
    return { page: 'register', section: null };
  }

  if (pathname === '/forgot-password') {
    return { page: 'forgot-password', section: null };
  }

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    return { page: 'dashboard', section: null };
  }

  if (pathname === '/privacy' || pathname === '/privacy-policy') {
    return { page: 'privacy', section: null };
  }

  if (pathname === '/terms' || pathname === '/terms-and-conditions') {
    return { page: 'terms', section: null };
  }

  // Root Homepage
  if (pathname === '/') {
    if (hash === '#404') {
      return { page: 'not-found', section: null };
    }
    if (hash === '#about' || hash === '#services') {
      return { page: 'home', section: hash };
    }
    return { page: 'home', section: null };
  }

  // Any unrecognized path -> 404 Not Found
  return { page: 'not-found', section: null };
}

function AppContent() {
  const lenisRef = useRef(null);
  const [route, setRoute] = useState(resolveRoute);
  const { user, loading, signOut } = useAuth();
  const [demoMode, setDemoMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('demo') === 'true';
    }
    return false;
  });

  const navigate = (toPath) => {
    window.history.pushState(null, '', toPath);
    setRoute(resolveRoute());
    window.scrollTo(0, 0);
  };

  // Sync route on browser popstate and hashchange
  useEffect(() => {
    const handleNavigation = () => {
      const current = resolveRoute();
      setRoute(current);

      // Scroll handling for homepage anchors
      if (current.page === 'home') {
        if (current.section) {
          setTimeout(() => {
            const el = document.querySelector(current.section);
            if (el) {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(el);
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 60);
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Run initial URL normalization
    handleNavigation();

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Lenis smooth scroll for Homepage only
  useEffect(() => {
    if (route.page !== 'home') {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    let rafId;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        lerp: 0.1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
      });

      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Intercept clicks on links for smooth clean-path navigation without reloads
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Dashboard navigation
      if (href === '/dashboard' || href.startsWith('/dashboard') || href === '#dashboard') {
        e.preventDefault();
        navigate('/dashboard');
        return;
      }

      // Clean auth routes
      if (href === '/login' || href === '#login') {
        e.preventDefault();
        navigate('/login');
        return;
      }

      if (href === '/register' || href === '/signup' || href === '#register' || href === '#signup') {
        e.preventDefault();
        navigate('/register');
        return;
      }

      if (href === '/forgot-password' || href === '/reset-password' || href === '#forgot-password' || href === '#reset-password') {
        e.preventDefault();
        navigate('/forgot-password');
        return;
      }

      // Legal pages
      if (href === '/privacy' || href === '/privacy-policy') {
        e.preventDefault();
        navigate('/privacy');
        return;
      }

      if (href === '/terms' || href === '/terms-and-conditions') {
        e.preventDefault();
        navigate('/terms');
        return;
      }

      // Home link: reset URL to '/' (no '#')
      if (href === '#home' || href === '/') {
        e.preventDefault();
        navigate('/');
        return;
      }

      // Homepage section anchors: only use /#section
      if (href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          window.history.pushState(null, '', `/${href}`);
          setRoute({ page: 'home', section: href });
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, { offset: 0, duration: 1.2 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [route.page]);

  return (
    <div className="app-container min-h-screen bg-[#09090B] text-[#FAFAFA]">
      {/* 1. Main Homepage */}
      {route.page === 'home' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
          </main>
          <Footer />
        </>
      )}

      {/* 2. Login Page (/login) */}
      {route.page === 'login' && (
        <LoginView
          onNavigateToRegister={() => navigate('/register')}
          onNavigateToForgotPassword={() => navigate('/forgot-password')}
          onNavigateToHome={() => navigate('/')}
          onExploreDemo={() => {
            setDemoMode(true);
            navigate('/dashboard');
          }}
        />
      )}

      {/* 3. Register / Sign Up Page (/register) */}
      {route.page === 'register' && (
        <RegisterView
          onNavigateToLogin={() => navigate('/login')}
          onNavigateToHome={() => navigate('/')}
          onExploreDemo={() => {
            setDemoMode(true);
            navigate('/dashboard');
          }}
        />
      )}

      {/* 4. Forgot Password Page (/forgot-password) */}
      {route.page === 'forgot-password' && (
        <ForgotPasswordView
          onNavigateToLogin={() => navigate('/login')}
          onNavigateToHome={() => navigate('/')}
          onExploreDemo={() => {
            setDemoMode(true);
            navigate('/dashboard');
          }}
        />
      )}

      {/* 5. Dashboard / Learning App Console (/dashboard) */}
      {route.page === 'dashboard' && (
        !user && !demoMode ? (
          <LoginView
            onNavigateToRegister={() => navigate('/register')}
            onNavigateToForgotPassword={() => navigate('/forgot-password')}
            onNavigateToHome={() => navigate('/')}
            onExploreDemo={() => {
              setDemoMode(true);
              navigate('/dashboard');
            }}
          />
        ) : (
          <LearningConsoleApp
            onSignOut={async () => {
              setDemoMode(false);
              if (user && signOut) {
                try {
                  await signOut();
                } catch (e) {
                  console.error('Sign out error:', e);
                }
              }
              navigate('/login');
            }}
          />
        )
      )}

      {/* 6. Privacy Policy Page */}
      {route.page === 'privacy' && (
        <PrivacyPolicyPage onBack={() => navigate('/')} />
      )}

      {/* 7. Terms & Conditions Page */}
      {route.page === 'terms' && (
        <TermsPage onBack={() => navigate('/')} />
      )}

      {/* 8. 404 Page Not Found */}
      {route.page === 'not-found' && (
        <NotFoundPage onGoHome={() => navigate('/')} />
      )}
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
