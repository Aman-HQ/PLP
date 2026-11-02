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
    <footer className="relative w-full border-t border-white/[0.08] bg-[#09090B]">
      {/* CTA Band */}
      <div className="relative flex min-h-[30vh] sm:min-h-[36vh] items-center overflow-hidden bg-gradient-to-b from-[#121214] via-[#09090B] to-[#09090B]">
        {/* Subtle white ambient glow */}
        <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative z-10 mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-16"
        >
          <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-4xl">
            {footerData.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm font-light leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
            {footerData.ctaSubtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={footerData.ctaButtonLink || '#about'}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 font-sans text-xs font-semibold tracking-wide text-black border border-white/20 shadow-[0_2px_16px_rgba(255,255,255,0.08)] transition-all duration-300 ease-premium hover:bg-neutral-200 active:scale-[0.98]"
            >
              <span>{footerData.ctaButtonLabel || 'Start Learning Free'}</span>
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer Body */}
      <div className="border-t border-white/[0.06] bg-[#000000]">
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
