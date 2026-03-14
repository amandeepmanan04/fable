import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const ApiKeyModal = ({ open, onClose, onSaved }: Props) => {
  const [key, setKey] = useState("");

  useEffect(() => {
    if (open) {
      setKey(localStorage.getItem("gemini_api_key") || "");
    }
  }, [open]);

  if (!open) return null;

  const save = () => {
    localStorage.setItem("gemini_api_key", key);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(8,8,24,0.85)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="rounded-xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-4" style={{ backgroundColor: '#0d0d2b', border: '1px solid rgba(255,255,255,0.1)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Gemini API Key</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Paste your API key…"
          className="w-full rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none textarea-glow transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your key is stored locally and never sent anywhere except Google.
        </p>
        <button
          onClick={save}
          disabled={!key.trim()}
          className="w-full py-2.5 text-primary-foreground font-semibold text-sm rounded-lg hover:brightness-110 disabled:opacity-40 transition-all duration-150 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
        >
          <Check size={14} />
          Save Key
        </button>
      </div>
    </div>
  );
};
