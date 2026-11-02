import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import privacyData from './data/privacyPolicy.json';
import termsData from './data/terms.json';

export default function App() {
  const lenisRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#privacy-policy' || hash === '#privacy' || path === '/privacy') {
        return 'privacy-policy';
      }
      if (hash === '#terms-and-conditions' || hash === '#terms' || path === '/terms') {
        return 'terms-and-conditions';
      }
    }
    return 'home';
  });

  // Listen for hash changes
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#privacy-policy' || hash === '#privacy' || path === '/privacy') {
        setCurrentPage('privacy-policy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms-and-conditions' || hash === '#terms' || path === '/terms') {
        setCurrentPage('terms-and-conditions');
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
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 60);
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

  // Lenis smooth scroll
  useEffect(() => {
    if (currentPage !== 'home') return;

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

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#') && href.length > 1) {
        if (href === '#privacy-policy' || href === '#terms-and-conditions') {
          return;
        }
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          window.history.pushState(null, '', href);
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
  }, [currentPage]);

  const goHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container min-h-screen bg-[#0A0A0B] text-[#F5F5F7]">
      {/* Home Landing View */}
      {currentPage === 'home' && (
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

      {/* Privacy Policy View */}
      {currentPage === 'privacy-policy' && (
        <div className="mx-auto max-w-4xl px-6 py-20">
          <button
            onClick={goHome}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-chalk hover:bg-white/10"
          >
            ← {privacyData.backButtonLabel || 'Back to Home'}
          </button>
          <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">{privacyData.title}</h1>
          <p className="mt-3 text-sm text-chalk/70">{privacyData.subtitle}</p>

          <div className="mt-10 space-y-8">
            {privacyData.sections?.map((sec, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#121215] p-6">
                <h2 className="font-display text-lg font-semibold text-indigo-300">{sec.title}</h2>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-chalk/80">
                  {sec.content?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terms & Conditions View */}
      {currentPage === 'terms-and-conditions' && (
        <div className="mx-auto max-w-4xl px-6 py-20">
          <button
            onClick={goHome}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-chalk hover:bg-white/10"
          >
            ← {termsData.backButtonLabel || 'Back to Home'}
          </button>
          <h1 className="font-display text-4xl font-bold tracking-tight text-chalk">{termsData.title}</h1>
          <p className="mt-3 text-sm text-chalk/70">{termsData.subtitle}</p>

          <div className="mt-10 space-y-8">
            {termsData.sections?.map((sec, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#121215] p-6">
                <h2 className="font-display text-lg font-semibold text-indigo-300">{sec.title}</h2>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-chalk/80">
                  {sec.content?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
