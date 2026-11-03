import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from './icons';
import Logo from './Logo';
import footerData from '../data/footer.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };

  const quickLinks = footerData.quickLinks || [];

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#000000]">
      {/* Footer Body */}
      <div className="bg-[#000000]">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {/* Brand column */}
            <div>
              <a href="#home" className="flex items-center gap-3" aria-label="AI Tutor Platform">
                <Logo className="h-8 w-8" />
                <span className="font-display text-base font-semibold tracking-tight text-white">
                  {siteData.name || 'AI Tutor'}
                </span>
              </a>
              <p className="mt-4 max-w-xs font-sans text-xs font-light leading-relaxed text-zinc-400">
                {footerData.brandTagline}
              </p>
              <p className="mt-5 font-mono text-[11px] text-zinc-500">
                &copy; {new Date().getFullYear()} {footerData.copyrightText}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 font-sans text-xs text-zinc-400">
                <li>
                  <a href="#home" className="transition-colors hover:text-white">Home</a>
                </li>
                <li>
                  <a href="#about" className="transition-colors hover:text-white">Why AI Tutor</a>
                </li>
                <li>
                  <a href="#services" className="transition-colors hover:text-white">Subject Tracks</a>
                </li>
              </ul>
            </div>

            {/* Governance & Contact */}
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Platform & Privacy
              </h3>
              <ul className="mt-4 space-y-2.5 font-sans text-xs text-zinc-400">
                {quickLinks.map((ql, idx) => (
                  <li key={idx}>
                    <a href={ql.href} className="transition-colors hover:text-white">
                      {ql.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${siteData.email}`} className="text-zinc-300 hover:text-white">
                    {siteData.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
