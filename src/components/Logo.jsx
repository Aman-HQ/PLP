// AI Tutor brand logo mark
export default function Logo({ className = 'w-8 h-8' }) {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-label="AI Tutor Logo"
      >
        <path d="M12 2v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="M12 18v4" />
        <path d="m19.07 19.07-2.83-2.83" />
        <path d="M20 12h-4" />
        <path d="m19.07 4.93-2.83 2.83" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
      </svg>
    </div>
  );
}
