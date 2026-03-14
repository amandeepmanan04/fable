import { WireframeComponent } from "@/types/wireframe";

interface Props {
  component: WireframeComponent;
  canvasWidth: number;
  canvasHeight: number;
  index: number;
  accentColor?: string;
}

const FONT = "Inter, system-ui, sans-serif";

export const WireframeElement = ({ component, canvasWidth, canvasHeight, index, accentColor = "#0f172a" }: Props) => {
  const x = (component.x / 100) * canvasWidth;
  const y = (component.y / 100) * canvasHeight;
  const w = (component.width / 100) * canvasWidth;
  const h = (component.height / 100) * canvasHeight;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const { type, label, style } = component;

  const bg = style?.bgColor || "#f0f0f0";
  const textColor = style?.textColor || "#333";
  const borderColor = style?.borderColor || undefined;
  const rx = style?.borderRadius ?? 8;
  const fontSize = style?.fontSize || 13;
  const fontWeight = style?.fontWeight || "400";
  const hasShadow = style?.shadow || false;
  const gradientStr = style?.gradient || null;
  const gradId = `grad_${index}`;
  const clipId = `clip_${index}`;
  const btnGradId = `btngrad_${index}`;
  const shadowFilter = hasShadow ? "url(#shadow)" : undefined;
  const fill = gradientStr ? `url(#${gradId})` : bg;

  const renderInner = () => {
    switch (type) {
      case "navbar":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill={fill} rx={0} filter={shadowFilter} />
            <text
              x={x + 16}
              y={cy}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight="700"
              fontFamily={FONT}
            >
              {label}
            </text>
            {[0.82, 0.88, 0.94].map((frac) => (
              <circle key={frac} cx={x + w * frac} cy={cy} r={2.5} fill={textColor} opacity={0.35} />
            ))}
          </>
        );

      case "header":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill="transparent" />
            <text
              x={x + 4}
              y={cy}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "subheader":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill="transparent" />
            <text
              x={x + 4}
              y={cy}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "input":
        return (
          <>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={bg}
              stroke={borderColor || "#e2e8f0"}
              strokeWidth={1.5}
              rx={rx}
              filter={shadowFilter}
            />
            <text
              x={x + 12}
              y={cy}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontFamily={FONT}
              opacity={0.6}
            >
              {label}
            </text>
            <line
              x1={x + 8}
              y1={y + h * 0.75}
              x2={x + w - 8}
              y2={y + h * 0.75}
              stroke={borderColor || "#e2e8f0"}
              strokeWidth={0.75}
              opacity={0.5}
            />
          </>
        );

      case "button":
        return (
          <>
            <defs>
              <linearGradient id={btnGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <rect x={x} y={y} width={w} height={h} fill={fill} rx={rx} filter={shadowFilter} />
            <rect x={x} y={y} width={w} height={h} fill={`url(#${btnGradId})`} rx={rx} />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight="600"
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "card":
        return (
          <>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="#ffffff"
              stroke={borderColor || "#e8e8e8"}
              strokeWidth={1}
              rx={rx}
              filter={shadowFilter || "url(#shadow)"}
            />
            <text
              x={x + 14}
              y={y + 22}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight="600"
              fontFamily={FONT}
            >
              {label}
            </text>
            <line x1={x + 14} y1={y + h * 0.55} x2={x + w - 14} y2={y + h * 0.55} stroke="#e8e8e8" strokeWidth={1} />
            <line x1={x + 14} y1={y + h * 0.72} x2={x + w * 0.6} y2={y + h * 0.72} stroke="#e8e8e8" strokeWidth={1} />
          </>
        );

      case "image": {
        const imgGradId = `imgrad_${index}`;
        return (
          <>
            <defs>
              <linearGradient id={imgGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </linearGradient>
            </defs>
            <rect x={x} y={y} width={w} height={h} fill={`url(#${imgGradId})`} rx={rx} filter={shadowFilter} />
            <path
              d={`M${cx - 14},${cy + 4} L${cx - 6},${cy - 8} L${cx},${cy - 2} L${cx + 6},${cy - 12} L${cx + 14},${cy + 4} Z`}
              fill="#bbb"
              opacity={0.6}
            />
            <circle cx={cx + 8} cy={cy - 14} r={3} fill="#ccc" opacity={0.7} />
            {label && (
              <text
                x={cx}
                y={y + h - 10}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#999"
                fontSize={10}
                fontFamily={FONT}
              >
                {label}
              </text>
            )}
          </>
        );
      }

      case "text":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill="transparent" />
            <text
              x={x + 2}
              y={cy}
              dominantBaseline="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "footer":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill={fill} rx={0} />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize || 11}
              fontFamily={FONT}
              opacity={0.7}
            >
              {label}
            </text>
          </>
        );

      case "sidebar": {
        const navItemH = h * 0.11;
        const navGap = 4;
        const labelY = y + 20;
        const itemStartY = labelY + 18;
        const iconSize = navItemH * 0.6;
        const iconX = x + 12;
        const labelRectX = iconX + iconSize + 6;
        const labelRectW = w * 0.5;
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill="#1e1e2e" rx={0} />
            <text
              x={x + 12}
              y={labelY}
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize={13}
              fontWeight="700"
              fontFamily={FONT}
            >
              {label}
            </text>
            {[0, 1, 2, 3].map((i) => {
              const iy = itemStartY + i * (navItemH + navGap);
              const isActive = i === 0;
              return (
                <g key={i}>
                  {isActive && (
                    <>
                      <rect x={x} y={iy} width={w} height={navItemH} fill="rgba(124,58,237,0.19)" rx={0} />
                      <rect x={x} y={iy} width={3} height={navItemH} fill="#a78bfa" rx={0} />
                    </>
                  )}
                  <rect
                    x={iconX}
                    y={iy + (navItemH - iconSize) / 2}
                    width={iconSize}
                    height={iconSize}
                    rx={3}
                    fill="rgba(255,255,255,0.15)"
                  />
                  <rect
                    x={labelRectX}
                    y={iy + (navItemH - iconSize * 0.55) / 2}
                    width={labelRectW}
                    height={iconSize * 0.55}
                    rx={3}
                    fill="rgba(255,255,255,0.1)"
                  />
                </g>
              );
            })}
          </>
        );
      }

      case "table": {
        const colonIndex = label.indexOf(":");
        const tableTitle = colonIndex > -1 ? label.substring(0, colonIndex).trim() : label;
        const columnString = colonIndex > -1 ? label.substring(colonIndex + 1).trim() : "";
        const columns = columnString
          ? columnString
              .split(/[,|]/)
              .map((c) => c.trim())
              .filter(Boolean)
          : ["Name", "Amount", "Status"];
        const colCount = columns.length;
        const colWidth = w / colCount;
        const headerH = h * 0.25;
        const bodyY = y + headerH;
        const bodyH = h - headerH;
        const rowH = bodyH / 3;
        const tableClipId = `tableclip_${index}`;
        const statusColors = [
  { bg: "#dcfce7", text: "#16a34a", label: "Active" },
  { bg: "#fff7ed", text: "#ea580c", label: "Pending" },
  { bg: "#eff6ff", text: "#2563eb", label: "Completed" },
  { bg: "#f3e8ff", text: "#7c3aed", label: "Review" },
];
        return (
          <>
            <text
              x={x + w / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize={11}
              fontWeight="600"
              fill={textColor}
              fontFamily={FONT}
            >
              {tableTitle}
            </text>
            <defs>
              <clipPath id={tableClipId}>
                <rect x={x} y={y} width={w} height={h} rx={6} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${tableClipId})`}>
              <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke="#e2e8f0" strokeWidth={1} rx={6} />

              <rect x={x} y={y} width={w} height={headerH} fill="#1e1e2e" rx={6} />
              {columns.map((col, i) => (
                <g key={i}>
                  <text
                    x={x + i * colWidth + colWidth / 2}
                    y={y + headerH / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="600"
                    fill="#ffffff"
                    fontFamily={FONT}
                  >
                    {col}
                  </text>
                  {i > 0 && (
                    <line
                      x1={x + i * colWidth}
                      y1={y}
                      x2={x + i * colWidth}
                      y2={y + headerH}
                      stroke="#ffffff30"
                      strokeWidth={1}
                    />
                  )}
                </g>
              ))}

              {[0, 1, 2].map((row) => {
                const rowY = bodyY + row * rowH;
                const isEven = row % 2 === 0;
                const status = statusColors[row];

                return (
                  <g key={row}>
                    <rect x={x} y={rowY} width={w} height={rowH} fill={isEven ? "#ffffff" : "#f8fafc"} />
                    <line x1={x} y1={rowY} x2={x + w} y2={rowY} stroke="#e2e8f0" strokeWidth={1} />

                    {columns.map((_, i) =>
                      i > 0 ? (
                        <line
                          key={i}
                          x1={x + i * colWidth}
                          y1={rowY}
                          x2={x + i * colWidth}
                          y2={rowY + rowH}
                          stroke="#e2e8f0"
                          strokeWidth={1}
                        />
                      ) : null,
                    )}

                    {columns.slice(0, -1).map((_, i) => (
                      <rect
                        key={i}
                        x={x + i * colWidth + 8}
                        y={rowY + rowH * 0.3}
                        width={colWidth * 0.65}
                        height={rowH * 0.35}
                        fill="#d1d5db"
                        rx={3}
                      />
                    ))}

                    <rect
                      x={x + (colCount - 1) * colWidth + 6}
                      y={rowY + rowH * 0.2}
                      width={colWidth - 12}
                      height={rowH * 0.55}
                      fill={status.bg}
                      rx={8}
                    />
                    <text
                      x={x + (colCount - 1) * colWidth + colWidth / 2}
                      y={rowY + rowH / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9}
                      fontWeight="600"
                      fill={status.text}
                      fontFamily={FONT}
                    >
                      {status.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </>
        );
      }

      case "pill":
        return (
          <>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={fill}
              stroke={borderColor || "none"}
              strokeWidth={borderColor ? 1 : 0}
              rx={h / 2}
            />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize || 11}
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "avatar": {
        const r = Math.min(w, h) / 2;
        const initials = label
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return (
          <>
            <circle cx={cx} cy={cy} r={r} fill={fill} filter={shadowFilter} />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize}
              fontWeight="600"
              fontFamily={FONT}
            >
              {initials}
            </text>
          </>
        );
      }

      case "badge":
        return (
          <>
            <rect x={x} y={y} width={w} height={h} fill={fill} rx={h / 2} />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize || 10}
              fontWeight="600"
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );

      case "divider":
        return (
          <line x1={x + 4} y1={cy} x2={x + w - 4} y2={cy} stroke={bg !== "#f0f0f0" ? bg : "#e8e8e8"} strokeWidth={1} />
        );

      default:
        return (
          <>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={fill}
              stroke={borderColor || "#e8e8e8"}
              strokeWidth={1}
              rx={rx}
              filter={shadowFilter}
            />
            <text
              x={cx}
              y={cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={textColor}
              fontSize={fontSize}
              fontFamily={FONT}
            >
              {label}
            </text>
          </>
        );
    }
  };

  return (
    <g className="animate-wire-pop" style={{ animationDelay: `${index * 40}ms` }}>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={w} height={h} rx={type === "table" || type === "card" ? rx : 0} />
        </clipPath>
      </defs>
      {type === "table" ? renderInner() : <g clipPath={`url(#${clipId})`}>{renderInner()}</g>}
    </g>
  );
};
