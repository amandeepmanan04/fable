export const PencilMascot = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="animate-float">
        <svg width="80" height="140" viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Eraser top */}
          <rect x="22" y="8" width="36" height="18" rx="4" fill="#999" />
          <rect x="22" y="20" width="36" height="4" fill="#888" />
          
          {/* Pencil body */}
          <rect x="22" y="24" width="36" height="80" rx="2" fill="#FFD93D" />
          <rect x="22" y="24" width="36" height="80" rx="2" stroke="#E6C235" strokeWidth="1" />
          
          {/* Stripe on body */}
          <rect x="22" y="84" width="36" height="8" fill="#F0C830" />
          
          {/* Pencil tip */}
          <polygon points="22,104 58,104 40,132" fill="#FFD93D" stroke="#E6C235" strokeWidth="1" />
          <polygon points="34,118 46,118 40,132" fill="#2d2d2d" />
          <polygon points="38,126 42,126 40,132" fill="#1a1a1a" />

          {/* Eyes */}
          <circle cx="34" cy="52" r="3" fill="#2d2d2d" />
          <circle cx="46" cy="52" r="3" fill="#2d2d2d" />
          <circle cx="35" cy="51" r="1" fill="#fff" />
          <circle cx="47" cy="51" r="1" fill="#fff" />
          
          {/* Smile */}
          <path d="M 34 62 Q 40 68 46 62" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Left arm */}
          <line x1="22" y1="58" x2="10" y2="44" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="44" x2="6" y2="40" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="44" x2="12" y2="38" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />

          {/* Right arm */}
          <line x1="58" y1="58" x2="70" y2="44" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="44" x2="74" y2="40" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
          <line x1="70" y1="44" x2="68" y2="38" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-wire-text text-base font-medium">Ready to sketch!</p>
        <p className="text-wire-text/60 text-[13px] mt-1">Describe your UI and I'll wireframe it instantly.</p>
      </div>
    </div>
  );
};
