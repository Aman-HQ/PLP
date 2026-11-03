import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Compass,
  Sparkle,
  Copy,
  Check,
  House,
  Books,
  CheckCircle,
  ChartLineUp,
  ChatCircleDots,
  DotsThree,
  Lightning,
  Plus,
  Stack,
  Sun,
  Export,
  BookmarkSimple,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  PaperPlaneTilt,
  User,
} from './icons';
import heroData from '../data/hero.json';

const EASE_PREMIUM = [0.16, 1, 0.3, 1];

const CONVERSATIONS = [
  {
    id: 'stokes',
    title: "Stokes' Theorem in 3D",
    subject: 'Calculus III',
    topic: 'Vector Calculus',
    userQuery: 'How do I conceptually connect the Fundamental Theorem of Calculus to Stokes\' Theorem in 3D?',
    userTime: '7:32 PM',
    introText: (
      <>
        Both the Fundamental Theorem of Calculus (FTC) and Stokes&apos; Theorem are part of a deeper unifying idea:{' '}
        <strong className="font-semibold text-zinc-900">
          they relate the integral of a derivative over a region to the integral of the original function over the boundary of that region.
        </strong>
      </>
    ),
    card1: {
      title: 'Fundamental Theorem of Calculus (1D)',
      icon: 'trend',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 tracking-wide select-none py-0.5">
          <span className="text-xl sm:text-2xl not-italic font-normal mr-0.5">∫</span>
          <sub className="text-[10px] -ml-1 mr-0.5 not-italic">a</sub>
          <sup className="text-[10px] -ml-1 mr-1 not-italic">b</sup>
          <span>f &apos;(x) dx</span>
          <span className="mx-2 not-italic font-sans text-zinc-400">=</span>
          <span>f(b) − f(a)</span>
        </div>
      ),
      description: 'Relates the integral of a derivative over an interval to the values at its endpoints.',
    },
    card2: {
      title: "Stokes' Theorem (3D)",
      icon: 'stack',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 tracking-wide select-none py-0.5">
          <span className="text-xl sm:text-2xl not-italic font-normal mr-0.5">∬</span>
          <sub className="text-[10px] -ml-1 mr-1 not-italic font-sans font-bold">S</sub>
          <span>(∇ × </span>
          <strong className="not-italic font-bold">F</strong>
          <span>) · d</span>
          <strong className="not-italic font-bold">S</strong>
          <span className="mx-2 not-italic font-sans text-zinc-400">=</span>
          <span className="text-xl sm:text-2xl not-italic font-normal mr-0.5">∮</span>
          <sub className="text-[10px] -ml-1 mr-1 not-italic font-sans font-bold">C</sub>
          <strong className="not-italic font-bold">F</strong>
          <span> · d</span>
          <strong className="not-italic font-bold">r</strong>
        </div>
      ),
      description: 'Relates the surface integral of a curl over a surface S to the line integral of the vector field over its boundary C.',
    },
    keyInsight: (
      <>
        <strong className="font-semibold text-zinc-900">Stokes&apos; Theorem</strong> generalizes the FTC to higher dimensions: instead of an interval and its endpoints, we have a surface and its boundary curve, and instead of a derivative, we use the curl (∇ × F).
      </>
    ),
  },
  {
    id: 'quicksort',
    title: 'Quick Sort Analysis',
    subject: 'Algorithms',
    topic: 'Divide & Conquer',
    userQuery: 'Why does QuickSort run in O(n²) worst-case but O(n log n) expected time?',
    userTime: '6:14 PM',
    introText: (
      <>
        QuickSort&apos;s efficiency depends fundamentally on{' '}
        <strong className="font-semibold text-zinc-900">
          how evenly each partitioned pivot divides the remaining array into independent subproblems.
        </strong>
      </>
    ),
    card1: {
      title: 'Average Case (Balanced Partition)',
      icon: 'trend',
      formula: (
        <div className="font-mono text-sm sm:text-base text-zinc-900 select-none py-0.5 font-semibold">
          T(n) = 2T(n/2) + O(n) ⇒ <span className="text-black font-bold">O(n log n)</span>
        </div>
      ),
      description: 'When pivots roughly split the array in half, recursion depth is mathematically bounded by log₂ n.',
    },
    card2: {
      title: 'Worst Case (Degenerate Partition)',
      icon: 'stack',
      formula: (
        <div className="font-mono text-sm sm:text-base text-zinc-900 select-none py-0.5 font-semibold">
          T(n) = T(n-1) + O(n) ⇒ <span className="text-black font-bold">O(n²)</span>
        </div>
      ),
      description: 'Picking the minimum or maximum element repeatedly collapses the tree into a linked list of depth n.',
    },
    keyInsight: (
      <>
        <strong className="font-semibold text-zinc-900">Randomized Pivoting</strong> or Median-of-Three guarantees expected O(n log n) runtime and protects against adversarial sorted inputs.
      </>
    ),
  },
  {
    id: 'bayes',
    title: "Bayes' Theorem",
    subject: 'Probability & Statistics',
    topic: 'Bayesian Inference',
    userQuery: 'Can you explain Bayes\' Theorem intuitively with a medical diagnostic example?',
    userTime: '5:08 PM',
    introText: (
      <>
        Bayes&apos; Theorem updates our belief in a hypothesis given observed evidence:{' '}
        <strong className="font-semibold text-zinc-900">
          Posterior Probability = (Likelihood × Prior) / Marginal Evidence.
        </strong>
      </>
    ),
    card1: {
      title: 'Prior Probability P(H)',
      icon: 'trend',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 select-none py-0.5">
          <span>P(Condition) = </span>
          <span className="font-sans not-italic font-bold">0.01 (1% base rate)</span>
        </div>
      ),
      description: 'The baseline frequency of the condition in the broader population before testing.',
    },
    card2: {
      title: 'Posterior Probability P(H|E)',
      icon: 'stack',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 select-none py-0.5">
          <span>P(H|E) = </span>
          <span className="font-sans not-italic font-bold text-black">[ P(E|H) · P(H) ] / P(E) ≈ 16.4%</span>
        </div>
      ),
      description: 'Even with a 95% accurate test, a rare 1% prior means false positives often outnumber true positives.',
    },
    keyInsight: (
      <>
        <strong className="font-semibold text-zinc-900">Always account for the base rate:</strong> rare hypotheses require overwhelmingly high specificity before a positive signal indicates strong posterior certainty.
      </>
    ),
  },
  {
    id: 'thermo',
    title: 'Thermodynamics Basics',
    subject: 'Physics',
    topic: 'Classical Thermodynamics',
    userQuery: 'What is the conceptual bridge between the First and Second Laws of Thermodynamics?',
    userTime: '3:45 PM',
    introText: (
      <>
        The First Law governs{' '}
        <strong className="font-semibold text-zinc-900">conservation of energy</strong>, while the Second Law dictates the{' '}
        <strong className="font-semibold text-zinc-900">unidirectional arrow of natural processes.</strong>
      </>
    ),
    card1: {
      title: 'First Law (Conservation)',
      icon: 'trend',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 select-none py-0.5">
          <span>ΔU = Q − W</span>
        </div>
      ),
      description: 'Energy cannot be created or destroyed; heat supplied minus work done equals internal energy change.',
    },
    card2: {
      title: 'Second Law (Entropy)',
      icon: 'stack',
      formula: (
        <div className="font-serif italic text-base sm:text-lg text-zinc-900 select-none py-0.5">
          <span>ΔS</span>
          <sub className="text-[10px] not-italic font-sans">isolated</sub>
          <span className="mx-1.5 not-italic font-sans text-zinc-400">≥</span>
          <span className="not-italic font-sans font-bold">0</span>
        </div>
      ),
      description: 'The entropy of an isolated thermodynamic system never decreases over time.',
    },
    keyInsight: (
      <>
        <strong className="font-semibold text-zinc-900">Energy quantity is conserved, but quality degrades:</strong> entropy ensures heat cannot spontaneously flow from a colder to a hotter reservoir.
      </>
    ),
  },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Active chat conversation inside the mockup
  const [activeChatId, setActiveChatId] = useState('stokes');
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const currentChat = CONVERSATIONS.find((c) => c.id === activeChatId) || CONVERSATIONS[0];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Concept Explanation: ${currentChat.title}\n${currentChat.userQuery}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      {/* 1. Cinematic Background Surfaces & Lighting (Monochrome) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 8%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, rgba(9,9,11,0) 70%), linear-gradient(180deg, #000000 0%, #09090B 50%, #0c0c0e 100%)',
        }}
      />

      {/* Subtle specular spotlight bloom behind app mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[32%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-40 blur-[130px] z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Technical architectural grid */}
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
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] text-zinc-200">
            {heroData.headlinePre}
          </span>
          <span className="mt-1.5 block text-3xl sm:text-5xl md:text-6xl lg:text-[4.55rem] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {heroData.headlineEmphasis}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-3.5xl font-sans text-base font-normal leading-relaxed text-zinc-400 sm:text-[18px]"
        >
          {heroData.subtitle}
        </motion.p>

        {/* Button-in-Button CTA Action Row */}
        <motion.div
          variants={itemVariants}
          className="mt-10 mb-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          {/* Primary CTA */}
          <a
            href="/dashboard"
            className="group relative flex h-14 w-full items-center justify-between gap-4 rounded-full bg-white pl-8 pr-3.5 font-sans text-[15px] font-semibold text-black shadow-[0_4px_24px_rgba(255,255,255,0.14)] transition-all duration-300 ease-premium hover:bg-neutral-100 hover:shadow-[inset_0_3px_8px_rgba(0,0,0,0.32),inset_0_-1px_2px_rgba(255,255,255,0.9)] active:scale-[0.98] active:shadow-[inset_0_5px_12px_rgba(0,0,0,0.45)] cursor-pointer sm:w-auto"
          >
            <span className="whitespace-nowrap tracking-tight">{heroData.ctaPrimaryLabel}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-black transition-all duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-black/15">
              <ArrowUpRight size={16} weight="bold" />
            </span>
          </a>

          {/* Secondary CTA */}
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

      {/* 3. The Hero Centerpiece: High-Fidelity AI Tutor App Mockup (Matching Image 2) */}
      <motion.div
        id="interactive-workbench"
        initial={reduceMotion ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE_PREMIUM }}
        className="relative z-10 mt-14 w-full max-w-[1040px]"
      >
        {/* Outer Frame Glow / Ambient Bezel */}
        <div className="relative rounded-[26px] sm:rounded-[30px] p-2 sm:p-2.5 border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_24px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          
          {/* Pristine App Window (Image 2 Architecture) */}
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white text-zinc-900 border border-zinc-200/80 shadow-2xl flex flex-col md:flex-row min-h-[590px]">
            
            {/* ── LEFT SIDEBAR (Desktop) ── */}
            <div className="hidden md:flex w-60 shrink-0 flex-col justify-between border-r border-zinc-200/70 bg-[#FAFAFA] p-4 text-left select-none">
              
              <div>
                {/* Brand Header */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-sm shadow-sm">
                    ✱
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[13px] font-bold tracking-tight text-zinc-900">AI Tutor</span>
                    <span className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Intelligent Learning
                    </span>
                  </div>
                </div>

                {/* + New Chat Button */}
                <button
                  type="button"
                  onClick={() => setActiveChatId('stokes')}
                  className="mt-6 sm:mt-8 flex w-full items-center justify-start gap-2 rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Plus size={16} weight="bold" />
                  <span>New Chat</span>
                </button>

                {/* Primary Navigation */}
                <nav className="mt-2.5 space-y-0.5 text-[12.5px] font-medium text-zinc-600">
                  <a href="#home" className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-zinc-900 hover:bg-zinc-200/60 transition-colors">
                    <House size={17} weight="bold" className="text-zinc-700" />
                    <span>Home</span>
                  </a>
                  <a href="#services" className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-zinc-200/60 transition-colors">
                    <Books size={17} weight="bold" className="text-zinc-500/80" />
                    <span>Subjects</span>
                  </a>
                  <a href="#about" className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-zinc-200/60 transition-colors">
                    <CheckCircle size={17} weight="bold" className="text-zinc-500/80" />
                    <span>Practice</span>
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-zinc-200/60 transition-colors">
                    <ChartLineUp size={17} weight="bold" className="text-zinc-500/80" />
                    <span>Progress</span>
                  </a>
                </nav>

                {/* Recent Conversations */}
                <div className="mt-5">
                  <div className="px-1 text-[11px] font-medium text-zinc-400">
                    Recent Conversations
                  </div>
                  <div className="mt-2 space-y-1">
                    {CONVERSATIONS.map((chat) => {
                      const isActive = chat.id === activeChatId;
                      return (
                        <button
                          key={chat.id}
                          type="button"
                          onClick={() => setActiveChatId(chat.id)}
                          className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors text-left ${
                            isActive
                              ? 'bg-zinc-200/80 font-semibold text-zinc-900'
                              : 'font-normal text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden pr-1">
                            <ChatCircleDots size={16} weight='regular' className={isActive ? 'text-zinc-900 shrink-0' : 'text-zinc-400 shrink-0'} />
                            <span className="truncate">{chat.title}</span>
                          </div>
                          {isActive && <DotsThree size={16} weight="bold" className="text-zinc-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom: Upgrade to Pro Card */}
              <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 shadow-sm border border-zinc-200/70 mb-2.5">
                  <Lightning size={16} weight="fill" />
                </div>
                <div className="font-semibold text-xs text-zinc-900">Upgrade to Pro</div>
                <p className="mt-0.5 text-[10px] text-zinc-500 leading-snug">
                  Unlock unlimited chats, advanced models and personalized plans.
                </p>
                <a
                  href="/dashboard"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-black py-1.5 px-3 text-[11px] font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors"
                >
                  <span>Upgrade Now</span>
                  <ArrowRight size={12} weight="bold" />
                </a>
              </div>

            </div>

            {/* ── RIGHT MAIN CHAT AREA ── */}
            <div className="flex flex-1 flex-col justify-between bg-white text-left">
              
              {/* Top Navigation & Breadcrumb Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/70 px-5 py-3.5 sm:px-6">
                
                {/* Left Breadcrumb */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
                    <Stack size={16} weight="bold" />
                  </div>
                  <span className="font-semibold text-zinc-900 ml-1">{currentChat.subject}</span>
                  <span className="text-zinc-400">›</span>
                  <span className="font-medium text-zinc-500">{currentChat.topic}</span>
                </div>

                {/* Right Utility Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Light Mode"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  >
                    <Sun size={18} weight="bold" />
                  </button>
                  <button
                    type="button"
                    title="Export"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  >
                    <Export size={17} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookmarked((v) => !v)}
                    title="Bookmark"
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      bookmarked ? 'text-black bg-zinc-100' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800'
                    }`}
                  >
                    <BookmarkSimple size={17} weight={bookmarked ? 'fill' : 'regular'} />
                  </button>
                  <button
                    type="button"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 transition-colors"
                  >
                    <span>Study Plan</span>
                    <Sparkle size={12} weight="fill" className="text-zinc-600" />
                  </button>
                </div>

              </div>

              {/* Chat Conversation Scroll Area */}
              <div className="space-y-5 p-5 sm:p-7 overflow-y-auto max-h-[520px]">
                
                {/* 1. Student Message */}
                <div className="flex items-start gap-3 text-left">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600">
                    <User size={15} weight="bold" />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-zinc-200/80 bg-zinc-100 px-3 py-1.5">
                    <p className="font-sans text-xs sm:text-[12.5px] font-medium leading-relaxed text-zinc-800">
                      {currentChat.userQuery}
                    </p>
                    <span className="shrink-0 text-[10.5px] text-zinc-500">
                      {currentChat.userTime}
                    </span>
                  </div>
                </div>

                {/* 2. AI Tutor Message */}
                <div className="space-y-3">
                  {/* Tutor Avatar & Identity Badge */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black text-white font-bold text-xs shadow-sm">
                      ✱
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-zinc-900">AI Tutor</span>
                    <span className="rounded-full bg-zinc-100 border border-zinc-200/80 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600">
                      Concept Explanation
                    </span>
                  </div>

                  {/* Intro Synthesis */}
                  <p className="pl-9 font-sans text-xs sm:text-[13px] leading-relaxed text-zinc-700">
                    {currentChat.introText}
                  </p>

                  {/* Two Side-by-Side Math/Concept Comparison Cards */}
                  <div className="pl-0 sm:pl-9 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    
                    {/* Card 1: 1D */}
                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:border-zinc-300 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 font-bold text-xs">
                          📈
                        </span>
                        <span className="font-semibold text-xs text-zinc-900">{currentChat.card1.title}</span>
                      </div>

                      {/* Formula Box */}
                      <div className="my-3 rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3 py-3.5 text-center">
                        {currentChat.card1.formula}
                      </div>

                      <p className="text-[11px] leading-snug text-zinc-500">
                        {currentChat.card1.description}
                      </p>
                    </div>

                    {/* Card 2: 3D */}
                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm hover:border-zinc-300 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                          <Stack size={15} weight="bold" />
                        </span>
                        <span className="font-semibold text-xs text-zinc-900">{currentChat.card2.title}</span>
                      </div>

                      {/* Formula Box */}
                      <div className="my-3 rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3 py-3.5 text-center">
                        {currentChat.card2.formula}
                      </div>

                      <p className="text-[11px] leading-snug text-zinc-500">
                        {currentChat.card2.description}
                      </p>
                    </div>

                  </div>

                  {/* Key Insight Callout Card */}
                  <div className="ml-0 sm:ml-9 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200/70 text-zinc-700">
                        <Lightbulb size={14} weight="bold" />
                      </span>
                      <span className="font-bold text-xs text-zinc-900">Key Insight</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-zinc-600 pl-8">
                      {currentChat.keyInsight}
                    </p>
                  </div>

                  {/* Tutor Feedback & Utility Row */}
                  <div className="pl-0 sm:pl-9 flex items-center gap-2.5 pt-1 text-zinc-400">
                    <button
                      type="button"
                      onClick={() => setLiked((v) => (v === 'up' ? null : 'up'))}
                      className={`flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 transition-colors ${
                        liked === 'up' ? 'text-black bg-zinc-100' : 'hover:text-zinc-800'
                      }`}
                      title="Good explanation"
                    >
                      <ThumbsUp size={16} weight={liked === 'up' ? 'fill' : 'regular'} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLiked((v) => (v === 'down' ? null : 'down'))}
                      className={`flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 transition-colors ${
                        liked === 'down' ? 'text-black bg-zinc-100' : 'hover:text-zinc-800'
                      }`}
                      title="Needs improvement"
                    >
                      <ThumbsDown size={16} weight={liked === 'down' ? 'fill' : 'regular'} />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                      title="Copy explanation"
                    >
                      {copied ? <Check size={16} className="text-black" /> : <Copy size={16} />}
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                      title="More options"
                    >
                      <DotsThree size={18} weight="bold" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Bottom Input Box (Ask a follow-up question...) */}
              <div className="p-4 sm:p-5 pt-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputVal.trim()) setInputVal('');
                  }}
                  className="relative flex items-center justify-between rounded-full border border-zinc-200/90 bg-white p-1.5 pl-3.5 shadow-sm transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-950/5"
                >
                  <button
                    type="button"
                    title="Add attachment"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
                  >
                    <Plus size={14} weight="bold" />
                  </button>

                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    className="w-full bg-transparent px-3 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 outline-none"
                  />

                  <button
                    type="submit"
                    title="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-zinc-800 active:scale-95 shadow-sm transition-all"
                  >
                    <PaperPlaneTilt size={15} weight="bold" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}