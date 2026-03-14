export const PlanetMascot = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="animate-planet-float">
        <svg viewBox="0 0 120 140" width="120" height="140">
          {/* Ring behind */}
          <ellipse cx="60" cy="72" rx="52" ry="12" fill="none" stroke="#c084fc" strokeWidth="3.5" opacity="0.5" />

          {/* Planet */}
          <defs>
            <radialGradient id="planetGrad" cx="40%" cy="38%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="55%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6d28d9" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="65" r="38" fill="url(#planetGrad)" />

          {/* Atmosphere bands */}
          <ellipse cx="60" cy="56" rx="30" ry="6" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="60" cy="72" rx="27" ry="5" fill="rgba(255,255,255,0.04)" />

          {/* Happy squint eyes */}
          <path d="M 46 60 Q 50 56 54 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 66 60 Q 70 56 74 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Rosy cheeks */}
          <circle cx="43" cy="67" r="5" fill="#f9a8d4" opacity="0.4" />
          <circle cx="77" cy="67" r="5" fill="#f9a8d4" opacity="0.4" />

          {/* Big happy smile */}
          <path d="M 46 70 Q 60 82 74 70" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Ring in front */}
          <ellipse cx="60" cy="72" rx="52" ry="12" fill="none" stroke="#c084fc" strokeWidth="3.5" opacity="0.5"
            strokeDasharray="90 200" strokeDashoffset="-45" />

          {/* Sparkle stars */}
          {/* 4-point star top-right */}
          <path d="M 102 25 L 104 20 L 106 25 L 111 27 L 106 29 L 104 34 L 102 29 L 97 27 Z" fill="#f0abfc" opacity="0.8" />
          {/* 4-point star top-left */}
          <path d="M 16 32 L 17.5 28 L 19 32 L 23 33.5 L 19 35 L 17.5 39 L 16 35 L 12 33.5 Z" fill="#e879f9" opacity="0.7" />
          {/* Small 4-point star */}
          <path d="M 105 88 L 106 85 L 107 88 L 110 89 L 107 90 L 106 93 L 105 90 L 102 89 Z" fill="#f0abfc" opacity="0.6" />

          {/* Tiny dot stars */}
          <circle cx="10" cy="18" r="1.2" fill="white" opacity="0.5" />
          <circle cx="112" cy="55" r="1" fill="white" opacity="0.4" />
          <circle cx="8" cy="95" r="1.5" fill="#e879f9" opacity="0.4" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-primary text-base font-medium">Your universe awaits.</p>
        <p className="text-muted-foreground text-[13px] mt-1">Describe any UI and Fable will bring it to life.</p>
      </div>
    </div>
  );
};
