import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, CaretLeft, CaretRight, MagnifyingGlassPlus, WhatsappLogo, Sparkle } from '@phosphor-icons/react';
import journalData from '../data/journal.json';
import siteData from '../data/site.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Img from '../components/Img';

const EASE = [0.16, 1, 0.3, 1];

export default function BlogPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const cmsPage = journalData.journalPage || {};
  const allPosts = journalData.posts || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % allPosts.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + allPosts.length) % allPosts.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allPosts.length]);

  return (
    <div className="min-h-screen bg-cream text-forest-dark antialiased selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-forest-dark pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        {/* Background Hex Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="blogHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blogHexDark)" />
          </svg>
        </div>

        {/* Ambient Gold Glow Behind Hero */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
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
              {cmsPage.badge || 'PATIENT STORIES & TESTIMONIALS'}
            </span>
            <h1 className="mt-4 font-serif text-[28px] font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {cmsPage.titlePrefix || 'Patient'}{' '}
              <span className="text-gold font-normal">
                {cmsPage.titleHighlight || 'Success Stories'}
              </span>
            </h1>
            <p className="mt-5 font-sans text-sm font-light leading-relaxed text-white/80 sm:text-lg">
              {cmsPage.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="relative py-12 sm:py-16">
        {/* Grid */}
        <section className="relative z-10 pt-4 sm:pt-6">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post, idx) => (
                <div
                  key={post.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm ring-1 ring-black/5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-zinc-100/80 sm:h-72">
                    <Img
                      src={post.img}
                      alt={post.title}
                      className="h-full w-full object-cover grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-forest-dark/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-forest-dark shadow-lg transform scale-90 transition-transform duration-300 group-hover:scale-100">
                        <MagnifyingGlassPlus size={20} weight="bold" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark">
                      {post.category}
                    </span>
                    <h3 className="mt-2.5 font-serif text-lg font-medium leading-snug tracking-tight text-forest-dark line-clamp-2 group-hover:text-gold-dark transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-light leading-relaxed text-forest/70 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal (Exact same as GalleryPage) */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/95 p-4 backdrop-blur-xl cursor-pointer"
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
                  setLightboxIndex((prev) => (prev - 1 + allPosts.length) % allPosts.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8 z-10"
                aria-label="Previous image"
              >
                <CaretLeft size={24} weight="bold" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % allPosts.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 z-10"
                aria-label="Next image"
              >
                <CaretRight size={24} weight="bold" />
              </button>

              <div
                className="relative max-h-[85vh] max-w-[90vw] cursor-default overflow-hidden rounded-2xl border border-white/15 bg-forest-dark p-2 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const currentPost = allPosts[lightboxIndex];
                  if (!currentPost) return null;

                  return (
                    <div className="flex flex-col items-center">
                      <Img
                        src={currentPost.img}
                        alt={currentPost.title}
                        className="max-h-[75vh] max-w-full object-contain rounded-xl"
                      />
                      <div className="w-full border-t border-white/10 bg-forest-dark/80 p-4 text-center">
                        <p className="font-serif text-lg text-white">{currentPost.title}</p>
                        <p className="mt-1 font-sans text-xs tracking-wide text-gold">
                          Testimonial {lightboxIndex + 1} of {allPosts.length}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Luxury Invitation Card */}
        <section className="relative z-10 bg-cream pb-12 pt-6 sm:pb-20 sm:pt-10">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/15 bg-forest-dark p-6 sm:p-20 md:p-16 text-center text-white shadow-2xl"
            >
              {/* Background Texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
                <svg className="h-full w-full" width="100%" height="100%">
                  <defs>
                    <pattern id="blogCtaHex" width="60" height="52" patternUnits="userSpaceOnUse">
                      <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#blogCtaHex)" />
                </svg>
              </div>

              {/* Ambient Gold Glow inside Card */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-2xl sm:max-w-3xl lg:max-w-4xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 sm:px-5 sm:py-2 font-sans text-[8px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
                  <Sparkle size={14} weight="fill" />
                  Visit Our Bareilly Clinic
                </span>
                <h2 className="mt-3 sm:mt-6 font-serif text-2xl font-medium text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Ready to see us?
                </h2>
                <p className="mt-2 sm:mt-5 font-sans text-xs sm:text-lg lg:text-xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                  Book a consultation at Anubhuti Dental Studio and we will walk you through your options, calmly and clearly.
                </p>
                <div className="mt-6 sm:mt-10 flex justify-center">
                  <button
                    onClick={() => {
                      const phone = siteData.whatsappPhone || '918076601314';
                      const message = encodeURIComponent(siteData.whatsappMessage || 'Hello Dr. Anubhuti\'s Advanced Dental Care, I would like to book a dental appointment.');
                      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                    }}
                    className="group inline-flex h-12 sm:h-14 max-w-full items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-4 sm:px-10 font-sans shadow-[0_8px_32px_rgba(128,128,128,0.4)] transition-all duration-300 ease-premium hover:scale-105 hover:shadow-[0_12px_40px_rgba(128,128,128,0.6)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
                  >
                    <WhatsappLogo size={22} weight="fill" className="text-forest-dark shrink-0 transition-transform duration-300 group-hover:scale-110 sm:w-7 sm:h-7" />
                    <span className="whitespace-nowrap text-[10.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-forest-dark">Book Appointment</span>
                    <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-1">
                      <ArrowRight size={12} weight="bold" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
