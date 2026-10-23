# ControlMesh landing page

Marketing site for **ControlMesh**, Team CS-54's code and cloud security assurance platform.
Built with Next.js (App Router), React and TypeScript. No backend, no database: it deploys to Vercel as static pages.

## What's on the page

- **Live city map** (`components/map/`): an isometric "city" of one release. Patients' homes, City Hospital,
  the MediBook office, a staging copy, the AWS data center and ControlMesh HQ. Drag, zoom, click anything,
  or let the guided tour play. At the "Decide" step the visitor picks **Apply fix** or **Accept risk**.
- **Real-life strip** (`components/story/RealLifeStrip.tsx`): three cards that follow the map and explain each step
  in plain words (Nimal's phone, where Kamala's scans live, what it means).
- **Sections** (`components/sections/`): problem with a scanner/ControlMesh switch, six-step how-it-works,
  roles, comparison table, security, evidence record, FAQ and pilot sign-up.
- **Film** (`/film`): a 30-second animated explainer.

All names, records and numbers are made up for the demo.

## Project layout

```
app/                 routes: / and /film, layout, favicon
components/map/      World (SVG city), CommandMap, MapHud, MapPanel
components/story/    useReleaseStory (tour state), ReleaseStory, RealLifeStrip, PhoneMock
components/sections/ landing page sections
components/film/     the animated film
lib/iso.ts           isometric projection helpers
lib/story.ts         map data: places, routes, tour steps, panel text
lib/lens.ts          map state → plain-English cards
styles/              base, layout, map, phone, story, sections, film
```

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript only
```

Requires Node.js 20 or newer.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to https://vercel.com/new and import the repository.
3. Leave the defaults (Framework: Next.js, Build command: `next build`) and press **Deploy**.

Every push to `main` redeploys automatically, and every pull request gets its own preview link.

## Before going public

- `components/sections/Pilot.tsx`: set `PILOT_EMAIL` to the team's real inbox (or connect a form service).
- `components/Footer.tsx`: point the GitHub and Contact links at the real ones.
- FAQ "What does it cost?": update once pilot terms are agreed.
