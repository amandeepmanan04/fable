export const SkeletonCanvas = () => {
  const shapes = [
    { x: 0, y: 0, w: 800, h: 54 },
    { x: 24, y: 74, w: 280, h: 24 },
    { x: 24, y: 114, w: 752, h: 160 },
    { x: 24, y: 294, w: 240, h: 100 },
    { x: 280, y: 294, w: 240, h: 100 },
    { x: 536, y: 294, w: 240, h: 100 },
    { x: 24, y: 414, w: 752, h: 130 },
    { x: 0, y: 546, w: 800, h: 54 },
  ];

  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0e0e0">
            <animate attributeName="stop-color" values="#e0e0e0;#f0f0f0;#e0e0e0" dur="1.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#f0f0f0">
            <animate attributeName="stop-color" values="#f0f0f0;#e8e8e8;#f0f0f0" dur="1.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#e0e0e0">
            <animate attributeName="stop-color" values="#e0e0e0;#f0f0f0;#e0e0e0" dur="1.5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="#f9f9f9" />
      {shapes.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx={i === 0 || i === 7 ? 0 : 8}
          fill="url(#shimmer)"
          opacity={0.8}
        >
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <text x="400" y="575" textAnchor="middle" fill="#999" fontSize="13" fontStyle="italic" fontFamily="Inter, sans-serif">
        Generating your mockup...
      </text>
    </svg>
  );
};
