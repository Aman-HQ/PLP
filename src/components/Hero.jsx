import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react';
import heroData from '../data/hero.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const whatsappUrl = `https://wa.me/${siteData.whatsappPhone || '918076601314'}`;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  };
  const rise = {
    hidden: reduceMotion ? {} : { y: 12, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: EASE },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 pb-20 pt-28 sm:px-8"
    >
      {/* Monochrome black -> white gradient field (Restored) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 8%, rgba(245,245,247,0.16) 0%, rgba(245,245,247,0.04) 30%, rgba(10,10,11,0) 60%), linear-gradient(180deg, #050506 0%, #0a0a0b 55%, #101013 100%)',
        }}
      />

      {/* Soft drifting bloom (Restored) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[6%] h-[46vh] w-[46vh] -translate-x-1/2 rounded-full opacity-70 blur-3xl motion-safe:animate-drift z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)' }}
      />

      {/* --- Center Watermark 3D Tooth (Tilted opposite & popping out of screen) --- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95, rotate: 20 }}
          animate={{ opacity: 0.35, scale: 1.3, rotate: 20 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-[540px] sm:w-[540px] md:w-[780px] lg:w-[760px] -mt-32 sm:-mt-32 md:mt-14 lg:mt-40 mix-blend-screen opacity-30 sm:opacity-30 drop-shadow-[0_30px_70px_rgba(255,255,255,0.22)]"
        >
          <picture>
            <source srcSet="/hero-tools/dental-tooth.webp" type="image/webp" />
            <img
              src="/hero-tools/dental-tooth.png"
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-contain brightness-130 contrast-125 mx-auto"
            />
          </picture>
        </motion.div>
      </div>

      {/* Fine grain to break flatness */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center pt-20 sm:pt-0"
      >


        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-display font-semibold leading-[1.08] tracking-tight text-chalk"
        >
          <span className="block text-[2.55rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            {heroData.headlinePre}
          </span>
          <span className="mt-1 block text-[2.55rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.08] pb-1 whitespace-nowrap sm:whitespace-normal">
            {heroData.headlineEmphasis}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-3.5 sm:mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-chalk/70 sm:text-lg lg:max-w-none lg:whitespace-nowrap"
        >
          {heroData.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-20 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href="#contact"
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-8 font-sans shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 ease-premium hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer sm:w-auto"
          >
            <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.12em] text-forest-dark">{heroData.ctaPrimaryLabel || 'Book Appointment'}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={16} weight="bold" />
            </span>
          </a>

          <a
            href="#services"
            className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-zinc-800/90 via-neutral-900/90 to-black/95 px-8 font-sans text-sm font-semibold tracking-tight text-chalk shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 ease-premium hover:border-white/40 hover:from-zinc-700/90 hover:via-neutral-800/90 hover:to-zinc-950/95 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.97] sm:w-auto"
          >
            {/* Top Gloss Specular Reflection */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">{heroData.ctaSecondaryLabel || 'Explore Services'}</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-chalk text-ink shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-black/10 transition-all duration-300 ease-premium hover:bg-white active:scale-95"
      >
        <WhatsappLogo size={30} weight="fill" className="transition-transform duration-300 ease-premium group-hover:scale-110" />
      </motion.a>
    </section>
  );
}
