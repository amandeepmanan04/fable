export interface WireframeStyle {
  bgColor?: string;
  textColor?: string;
  borderColor?: string | null;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: "400" | "600" | "700" | "normal";
  shadow?: boolean;
  gradient?: string | null;
}

export interface WireframeComponent {
  type: "navbar" | "header" | "subheader" | "input" | "button" | "card" | "image" | "text" | "footer" | "sidebar" | "table" | "pill" | "avatar" | "badge" | "divider";
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: WireframeStyle;
}
