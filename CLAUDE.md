# BuildingHarvest App — Rooftop Urban Farming Platform

## Project Scope
Community platform for rooftop urban farming. Members order fresh produce, manage subscriptions, view farm operations, and track environmental impact. Designed for a shared rooftop farm.

## Tech Stack
- React 18.2 / Vite 5.0
- Tailwind CSS 3.3 + PostCSS
- Vercel deployment

## Key Files
```
src/
├── App.jsx    ← Main component (~360 lines, all UI tabs)
├── main.jsx   ← Entry point
└── index.css  ← Tailwind imports
```

## Quick Start
```bash
npm install
npm run dev      # Vite dev server
npm run build    # Production build
```

## Features
- **Order Tab** — Browse weekly crops, add to cart
- **Subscribe Tab** — 3 tiers (Herb $15, Salad $25, Chef $40)
- **Grow Tab** — Farm stats, live conditions, crop voting
- **History Tab** — Past orders, environmental impact metrics

## Notes
- Single-component architecture (all in App.jsx)
- Mock data hardcoded — no backend integration yet
- Frontend-only prototype
- Related: Microfaming project (~/projects/apps/Microfaming/) is the expanded version

## Cross-Project Reference
- Shared patterns: ~/orginize/knowledge/patterns.md
- Master registry: ~/orginize/CLAUDE.md

## GitHub
- Repo: yuda420-dev/building-harvest-app
- Push requires: `gh auth switch --user yuda420-dev`
