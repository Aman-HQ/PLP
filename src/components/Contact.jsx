import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  Tooth,
  Sparkle,
  Smiley,
  FirstAid,
  CalendarCheck,
  Drop,
  PhoneCall,
} from '@phosphor-icons/react';
import contactData from '../data/contact.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = { Tooth, Sparkle, Smiley, FirstAid, CalendarCheck, Drop };

const FIELD =
  'w-full rounded-xl border border-transparent bg-[#EDEDEF]/95 px-4 py-3.5 font-sans text-[15px] font-medium text-ink placeholder:text-zinc-500/80 outline-none transition-all duration-300 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-400/20';
const LABEL = 'font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-chalk/60';

// Decorative glass orb (monochrome, glossy)
function Orb({ className = '', style }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] motion-safe:animate-drift ${className}`}
      style={{
        background:
          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.14) 32%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0) 100%)',
        ...style,
      }}
    />
  );
}

// Corner selection handle (echoes the reference editor frame)
function Handle({ className = '' }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2.5 w-2.5 rounded-full border border-ink bg-chalk shadow-[0_0_0_1px_rgba(255,255,255,0.25)] ${className}`}
    />
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const brand = siteData.name || 'our clinic';
  const greeting = `Hello ${brand},`;

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');
    if (val.length <= 50) {
      setForm((f) => ({ ...f, name: val }));
      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setForm((f) => ({ ...f, email: val }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleMessageChange = (e) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setForm((f) => ({ ...f, message: val }));
      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const handleMessageFocus = () => {
    if (!form.message.trim()) {
      const defaultText =
        contactData.defaultTemplate ||
        `${greeting} I would like to book a dental appointment. Please share your available slots.`;
      setForm((f) => ({ ...f, message: defaultText }));
      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const handleTemplateSelect = (text) => {
    setForm((f) => ({ ...f, message: text }));
    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Your name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 letters).';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please add a short note about what you need.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    setSent(true);

    const targetPhone = (siteData.whatsappPhone || '917455002900').replace(/\D/g, '');
    const hasGreeting = payload.message.toLowerCase().startsWith('hello');
    const bodyText = hasGreeting ? payload.message : `${greeting}\n\n${payload.message}`;
    const formattedMessage = `${bodyText}\n\n*Name:* ${payload.name}\n*Email:* ${payload.email}\n*Phone:* ${payload.phone}`;
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { });
  };

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };

  return (
    <section id="contact" className="relative w-full overflow-x-clip py-24 md:py-32">
      {/* ---- Background: black gradient + tiled grid + floating glass ---- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 12%, #1b1b20 0%, #101013 45%, #08080a 100%)' }}
      />
      {/* Tiled grid floor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 82%)',
        }}
      />
      {/* Ambient bloom */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)' }}
        aria-hidden
      />
      {/* Floating glass orbs */}
      <Orb className="left-[8%] top-[18%] h-16 w-16 sm:h-20 sm:w-20" style={{ animationDelay: '0s' }} />
      <Orb className="right-[10%] top-[12%] h-10 w-10 sm:h-14 sm:w-14" style={{ animationDelay: '3s' }} />
      <Orb className="bottom-[14%] left-[14%] h-8 w-8 sm:h-12 sm:w-12" style={{ animationDelay: '1.5s' }} />
      <Orb className="hidden sm:block bottom-[20%] right-[12%] h-16 w-16" style={{ animationDelay: '4.5s' }} />



      {/* ---- Form ---- */}
      <div id="book" className="relative z-10 mx-auto max-w-[760px] px-5 sm:px-8">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-white/[0.11] to-white/[0.04] p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:p-10 md:p-12"
        >
          {/* Corner selection handles */}
          <Handle className="-left-1.5 -top-1.5" />
          <Handle className="-right-1.5 -top-1.5" />
          <Handle className="-bottom-1.5 -left-1.5" />
          <Handle className="-bottom-1.5 -right-1.5" />

          {/* Header */}
          <div className="text-center">
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-chalk/55">
              {contactData.badge}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
              {contactData.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-[15px] font-light leading-relaxed text-chalk/70">
              {contactData.subtitle}
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-10 flex flex-col items-center rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-12 text-center"
            >
              <CheckCircle size={44} weight="fill" className="text-chalk" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-chalk">
                {contactData.thankYouTitle || 'Thanks'}, {form.name || 'there'}
              </h3>
              <p className="mt-2 max-w-sm font-sans text-[15px] font-light text-chalk/70">
                {contactData.thankYouMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', phone: '', message: '' });
                  setErrors({});
                }}
                className="mt-6 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan-400 underline-offset-4 transition-colors hover:text-chalk hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-name" className={LABEL}>Full name</label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Aditi Verma"
                    value={form.name}
                    onChange={handleNameChange}
                    className={`${FIELD} ${errors.name ? 'border-red-400/60 ring-1 ring-red-400/20' : ''}`}
                  />
                  {errors.name && <span className="font-sans text-[12px] font-medium text-red-400">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-email" className={LABEL}>Email</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="e.g. aditi@example.com"
                    value={form.email}
                    onChange={handleEmailChange}
                    className={`${FIELD} ${errors.email ? 'border-red-400/60 ring-1 ring-red-400/20' : ''}`}
                  />
                  {errors.email && <span className="font-sans text-[12px] font-medium text-red-400">{errors.email}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-phone" className={LABEL}>Phone number</label>
                <input
                  id="c-phone"
                  type="tel"
                  required
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  className={`${FIELD} ${errors.phone ? 'border-red-400/60 ring-1 ring-red-400/20' : ''}`}
                />
                {errors.phone && <span className="font-sans text-[12px] font-medium text-red-400">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="c-message" className={LABEL}>What do you need?</label>

                {contactData.templates && contactData.templates.length > 0 && (
                  <div className="mb-2 sm:mb-3 flex w-full items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar sm:flex-nowrap sm:justify-between">
                    {contactData.templates.map((tpl, tIdx) => {
                      const IconComponent = ICON_MAP[tpl.icon] || Tooth;
                      const isSelected = form.message === tpl.text;
                      return (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => handleTemplateSelect(tpl.text)}
                          className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1.5 sm:px-3 sm:py-1.5 font-sans text-[11px] sm:text-xs font-medium tracking-tight transition-all duration-300 ${isSelected
                            ? 'border-white bg-white text-ink font-semibold shadow-md'
                            : 'border-transparent bg-[#EDEDEF] text-zinc-800 hover:bg-white hover:text-ink'
                            }`}
                        >
                          <IconComponent size={14} weight="regular" className="shrink-0" />
                          <span>{tpl.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <textarea
                  id="c-message"
                  rows={5}
                  required
                  placeholder="Tell us what you need, any symptoms, and preferred days or times..."
                  value={form.message}
                  onFocus={handleMessageFocus}
                  onChange={handleMessageChange}
                  className={`${FIELD} resize-none ${errors.message ? 'border-red-400/60 ring-1 ring-red-400/20' : ''}`}
                />
                {errors.message && <span className="font-sans text-[12px] font-medium text-red-400">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="group mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-8 font-sans shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 ease-premium hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] hover:from-gold-light hover:to-gold-dark active:scale-[0.98] cursor-pointer"
              >
                <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.12em] text-forest-dark">
                  {contactData.submitButtonText || 'Request appointment'}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-0.5">
                  <ArrowRight size={15} weight="bold" />
                </span>
              </button>
              {/* Direct Phone Notice at End of Form */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center font-sans text-chalk/75">
                {/* Mobile Line 1: Direct Clinic Lines: 8126399924 • 8076601314 (STRICT SINGLE LINE) */}
                <div className="flex flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap text-[11.5px] sm:text-[13px]">
                  <div className="flex items-center gap-1 text-chalk/70 font-medium shrink-0">
                    <PhoneCall size={13} className="text-gold-light shrink-0" weight="regular" />
                    <span>Direct Clinic Lines:</span>
                  </div>
                  <a href="tel:+918126399924" className="hover:text-chalk transition-colors font-medium text-gray-100">
                    8126399924
                  </a>
                  <span className="text-white/20">•</span>
                  <a href="tel:+918076601314" className="hover:text-chalk transition-colors font-medium text-gray-100">
                    8076601314
                  </a>
                  <span className="text-white/20 hidden sm:inline">•</span>
                </div>

                {/* Mobile Line 2: 7417499433 (Emergency) */}
                <div className="flex items-center justify-center text-[11.5px] sm:text-[13px]">
                  <a href="tel:+917417499433" className="text-gold-light hover:underline font-semibold whitespace-nowrap">
                    7417499433 <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">(Emergency)</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
