function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="65" r="58" fill="#1F5C4C" />
      <rect x="48" y="25" width="24" height="80" rx="6" fill="#FFFFFF" />
      <rect x="20" y="53" width="80" height="24" rx="6" fill="#FFFFFF" />
    </svg>
  );
}

export default Logo;
