import { motion, useReducedMotion } from 'framer-motion';
import {
  Tooth,
  ShieldCheck,
  Smiley,
  Sparkle,
  Drop,
  Baby,
  ArrowUpRight,
  ArrowRight,
} from '@phosphor-icons/react';
import Img from './Img';
import servicesData from '../data/services.json';

const EASE = [0.16, 1, 0.3, 1];

const ICONS = { Tooth, ShieldCheck, Smiley, Sparkle, Drop, Baby };

function Icon({ name, ...props }) {
  const C = ICONS[name] || Tooth;
  return <C {...props} />;
}

export default function Services() {
  const reduceMotion = useReducedMotion();
  const feature = servicesData.feature || {};
  const items = servicesData.items || [];

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: (i = 0) => ({
      opacity: 1,
      transition: { duration: 0.35, ease: EASE, delay: reduceMotion ? 0 : i * 0.03 },
    }),
  };

  return (
    <section id="services" className="relative w-full overflow-x-clip bg-ink py-24 md:py-32">
      {/* faint top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={rise}
          className="max-w-2xl"
        >
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ash">
            {servicesData.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-chalk sm:text-5xl">
            {servicesData.title}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-chalk/70">
            {servicesData.subtitle}
          </p>
        </motion.div>

        {/* Bento grid: 1 feature (2x2) + 4 compact + 1 wide */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature card */}
          <motion.a
            href="#contact"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 md:col-span-2 md:row-span-2"
          >
            <Img
              src={feature.image}
              alt={feature.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
            <div className="relative z-10 p-7 sm:p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-chalk backdrop-blur-sm">
                <Icon name={feature.icon} size={22} weight="regular" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                {feature.name}
              </h3>
              <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-chalk/75">
                {feature.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-chalk">
                Learn more
                <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>

          {/* Compact cards */}
          {items.map((item, i) => (
            <motion.a
              key={item.name}
              href="#contact"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={rise}
              className={`group flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] ${
                i === items.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-chalk">
                <Icon name={item.icon} size={20} weight="regular" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-chalk">
                {item.name}
              </h3>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-chalk/60">
                {item.desc}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md font-sans text-sm font-light text-chalk/60">
            Not sure what you need? Book a consultation and we will assess and explain your options clearly.
          </p>
          <a
            href="#contact"
            className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-chalk px-6 font-sans text-sm font-semibold tracking-tight text-ink transition-all duration-300 ease-premium hover:bg-white active:scale-[0.97]"
          >
            {servicesData.ctaLabel || 'Book a consultation'}
            <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
