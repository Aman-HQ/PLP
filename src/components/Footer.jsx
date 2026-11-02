import { motion, useReducedMotion } from 'framer-motion';
import { WhatsappLogo, InstagramLogo, FacebookLogo, ArrowRight } from '@phosphor-icons/react';
import Logo from './Logo';
import Img from './Img';
import footerData from '../data/footer.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

// Background for the CTA band.
const CTA_BG = '/footer/dental.png';
const CTA_FALLBACK =
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80';

function JustdialIcon({ size = 20, className = "" }) {
  return (
    <span
      className={`font-sans font-black tracking-tight leading-none uppercase ${className}`}
      style={{ fontSize: `${Math.max(10, size * 0.55)}px` }}
    >
      JD
    </span>
  );
}

const SOCIALS = [
  { label: 'WhatsApp', icon: WhatsappLogo, href: `https://wa.me/${siteData.whatsappPhone || '918076601314'}` },
  { label: 'Instagram', icon: InstagramLogo, href: siteData.socialLinks?.instagram || 'https://www.instagram.com/dr.anubhutig' },
  { label: 'Facebook', icon: FacebookLogo, href: siteData.socialLinks?.facebook || 'https://www.facebook.com/dranubhutiguptamds' },
  { label: 'Justdial', icon: JustdialIcon, href: siteData.socialLinks?.justdial || 'https://www.justdial.com/Bareilly/Dr--Anubhuti-Advanced-Dental-Care/9999PX581-X581-210419162518-Y3K4_BZDET' },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };

  const quickLinks = footerData.quickLinks || [];

  return (
    <footer className="relative w-full">
      {/* CTA band */}
      <div className="relative flex min-h-[36vh] sm:min-h-[52vh] items-center overflow-hidden bg-black">
        <Img
          src={CTA_BG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== CTA_FALLBACK) e.currentTarget.src = CTA_FALLBACK;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Black gradient: darker at top, image visible in the middle, fading to pure black at the bottom */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black" />

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative z-10 mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-20"
        >
          <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-4xl md:text-5xl">
            {footerData.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light leading-relaxed text-white/80 sm:mt-6 sm:text-base">
            {footerData.ctaSubtitle}
          </p>
          <div className="mt-7 sm:mt-9 flex justify-center">
            <a
              href={footerData.ctaButtonLink || '#contact'}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-3 sm:px-8 sm:py-3.5 font-sans text-xs sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-forest-dark active:scale-[0.98]"
            >
              {footerData.ctaButtonLabel || 'Contact Us'}
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer body */}
      <div className="bg-black">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-10 sm:px-8">
          {/* Desktop Layout (md+) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 lg:gap-12 gap-12">
            {/* Brand */}
            <div>
              <a href="#home" className="flex items-center gap-3" aria-label="Dr. Anubhuti's Advanced Dental Care">
                <Logo className="h-12 w-12 text-gold" />
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-[18px] text-white">{siteData.name || "Dr. Anubhuti's Advanced Dental Care"}</span>
                </span>
              </a>
              <p className="mt-5 max-w-xs font-sans text-[13px] font-light leading-relaxed text-white/50">
                {footerData.brandTagline}
              </p>
              <p className="mt-6 font-sans text-[12px] font-light text-white/40">
                &copy; {new Date().getFullYear()} {footerData.copyrightText}
              </p>
              <p className="mt-1 font-sans text-[12px] font-light text-white/40">
                {footerData.craftedText}
              </p>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-serif text-lg text-white">Contact Information</h3>
              <div className="mt-5 space-y-4 font-sans text-[14px] font-light text-white/60">
                <p className="max-w-xs leading-relaxed">{siteData.address}</p>
                <p>
                  <a href={`tel:${siteData.phone}`} className="transition-colors hover:text-gold">
                    {siteData.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-gold">
                    {siteData.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-serif text-lg text-white">Connect with Us</h3>
              <div className="mt-5 flex gap-3 flex-wrap">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-forest-dark"
                  >
                    <Icon size={24} weight="fill" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Specific Layout (<md) */}
          <div className="flex flex-col gap-9 md:hidden">
            {/* 1. Brand Header */}
            <div>
              <a href="#home" className="flex items-center gap-3" aria-label="Dr. Anubhuti's Advanced Dental Care">
                <Logo className="h-11 w-11 text-gold" />
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-[15px] text-white">{siteData.name || "Dr. Anubhuti's Advanced Dental Care"}</span>
                </span>
              </a>
              <p className="mt-4 font-sans text-[13px] font-light leading-relaxed text-white/50">
                {footerData.brandTagline}
              </p>
            </div>

            {/* 2. Contact Information */}
            <div>
              <h3 className="font-serif text-base text-white">Contact Information</h3>
              <div className="mt-4 space-y-3 font-sans text-[14px] font-light text-white/60">
                <p className="leading-relaxed">{siteData.address}</p>
                <p>
                  <a href={`tel:${siteData.phone}`} className="transition-colors hover:text-gold">
                    {siteData.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-gold">
                    {siteData.email}
                  </a>
                </p>
              </div>
            </div>

            {/* 3. Connect with Us */}
            <div>
              <h3 className="font-serif text-base text-white">Connect with Us</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-forest-dark"
                  >
                    <Icon size={24} weight="fill" />
                  </a>
                ))}
              </div>
            </div>

            {/* 4. Copyright line at the very bottom */}
            <div className="border-t border-white/10 pt-6">
              <p className="font-sans text-[12px] font-light text-white/40">
                &copy; {new Date().getFullYear()} {footerData.copyrightText}
              </p>
              <p className="mt-1 font-sans text-[12px] font-light text-white/40">
                {footerData.craftedText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
