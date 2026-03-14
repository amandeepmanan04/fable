import { ArrowRight } from "lucide-react";

interface Props {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export const PromptChips = ({ prompts, onSelect }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {prompts.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="flex items-center justify-between gap-2 text-xs text-muted-foreground px-3.5 py-2.5 rounded-lg text-left leading-snug group transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#a78bfa';
            e.currentTarget.style.background = 'rgba(167,139,250,0.08)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.color = '';
          }}
        >
          <span>{p}</span>
          <ArrowRight size={12} className="shrink-0 opacity-0 group-hover:opacity-100 text-primary transition-opacity duration-150" />
        </button>
      ))}
    </div>
  );
};
