import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quotes, Check } from '@phosphor-icons/react';
import testData from '../data/testimonials.json';

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 5000;

function OfficialGoogleLogo({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.24a7.17 7.17 0 0 1 0-4.48V6.61H1.29a11.96 11.96 0 0 0 0 10.78l3.99-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
        fill="#EA4335"
      />
    </svg>
  );
}

function Stars({ count = 5, size = 16, className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} weight="fill" className="text-chalk" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const reviews = testData.reviews || [];
  const highlights = testData.highlights || [];

  const goTo = useCallback(
    (next) => {
      if (!reviews.length) return;
      setState(([prev]) => [((next % reviews.length) + reviews.length) % reviews.length, next > prev ? 1 : -1]);
    },
    [reviews.length]
  );

  useEffect(() => {
    if (paused || !reviews.length) return undefined;
    const id = setInterval(() => {
      setState(([prev]) => [(prev + 1) % reviews.length, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index, reviews.length]);

  const review = reviews[index] || {};

  const variants = {
    enter: (dir) => (reduceMotion ? { opacity: 0 } : { y: dir > 0 ? 24 : -24, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => (reduceMotion ? { opacity: 0 } : { y: dir > 0 ? -24 : 24, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative w-full overflow-x-clip bg-ink py-24 md:py-32">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      <div
        className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-2xl font-semibold leading-[1.08] tracking-tight text-chalk sm:text-4xl">
            {testData.titleLine1 || 'Kind words'}{' '}
            <span className="text-ash">{testData.titleLine2 || 'from our patients'}</span>
          </h2>
          {testData.googleRating && (
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2 backdrop-blur-sm">
              <Stars size={14} />
              <span className="font-sans text-[13px] font-light text-chalk/85">
                {testData.googleRating}
              </span>
            </div>
          )}
        </motion.div>

        {/* Body */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* Quote carousel */}
          <div className="relative flex h-full min-h-[280px] sm:min-h-[340px] flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <Quotes size={32} weight="fill" className="text-white/10 shrink-0 sm:h-10 sm:w-10" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-4 flex flex-1 flex-col justify-between"
              >
                <p className="font-display text-base font-light leading-relaxed text-chalk/90 sm:text-2xl min-h-[64px] sm:min-h-[84px] flex items-center">
                  {review.quote}
                </p>
                <footer className="mt-4">
                  <p className="font-display text-sm sm:text-base font-semibold text-chalk">{review.name}</p>
                  <p className="mt-0.5 font-sans text-xs sm:text-[13px] text-ash">{review.meta}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-8 flex items-center gap-2.5">
              {reviews.map((r, i) => (
                <button
                  key={r.name || i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show review from ${r.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-premium ${i === index ? 'w-7 bg-chalk' : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Rating summary card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10"
          >
            <div>
              <div className="flex items-center gap-3">
                <OfficialGoogleLogo size={22} className="shrink-0" />
                <span className="font-sans text-sm font-medium text-chalk/80">Google reviews</span>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-6xl font-semibold leading-none text-chalk">
                  {testData.ratingValue || '4.9'}
                </span>
                <div className="mb-1.5">
                  <Stars size={16} />
                  <p className="mt-1.5 font-sans text-[12px] text-ash">{testData.ratingCount}</p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 font-sans text-sm text-chalk/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-chalk">
                    <Check size={13} weight="bold" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
