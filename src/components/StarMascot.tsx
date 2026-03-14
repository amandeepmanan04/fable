export const StarMascot = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="animate-star-float">
        <svg viewBox="0 0 140 160" width="140" height="160">
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="starBody" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>

          <circle cx="70" cy="78" r="52" fill="url(#starGlow)" />

          <path d="
            M 70 28
            C 74 38, 86 38, 98 42
            C 90 52, 90 62, 96 74
            C 84 70, 74 74, 70 86
            C 66 74, 56 70, 44 74
            C 50 62, 50 52, 42 42
            C 54 38, 66 38, 70 28
            Z
          " fill="url(#starBody)" />

          <circle cx="52" cy="66" r="7" fill="#fca5a5" opacity="0.5" />
          <circle cx="88" cy="66" r="7" fill="#fca5a5" opacity="0.5" />

          <path d="M 57 58 Q 61 54 65 58" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 75 58 Q 79 54 83 58" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M 57 70 Q 70 82 83 70" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M 20 35 L 22 30 L 24 35 L 29 37 L 24 39 L 22 44 L 20 39 L 15 37 Z" fill="#fde68a" opacity="0.8" />
          <path d="M 108 25 L 110 21 L 112 25 L 116 27 L 112 29 L 110 33 L 108 29 L 104 27 Z" fill="#fde68a" opacity="0.9" />
          <path d="M 115 80 L 116 77 L 117 80 L 120 81 L 117 82 L 116 85 L 115 82 L 112 81 Z" fill="#fde68a" opacity="0.7" />
          <path d="M 18 95 L 19 92 L 20 95 L 23 96 L 20 97 L 19 100 L 18 97 L 15 96 Z" fill="#fde68a" opacity="0.6" />

          <circle cx="30" cy="60" r="1.5" fill="#fef9c3" opacity="0.8" />
          <circle cx="112" cy="55" r="1" fill="#fef9c3" opacity="0.7" />
          <circle cx="25" cy="110" r="1.5" fill="#fef9c3" opacity="0.6" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-base font-medium" style={{ color: '#fde047' }}>Your universe awaits.</p>
        <p className="text-muted-foreground text-[13px] mt-1">Describe any UI and Fable will bring it to life.</p>
      </div>
    </div>
  );
};
