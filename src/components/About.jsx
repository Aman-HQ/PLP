import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from './icons';
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
    show: { transition: { staggerChildren: 0.05 } },
  };

  const stats = aboutData.stats || [];
  const bullets = aboutData.doctorBioBullets || [];

  return (
    <section id="about" className="relative w-full overflow-x-clip bg-[#0A0A0B] py-24 md:py-32 border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        
        {/* Left: Interactive Simulated AI Tutoring Console */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          {/* Outer glow */}
          <div className="absolute -top-6 -left-6 -z-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

          {/* Code/Chat Mock Console */}
          <div className="rounded-2xl border border-white/10 bg-[#121215]/90 p-5 shadow-2xl backdrop-blur-xl">
            {/* Header pill */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[11px] text-chalk/50">ai_tutor_session.py</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                Live Session
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="mt-4 space-y-3.5 text-xs">
              {/* Student Query */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-chalk/90">
                <div className="font-semibold text-indigo-300">You</div>
                <div className="mt-1 font-mono text-[11px] text-chalk/80">
                  "I'm struggling to understand why quicksort runs in O(n²) worst-case time. Can you explain?"
                </div>
              </div>

              {/* AI Socratic Response */}
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3 text-chalk/90">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-400">AI Tutor</span>
                  <span className="font-mono text-[9px] text-indigo-300/60">Reasoning calibrated</span>
                </div>
                <div className="mt-1.5 space-y-1.5 text-[11.5px] leading-relaxed text-chalk/85">
                  <p>
                    Great question! Let’s think about how Quicksort partitions an array.
                  </p>
                  <div className="rounded-lg bg-black/40 p-2 font-mono text-[10.5px] text-amber-300/90 border border-white/[0.05]">
                    Partition: Pick Pivot → Left (&lt; Pivot) | Right (&gt; Pivot)
                  </div>
                  <p>
                    What happens if your pivot is repeatedly the absolute smallest element in an already-sorted array? How balanced would your two sub-arrays be?
                  </p>
                </div>
              </div>

              {/* Live adaptive feedback badge */}
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[10.5px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Adaptive prompt: Guiding toward sub-problem balance intuition</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Content & Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <motion.div variants={rise} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              Cognitive Architecture
            </span>
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-3.5 max-w-xl font-display text-[26px] font-semibold leading-[1.12] tracking-tight text-chalk sm:text-3xl lg:text-4xl"
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
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]"
                >
                  <CheckCircle size={18} weight="fill" className="text-indigo-400 shrink-0 mt-0.5" />
                  <div className="font-sans text-[12px] sm:text-[13px] leading-relaxed">
                    {title && <span className="font-semibold text-white">{title}: </span>}
                    <span className="font-light text-chalk/80">{desc}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={rise} className="mt-6 sm:mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] sm:max-w-[570px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0A0A0B] px-3.5 py-4 sm:px-5 sm:py-5 flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
                <div className="font-display text-xl sm:text-2xl font-bold text-chalk">{stat.value}</div>
                <div className="mt-1 font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.1em] text-ash">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={rise} className="mt-8 flex items-center gap-3">
            <a
              href="#services"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 font-sans text-xs font-semibold tracking-wide text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-300 ease-premium hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(99,102,241,0.45)] active:scale-95 cursor-pointer"
            >
              <span>{aboutData.ctaLabel || 'Start Learning Free'}</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} weight="bold" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
