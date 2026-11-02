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
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-5 pb-20 pt-28 sm:px-8"
    >
      {/* Monochrome ambient illumination */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(100% 70% at 50% 12%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(9,9,11,0) 70%), linear-gradient(180deg, #000000 0%, #09090B 60%, #121214 100%)',
        }}
      />

      {/* Soft drifting bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[10%] h-[44vh] w-[44vh] -translate-x-1/2 rounded-full opacity-50 blur-3xl motion-safe:animate-drift z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)' }}
      />

      {/* Subtle fine geometric grid */}
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
      
      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#09090B]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center pt-8 sm:pt-0"
      >
        {/* Eyebrow Badge */}
        <motion.div variants={rise} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>{heroData.eyebrow}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-display font-bold leading-[1.08] tracking-tight text-white"
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            {heroData.headlinePre}
          </span>
          <span className="mt-2 block text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.08] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {heroData.headlineEmphasis}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-zinc-400 sm:text-lg"
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
            className="group flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 font-sans text-black font-semibold border border-white/20 shadow-[0_2px_16px_rgba(255,255,255,0.12)] transition-all duration-300 ease-premium hover:bg-neutral-200 active:scale-95 cursor-pointer sm:w-auto"
          >
            <span className="whitespace-nowrap text-sm tracking-wide">{heroData.ctaPrimaryLabel}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-black transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>

          <a
            href="#services"
            className="group flex h-13 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 font-sans text-sm font-medium text-white backdrop-blur-md transition-all duration-300 ease-premium hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98] sm:w-auto"
          >
            <span>{heroData.ctaSecondaryLabel}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
