import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Tooth,
  ShieldCheck,
  Smiley,
  Sparkle,
  Drop,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle,
  Scan,
  Heart,
  WhatsappLogo,
  X,
  Info
} from '@phosphor-icons/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Img from '../components/Img';
import siteData from '../data/site.json';
import servicesData from '../data/services.json';

const EASE = [0.16, 1, 0.3, 1];

const ICONS = {
  Tooth,
  ShieldCheck,
  Smiley,
  Sparkle,
  Drop,
  Scan,
  Heart
};

function Icon({ name, ...props }) {
  const C = ICONS[name] || Tooth;
  return <C {...props} />;
}

export default function ServicesPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const [activeTreatment, setActiveTreatment] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation to close expanded treatment modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTreatment(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (activeTreatment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTreatment]);

  const rise = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : i * 0.05 },
    }),
  };

  const treatments = servicesData.treatments || [];

  return (
    <div className="min-h-screen bg-cream text-forest-dark antialiased selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Header Hero Section */}
      <section className="relative overflow-hidden bg-forest-dark pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        {/* Background Hex Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="servicesHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#servicesHexDark)" />
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
              Back to Home
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 sm:px-5 sm:py-2 font-sans text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
              <Sparkle size={13} weight="fill" />
              {servicesData.badge || 'OUR CLINICAL SERVICES & TREATMENTS'}
            </span>
            <h1 className="mt-4 font-serif text-[28px] font-medium leading-tight text-white sm:text-4xl md:text-[45px]">
              {servicesData.titlePrefix || 'Advanced Care,'}{' '}
              <span className="text-gold font-normal">
                {servicesData.titleHighlight || 'Delivered Simply'}
              </span>
            </h1>
            <p className="mt-5 font-sans text-sm font-light leading-relaxed text-white/80 sm:text-base">
              {servicesData.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="relative py-12 sm:py-20">
        {/* Full Treatments Grid Section */}
        <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 text-left">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
              Clinical Procedures & Services
            </span>
            <h2 className="mt-2 font-serif text-[22px] font-medium tracking-tight text-forest-dark sm:text-4xl">
              Services Offered by Dr. Anubhuti
            </h2>
            <p className="mt-2 font-sans text-sm font-light text-forest/70 max-w-2xl">
              Authentic treatment protocols delivered with high precision, modern equipment, and complete patient comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {treatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id || idx}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={rise}
                onClick={() => setActiveTreatment(treatment)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold/40 h-auto sm:h-[450px] cursor-pointer"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Image Header Container */}
                  <div className="relative h-44 sm:h-48 w-full shrink-0 overflow-hidden bg-zinc-950/5">
                    <Img
                      src={treatment.image}
                      alt={treatment.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-dark backdrop-blur-md shadow-sm">
                        <Icon name={treatment.icon} size={12} weight="fill" className="text-gold-dark" />
                        {treatment.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 overflow-hidden">
                    <div>
                      <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark block">
                        {treatment.category}
                      </span>
                      <h3 className="mt-1.5 font-serif text-lg sm:text-xl font-medium leading-snug tracking-tight text-forest-dark line-clamp-2">
                        {treatment.title}
                      </h3>
                      <p className="mt-2 font-sans text-xs sm:text-sm font-light leading-relaxed text-forest/80 line-clamp-3">
                        {treatment.desc}
                      </p>
                    </div>

                    {/* Action Controls */}
                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-3">
                      {/* Read More Link */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTreatment(treatment);
                        }}
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer shrink-0"
                      >
                        <Info size={15} weight="bold" />
                        <span>Read More</span>
                      </button>

                      {/* Book Consultation Button */}
                      <a
                        href="#contact"
                        onClick={(e) => e.stopPropagation()}
                        className="group/btn inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-3.5 font-sans shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-300 ease-premium hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
                      >
                        <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.06em] text-forest-dark">
                          Book Consultation
                        </span>
                        <span className="flex h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          <ArrowUpRight size={11} weight="bold" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Loyalty Programme & Package Categories Section (3 Separate Cards with Mobile Horizontal Scroll) */}
        <section className="mt-16 sm:mt-24 mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Header Section: Loyalty Overview (Written directly on background) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-dark/40 bg-gold/20 px-3 py-1 font-sans text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-dark shadow-sm">
              <Sparkle size={12} weight="fill" className="text-gold-dark shrink-0" />
              <span>Loyalty Programme & Dental Health Card</span>
            </span>
            <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight text-forest-dark sm:text-4xl">
              Privilege & Exclusive Dental Service Packages
            </h2>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-5xl">
              <li className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white p-4 shadow-xs transition-all duration-300 hover:border-gold/50 hover:shadow-md">
                <CheckCircle size={20} weight="fill" className="text-gold-dark shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm font-light text-forest-dark/85 leading-relaxed">
                  Our <strong className="font-semibold text-forest-dark">Loyalty Programme</strong> is available to all existing patients and their families, entitling them to top-of-the-line dental care along with special benefits and discounts.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white p-4 shadow-xs transition-all duration-300 hover:border-gold/50 hover:shadow-md">
                <CheckCircle size={20} weight="fill" className="text-gold-dark shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm font-light text-forest-dark/85 leading-relaxed">
                  Our <strong className="font-semibold text-forest-dark">Dental Health Card</strong> provides members the opportunity to avail our carefully structured range of service packages all year round.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white p-4 shadow-xs transition-all duration-300 hover:border-gold/50 hover:shadow-md">
                <CheckCircle size={20} weight="fill" className="text-gold-dark shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm font-light text-forest-dark/85 leading-relaxed">
                  Members enjoy <strong className="font-semibold text-gold-dark">Priority Booking</strong> in appointments and all innovative Treatment, Cosmetic, and Advanced packages.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white p-4 shadow-xs transition-all duration-300 hover:border-gold/50 hover:shadow-md">
                <CheckCircle size={20} weight="fill" className="text-gold-dark shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm font-light text-forest-dark/85 leading-relaxed">
                  It is our way of rewarding our patients for choosing the <strong className="font-semibold text-forest-dark">Best Dental Clinic in Bareilly</strong>, year after year.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* 3 Separate Fancy Package Cards (Horizontal Scroll on Mobile, 3-Column Grid on Desktop) */}
          <div className="mt-8 flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {/* Package Card 1: Treatment Packages */}
            <div className="group relative flex flex-col items-center text-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/30 bg-white p-6 sm:p-8 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center">
              <div className="flex flex-col items-center w-full">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-gold/40 shadow-md ring-4 ring-forest-dark/5 transition-transform duration-500 group-hover:scale-105">
                  <Img
                    src="/experiences/1.avif"
                    alt="Treatment Packages"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl sm:text-2xl font-medium text-cyan-600 transition-colors duration-300 group-hover:text-cyan-500">
                  Treatment Packages
                </h3>
                <ul className="mt-4 space-y-2.5 font-sans text-xs sm:text-sm font-light text-forest/85 w-full text-left sm:text-center">
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Endoscopic Checkup & Screening</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>R.C.T. with Crown Package</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Super Soft Dentures</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Dental Braces Package</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Package Card 2: Cosmetic Packages */}
            <div className="group relative flex flex-col items-center text-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/30 bg-white p-6 sm:p-8 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center">
              <div className="flex flex-col items-center w-full">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-gold/40 shadow-md ring-4 ring-forest-dark/5 transition-transform duration-500 group-hover:scale-105">
                  <Img
                    src="/experiences/6.avif"
                    alt="Cosmetic Packages"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl sm:text-2xl font-medium text-cyan-600 transition-colors duration-300 group-hover:text-cyan-500">
                  Cosmetic Packages
                </h3>
                <ul className="mt-4 space-y-2.5 font-sans text-xs sm:text-sm font-light text-forest/85 w-full text-left sm:text-center">
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Teeth Whitening Package</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Ceramic Crown & Bridge</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Ceramic Veneer</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Ceramic Braces Package</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Wedding Smile Package</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Dental Jewelry</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Package Card 3: Advanced Services */}
            <div className="group relative flex flex-col items-center text-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/30 bg-white p-6 sm:p-8 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center">
              <div className="flex flex-col items-center w-full">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-gold/40 shadow-md ring-4 ring-forest-dark/5 transition-transform duration-500 group-hover:scale-105">
                  <Img
                    src="/experiences/8.avif"
                    alt="Advanced Services"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl sm:text-2xl font-medium text-cyan-600 transition-colors duration-300 group-hover:text-cyan-500">
                  Advanced Services
                </h3>
                <ul className="mt-4 space-y-2.5 font-sans text-xs sm:text-sm font-light text-forest/85 w-full text-left sm:text-center">
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>LASER Dentistry</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>Microscope Assisted Dentistry</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Treatment Card Modal Backdrop */}
        <AnimatePresence>
          {activeTreatment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveTreatment(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden rounded-3xl border border-gold/30 bg-white shadow-2xl cursor-default text-forest-dark"
              >
                {/* Treatment Image Header */}
                <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-zinc-900">
                  <Img
                    src={activeTreatment.image}
                    alt={activeTreatment.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-forest-dark backdrop-blur-md shadow-md">
                      <Icon name={activeTreatment.icon} size={13} weight="fill" className="text-gold-dark" />
                      {activeTreatment.badge}
                    </span>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTreatment(null)}
                    className="absolute top-4 right-4 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-forest-dark shadow-md backdrop-blur-md transition-all duration-300 hover:bg-forest-dark hover:text-white cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>

                {/* Treatment Detail Text Body (Scrollable inside modal) */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-7">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-dark">
                    {activeTreatment.category}
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium tracking-tight text-forest-dark">
                    {activeTreatment.title}
                  </h3>

                  <div className="mt-4 space-y-3 font-sans text-xs sm:text-sm font-light leading-relaxed text-forest/85">
                    <p>{activeTreatment.desc}</p>
                    {activeTreatment.fullDetail && (
                      <p className="border-l-2 border-gold-dark/40 pl-3.5 py-2 italic bg-cream/50 rounded-r-xl">
                        {activeTreatment.fullDetail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action CTA inside Expanded Modal Footer */}
                <div className="shrink-0 flex items-center justify-between gap-4 border-t border-black/10 bg-cream/30 px-5 sm:px-7 py-4">
                  <span className="font-sans text-[11px] text-forest/60 hidden sm:inline">
                    Dr. Anubhuti's Advanced Dental Care Clinic
                  </span>

                  <a
                    href="#contact"
                    onClick={() => setActiveTreatment(null)}
                    className="group inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-5 font-sans shadow-md transition-all duration-300 ease-premium hover:scale-105 hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
                  >
                    <span className="whitespace-nowrap text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.08em] text-forest-dark">
                      Book Consultation Now
                    </span>
                    <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={12} weight="bold" />
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Luxury Invitation Card (Bridging Light Cream to Dark Footer - Replicated from AboutPage) */}
        <section className="relative z-10 bg-cream pb-12 pt-16 sm:pb-20 sm:pt-24">
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
                    <pattern id="servicesCtaHex" width="60" height="52" patternUnits="userSpaceOnUse">
                      <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#servicesCtaHex)" />
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
                  Ready to transform your smile?
                </h2>
                <p className="mt-2 sm:mt-5 font-sans text-xs sm:text-lg lg:text-xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                  Book a personalized consultation at Anubhuti Dental Studio. We will discuss your treatment plan with full transparency and zero rush.
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
