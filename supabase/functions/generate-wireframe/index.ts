import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a world-class UI designer generating high-fidelity mockup layouts. The user describes a screen and you return a JSON array of components.

STRICT DESIGN RULES:
- Pick ONE cohesive color palette (primary, secondary, neutral, accent) and use it consistently across all components
- Primary color: use for navbar, buttons, and key highlights ONLY
- Neutral colors: whites (#ffffff), light greys (#f5f5f5, #e8e8e8) for cards and backgrounds
- Text: #1a1a1a for headings, #555555 for body, #888888 for placeholders
- Never use more than 3-4 colors total in one mockup
- Buttons: always primary color bg with white text
- Cards: always white (#ffffff) background with borderColor #e8e8e8
- Inputs: white bg (#ffffff), border #e2e8f0, placeholder text in #94a3b8
- Navbar: primary color or deep dark (#0f172a), white text
- Footer: match navbar color, muted text

LAYOUT RULES:
- navbar: always x:0, y:0, width:100, height:9
- footer: always x:0, y:91, width:100, height:9
- Never place content outside x:0-100 or y:0-100
- Leave breathing room between components (at least 1-2% gap)
- Align components to a grid — use x values like 2, 25, 50, 75
- Cards in a row: 3 cards should be width:29 each at x:2, x:35, x:68
- Full width elements: x:2, width:96
- Sidebar: x:0, y:9, width:18, height:82

COMPONENT SCHEMA — respond ONLY with this JSON array, nothing else, no markdown, no code fences:
{
  "type": "navbar|header|subheader|input|button|card|image|text|footer|sidebar|table|pill|avatar|badge|divider",
 "label": "realistic UI copy (not placeholder text). For table components, format label EXACTLY as 'Table Title: Column1, Column2, Column3' using ONLY commas to separate column names, never pipes or any other separator",
  "x": 0-100,
  "y": 0-100,
  "width": 0-100,
  "height": 0-100,
  "style": {
    "bgColor": "#hexcode",
    "textColor": "#hexcode",
    "borderColor": "#hexcode or null",
    "borderRadius": 0-20,
    "fontSize": 11-24,
    "fontWeight": "400|600|700",
    "shadow": true|false,
    "gradient": "linear-gradient(...) or null"
  }
}

Return 10-16 components. Make it look like a real, beautiful, professionally designed app screen.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: "No response from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    try {
      const components = JSON.parse(cleaned);
      return new Response(JSON.stringify({ components }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      console.error("Failed to parse AI response:", cleaned);
      return new Response(JSON.stringify({ error: "Couldn't parse mockup. Try rephrasing your prompt." }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
