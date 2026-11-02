import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, FileText, Hash, Compass, Certificate, ChatCircleDots, Briefcase } from './icons';
import servicesData from '../data/services.json';

const EASE = [0.16, 1, 0.3, 1];

const ICONS = {
  FileText,
  Hash,
  Compass,
  Certificate,
  ChatCircleDots,
  Briefcase,
};

function TrackIcon({ name, ...props }) {
  const C = ICONS[name] || FileText;
  return <C {...props} />;
}

export default function Services() {
  const reduceMotion = useReducedMotion();
  const heroSpecialty = servicesData.heroSpecialty || {};
  const treatments = servicesData.treatments || [];

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE, delay: reduceMotion ? 0 : i * 0.05 },
    }),
  };

  return (
    <section id="services" className="relative w-full overflow-x-clip bg-[#0A0A0B] py-24 md:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={rise}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            <span>{servicesData.badge}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-chalk sm:text-5xl">
            <span>{servicesData.titlePrefix} </span>
            <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-violet-300 bg-clip-text text-transparent">
              {servicesData.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-chalk/75">
            {servicesData.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Flagship Specialty Card (2 cols on large) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-[#121215] to-[#121215] p-7 sm:p-8 lg:col-span-2 shadow-xl"
          >
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 font-mono text-xs font-medium text-indigo-300">
                {heroSpecialty.badge}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                {heroSpecialty.title}
              </h3>
              <p className="mt-3 max-w-xl font-sans text-sm font-light leading-relaxed text-chalk/80">
                {heroSpecialty.desc}
              </p>

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {heroSpecialty.highlights?.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-chalk/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.08]">
              <a
                href="#about"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-indigo-300 transition-colors group-hover:text-indigo-200"
              >
                <span>{heroSpecialty.ctaText || 'Get Started with STEM'}</span>
                <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Subject Track Cards */}
          {treatments.map((track, i) => (
            <motion.div
              key={track.id}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={rise}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121215]/80 p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-[#15151B]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-400">
                    <TrackIcon name={track.icon} size={20} weight="regular" />
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-ash">
                    {track.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-chalk">
                  {track.title}
                </h3>
                <p className="mt-2 font-sans text-xs font-light leading-relaxed text-chalk/70">
                  {track.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-[11px] text-indigo-400 font-medium">
                  {track.badge}
                </span>
                <a
                  href="#about"
                  className="inline-flex items-center gap-1 font-sans text-xs font-medium text-chalk/60 hover:text-chalk transition-colors"
                >
                  <span>Practice</span>
                  <ArrowRight size={13} weight="bold" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Banner */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h4 className="font-display text-base font-semibold text-chalk">
              Need help with a custom exam syllabus or course topic?
            </h4>
            <p className="mt-1 font-sans text-xs font-light text-chalk/60">
              Upload your textbook chapter, lecture slides, or exam syllabus and AI Tutor will generate a custom learning track.
            </p>
          </div>
          <a
            href="#about"
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 font-sans text-xs font-semibold text-black transition-all duration-300 ease-premium hover:bg-neutral-200 active:scale-[0.98]"
          >
            <span>Start Free Session</span>
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
