import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { List, X, CalendarCheck, ArrowUpRight } from '@phosphor-icons/react';
import Logo from './Logo';
import siteData from '../data/site.json';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Why Us', href: '#about-page' },
  { label: 'Our Services', href: '#services-page' },
  { label: 'Success Stories', href: '#blog-page' },
  { label: 'Gallery', href: '#gallery-page' },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const { scrollY } = useScroll();
  const navRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 32);
  });

  // Sync active nav item with URL hash and page location
  useEffect(() => {
    const updateActiveItem = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash === '#about-page' || hash === '#/about' || path === '/about' || hash === '#about') {
        setActive('Why Us');
      } else if (hash === '#gallery-page' || hash === '#/gallery' || path === '/gallery') {
        setActive('Gallery');
      } else if (hash === '#blog-page' || hash === '#/blog' || path === '/blog' || hash === '#blog') {
        setActive('Success Stories');
      } else if (hash === '#services' || hash === '#services-page' || hash === '#/services' || path === '/services') {
        setActive('Our Services');
      } else {
        setActive('Home');
      }
    };

    updateActiveItem();
    window.addEventListener('hashchange', updateActiveItem);
    window.addEventListener('popstate', updateActiveItem);
    return () => {
      window.removeEventListener('hashchange', updateActiveItem);
      window.removeEventListener('popstate', updateActiveItem);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <motion.header
      ref={navRef}
      initial={reduceMotion ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-premium ${scrolled
        ? 'bg-ink/80 backdrop-blur-xl border-b border-white/[0.07] py-3'
        : 'bg-transparent border-b border-transparent py-5'
        }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-8">
        {/* Brand */}
        <a href="#home" className="group flex items-center gap-2.5 sm:gap-3" aria-label={`${siteData.name} — home`}>
          <Logo className="h-9 w-9 text-chalk transition-transform duration-500 ease-premium group-hover:scale-105 sm:h-10 sm:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight text-chalk sm:text-base">Dr. Anubhuti</span>
            <span className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-ash sm:text-[10px]">Advanced Dental Care</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`group relative font-sans text-[13px] lg:text-[15px] font-medium tracking-tight transition-colors duration-300 ${active === link.label ? 'text-chalk' : 'text-ash hover:text-chalk'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-chalk/70 transition-transform duration-300 ease-premium ${active === link.label ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="group hidden h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-3.5 font-sans shadow-[0_6px_24px_rgba(255,255,255,0.2)] transition-all duration-300 ease-premium hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,255,255,0.35)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer sm:inline-flex"
          >
            <span className="whitespace-nowrap text-[11px] font-extrabold uppercase tracking-[0.06em] text-forest-dark">{siteData.bookButtonLabel || 'Book Appointment'}</span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={13} weight="bold" />
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-chalk ring-1 ring-inset ring-white/15 transition-colors duration-300 hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden lg:hidden"
      >
        <ul className="flex flex-col gap-1 border-t border-white/[0.07] bg-ink/95 px-6 pb-6 pt-4 backdrop-blur-xl">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMenuOpen(false);
                }}
                style={reduceMotion ? undefined : { transitionDelay: `${menuOpen ? i * 40 : 0}ms` }}
                className={`flex items-center justify-between border-b border-white/[0.05] py-3.5 font-display text-lg font-medium tracking-tight transition-colors ${active === link.label ? 'text-chalk' : 'text-chalk/70 hover:text-chalk'
                  }`}
              >
                {link.label}
                <ArrowUpRight size={16} weight="bold" className="text-ash" />
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="group flex w-full h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-6 font-sans shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 ease-premium hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
            >
              <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] text-forest-dark">{siteData.bookButtonLabel || 'Book Appointment'}</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Backdrop for outside-click dismissal on mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}
    </motion.header>
  );
}
