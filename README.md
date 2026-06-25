# Calculadora Fiscal ES + AI 🇪🇸

A polished Spanish tax calculator (IVA, autónomo quarterly payment, gross→net salary) with an **"explain in plain language" button** powered by Claude — in Dutch, Spanish or English.

**▶ Live demo:** _add your Vercel URL here_

## What it does

- **IVA** — base + rate → cuota and total.
- **Autónomo (modelo 130)** — income − expenses → estimated quarterly IRPF payment.
- **Gross → net salary** — annual gross → Social Security, IRPF and net (monthly in 12 and 14 payments).
- **AI explainer** — one click turns any result into a clear, human explanation in 🇳🇱 / 🇪🇸 / 🇬🇧.

## Why it's interesting

The calculations are instant and run fully client-side, so the tool works with no setup. The **AI layer** is a thin serverless function (`/api/explain`) that keeps the API key server-side and returns a short, grounded explanation of the exact numbers — a clean example of adding GenAI to a real product without rebuilding it around the model.

## Tech stack

- **React** (Next.js, App Router) · deployed on **Vercel**
- **Anthropic API** via a serverless route (`app/api/explain`)
- All tax logic isolated in `lib/taxLogic.js` — pure, testable functions.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY (only needed for the AI button)
npm run dev
```

Open http://localhost:3000. The calculators work without a key; the AI explainer needs one.

## Disclaimer

All figures are **illustrative estimates**, not official tax calculations. Rates, brackets and minimums change yearly and vary by comunidad autónoma — values marked `// VERIFY` in `lib/taxLogic.js` must be checked against current rules. Not tax advice.

## License

MIT
