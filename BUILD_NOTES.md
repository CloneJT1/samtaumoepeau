# SD Prospects — Build Notes

**Built:** 2026-03-14  
**Framework:** Next.js 16.1.6 (App Router, Turbopack)  
**Status:** ✅ Build passes — 22 static/dynamic pages, zero TypeScript errors

---

## What Was Built

### Site Pages
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with hero, top 10 cards, full rankings table + filters |
| `/rankings` | Static | Full rankings page with filter bar |
| `/players/[id]` | SSG (10 pages) | Individual player profile pages |
| `/submit` | Static (client) | Public player submission form |
| `/admin` | Static (client) | Password-protected admin dashboard |
| `/about` | Static | About / mission page |

### API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/submit` | POST | Accepts form data, saves to `pending.json` |
| `/api/admin/submissions` | GET | Returns all pending submissions |
| `/api/admin/approve` | POST | Moves submission from pending → players, assigns next rank |
| `/api/admin/reject` | POST | Removes submission from pending queue |

### Components
- `Header.tsx` — Navy navbar with SD Prospects logo, mobile-responsive hamburger menu
- `Footer.tsx` — Minimal footer with nav links
- `StarRating.tsx` — 1-5 gold star rating display (size variants: sm/md/lg)
- `PlayerCard.tsx` — Card for top 10 grid (rank, stars, name, school, position, commitment badge)
- `PlayerTable.tsx` — Full sortable table with Hudl link icons, client-side filtering via URL params
- `FilterBar.tsx` — Position dropdown, class year dropdown, school text search — all synced to URL query params

### Data
- `data/players.json` — 10 sample San Diego prospects (Helix, Cathedral Catholic, Mater Dei, Torrey Pines, La Jolla, Mission Hills, San Diego High, Eastlake, El Camino)
- `data/pending.json` — Empty array, populated by form submissions

### Library
- `lib/players.ts` — All file I/O helpers: getPlayers, getPlayerById, addPendingSubmission, approveSubmission, rejectSubmission

---

## Design System
- **Primary:** Navy `#002147`
- **Accent:** Gold `#FFD700`
- **Background:** Light gray `#F8F9FA`
- **Hudl orange:** `#FF6B00` (for Hudl watch buttons)
- Fully mobile-responsive via Tailwind CSS v4

---

## Admin Access
- URL: `/admin`
- Password: `sdprospects2024`
- Approve moves player into rankings with 3-star default rating and next available rank number

---

## Next Steps (Before Launch)
1. **Migrate to Supabase** — Replace `fs`-based JSON reads with Supabase client calls
2. **Real auth for admin** — Replace hardcoded password with NextAuth or Supabase Auth
3. **Manual ranking control** — Add drag-to-reorder or rank assignment in admin
4. **Star rating on approval** — Let admin assign 1-5 stars when approving
5. **SEO** — Add Open Graph images for player profiles
6. **Domain** — Point sandiegoprospects.com DNS to Vercel deployment

## To Run Locally
```bash
cd sandiegoprospects
npm run dev
# → http://localhost:3000
```

## To Deploy
```bash
# Vercel (recommended)
vercel --prod

# Note: data/ directory writes won't persist on Vercel serverless — 
# migrate to Supabase before deploying to production.
```
