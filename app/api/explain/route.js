/**
 * POST /api/explain  — turns a calculation result into a plain-language
 * explanation via Claude. Runs server-side so the API key stays secret.
 *
 * Body: { calculation: object, kind: "iva"|"autonomo"|"salario", language: "nl"|"es"|"en" }
 */
export const runtime = "nodejs";

const LANG = { nl: "Nederlands", es: "español", en: "English" };

export async function POST(req) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ error: "AI explainer not configured (no API key)." }, { status: 503 });
  }
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  const { calculation, kind = "cálculo", language = "es" } = body || {};
  const lang = LANG[language] || "español";

  const prompt =
`Eres un asesor fiscal en España. Explica este ${kind} en ${lang}, de forma breve y clara para alguien sin conocimientos fiscales.
Usa los números exactos del cálculo, explica qué significan, y termina con una frase recordando que es una estimación orientativa, no un cálculo oficial.
No inventes cifras que no estén en los datos. Máximo ~120 palabras.

Datos del cálculo:
${JSON.stringify(calculation, null, 2)}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400, // capped to keep cost negligible on a public demo
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return Response.json({ error: "Upstream error", detail: t.slice(0, 300) }, { status: 502 });
    }
    const data = await r.json();
    const text = (data.content || []).map((b) => b.text || "").join("").trim();
    return Response.json({ explanation: text });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
