import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Images } from '@phosphor-icons/react';
import Img from './Img';
import galleryData from '../data/gallery.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://picsum.photos/seed/${seed || 'anubhuti-dental'}/700/800?grayscale`;

const GImg = ({ name, alt, seed, caption, className }) => {
  if (!name) return null;
  const isExternal =
    name.startsWith('http://') || name.startsWith('https://') || name.startsWith('/');
  const src = isExternal ? name : `/gallery/${name}`;

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <Img
        src={src}
        alt={alt || 'Clinic photo'}
        loading="lazy"
        onError={(e) => {
          const fb = fallback(seed);
          if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
        }}
        className="h-full w-full object-cover grayscale transition-transform duration-[1.3s] ease-premium group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {caption && (
        <span className="absolute bottom-3 left-3 right-3 translate-y-2 font-sans text-[12px] font-medium text-chalk opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {caption}
        </span>
      )}
    </div>
  );
};

export default function Gallery() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03 } },
  };

  const images = galleryData.images || [];

  return (
    <section id="gallery" className="relative w-full bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-2xl"
        >
          <motion.h2 variants={rise} className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-ash">{galleryData.titlePrefix}</span>{' '}
            <span className="text-chalk">{galleryData.titleSuffix}</span>
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-chalk/70"
          >
            {galleryData.subtitle}
          </motion.p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4"
        >
          {/* Left: two stacked feature images */}
          <div className="grid grid-rows-2 gap-3 lg:gap-4">
            {images[0] && (
              <motion.div variants={rise} className="h-full">
                <GImg {...images[0]} className="h-64 sm:h-72 lg:h-full" />
              </motion.div>
            )}
            {images[1] && (
              <motion.div variants={rise} className="h-full">
                <GImg {...images[1]} className="h-64 sm:h-72 lg:h-full" />
              </motion.div>
            )}
          </div>

          {/* Right: staggered two-column masonry */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="flex flex-col gap-3 lg:gap-4">
              {images[2] && (
                <motion.div variants={rise}>
                  <GImg {...images[2]} className="aspect-[4/3]" />
                </motion.div>
              )}
              {images[3] && (
                <motion.div variants={rise}>
                  <GImg {...images[3]} className="aspect-[3/4]" />
                </motion.div>
              )}
              {images[6] && (
                <motion.div variants={rise}>
                  <GImg {...images[6]} className="aspect-[3/4]" />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-3 lg:gap-4">
              {images[4] && (
                <motion.div variants={rise}>
                  <GImg {...images[4]} className="aspect-[3/4]" />
                </motion.div>
              )}
              {images[5] && (
                <motion.div variants={rise}>
                  <GImg {...images[5]} className="aspect-[4/3]" />
                </motion.div>
              )}
              {images[7] && (
                <motion.div variants={rise}>
                  <GImg {...images[7]} className="aspect-square" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#gallery-page"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'gallery-page';
              window.scrollTo(0, 0);
            }}
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-white/15 px-6 font-sans text-sm font-medium tracking-tight text-chalk transition-all duration-300 ease-premium hover:border-white/30 hover:bg-white/[0.04] active:scale-[0.97]"
          >
            <Images size={17} weight="regular" className="shrink-0" />
            <span>{galleryData.ctaLabel || 'View full gallery'}</span>
            <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
