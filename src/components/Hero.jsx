import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  Compass,
  Sparkle,
  CheckCircle,
  Copy,
  Check,
  Brain,
  Terminal,
  Atom,
  CaretDown,
  CaretUp,
  GraduationCap
} from './icons';
import heroData from '../data/hero.json';

const EASE_PREMIUM = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Active interactive demo state
  const [activeTab, setActiveTab] = useState(heroData.interactiveDemos[0].id);
  const [showThinking, setShowThinking] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const currentDemo =
    heroData.interactiveDemos.find((d) => d.id === activeTab) ||
    heroData.interactiveDemos[0];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedQuizOption(null);
    setShowThinking(false);
  };

  const handleCopyCode = () => {
    const textToCopy = currentDemo.codeBlock || currentDemo.mathBlock || '';
    if (textToCopy && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: reduceMotion ? {} : { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: EASE_PREMIUM },
    },
  };

  const scrollToWorkbench = (e) => {
    e.preventDefault();
    const target = document.getElementById('interactive-workbench');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-hidden bg-[#09090B] px-4 pb-28 pt-32 sm:px-6 md:pt-36 lg:px-8 lg:pb-36"
    >
      {/* 1. Cinematic Background Surfaces & Lighting (Strict Monochrome) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 8%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, rgba(9,9,11,0) 70%), linear-gradient(180deg, #000000 0%, #09090B 50%, #0c0c0e 100%)',
        }}
      />

      {/* Subtle specular spotlight glow behind workbench */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[28%] h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-35 blur-[120px] z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Fine technical architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Noise grain texture overlay */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />

      {/* 2. Main Hero Editorial Stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center"
      >
        {/* Display Typography */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-bold leading-[1.06] tracking-tight sm:tracking-[-0.03em] text-white mt-14"
        >
          <span className="block text-3xl font-sans sm:text-5xl md:text-6xl lg:text-[4.55rem] text-zinc-200">
            {heroData.headlinePre}
          </span>
          <span className="mt-1.5 block text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {heroData.headlineEmphasis}
          </span>
        </motion.h1>

        {/* Subtitle with optical measure */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-4xl font-sans text-sm font-normal leading-relaxed text-zinc-400 sm:text-[18px]"
        >
          {heroData.subtitle}
        </motion.p>

        {/* Button-in-Button CTA Action Row */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          {/* Primary CTA: Substantial pill with tactile inward shadow on hover */}
          <a
            href="/dashboard"
            className="group relative flex h-14 w-full items-center justify-between gap-4 rounded-full bg-white pl-8 pr-3.5 font-sans text-[15px] font-semibold text-black shadow-[0_4px_24px_rgba(255,255,255,0.14)] transition-all duration-300 ease-premium hover:bg-neutral-100 hover:shadow-[inset_0_3px_8px_rgba(0,0,0,0.32),inset_0_-1px_2px_rgba(255,255,255,0.9)] active:scale-[0.98] active:shadow-[inset_0_5px_12px_rgba(0,0,0,0.45)] cursor-pointer sm:w-auto"
          >
            <span className="whitespace-nowrap tracking-tight">{heroData.ctaPrimaryLabel}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-black transition-all duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-black/15">
              <ArrowUpRight size={16} weight="bold" />
            </span>
          </a>

          {/* Secondary CTA: Substantial frosted pill with inward shadow on hover */}
          <button
            type="button"
            onClick={scrollToWorkbench}
            className="group relative flex h-14 w-full items-center justify-between gap-4 rounded-full border border-white/15 bg-white/[0.04] pl-6 pr-3.5 font-sans text-[15px] font-medium text-zinc-200 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-300 ease-premium hover:border-white/30 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_0_3px_8px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.12)] active:scale-[0.98] active:shadow-[inset_0_5px_12px_rgba(0,0,0,0.85)] cursor-pointer sm:w-auto"
          >
            <span className="flex items-center gap-2.5">
              <Compass size={22} weight="bold" className="text-zinc-400 group-hover:text-white transition-colors" />
              <span className="whitespace-nowrap tracking-tight">{heroData.ctaSecondaryLabel || 'Explore Demo Below'}</span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ease-premium group-hover:translate-y-1 group-hover:bg-white/15">
              <ArrowDown size={15} weight="bold" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* 3. The Hero Centerpiece: Interactive AI Tutor Workbench (Doppelrand Bezel) */}
      <motion.div
        id="interactive-workbench"
        initial={reduceMotion ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE_PREMIUM }}
        className="relative z-10 mt-14 w-full max-w-5xl"
      >
        {/* Outer Doppelrand Shell */}
        <div className="relative rounded-[24px] sm:rounded-[28px] p-1.5 sm:p-2.5 border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          
          {/* Inner Machined Core */}
          <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] border border-white/[0.08] bg-[#0c0c0e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
            
            {/* Top Chrome / Workspace Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] bg-black/40 px-4 py-3 sm:px-5">
              
              {/* Left: Window Controls + Active Session Status */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-500/80" />
                </div>
                <div className="h-3 w-px bg-white/10 mx-1 hidden sm:block" />
                <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-400">
                  interactive_session.ai
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                  Live Preview
                </span>
              </div>

              {/* Right: Domain Subject Switcher Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {heroData.interactiveDemos.map((demo) => {
                  const isActive = demo.id === activeTab;
                  return (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleTabChange(demo.id)}
                      className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      {demo.id === 'calculus' && <GraduationCap size={13} />}
                      {demo.id === 'systems' && <Terminal size={13} />}
                      {demo.id === 'physics' && <Atom size={13} />}
                      <span>{demo.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workspace Canvas Body */}
            <div className="p-4 sm:p-6 lg:p-7 space-y-4">
              
              {/* 1. Student Inquirer Card */}
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white border border-white/15">
                  You
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-300">Scholar Prompt</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Topic: {currentDemo.topic}</span>
                  </div>
                  <p className="font-sans text-sm text-zinc-200 leading-snug">
                    "{currentDemo.studentQuery}"
                  </p>
                </div>
              </div>

              {/* 2. AI Tutor Socratic Reasoning Card */}
              <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4 sm:p-5 text-left space-y-3.5">
                
                {/* Tutor Header & Expandable Thinking Drawer */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black">
                      <Brain size={14} weight="bold" />
                    </span>
                    <span className="text-xs font-semibold text-white">AI Socratic Tutor</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-zinc-300">
                      Concept Deconstruction
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowThinking((v) => !v)}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <Sparkle size={11} className="text-zinc-400 group-hover:text-white" />
                    <span>Thinking trace ({currentDemo.thinkingTime})</span>
                    {showThinking ? <CaretUp size={11} /> : <CaretDown size={11} />}
                  </button>
                </div>

                {/* Collapsible Thinking Heuristics */}
                <AnimatePresence>
                  {showThinking && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="overflow-hidden rounded-lg bg-black/60 p-3 border border-white/[0.06] space-y-2 text-[11px] font-mono text-zinc-400"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                        Cognitive Evaluation Pipeline
                      </div>
                      <div className="space-y-1.5">
                        {currentDemo.cognitiveSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                            <span className="text-zinc-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Core Socratic Answer */}
                <div className="text-sm leading-relaxed text-zinc-300 font-normal">
                  {currentDemo.tutorCore}
                </div>

                {/* Mathematical or Code Block */}
                {(currentDemo.mathBlock || currentDemo.codeBlock) && (
                  <div className="relative rounded-lg border border-white/10 bg-black/80 p-3 font-mono text-xs text-zinc-200">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[10px] text-zinc-400">
                      <span>{currentDemo.codeBlock ? 'Invariant Verification' : 'Differential Form Formulations'}</span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check size={11} className="text-white" />
                            <span className="text-white">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="mt-2.5 overflow-x-auto text-[12px] text-zinc-100 no-scrollbar">
                      <code>{currentDemo.codeBlock || currentDemo.mathBlock}</code>
                    </pre>
                  </div>
                )}

                {/* Interactive Socratic Checkpoint */}
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-white font-bold">
                      ?
                    </span>
                    <span>Test Your Intuition (Interactive Socratic Checkpoint)</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-normal">
                    {currentDemo.socraticQuestion}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {currentDemo.quiz.options.map((opt) => {
                      const isSelected = selectedQuizOption === opt.id;
                      const isCorrect = opt.correct;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedQuizOption(opt.id)}
                          className={`flex items-start gap-2.5 rounded-lg border p-3 text-left text-xs transition-all duration-200 active:scale-[0.98] ${
                            isSelected
                              ? isCorrect
                                ? 'border-white/40 bg-white/10 text-white shadow-sm'
                                : 'border-zinc-700 bg-zinc-900/80 text-zinc-300'
                              : 'border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                              isSelected
                                ? isCorrect
                                  ? 'border-white bg-white text-black font-bold'
                                  : 'border-zinc-500 bg-zinc-700 text-white'
                                : 'border-white/20 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Banner */}
                  <AnimatePresence>
                    {selectedQuizOption && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="mt-2.5 flex items-start gap-2 rounded-lg border border-white/15 bg-white/[0.05] p-2.5 text-xs text-zinc-200"
                      >
                        <CheckCircle size={15} weight="fill" className="text-white shrink-0 mt-0.5" />
                        <div>
                          {
                            currentDemo.quiz.options.find((o) => o.id === selectedQuizOption)?.feedback
                          }
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

            {/* Bottom Footer Action Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08] bg-black/60 px-5 py-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
                <span>Ready to experience your personalized AI Tutor across 50+ subjects?</span>
              </div>
              <a
                href="/dashboard"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-200 transition-colors"
              >
                <span>Launch Full Learning Console</span>
                <ArrowUpRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Ambient Floating Metric Badges (Z-Axis Depth & Physical Layering) */}
        <div
          aria-hidden
          className="hidden lg:flex absolute -left-8 -bottom-6 z-20 items-center gap-3 rounded-2xl border border-white/15 bg-[#121214]/90 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10">
            <Brain size={18} weight="bold" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-medium text-zinc-400">Socratic Mastery Rate</div>
            <div className="font-mono text-sm font-bold text-white">98.4% Retention</div>
          </div>
        </div>

        <div
          aria-hidden
          className="hidden lg:flex absolute -right-8 -top-6 z-20 items-center gap-3 rounded-2xl border border-white/15 bg-[#121214]/90 p-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Sparkle size={18} weight="bold" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-medium text-zinc-400">Cognitive Acceleration</div>
            <div className="font-mono text-sm font-bold text-white">+2.4x vs Rote Study</div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}