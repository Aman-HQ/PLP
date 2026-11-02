import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarCheck, CheckCircle } from '@phosphor-icons/react';
import Img from './Img';
import siteData from '../data/site.json';
import aboutData from '../data/about.json';

const EASE = [0.16, 1, 0.3, 1];

export default function About() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };

  const stats = aboutData.stats || [];
  const bullets = aboutData.doctorBioBullets || aboutData.healthCardBullets || [];

  return (
    <section id="about" className="relative w-full overflow-x-clip bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left: portrait with hairline frame */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <picture>
              <source srcSet="/images/dr-anubhuti-gupta.webp" type="image/webp" />
              <img
                src="/images/dr-anubhuti-gupta.jpg"
                alt={aboutData.imageAlt || 'Dr. Anubhuti Gupta'}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
              />
            </picture>
          </div>

          {/* Doctor caption chip */}
          <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-auto rounded-2xl border border-white/15 bg-ink/90 p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="font-display text-[16px] font-bold tracking-tight text-chalk">{aboutData.doctorName}</div>
            <div className="mt-0.5 font-sans text-[10px] sm:text-[11px] font-semibold text-gold-light">
              {aboutData.doctorSpeciality || siteData.credentials}
            </div>
          </div>

          {/* Soft gold ambient glow */}
          <div className="absolute -top-8 -right-8 -z-10 h-56 w-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        </motion.div>

        {/* Right: content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <motion.div variants={rise} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Founder & Principal Dentist
            </span>
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-3.5 max-w-xl font-display text-[27px] font-semibold leading-[1.12] tracking-tight text-chalk sm:text-4xl lg:text-4xl"
          >
            {aboutData.title}
          </motion.h2>

          {/* Bullet Points */}
          <motion.div variants={rise} className="mt-5 space-y-2.5 max-w-xl">
            {bullets.map((bullet, idx) => {
              const hasColon = bullet.includes(': ');
              const title = hasColon ? bullet.split(': ')[0] : null;
              const desc = hasColon ? bullet.split(': ').slice(1).join(': ') : bullet;

              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/[0.16] p-3.5 sm:p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold-light/60 hover:bg-white/[0.22]"
                >
                  <CheckCircle size={19} weight="fill" className="text-gold-light shrink-0 mt-0.5" />
                  <div className="font-sans text-[12px] sm:text-[13px] leading-relaxed">
                    {title && <span className="font-bold text-white">{title}: </span>}
                    <span className="font-light text-white/90">{desc}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={rise} className="mt-6 sm:mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.06] sm:max-w-[570px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink px-3 py-3.5 sm:px-5 sm:py-6 flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
                <div className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-chalk">{stat.value}</div>
                <div className="mt-0.5 sm:mt-1 font-sans text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.14em] leading-tight text-ash">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-14 flex flex-row items-center gap-2 sm:gap-4 w-full max-w-xl">
            <a
              href="#contact"
              className="group flex-1 sm:flex-initial flex h-11 sm:h-14 items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-3 sm:px-8 font-sans shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 ease-premium hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer text-center"
            >
              <span className="whitespace-nowrap text-[12px] sm:text-sm font-extrabold uppercase tracking-[0.04em] sm:tracking-[0.12em] text-forest-dark">
                {aboutData.ctaLabel || 'Book Appointment'}
              </span>
              <span className="flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={14} weight="bold" className="sm:w-[16px] sm:h-[16px]" />
              </span>
            </a>

            <a
              href="#about-page"
              className="group relative flex-1 sm:flex-initial flex h-11 sm:h-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-zinc-800/90 via-neutral-900/90 to-black/95 px-3 sm:px-8 font-sans text-[12px] sm:text-sm font-semibold tracking-tight text-chalk shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 ease-premium hover:border-white/40 hover:from-zinc-700/90 hover:via-neutral-800/90 hover:to-zinc-950/95 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.97] text-center"
            >
              {/* Top Gloss Specular Reflection */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 whitespace-nowrap">Read Full Profile</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
