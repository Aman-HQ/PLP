import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from '../components/icons';
import Logo from '../components/Logo';

export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] px-5 text-center text-[#F5F5F7]">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.1) 60%, transparent 100%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex max-w-md flex-col items-center"
      >
        <Logo className="mb-6 h-12 w-12" />

        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-mono text-indigo-300">
          <Compass size={14} />
          <span>Error 404</span>
        </div>

        <h1 className="mt-4 font-display text-6xl sm:text-7xl font-bold tracking-tight bg-gradient-to-b from-white via-chalk to-ash bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-2 font-display text-xl font-semibold text-chalk">
          Page Not Found
        </h2>

        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-chalk/70">
          The page or study session you are looking for doesn’t exist, has expired, or the link is incorrect.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onGoHome}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 font-sans text-xs font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all duration-300 ease-premium hover:scale-[1.03] active:scale-95"
          >
            <ArrowLeft size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
