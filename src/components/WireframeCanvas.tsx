import { WireframeComponent } from "@/types/wireframe";
import { WireframeElement } from "./WireframeElement";

interface Props {
  components: WireframeComponent[];
  svgRef: React.RefObject<SVGSVGElement>;
}

const CANVAS_W = 800;
const CANVAS_H = 600;

function parseGradientStops(gradient: string): { offset: string; color: string }[] {
  const hexMatches = gradient.match(/#[0-9a-fA-F]{3,8}/g);
  if (hexMatches && hexMatches.length >= 2) {
    return hexMatches.map((c, i) => ({
      offset: `${(i / (hexMatches.length - 1)) * 100}%`,
      color: c,
    }));
  }
  return [];
}

export const WireframeCanvas = ({ components, svgRef }: Props) => {
  const navbar = components.find((c) => c.type === "navbar");
  const accentColor = navbar?.style?.bgColor || "#0f172a";
  const gradients = components
    .map((c, i) => ({ index: i, gradient: c.style?.gradient }))
    .filter((g) => g.gradient);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#0000000d" />
        </filter>
        {gradients.map(({ index, gradient }) => {
          const stops = parseGradientStops(gradient!);
          if (stops.length < 2) return null;
          return (
            <linearGradient key={index} id={`grad_${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {stops.map((s, si) => (
                <stop key={si} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          );
        })}
      </defs>

      <rect width={CANVAS_W} height={CANVAS_H} fill="#f8fafc" rx={4} />

      {components.map((comp, i) => (
        <WireframeElement
          key={`${comp.type}-${i}`}
          component={comp}
          canvasWidth={CANVAS_W}
          canvasHeight={CANVAS_H}
          index={i}
          accentColor={accentColor}
        />
      ))}
    </svg>
  );
};
