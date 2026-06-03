# Molar AI — Dental Practice Dashboard

Agentic AI dashboard mockup for boutique dental practices. Built with Vite + React + TypeScript + Tailwind CSS.

**Live preview:** https://teguhirvan85-hue.github.io/Molar-AI/

## What's inside

A 1440×900 dashboard for **Dr. Sarah Bennett** at Beverly Hills Dental, surfacing:

- **AI Agent Hero** — what Molar is doing right now (calling patients, drafting claims, follow-ups), live stats
- **4 KPI tiles** with sparkline trends — Appointments today, No-show rate, Claims pending, Revenue MTD
- **Today's Schedule** — 6 appointments with status pills (Confirmed / Pending / AI reminder sent / AI calling now)
- **AI Agent activity feed** — live narration of what the agent just did
- **Insurance claims status** with a 94.2% AI-drafted approval-rate donut
- **Procedure mix** for the week with per-category counts
- **Ask Molar** chat panel — conversation thread with quick actions

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 3
- Lucide React icons
- Inter / Manrope / Plus Jakarta Sans

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` auto-builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.

## Origin

Layout originally adapted from a Figma e-learning dashboard, then rewired to the Molar AI brief (vertical AI agent for dental practices) while preserving the visual system: `rounded-2xl` cards, soft `0_2px_4px_rgba(0,0,0,0.02)` shadow, `#6060d8` accent, gradient `#444 → #262630` action buttons.
