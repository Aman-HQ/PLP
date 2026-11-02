import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, X, CaretLeft, CaretRight, MagnifyingGlassPlus, Sparkle } from '@phosphor-icons/react';
import galleryData from '../data/gallery.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Img from '../components/Img';

const EASE = [0.16, 1, 0.3, 1];
const fallback = (seed) => `https://picsum.photos/seed/${seed || 'anubhuti-dental'}/1000/800?grayscale`;

export default function GalleryPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const cmsPage = galleryData.galleryPage || {};
  const allImages = galleryData.images || [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  return (
    <div className="min-h-screen bg-cream text-forest-dark selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Banner Section (Replicated from AboutPage dark forest header) */}
      <section className="relative overflow-hidden bg-forest-dark pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        {/* Background Hex Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="galleryHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#galleryHexDark)" />
          </svg>
        </div>

        {/* Ambient Gold Glow Behind Hero */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Back to Home Button */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                if (onBack) onBack();
                else window.location.hash = 'home';
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold active:scale-[0.97]"
            >
              <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              {cmsPage.backButtonLabel || 'Back to home'}
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 sm:px-5 sm:py-2 font-sans text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
              <Sparkle size={13} weight="fill" />
              {cmsPage.badge || 'VISUAL TOUR & CLINIC SHOWCASE'}
            </span>
            <h1 className="mt-4 font-serif text-[28px] font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {cmsPage.titlePrefix || 'The'}{' '}
              <span className="text-gold font-normal">
                {cmsPage.titleHighlight || 'Gallery'}
              </span>
            </h1>
            <p className="mt-5 font-sans text-sm font-light leading-relaxed text-white/80 sm:text-lg">
              {cmsPage.subtitle || 'Explore our state-of-the-art facility, clinical precision, and warm patient atmosphere at Dr. Anubhuti Dental Studio.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid Section (Warm Luxury Light Canvas matching AboutPage) */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        {allImages.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-forest-dark/60">
              {cmsPage.emptyStateMessage || 'No photos available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allImages.map((img, idx) => {
              const isExternal = img.name?.startsWith('http') || img.name?.startsWith('/');
              const src = isExternal ? img.name : `/gallery/${img.name}`;
              const titleText = img.caption || img.alt || 'Clinic photo';

              return (
                <motion.div
                  key={img.name || idx}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: EASE, delay: (idx % 4) * 0.05 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-white p-2.5 shadow-[0_10px_30px_-15px_rgba(20,57,43,0.15)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-forest/10">
                    <Img
                      src={src}
                      alt={img.alt || titleText}
                      loading="lazy"
                      onError={(e) => {
                        const fb = fallback(img.seed || idx);
                        if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                      }}
                      className="h-full w-full object-cover filter grayscale-[40%] contrast-105 transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col justify-end rounded-b-xl bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-end justify-between gap-3 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="font-serif text-sm font-medium text-white">{titleText}</p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-forest-dark shadow-md">
                        <MagnifyingGlassPlus size={16} weight="bold" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/95 p-4 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X size={24} weight="bold" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
              aria-label="Previous image"
            >
              <CaretLeft size={24} weight="bold" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % allImages.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
              aria-label="Next image"
            >
              <CaretRight size={24} weight="bold" />
            </button>

            <div
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/15 bg-forest-dark p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImg = allImages[lightboxIndex];
                if (!currentImg) return null;
                const isExternal = currentImg.name?.startsWith('http') || currentImg.name?.startsWith('/');
                const src = isExternal ? currentImg.name : `/gallery/${currentImg.name}`;
                const captionText = currentImg.caption || currentImg.alt || 'Clinic photo';

                return (
                  <div className="flex flex-col items-center">
                    <Img
                      src={src}
                      alt={currentImg.alt || captionText}
                      onError={(e) => {
                        const fb = fallback(currentImg.seed || lightboxIndex);
                        if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                      }}
                      className="max-h-[75vh] max-w-full object-contain rounded-xl"
                    />
                    <div className="w-full border-t border-white/10 bg-forest-dark/80 p-4 text-center">
                      <p className="font-serif text-lg text-white">{captionText}</p>
                      <p className="mt-1 font-sans text-xs tracking-wide text-gold">
                        Image {lightboxIndex + 1} of {allImages.length}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
