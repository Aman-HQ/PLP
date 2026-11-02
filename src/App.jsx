import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Journal from './components/Journal';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const lenisRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#gallery-page' || hash === '#/gallery' || path === '/gallery') {
        return 'gallery-page';
      }
      if (hash === '#about-page' || hash === '#/about' || path === '/about') {
        return 'about-page';
      }
      if (hash === '#services-page' || hash === '#services' || hash === '#/services' || path === '/services') {
        return 'services-page';
      }
      if (hash === '#blog-page' || hash === '#/blog' || path === '/blog') {
        return 'blog-page';
      }
      if (hash === '#privacy-policy' || hash === '#privacy' || hash === '#/privacy' || path === '/privacy') {
        return 'privacy-policy';
      }
      if (hash === '#terms-and-conditions' || hash === '#terms' || hash === '#/terms' || path === '/terms') {
        return 'terms-and-conditions';
      }
      if (hash === '#404' || hash === '#/404' || (path === '/404' && (!hash || hash === '#404' || hash === '#/404'))) {
        return 'not-found';
      }
    }
    return 'home';
  });

  // Track visited pages so once visited, they remain cached in the DOM
  const [visitedPages, setVisitedPages] = useState(() => new Set([currentPage]));

  useEffect(() => {
    setVisitedPages((prev) => {
      if (prev.has(currentPage)) return prev;
      const next = new Set(prev);
      next.add(currentPage);
      return next;
    });
  }, [currentPage]);

  // Listen for hash changes & browser navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#gallery-page' || hash === '#/gallery' || path === '/gallery') {
        setCurrentPage('gallery-page');
        window.scrollTo(0, 0);
      } else if (hash === '#about-page' || hash === '#/about' || path === '/about') {
        setCurrentPage('about-page');
        window.scrollTo(0, 0);
      } else if (hash === '#services-page' || hash === '#services' || hash === '#/services' || path === '/services') {
        setCurrentPage('services-page');
        window.scrollTo(0, 0);
      } else if (hash === '#blog-page' || hash === '#/blog' || path === '/blog') {
        setCurrentPage('blog-page');
        window.scrollTo(0, 0);
      } else if (hash === '#privacy-policy' || hash === '#privacy' || hash === '#/privacy' || path === '/privacy') {
        setCurrentPage('privacy-policy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms-and-conditions' || hash === '#terms' || hash === '#/terms' || path === '/terms') {
        setCurrentPage('terms-and-conditions');
        window.scrollTo(0, 0);
      } else if (hash === '#404' || hash === '#/404' || (path === '/404' && (!hash || hash === '#404' || hash === '#/404'))) {
        setCurrentPage('not-found');
        window.scrollTo(0, 0);
      } else {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/' + (hash || ''));
        }
        setCurrentPage('home');
        if (hash) {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(el);
              } else {
                el.scrollIntoView();
              }
            }
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') return;

    // Respect users who prefer reduced motion: skip the JS smooth-scroll
    // hijack entirely and fall back to native scrolling.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis = null;
    let rafId;

    if (!prefersReducedMotion) {
      // Initialize Lenis smooth scroll momentum for the Home page.
      //
      // We use `lerp` (frame-rate-independent interpolation) instead of a fixed
      // `duration` + easing tween. A duration tween eases toward the target over
      // a set time, and the exponential curve's long asymptotic tail makes the
      // scroll feel like it "sticks"/drags as it settles. `lerp` carries momentum
      // smoothly but resolves quickly and naturally.
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

    // Global listener for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      if (href === '#gallery-page' || href === '#/gallery') {
        setCurrentPage('gallery-page');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#about-page' || href === '#/about') {
        setCurrentPage('about-page');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#services-page' || href === '#services' || href === '#/services') {
        setCurrentPage('services-page');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#blog-page' || href === '#/blog') {
        setCurrentPage('blog-page');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#privacy-policy' || href === '#privacy' || href === '#/privacy') {
        setCurrentPage('privacy-policy');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#terms-and-conditions' || href === '#terms' || href === '#/terms') {
        setCurrentPage('terms-and-conditions');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#404' || href === '#/404') {
        setCurrentPage('not-found');
        window.scrollTo(0, 0);
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        if (lenisRef.current) {
          lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
        } else {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [currentPage]);

  return (
    <div className="app-container">
      {/* Home View (Always kept in DOM for instant return) */}
      <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Location />
          <Contact />
          <Testimonials />
          <Faq />
        </main>
        <Footer />
      </div>

      {/* Visited Sub-Pages (Cached in DOM once opened) */}
      {visitedPages.has('gallery-page') && (
        <div style={{ display: currentPage === 'gallery-page' ? 'block' : 'none' }}>
          <GalleryPage
            onBack={() => {
              window.location.hash = 'gallery';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('about-page') && (
        <div style={{ display: currentPage === 'about-page' ? 'block' : 'none' }}>
          <AboutPage
            onBack={() => {
              window.location.hash = 'about';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('services-page') && (
        <div style={{ display: currentPage === 'services-page' ? 'block' : 'none' }}>
          <ServicesPage
            onBack={() => {
              window.location.hash = '';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('blog-page') && (
        <div style={{ display: currentPage === 'blog-page' ? 'block' : 'none' }}>
          <BlogPage
            onBack={() => {
              window.location.hash = 'blog';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('privacy-policy') && (
        <div style={{ display: currentPage === 'privacy-policy' ? 'block' : 'none' }}>
          <PrivacyPolicyPage
            onBack={() => {
              if (window.location.pathname !== '/') {
                window.history.pushState(null, '', '/');
              }
              window.location.hash = '';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('terms-and-conditions') && (
        <div style={{ display: currentPage === 'terms-and-conditions' ? 'block' : 'none' }}>
          <TermsPage
            onBack={() => {
              if (window.location.pathname !== '/') {
                window.history.pushState(null, '', '/');
              }
              window.location.hash = '';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {visitedPages.has('not-found') && (
        <div style={{ display: currentPage === 'not-found' ? 'block' : 'none' }}>
          <NotFoundPage
            onGoHome={() => {
              if (window.location.pathname !== '/') {
                window.history.pushState(null, '', '/');
              }
              window.location.hash = '';
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}
    </div>
  );
}
