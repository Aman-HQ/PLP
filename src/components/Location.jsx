import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, SquaresFour, ArrowUpRight } from '@phosphor-icons/react';
import locData from '../data/location.json';

const EASE = [0.16, 1, 0.3, 1];

const ADDRESS = locData.address || 'Bareilly, Uttar Pradesh';
const MAP_QUERY = encodeURIComponent(`${locData.venueName || 'Dental clinic'}, ${ADDRESS}`);
const MAP_LINK = `https://maps.google.com/?q=${MAP_QUERY}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_QUERY}&z=14&output=embed`;

function QrCode() {
  return (
    <a
      href={MAP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the clinic location in Google Maps"
      className="group relative inline-block h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-2xl bg-white p-2 shadow-lg transition-transform duration-500 ease-premium hover:scale-[1.03]"
    >
      <img src="/qr/image.png" alt="Scan for directions to Dr. Anubhuti Advanced Dental Care" loading="lazy" className="h-full w-full object-contain rounded-xl" />
    </a>
  );
}

function Block({ icon: Icon, label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ash">
        <Icon size={15} weight="regular" />
        {label}
      </div>
      <div className="mt-2.5 space-y-1.5">{children}</div>
    </div>
  );
}

export default function Location() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  };

  return (
    <section id="location" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        {/* Left: info card (Exact visual replica of Appointment Form card color) */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-[#25252A] to-[#18181D] p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14)] sm:p-10 md:p-12"
        >
          <h2 className="font-display text-lg font-semibold leading-tight tracking-tight text-chalk sm:text-[32px]">
            {locData.titleLine1 || 'Find our advanced Dental Care clinic '}
            <span className="text-ash">{locData.titleLine2 || 'in central Bareilly'}</span>
          </h2>

          <div className="mt-8">
            <Block icon={MapPin} label="Address">
              <div className="font-sans text-[14px] font-light leading-relaxed text-chalk/90 space-y-0.5">
                <p className="font-semibold text-chalk">{locData.buildingName || 'Dr. Shirish Gupta Nursing Home'}</p>
                <p>{locData.streetAddress || '116, Civil Lines, Bareilly, Uttar Pradesh'}</p>
                <p className="text-[11px] sm:text-[13px] text-ash italic">{locData.landmark || '(Main Road, Near ICICI Bank & Circuit House Crossing)'}</p>
              </div>
            </Block>
          </div>

          <div className="mt-8">
            <Block icon={Clock} label="Hours">
              <div className="font-sans text-[13.5px] font-light leading-relaxed text-chalk/90 space-y-1">
                <p><span className="font-semibold text-chalk">Morning:</span> Mon – Sat (10:30am to 2:00pm)</p>
                <p><span className="font-semibold text-chalk">Evening:</span> Mon – Sat (7:00pm to 8:30pm)</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                  <span>
                    <span className="font-semibold text-chalk">Sunday:</span>{' '}
                    <span className="text-gold-light font-medium">Emergency only</span>
                  </span>
                  <span className="text-[13px] text-ash italic">
                    (Appointment available on request)
                  </span>
                </div>
              </div>
            </Block>
          </div>

          {/* Bottom Action Row with QR Code & Instant Navigation Info */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-row items-center justify-start text-left gap-4 sm:gap-8">
            <div className="shrink-0">
              <QrCode />
            </div>

            <div className="flex flex-col items-start space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider text-cyan-400 border border-cyan-500/20">
                <SquaresFour size={12} weight="bold" />
                <span>Scan for Directions</span>
              </div>

              <h3 className="font-display text-base sm:text-xl font-semibold tracking-tight text-chalk">
                Instant Navigation
              </h3>

              <p className="max-w-[210px] sm:max-w-xs font-sans text-[10px] sm:text-[13px] font-light leading-relaxed text-chalk/75">
                Scan this QR code with your mobile camera to open exact GPS directions in Google Maps.
              </p>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex mt-1.5 items-center gap-2 rounded-full bg-chalk px-5 py-2.5 font-sans text-[12px] font-semibold text-ink shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: map */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative min-h-[380px] h-[380px] sm:h-[420px] lg:h-auto overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#25252A] to-[#18181D] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)]"
        >
          <iframe
            title={`Map showing ${locData.venueName}`}
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full rounded-[1.75rem]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
