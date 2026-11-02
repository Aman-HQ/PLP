import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import Img from './Img';
import journalData from '../data/journal.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://picsum.photos/seed/${seed || 'anubhuti-dental-journal'}/900/600?grayscale`;

export default function Journal() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03 } },
  };

  const posts = (journalData.posts || []).slice(0, 3);

  // Auto-scroll on mobile
  useEffect(() => {
    if (isInteracting || !posts.length) return undefined;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollWidth > el.clientWidth) {
        const next = (activeIndex + 1) % posts.length;
        const itemWidth = el.scrollWidth / posts.length;
        el.scrollTo({ left: itemWidth * next, behavior: 'smooth' });
        setActiveIndex(next);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex, isInteracting, posts.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    if (el.scrollWidth > el.clientWidth) {
      const itemWidth = el.scrollWidth / posts.length;
      const current = Math.round(el.scrollLeft / itemWidth);
      if (current !== activeIndex && current >= 0 && current < posts.length) {
        setActiveIndex(current);
      }
    }
  };

  return (
    <section id="blog" className="relative w-full bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <motion.h2
              variants={rise}
              className="font-display text-4xl font-semibold tracking-tight text-chalk sm:text-5xl"
            >
              {journalData.title}
            </motion.h2>
            <motion.p variants={rise} className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-chalk/70">
              Practical, jargon-free answers to the questions we hear most.
            </motion.p>
          </div>
          <motion.a
            variants={rise}
            href="#blog-page"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-sm font-medium tracking-tight text-chalk transition-colors"
          >
            {journalData.viewAllLabel || 'View all articles'}
            <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setTimeout(() => setIsInteracting(false), 5000)}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {posts.map((post, idx) => (
            <motion.a
              key={post.id || idx}
              href="#blog-page"
              variants={rise}
              className="group flex w-[82vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.05] md:w-auto md:max-w-none md:shrink"
            >
              <div className="overflow-hidden">
                <Img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    const fb = fallback(post.seed);
                    if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                  }}
                  className="aspect-[16/10] w-full object-cover grayscale transition-transform duration-[1.3s] ease-premium group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ash">
                  {post.category}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-chalk">
                  {post.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm font-light leading-relaxed text-chalk/60 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-chalk">
                  Read
                  <ArrowUpRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile dots */}
        {posts.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {posts.map((post, i) => (
              <button
                key={post.id || i}
                type="button"
                onClick={() => {
                  if (scrollRef.current) {
                    const el = scrollRef.current;
                    const itemWidth = el.scrollWidth / posts.length;
                    el.scrollTo({ left: itemWidth * i, behavior: 'smooth' });
                    setActiveIndex(i);
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-chalk' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
