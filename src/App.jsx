import { useState } from "react";

const C = {
  bg: "#0f1117",
  surface: "#181c27",
  card: "#1e2335",
  border: "#2a3050",
  gold: "#c9a84c",
  goldLight: "#e8c97a",
  goldMuted: "#8a6e2f",
  text: "#f0ead6",
  muted: "#8b8fa8",
  error: "#e05555",
  green: "#4caf7a",
};

const OBJETIVOS = [
  { value: "educar",      label: "Educar / Informar" },
  { value: "captar",      label: "Captar leads" },
  { value: "autoridade",  label: "Mostrar autoridade" },
  { value: "dor",         label: "Falar da dor do cliente" },
];

const OBJ_TEXTO = {
  educar:     "educar o público explicando o tema de forma clara",
  captar:     "captar leads para uma consultoria ou análise gratuita",
  autoridade: "mostrar autoridade e expertise da profissional",
  dor:        "tocar na dor do cliente que não conhece seus direitos",
};

const TIPO_EMOJI = { capa: "🖼", conteudo: "📖", destaque: "⭐", cta: "🎯" };

// ---------- Slide visual ----------
function SlideCard({ slide }) {
  const wrap = {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${C.border}`,
    position: "relative",
    fontFamily: "'DM Serif Display', Georgia, serif",
  };

  if (slide.tipo === "capa") return (
    <div style={{ ...wrap, background: "linear-gradient(145deg,#1a1f35,#0f1117)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 18 }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 170, height: 170, background: "radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%)", borderRadius: "50%" }} />
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: C.gold, background: "rgba(201,168,76,0.12)", border: `1px solid rgba(201,168,76,0.3)`, padding: "3px 9px", borderRadius: 20, display: "inline-block", marginBottom: 10, width: "fit-content" }}>
        Regularização de Imóveis
      </span>
      <div style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.25, color: C.text, marginBottom: 12 }}>{slide.titular}</div>
      <div style={{ fontSize: 10, color: C.muted, display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans',sans-serif" }}>
        <span style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%", display: "inline-block" }} />
        Especialista em Redução de INSS
      </div>
    </div>
  );

  if (slide.tipo === "cta") return (
    <div style={{ ...wrap, background: "linear-gradient(145deg,#1a2535,#0f1820)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 18, gap: 8 }}>
      <div style={{ width: 40, height: 40, background: `linear-gradient(135deg,${C.gold},${C.goldMuted})`, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏛️</div>
      <div style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.3, color: C.text }}>{slide.titular}</div>
      <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif" }}>{slide.corpo}</div>
      <div style={{ background: C.gold, color: "#0f1117", borderRadius: 20, padding: "5px 14px", fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>Fale Comigo no Instagram</div>
    </div>
  );

  return (
    <div style={{ ...wrap, background: C.surface, display: "flex", flexDirection: "column", padding: 16, position: "relative" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.goldMuted},${C.gold},${C.goldMuted})` }} />
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: C.goldMuted, marginBottom: 8, fontFamily: "'DM Sans',sans-serif" }}>
        {slide.numero} · {slide.tipo === "destaque" ? "DESTAQUE" : "CONTEÚDO"}
      </div>
      <div style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.3, color: C.text, marginBottom: 8, flex: 1 }}>{slide.titular}</div>
      <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif" }}>{slide.corpo}</div>
      {slide.destaque && (
        <div style={{ background: "rgba(201,168,76,0.08)", borderLeft: `2px solid ${C.gold}`, padding: "6px 10px", borderRadius: "0 6px 6px 0", fontSize: 10, fontWeight: 500, color: C.goldLight, marginTop: 8, fontFamily: "'DM Sans',sans-serif" }}>
          {slide.destaque}
        </div>
      )}
    </div>
  );
}

// ---------- App ----------
export default function App() {
  const [apiKey, setApiKey]     = useState(() => localStorage.getItem("anthro_key") || "");
  const [showKey, setShowKey]   = useState(false);
  const [tema, setTema]         = useState("");
  const [objetivo, setObjetivo] = useState("educar");
  const [qtd, setQtd]           = useState("7");
  const [loading, setLoading]   = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro]         = useState("");
  const [copiado, setCopiaodo]  = useState("");

  function salvarKey(val) {
    setApiKey(val);
    localStorage.setItem("anthro_key", val);
  }

  async function gerar() {
    if (!apiKey.trim()) { setErro("Cole sua chave de API da Anthropic acima para continuar."); return; }
    if (!tema.trim())   { setErro("Digite um tema para gerar o carrossel!"); return; }
    setErro(""); setLoading(true); setResultado(null);

    const prompt = `Crie um carrossel de Instagram com ${qtd} slides sobre: "${tema}".
Objetivo: ${OBJ_TEXTO[objetivo]}.
Nicho: Regularização de imóveis, redução de INSS em obras.

Retorne SOMENTE um JSON válido, sem markdown, sem texto extra:
{
  "titulo": "Título chamativo (máx 60 chars)",
  "slides": [
    { "numero": 1, "tipo": "capa", "titular": "frase impacto (máx 50 chars)", "corpo": "texto (máx 120 chars)", "destaque": null }
  ],
  "legenda": "Legenda Instagram com gancho e CTA (máx 300 chars)",
  "hashtags": ["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8"]
}
Regras: slide 1 = capa, último = cta, intermediários = conteudo ou destaque. Sem # nas hashtags.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: "Você é especialista em marketing para Instagram no nicho de regularização de imóveis e redução de INSS em obras. Responda APENAS com JSON válido, sem markdown, sem texto antes ou depois.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw   = data.content.map(i => i.text || "").join("");
      const clean = raw.replace(/```json|```/g, "").trim();
      setResultado(JSON.parse(clean));
    } catch (e) {
      setErro("Erro: " + (e.message || "Tente novamente."));
    } finally {
      setLoading(false);
    }
  }

  function copiar(texto, key) {
    navigator.clipboard.writeText(texto).catch(() => {});
    setCopiaodo(key);
    setTimeout(() => setCopiaodo(""), 2200);
  }

  // ---- styles helpers ----
  const card  = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 14 };
  const label = { fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, marginBottom: 12, display: "block" };
  const inp   = { width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontSize: "0.88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box" };
  const sel   = { ...inp, appearance: "auto" };
  const btnCopy = (key) => ({ background: "transparent", border: `1px solid ${C.border}`, color: copiado === key ? C.green : C.muted, borderRadius: 7, padding: "7px 14px", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginTop: 10, transition: "color 0.2s" });

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* Header */}
      <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: `linear-gradient(135deg,${C.gold},${C.goldMuted})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏛️</div>
        <div>
          <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.05rem" }}>Gerador de Carrossel</div>
          <div style={{ fontSize: "0.68rem", color: C.muted, marginTop: 1 }}>Regularização de Imóveis · Redução de INSS</div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px 80px" }}>

        {/* API Key */}
        <div style={{ ...card, borderColor: apiKey ? C.border : "rgba(201,168,76,0.4)" }}>
          <span style={label}>🔑 Chave de API (Anthropic)</span>
          <div style={{ position: "relative" }}>
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={e => salvarKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              style={{ ...inp, paddingRight: 44 }}
            />
            <button onClick={() => setShowKey(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>
              {showKey ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={{ fontSize: "0.7rem", color: C.muted, marginTop: 8, lineHeight: 1.5 }}>
            Obtenha sua chave em <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" style={{ color: C.goldLight }}>console.anthropic.com</a>. Ela fica salva só no seu navegador.
          </div>
        </div>

        {/* Formulário */}
        <div style={card}>
          <span style={label}>✦ Novo Carrossel</span>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", color: C.muted, marginBottom: 5 }}>Tema do post</div>
            <input
              value={tema}
              onChange={e => setTema(e.target.value)}
              onKeyDown={e => e.key === "Enter" && gerar()}
              placeholder="Ex: Como reduzir 30% do INSS na sua obra..."
              style={inp}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: C.muted, marginBottom: 5 }}>Objetivo</div>
              <select value={objetivo} onChange={e => setObjetivo(e.target.value)} style={sel}>
                {OBJETIVOS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: C.muted, marginBottom: 5 }}>Slides</div>
              <select value={qtd} onChange={e => setQtd(e.target.value)} style={sel}>
                {["5","7","9"].map(n => <option key={n} value={n}>{n} slides</option>)}
              </select>
            </div>
          </div>

          {erro && <div style={{ color: C.error, fontSize: "0.78rem", marginBottom: 10, lineHeight: 1.5 }}>{erro}</div>}

          <button
            onClick={gerar}
            disabled={loading}
            style={{ width: "100%", background: loading ? C.border : `linear-gradient(135deg,${C.gold},${C.goldMuted})`, color: loading ? C.muted : "#0f1117", border: "none", borderRadius: 10, padding: "13px", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
          >
            {loading ? "⟳ Gerando..." : "Gerar Carrossel ✦"}
          </button>
        </div>

        {/* Resultado */}
        {resultado && (
          <div>
            {/* Título + reset */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.1rem" }}>{resultado.titulo}</div>
              <button onClick={() => { setResultado(null); setTema(""); }} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "6px 12px", fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit" }}>
                ← Novo
              </button>
            </div>

            {/* Preview slides */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ ...label, display: "block", marginBottom: 10 }}>Preview Visual</span>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
                {resultado.slides.map((s, i) => (
                  <div key={i} style={{ width: 150, flexShrink: 0 }}>
                    <SlideCard slide={s} />
                    <div style={{ fontSize: 10, color: C.muted, textAlign: "center", marginTop: 5 }}>
                      {TIPO_EMOJI[s.tipo]} {s.tipo}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roteiro */}
            <div style={card}>
              <span style={label}>Roteiro Completo</span>
              {resultado.slides.map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>Slide {s.numero}</span>
                    <span style={{ fontSize: "0.62rem", color: C.muted, fontStyle: "italic" }}>{TIPO_EMOJI[s.tipo]} {s.tipo}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: C.text, marginBottom: 3 }}>{s.titular}</div>
                  <div style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.6 }}>{s.corpo}</div>
                  {s.destaque && <div style={{ fontSize: "0.74rem", color: C.goldLight, marginTop: 5 }}>→ {s.destaque}</div>}
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div style={card}>
              <span style={label}>Legenda para o Post</span>
              <div style={{ fontSize: "0.84rem", color: C.muted, lineHeight: 1.75 }}>{resultado.legenda}</div>
              <button onClick={() => copiar(resultado.legenda, "legenda")} style={btnCopy("legenda")}>
                {copiado === "legenda" ? "✓ Copiado!" : "Copiar legenda"}
              </button>
            </div>

            {/* Hashtags */}
            <div style={card}>
              <span style={label}>Hashtags</span>
              <div style={{ marginBottom: 10 }}>
                {resultado.hashtags.map((h, i) => (
                  <span key={i} style={{ display: "inline-block", background: "rgba(201,168,76,0.09)", border: `1px solid rgba(201,168,76,0.2)`, color: C.goldLight, borderRadius: 20, padding: "3px 9px", fontSize: "0.72rem", margin: "2px" }}>
                    #{h}
                  </span>
                ))}
              </div>
              <button onClick={() => copiar(resultado.hashtags.map(h => "#" + h).join(" "), "tags")} style={btnCopy("tags")}>
                {copiado === "tags" ? "✓ Copiadas!" : "Copiar hashtags"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
