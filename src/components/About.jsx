import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain,
  Stack,
  SquaresFour,
  Lightning,
  User,
  Plus,
  PaperPlaneTilt,
} from './icons';
import Logo from './Logo';

const EASE_PREMIUM = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    icon: <Brain size={24} weight="regular" />,
    title: 'Socratic Inquiry',
    desc: 'Guides you with the right questions, helping you think deeper and build real understanding.',
  },
  {
    icon: <Stack size={24} weight="regular" />,
    title: 'Real-Time Adaptive Pacing',
    desc: 'Adjusts to your level, response speed, and learning goals in real time.',
  },
  {
    icon: <SquaresFour size={24} weight="regular" />,
    title: 'Multi-Disciplinary Mastery',
    desc: 'Learn and connect concepts across Mathematics, Computer Science, Physics, Chemistry, and more.',
  },
  {
    icon: <Lightning size={24} weight="regular" />,
    title: 'Multi-Modal Feedback',
    desc: 'Get clear explanations with code, equations, and visual breakdowns whenever you need them.',
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_PREMIUM },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#09090B] py-20 sm:py-24 md:py-28 border-t border-white/[0.06]"
    >
      {/* Top-Right curved specular ambient light sweep matching Image 2 */}
      <svg
        className="pointer-events-none absolute -top-12 -right-12 h-[550px] w-[550px] opacity-40 select-none z-0"
        viewBox="0 0 550 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 550 0 C 420 120, 240 240, 0 450"
          stroke="url(#aboutRightGlow)"
          strokeWidth="2"
        />
        <path
          d="M 550 0 C 420 120, 240 240, 0 450"
          stroke="url(#aboutRightGlow)"
          strokeWidth="10"
          strokeOpacity="0.3"
          filter="blur(8px)"
        />
        <defs>
          <linearGradient id="aboutRightGlow" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Eyebrow + Headline + Subtitle + Stacked Interactive Chat Mockup */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col"
          >
            {/* 1. Eyebrow Badge matching Image 2 */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
                <Logo className="w-3.5 h-3.5 rounded-sm" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  The AI Tutor Advantage
                </span>
              </div>
            </motion.div>

            {/* 2. Main Headline matching Image 2 */}
            <motion.h2
              variants={itemVariants}
              className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-[40px] leading-[1.14] text-white tracking-tight"
            >
              Built on Cognitive Science &amp; Intelligent Mentorship
            </motion.h2>

            {/* 3. Subtitle matching Image 2 */}
            <motion.p
              variants={itemVariants}
              className="mt-3 font-sans text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl"
            >
              A learning experience designed around how you think, practice, and truly build lasting understanding.
            </motion.p>

            {/* 4. Stacked Mockup Window matching Image 2 */}
            <motion.div
              variants={itemVariants}
              className="relative mt-8 sm:mt-10 w-full max-w-[530px]"
            >
              {/* Stacked Backdrop Card 1 (Deepest) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[28px] border border-white/[0.07] bg-[#111114] -rotate-[3.5deg] scale-[0.98] -translate-x-3 -translate-y-2 pointer-events-none opacity-50 shadow-xl"
              />

              {/* Stacked Backdrop Card 2 (Middle) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[28px] border border-white/[0.1] bg-[#16161a] -rotate-[1.8deg] scale-[0.99] -translate-x-1.5 -translate-y-1 pointer-events-none opacity-70 shadow-xl"
              />

              {/* Main Foreground White Mockup Window */}
              <div className="relative rounded-[26px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)] text-zinc-900">
                
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
                  <div className="flex items-center gap-3">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    </div>

                    {/* Window Brand Mark & Title */}
                    <div className="flex items-center gap-2 ml-1">
                      <Logo dark className="w-5 h-5 rounded-md" />
                      <span className="font-sans text-xs sm:text-[13px] font-semibold text-zinc-900 tracking-tight">
                        AI Tutor Session
                      </span>
                    </div>
                  </div>

                  {/* Live Session Badge */}
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 text-[11px] font-medium text-zinc-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Session</span>
                  </div>
                </div>

                {/* Conversation Body */}
                <div className="mt-4 space-y-3.5">
                  
                  {/* User Question */}
                  <div className="flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                      <User size={12} weight="bold" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-zinc-100 px-3.5 py-2.5 text-xs sm:text-[13px] text-zinc-800 font-sans leading-relaxed border border-zinc-200/50">
                      Why does Quicksort run in O(n²) in the worst case?
                    </div>
                  </div>

                  {/* AI Tutor Response */}
                  <div className="flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded-lg bg-black flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <span className="font-bold text-[11px] select-none">✱</span>
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-sm bg-white p-3.5 sm:p-4 border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-xs sm:text-[13px] text-zinc-800 font-sans leading-relaxed">
                      <p className="text-zinc-800">
                        Great question! Quicksort&apos;s worst case happens when the pivot consistently divides the array into highly unbalanced parts — for example, when the array is already sorted.
                      </p>

                      {/* Interactive Array Visualization matching Image 2 */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-0.5">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div
                              key={num}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white font-mono text-xs font-semibold text-zinc-900 shadow-xs"
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                        <span className="text-zinc-400 font-bold text-sm mx-0.5 select-none">→</span>
                        <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-xs font-semibold text-zinc-800">
                          pivot = 1
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input Field matching Image 2 */}
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-full border border-zinc-200 bg-zinc-50/90 px-3 py-1.5 sm:px-3.5 sm:py-2">
                    <button
                      type="button"
                      aria-label="Add attachment"
                      className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                    >
                      <Plus size={15} weight="bold" />
                    </button>
                    <span className="flex-1 font-sans text-xs text-zinc-400 select-none">
                      Ask a follow-up question...
                    </span>
                    <button
                      type="button"
                      aria-label="Send message"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
                    >
                      <PaperPlaneTilt size={12} weight="fill" className="-rotate-12 translate-x-px" />
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 4 Feature Cards matching Image 2 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col gap-3.5 w-full mt-2 lg:mt-0"
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative flex items-start gap-4 sm:gap-5 rounded-2xl border border-white/10 bg-[#121214] p-5 sm:p-6 transition-all duration-300 ease-premium hover:border-white/20 hover:bg-[#161619] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
              >
                {/* Feature Icon Box */}
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Feature Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-base sm:text-[17px] text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
