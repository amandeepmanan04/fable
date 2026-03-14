import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { WireframeComponent } from "@/types/wireframe";
import { Navbar } from "@/components/Navbar";
import { WireframeCanvas } from "@/components/WireframeCanvas";
import { SkeletonCanvas } from "@/components/SkeletonCanvas";
import { PromptChips } from "@/components/PromptChips";
import { StarMascot } from "@/components/StarMascot";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, RotateCcw, Download, KeyRound, Check } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "A login page with logo, email input, password input, and sign in button",
  "A dashboard with sidebar nav, header, 3 stat cards, and a data table",
  "A mobile home screen with search bar, category pills, featured card, and product list",
];

const MAX_CHARS = 500;

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [components, setComponents] = useState<WireframeComponent[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setHasApiKey(!!localStorage.getItem("gemini_api_key"));
  }, []);

  const generate = useCallback(async (text?: string) => {
    const input = text ?? prompt;
    if (!input.trim()) {
      toast({ title: "Please enter a prompt", variant: "destructive" });
      return;
    }

    setLoading(true);
    setComponents([]);
    setHasGenerated(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-wireframe", {
        body: { prompt: input },
      });

      if (error) {
        toast({ title: "Generation failed", description: error.message, variant: "destructive" });
        return;
      }

      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
        return;
      }

      if (data?.components && Array.isArray(data.components)) {
        setComponents(data.components);
        toast({ title: "✅ Mockup generated!" });
      } else {
        toast({ title: "Couldn't parse mockup", description: "Try rephrasing your prompt.", variant: "destructive" });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to reach the server.";
      toast({ title: "API error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [prompt, toast]);

  const downloadSVG = useCallback(() => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fable-mockup.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden starfield">
      <Navbar />

      <div className="flex flex-1 min-h-0">
        {/* Left Panel */}
        <div className="w-80 lg:w-96 shrink-0 flex flex-col p-6 gap-5 overflow-y-auto hide-scrollbar" style={{ backgroundColor: '#0d0d2b', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Set API Key"
            >
              <KeyRound size={14} />
              {hasApiKey && <Check size={12} className="text-green-400" />}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label-accent">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Describe your UI... e.g. A login page with a logo, email input, password input, and a sign in button"
              className="w-full h-40 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none textarea-glow transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
            <span className="text-xs text-muted-foreground text-right">{prompt.length}/{MAX_CHARS}</span>
          </div>

          <button
            onClick={() => generate()}
            disabled={loading || !prompt.trim()}
            className="w-full py-3 text-primary-foreground font-semibold text-sm rounded-[10px] hover:-translate-y-px disabled:opacity-40 disabled:hover:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 generate-glow"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
          >
            <Sparkles size={16} />
            {loading ? "Generating…" : "Generate Mockup"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => generate()}
              disabled={loading || !prompt.trim()}
              className="flex-1 py-2.5 text-foreground text-sm rounded-lg disabled:opacity-40 transition-all duration-150 flex items-center justify-center gap-1.5 hover:text-primary"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <RotateCcw size={14} />
              Regenerate
            </button>
            <button
              onClick={downloadSVG}
              disabled={components.length === 0}
              className="flex-1 py-2.5 text-foreground text-sm rounded-lg disabled:opacity-40 transition-all duration-150 flex items-center justify-center gap-1.5 hover:text-primary"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Download size={14} />
              Download SVG
            </button>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

          <div className="mt-auto flex flex-col gap-3">
            <span className="label-accent">Examples</span>
            <PromptChips
              prompts={EXAMPLE_PROMPTS}
              onSelect={(p) => setPrompt(p)}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-4xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl" style={{ backgroundColor: '#0d0d2b', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[10px] text-muted-foreground">mockup preview</span>
            </div>
            {/* Canvas */}
            <div className={`aspect-[4/3] rounded-b-xl canvas-shadow overflow-hidden ${components.length > 0 ? '' : 'nebula-canvas'}`}
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {loading ? (
                <SkeletonCanvas />
              ) : components.length > 0 ? (
                <div className="w-full h-full animate-fade-in">
                  <WireframeCanvas components={components} svgRef={svgRef} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <StarMascot />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ApiKeyModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSaved={() => setHasApiKey(true)}
      />

      {/* Footer */}
      <footer className="h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: '#0d0d2b', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Built by The Diva Stack · Fable 2026</span>
      </footer>
    </div>
  );
};

export default Index;
