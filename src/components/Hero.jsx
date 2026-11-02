import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from './icons';
import heroData from '../data/hero.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
  };
  const rise = {
    hidden: reduceMotion ? {} : { y: 16, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: EASE },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] px-5 pb-20 pt-28 sm:px-8"
    >
      {/* Dynamic ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(100% 70% at 50% 12%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.06) 35%, rgba(10,10,11,0) 70%), linear-gradient(180deg, #050506 0%, #0A0A0B 60%, #121215 100%)',
        }}
      />

      {/* Soft drifting bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[10%] h-[42vh] w-[42vh] -translate-x-1/2 rounded-full opacity-60 blur-3xl motion-safe:animate-drift z-0"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 70%)' }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Fine grain */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />
      
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0B]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center pt-8 sm:pt-0"
      >
        {/* Eyebrow Badge */}
        <motion.div variants={rise} className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span>{heroData.eyebrow}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-display font-bold leading-[1.08] tracking-tight text-chalk"
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            {heroData.headlinePre}
          </span>
          <span className="mt-2 block text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.08] bg-gradient-to-r from-indigo-300 via-indigo-100 to-violet-300 bg-clip-text text-transparent">
            {heroData.headlineEmphasis}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-chalk/75 sm:text-lg"
        >
          {heroData.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href="#about"
            className="group flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 px-7 font-sans text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all duration-300 ease-premium hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] active:scale-95 cursor-pointer sm:w-auto"
          >
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide">{heroData.ctaPrimaryLabel}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>

          <a
            href="#services"
            className="group flex h-13 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 font-sans text-sm font-medium text-chalk backdrop-blur-md transition-all duration-300 ease-premium hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98] sm:w-auto"
          >
            <span>{heroData.ctaSecondaryLabel}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
