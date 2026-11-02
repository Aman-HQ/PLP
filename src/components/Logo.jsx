// Anubhuti Dental Studio — tooth monogram mark.
// Minimal geometric tooth glyph rendered inline so it inherits currentColor
// and stays crisp at any size. Paired with a hairline ring for a machined feel.
export default function Logo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Enclosing hairline ring */}
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      {/* Tooth silhouette */}
      <path
        d="M50 24c-9.5 0-16 4.7-19.4 8.2-2.4 2.5-3.6 5.9-3.3 9.3.5 5.8 2.2 11 4 16.4 1.2 3.6 2 8.2 2.7 12.4.6 3.6 1.2 6.9 3.6 6.9 2.9 0 3.6-4.6 4.6-9.3.9-4.2 1.9-8 4.2-8s3.3 3.8 4.2 8c1 4.7 1.7 9.3 4.6 9.3 2.4 0 3-3.3 3.6-6.9.7-4.2 1.5-8.8 2.7-12.4 1.8-5.4 3.5-10.6 4-16.4.3-3.4-.9-6.8-3.3-9.3C66 28.7 59.5 24 50 24Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Enamel shine accent */}
      <path
        d="M40 34c2.5-2 6-3.2 9.5-3.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
    </svg>
  );
}
