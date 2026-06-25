# Setup, deploy & testing

## 1. Prerequisites
- Node 18+ (`node -v`)
- A GitHub account and a Vercel account (free) — you already use both.

## 2. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. Try each calculator — they work with no API key.

## 3. Enable the AI explainer locally
```bash
cp .env.example .env.local
```
Edit `.env.local`, paste your key from https://console.anthropic.com, restart `npm run dev`, then click "Explain" on a result.

## 4. Deploy to Vercel (live demo link)
1. Push the repo to GitHub.
2. In Vercel: New Project → import the repo.
3. Add an **Environment Variable**: `ANTHROPIC_API_KEY` = your key.
4. Deploy. Copy the live URL into the README's "Live demo" line.

## 5. Test checklist
- [ ] IVA, autónomo and salary calculators give sensible numbers.
- [ ] "Explain" returns a short explanation in NL / ES / EN.
- [ ] With no key set, calculators still work and the AI button shows a clean "not configured" message.

## Note on cost
The `/api/explain` call is capped at 400 tokens to keep cost negligible. If the live demo ever gets real traffic, add basic rate limiting (e.g. Vercel + Upstash) so your key can't be abused.
